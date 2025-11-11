# ARRAY - Trading Community Platform

## Overview

ARRAY is a trading community platform with user authentication, Discord integration, and automated whitelist management. The application features a modern, glass morphic design with smooth animations and seamless Discord OAuth integration. Users can register, link their Discord accounts, and administrators can manage the community through a Discord bot with custom commands.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript, using Vite as the build tool and development server.

**Routing**: The application uses Wouter for client-side routing, providing a lightweight alternative to React Router. Two main routes exist:
- `/` - Home page with video call interface
- `/about` - About page showcasing company vision and features

**State Management**: React Query (@tanstack/react-query) handles server state and data fetching, with a custom query client configured for API requests. Local component state uses React hooks (useState, useEffect, useRef) for UI interactions.

**Styling Approach**: 
- Tailwind CSS as the primary styling framework with custom CSS variables for theming
- Support for both light and dark modes through CSS variables
- Custom CSS files for specialized components (videocall.css, fancy-cards.css)
- Design system based on spacing units (3, 4, 6, 8) for consistent rhythm

**Component Architecture**:
- Functional components with TypeScript interfaces for props
- Radix UI primitives for accessible, unstyled components (dialogs, dropdowns, accordions, etc.)
- Custom animated components (ScrollReveal, AnimatedStat, MouseGradient)
- Reusable UI components following atomic design principles

**Key Design Patterns**:
- Full viewport video background with floating UI elements
- Z-index hierarchy: video (z-0) → header (z-10) → user camera (z-10) → controls (z-20)
- Glassmorphism effects using backdrop-blur and semi-transparent backgrounds
- Intersection Observer API for scroll-based animations and lazy loading

### Backend Architecture

**Server Framework**: Express.js running on Node.js with ES modules support.

**Development Setup**: 
- Vite dev server integrated with Express in middleware mode for hot module replacement
- Server-side rendering setup for HTML template transformation
- Development server runs on port 5000 with HMR support

**Build System**:
- Vite for frontend bundling
- esbuild for backend compilation with ESM output format
- TypeScript compilation for type checking

**API Structure**: Minimal REST API with health check endpoint (`/api/health`). The architecture supports expansion for additional API routes.

**Database Layer**: Drizzle ORM configured for database operations with Neon Database serverless support. Database schema and migrations managed through drizzle-kit.

**Session Management**: connect-pg-simple for PostgreSQL-based session storage (configured but implementation details not visible in current files).

### Technology Stack

**Core Dependencies**:
- React 18+ with TypeScript
- Express.js for backend
- Drizzle ORM for database operations
- React Query for data fetching
- Radix UI for accessible components
- Tailwind CSS for styling
- Wouter for routing
- Lucide React for icons

**Development Tools**:
- Vite for fast development and building
- TSX for TypeScript execution
- esbuild for backend bundling

**Form Handling**: React Hook Form with Zod resolvers for validation (hookform/resolvers, drizzle-zod).

**UI Components Library**: Comprehensive Radix UI suite including accordion, dialog, dropdown, tooltip, and more.

### Video Call Features

**Video Display**:
- Fullscreen background video using HTML5 video element
- Object-cover sizing for proper aspect ratio
- Support for autoplay, loop, and muted playback
- Dropbox-hosted example videos

**Control Interface**:
- Bottom-centered control bar with glassmorphism design
- Microphone toggle with visual state (active/muted)
- Camera toggle with visual feedback
- Screen sharing button
- Settings/more options button
- Color-coded states: red (#f8175a) for disabled mic/camera, blue (#034ff4) for active share

**User Interface Elements**:
- Mini camera preview (bottom-right, 48x36 size, rounded with border)
- Participant labels with muted indicator icons
- Location-based participant info using country flags
- Gradient header with "ARRAY" branding

**Animations**:
- Slide-up animation for control bar entrance
- Hover effects with brightness adjustments
- Smooth transitions (150-300ms duration)
- Scroll-based reveal animations with multiple variants

### Page Structure

**Home Page**: 
- Full viewport video call simulation
- Geolocation-based participant information
- Interactive control bar for call management
- Mini camera preview toggle

**About Page**:
- Multi-section layout with vision, innovation, and features
- Animated statistics and scroll reveals
- Fancy card components with domino hover effects
- Curved card with custom SVG scrollbar
- Mouse-following gradient background effect
- Call-to-action with animated "Get Started" button

## Discord Bot Configuration

### Required Discord Bot Setup

**IMPORTANT**: The Discord bot requires proper configuration in the Discord Developer Portal:

1. **Bot Permissions**: The bot needs the following permissions:
   - `applications.commands` scope
   - `bot` scope
   - Administrator permission (or specific permissions for managing channels, sending messages, etc.)

2. **OAuth2 Redirect URLs**: 
   - Add your redirect URL in the format: `https://your-replit-url.replit.app/api/auth/discord/callback`
   - For local development: `http://localhost:5000/api/auth/discord/callback`

3. **Bot Invite Link**: Generate an invite link with proper scopes:
   ```
   https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
   ```

4. **Environment Secrets Required**:
   - `DISCORD_CLIENT_ID` - Your Discord application Client ID
   - `DISCORD_CLIENT_SECRET` - Your Discord application Client Secret
   - `DISCORD_BOT_TOKEN` - Your Discord bot token
   - `SESSION_SECRET` - Random string for session encryption
   - `DATABASE_URL` - PostgreSQL connection string (auto-configured by Replit)

5. **Server Configuration**: 
   - Guild ID: `1413053989796319317` (configured in server/bot.ts)
   - Whitelist Channel ID: `1437698826348789831`
   - Ticket Category ID: `1437702108395602001`

### Discord Bot Commands

The bot includes three slash commands (only work in configured server):

- `/embed <channel>` - Send custom embed message (Admin only)
- `/check <username>` - Check user whitelist status
- `/sendticket` - Send ticket creation embed with button (Admin only)

### Known Issues

If you see "Missing Access" errors in logs, ensure:
1. Bot is properly invited to the server with `applications.commands` scope
2. Bot has Administrator permission in the Discord server
3. Environment secrets are correctly configured

## External Dependencies

### Third-Party Services

**Discord API**: For OAuth authentication and bot functionality.

**Font Services**: Google Fonts for Inter typeface.

### Database

**Provider**: Neon Database serverless PostgreSQL (via @neondatabase/serverless package).

**ORM**: Drizzle ORM with Zod integration for schema validation and type safety.

**Session Store**: PostgreSQL-backed sessions using connect-pg-simple.

### UI Component Libraries

**Radix UI**: Comprehensive suite of unstyled, accessible component primitives including dialogs, dropdowns, tooltips, and form controls.

**Lucide React**: Icon library providing consistent iconography for controls (Mic, Video, Monitor, Settings icons).

**Embla Carousel**: Carousel/slider functionality for content display.

**CMDK**: Command menu component for keyboard-driven interfaces.

### Utilities

**Class Utilities**: 
- clsx for conditional class name composition
- class-variance-authority for component variant management

**Date Handling**: date-fns for date manipulation and formatting.

**Form Management**: React Hook Form with Zod resolvers for type-safe form validation.