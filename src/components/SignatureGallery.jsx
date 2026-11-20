import React, { useState } from 'react';
import { MessageCircle, Eye, X, Clock, Users } from 'lucide-react';
import { SIGNATURE_CAKES, BAKERY_INFO } from '../data/cakes';

export default function SignatureGallery({ onCustomizeCake }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCake, setSelectedCake] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'All Creations' },
    { id: 'wedding', label: 'Wedding & Grand Tiers' },
    { id: 'birthday', label: 'Celebration & Theme Cakes' },
    { id: 'custom', label: 'Bespoke Sculptures' },
    { id: 'chocolate', label: 'Belgian Truffles' },
  ];

  const filteredCakes = activeFilter === 'all'
    ? SIGNATURE_CAKES
    : SIGNATURE_CAKES.filter(c => c.category === activeFilter);

  return (
    <section id="signatures" className="py-20 bg-cream-50 border-b border-cocoa-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-cocoa-900/10">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-2">
              Artisan Confections
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa-950">
              Signature Collection
            </h2>
          </div>
          <p className="text-cocoa-700 text-sm max-w-md mt-4 md:mt-0 leading-relaxed">
            Every creation is custom baked to order with premium single-origin cocoa, fresh farm dairy, and organic florals. No mass pre-mixes.
          </p>
        </div>

        {/* Filter Navigation - Sharp & Minimalist */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-150 border ${
                activeFilter === tab.id
                  ? 'bg-cocoa-950 text-cream-100 border-cocoa-950'
                  : 'bg-white text-cocoa-700 hover:text-cocoa-950 border-cocoa-900/15 hover:border-cocoa-900/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cake Grid - Sharp Rectangular Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCakes.map((cake) => (
            <div
              key={cake.id}
              className="bg-white border border-cocoa-900/15 flex flex-col justify-between group hover:border-cocoa-900/40 transition-colors"
            >
              {/* Image */}
              <div 
                className="relative aspect-[4/3] bg-cocoa-950 overflow-hidden cursor-pointer"
                onClick={() => setSelectedCake(cake)}
              >
                <img
                  src={cake.image}
                  alt={cake.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-cocoa-500 mb-1.5">
                    <span>{cake.tag}</span>
                    <span>{cake.weight}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-cocoa-950">
                    {cake.title}
                  </h3>
                  <p className="text-xs text-cocoa-600 mt-2 line-clamp-2 leading-relaxed">
                    {cake.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-4 border-t border-cocoa-900/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cocoa-500 block">
                      Estimated Cost
                    </span>
                    <span className="font-serif font-bold text-cocoa-950 text-base">
                      {cake.priceRange}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCake(cake)}
                      className="px-3 py-1.5 border border-cocoa-900/20 text-xs font-mono hover:bg-cream-100 transition-colors"
                    >
                      Details
                    </button>
                    <a
                      href={`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Sweet Story Cakes! 🎂\nI am interested in ordering "${cake.title}".\nCould you please let me know availability and booking details?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-cocoa-950 text-cream-100 text-xs font-mono hover:bg-cocoa-900 transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* DETAIL MODAL - Sharp Architecture */}
      {selectedCake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa-950/70 backdrop-blur-sm">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cocoa-950 p-6 sm:p-8 relative">
            
            <button
              onClick={() => setSelectedCake(null)}
              className="absolute top-4 right-4 p-2 text-cocoa-700 hover:text-cocoa-950 border border-cocoa-900/15"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[16/9] bg-cocoa-950 overflow-hidden mb-6 border border-cocoa-900/15">
              <img
                src={selectedCake.image}
                alt={selectedCake.title}
                className="w-full h-full object-cover"
              />
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block">
              {selectedCake.tag}
            </span>
            <h3 className="font-serif text-2xl font-bold text-cocoa-950 mt-1">{selectedCake.title}</h3>
            
            <p className="text-sm text-cocoa-700 mt-3 leading-relaxed">
              {selectedCake.description}
            </p>

            {/* Flavor & Specifications */}
            <div className="mt-6 p-4 bg-cream-100/70 border border-cocoa-900/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-cocoa-600">Tasting Profile:</span>
                <span className="font-bold text-cocoa-950">{selectedCake.flavorNotes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa-600">Standard Scale:</span>
                <span className="font-bold text-cocoa-950">{selectedCake.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa-600">Preparation Lead Time:</span>
                <span className="font-bold text-cocoa-950">{selectedCake.leadTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa-600">Estimated Price:</span>
                <span className="font-serif font-bold text-cocoa-950 text-sm">{selectedCake.priceRange}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-4 border-t border-cocoa-900/10 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Sweet Story Cakes! 🎂\n\nI want to order "${selectedCake.title}".\n• Scale: ${selectedCake.weight}\n• Price: ${selectedCake.priceRange}\n• Flavors: ${selectedCake.flavorNotes}\n\nPlease let me know slot availability and booking!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-6 bg-cocoa-950 hover:bg-cocoa-900 text-cream-100 font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-cocoa-950 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setSelectedCake(null);
                  if (onCustomizeCake) onCustomizeCake(selectedCake);
                  const el = document.getElementById('builder');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 border border-cocoa-900/30 text-cocoa-950 font-medium text-xs uppercase tracking-widest hover:bg-cream-100 transition-colors"
              >
                Customize in Studio
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
