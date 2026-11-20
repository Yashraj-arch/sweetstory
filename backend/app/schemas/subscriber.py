from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator
from app.schemas.user import clean_indian_phone

class SubscriberCreate(BaseModel):
    phone: str = Field(..., description="10-digit mobile number for offer notifications")
    email: Optional[EmailStr] = None
    source: Optional[str] = Field(default="offer_toast", max_length=50)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        return clean_indian_phone(v)

class SubscriberOut(BaseModel):
    id: int
    phone: str
    email: Optional[str] = None
    source: str
    created_at: datetime

    class Config:
        from_attributes = True

class SubscribeResponse(BaseModel):
    status: str = "success"
    message: str
    coupon_code: str = "SWEETSTORY10"
    discount_pct: int = 10
