# ARRAY Trading Platform

A modern trading platform with real-time video communication, Discord integration, and advanced trading features.

## Features

- 🎥 Real-time video calls and collaboration
- 💬 Discord integration for community engagement
- 📊 Trading dashboard with live market data
- 🔐 Secure authentication system
- 📱 Fully responsive design
- 🌙 Dark mode optimized

## Quick Start

### Automated Setup

The easiest way to get started is using the automated setup script:

```bash
chmod +x setup.sh
./setup.sh
```

This script will:
- Install all dependencies
- Create environment configuration
- Set up the database
- Guide you through the setup process

### Manual Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL=your_postgresql_connection_string
   
   # Session
   SESSION_SECRET=your_random_secret_key
   
   # Discord (optional)
   DISCORD_BOT_TOKEN=your_bot_token
   DISCORD_CLIENT_ID=your_client_id
   DISCORD_CLIENT_SECRET=your_client_secret
   DISCORD_REDIRECT_URI=http://localhost:5000/api/auth/discord/callback
   
   # Environment
   NODE_ENV=development
   PORT=5000
   ```

3. **Set up the database:**
   ```bash
   npm run db:push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Deployment

### Render.com Deployment

This project is optimized for deployment on Render.com:

1. **Create a new Web Service on Render**

2. **Configure the service:**
   - **Build Command:** `chmod +x render-build.sh && ./render-build.sh`
   - **Start Command:** `npm start`
   - **Environment:** Node

3. **Add environment variables:**
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `SESSION_SECRET` - Random secret for sessions
   - `DISCORD_BOT_TOKEN` (optional)
   - `DISCORD_CLIENT_ID` (optional)
   - `DISCORD_CLIENT_SECRET` (optional)
   - `NODE_ENV=production`

4. **Deploy!**

The `render-build.sh` script will automatically:
- Install dependencies
- Build the application
- Run database migrations

### Other Platforms

For other platforms (Vercel, Heroku, etc.), use these commands:

- **Build:** `npm run build`
- **Start:** `npm start`
- **Database Migration:** `npm run db:push`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Run database migrations
- `npm run check` - TypeScript type checking

## Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Express.js, Node.js
- **Database:** PostgreSQL with Drizzle ORM
- **Real-time:** WebSockets
- **Authentication:** Passport.js, Discord OAuth
- **Build Tool:** Vite

## Project Structure

```
├── client/              # Frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and helpers
│   └── public/          # Static assets
├── server/              # Backend application
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Data layer
│   └── bot.ts           # Discord bot integration
├── shared/              # Shared types and schemas
│   └── schema.ts        # Database schemas
└── setup.sh             # Automated setup script
```

## Video Optimization

The application includes optimizations for instant video playback on mobile devices:
- Preload metadata for faster initial load
- Automatic retry mechanism for playback failures
- Background video with elegant overlays
- No visible player controls for immersive experience

## Support

For issues or questions:
- Email: contact@tradearray.org
- Discord: http://discord.tradearray.org

## License

Proprietary - All rights reserved
