import React, { useState } from 'react';
import { MessageCircle, X, Send, Clock, CheckCheck, Sparkles } from 'lucide-react';

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const phone = "923001234567";

  const quickOptions = [
    { title: "👕 Rapid Sample Request", text: "Hi Hare Sportswear! I'd like to request a 7-day physical sample for our custom teamwear/apparel line." },
    { title: "📊 Bulk Production MOQ & Quote", text: "Hello! We are looking for an OEM/ODM quote for 100+ units. Can you share price brackets?" },
    { title: "📐 Free Tech Pack Review", text: "Hi! I have a tech pack and vector artwork ready. Can your engineering team review it for manufacturing?" },
  ];

  const handleSend = (textToSend) => {
    const message = textToSend || customMsg;
    if (!message) return;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Quick Chat Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-3xl bg-[#1A1A1A] text-white border border-black/40 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF751F] to-[#E65E08] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  H
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-white border-2 border-[#E65E08] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm">Hare Factory Support</h4>
                <p className="text-[11px] text-orange-100 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Typically replies within 15 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#242220] space-y-3 max-h-96 overflow-y-auto">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-cream-200 space-y-1">
              <p className="font-bold text-white flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF751F]" /> Sialkot Export Desk
              </p>
              <p>Welcome! How can our production engineering team assist your brand today?</p>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-wider text-cream-400 pt-1">
              Choose Quick Inquiry:
            </p>

            <div className="space-y-2">
              {quickOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(opt.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-[#FF751F]/15 border border-white/5 hover:border-[#FF751F]/40 text-xs text-cream-100 transition-all flex items-center justify-between group"
                >
                  <span className="font-medium group-hover:text-[#FF751F]">{opt.title}</span>
                  <Send className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FF751F] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <div className="relative">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a custom inquiry..."
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF751F]"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!customMsg.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#FF751F] hover:bg-[#E65E08] text-white disabled:opacity-40 transition-opacity"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-[10px] text-center text-[#8A847A] flex items-center justify-center gap-1 pt-1">
              <CheckCheck className="w-3 h-3 text-[#FF751F]" /> End-to-end encrypted factory line
            </div>
          </div>

        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-white font-bold text-sm shadow-glow-orange border border-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
        aria-label="Contact via WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-current text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
        </div>
        <span className="hidden sm:inline font-display">Factory WhatsApp</span>
      </button>

    </div>
  );
}
