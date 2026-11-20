from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.subscriber import Subscriber
from app.schemas.subscriber import SubscriberCreate

def get_subscriber_by_phone(db: Session, phone: str) -> Optional[Subscriber]:
    stmt = select(Subscriber).where(Subscriber.phone == phone)
    return db.execute(stmt).scalar_one_or_none()

def subscribe_phone(db: Session, sub_in: SubscriberCreate) -> Subscriber:
    existing = get_subscriber_by_phone(db, sub_in.phone)
    if existing:
        if not existing.is_subscribed:
            existing.is_subscribed = True
            db.commit()
            db.refresh(existing)
        return existing
    
    new_sub = Subscriber(
        phone=sub_in.phone,
        email=sub_in.email.lower() if sub_in.email else None,
        source=sub_in.source or "offer_toast",
        is_subscribed=True
    )
    db.add(new_sub)
    db.commit()
    db.refresh(new_sub)
    return new_sub
