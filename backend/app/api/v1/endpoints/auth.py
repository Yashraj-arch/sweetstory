from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.config import settings
from app.core.security import create_access_token
from app.core.rate_limit import check_rate_limit
from app.crud.crud_user import (
    get_user_by_phone,
    get_user_by_email,
    create_user,
    authenticate_user
)
from app.crud.crud_security import log_security_event
from app.schemas.user import UserCreate, UserLogin, UserOut, TokenResponse
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(
    user_in: UserCreate,
    response: Response,
    request: Request,
    db: Session = Depends(get_db)
):
    # Rate limit check on registration
    check_rate_limit(request, max_requests=10, window_seconds=600, scope="register")
    client_ip = request.client.host if request.client else "unknown"

    # Check phone uniqueness
    existing_phone = get_user_by_phone(db, user_in.phone)
    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A customer account with this phone number already exists."
        )

    # Check email uniqueness if provided
    if user_in.email:
        existing_email = get_user_by_email(db, user_in.email)
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A customer account with this email address already exists."
            )

    user = create_user(db, user_in)
    access_token = create_access_token(subject=user.id)

    # Set secure HttpOnly cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=settings.SECURE_COOKIES
    )

    log_security_event(
        db,
        event_type="REGISTER_SUCCESS",
        ip_address=client_ip,
        user_identifier=user.phone,
        details=f"Customer registered ID={user.id}"
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserOut.model_validate(user)
    )

@router.post("/login", response_model=TokenResponse)
def login(
    login_in: UserLogin,
    response: Response,
    request: Request,
    db: Session = Depends(get_db)
):
    # Enforce strict brute-force rate limit: max 5 tries per 15 mins per IP
    check_rate_limit(
        request,
        max_requests=settings.AUTH_RATE_LIMIT_MAX,
        window_seconds=settings.AUTH_RATE_LIMIT_WINDOW,
        scope="login"
    )
    client_ip = request.client.host if request.client else "unknown"

    user = authenticate_user(db, login_in.identifier, login_in.password)
    if not user:
        log_security_event(
            db,
            event_type="AUTH_FAIL",
            ip_address=client_ip,
            user_identifier=login_in.identifier,
            details="Invalid phone/email or password"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect phone number/email or password.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token = create_access_token(subject=user.id)

    # Set secure HttpOnly cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=settings.SECURE_COOKIES
    )

    log_security_event(
        db,
        event_type="AUTH_SUCCESS",
        ip_address=client_ip,
        user_identifier=user.phone,
        details=f"Customer login ID={user.id}"
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserOut.model_validate(user)
    )

@router.get("/me", response_model=UserOut)
def get_current_customer_profile(
    current_user: User = Depends(get_current_user)
):
    return UserOut.model_validate(current_user)

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite="lax",
        secure=settings.SECURE_COOKIES
    )
    return {"status": "success", "message": "Logged out successfully"}
