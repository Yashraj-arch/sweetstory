import certifi
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

def get_engine():
    connect_args = {}
    
    # If connection string is TiDB Cloud (or contains ssl flags), pass system CA certificates
    if "tidbcloud" in settings.DATABASE_URL.lower() or "ssl" in settings.DATABASE_URL.lower():
        connect_args["ssl"] = {"ca": certifi.where()}
    
    engine = create_engine(
        settings.DATABASE_URL,
        echo=settings.DEBUG,
        pool_pre_ping=True,       # Verifies connection freshness before serving queries
        pool_recycle=300,         # Recycles MySQL connections every 5 mins to prevent stale timeouts
        pool_size=10,             # Concurrency capacity
        max_overflow=20,
        connect_args=connect_args
    )
    return engine

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
