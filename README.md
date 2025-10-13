# PharmaSynth-X - AI-Powered Drug Discovery Platform

A revolutionary AI platform for comprehensive drug discovery analysis, combining 11 specialized agents to accelerate pharmaceutical innovation.

## 🚀 Features

- **11 Specialized AI Agents**: Each agent focuses on a specific aspect of drug discovery
- **3-Phase Analysis Workflow**: Discovery → Validation → Business Case
- **Real-time Progress Tracking**: WebSocket-based live updates
- **Modern Web Interface**: React + TypeScript frontend inspired by Google DeepMind
- **Scalable Architecture**: Microservices with FastAPI backend and LangGraph AI engine
- **Comprehensive Analysis**: From molecular profiling to market opportunity assessment

## 🏗️ Architecture

```
Frontend (React + TypeScript) 
    ↓ (HTTP/WebSocket)
Backend (FastAPI) 
    ↓ (Python calls)
AI Engine (LangGraph)
    ↓ (Agent coordination)
11 Specialized Agents
    ↓ (Tool execution)
Mock APIs & Data Sources
```

## 🤖 AI Agents

1. **Molecule Profiler** - Analyzes molecular structure and properties
2. **Disease Landscape** - Maps disease mechanisms and pathways
3. **Knowledge Chain** - Connects cross-domain knowledge
4. **Patent Intelligence** - Analyzes patent landscape and IP
5. **Clinical Trial Strategist** - Optimizes clinical trial design
6. **Market Opportunity** - Analyzes market potential and competition
7. **Scientific Evidence** - Evaluates scientific literature and evidence
8. **Regulatory Pathway** - Maps regulatory requirements and pathways
9. **Hypothesis Validator** - Validates scientific hypotheses
10. **Report Synthesis** - Synthesizes comprehensive reports
11. **Master Agent** - Orchestrates all other agents

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Zustand for state management

### Backend
- FastAPI for API server
- WebSocket support for real-time updates
- PostgreSQL for data persistence
- Redis for caching
- Pydantic for data validation

### AI Engine
- LangGraph for workflow orchestration
- LangChain for LLM integration
- OpenAI/Anthropic APIs
- Custom agent implementations

### Infrastructure
- Docker & Docker Compose
- Nginx reverse proxy
- Development and production configurations

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pharmasynth-x
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

3. **Start the development environment**
   ```bash
   make dev
   # or
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - AI Engine: http://localhost:8001
   - API Documentation: http://localhost:8000/docs

### Local Development

```bash
# Install dependencies
make install

# Start individual services
make dev-frontend    # Frontend on :3000
make dev-backend     # Backend on :8000
make dev-ai-engine   # AI Engine on :8001
```

## 📁 Project Structure

```
pharmasynth-x/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── stores/         # State management
│   │   ├── types/          # TypeScript definitions
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Pydantic models
│   │   └── services/       # Business logic
│   └── requirements.txt
├── ai_engine/              # LangGraph AI engine
│   ├── agents/             # All 11 agents
│   ├── graphs/             # LangGraph workflows
│   ├── tools/              # Agent tools
│   ├── data/               # Mock data & knowledge bases
│   └── utils/              # AI utilities
├── docker-compose.yml      # Development environment
├── Makefile               # Development commands
└── README.md
```

## 🔧 Development Commands

```bash
make help                  # Show all available commands
make setup                 # Set up development environment
make install              # Install all dependencies
make dev                  # Start development environment
make test                 # Run all tests
make lint                 # Lint all code
make clean                # Clean up Docker resources
make logs                 # Show all logs
```

## 🧪 Testing

```bash
# Run all tests
make test

# Run specific test suites
cd frontend && npm test
cd backend && pytest
cd ai_engine && pytest
```

## 📊 API Documentation

- **Backend API**: http://localhost:8000/docs
- **AI Engine API**: http://localhost:8001/docs

## 🌐 WebSocket Endpoints

- **Analysis Updates**: `ws://localhost:8000/ws/analysis/{analysis_id}`
- **General Updates**: `ws://localhost:8000/ws/general`

## 🔐 Environment Variables

Key environment variables (see `env.example`):

- `OPENAI_API_KEY` - OpenAI API key for LLM access
- `ANTHROPIC_API_KEY` - Anthropic API key for Claude access
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `SECRET_KEY` - JWT secret key

## 🚀 Production Deployment

```bash
# Build production images
make build

# Start production environment
make prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Google DeepMind's design and architecture
- Built with modern web technologies and AI frameworks
- Designed for pharmaceutical innovation and drug discovery

## 📞 Support

For questions and support, please open an issue or contact the development team.
