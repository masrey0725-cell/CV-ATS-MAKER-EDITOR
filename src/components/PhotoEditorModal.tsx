import React, { useState, useRef } from 'react';
import { PhotoSettings, defaultPhotoSettings } from '../data/cvData';
import {
  Upload,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Sliders,
  Check,
  X,
  RefreshCw,
  Sun,
  Contrast,
  Crop,
  Layers,
  Square,
  Circle,
} from 'lucide-react';

interface PhotoEditorModalProps {
  settings: PhotoSettings;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newSettings: PhotoSettings) => void;
}

export const PhotoEditorModal: React.FC<PhotoEditorModalProps> = ({
  settings,
  isOpen,
  onClose,
  onSave,
}) => {
  const [localSettings, setLocalSettings] = useState<PhotoSettings>({ ...settings });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Silakan pilih file gambar yang valid (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setLocalSettings((prev) => ({
          ...prev,
          url: result,
          zoom: 1,
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRotate = () => {
    setLocalSettings((prev) => ({
      ...prev,
      rotate: (prev.rotate + 90) % 360,
    }));
  };

  const handleReset = () => {
    setLocalSettings({ ...defaultPhotoSettings });
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  // Compute CSS filter string
  const getFilterStyle = () => {
    let filterString = `brightness(${localSettings.brightness}%) contrast(${localSettings.contrast}%)`;
    if (localSettings.filter === 'grayscale') {
      filterString += ' grayscale(100%)';
    } else if (localSettings.filter === 'high-contrast') {
      filterString += ' grayscale(100%) contrast(140%)';
    } else if (localSettings.filter === 'warm') {
      filterString += ' sepia(30%)';
    }
    return filterString;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
      <div className="bg-white text-neutral-900 w-full max-w-2xl rounded-xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-neutral-900" />
            <h3 className="font-semibold text-neutral-950 text-base">
              Editor Foto Profil & Pas Foto
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Main Visual Workspace: Left Preview, Right Basic Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Live Interactive Preview Box */}
            <div className="flex flex-col items-center justify-center p-4 bg-neutral-100 rounded-xl border border-neutral-200">
              <div className="text-xs text-neutral-500 mb-2 font-mono uppercase tracking-wider">
                Pratinjau Hasil di CV
              </div>

              {/* The frame container */}
              <div
                className={`relative overflow-hidden bg-neutral-200 shadow-md transition-all duration-200 ${
                  localSettings.shape === 'circle'
                    ? 'w-32 h-32 rounded-full'
                    : localSettings.shape === 'rounded'
                    ? 'w-28 h-36 rounded-xl'
                    : 'w-28 h-36 rounded-none'
                } ${
                  localSettings.border === 'bold'
                    ? 'border-2 border-neutral-900'
                    : localSettings.border === 'thin'
                    ? 'border border-neutral-900'
                    : 'border-none'
                }`}
              >
                <img
                  src={localSettings.url}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  style={{
                    transform: `translate(${localSettings.offsetX}%, ${localSettings.offsetY}%) scale(${localSettings.zoom}) rotate(${localSettings.rotate}deg)`,
                    filter: getFilterStyle(),
                    transition: 'transform 0.1s ease-out, filter 0.15s ease',
                  }}
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={handleRotate}
                  className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 flex items-center gap-1.5 shadow-2xs"
                  title="Putar 90 derajat searah jarum jam"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Putar 90° ({localSettings.rotate}°)</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-2.5 py-1 text-xs font-medium text-neutral-600 hover:text-neutral-950 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Quick Upload & Photo Source */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                  Ganti Foto Baru
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Upload className="w-4 h-4" />
                  <span>Unggah Foto dari Komputer</span>
                </button>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Format disarankan: JPG / PNG resolusi minimal 400x500px dengan pakaian formal atau rapi.
                </p>
              </div>

              {/* Mode Filter Warna */}
              <div>
                <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                  Nuansa / Filter Warna
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setLocalSettings((p) => ({ ...p, filter: 'color' }))}
                    className={`px-3 py-1.5 text-xs rounded-md border font-medium text-left transition-colors ${
                      localSettings.filter === 'color'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    Warna Asli
                  </button>
                  <button
                    onClick={() => setLocalSettings((p) => ({ ...p, filter: 'grayscale' }))}
                    className={`px-3 py-1.5 text-xs rounded-md border font-medium text-left transition-colors ${
                      localSettings.filter === 'grayscale'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    B&W Standar ATS
                  </button>
                  <button
                    onClick={() => setLocalSettings((p) => ({ ...p, filter: 'high-contrast' }))}
                    className={`px-3 py-1.5 text-xs rounded-md border font-medium text-left transition-colors ${
                      localSettings.filter === 'high-contrast'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    Studio Monokrom
                  </button>
                  <button
                    onClick={() => setLocalSettings((p) => ({ ...p, filter: 'warm' }))}
                    className={`px-3 py-1.5 text-xs rounded-md border font-medium text-left transition-colors ${
                      localSettings.filter === 'warm'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    Warm Tone
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Adjustment Sliders */}
          <div className="border-t border-neutral-200 pt-5 space-y-4">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider">
              Penyesuaian Posisi & Skala
            </h4>

            {/* Zoom / Skala */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-neutral-700 flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Perbesar / Zoom: {Math.round(localSettings.zoom * 100)}%
                </span>
                <span className="text-neutral-400">0.6x – 2.5x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="2.5"
                step="0.05"
                value={localSettings.zoom}
                onChange={(e) =>
                  setLocalSettings((p) => ({ ...p, zoom: parseFloat(e.target.value) }))
                }
                className="w-full accent-neutral-900 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Geser Posisi X & Y */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-neutral-700">Geser Horizontal (X):</span>
                  <span className="text-neutral-500 font-mono">{localSettings.offsetX}%</span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  step="1"
                  value={localSettings.offsetX}
                  onChange={(e) =>
                    setLocalSettings((p) => ({ ...p, offsetX: parseInt(e.target.value) }))
                  }
                  className="w-full accent-neutral-900 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-neutral-700">Geser Vertikal (Y):</span>
                  <span className="text-neutral-500 font-mono">{localSettings.offsetY}%</span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  step="1"
                  value={localSettings.offsetY}
                  onChange={(e) =>
                    setLocalSettings((p) => ({ ...p, offsetY: parseInt(e.target.value) }))
                  }
                  className="w-full accent-neutral-900 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Kecerahan & Kontras */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-neutral-700 flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5" /> Kecerahan: {localSettings.brightness}%
                  </span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="135"
                  step="1"
                  value={localSettings.brightness}
                  onChange={(e) =>
                    setLocalSettings((p) => ({ ...p, brightness: parseInt(e.target.value) }))
                  }
                  className="w-full accent-neutral-900 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-neutral-700 flex items-center gap-1">
                    <Contrast className="w-3.5 h-3.5" /> Kontras: {localSettings.contrast}%
                  </span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="135"
                  step="1"
                  value={localSettings.contrast}
                  onChange={(e) =>
                    setLocalSettings((p) => ({ ...p, contrast: parseInt(e.target.value) }))
                  }
                  className="w-full accent-neutral-900 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Bentuk Bingkai & Garis Tepi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  Bentuk Bingkai Pas Foto
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLocalSettings((p) => ({ ...p, shape: 'rect' }))}
                    className={`flex-1 py-1.5 px-2 text-xs rounded border text-center font-medium transition-colors ${
                      localSettings.shape === 'rect'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    Kotak 3:4 (Resmi)
                  </button>
                  <button
                    onClick={() => setLocalSettings((p) => ({ ...p, shape: 'rounded' }))}
                    className={`flex-1 py-1.5 px-2 text-xs rounded border text-center font-medium transition-colors ${
                      localSettings.shape === 'rounded'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    Rounded
                  </button>
                  <button
                    onClick={() => setLocalSettings((p) => ({ ...p, shape: 'circle' }))}
                    className={`flex-1 py-1.5 px-2 text-xs rounded border text-center font-medium transition-colors ${
                      localSettings.shape === 'circle'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    Lingkaran
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  Garis Batas (Border)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLocalSettings((p) => ({ ...p, border: 'thin' }))}
                    className={`flex-1 py-1.5 px-2 text-xs rounded border text-center font-medium transition-colors ${
                      localSettings.border === 'thin'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    Tipis (1px)
                  </button>
                  <button
                    onClick={() => setLocalSettings((p) => ({ ...p, border: 'bold' }))}
                    className={`flex-1 py-1.5 px-2 text-xs rounded border text-center font-medium transition-colors ${
                      localSettings.border === 'bold'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    Tebal (2px)
                  </button>
                  <button
                    onClick={() => setLocalSettings((p) => ({ ...p, border: 'none' }))}
                    className={`flex-1 py-1.5 px-2 text-xs rounded border text-center font-medium transition-colors ${
                      localSettings.border === 'none'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    Tanpa Garis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-xs text-neutral-600 hover:text-neutral-950 font-medium"
          >
            Kembalikan ke Pas Foto Bawaan
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 border border-neutral-300 font-medium text-xs text-neutral-800 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Terapkan pada CV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
