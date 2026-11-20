from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl, field_validator
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sweet Story Cakes API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = False
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "sweetstory_dev_super_secret_key_lonand_pasticceria_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "mysql+pymysql://root:Reynolds%4008@127.0.0.1:3306/sweetstory"
    )
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return []
    
    # Cookie security
    SECURE_COOKIES: bool = False
    
    # Rate Limiting
    AUTH_RATE_LIMIT_MAX: int = 5
    AUTH_RATE_LIMIT_WINDOW: int = 900  # 15 minutes
    
    SUBSCRIBE_RATE_LIMIT_MAX: int = 10
    SUBSCRIBE_RATE_LIMIT_WINDOW: int = 60  # 1 minute

    model_config = SettingsConfigDict(
        env_file=str(BASE_DIR / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
