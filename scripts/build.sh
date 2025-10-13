#!/bin/bash

# PharmaSynth-X Production Build Script

echo "🏗️ Building PharmaSynth-X for production..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create it with production values."
    exit 1
fi

# Build production images
echo "🐳 Building production Docker images..."
docker-compose -f docker-compose.prod.yml build

# Run production tests
echo "🧪 Running production tests..."
docker-compose -f docker-compose.prod.yml run --rm frontend npm run build
docker-compose -f docker-compose.prod.yml run --rm backend python -m pytest tests/
docker-compose -f docker-compose.prod.yml run --rm ai-engine python -m pytest tests/

# Tag images for registry
echo "🏷️ Tagging images for registry..."
docker tag pharmasynth-x_frontend:latest pharmasynth-x/frontend:latest
docker tag pharmasynth-x_backend:latest pharmasynth-x/backend:latest
docker tag pharmasynth-x_ai-engine:latest pharmasynth-x/ai-engine:latest

echo "✅ Production build complete!"
echo ""
echo "Images ready for deployment:"
echo "  pharmasynth-x/frontend:latest"
echo "  pharmasynth-x/backend:latest"
echo "  pharmasynth-x/ai-engine:latest"
echo ""
echo "To deploy: docker-compose -f docker-compose.prod.yml up -d"
