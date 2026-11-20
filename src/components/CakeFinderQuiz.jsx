import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Check, MessageCircle, Users } from 'lucide-react';
import { BAKERY_INFO, SIGNATURE_CAKES } from '../data/cakes';

export default function CakeFinderQuiz({ onSelectForCustomizer }) {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState(null);
  const [flavorPreference, setFlavorPreference] = useState(null);
  const [guestRange, setGuestRange] = useState(null);
  const [result, setResult] = useState(null);

  const occasions = [
    {
      id: 'wedding',
      label: 'Wedding & Grand Reception',
      tagline: 'Multi-tier showstoppers with floral arches & chandelier tiers',
      number: '01'
    },
    {
      id: 'anniversary',
      label: 'Romantic Anniversary',
      tagline: 'Floral accents, couple photo keepsake chambers & heart piping',
      number: '02'
    },
    {
      id: 'birthday',
      label: 'Milestone Birthday Party',
      tagline: 'Artisan chocolate ganache, praline crunches & contemporary styling',
      number: '03'
    },
    {
      id: 'family',
      label: 'Family Gathering & Celebrations',
      tagline: 'Fresh whipped chantilly, local farm fruits & royal saffron fusion',
      number: '04'
    }
  ];

  const flavorPalettes = [
    {
      id: 'chocolate',
      label: 'Belgian Chocolate Truffle',
      desc: '54% dark cocoa fudge, roasted hazelnut praline & silky ganache',
      number: '01'
    },
    {
      id: 'fusion',
      label: 'Royal Saffron & Rasmalai',
      desc: 'Authentic rasmalai soaked in Kashmiri saffron milk & roasted pistachios',
      number: '02'
    },
    {
      id: 'berries',
      label: 'Fresh Strawberry & Rose Cream',
      desc: 'Mahabaleshwar strawberries with vanilla bean chantilly & rose essence',
      number: '03'
    },
    {
      id: 'biscoff',
      label: 'Lotus Biscoff & Salted Caramel',
      desc: 'Caramelized speculoos cream, sea salt caramel drizzle & cookie crunch',
      number: '04'
    }
  ];

  const guestSizes = [
    {
      id: 'intimate',
      label: '4 – 10 Guests',
      weightStr: '1.0 kg (Single Tier)',
      desc: 'Intimate dinner or family celebration'
    },
    {
      id: 'medium',
      label: '15 – 35 Guests',
      weightStr: '2.0 – 3.0 kg (Two Tiers)',
      desc: 'Milestone party or engagement reception'
    },
    {
      id: 'grand',
      label: '40 – 80+ Guests',
      weightStr: '4.0 – 6.0 kg (Multi-Tier / Chandelier)',
      desc: 'Grand wedding reception or banquet'
    }
  ];

  const calculateResult = (selectedOccasion, selectedFlavor, selectedGuests) => {
    let match = null;
    if (selectedOccasion === 'wedding' || selectedGuests === 'grand') {
      if (selectedOccasion === 'wedding') {
        match = SIGNATURE_CAKES[0]; // Floral Ring Arch
      } else {
        match = SIGNATURE_CAKES[1]; // Suspended Chandelier
      }
    } else if (selectedFlavor === 'fusion') {
      match = SIGNATURE_CAKES[4]; // Rasmalai
    } else if (selectedFlavor === 'biscoff') {
      match = SIGNATURE_CAKES[5]; // Biscoff
    } else {
      match = SIGNATURE_CAKES[2]; // Belgian Truffle
    }

    setResult({
      cake: match,
      occasionName: occasions.find(o => o.id === selectedOccasion)?.label,
      flavorName: flavorPalettes.find(f => f.id === selectedFlavor)?.label,
      guestName: guestSizes.find(g => g.id === selectedGuests)?.label,
      weightStr: guestSizes.find(g => g.id === selectedGuests)?.weightStr
    });
  };

  const handleOccasionSelect = (id) => {
    setOccasion(id);
    setStep(2);
  };

  const handleFlavorSelect = (id) => {
    setFlavorPreference(id);
    setStep(3);
  };

  const handleGuestSelect = (id) => {
    setGuestRange(id);
    calculateResult(occasion, flavorPreference, id);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setOccasion(null);
    setFlavorPreference(null);
    setGuestRange(null);
    setResult(null);
  };

  return (
    <section id="quiz" className="py-20 bg-cream-50 border-b border-cocoa-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-2">
            Selection Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa-950 mb-3">
            The Cake Finder
          </h2>
          <p className="text-cocoa-700 text-sm sm:text-base">
            Answer 3 quick questions and we will find your perfect match.
          </p>

          {/* Progress Indicators */}
          {step <= 3 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`h-0.5 transition-all duration-300 ${
                    step === num 
                      ? 'w-10 bg-cocoa-950' 
                      : step > num 
                        ? 'w-6 bg-cocoa-500' 
                        : 'w-6 bg-cocoa-900/15'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quiz Steps Box with Sharp Corners */}
        <div className="bg-white p-6 sm:p-10 border border-cocoa-900/15">

          {/* STEP 1: Occasion */}
          {step === 1 && (
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-1">
                Question 01 of 03
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-950 mb-6">
                What celebration are you planning?
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {occasions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleOccasionSelect(item.id)}
                    className="p-5 border border-cocoa-900/15 hover:border-cocoa-950 bg-cream-50/30 hover:bg-cream-100/50 text-left transition-all duration-150 flex items-start gap-4 group"
                  >
                    <span className="font-mono text-xs text-cocoa-400 group-hover:text-cocoa-950 pt-0.5">
                      {item.number}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-cocoa-950 text-base">
                        {item.label}
                      </h4>
                      <p className="text-xs text-cocoa-600 mt-1 leading-relaxed">
                        {item.tagline}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Flavor Palette */}
          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500">
                  Question 02 of 03
                </span>
                <button onClick={() => setStep(1)} className="text-xs text-cocoa-500 hover:text-cocoa-950 underline">
                  ← Previous
                </button>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-950 mb-6">
                Which flavor profile calls to you?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {flavorPalettes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleFlavorSelect(item.id)}
                    className="p-5 border border-cocoa-900/15 hover:border-cocoa-950 bg-cream-50/30 hover:bg-cream-100/50 text-left transition-all duration-150 flex items-start gap-4 group"
                  >
                    <span className="font-mono text-xs text-cocoa-400 group-hover:text-cocoa-950 pt-0.5">
                      {item.number}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-cocoa-950 text-base">
                        {item.label}
                      </h4>
                      <p className="text-xs text-cocoa-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Guest Count */}
          {step === 3 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500">
                  Question 03 of 03
                </span>
                <button onClick={() => setStep(2)} className="text-xs text-cocoa-500 hover:text-cocoa-950 underline">
                  ← Previous
                </button>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-950 mb-6">
                How many guests will be celebrating?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {guestSizes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleGuestSelect(item.id)}
                    className="p-5 border border-cocoa-900/15 hover:border-cocoa-950 bg-cream-50/30 hover:bg-cream-100/50 text-left transition-all duration-150 flex flex-col justify-between group"
                  >
                    <div>
                      <h4 className="font-serif font-bold text-cocoa-950 text-base mb-1">
                        {item.label}
                      </h4>
                      <span className="text-xs font-mono font-medium text-cocoa-700 block mb-2">
                        {item.weightStr}
                      </span>
                    </div>
                    <p className="text-[11px] text-cocoa-500 mt-3 pt-3 border-t border-cocoa-900/10">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RESULT CARD - Sharp & Clean */}
          {step === 4 && result && (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-cocoa-900/15 mb-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block">
                    Curated Match
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-cocoa-950 mt-1">
                    Recommended for your celebration:
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs font-medium text-cocoa-600 hover:text-cocoa-950 border border-cocoa-900/20 px-3 py-1.5 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 aspect-[4/3] bg-cocoa-950 overflow-hidden border border-cocoa-900/15">
                  <img
                    src={result.cake.image}
                    alt={result.cake.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cocoa-500">
                      {result.occasionName}
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-cocoa-950 mt-1">
                      {result.cake.title}
                    </h4>
                    <p className="text-xs text-cocoa-700 mt-2 leading-relaxed">
                      {result.cake.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-cream-100/70 p-3.5 border border-cocoa-900/10">
                    <div>
                      <span className="text-cocoa-500 text-[10px] uppercase font-mono block">Flavor Profile:</span>
                      <span className="font-bold text-cocoa-950">{result.flavorName}</span>
                    </div>
                    <div>
                      <span className="text-cocoa-500 text-[10px] uppercase font-mono block">Recommended Size:</span>
                      <span className="font-bold text-cocoa-950">{result.weightStr}</span>
                    </div>
                    <div>
                      <span className="text-cocoa-500 text-[10px] uppercase font-mono block">Est. Price:</span>
                      <span className="font-bold text-cocoa-950">{result.cake.priceRange}</span>
                    </div>
                    <div>
                      <span className="text-cocoa-500 text-[10px] uppercase font-mono block">Preparation:</span>
                      <span className="font-bold text-cocoa-950">{result.cake.leadTime}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Sweet Story Cakes! 🎂\n\nI took the Cake Finder Quiz on your website and would like to order:\n• Cake: ${result.cake.title}\n• Occasion: ${result.occasionName}\n• Flavor: ${result.flavorName}\n• Scale: ${result.weightStr}\n\nPlease confirm availability for Lonand/Satara.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 bg-cocoa-950 hover:bg-cocoa-900 text-cream-100 font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-2 border border-cocoa-950 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        if (onSelectForCustomizer) onSelectForCustomizer(result.cake);
                        const el = document.getElementById('builder');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="py-3 px-6 border border-cocoa-900/30 text-cocoa-950 font-medium text-xs tracking-widest uppercase hover:bg-cream-200/50 transition-colors"
                    >
                      Customize in Studio →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
