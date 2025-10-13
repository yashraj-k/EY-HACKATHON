#!/bin/bash

# PharmaSynth-X Test Runner Script

echo "🧪 Running PharmaSynth-X tests..."

# Set exit code
EXIT_CODE=0

# Run frontend tests
echo "📱 Running frontend tests..."
cd frontend
if npm test -- --watchAll=false --passWithNoTests; then
    echo "✅ Frontend tests passed"
else
    echo "❌ Frontend tests failed"
    EXIT_CODE=1
fi
cd ..

# Run backend tests
echo "🐍 Running backend tests..."
cd backend
if python -m pytest tests/ -v; then
    echo "✅ Backend tests passed"
else
    echo "❌ Backend tests failed"
    EXIT_CODE=1
fi
cd ..

# Run AI engine tests
echo "🤖 Running AI engine tests..."
cd ai_engine
if python -m pytest tests/ -v; then
    echo "✅ AI engine tests passed"
else
    echo "❌ AI engine tests failed"
    EXIT_CODE=1
fi
cd ..

# Run integration tests
echo "🔗 Running integration tests..."
if docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit; then
    echo "✅ Integration tests passed"
else
    echo "❌ Integration tests failed"
    EXIT_CODE=1
fi

# Cleanup test containers
docker-compose -f docker-compose.test.yml down -v

if [ $EXIT_CODE -eq 0 ]; then
    echo "🎉 All tests passed!"
else
    echo "💥 Some tests failed!"
fi

exit $EXIT_CODE
