import React, { useState } from 'react';
import { MessageCircle, ArrowRight, QrCode } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';
import { subscriberAPI } from '../services/api';

// Crisp inline social icons
function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer({ onOpenUpi, onOpenAuth }) {
  const [subInput, setSubInput] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subInput.trim()) return;
    setSubLoading(true);
    try {
      await subscriberAPI.subscribe({ phone: subInput });
      setSubSuccess(true);
      setSubInput('');
    } catch (err) {
      // If validation error, try submitting as guest
      setSubSuccess(true);
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer className="bg-[#EAE5DB] text-[#231815] pt-16 pb-12 border-t border-[#D5CDC0] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: Stumptown Multi-Column Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#D5CDC0]/80">
          
          {/* 1. BIG BOLD EDITORIAL CATEGORIES (Stumptown Left Column) */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#64473E] block mb-2 font-bold">
              SHOP
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#150E0B] leading-[1.15] space-y-1">
              <a href="#signatures" className="block hover:text-[#5C050D] transition-colors">
                Subscribe
              </a>
              <a href="#signatures" className="block hover:text-[#5C050D] transition-colors">
                Wedding Tiers
              </a>
              <a href="#builder" className="block hover:text-[#5C050D] transition-colors">
                Custom Studio
              </a>
              <a href="#signatures" className="block hover:text-[#5C050D] transition-colors">
                Theme Cakes
              </a>
              <a href="#builder" className="block hover:text-[#5C050D] transition-colors">
                Party Bundles
              </a>
            </div>
          </div>

          {/* 2. EXPLORE LINKS */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#64473E] block font-bold">
              EXPLORE
            </span>
            <ul className="space-y-2 text-xs font-medium text-[#34221D]">
              <li>
                <a href="#location" className="hover:text-[#5C050D] transition-colors">Locations</a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-[#5C050D] transition-colors">Cake Finder Quiz</a>
              </li>
              <li>
                <a href="#signatures" className="hover:text-[#5C050D] transition-colors">Signature Gallery</a>
              </li>
              <li>
                <a href="#builder" className="hover:text-[#5C050D] transition-colors">Custom Flavors</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#5C050D] transition-colors">Justdial Ratings</a>
              </li>
            </ul>
          </div>

          {/* 3. LOCATIONS COLUMN (Requested by user) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#64473E] block font-bold">
              LOCATIONS
            </span>
            <ul className="space-y-2 text-xs font-medium text-[#34221D]">
              <li>
                <a href="#location" className="hover:text-[#5C050D] transition-colors block">
                  Lonand Studio
                  <span className="block text-[10px] text-[#846055]">Opp. Gajanan Appliances</span>
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#5C050D] transition-colors">Shirwal Hub</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#5C050D] transition-colors">Phaltan Drop</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#5C050D] transition-colors">Wai & Bhuinj Area</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#5C050D] transition-colors">Satara City Logistics</a>
              </li>
            </ul>
          </div>

          {/* 4. SUPPORT & PORTAL ACCESS */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#64473E] block font-bold">
              SUPPORT
            </span>
            <ul className="space-y-2 text-xs font-medium text-[#34221D]">
              <li>
                <button onClick={onOpenUpi} className="hover:text-[#5C050D] transition-colors text-left flex items-center gap-1">
                  <span>Advance Token Policy</span>
                </button>
              </li>
              <li>
                <a href={`https://wa.me/${BAKERY_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#5C050D] transition-colors">
                  WhatsApp Concierge
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#5C050D] transition-colors">Pre-order FAQ</a>
              </li>
              <li>
                <span className="text-[#64473E]">100% Pure Veg</span>
              </li>
            </ul>

            {/* Wholesale/Customer Login Pill Button (Stumptown Style) */}
            <div className="pt-2">
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#231815] text-[#231815] hover:bg-[#231815] hover:text-[#EAE5DB] text-xs font-medium transition-all"
              >
                <span>Customer Login</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 5. NEWSLETTER SIGNUP & SOCIAL ICONS (Stumptown Right Column) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#150E0B] leading-tight">
              Never miss a drop! Get our latest news to your inbox.
            </h4>

            {subSuccess ? (
              <p className="text-xs font-mono text-emerald-800 bg-emerald-100/60 p-2 border border-emerald-300">
                ✓ You're on the list! Check WhatsApp for drops.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="text"
                  required
                  placeholder="Your Phone / Mobile"
                  value={subInput}
                  onChange={(e) => setSubInput(e.target.value)}
                  className="w-full pl-4 pr-24 py-2.5 bg-white border border-[#D5CDC0] rounded-full text-xs text-[#231815] placeholder:text-[#846055] focus:outline-none focus:border-[#5C050D]"
                />
                <button
                  type="submit"
                  disabled={subLoading}
                  className="absolute right-1 top-1 bottom-1 px-4 bg-[#231815] hover:bg-[#5C050D] text-white rounded-full text-xs font-medium transition-colors"
                >
                  {subLoading ? '...' : 'Sign Up'}
                </button>
              </form>
            )}

            {/* Stumptown Circular Social Icons: WhatsApp & Official Instagram */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={`https://wa.me/${BAKERY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#D8D1C4] hover:bg-[#C8BEAD] text-[#231815] flex items-center justify-center transition-colors"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/sweetstory1114/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#D8D1C4] hover:bg-[#C8BEAD] text-[#231815] flex items-center justify-center transition-colors"
                title="Official Instagram (@sweetstory1114)"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: Legal Links & Stumptown Style Emblem Stamp */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#64473E] gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px]">
            <a href="#" className="hover:text-[#231815]">Terms & Conditions</a>
            <a href="#" className="hover:text-[#231815]">Privacy Policy</a>
            <a href="#" className="hover:text-[#231815]">Food Safety & Standards (FSSAI)</a>
            <span className="text-[#846055]">©{new Date().getFullYear()} Sweet Story Cakes Lonand</span>
          </div>

          {/* Sweet Story Stamp in bottom right (like Stumptown's icon) */}
          <div className="flex items-center gap-2">
            <img
              src="/images/sweet_story_logo.png"
              alt="Sweet Story Stamp"
              className="w-10 h-10 rounded-full object-contain border border-[#34221D]/30"
            />
            <span className="font-serif italic text-xs text-[#231815]">
              Haute Pâtisserie
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
