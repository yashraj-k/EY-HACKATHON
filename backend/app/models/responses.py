from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime
from enum import Enum

class AnalysisPhase(str, Enum):
    DISCOVERY = "discovery"
    VALIDATION = "validation"
    BUSINESS = "business"

class AnalysisStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class AnalysisResponse(BaseModel):
    analysis_id: str
    status: str
    message: str
    created_at: datetime

class AnalysisStatusResponse(BaseModel):
    analysis_id: str
    status: AnalysisStatus
    phase: AnalysisPhase
    progress: float
    current_agent: Optional[str] = None
    results: Optional[Dict[str, Any]] = None
    error_message: Optional[str] = None
    updated_at: datetime

class AgentStatus(BaseModel):
    agent_id: str
    name: str
    status: str
    progress: float
    current_task: Optional[str] = None
    results: Optional[Dict[str, Any]] = None

class WebSocketMessage(BaseModel):
    type: str
    data: Optional[Dict[str, Any]] = None
    timestamp: Optional[float] = None
