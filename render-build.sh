#!/bin/bash

# ARRAY Trading Platform - Render.com Build Script
# This script is executed during deployment on Render

set -e

echo "🚀 Starting Render.com deployment build..."
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Build the application
echo "🔨 Building application..."
npm run build

# Run database migrations
echo "🗄️  Running database migrations..."
npm run db:push

echo ""
echo "✅ Build complete!"
