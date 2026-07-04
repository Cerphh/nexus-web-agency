"use client";

import { Cpu, ArrowUp } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-white/5 py-12 px-6 sm:px-12 md:px-24 overflow-hidden">
      {/* Subtle bottom gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr  flex items-center justify-center">
            <Image
                src="/nexuslogomain.png"
                alt="Nexus logo"
                width={40}
                height={40}
                className="w-16 h-16 object-contain" // scale up until it visually fills the space
              />
          </div>
          <span className="font-sans font-black text-lg tracking-wider text-white">
            NEXUS
          </span>
        </div>

        {/* Copy / Message */}
        <div className="text-zinc-500 text-xs sm:text-sm font-medium text-center md:text-left">
          © {new Date().getFullYear()} NEXUS Agency. Engineered with precision for small business growth. All rights reserved.
        </div>

        {/* Action: Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-zinc-400 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
