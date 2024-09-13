# app/core/config.py

from pydantic_settings import BaseSettings
from typing import List, Union
from pydantic import AnyHttpUrl

class Settings(BaseSettings):
    PROJECT_NAME: str = "FastAPI Template"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-secret-key"  # Change this!
    
    # BACKEND_CORS_ORIGINS is a comma-separated list of origins
    # e.g: "http://localhost,http://localhost:4200,http://localhost:3000"
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    DATABASE_URL: str = "sqlite:///./sql_app.db"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()

# To customize settings:
# 1. Modify the Settings class above
# 2. Update the .env file with your specific value