from sqlalchemy.orm import Session
from app.models.security_log import SecurityLog

def log_security_event(
    db: Session,
    event_type: str,
    ip_address: str,
    user_identifier: str = None,
    details: str = None
):
    try:
        log_entry = SecurityLog(
            event_type=event_type,
            ip_address=ip_address,
            user_identifier=user_identifier,
            details=details
        )
        db.add(log_entry)
        db.commit()
    except Exception:
        db.rollback()
