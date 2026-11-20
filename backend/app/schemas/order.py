from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, field_validator
from app.schemas.user import clean_indian_phone

class OrderQuoteRequest(BaseModel):
    cake_id: str
    tier_type: str
    weight_kg: float = Field(..., ge=1.0, le=25.0)
    flavor: str
    sponge: str
    toppers: Optional[List[str]] = []

class OrderQuoteResponse(BaseModel):
    cake_id: str
    base_rate_per_kg: float
    weight_kg: float
    tier_multiplier: float
    flavor_surcharge: float
    toppers_total: float
    calculated_total: float
    advance_deposit: float  # 30% advance booking deposit
    currency: str = "INR"

class OrderCreate(OrderQuoteRequest):
    cake_title: str
    customer_name: str = Field(..., min_length=2, max_length=100)
    customer_phone: str
    delivery_date: Optional[str] = None
    delivery_location: Optional[str] = None

    @field_validator("customer_phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        return clean_indian_phone(v)

class OrderOut(BaseModel):
    id: int
    customer_name: str
    customer_phone: str
    cake_title: str
    tier_type: str
    weight_kg: float
    flavor: str
    sponge: str
    calculated_price: float
    advance_deposit: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
