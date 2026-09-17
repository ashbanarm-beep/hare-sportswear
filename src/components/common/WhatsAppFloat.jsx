import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const whatsappUrl = "https://wa.me/message/PBVPZM3J7ETGH1";

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-white font-bold text-sm shadow-glow-orange border border-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
        aria-label="Chat directly with Factory on WhatsApp"
        title="Chat with Hare Sportswear Factory on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-current text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
        </div>
        <span className="hidden sm:inline font-display">Factory WhatsApp</span>
      </a>
    </aside>
  );
}
