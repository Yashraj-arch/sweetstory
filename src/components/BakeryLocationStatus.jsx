import React from 'react';
import { MapPin, Navigation, Truck, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';

export default function BakeryLocationStatus() {
  const deliveryZones = [
    { name: 'Lonand Town', time: 'Immediate Doorstep Delivery', status: 'Complimentary Doorstep' },
    { name: 'Shirwal Hub', time: '35–45 Mins Transit', status: 'Daily Scheduled Drop' },
    { name: 'Phaltan Corridor', time: '45–60 Mins Transit', status: 'Event Logistics' },
    { name: 'Wai & Bhuinj', time: 'Resorts & Wedding Venues', status: 'Venue Direct Rigging' },
    { name: 'Satara City & District', time: 'Special Event Setup', status: 'Chandelier Rigging & Transport' }
  ];

  return (
    <section id="location" className="py-20 bg-cream-100 border-b border-cocoa-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-cocoa-900/10">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-2">
              Studio & Satara District Hubs
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa-950">
              Locations & Delivery
            </h2>
          </div>
          <p className="text-cocoa-700 text-sm max-w-md mt-4 md:mt-0 leading-relaxed">
            Visit our Lonand studio for bespoke wedding cake tastings or arrange shock-absorbing temperature-controlled delivery directly to your celebration venue.
          </p>
        </div>

        {/* Editorial Two-Column Studio & Logistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Lonand Flagship Studio */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 border border-cocoa-900/15 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-cocoa-900/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#5C050D] font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#5C050D]" />
                  <span>Flagship Studio & Workshop</span>
                </span>
                <span className="font-mono text-[10px] text-cocoa-500 uppercase tracking-wider">
                  Lonand, Satara
                </span>
              </div>

              {/* Exact Address */}
              <div className="space-y-1.5">
                <p className="font-serif font-bold text-xl text-cocoa-950">
                  Opposite Gajanan Appliances
                </p>
                <p className="text-sm text-cocoa-700 leading-relaxed">
                  Lonand, Satara District, Maharashtra - 415521
                </p>
                <p className="text-xs text-cocoa-500 font-mono pt-1">
                  Landmark: Main Market Road, Opposite Gajanan Appliances
                </p>
              </div>

              {/* Consultation Features */}
              <div className="pt-4 border-t border-cocoa-900/10 space-y-2.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block">
                  Studio Services Available
                </span>
                <ul className="text-xs text-cocoa-700 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#5C050D]"></span>
                    <span>Multi-tier wedding cake tastings & sponge consultations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#5C050D]"></span>
                    <span>Custom acrylic couple photo chamber customization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#5C050D]"></span>
                    <span>Direct pickup counter for pre-ordered birthday & anniversary cakes</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-6 mt-6 border-t border-cocoa-900/10 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Sweet+Story+Cakes+Lonand+Satara"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 bg-cocoa-950 hover:bg-cocoa-900 text-cream-100 text-xs font-mono uppercase tracking-widest border border-cocoa-950 flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-gold-400" />
                <span>Google Maps Directions</span>
              </a>

              <a
                href={`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Sweet Story Cakes! Please share the exact studio Google Maps location pin.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-cream-50 hover:bg-cream-100 text-cocoa-950 text-xs font-mono uppercase tracking-widest border border-cocoa-900/20 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Get Pin on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Card 2: Satara District Cold-Chain Delivery Logistics */}
          <div className="lg:col-span-6 bg-cocoa-950 text-cream-100 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-cream-100/10">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-400 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold-400" />
                  <span>Regional Delivery Logistics</span>
                </span>
                <span className="font-mono text-[10px] text-cream-300/60 uppercase">
                  Cold-Chain Verified
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Satara District Venues & Homes
                </h3>
                <p className="text-xs text-cream-300 leading-relaxed">
                  We transport all multi-tiered wedding and structural cakes in customized shock-absorbing, climate-stabilized boxes to guarantee flawless arrival.
                </p>
              </div>

              {/* Delivery Zones Table */}
              <div className="space-y-2 pt-2">
                {deliveryZones.map((zone) => (
                  <div key={zone.name} className="flex items-center justify-between py-2 border-b border-cream-100/10 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold-400"></span>
                      <span className="text-white font-semibold">{zone.name}</span>
                    </div>
                    <span className="text-[11px] text-cream-300">{zone.status}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Cold chain assurance note */}
            <div className="pt-4 mt-4 border-t border-cream-100/10 flex items-center gap-2 text-[11px] font-mono text-cream-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Chandelier & Arch cakes include on-site artisan rigging assistance.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
