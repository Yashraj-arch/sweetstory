from fastapi import APIRouter, HTTPException, Request, status
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone, timedelta
import json
import urllib.request
import urllib.error
import urllib.parse
import logging
from app.core.config import settings
from app.schemas.assistant import AssistantChatRequest, AssistantChatResponse, AssistantAction

logger = logging.getLogger("sweetstory_assistant")
router = APIRouter()

# Indian Standard Time (UTC+5:30)
IST = timezone(timedelta(hours=5, minutes=30))

def get_ist_context():
    now = datetime.now(IST)
    hour = now.hour
    time_str = now.strftime("%I:%M %p")
    date_str = now.strftime("%A, %d %B %Y")
    
    # Operating hours: 10:00 AM to 10:00 PM
    is_open = 10 <= hour < 22
    
    if 5 <= hour < 12:
        greeting = "Good morning"
        greeting_mr = "शुभ सकाळ"
        greeting_hi = "शुभ प्रभात"
        period = "morning"
    elif 12 <= hour < 17:
        greeting = "Good afternoon"
        greeting_mr = "शुभ दुपार"
        greeting_hi = "शुभ दोपहर"
        period = "afternoon"
    elif 17 <= hour < 22:
        greeting = "Good evening"
        greeting_mr = "शुभ संध्याकाळ"
        greeting_hi = "शुभ संध्या"
        period = "evening"
    else:
        greeting = "Hello & Welcome"
        greeting_mr = "शुभ रात्री / नमस्कार"
        greeting_hi = "शुभ रात्रि / नमस्ते"
        period = "night"
        
    return {
        "time_str": time_str,
        "date_str": date_str,
        "is_open": is_open,
        "greeting": greeting,
        "greeting_mr": greeting_mr,
        "greeting_hi": greeting_hi,
        "period": period,
        "hour": hour
    }

SYSTEM_PROMPT_TEMPLATE = """You are the 'Sweet Story Concierge', an exceptionally polite, refined, and helpful AI assistant for Sweet Story Cakes—a boutique artisan pâtisserie based in Lonand, Satara, Maharashtra, India.

CURRENT TIME & CONTEXT IN LONAND, SATARA (IST):
- Current Date & Time: {date_str}, {time_str} IST
- Time Period: {period} (Appropriate greeting: "{greeting}")
- Studio Status: {studio_status_text}

FOUNDER & HEAD PASTRY ARTIST (RAJNANDINI ZAVERI):
- Role: Senior Cake Decorator & Pastry Artist with 7 years of specialized experience at Sweet Story Cake Shop, Satara.
- Artistry & Skills: Master of intricate icing techniques, razor-sharp finishes, hand-piped florals, fondant sculpting, and custom structural wedding architecture (like suspended chandeliers and illuminated floral ring arches).
- Philosophy: "Life is sweet when every celebration is crafted with intention."
- Location: Balaji Nagar, Katraj, Pune & Lonand, Satara.
- Contact: Email zaverirajnandini@gmail.com, Phone +91 8657648079.

KITCHEN STANDARDS & DIETARY:
- 100% Pure Vegetarian / Eggless is our hallmark kitchen standard.
- Zero chemical stabilizers, preservatives, or artificial gelatins. Real cultured butter, Belgian Callebaut chocolate, farm dairy, fresh fruit reductions.
- Jain-friendly cakes, sugar-free, stevia-sweetened, and vegan options are gladly handcrafted upon custom request.

SIGNATURE CONFECTIONS & PRICING:
1. The Royal Floral Ring Arch Cake: ₹2,800 – ₹4,500 (2.5 – 4.0 kg, illuminated brass floral ring, embedded acrylic photo chamber, red velvet & Belgian white chocolate).
2. The Floating Chandelier Suspended Cake: ₹4,500 – ₹8,500 (3.5 – 6.0 kg, gravity-defying suspended rig, Madagascar vanilla & wild strawberry).
3. Opulent Belgian Chocolate Truffle Tower: ₹1,950 – ₹3,600 (54% Callebaut dark cocoa, gold leaf).
4. Vintage Lambeth Victorian Ruffle Cake: ₹2,200 – ₹3,800 (Rococo royal piping, pistachio rose cardamom).
5. Safari Train 3-Tier Birthday Cake: ₹3,200 – ₹5,500 (moving train track, handcrafted sugar animals).

LOCATION & TEMPERATURE-CONTROLLED LOGISTICS:
- Physical Studio: Opposite Gajanan Appliances, Lonand, Satara, Maharashtra - 415521.
- Delivery Zones:
  * Lonand Town: 100% Free doorstep delivery.
  * Surrounding Hubs: Shirwal, Phaltan, Wai, Bhuinj, and Satara City (Minimum order 1.5–2 kg or modest delivery charge for distance).

ORDERING, LEAD TIMES & ADVANCE POLICY:
- Lead Time: 24 hours advance for standard/custom cakes; 48–72 hours for multi-tier arches and hanging chandeliers. Same-day urgent orders accepted if placed before 2:00 PM IST (subject to kitchen capacity).
- Advance Token Policy: ₹500 advance for custom celebration cakes; ₹1,500 for wedding tiers via UPI ID 9321557634@okbizaxis.

STRICT BEHAVIORAL RULES:
1. Greet the customer warmly using the current IST time period ({greeting} / {greeting_mr} / {greeting_hi}).
2. Language Adaptability: Always reply in the exact language the customer speaks (English, Marathi मराठी, Hindi हिंदी, or Hinglish). Keep Marathi polite and respectful.
3. Strict Domain Guardrail: ONLY answer questions regarding Sweet Story Cakes, confections, flavors, pricing, Rajnandini Zaveri's background/CV, studio location, timings, and ordering. If a user asks about anything unrelated (politics, general coding, sports, weather outside Lonand, homework), politely decline: "I am the Sweet Story Concierge, exclusively dedicated to assisting you with our artisanal confections, custom cake designs, and bakery studio inquiries. How may I assist your celebration?"
4. Night-Time Protocol: If the studio is closed (after 10:00 PM IST), explain warmly: "Our baking studio is resting for the night and reopens at 10:00 AM IST. I have noted all your cake requirements, and Rajnandini will review and confirm your celebration order via WhatsApp first thing in the morning!"
5. WhatsApp Order Handover: When the customer finalizes cake specifications (weight, flavor, occasion, date), summarize their request and suggest contacting Rajnandini directly on WhatsApp (+91 8657648079).
"""

