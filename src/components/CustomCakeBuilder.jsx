import React, { useState } from 'react';
import { 
  MessageCircle, 
  Check, 
  Layers, 
  IndianRupee,
  Cake,
  Calendar
} from 'lucide-react';
import { BAKERY_INFO, FLAVOR_OPTIONS, TIER_OPTIONS, STYLE_ADDONS } from '../data/cakes';
import { ordersAPI } from '../services/api';

export default function CustomCakeBuilder({ initialCake, currentUser }) {
  const [selectedTier, setSelectedTier] = useState(TIER_OPTIONS[1]); // default double tier
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVOR_OPTIONS[0]); // default truffle
  const [weight, setWeight] = useState(2.5); // default kg
  const [isEggless, setIsEggless] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState(['floral-arch', 'topper-custom']);
  const [customMessage, setCustomMessage] = useState('Happily Ever After');
  const [eventDate, setEventDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleTierChange = (tier) => {
    setSelectedTier(tier);
    if (weight < tier.minWeight) setWeight(tier.minWeight);
    if (weight > tier.maxWeight) setWeight(tier.maxWeight);
  };

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const calculateTotal = () => {
    const flavorCost = Math.round(weight * selectedFlavor.pricePerKg);
    const tierCost = selectedTier.basePrice;
    const addonsCost = selectedAddons.reduce((sum, id) => {
      const item = STYLE_ADDONS.find(a => a.id === id);
      return sum + (item ? item.price : 0);
    }, 0);
    return flavorCost + tierCost + addonsCost;
  };

  const handleOrderWhatsApp = async () => {
    // Record verified quote in database
    try {
      await ordersAPI.createOrder({
        cake_id: selectedTier.id,
        cake_title: `${selectedTier.name} Custom Celebration Cake`,
        tier_type: selectedTier.id,
        weight_kg: weight,
        flavor: selectedFlavor.name,
        sponge: isEggless ? 'Pure Eggless Sponge' : 'Artisan Sponge',
        toppers: selectedAddons.map(id => STYLE_ADDONS.find(a => a.id === id)?.name).filter(Boolean),
        customer_name: currentUser ? currentUser.full_name : 'Valued Patron',
        customer_phone: currentUser ? currentUser.phone : '9822155763',
        delivery_date: eventDate || 'Date to be confirmed',
        delivery_location: 'Lonand/Satara'
      });
    } catch (err) {
      console.warn('Backend order recording notice:', err);
    }

    const addonsList = selectedAddons
      .map(id => STYLE_ADDONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join('\n  + ');

    const message = `Hello Sweet Story Cakes! 🎂\n\nI configured a custom cake on your website:\n\n` +
      `• Tier Structure: ${selectedTier.name}\n` +
      `• Flavor: ${selectedFlavor.name}\n` +
      `• Dietary: ${isEggless ? '100% Pure Eggless (Vegetarian)' : 'Regular'}\n` +
      `• Weight: ${weight} kg\n` +
      `• Estimated Total: ₹${calculateTotal().toLocaleString('en-IN')}\n` +
      `• Message / Topper: "${customMessage || 'N/A'}"\n` +
      `• Event Date: ${eventDate || 'To be confirmed'}\n` +
      (addonsList ? `• Add-ons & Accents:\n  + ${addonsList}\n` : '') +
      (specialInstructions ? `• Notes: ${specialInstructions}\n` : '') +
      `\nPlease verify date availability and confirm order booking for Lonand/Satara. Thank you!`;

    window.open(`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="builder" className="py-20 bg-cream-100 border-b border-cocoa-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-2">
            Bespoke Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa-950 mb-3">
            Design Your Signature Cake
          </h2>
          <p className="text-cocoa-700 text-sm sm:text-base leading-relaxed">
            Select tier architecture, artisan sponge, pure eggless preference, and structural accents. 
            Receive transparent price estimation and order directly via WhatsApp.
          </p>
        </div>

        {/* Builder Studio: Clean Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Configuration Controls with Sharp Corners */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 border border-cocoa-900/15">
            
            {/* 1. Architecture / Tiers */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-2">
                01. Tier Architecture
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIER_OPTIONS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => handleTierChange(tier)}
                    className={`p-4 border text-left transition-all ${
                      selectedTier.id === tier.id
                        ? 'border-cocoa-950 bg-cream-100/70'
                        : 'border-cocoa-900/15 hover:border-cocoa-900/40 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-cocoa-950 text-sm">{tier.name}</span>
                      {selectedTier.id === tier.id && (
                        <Check className="w-4 h-4 text-cocoa-950" />
                      )}
                    </div>
                    <span className="text-xs text-cocoa-600 mt-1 block">{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Flavor Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500">
                  02. Sponge & Filling
                </span>
                <span className="text-xs font-mono text-cocoa-600">
                  ₹{selectedFlavor.pricePerKg} / kg
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {FLAVOR_OPTIONS.map((flavor) => (
                  <button
                    key={flavor.id}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`p-3 border text-left transition-all ${
                      selectedFlavor.id === flavor.id
                        ? 'border-cocoa-950 bg-cream-100/70 font-semibold'
                        : 'border-cocoa-900/15 hover:border-cocoa-900/40 bg-white'
                    }`}
                  >
                    <span className="text-xs text-cocoa-950 block font-serif truncate font-bold mb-0.5">
                      {flavor.name}
                    </span>
                    <span className="text-[10px] text-cocoa-500 block line-clamp-1">{flavor.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Weight Slider & Dietary Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 pb-4 border-t border-b border-cocoa-900/10">
              
              {/* Weight Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500">
                    Weight / Scale
                  </span>
                  <span className="text-xs font-mono font-bold text-cocoa-950 bg-cream-200/80 px-2 py-0.5 border border-cocoa-900/10">
                    {weight} kg (~{Math.round(weight * 10)} Servings)
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedTier.minWeight}
                  max={selectedTier.maxWeight}
                  step={0.5}
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="w-full h-1 bg-cream-300 appearance-none cursor-pointer accent-cocoa-950"
                />
                <div className="flex justify-between text-[10px] text-cocoa-500 mt-1 font-mono">
                  <span>Min: {selectedTier.minWeight} kg</span>
                  <span>Max: {selectedTier.maxWeight} kg</span>
                </div>
              </div>

              {/* Eggless Dietary Preference */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-2">
                  Dietary Preference
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEggless(true)}
                    className={`flex-1 py-2 px-3 border text-xs font-medium transition-all ${
                      isEggless
                        ? 'border-cocoa-950 bg-cream-100 text-cocoa-950'
                        : 'border-cocoa-900/15 text-cocoa-600 hover:bg-cream-50'
                    }`}
                  >
                    100% Pure Veg (Eggless)
                  </button>
                  <button
                    onClick={() => setIsEggless(false)}
                    className={`py-2 px-3 border text-xs font-medium transition-all ${
                      !isEggless
                        ? 'border-cocoa-950 bg-cream-100 text-cocoa-950'
                        : 'border-cocoa-900/15 text-cocoa-600 hover:bg-cream-50'
                    }`}
                  >
                    Regular
                  </button>
                </div>
              </div>

            </div>

            {/* 4. Special Add-ons & Structural Accents */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-3">
                03. Structural Accents & Add-ons
              </span>
              <div className="space-y-2">
                {STYLE_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked 
                          ? 'border-cocoa-950 bg-cream-100/60' 
                          : 'border-cocoa-900/15 hover:border-cocoa-900/30 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-cocoa-950 border-cocoa-950 text-white' : 'border-cocoa-900/30 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-cocoa-950 block">{addon.name}</span>
                          <span className="text-[11px] text-cocoa-600 block">{addon.desc}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-cocoa-950 whitespace-nowrap pl-2">
                        +₹{addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Custom Message & Event Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-cocoa-500 mb-1">
                  Message on Cake / Topper
                </label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Happily Ever After"
                  className="w-full px-3.5 py-2.5 border border-cocoa-900/20 text-xs text-cocoa-950 focus:outline-none focus:border-cocoa-950 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-cocoa-500 mb-1">
                  Target Event Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-cocoa-900/20 text-xs text-cocoa-950 focus:outline-none focus:border-cocoa-950 bg-white"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Streamlined Order Specification & Pricing Receipt (No live architectural graphic) */}
          <div className="lg:col-span-5 sticky top-28 bg-white p-6 sm:p-8 border border-cocoa-900/15 space-y-6">
            
            <div className="pb-4 border-b border-cocoa-900/15">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-1">
                Order Specification
              </span>
              <h3 className="font-serif text-2xl font-bold text-cocoa-950">
                Custom Cake Summary
              </h3>
            </div>

            {/* Specifications List */}
            <div className="space-y-3 text-xs text-cocoa-800">
              <div className="flex justify-between py-1 border-b border-cocoa-900/5">
                <span className="text-cocoa-500">Tier Architecture:</span>
                <span className="font-bold text-cocoa-950">{selectedTier.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cocoa-900/5">
                <span className="text-cocoa-500">Flavor:</span>
                <span className="font-bold text-cocoa-950">{selectedFlavor.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cocoa-900/5">
                <span className="text-cocoa-500">Scale:</span>
                <span className="font-bold text-cocoa-950">{weight} kg (~{Math.round(weight * 10)} Servings)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cocoa-900/5">
                <span className="text-cocoa-500">Dietary:</span>
                <span className="font-bold text-cocoa-950">{isEggless ? '100% Pure Veg (Eggless)' : 'Regular'}</span>
              </div>
              {customMessage && (
                <div className="flex justify-between py-1 border-b border-cocoa-900/5">
                  <span className="text-cocoa-500">Topper Inscription:</span>
                  <span className="font-serif italic text-cocoa-950">"{customMessage}"</span>
                </div>
              )}
              {eventDate && (
                <div className="flex justify-between py-1 border-b border-cocoa-900/5">
                  <span className="text-cocoa-500">Event Date:</span>
                  <span className="font-mono text-cocoa-950">{eventDate}</span>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-cocoa-900/15 space-y-2 text-xs">
              <div className="flex justify-between text-cocoa-600">
                <span>Base Cake ({weight} kg @ ₹{selectedFlavor.pricePerKg}/kg):</span>
                <span className="font-mono font-medium">₹{(weight * selectedFlavor.pricePerKg).toLocaleString('en-IN')}</span>
              </div>
              {selectedTier.basePrice > 0 && (
                <div className="flex justify-between text-cocoa-600">
                  <span>{selectedTier.name} Surcharge:</span>
                  <span className="font-mono font-medium">+₹{selectedTier.basePrice}</span>
                </div>
              )}
              {selectedAddons.length > 0 && (
                <div className="flex justify-between text-cocoa-600">
                  <span>Structural Add-ons ({selectedAddons.length}):</span>
                  <span className="font-mono font-medium">
                    +₹{selectedAddons.reduce((s, id) => s + (STYLE_ADDONS.find(a => a.id === id)?.price || 0), 0)}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-cocoa-900/10 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cocoa-500 block">
                    Estimated Investment
                  </span>
                  <span className="font-serif text-3xl font-bold text-cocoa-950">
                    ₹{calculateTotal().toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-cocoa-500">Subject to date confirmation</span>
              </div>
            </div>

            {/* Direct WhatsApp Trigger with Sharp Styling */}
            <button
              onClick={handleOrderWhatsApp}
              className="w-full py-4 bg-cocoa-950 hover:bg-cocoa-900 text-cream-100 font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-2 border border-cocoa-950 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm & Order on WhatsApp</span>
            </button>

            <p className="text-[11px] text-center text-cocoa-500">
              Direct consultation with our Lonand bakery kitchen. No middlemen.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
