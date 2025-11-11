#!/bin/bash

# ARRAY Trading Platform - Automated Setup Script
# This script installs all dependencies, sets up the database, and starts the application

set -e

echo "================================"
echo "ARRAY - Automated Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20.x or higher."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✓ Dependencies installed successfully"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✓ .env file created. Please configure your environment variables."
    else
        echo "Creating basic .env file..."
        cat > .env << EOF
# Database
DATABASE_URL=

# Session
SESSION_SECRET=$(openssl rand -base64 32)

# Discord (optional)
DISCORD_BOT_TOKEN=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_REDIRECT_URI=http://localhost:5000/api/auth/discord/callback

# Environment
NODE_ENV=development
PORT=5000
EOF
        echo "✓ Basic .env file created. Please configure your DATABASE_URL and other variables."
    fi
    echo ""
fi

# Check if DATABASE_URL is set
if grep -q "^DATABASE_URL=$" .env || ! grep -q "^DATABASE_URL=" .env; then
    echo "⚠️  DATABASE_URL is not configured in .env file."
    echo "   Please set your database connection string before running the application."
    echo ""
    echo "   Example for PostgreSQL:"
    echo "   DATABASE_URL=postgresql://user:password@localhost:5432/dbname"
    echo ""
else
    # Run database migrations
    echo "🗄️  Setting up database..."
    npm run db:push
    echo "✓ Database setup complete"
    echo ""
fi

echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "To start production server:"
echo "  npm start"
echo ""
echo "================================"
