import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Phone, ArrowRight, Tag } from 'lucide-react';
import { subscriberAPI } from '../services/api';

const DISMISSAL_STORAGE_KEY = 'sweetstory_offer_dismissed_until';

export default function OfferSubscriptionToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if dismissed previously
    const dismissedUntil = localStorage.getItem(DISMISSAL_STORAGE_KEY);
    if (dismissedUntil && parseInt(dismissedUntil, 10) > Date.now()) {
      return; // Do not show if dismissed within grace period
    }

    // Delay appearance slightly so visitor can see page first (non-intrusive)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Dismiss for 14 days (14 * 24 * 60 * 60 * 1000)
    const expiration = Date.now() + 14 * 86400000;
    localStorage.setItem(DISMISSAL_STORAGE_KEY, expiration.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await subscriberAPI.subscribe({ phone, email });
      setSuccessData(data);
      // Automatically dismiss after showing coupon for 6 seconds
      setTimeout(() => {
        handleDismiss();
      }, 6000);
    } catch (err) {
      setError(err.message || 'Please enter a valid 10-digit Indian mobile number.');
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Exclusive Member Offer"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-md w-full bg-cream-50 border-2 border-cocoa-950 p-5 shadow-2xl rounded-none animate-slide-up"
    >
      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1 border border-cocoa-900/15 text-cocoa-700 hover:text-cocoa-950 hover:border-cocoa-950 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* SUCCESS STATE */}
      {successData ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs uppercase tracking-wider">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Subscription Confirmed</span>
          </div>
          <p className="text-xs text-cocoa-800 leading-relaxed">
            {successData.message}
          </p>
          <div className="p-3 bg-cocoa-950 text-cream-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-gold-400">Coupon:</span>
            </div>
            <span className="font-mono font-bold text-sm tracking-wider text-cream-50">
              {successData.coupon_code} (10% OFF)
            </span>
          </div>
          <p className="text-[10px] text-cocoa-500 font-mono">
            Mention this coupon on WhatsApp when finalizing your cake booking.
          </p>
        </div>
      ) : (
        /* PROMPT STATE */
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-cocoa-500">
              Sweet Story Privé // Member Offers
            </span>
          </div>

          <h4 className="font-serif text-lg font-bold text-cocoa-950 leading-snug mb-1">
            Enjoy 10% Off Your Next Celebration Cake
          </h4>
          <p className="text-xs text-cocoa-700 leading-relaxed mb-3">
            Enter your mobile number to receive secret weekend cake drops, festive discounts, and advance booking priority in Lonand & Satara.
          </p>

          {error && (
            <div className="mb-2 p-2 bg-rose-50 border border-rose-300 text-rose-900 text-[11px]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex">
              <span className="px-2.5 py-1.5 bg-cocoa-100 border border-r-0 border-cocoa-900/20 text-xs font-mono text-cocoa-800 flex items-center">
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={14}
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-cocoa-900/20 text-cocoa-950 text-xs focus:outline-none focus:border-cocoa-950 rounded-none placeholder:text-cocoa-400"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 px-3 bg-cocoa-950 hover:bg-cocoa-900 text-cream-100 text-xs font-mono uppercase tracking-widest border border-cocoa-950 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{loading ? 'Subscribing...' : 'Claim 10% Discount'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              
              <button
                type="button"
                onClick={handleDismiss}
                className="py-2 px-3 bg-transparent text-cocoa-600 hover:text-cocoa-950 text-xs font-mono uppercase tracking-widest border border-cocoa-900/15 transition-colors"
              >
                No Thanks
              </button>
            </div>
          </form>

          <span className="block text-[9px] font-mono text-cocoa-400 mt-2 text-center">
            Zero spam. Optional & dismissible anytime.
          </span>
        </div>
      )}
    </aside>
  );
}
