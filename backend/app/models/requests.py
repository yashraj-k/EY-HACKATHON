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

class AnalysisRequest(BaseModel):
    drug_name: str
    target_disease: Optional[str] = None
    phase: AnalysisPhase = AnalysisPhase.DISCOVERY
    parameters: Optional[Dict[str, Any]] = None
    user_id: Optional[str] = None

class DrugSearchRequest(BaseModel):
    query: str
    limit: int = 10
    filters: Optional[Dict[str, Any]] = None

class AnalysisResponse(BaseModel):
    analysis_id: str
    status: str
    message: str
    created_at: datetime

class AnalysisStatus(BaseModel):
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
