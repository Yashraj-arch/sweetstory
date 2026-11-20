import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Award, CheckCircle, Sparkles, BookOpen, ExternalLink, Calendar, Heart } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';

export default function AboutModal({ isOpen, onClose, onOpenBuilder }) {
  const [viewResumeImage, setViewResumeImage] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#FBF8F3] text-[#231815] shadow-2xl border border-[#D5CDC0] my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#5F060C] text-cream-100 px-6 py-4 flex items-center justify-between border-b border-black/20">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-gold-300 font-bold">
              Sweet Story Pâtisserie • Artist Profile
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-cream-100/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[82vh] overflow-y-auto p-6 sm:p-10 space-y-10 font-sans">
          
          {/* Hero Section: Photo + Story Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Portrait & Quick Contacts */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative border-4 border-[#231815]/10 shadow-lg bg-white overflow-hidden group">
                <img
                  src="/images/rajnandini_zaveri.jpg"
                  alt="Rajnandini Zaveri - Senior Cake Decorator & Pastry Artist"
                  className="w-full h-auto object-cover max-h-[460px] group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold-300 block font-semibold">
                    Head Pastry Artist & Decorator
                  </span>
                  <h3 className="font-serif text-xl font-bold leading-tight">
                    Rajnandini Zaveri
                  </h3>
                  <p className="text-xs text-cream-100/90 font-mono mt-0.5">
                    7 Years of Artisanal Mastery at Sweet Story
                  </p>
                </div>
              </div>

              {/* Direct Contact Pill Cards */}
              <div className="bg-[#EFEAE1] border border-[#D5CDC0] p-4 space-y-2.5 text-xs text-[#34221D]">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#5F060C] shrink-0" />
                  <a 
                    href="mailto:zaverirajnandini@gmail.com" 
                    className="font-medium hover:text-[#5F060C] underline decoration-[#5F060C]/40 break-all"
                  >
                    zaverirajnandini@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#5F060C] shrink-0" />
                  <a 
                    href="tel:+918657648079" 
                    className="font-medium hover:text-[#5F060C]"
                  >
                    +91 8657648079
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#5F060C] shrink-0" />
                  <span>Katraj, Pune & Lonand, Satara</span>
                </div>
              </div>

              {/* Action: View Original CV */}
              <button
                onClick={() => setViewResumeImage(true)}
                className="w-full py-2.5 px-4 bg-white border border-[#231815] text-[#231815] hover:bg-[#231815] hover:text-[#FBF8F3] text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Full Curriculum Vitae</span>
              </button>
            </div>

            {/* Right Column: Bio, Vision & Philosophy */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#5F060C] font-bold block mb-1">
                  About Our Head Artist & Decorator
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#150E0B] leading-tight">
                  "Life is sweet when every celebration is crafted with intention."
                </h2>
              </div>

              <div className="prose text-[#34221D] text-sm sm:text-base leading-relaxed space-y-3 font-serif">
                <p>
                  Welcome to Sweet Story. I am <strong className="text-[#150E0B]">Rajnandini Zaveri</strong>, Senior Cake Decorator and Pastry Artist. For over seven years, I have poured passion and precision into sculpting celebratory centerpieces that marry architectural integrity with haute pâtisserie flavor.
                </p>
                <p>
                  In our Lonand & Satara studios, we hold a steadfast conviction: <em>A cake is never an assembly-line commodity; it is the emotional heartbeat of your most cherished milestone.</em>
                </p>
                <p>
                  Every recipe is meticulously perfected without eggs, utilizing pure cultured butter, fresh dairy cream, Belgian couverture chocolates, and organic fruit reductions to achieve an extraordinarily moist crumb paired with delicate hand-piped artistry.
                </p>
              </div>

              {/* Career Highlights Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="border border-[#D5CDC0] bg-white p-3 text-center">
                  <span className="font-serif text-2xl font-bold text-[#5F060C] block">7+</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#64473E]">Years Experience</span>
                </div>
                <div className="border border-[#D5CDC0] bg-white p-3 text-center">
                  <span className="font-serif text-2xl font-bold text-[#5F060C] block">1,200+</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#64473E]">Bespoke Cakes</span>
                </div>
                <div className="border border-[#D5CDC0] bg-white p-3 text-center">
                  <span className="font-serif text-2xl font-bold text-[#5F060C] block">100%</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#64473E]">Pure Veg Standard</span>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenBuilder) onOpenBuilder();
                  }}
                  className="px-6 py-3 bg-[#5F060C] hover:bg-[#430408] text-white text-xs font-mono uppercase tracking-widest font-semibold transition-colors text-center"
                >
                  Design Custom Cake with Rajnandini →
                </button>
                <a
                  href={`https://wa.me/918657648079?text=${encodeURIComponent("Hello Rajnandini, I would like to consult with you regarding a custom celebratory cake.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#231815] hover:bg-[#3E2C27] text-white text-xs font-mono uppercase tracking-widest font-semibold transition-colors text-center"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>

          </div>

          <hr className="border-[#D5CDC0]" />

          {/* Section: Core Skills & Expertise (Extracted from CV) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#5F060C]" />
              <h3 className="font-serif text-2xl font-bold text-[#150E0B]">
                Core Skills & Technical Mastery
              </h3>
            </div>
            <p className="text-xs text-[#64473E] font-mono">
              Expertise certified across 7 years of high-volume custom production and luxury wedding confections.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="border border-[#D5CDC0] bg-white p-4 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#5F060C] block">
                  01. Decorating & Design
                </span>
                <ul className="text-xs space-y-1.5 text-[#34221D]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Cake Decorating Expert</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Creative Custom Design</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Bespoke Tier Proportions</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Artistic Food Presentation</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#D5CDC0] bg-white p-4 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#5F060C] block">
                  02. Technical Mastery
                </span>
                <ul className="text-xs space-y-1.5 text-[#34221D]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Advanced Icing Techniques</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Fondant Sculpting & Modeling</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Detailed Hand-Piped Florals</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Ultra-Smooth Knife Finishes</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#D5CDC0] bg-white p-4 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#5F060C] block">
                  03. Culinary Arts
                </span>
                <ul className="text-xs space-y-1.5 text-[#34221D]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Artisanal Pastry Making</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>100% Eggless Sponge Mastery</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Belgian Ganache & Mousses</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Fine Dessert Plating</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#D5CDC0] bg-white p-4 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#5F060C] block">
                  04. Kitchen Operations
                </span>
                <ul className="text-xs space-y-1.5 text-[#34221D]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Custom Client Consultation</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>FSSAI Hygiene & Quality Control</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Zero Preservative Standards</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Temperature Logistical Care</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-[#D5CDC0]" />

          {/* Section: Professional Work Experience (From CV) */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#150E0B]">
              Professional Experience
            </h3>

            <div className="border border-[#D5CDC0] bg-white p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#D5CDC0]/60 pb-3">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#150E0B]">
                    Senior Cake Decorator & Pastry Artist
                  </h4>
                  <p className="text-xs font-mono text-[#5F060C] font-semibold">
                    Sweet Story Cake Shop • Satara & Lonand, India
                  </p>
                </div>
                <span className="text-xs font-mono bg-[#EFEAE1] px-3 py-1 text-[#231815] border border-[#D5CDC0] self-start sm:self-center">
                  7 Years Specialized Experience
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-[#34221D] leading-relaxed pt-2">
                <p>
                  • <strong>Custom Cake Architecture:</strong> Conceptualized, sculpted, and decorated bespoke multi-tier cakes for high-profile weddings, landmark birthdays, and grand celebrations to exact client vision.
                </p>
                <p>
                  • <strong>Icing & Fine Finishing:</strong> Executed intricate icing techniques, razor-sharp edges, smooth finishes, and detailed hand-piped botanical florals with high artistic precision.
                </p>
                <p>
                  • <strong>Pastry Operations:</strong> Managed daily artisanal pastry and confectionery production, ensuring consistent visual grandeur, velvety moisture, and punctual order fulfillment.
                </p>
                <p>
                  • <strong>Kitchen Quality Standards:</strong> Enforced strict food safety, cleanliness, and quality control protocols across all bakery outputs.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#EFEAE1] border-t border-[#D5CDC0] px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64473E] gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono">Contact:</span>
            <a href="mailto:zaverirajnandini@gmail.com" className="font-medium text-[#150E0B] hover:text-[#5F060C]">
              zaverirajnandini@gmail.com
            </a>
            <span>•</span>
            <a href="tel:+918657648079" className="font-medium text-[#150E0B] hover:text-[#5F060C]">
              +91 8657648079
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-[#231815] hover:bg-[#5F060C] text-white text-xs font-mono uppercase tracking-widest transition-colors"
          >
            Close Profile
          </button>
        </div>

      </div>

      {/* CV Image Full Preview Lightbox */}
      {viewResumeImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setViewResumeImage(false)}
        >
          <div className="relative max-w-2xl bg-white p-2 border border-white/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setViewResumeImage(false)}
              className="absolute -top-10 right-0 text-white hover:text-gold-300 font-mono text-sm flex items-center gap-1"
            >
              <X className="w-5 h-5" /> Close CV
            </button>
            <img
              src="/images/rajnandini_resume.jpg"
              alt="Rajnandini Zaveri Resume"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <div className="p-3 bg-[#FBF8F3] flex items-center justify-between text-xs">
              <span className="font-mono text-[#64473E]">Curriculum Vitae • Rajnandini Zaveri</span>
              <a 
                href="/images/rajnandini_resume.jpg" 
                download="Rajnandini_Zaveri_Resume.jpg"
                className="text-[#5F060C] font-bold hover:underline"
              >
                Download Image
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
