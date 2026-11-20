import re
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator

def clean_indian_phone(v: str) -> str:
    if not v:
        raise ValueError("Phone number is required")
    # Strip spaces, hyphens, plus sign, leading 91 or 0
    cleaned = re.sub(r"[\s\-\(\)\+]", "", v)
    if cleaned.startswith("91") and len(cleaned) == 12:
        cleaned = cleaned[2:]
    elif cleaned.startswith("0") and len(cleaned) == 11:
        cleaned = cleaned[1:]
    
    if not re.match(r"^[6-9]\d{9}$", cleaned):
        raise ValueError("Must be a valid 10-digit Indian mobile number starting with 6-9")
    return cleaned

class UserBase(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, description="Customer full name")
    phone: str = Field(..., description="10-digit mobile number")
    email: Optional[EmailStr] = None

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        return clean_indian_phone(v)

class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=72, description="Password (6 to 72 characters)")

class UserLogin(BaseModel):
    identifier: str = Field(..., min_length=3, max_length=120, description="Phone number or email")
    password: str = Field(..., min_length=1, max_length=72)

class UserOut(BaseModel):
    id: int
    full_name: str
    phone: str
    email: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
