from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select, or_
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    stmt = select(User).where(User.id == user_id)
    return db.execute(stmt).scalar_one_or_none()

def get_user_by_phone(db: Session, phone: str) -> Optional[User]:
    stmt = select(User).where(User.phone == phone)
    return db.execute(stmt).scalar_one_or_none()

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    if not email:
        return None
    stmt = select(User).where(User.email == email)
    return db.execute(stmt).scalar_one_or_none()

def get_user_by_identifier(db: Session, identifier: str) -> Optional[User]:
    stmt = select(User).where(or_(User.phone == identifier, User.email == identifier))
    return db.execute(stmt).scalar_one_or_none()

def create_user(db: Session, user_in: UserCreate) -> User:
    hashed_pwd = get_password_hash(user_in.password)
    db_user = User(
        full_name=user_in.full_name.strip(),
        phone=user_in.phone.strip(),
        email=user_in.email.strip().lower() if user_in.email else None,
        hashed_password=hashed_pwd,
        is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, identifier: str, password: str) -> Optional[User]:
    user = get_user_by_identifier(db, identifier.strip())
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user
