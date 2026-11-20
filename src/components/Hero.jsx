import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';

export default function Hero({ onOpenQuiz, onOpenBuilder }) {
  return (
    <section className="relative pt-36 sm:pt-44 md:pt-48 pb-16 bg-cream-100 border-b border-cocoa-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Editorial Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cocoa-950 leading-[1.08] mb-6">
            Confections crafted for <br />
            <span className="italic font-normal text-rose-600">unforgettable</span> celebrations.
          </h1>
          <p className="text-base sm:text-lg text-cocoa-700 max-w-2xl mx-auto leading-relaxed">
            From monumental glowing floral ring arches to gravity-defying suspended chandelier cakes, 
            Sweet Story brings haute-pâtisserie artistry and 100% pure vegetarian passion to your most treasured days.
          </p>

          {/* Action CTAs with sharp corners */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBuilder}
              className="w-full sm:w-auto px-8 py-3.5 bg-cocoa-950 hover:bg-cocoa-900 text-cream-100 font-medium text-xs tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 group border border-cocoa-950"
            >
              <span>Design Your Custom Cake</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenQuiz}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-cream-200/50 text-cocoa-950 font-medium text-xs tracking-widest uppercase border border-cocoa-900/30 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Take the Cake Finder Quiz</span>
            </button>
          </div>
        </div>

        {/* Real Creations Feature Photography (Clean, Sharp, No Overlay Clutter) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mt-8 mb-6">
          
          {/* Card 1: Floral Ring Wedding Arch (Real Photo 1) */}
          <div className="md:col-span-7 bg-white p-4 border border-cocoa-900/15 flex flex-col justify-between">
            <div className="relative aspect-[4/3] bg-cocoa-950 overflow-hidden">
              <img
                src="/images/cake_floral_arch.jpg"
                alt="Floral Ring Arch Cake by Sweet Story Cakes"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="pt-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-cocoa-950">
                  The Floral Ring Arch Cake
                </h3>
                <p className="text-xs text-cocoa-600 mt-0.5">
                  Two-tier custom wedding cake with illuminated arch and couple keepsake tier
                </p>
              </div>
              <span className="text-xs font-serif italic text-cocoa-500 whitespace-nowrap pl-2">Lonand, Satara</span>
            </div>
          </div>

          {/* Card 2: Suspended Hanging Chandelier Cake (Real Photo 2) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-4 border border-cocoa-900/15 flex-1 flex flex-col justify-between">
              <div className="relative aspect-[4/3] bg-cocoa-950 overflow-hidden">
                <img
                  src="/images/cake_hanging_chandelier.jpg"
                  alt="Suspended Hanging Chandelier Cake by Sweet Story Cakes"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="pt-4">
                <h4 className="font-serif text-base sm:text-lg font-bold text-cocoa-950">
                  The Suspended Chandelier Cake
                </h4>
                <p className="text-xs text-cocoa-600 mt-0.5">
                  Upside-down tiered structure suspended with bespoke botanical garlands
                </p>
              </div>
            </div>

            {/* Credibility Box - Minimalist & Sharp */}
            <div className="bg-cream-200/60 border border-cocoa-900/15 p-4 flex items-center justify-between text-xs text-cocoa-900">
              <div>
                <span className="font-bold text-sm block">4.5 / 5.0 Rating</span>
                <span className="text-cocoa-600 text-[11px]">Verified on Justdial • Lonand, Satara</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-semibold block">10:00 AM – 10:00 PM</span>
                <span className="text-emerald-700 text-[11px] font-medium">Open All 7 Days</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
