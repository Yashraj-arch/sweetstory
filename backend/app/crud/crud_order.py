from typing import Dict, Any, List
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderQuoteRequest, OrderQuoteResponse

BASE_RATE_PER_KG = 1200.0  # Base artisan cake pricing in Lonand

TIER_MULTIPLIERS = {
    "single": 1.0,
    "two_tier_arch": 1.15,
    "three_tier_chandelier": 1.35,
    "four_tier_monolith": 1.50,
}

FLAVOR_SURCHARGES = {
    "Belgian Couverture Truffle": 250.0,
    "Madagascar Vanilla & Raspberry": 200.0,
    "Pistachio Rose Saffron": 300.0,
    "Lotus Biscoff Salted Caramel": 250.0,
    "Dutch Dark Chocolate Ganache": 150.0,
    "Seasonal Fresh Mango Creme": 200.0,
}

TOPPER_CATALOG = {
    "Edible Floral Wreath": 800.0,
    "24K Gold Leaf Accents": 600.0,
    "Custom Illuminated Couple Chamber": 1400.0,
    "Hand-Carved Wooden Heirloom Topper": 950.0,
    "Brass Ring Arch Stand Rental": 2200.0,
}

def calculate_authoritative_price(quote: OrderQuoteRequest) -> OrderQuoteResponse:
    weight = max(1.0, min(float(quote.weight_kg), 25.0))
    tier_mult = TIER_MULTIPLIERS.get(quote.tier_type.lower(), 1.0)
    flavor_surcharge = FLAVOR_SURCHARGES.get(quote.flavor, 200.0)
    
    # Calculate toppers total from catalog
    toppers_total = 0.0
    if quote.toppers:
        for topper in quote.toppers:
            toppers_total += TOPPER_CATALOG.get(topper, 500.0)
    
    # Base formula: (base_rate + flavor_surcharge) * weight * tier_multiplier + toppers_total
    cake_total = round(((BASE_RATE_PER_KG + flavor_surcharge) * weight * tier_mult) + toppers_total, 2)
    advance_deposit = round(cake_total * 0.30, 2) # 30% advance
    
    return OrderQuoteResponse(
        cake_id=quote.cake_id,
        base_rate_per_kg=BASE_RATE_PER_KG,
        weight_kg=weight,
        tier_multiplier=tier_mult,
        flavor_surcharge=flavor_surcharge,
        toppers_total=toppers_total,
        calculated_total=cake_total,
        advance_deposit=advance_deposit,
        currency="INR"
    )

def create_order(db: Session, order_in: OrderCreate, user_id: int = None) -> Order:
    # Server recalculates price to guarantee zero client-side tampering
    quote_res = calculate_authoritative_price(order_in)
    
    db_order = Order(
        user_id=user_id,
        customer_name=order_in.customer_name.strip(),
        customer_phone=order_in.customer_phone.strip(),
        cake_id=order_in.cake_id,
        cake_title=order_in.cake_title,
        tier_type=order_in.tier_type,
        weight_kg=quote_res.weight_kg,
        flavor=order_in.flavor,
        sponge=order_in.sponge,
        toppers=order_in.toppers,
        delivery_date=order_in.delivery_date,
        delivery_location=order_in.delivery_location,
        calculated_price=quote_res.calculated_total,
        advance_deposit=quote_res.advance_deposit,
        status="pending_confirmation"
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order
