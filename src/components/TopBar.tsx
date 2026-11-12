import React from 'react';
import { FileCheck, Sparkles, Printer } from 'lucide-react';

interface TopBarProps {
  onPrint: () => void;
  onOpenATS: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onPrint, onOpenATS }) => {
  return (
    <header className="no-print bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
          <span className="text-base font-bold tracking-tight text-neutral-950 font-sans-modern">
            ATS Modern CV
          </span>
          <span className="text-xs text-neutral-400 font-normal hidden sm:inline">
            · Muhammad Ikhsan Raihan Fadilah, S.E.
          </span>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-600">
          <a
            href="#cv-printable-document"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            Pratinjau CV
          </a>
          <button
            onClick={onOpenATS}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Kepatuhan ATS
          </button>
          <a
            href="https://linkedin.com/in/mirfikhsan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            LinkedIn
          </a>
          <a
            href="https://behance.net/mirfikhsan1"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            Behance
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onPrint}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Simpan PDF / Cetak</span>
          </button>
        </div>
      </div>
    </header>
  );
};
