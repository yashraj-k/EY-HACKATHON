#!/bin/bash

# PharmaSynth-X Development Start Script

echo "🚀 Starting PharmaSynth-X development environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please run 'make setup' first."
    exit 1
fi

# Start all services with Docker Compose
echo "🐳 Starting Docker services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service health
echo "🔍 Checking service health..."

# Check frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running at http://localhost:3000"
else
    echo "❌ Frontend is not responding"
fi

# Check backend
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Backend is running at http://localhost:8000"
else
    echo "❌ Backend is not responding"
fi

# Check AI engine
if curl -s http://localhost:8001/health > /dev/null; then
    echo "✅ AI Engine is running at http://localhost:8001"
else
    echo "❌ AI Engine is not responding"
fi

echo ""
echo "🎉 Development environment is ready!"
echo ""
echo "Access points:"
echo "  Frontend:     http://localhost:3000"
echo "  Backend API:  http://localhost:8000"
echo "  AI Engine:    http://localhost:8001"
echo "  API Docs:     http://localhost:8000/docs"
echo ""
echo "To view logs: make logs"
echo "To stop:      docker-compose down"
