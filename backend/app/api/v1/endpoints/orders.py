from typing import List, Optional
from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.session import get_db
from app.core.rate_limit import check_rate_limit
from app.crud.crud_order import calculate_authoritative_price, create_order
from app.schemas.order import OrderCreate, OrderQuoteRequest, OrderQuoteResponse, OrderOut
from app.api.deps import get_current_user_optional, get_current_user
from app.models.user import User
from app.models.order import Order

router = APIRouter()

@router.post("/quote", response_model=OrderQuoteResponse)
def get_order_quote(
    quote_in: OrderQuoteRequest,
    request: Request
):
    """
    Computes authoritative pricing on the backend to prevent client-side manipulation.
    """
    check_rate_limit(request, max_requests=30, window_seconds=60, scope="quote")
    return calculate_authoritative_price(quote_in)

@router.post("/create", response_model=OrderOut, status_code=status.HTTP_201_CREATED)
def submit_order(
    order_in: OrderCreate,
    request: Request,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """
    Creates an order with server-verified prices.
    Attaches to authenticated customer if logged in.
    """
    check_rate_limit(request, max_requests=10, window_seconds=60, scope="create_order")
    user_id = current_user.id if current_user else None
    
    order = create_order(db, order_in, user_id=user_id)
    return OrderOut.model_validate(order)

@router.get("/my-orders", response_model=List[OrderOut])
def get_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Returns order history for the authenticated customer.
    """
    stmt = select(Order).where(Order.user_id == current_user.id).order_by(Order.created_at.desc())
    orders = db.execute(stmt).scalars().all()
    return [OrderOut.model_validate(o) for o in orders]
