import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, Cake } from 'lucide-react';
import { SIGNATURE_CAKES, FLAVOR_OPTIONS } from '../data/cakes';

export default function SearchModal({ isOpen, onClose, onSelectCake }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter recommendations based on query and category
  const filteredCakes = SIGNATURE_CAKES.filter((cake) => {
    const matchesCategory = selectedCategory === 'all' || cake.category === selectedCategory;
    const matchesQuery = query.trim() === '' || 
      cake.title.toLowerCase().includes(query.toLowerCase()) ||
      cake.description.toLowerCase().includes(query.toLowerCase()) ||
      cake.flavorNotes.toLowerCase().includes(query.toLowerCase()) ||
      cake.tag.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const matchingFlavors = query.trim() === '' ? [] : FLAVOR_OPTIONS.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.desc.toLowerCase().includes(query.toLowerCase())
  );

  const categories = [
    { id: 'all', label: 'All Recommendations' },
    { id: 'wedding', label: 'Wedding Arches & Chandeliers' },
    { id: 'birthday', label: 'Birthday & Theme Cakes' },
    { id: 'custom', label: 'Bespoke Sculptures' },
    { id: 'chocolate', label: 'Pure Couverture Truffles' }
  ];

  const handleCakeClick = (cake) => {
    onClose();
    if (onSelectCake) {
      onSelectCake(cake);
    }
    const el = document.getElementById('signatures');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 bg-cocoa-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-cream-50 border-2 border-cocoa-950 shadow-2xl p-6 sm:p-8 rounded-none my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 border border-cocoa-900/20 text-cocoa-800 hover:text-white hover:bg-[#5F060C] hover:border-[#5F060C] transition-colors"
          aria-label="Close search"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block">
            Sweet Story Cakes // Studio Catalog Search
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa-950 mt-1">
            Search Our Confections & Flavors
          </h3>
        </div>

        {/* Search Input Box */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cocoa-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search wedding arches, suspended chandeliers, model train cakes, chocolate truffle..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-cocoa-900/30 text-cocoa-950 text-sm focus:outline-none focus:border-[#5F060C] rounded-none shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-cocoa-500 hover:text-cocoa-900"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-cocoa-900/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-[#5F060C] text-cream-100 border-[#5F060C]'
                  : 'bg-white text-cocoa-700 hover:text-cocoa-950 border-cocoa-900/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Matching Flavors if any */}
        {matchingFlavors.length > 0 && (
          <div className="mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#5F060C] font-bold block mb-2">
              Matching Kitchen Flavors
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {matchingFlavors.map((flavor) => (
                <div key={flavor.id} className="p-2.5 bg-white border border-cocoa-900/10 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-xs text-cocoa-950">{flavor.name}</p>
                    <p className="text-[10.5px] text-cocoa-600">{flavor.desc}</p>
                  </div>
                  <span className="font-mono text-xs text-cocoa-900 font-bold">₹{flavor.pricePerKg}/kg</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-600 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#5F060C]" />
              <span>{query ? `Search Results (${filteredCakes.length})` : 'Popular Recommendations'}</span>
            </span>
            <span className="text-[11px] font-mono text-cocoa-500">100% Pure Vegetarian</span>
          </div>

          {filteredCakes.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-cocoa-900/20 text-cocoa-600">
              <p className="text-sm font-serif">No exact cakes found matching "{query}".</p>
              <p className="text-xs text-cocoa-500 mt-1">Try searching "wedding", "chandelier", "train", "truffle", or "safari".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
              {filteredCakes.map((cake) => (
                <div
                  key={cake.id}
                  onClick={() => handleCakeClick(cake)}
                  className="p-3 bg-white border border-cocoa-900/15 hover:border-[#5F060C] cursor-pointer flex gap-3.5 group transition-all"
                >
                  <img
                    src={cake.image}
                    alt={cake.title}
                    className="w-20 h-20 object-cover shrink-0 border border-cocoa-900/10 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#5F060C] uppercase tracking-wider block">
                        {cake.tag}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-cocoa-950 group-hover:text-[#5F060C] transition-colors leading-snug">
                        {cake.title}
                      </h4>
                      <p className="text-[11px] text-cocoa-600 line-clamp-1 mt-0.5">
                        {cake.flavorNotes}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-mono text-xs font-bold text-cocoa-950">
                        {cake.priceRange}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#5F060C] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer helper */}
        <div className="mt-6 pt-3 border-t border-cocoa-900/10 flex items-center justify-between text-[11px] font-mono text-cocoa-500">
          <span>Click any recommendation to jump directly to its details</span>
          <span>Opp. Gajanan Appliances, Lonand</span>
        </div>

      </div>
    </div>
  );
}
