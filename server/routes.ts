import { Router } from 'express';
import { storage } from './storage.js';
import { insertUserSchema, loginSchema } from '../shared/schema.js';
import { sendWhitelistRegistration } from './bot.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const userData = insertUserSchema.parse(req.body);
    
    const existingUsername = await storage.getUserByUsername(userData.username);
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const existingEmail = await storage.getUserByEmail(userData.email);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await storage.createUser(userData);
    
    try {
      await sendWhitelistRegistration(user.username);
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
    }
    
    req.session.userId = user.id;
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Invalid request data' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const credentials = loginSchema.parse(req.body);
    
    const user = await storage.verifyPassword(credentials.email, credentials.password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user.id;
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request data' });
  }
});

router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await storage.getUserById(req.session.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

router.get('/auth/discord', (req, res) => {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const isProduction = process.env.NODE_ENV === 'production';
  const redirectUri = isProduction 
    ? 'https://tradearray.org/api/auth/discord/callback'
    : `${req.protocol}://${req.get('host')}/api/auth/discord/callback`;
  
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email%20guilds%20connections`;
  
  res.redirect(discordAuthUrl);
});

router.get('/auth/discord/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.redirect('/auth?error=no_code');
  }

  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const redirectUri = isProduction 
      ? 'https://tradearray.org/api/auth/discord/callback'
      : `${req.protocol}://${req.get('host')}/api/auth/discord/callback`;
    
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.redirect('/auth?error=token_failed');
    }

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const discordUser = await userResponse.json();

    if (!discordUser.id || !discordUser.username) {
      return res.redirect('/auth?error=invalid_discord_data');
    }

    const avatarUrl = discordUser.avatar 
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/0.png`;

    if (req.session.userId) {
      await storage.linkDiscord(req.session.userId, {
        discordId: discordUser.id,
        discordUsername: discordUser.username,
        discordAvatar: avatarUrl,
      });
      
      return res.redirect('/me?linked=true');
    } else {
      if (!discordUser.email) {
        return res.redirect('/auth?error=email_required');
      }

      let user = await storage.getUserByEmail(discordUser.email);
      
      if (user) {
        req.session.userId = user.id;
        
        if (!user.discordId) {
          await storage.linkDiscord(user.id, {
            discordId: discordUser.id,
            discordUsername: discordUser.username,
            discordAvatar: avatarUrl,
          });
        }
        
        return res.redirect('/me?login=true');
      } else {
        const newUser = await storage.createUser({
          username: discordUser.username,
          email: discordUser.email,
          password: Math.random().toString(36).slice(-12),
          knownAs: 'Other',
        });
        
        await storage.linkDiscord(newUser.id, {
          discordId: discordUser.id,
          discordUsername: discordUser.username,
          discordAvatar: avatarUrl,
        });
        
        req.session.userId = newUser.id;
        
        try {
          await sendWhitelistRegistration(newUser.username);
        } catch (error) {
          console.error('Failed to send Discord notification:', error);
        }
        
        return res.redirect('/me?registered=true');
      }
    }
  } catch (error) {
    console.error('Discord OAuth error:', error);
    return res.redirect('/auth?error=oauth_failed');
  }
});

export default router;
