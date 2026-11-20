from contextlib import asynccontextmanager
import logging
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.middleware import SecurityHeadersMiddleware, RequestAuditLoggingMiddleware
from app.api.v1.api import api_router
from app.db.session import engine
from app.db.base import Base
# Import models to ensure they register on Base.metadata
import app.models

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("sweetstory_app")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Safe automatic schema creation on startup
    logger.info("Initializing database tables...")
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables verified/created successfully.")
    except Exception as exc:
        logger.error(f"Database initialization error: {exc}")
    yield
    logger.info("Application shutting down.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,      # Disable Swagger docs in production for security
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
    lifespan=lifespan
)

# 1. Audit Logging Middleware
app.add_middleware(RequestAuditLoggingMiddleware)

# 2. Defensive Security Headers Middleware
app.add_middleware(SecurityHeadersMiddleware)

# 3. Strict CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"^https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    max_age=600
)

# Include API Router
app.include_router(api_router, prefix="/api/v1")

@app.get("/health", tags=["Health"])
@app.get("/api/v1/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "Sweet Story Cakes Backend",
        "environment": settings.ENVIRONMENT
    }

# Global safe exception handler: prevents stack traces leaking to clients
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Our team has been notified."}
    )
