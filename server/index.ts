import express from 'express';
import session from 'express-session';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

async function startServer() {
  try {
    const { startBot } = await import('./bot.js');
    startBot();
  } catch (error) {
    console.warn('Discord bot could not be started:', error);
  }
  
  app.use('/api', routes);

  if (process.env.NODE_ENV === 'development') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        allowedHosts: true
      },
      appType: 'spa'
    });
    
    app.use(vite.middlewares);
  } else {
    // In production, serve the built frontend from client/dist
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
