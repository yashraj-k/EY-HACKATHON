# Development Scripts

# Environment setup
setup:
	@echo "Setting up development environment..."
	@cp .env.example .env
	@echo "Please update .env with your API keys"

# Install dependencies
install:
	@echo "Installing frontend dependencies..."
	@cd frontend && npm install
	@echo "Installing backend dependencies..."
	@cd backend && pip install -r requirements.txt
	@echo "Installing AI engine dependencies..."
	@cd ai_engine && pip install -r requirements.txt

# Start development environment
dev:
	@echo "Starting development environment..."
	@docker-compose up --build

# Start specific services
dev-frontend:
	@echo "Starting frontend..."
	@cd frontend && npm run dev

dev-backend:
	@echo "Starting backend..."
	@cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000

dev-ai-engine:
	@echo "Starting AI engine..."
	@cd ai_engine && uvicorn main:app --reload --host 0.0.0.0 --port 8001

# Build production images
build:
	@echo "Building production images..."
	@docker-compose -f docker-compose.prod.yml build

# Run production
prod:
	@echo "Starting production environment..."
	@docker-compose -f docker-compose.prod.yml up -d

# Run tests
test:
	@echo "Running frontend tests..."
	@cd frontend && npm test
	@echo "Running backend tests..."
	@cd backend && pytest
	@echo "Running AI engine tests..."
	@cd ai_engine && pytest

# Lint code
lint:
	@echo "Linting frontend..."
	@cd frontend && npm run lint
	@echo "Linting backend..."
	@cd backend && black . && isort . && flake8
	@echo "Linting AI engine..."
	@cd ai_engine && black . && isort . && flake8

# Clean up
clean:
	@echo "Cleaning up..."
	@docker-compose down -v
	@docker system prune -f

# Database operations
db-migrate:
	@echo "Running database migrations..."
	@cd backend && alembic upgrade head

db-reset:
	@echo "Resetting database..."
	@docker-compose down -v
	@docker volume rm pharmasynth_postgres_data || true
	@docker-compose up -d db
	@sleep 10
	@make db-migrate

# Logs
logs:
	@docker-compose logs -f

logs-frontend:
	@docker-compose logs -f frontend

logs-backend:
	@docker-compose logs -f backend

logs-ai-engine:
	@docker-compose logs -f ai-engine

# Help
help:
	@echo "Available commands:"
	@echo "  setup       - Set up development environment"
	@echo "  install     - Install all dependencies"
	@echo "  dev         - Start development environment with Docker"
	@echo "  dev-frontend - Start frontend only"
	@echo "  dev-backend  - Start backend only"
	@echo "  dev-ai-engine - Start AI engine only"
	@echo "  build       - Build production images"
	@echo "  prod        - Start production environment"
	@echo "  test        - Run all tests"
	@echo "  lint        - Lint all code"
	@echo "  clean       - Clean up Docker resources"
	@echo "  db-migrate  - Run database migrations"
	@echo "  db-reset    - Reset database"
	@echo "  logs        - Show all logs"
	@echo "  help        - Show this help message"
