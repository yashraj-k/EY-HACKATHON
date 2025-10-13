from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
import asyncio
import uuid
from datetime import datetime

from agents.master_agent import MasterAgent
from graphs.main_workflow import MainWorkflow
from utils.config import AIConfig

app = FastAPI(title="PharmaSynth-X AI Engine", version="1.0.0")

# Initialize AI components
config = AIConfig()
master_agent = MasterAgent(config)
main_workflow = MainWorkflow(config)

class AnalysisRequest(BaseModel):
    drug_name: str
    target_disease: Optional[str] = None
    phase: str = "discovery"
    parameters: Optional[Dict[str, Any]] = None

class AnalysisResponse(BaseModel):
    analysis_id: str
    status: str
    message: str

class AnalysisStatus(BaseModel):
    analysis_id: str
    status: str
    progress: float
    current_agent: Optional[str] = None
    results: Optional[Dict[str, Any]] = None

# Store active analyses
active_analyses: Dict[str, Dict[str, Any]] = {}

@app.post("/analysis/start", response_model=AnalysisResponse)
async def start_analysis(request: AnalysisRequest):
    """Start a new drug analysis using the AI workflow"""
    analysis_id = str(uuid.uuid4())
    
    # Store analysis info
    active_analyses[analysis_id] = {
        "id": analysis_id,
        "drug_name": request.drug_name,
        "target_disease": request.target_disease,
        "phase": request.phase,
        "status": "running",
        "progress": 0.0,
        "current_agent": None,
        "results": None,
        "created_at": datetime.now()
    }
    
    # Start analysis in background
    asyncio.create_task(run_analysis(analysis_id, request))
    
    return AnalysisResponse(
        analysis_id=analysis_id,
        status="started",
        message="Analysis started successfully"
    )

async def run_analysis(analysis_id: str, request: AnalysisRequest):
    """Run the complete analysis workflow"""
    try:
        # Update status
        active_analyses[analysis_id]["status"] = "running"
        active_analyses[analysis_id]["progress"] = 10.0
        
        # Run the main workflow
        results = await main_workflow.run_analysis(
            drug_name=request.drug_name,
            target_disease=request.target_disease,
            phase=request.phase,
            parameters=request.parameters or {}
        )
        
        # Update with results
        active_analyses[analysis_id]["status"] = "completed"
        active_analyses[analysis_id]["progress"] = 100.0
        active_analyses[analysis_id]["results"] = results
        
    except Exception as e:
        # Update status to failed
        active_analyses[analysis_id]["status"] = "failed"
        active_analyses[analysis_id]["error"] = str(e)

@app.get("/analysis/{analysis_id}/status", response_model=AnalysisStatus)
async def get_analysis_status(analysis_id: str):
    """Get the current status of an analysis"""
    if analysis_id not in active_analyses:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    analysis = active_analyses[analysis_id]
    return AnalysisStatus(
        analysis_id=analysis_id,
        status=analysis["status"],
        progress=analysis["progress"],
        current_agent=analysis["current_agent"],
        results=analysis["results"]
    )

@app.get("/analysis/{analysis_id}/results")
async def get_analysis_results(analysis_id: str):
    """Get the results of a completed analysis"""
    if analysis_id not in active_analyses:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    analysis = active_analyses[analysis_id]
    if analysis["status"] != "completed":
        raise HTTPException(status_code=400, detail="Analysis not completed yet")
    
    return analysis["results"]

@app.get("/agents")
async def get_agents():
    """Get information about available AI agents"""
    agents = [
        {
            "id": "molecule_profiler",
            "name": "Molecule Profiler",
            "description": "Analyzes molecular structure and properties",
            "capabilities": ["Structure analysis", "Property prediction", "Similarity search"]
        },
        {
            "id": "disease_landscape",
            "name": "Disease Landscape",
            "description": "Maps disease mechanisms and pathways",
            "capabilities": ["Pathway analysis", "Target identification", "Disease modeling"]
        },
        {
            "id": "knowledge_chain",
            "name": "Knowledge Chain",
            "description": "Connects cross-domain knowledge",
            "capabilities": ["Knowledge integration", "Pattern recognition", "Insight generation"]
        },
        {
            "id": "patent_intelligence",
            "name": "Patent Intelligence",
            "description": "Analyzes patent landscape and IP",
            "capabilities": ["Patent analysis", "IP landscape", "Freedom to operate"]
        },
        {
            "id": "clinical_trial_strategist",
            "name": "Clinical Trial Strategist",
            "description": "Optimizes clinical trial design",
            "capabilities": ["Trial design", "Patient stratification", "Outcome prediction"]
        },
        {
            "id": "market_opportunity",
            "name": "Market Opportunity",
            "description": "Analyzes market potential and competition",
            "capabilities": ["Market analysis", "Competitive intelligence", "Pricing strategy"]
        },
        {
            "id": "scientific_evidence",
            "name": "Scientific Evidence",
            "description": "Evaluates scientific literature and evidence",
            "capabilities": ["Literature review", "Evidence synthesis", "Quality assessment"]
        },
        {
            "id": "regulatory_pathway",
            "name": "Regulatory Pathway",
            "description": "Maps regulatory requirements and pathways",
            "capabilities": ["Regulatory analysis", "Compliance check", "Submission planning"]
        },
        {
            "id": "hypothesis_validator",
            "name": "Hypothesis Validator",
            "description": "Validates scientific hypotheses",
            "capabilities": ["Hypothesis testing", "Validation protocols", "Risk assessment"]
        },
        {
            "id": "report_synthesis",
            "name": "Report Synthesis",
            "description": "Synthesizes comprehensive reports",
            "capabilities": ["Report generation", "Data visualization", "Insight synthesis"]
        },
        {
            "id": "master_agent",
            "name": "Master Agent",
            "description": "Orchestrates all other agents",
            "capabilities": ["Agent coordination", "Workflow management", "Quality control"]
        }
    ]
    return {"agents": agents}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "AI Engine is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
