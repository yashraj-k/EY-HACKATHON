from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from typing import List, Optional
import httpx
import asyncio

from app.models.requests import AnalysisRequest, DrugSearchRequest
from app.models.responses import AnalysisResponse, AnalysisStatus
from app.services.analysis_service import AnalysisService
from app.services.websocket_service import WebSocketService
from app.core.dependencies import get_analysis_service, get_websocket_service

router = APIRouter()
security = HTTPBearer()

@router.post("/analysis/start", response_model=AnalysisResponse)
async def start_analysis(
    request: AnalysisRequest,
    analysis_service: AnalysisService = Depends(get_analysis_service)
):
    """Start a new drug analysis using the AI engine"""
    try:
        analysis_id = await analysis_service.start_analysis(request)
        return AnalysisResponse(
            analysis_id=analysis_id,
            status="started",
            message="Analysis started successfully"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to start analysis: {str(e)}"
        )

@router.get("/analysis/{analysis_id}/status", response_model=AnalysisStatus)
async def get_analysis_status(
    analysis_id: str,
    analysis_service: AnalysisService = Depends(get_analysis_service)
):
    """Get the current status of an analysis"""
    try:
        status = await analysis_service.get_analysis_status(analysis_id)
        return status
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis not found: {str(e)}"
        )

@router.get("/analysis/{analysis_id}/results")
async def get_analysis_results(
    analysis_id: str,
    analysis_service: AnalysisService = Depends(get_analysis_service)
):
    """Get the results of a completed analysis"""
    try:
        results = await analysis_service.get_analysis_results(analysis_id)
        return results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Results not found: {str(e)}"
        )

@router.post("/drugs/search")
async def search_drugs(
    request: DrugSearchRequest,
    analysis_service: AnalysisService = Depends(get_analysis_service)
):
    """Search for drugs and get basic information"""
    try:
        results = await analysis_service.search_drugs(request)
        return results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Search failed: {str(e)}"
        )

@router.get("/agents")
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

@router.get("/models")
async def get_models():
    """Get information about available AI models"""
    models = [
        {
            "id": "analysis_engine",
            "name": "Analysis Engine",
            "description": "Our most intelligent AI models for comprehensive drug analysis",
            "category": "analysis",
            "capabilities": ["Molecule Profiler", "Disease Landscape", "Knowledge Chain", "Patent Intelligence"],
            "status": "available"
        },
        {
            "id": "prediction_models",
            "name": "Prediction Models",
            "description": "Lightweight, state-of-the-art models for market and clinical predictions",
            "category": "prediction",
            "capabilities": ["Market Opportunity", "Clinical Trial Strategist", "Scientific Evidence", "Regulatory Pathway"],
            "status": "available"
        },
        {
            "id": "optimization_tools",
            "name": "Optimization Tools",
            "description": "Advanced tools for hypothesis validation and report synthesis",
            "category": "optimization",
            "capabilities": ["Hypothesis Validator", "Report Synthesis", "Master Agent", "Quality Assurance"],
            "status": "beta"
        }
    ]
    return {"models": models}
