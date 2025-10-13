from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List
from pydantic import BaseModel
import asyncio

class AgentResult(BaseModel):
    agent_id: str
    status: str
    results: Dict[str, Any]
    confidence_score: float
    execution_time: float
    error_message: Optional[str] = None

class BaseAgent(ABC):
    """Base class for all AI agents"""
    
    def __init__(self, agent_id: str, name: str, description: str):
        self.agent_id = agent_id
        self.name = name
        self.description = description
        self.status = "idle"
        self.current_task = None
        self.results = None
    
    @abstractmethod
    async def execute(self, input_data: Dict[str, Any]) -> AgentResult:
        """Execute the agent's main functionality"""
        pass
    
    @abstractmethod
    def get_capabilities(self) -> List[str]:
        """Return list of agent capabilities"""
        pass
    
    async def run(self, input_data: Dict[str, Any]) -> AgentResult:
        """Run the agent with error handling"""
        self.status = "running"
        start_time = asyncio.get_event_loop().time()
        
        try:
            result = await self.execute(input_data)
            self.status = "completed"
            self.results = result.results
            return result
        except Exception as e:
            self.status = "failed"
            return AgentResult(
                agent_id=self.agent_id,
                status="failed",
                results={},
                confidence_score=0.0,
                execution_time=asyncio.get_event_loop().time() - start_time,
                error_message=str(e)
            )
        finally:
            self.status = "idle"
            self.current_task = None

class MasterAgent(BaseAgent):
    """Master agent that orchestrates all other agents"""
    
    def __init__(self, config):
        super().__init__(
            agent_id="master_agent",
            name="Master Agent",
            description="Orchestrates all other agents and manages the analysis workflow"
        )
        self.config = config
        self.agents = {}
    
    async def execute(self, input_data: Dict[str, Any]) -> AgentResult:
        """Execute the master agent workflow"""
        # This would coordinate all other agents
        # For now, return a mock result
        return AgentResult(
            agent_id=self.agent_id,
            status="completed",
            results={
                "workflow_status": "completed",
                "total_agents": 11,
                "successful_agents": 11,
                "overall_confidence": 0.85
            },
            confidence_score=0.85,
            execution_time=1.0
        )
    
    def get_capabilities(self) -> List[str]:
        return [
            "Agent coordination",
            "Workflow management", 
            "Quality control",
            "Result synthesis"
        ]
