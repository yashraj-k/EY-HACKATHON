from pydantic_settings import BaseSettings
from typing import Optional
import os

class AIConfig(BaseSettings):
    # LLM Configuration
    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    
    # Model settings
    default_model: str = "gpt-4"
    temperature: float = 0.1
    max_tokens: int = 4000
    
    # Agent settings
    max_concurrent_agents: int = 5
    agent_timeout: int = 300  # 5 minutes
    
    # Analysis settings
    confidence_threshold: float = 0.7
    max_iterations: int = 3
    
    # Data sources
    clinical_trials_api: str = "https://clinicaltrials.gov/api/v2"
    patent_api: str = "https://api.patentsview.org"
    pubmed_api: str = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"
    
    # Cache settings
    cache_ttl: int = 3600  # 1 hour
    enable_caching: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Global config instance
config = AIConfig()
