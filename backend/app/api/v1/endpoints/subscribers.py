from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.config import settings
from app.core.rate_limit import check_rate_limit
from app.crud.crud_subscriber import subscribe_phone
from app.schemas.subscriber import SubscriberCreate, SubscribeResponse

router = APIRouter()

@router.post("/subscribe", response_model=SubscribeResponse, status_code=status.HTTP_200_OK)
def subscribe(
    sub_in: SubscriberCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    # Rate limit check: max 10 requests per minute per IP
    check_rate_limit(
        request,
        max_requests=settings.SUBSCRIBE_RATE_LIMIT_MAX,
        window_seconds=settings.SUBSCRIBE_RATE_LIMIT_WINDOW,
        scope="subscribe"
    )
    
    subscriber = subscribe_phone(db, sub_in)
    
    return SubscribeResponse(
        status="success",
        message="Thank you! You have been subscribed to exclusive wedding cake updates and seasonal promotions.",
        coupon_code="SWEETSTORY10",
        discount_pct=10
    )
