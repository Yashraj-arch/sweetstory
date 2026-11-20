import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { REVIEWS, FAQS } from '../data/cakes';

export default function ReviewsAndRatings() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="reviews" className="py-20 bg-cream-50 border-b border-cocoa-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-2">
            Client Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa-950 mb-3">
            Patron Reviews
          </h2>
          <p className="text-cocoa-700 text-sm sm:text-base">
            Verified feedback from celebrations and weddings in Lonand, Shirwal, and Satara.
          </p>

          <div className="mt-5 inline-flex items-center gap-3 border border-cocoa-900/15 bg-white px-4 py-2">
            <span className="font-serif font-bold text-xl text-cocoa-950">4.5 / 5.0</span>
            <span className="text-cocoa-300">|</span>
            <span className="text-xs font-mono text-cocoa-700">Verified Business on Justdial</span>
          </div>
        </div>

        {/* Reviews Grid - Sharp Rectangular Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="bg-white p-6 sm:p-8 border border-cocoa-900/15 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between mb-3 pb-3 border-b border-cocoa-900/10">
                  <div>
                    <h4 className="font-serif font-bold text-cocoa-950 text-base">{review.name}</h4>
                    <span className="text-xs text-cocoa-500">{review.event}</span>
                  </div>
                  <span className="font-mono text-xs text-cocoa-500">{review.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-cocoa-700 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-cocoa-900/5 text-[11px] font-mono text-cocoa-500">
                Verified Celebration Order
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section - Sharp Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block mb-1">
              Inquiries
            </span>
            <h3 className="font-serif text-2xl font-bold text-cocoa-950">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white border border-cocoa-900/15"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-cocoa-950">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-cocoa-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-cocoa-700 leading-relaxed border-t border-cocoa-900/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
