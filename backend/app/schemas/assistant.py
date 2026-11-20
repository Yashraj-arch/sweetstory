from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant|system)$")
    content: str = Field(..., min_length=1, max_length=2000)

class AssistantChatRequest(BaseModel):
    messages: List[ChatMessage]
    customer_name: Optional[str] = None
    language_hint: Optional[str] = None

class AssistantAction(BaseModel):
    label: str
    action_type: str = "link" # "link" or "trigger"
    url: Optional[str] = None
    target: Optional[str] = None

class AssistantChatResponse(BaseModel):
    reply: str
    greeting: str
    ist_time: str
    studio_open: bool
    actions: List[AssistantAction] = []