def generate_fallback_reply(user_msg: str, ist: Dict[str, Any]) -> str:
    msg_lower = user_msg.lower()
    time_greeting = ist["greeting"]
    
    # Check language
    is_marathi = any(w in user_msg for w in ["नमस्कार", "कसा", "केव्हा", "कुठे", "किंमत", "सांगा", "मिळेल", "आहे"])
    is_hindi = any(w in user_msg for w in ["नमस्ते", "कहाँ", "कितना", "मिलेगा", "अंडे", "शाकाहारी"])
    
    if is_marathi:
        if "rajnandini" in msg_lower or "शेफ" in user_msg or "आर्टिस्ट" in user_msg:
            return f"{ist['greeting_mr']}! राजनंदिनी झवेरी या आमच्या स्वीट स्टोरीच्या हेड पेस्ट्री आर्टिस्ट आणि केक डेकोरेटर आहेत. त्यांना ७ वर्षांचा दांडगा अनुभव असून त्या इंट्रिकेट आयसिंग, फॉन्डंट वर्क आणि रॉयल वेडिंग केक आर्किटेक्चरमध्ये निष्णात आहेत."
        if "कधी" in user_msg or "वेळ" in user_msg or "time" in msg_lower:
            return f"{ist['greeting_mr']}! आमचा लोणंद येथील स्टुडिओ दररोज सकाळी १०:०० ते रात्री १०:०० पर्यंत सुरू असतो. सध्या लोणंदमध्ये वेळ {ist['time_str']} झाली आहे."
        return f"{ist['greeting_mr']}! स्वीट स्टोरी केक्समध्ये आपले स्वागत आहे. आमचे सर्व केक्स १००% शुद्ध शाकाहारी (Eggless) असतात. आपल्याला वाढदिवस किंवा लग्नासाठी खास केक बनवायचा आहे का?"
        
    if "rajnandini" in msg_lower or "chef" in msg_lower or "cv" in msg_lower or "artist" in msg_lower or "resume" in msg_lower:
        return f"{time_greeting}! Rajnandini Zaveri is our Senior Cake Decorator & Pastry Artist with 7 years of specialized mastery at Sweet Story Cake Shop, Satara. She specializes in bespoke structural wedding architecture (like suspended chandeliers and illuminated floral arches), intricate piped florals, and 100% pure vegetarian haute pâtisserie. You can reach her directly at zaverirajnandini@gmail.com or +91 8657648079."

    if "location" in msg_lower or "where" in msg_lower or "address" in msg_lower or "place" in msg_lower or "deliver" in msg_lower:
        return f"{time_greeting}! Our main studio is located Opposite Gajanan Appliances, Lonand, Satara (Maharashtra - 415521). We provide 100% free doorstep delivery across Lonand town, and temperature-controlled logistics to Shirwal, Phaltan, Wai, Bhuinj, and Satara City!"

    if "eggless" in msg_lower or "veg" in msg_lower or "vegetarian" in msg_lower or "jain" in msg_lower:
        return f"{time_greeting}! Every single cake at Sweet Story is 100% Pure Vegetarian & Eggless by default! We use pure cultured butter, fresh farm dairy, and authentic Belgian Callebaut chocolate. We also craft Jain-friendly, sugar-free, and vegan options upon custom request."

    if "price" in msg_lower or "cost" in msg_lower or "rate" in msg_lower or "tier" in msg_lower:
        return f"{time_greeting}! Our bespoke signature creations range from ₹1,950 for our Belgian Truffle Tower, ₹2,800 – ₹4,500 for The Royal Floral Ring Arch Cake, up to ₹8,500 for monumental 3-Tier Suspended Chandelier cakes. Custom celebration cakes start around ₹650–₹900/kg depending on flavor and structural detailing."

    return f"{time_greeting}! Welcome to Sweet Story Cakes. I am your concierge. Whether you are looking for our signature Floral Ring Arch, a custom multi-tier wedding centerpiece sculpted by Rajnandini, or delivery across Lonand, Shirwal, and Satara, I am delighted to assist you. What celebration are you planning?"

