import asyncio
from typing import Dict, Any, Optional
from datetime import datetime

class WebSocketService:
    def __init__(self):
        self.connections: Dict[str, Any] = {}
        self.analysis_subscribers: Dict[str, list] = {}

    async def get_analysis_status(self, analysis_id: str) -> Dict[str, Any]:
        """Get analysis status for WebSocket updates"""
        # This would typically query the analysis service
        # For demo purposes, return mock status
        return {
            "analysis_id": analysis_id,
            "status": "running",
            "progress": 45.0,
            "current_agent": "molecule_profiler",
            "updated_at": datetime.now().isoformat()
        }

    async def broadcast_analysis_update(self, analysis_id: str, update: Dict[str, Any]):
        """Broadcast analysis update to subscribed clients"""
        if analysis_id in self.analysis_subscribers:
            message = {
                "type": "analysis_update",
                "analysis_id": analysis_id,
                "data": update,
                "timestamp": datetime.now().isoformat()
            }
            
            # Send to all subscribed clients
            for connection in self.analysis_subscribers[analysis_id]:
                try:
                    await connection.send_text(str(message))
                except Exception as e:
                    # Remove failed connections
                    self.analysis_subscribers[analysis_id].remove(connection)

    def subscribe_to_analysis(self, connection: Any, analysis_id: str):
        """Subscribe a connection to analysis updates"""
        if analysis_id not in self.analysis_subscribers:
            self.analysis_subscribers[analysis_id] = []
        
        if connection not in self.analysis_subscribers[analysis_id]:
            self.analysis_subscribers[analysis_id].append(connection)

    def unsubscribe_from_analysis(self, connection: Any, analysis_id: str):
        """Unsubscribe a connection from analysis updates"""
        if analysis_id in self.analysis_subscribers:
            if connection in self.analysis_subscribers[analysis_id]:
                self.analysis_subscribers[analysis_id].remove(connection)
