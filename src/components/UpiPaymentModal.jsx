import React, { useState } from 'react';
import { X, Check, Copy, QrCode } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';

export default function UpiPaymentModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText("9321557634");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa-950/70 backdrop-blur-sm">
      <div className="bg-white max-w-md w-full border border-cocoa-950 p-6 sm:p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 border border-cocoa-900/20 text-cocoa-700 hover:text-cocoa-950"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-1">
            Token Advance
          </span>
          <h3 className="font-serif text-2xl font-bold text-cocoa-950">
            UPI Booking Confirmation
          </h3>
          <p className="text-xs text-cocoa-600 mt-1">
            Google Pay • PhonePe • Paytm • BHIM
          </p>
        </div>

        {/* QR Code Placeholder Graphic */}
        <div className="my-6 p-4 bg-cream-100 border border-cocoa-900/15 flex flex-col items-center justify-center">
          <div className="w-40 h-40 bg-white p-3 border border-cocoa-900/15 flex flex-col items-center justify-center">
            <svg className="w-full h-full text-cocoa-950" viewBox="0 0 100 100" fill="currentColor">
              <rect x="10" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="17" y="17" width="11" height="11" fill="currentColor" />
              <rect x="65" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="72" y="17" width="11" height="11" fill="currentColor" />
              <rect x="10" y="65" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="17" y="72" width="11" height="11" fill="currentColor" />
              <rect x="45" y="15" width="10" height="20" />
              <rect x="15" y="45" width="20" height="10" />
              <rect x="42" y="42" width="16" height="16" fill="#C89B3C" />
              <rect x="65" y="45" width="12" height="12" />
              <rect x="45" y="68" width="15" height="12" />
              <rect x="70" y="70" width="18" height="18" />
            </svg>
          </div>
          <span className="text-[11px] font-mono text-cocoa-700 mt-2">
            Scan to Pay Sweet Story Cakes
          </span>
        </div>

        {/* Mobile Number Copy */}
        <div className="space-y-3">
          <div className="p-3 bg-cream-50 border border-cocoa-900/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-cocoa-500 block">UPI Mobile Number</span>
              <span className="font-mono font-bold text-sm text-cocoa-950">9321557634</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-cocoa-950 text-cream-100 text-xs font-mono uppercase tracking-wider hover:bg-cocoa-900 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <p className="text-[11px] text-cocoa-600 leading-relaxed text-center">
            After sending advance token payment, please share screenshot on WhatsApp at <strong>+91 93215 57634</strong> to receive instant order confirmation.
          </p>
        </div>

      </div>
    </div>
  );
}
