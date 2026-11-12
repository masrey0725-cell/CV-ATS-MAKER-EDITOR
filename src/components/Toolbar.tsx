import React from 'react';
import { Printer, ShieldCheck, FileText, Search, RotateCcw, Image as ImageIcon, SlidersHorizontal } from 'lucide-react';

interface ToolbarProps {
  fontStyle: 'sans' | 'serif' | 'hybrid';
  setFontStyle: (val: 'sans' | 'serif' | 'hybrid') => void;
  density: 'normal' | 'compact';
  setDensity: (val: 'normal' | 'compact') => void;
  showPhoto: boolean;
  setShowPhoto: (val: boolean) => void;
  photoStyle: 'color' | 'grayscale';
  setPhotoStyle: (val: 'color' | 'grayscale') => void;
  headerAlign: 'left' | 'center';
  setHeaderAlign: (val: 'left' | 'center') => void;
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
  onOpenATSModal: () => void;
  onPrint: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  fontStyle,
  setFontStyle,
  density,
  setDensity,
  showPhoto,
  setShowPhoto,
  photoStyle,
  setPhotoStyle,
  headerAlign,
  setHeaderAlign,
  searchKeyword,
  setSearchKeyword,
  onOpenATSModal,
  onPrint,
}) => {
  return (
    <div className="no-print bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Controls Group */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Font Selector */}
            <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
              <span className="px-2 text-neutral-500 font-medium">Font:</span>
              <button
                onClick={() => setFontStyle('sans')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  fontStyle === 'sans'
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Modern Sans
              </button>
              <button
                onClick={() => setFontStyle('serif')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  fontStyle === 'serif'
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Editorial Serif
              </button>
              <button
                onClick={() => setFontStyle('hybrid')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  fontStyle === 'hybrid'
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Hybrid
              </button>
            </div>

            {/* Density Selector */}
            <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
              <span className="px-2 text-neutral-500 font-medium">Spasi:</span>
              <button
                onClick={() => setDensity('normal')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  density === 'normal'
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setDensity('compact')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  density === 'compact'
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Ringkas (Kompak)
              </button>
            </div>

            {/* Photo Toggle */}
            <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
              <button
                onClick={() => setShowPhoto(!showPhoto)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                  showPhoto
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
                title={showPhoto ? 'Klik untuk sembunyikan foto (Format ATS Murni)' : 'Klik untuk tampilkan pas foto'}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{showPhoto ? 'Foto Aktif' : 'Tanpa Foto (ATS)'}</span>
              </button>
              {showPhoto && (
                <button
                  onClick={() => setPhotoStyle(photoStyle === 'color' ? 'grayscale' : 'color')}
                  className="px-2 py-1 text-neutral-600 hover:text-neutral-950 font-medium text-[11px] border-l border-neutral-200 ml-1"
                  title="Ubah nuansa foto warna / monokrom"
                >
                  {photoStyle === 'color' ? 'Warna' : 'B&W'}
                </button>
              )}
            </div>

            {/* Header Align */}
            <div className="hidden lg:flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
              <button
                onClick={() => setHeaderAlign(headerAlign === 'left' ? 'center' : 'left')}
                className="px-2.5 py-1 rounded-md font-medium text-neutral-700 hover:text-neutral-950"
              >
                Tata Letak: {headerAlign === 'left' ? 'Rata Kiri' : 'Rata Tengah'}
              </button>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search input for keyword highlighter */}
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari kata kunci..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-8 pr-6 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs w-36 sm:w-44 focus:w-52 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all text-neutral-900 placeholder:text-neutral-400"
              />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-2 text-neutral-400 hover:text-black"
                >
                  ×
                </button>
              )}
            </div>

            {/* ATS Audit Trigger */}
            <button
              onClick={onOpenATSModal}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-lg border border-neutral-200 flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Cek ATS</span>
            </button>

            {/* Print / Save PDF Primary CTA */}
            <button
              onClick={onPrint}
              className="px-4 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-medium rounded-lg shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Unduh PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
