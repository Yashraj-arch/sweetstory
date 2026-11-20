import time
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

logger = logging.getLogger("security_audit")

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Enterprise security headers middleware.
    Injects defensive headers to protect against XSS, clickjacking, MIME-sniffing, and info leakage.
    """
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        
        # Defensive Security Headers
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), camera=(), microphone=(), payment=()"
        response.headers["Server"] = "SweetStory-Secured"
        
        # Content Security Policy (strict with minimal required allowances)
        csp = (
            "default-src 'self' http://localhost:* https:; "
            "img-src 'self' data: https: blob:; "
            "script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com data:; "
            "connect-src 'self' http://localhost:* http://127.0.0.1:* https:; "
            "frame-ancestors 'none';"
        )
        response.headers["Content-Security-Policy"] = csp
        
        return response

class RequestAuditLoggingMiddleware(BaseHTTPMiddleware):
    """
    Audit logging middleware to trace latency and flag anomalous HTTP statuses (4xx, 5xx).
    """
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        client_ip = request.client.host if request.client else "unknown"
        
        try:
            response: Response = await call_next(request)
            duration_ms = round((time.time() - start_time) * 1000, 2)
            
            if response.status_code >= 400:
                logger.warning(
                    f"AUDIT_ALERT: {request.method} {request.url.path} "
                    f"Status={response.status_code} IP={client_ip} Duration={duration_ms}ms"
                )
            return response
        except Exception as exc:
            duration_ms = round((time.time() - start_time) * 1000, 2)
            logger.error(
                f"AUDIT_CRITICAL: Unhandled error on {request.method} {request.url.path} "
                f"IP={client_ip} Duration={duration_ms}ms Error={str(exc)}"
            )
            raise
