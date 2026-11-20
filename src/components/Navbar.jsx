import React, { useState, useEffect } from 'react';
import { Menu, X, User, Search, ShoppingBag } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';

export default function Navbar({ onOpenQuiz, onOpenBuilder, onOpenUpi, currentUser, onOpenAuth, onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Signature Cakes', href: '#signatures' },
    { name: 'Custom Studio', href: '#builder', onClick: onOpenBuilder },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Locations', href: '#location' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      
      {/* EXPANDED, LUXURIOUS NAVBAR IN SWEET STORY WINE (#5F060C) */}
      <div className={`transition-all duration-200 ${
        scrolled 
          ? 'bg-[#5F060C]/95 backdrop-blur-md border-b border-black/30 py-4 sm:py-5 shadow-xl' 
          : 'bg-[#5F060C] border-b border-black/20 py-5 sm:py-6 shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* 1. LEFT SECTION: Pushed firmly to the far left (Generous space from logo) */}
            <div className="flex-1 flex items-center justify-start gap-4 sm:gap-6 pr-4">
              
              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-cream-100 hover:text-white"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Stumptown style pill button */}
              <button
                onClick={onOpenQuiz}
                className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-cream-100/90 text-cream-100 hover:bg-cream-100 hover:text-[#5F060C] text-xs font-mono uppercase tracking-widest transition-all font-semibold whitespace-nowrap"
              >
                Cake Quiz
              </button>

              {/* Desktop links - firmly left aligned with generous spacing */}
              <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                    }}
                    className="text-xs uppercase tracking-widest font-medium text-cream-100/90 hover:text-white transition-colors py-1 whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* 2. CENTER SECTION: Seamless Sweet Story Brandmark (Mixes with Navbar) */}
            <div className="shrink-0 px-4 sm:px-8 flex items-center justify-center">
              <a href="#" className="block focus:outline-none group" title="Sweet Story Cakes">
                <img
                  src="/images/sweet_story_brandmark_transparent.png"
                  alt="Sweet Story Cakes Brandmark"
                  className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                />
              </a>
            </div>

            {/* 3. RIGHT SECTION: Pushed firmly to the far right (Stumptown Minimalist Icons) */}
            <div className="flex-1 flex items-center justify-end gap-4 sm:gap-6 text-cream-100 pl-4">
              
              {/* Search Icon (Opens Luxury Recommendations Search Modal) */}
              <button
                onClick={onOpenSearch}
                className="p-1.5 text-cream-100 hover:text-gold-300 transition-colors"
                aria-label="Search Flavors & Cakes"
                title="Search Confections & Flavors"
              >
                <Search className="w-5 h-5 sm:w-5 sm:h-5 stroke-[2]" />
              </button>

              {/* Customer Account Icon */}
              <button
                onClick={onOpenAuth}
                className="relative p-1.5 text-cream-100 hover:text-gold-300 transition-colors"
                aria-label="Customer Account Profile"
                title={currentUser ? `Account: ${currentUser.full_name}` : "Sign In / Register"}
              >
                <User className="w-5 h-5 sm:w-5 sm:h-5 stroke-[2]" />
                {currentUser && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#5F060C]"></span>
                )}
              </button>

              {/* WhatsApp / Order Bag Icon */}
              <a
                href={`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Sweet Story Cakes! I would like to inquire about booking a cake.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-1.5 text-cream-100 hover:text-gold-300 transition-colors"
                aria-label="WhatsApp Order Consultation"
                title="Order via WhatsApp"
              >
                <ShoppingBag className="w-5 h-5 sm:w-5 sm:h-5 stroke-[2]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-cocoa-950 font-mono font-bold text-[9px] rounded-full flex items-center justify-center">
                  ✦
                </span>
              </a>

            </div>

          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#4A040B] border-t border-black/30 px-6 pt-5 pb-8 mt-3 space-y-4 shadow-2xl animate-slide-up">
            
            <div className="flex items-center justify-between pb-3 border-b border-cream-100/15">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gold-400">
                Sweet Story Menu
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="px-3.5 py-1 rounded-full border border-cream-100 text-cream-100 text-xs font-mono uppercase tracking-wider"
              >
                Cake Quiz
              </button>
            </div>

            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                  }}
                  className="text-sm uppercase tracking-widest font-medium text-cream-100 hover:text-gold-300 py-1.5 border-b border-cream-100/10"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full text-center py-2.5 bg-[#5F060C] text-cream-100 border border-cream-100/30 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Confections & Recommendations</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full text-center py-2.5 bg-cream-100 text-[#5F060C] font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>{currentUser ? `Account: ${currentUser.full_name}` : 'Customer Sign In / Register'}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </header>
  );
}
