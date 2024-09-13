from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "FastAPI Template"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-secret-key"  # Change this!

    # Allow all origins in development mode for permissive CORS
    BACKEND_CORS_ORIGINS: Union[List[AnyHttpUrl], List[str]] = ["*"]  # Allow all origins in dev mode

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, list):
            return v
        return v

    DATABASE_URL: str = "sqlite:///./sql_app.db"

    # Additional settings from .env
    BACKEND_PORT: str = "8000"
    DEBUG: bool = True  # Assuming dev mode
    LOG_LEVEL: str = "DEBUG"
    FRONTEND_PORT: str = "3000"
    REACT_APP_API_BASE_URL: str = "http://localhost:8000/api"
    REACT_APP_FEATURE_X_ENABLED: bool = False
    NODE_ENV: str = "development"  # Ensure NODE_ENV is set to development
    REACT_APP_ENABLE_HTTPS: bool = False

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()