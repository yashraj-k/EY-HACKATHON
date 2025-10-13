from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import Dict, List
import json
import asyncio
import uuid

from app.services.websocket_service import WebSocketService
from app.core.dependencies import get_websocket_service

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.analysis_connections: Dict[str, List[str]] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket

    def disconnect(self, client_id: str):
        if client_id in self.active_connections:
            del self.active_connections[client_id]
        # Remove from analysis connections
        for analysis_id, connections in self.analysis_connections.items():
            if client_id in connections:
                connections.remove(client_id)

    async def send_personal_message(self, message: str, client_id: str):
        if client_id in self.active_connections:
            await self.active_connections[client_id].send_text(message)

    async def broadcast_to_analysis(self, message: str, analysis_id: str):
        if analysis_id in self.analysis_connections:
            for client_id in self.analysis_connections[analysis_id]:
                await self.send_personal_message(message, client_id)

    def subscribe_to_analysis(self, client_id: str, analysis_id: str):
        if analysis_id not in self.analysis_connections:
            self.analysis_connections[analysis_id] = []
        if client_id not in self.analysis_connections[analysis_id]:
            self.analysis_connections[analysis_id].append(client_id)

manager = ConnectionManager()

@router.websocket("/analysis/{analysis_id}")
async def websocket_analysis_endpoint(
    websocket: WebSocket,
    analysis_id: str,
    websocket_service: WebSocketService = Depends(get_websocket_service)
):
    client_id = str(uuid.uuid4())
    await manager.connect(websocket, client_id)
    manager.subscribe_to_analysis(client_id, analysis_id)
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            if message.get("type") == "ping":
                await websocket.send_text(json.dumps({"type": "pong"}))
            elif message.get("type") == "subscribe":
                # Client wants to subscribe to analysis updates
                analysis_id = message.get("analysis_id")
                if analysis_id:
                    manager.subscribe_to_analysis(client_id, analysis_id)
                    await websocket.send_text(json.dumps({
                        "type": "subscribed",
                        "analysis_id": analysis_id
                    }))
            elif message.get("type") == "get_status":
                # Client requests current analysis status
                status = await websocket_service.get_analysis_status(analysis_id)
                await websocket.send_text(json.dumps({
                    "type": "status_update",
                    "analysis_id": analysis_id,
                    "status": status
                }))
            
    except WebSocketDisconnect:
        manager.disconnect(client_id)

@router.websocket("/general")
async def websocket_general_endpoint(websocket: WebSocket):
    client_id = str(uuid.uuid4())
    await manager.connect(websocket, client_id)
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            if message.get("type") == "ping":
                await websocket.send_text(json.dumps({"type": "pong"}))
            elif message.get("type") == "broadcast":
                # Broadcast message to all connected clients
                broadcast_message = {
                    "type": "broadcast",
                    "message": message.get("message", ""),
                    "timestamp": asyncio.get_event_loop().time()
                }
                for client in manager.active_connections.values():
                    await client.send_text(json.dumps(broadcast_message))
            
    except WebSocketDisconnect:
        manager.disconnect(client_id)
