import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Clock, MapPin, Cake, ExternalLink, ArrowRight, Bot } from 'lucide-react';
import { assistantAPI } from '../services/api';

export default function FloatingAssistant({ onOpenAbout, onOpenBuilder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [istContext, setIstContext] = useState(null);
  const [showCallout, setShowCallout] = useState(true);
  const messagesEndRef = useRef(null);

  // Fetch live IST context and initialize greeting on mount
  useEffect(() => {
    const initContext = async () => {
      try {
        const ctx = await assistantAPI.getContext();
        if (ctx) {
          setIstContext(ctx);
          // Set initial greeting message
          setMessages([
            {
              role: 'assistant',
              content: ctx.initial_message || 'Namaste! Welcome to Sweet Story Cakes. How may I assist your celebration today?',
              timestamp: ctx.time_str,
              actions: [
                { label: "Meet Artist Rajnandini", action_type: "trigger", target: "open_about" },
                { label: "Signature Cake Rates", action_type: "query", text: "What are your signature cake prices?" },
                { label: "Studio Location", action_type: "query", text: "Where is your studio located and which areas do you deliver?" }
              ]
            }
          ]);
        }
      } catch (err) {
        console.warn('Assistant context fetch failed, using default:', err);
      }
    };
    initContext();

    // Auto-dismiss callout after 12 seconds
    const timer = setTimeout(() => setShowCallout(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend = null) => {
    const msgText = (textToSend || input).trim();
    if (!msgText || loading) return;

    const userMessage = {
      role: 'user',
      content: msgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newThread = [...messages, userMessage];
    setMessages(newThread);
    setInput('');
    setLoading(true);

    try {
      // Send message thread to backend Groq AI (OpenAI GPT-OSS-120B)
      const formattedForApi = newThread.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await assistantAPI.sendChat(formattedForApi);
      if (res && res.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: res.reply,
            timestamp: res.ist_time || istContext?.time_str,
            actions: res.actions || []
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I am temporarily experiencing high demand. For urgent cake bookings, please contact Rajnandini directly on WhatsApp (+91 8657648079).",
          actions: [
            {
              label: "Chat with Rajnandini on WhatsApp",
              action_type: "link",
              url: "https://wa.me/918657648079?text=Hello%20Rajnandini,%20I%20would%20like%20to%20order%20a%20cake."
            }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.action_type === 'link' && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    } else if (action.action_type === 'trigger') {
      if (action.target === 'open_about' && onOpenAbout) {
        onOpenAbout();
      } else if (action.target === 'open_builder' && onOpenBuilder) {
        onOpenBuilder();
        setIsOpen(false);
      }
    } else if (action.action_type === 'query' && action.text) {
      handleSend(action.text);
    }
  };

  const quickChips = [
    "Tell me about Rajnandini",
    "Where is the studio?",
    "Are all cakes eggless?",
    "Wedding Cake Prices",
    "Deliver to Shirwal?"
  ];

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 font-sans">
      
      {/* 1. INITIAL SPEECH CALLOUT BUBBLE */}
      {!isOpen && showCallout && (
        <div 
          onClick={() => {
            setIsOpen(true);
            setShowCallout(false);
          }}
          className="absolute bottom-16 right-0 w-64 bg-[#FBF8F3] text-[#231815] p-3 shadow-2xl border border-[#D5CDC0] cursor-pointer hover:border-[#5F060C] transition-all animate-bounce duration-1000 mb-2"
        >
          <div className="flex items-start justify-between gap-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#5F060C] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Sweet Story Concierge</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowCallout(false);
              }}
              className="text-[#64473E] hover:text-[#150E0B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-[#34221D] mt-1 font-serif leading-snug">
            {istContext ? `${istContext.greeting}! ` : "Namaste! "}
            Need help choosing or customizing a cake? Ask me in English, मराठी or हिंदी!
          </p>
          <div className="mt-2 text-[10px] font-mono text-[#5F060C] font-semibold flex items-center gap-1">
            <span>Tap to chat</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      )}

      {/* 2. FLOATING TOGGLE BUTTON */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowCallout(false);
          }}
          className="relative group p-3.5 sm:p-4 bg-[#5F060C] text-cream-100 shadow-2xl hover:bg-[#430408] transition-all duration-300 flex items-center justify-center border border-black/30 hover:scale-105"
          aria-label="Open Sweet Story Concierge AI"
          title="Sweet Story AI Concierge (Groq Powered)"
        >
          <Cake className="w-6 h-6 text-gold-300 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </button>
      )}

      {/* 3. EXPANDED CONCIERGE CHAT WINDOW */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[550px] sm:h-[600px] max-h-[85vh] bg-[#FBF8F3] text-[#231815] shadow-2xl border border-[#D5CDC0] flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-[#5F060C] text-cream-100 px-4 py-3 sm:py-3.5 border-b border-black/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-gold-300/40">
                <Cake className="w-4 h-4 text-gold-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm text-cream-100 leading-none">
                    Sweet Story Concierge
                  </h3>
                  <span className="text-[9px] font-mono uppercase bg-gold-400/20 text-gold-200 px-1 py-0.2 rounded font-semibold">
                    AI 120B
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-cream-100/80 mt-1">
                  <Clock className="w-3 h-3 text-gold-300" />
                  <span>{istContext ? `${istContext.time_str} IST` : 'Indian Standard Time'}</span>
                  <span>•</span>
                  <span className={istContext?.is_open ? 'text-emerald-300 font-bold' : 'text-amber-200'}>
                    {istContext?.is_open ? 'Studio Open' : 'Resting (Reopens 10 AM)'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-cream-100/80 hover:text-white transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions Strip */}
          <div className="bg-[#EFEAE1] px-3 py-2 border-b border-[#D5CDC0] flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono scrollbar-none">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="shrink-0 px-2.5 py-1 bg-white hover:bg-[#5F060C] hover:text-white border border-[#D5CDC0] text-[#34221D] transition-colors whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs sm:text-sm">
            {messages.map((m, idx) => {
              const isAssistant = m.role === 'assistant';
              return (
                <div 
                  key={idx}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div className={`max-w-[85%] p-3.5 ${
                    isAssistant 
                      ? 'bg-white border border-[#D5CDC0] text-[#231815] shadow-sm' 
                      : 'bg-[#231815] text-[#FBF8F3]'
                  }`}>
                    {isAssistant && (
                      <div className="flex items-center gap-1.5 mb-1 pb-1 border-b border-[#D5CDC0]/60 text-[10px] font-mono uppercase tracking-wider text-[#5F060C] font-bold">
                        <Sparkles className="w-3 h-3 text-gold-600" />
                        <span>Concierge</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed font-serif text-xs sm:text-sm">
                      {m.content}
                    </p>
                  </div>

                  {/* Actions attached to message */}
                  {isAssistant && m.actions && m.actions.length > 0 && (
                    <div className="mt-2 space-y-1.5 max-w-[85%]">
                      {m.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(act)}
                          className="w-full text-left px-3 py-1.5 bg-[#EFEAE1] hover:bg-[#5F060C] hover:text-white border border-[#D5CDC0] text-[#150E0B] text-xs font-mono font-medium transition-colors flex items-center justify-between gap-2"
                        >
                          <span>{act.label}</span>
                          {act.action_type === 'link' ? (
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] font-mono text-[#846055] mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#5F060C] p-2 bg-white/70 border border-[#D5CDC0] w-fit">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Sweet Story Concierge is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-white border-t border-[#D5CDC0]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in English, मराठी or हिंदी..."
                className="flex-1 px-3 py-2 bg-[#FBF8F3] border border-[#D5CDC0] text-xs text-[#231815] placeholder:text-[#846055] focus:outline-none focus:border-[#5F060C]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-3.5 py-2 bg-[#5F060C] hover:bg-[#430408] disabled:bg-gray-400 text-white text-xs font-mono transition-colors flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[#846055]">
              <span>Languages: English • मराठी • हिंदी</span>
              <span>100% Eggless Pâtisserie</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
