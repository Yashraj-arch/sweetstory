import time
import threading
from typing import Dict, List, Tuple
from fastapi import Request, HTTPException, status

class SlidingWindowRateLimiter:
    """
    Thread-safe in-memory sliding window rate limiter.
    Prevents brute force attacks and request flooding without external Redis dependencies.
    """
    def __init__(self):
        self._requests: Dict[str, List[float]] = {}
        self._lock = threading.Lock()

    def is_allowed(self, key: str, max_requests: int, window_seconds: int) -> Tuple[bool, int]:
        now = time.time()
        cutoff = now - window_seconds
        
        with self._lock:
            if key not in self._requests:
                self._requests[key] = []
            
            # Prune expired timestamps
            self._requests[key] = [t for t in self._requests[key] if t > cutoff]
            
            if len(self._requests[key]) >= max_requests:
                # Calculate retry-after seconds
                oldest = self._requests[key][0]
                retry_after = int(oldest + window_seconds - now) + 1
                return False, max(retry_after, 1)
            
            self._requests[key].append(now)
            return True, 0

limiter = SlidingWindowRateLimiter()

def check_rate_limit(request: Request, max_requests: int, window_seconds: int, scope: str = "general"):
    client_ip = request.client.host if request.client else "127.0.0.1"
    # Respect X-Forwarded-For if behind a proxy
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()
    
    key = f"{scope}:{client_ip}"
    allowed, retry_after = limiter.is_allowed(key, max_requests, window_seconds)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Too many requests. Please try again in {retry_after} seconds.",
            headers={"Retry-After": str(retry_after)}
        )
