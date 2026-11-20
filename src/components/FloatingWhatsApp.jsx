import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="bg-white rounded-2xl p-3 shadow-warm-lg border border-cream-300 text-xs text-cocoa-900 max-w-[210px] relative animate-in fade-in slide-in-from-bottom-2 duration-300 hidden sm:block">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 bg-cream-200 text-cocoa-600 rounded-full p-0.5 hover:bg-cream-300"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-semibold text-emerald-800 flex items-center gap-1 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            Chef Online Now
          </p>
          <p className="text-[11px] text-cocoa-600">
            Need a custom cake for your event? Tap to chat on WhatsApp!
          </p>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encodeURIComponent(
          "Hello Sweet Story Cakes! 🎂 I'm browsing your website and would love to ask about custom cake designs & pricing."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-warm-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 group relative"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
        <MessageCircle className="w-7 h-7 fill-current group-hover:rotate-12 transition-transform duration-300" />
      </a>

    </div>
  );
}
