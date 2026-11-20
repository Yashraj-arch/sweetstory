from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    
    # Customer Details (in case of guest inquiry or snapshot)
    customer_name = Column(String(100), nullable=False)
    customer_phone = Column(String(15), nullable=False, index=True)
    
    # Cake Specifications
    cake_id = Column(String(50), nullable=False)
    cake_title = Column(String(150), nullable=False)
    tier_type = Column(String(50), nullable=False)
    weight_kg = Column(Numeric(5, 2), nullable=False)
    flavor = Column(String(100), nullable=False)
    sponge = Column(String(100), nullable=False)
    toppers = Column(JSON, nullable=True)
    
    # Delivery details
    delivery_date = Column(String(50), nullable=True)
    delivery_location = Column(String(150), nullable=True)
    
    # Price verification
    calculated_price = Column(Numeric(10, 2), nullable=False)
    advance_deposit = Column(Numeric(10, 2), nullable=False)
    status = Column(String(50), default="pending_confirmation", nullable=False)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    user = relationship("User", back_populates="orders")
