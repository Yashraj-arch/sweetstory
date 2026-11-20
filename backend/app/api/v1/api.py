from fastapi import APIRouter
from app.api.v1.endpoints import auth, subscribers, orders, assistant

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(subscribers.router, prefix="/subscribers", tags=["Subscribers"])
api_router.include_router(orders.router, prefix="/orders", tags=["Orders & Quotes"])
api_router.include_router(assistant.router, prefix="/assistant", tags=["AI Assistant"])