@router.get("/context")
def get_assistant_context():
    ist = get_ist_context()
    return {
        "time_str": ist["time_str"],
        "date_str": ist["date_str"],
        "is_open": ist["is_open"],
        "greeting": ist["greeting"],
        "greeting_mr": ist["greeting_mr"],
        "initial_message": f"{ist['greeting']}! Welcome to Sweet Story Cakes. How may I assist you with our bespoke cakes or celebrate with you today?"
    }

@router.post("/chat", response_model=AssistantChatResponse)
def assistant_chat(payload: AssistantChatRequest, request: Request):
    ist = get_ist_context()
    studio_status_text = "OPEN NOW (Closes at 10:00 PM IST)" if ist["is_open"] else "CLOSED FOR THE NIGHT (Reopens at 10:00 AM IST)"
    
    if not payload.messages:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Message thread cannot be empty")
        
    last_user_message = payload.messages[-1].content
    
    # Multi-Key Groq API Execution with Automatic Failover
    available_keys = settings.get_all_groq_keys()
    ai_reply = None
    
    if available_keys:
        system_prompt = SYSTEM_PROMPT_TEMPLATE.format(
            date_str=ist["date_str"],
            time_str=ist["time_str"],
            period=ist["period"],
            greeting=ist["greeting"],
            greeting_mr=ist["greeting_mr"],
            greeting_hi=ist["greeting_hi"],
            studio_status_text=studio_status_text
        )
        
        # Format message thread for Groq
        formatted_messages = [{"role": "system", "content": system_prompt}]
        # Keep up to last 8 turns for memory
        for m in payload.messages[-8:]:
            formatted_messages.append({"role": m.role, "content": m.content})
            
        groq_url = "https://api.groq.com/openai/v1/chat/completions"
        groq_payload = {
            "model": settings.GROQ_MODEL,
            "messages": formatted_messages,
            "temperature": 0.6,
            "max_tokens": 500
        }

        # Try available keys in sequence (Key 1 -> Key 2)
        for key_idx, groq_key in enumerate(available_keys):
            try:
                headers = {
                    "Authorization": f"Bearer {groq_key}",
                    "Content-Type": "application/json",
                    "User-Agent": "SweetStory/1.0"
                }
                
                req = urllib.request.Request(
                    groq_url,
                    data=json.dumps(groq_payload).encode("utf-8"),
                    headers=headers
                )
                
                with urllib.request.urlopen(req, timeout=12) as response:
                    res_data = json.loads(response.read().decode("utf-8"))
                    choice = res_data.get("choices", [{}])[0]
                    message_obj = choice.get("message", {})
                    content_str = message_obj.get("content")
                    
                    if content_str and content_str.strip():
                        ai_reply = content_str.strip()
                        break
                    else:
                        logger.warning(f"Groq Key #{key_idx + 1} returned empty content (reasoning-only). Checking backup...")
            except Exception as exc:
                logger.warning(f"Groq Key #{key_idx + 1} call failed ({exc}). Failing over to next key...")
                continue

    if not ai_reply:
        # Fallback to local high-intelligence knowledge engine
        ai_reply = generate_fallback_reply(last_user_message, ist)
        
    # Generate suggested action buttons
    actions: List[AssistantAction] = []
    
    # If order, booking, or price is mentioned, add WhatsApp Consultation action
    msg_low = last_user_message.lower()
    if any(k in msg_low for k in ["order", "book", "price", "cost", "custom", "wedding", "tier", "kharidi", "cake"]):
        wa_text = f"Hello Rajnandini, I was chatting with Sweet Story Concierge about ordering a cake. My request: {last_user_message[:100]}"
        actions.append(AssistantAction(
            label="Chat with Rajnandini on WhatsApp",
            action_type="link",
            url=f"https://wa.me/918657648079?text={urllib.parse.quote(wa_text)}"
        ))
        actions.append(AssistantAction(
            label="Open Custom Cake Studio",
            action_type="trigger",
            target="open_builder"
        ))
    elif any(k in msg_low for k in ["rajnandini", "cv", "artist", "chef", "decorator", "about"]):
        actions.append(AssistantAction(
            label="View Rajnandini's Full CV & Profile",
            action_type="trigger",
            target="open_about"
        ))
        
    return AssistantChatResponse(
        reply=ai_reply,
        greeting=ist["greeting"],
        ist_time=ist["time_str"],
        studio_open=ist["is_open"],
        actions=actions
    )
