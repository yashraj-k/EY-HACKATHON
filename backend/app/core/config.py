from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # App settings
    app_name: str = "PharmaSynth-X"
    environment: str = "development"
    debug: bool = True
    
    # Database settings
    database_url: Optional[str] = None
    
    # Redis settings
    redis_url: str = "redis://localhost:6379"
    
    # AI Engine settings
    ai_engine_url: str = "http://localhost:8001"
    
    # Security settings
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS settings
    allowed_origins: list = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
