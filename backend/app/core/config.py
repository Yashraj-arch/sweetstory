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
    CORS_ORIGINS: Union[str, List[str]] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if v.startswith("["):
                try:
                    import json
                    return json.loads(v)
                except Exception:
                    pass
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
    
    # AI Assistant (Groq Cloud Dual-Key Failover)
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_API_KEY_6: str = os.getenv("GROQ_API_KEY_6", "")
    GROQ_API_KEY_7: str = os.getenv("GROQ_API_KEY_7", "")
    GROQ_API_KEYS: Union[str, List[str]] = os.getenv("GROQ_API_KEYS", "")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
    ASSISTANT_RATE_LIMIT_MAX: int = 30
    ASSISTANT_RATE_LIMIT_WINDOW: int = 60  # 30 msgs / min

    def get_all_groq_keys(self) -> List[str]:
        keys = []
        for k in [self.GROQ_API_KEY, self.GROQ_API_KEY_6, self.GROQ_API_KEY_7]:
            if k and k.strip() and k.strip() not in keys:
                keys.append(k.strip())
        if isinstance(self.GROQ_API_KEYS, list):
            for k in self.GROQ_API_KEYS:
                if k and k.strip() and k.strip() not in keys:
                    keys.append(k.strip())
        elif isinstance(self.GROQ_API_KEYS, str) and self.GROQ_API_KEYS.strip():
            for k in self.GROQ_API_KEYS.split(","):
                if k.strip() and k.strip() not in keys:
                    keys.append(k.strip())
        return keys

    model_config = SettingsConfigDict(
        env_file=str(BASE_DIR / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
