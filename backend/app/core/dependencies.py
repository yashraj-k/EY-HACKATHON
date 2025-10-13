from fastapi import Depends
from app.services.analysis_service import AnalysisService
from app.services.websocket_service import WebSocketService

def get_analysis_service() -> AnalysisService:
    return AnalysisService()

def get_websocket_service() -> WebSocketService:
    return WebSocketService()
