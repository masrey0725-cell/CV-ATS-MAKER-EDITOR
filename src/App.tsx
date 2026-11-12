import React, { useState } from 'react';
import { cvData } from './data/cvData';
import { CVDocument } from './components/CVDocument';
import { TopBar } from './components/TopBar';
import { Toolbar } from './components/Toolbar';
import { ATSInspectorModal } from './components/ATSInspectorModal';
import { Check, Info, FileText, ExternalLink, Sparkles, Eye, Download, Shield } from 'lucide-react';

export default function App() {
  const [fontStyle, setFontStyle] = useState<'sans' | 'serif' | 'hybrid'>('sans');
  const [density, setDensity] = useState<'normal' | 'compact'>('normal');
  const [showPhoto, setShowPhoto] = useState<boolean>(true);
  const [photoStyle, setPhotoStyle] = useState<'color' | 'grayscale'>('color');
  const [headerAlign, setHeaderAlign] = useState<'left' | 'center'>('left');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isATSModalOpen, setIsATSModalOpen] = useState<boolean>(false);
  const [showOriginalModal, setShowOriginalModal] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Header */}
      <TopBar onPrint={handlePrint} onOpenATS={() => setIsATSModalOpen(true)} />

      {/* Interactive Customization Toolbar */}
      <Toolbar
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        density={density}
        setDensity={setDensity}
        showPhoto={showPhoto}
        setShowPhoto={setShowPhoto}
        photoStyle={photoStyle}
        setPhotoStyle={setPhotoStyle}
        headerAlign={headerAlign}
        setHeaderAlign={setHeaderAlign}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        onOpenATSModal={() => setIsATSModalOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Info Banner: Explaining the redesign & ATS optimizations */}
        <div className="no-print mb-6 bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-950 flex items-center gap-2">
                Format CV ATS Modern & Elegan Telah Diterapkan
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-medium">
                  100% Konten Utuh
                </span>
              </h2>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed max-w-3xl">
                Tata letak telah diperbarui dengan tipografi monokrom tingkat tinggi (hitam-putih berwibawa), membenahi masalah orphan heading pada CV asli, dan disesuaikan dengan standar parsing sistem ATS (Jobstreet, Glints, Workday, dll).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
            <button
              onClick={() => setShowOriginalModal(true)}
              className="flex-1 md:flex-none px-3 py-1.5 text-xs font-medium border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5 text-neutral-800 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-neutral-500" />
              <span>Bandingkan Asli</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 md:flex-none px-4 py-1.5 text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh / Cetak PDF</span>
            </button>
          </div>
        </div>

        {/* The Printable / Rendered CV Paper */}
        <div className="flex justify-center pb-12">
          <CVDocument
            data={cvData}
            fontStyle={fontStyle}
            density={density}
            showPhoto={showPhoto}
            photoStyle={photoStyle}
            headerAlign={headerAlign}
            searchKeyword={searchKeyword}
          />
        </div>

        {/* Quick Printing Guidelines Footer Banner */}
        <div className="no-print max-w-[850px] mx-auto mt-2 p-4 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-neutral-500 shrink-0" />
            <span>
              <strong>Petunjuk Cetak PDF:</strong> Pilih Destination <em>Save as PDF</em>, Paper Size <em>A4</em>, Margins <em>Default / None</em>, dan aktifkan <em>Background graphics</em>.
            </span>
          </div>
          <button
            onClick={handlePrint}
            className="px-3 py-1 border border-neutral-300 rounded font-medium text-neutral-800 hover:bg-neutral-50 whitespace-nowrap"
          >
            Buka Dialog Cetak
          </button>
        </div>
      </main>

      {/* ATS Inspector Modal */}
      <ATSInspectorModal
        data={cvData}
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        onSearchKeyword={(kw) => setSearchKeyword(kw)}
      />

      {/* Original CV Comparison Modal */}
      {showOriginalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
          <div className="bg-white text-neutral-900 w-full max-w-4xl rounded-xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-neutral-900" />
                <h3 className="font-semibold text-neutral-950 text-base">
                  Perbandingan Dokumen Asli vs Desain Baru
                </h3>
              </div>
              <button
                onClick={() => setShowOriginalModal(false)}
                className="text-neutral-500 hover:text-black font-semibold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-neutral-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
                  <h4 className="font-bold text-neutral-900 mb-2">Dokumen Asli (Sebelum)</h4>
                  <ul className="text-xs space-y-1.5 list-disc pl-4 text-neutral-600">
                    <li>Header kotak biru tua berat dengan foto latar merah yang kurang ramah ATS.</li>
                    <li>Judul seksi menggunakan warna biru yang sering diabaikan parser lama.</li>
                    <li><strong>Orphan Heading:</strong> Judul "PENDIDIKAN" terpotong sendiri di paling bawah Halaman 1, sedangkan daftar kampus baru muncul di Halaman 2.</li>
                    <li>Tipografi generik dengan line-spacing yang terlalu padat dan spasi pipa (|) tidak seragam.</li>
                  </ul>
                </div>

                <div className="p-4 border border-neutral-900 rounded-lg bg-neutral-950 text-white">
                  <h4 className="font-bold text-white mb-2">Desain Baru (Sesudah)</h4>
                  <ul className="text-xs space-y-1.5 list-disc pl-4 text-neutral-300">
                    <li>Palet monokrom hitam-putih murni, elegan, berwibawa, dan 100% ATS friendly.</li>
                    <li>Hierarki tipografi proporsional dengan garis pembatas hairline 1px tegas.</li>
                    <li>Perlindungan page break (<code className="text-neutral-300 font-mono">break-inside-avoid</code>) sehingga seksi dan entri pekerjaan tidak terpotong canggung.</li>
                    <li>Semua 100% data, angka (IPK 3,89, 600 pcs, 10–25 pelanggan), dan deskripsi lengkap dipertahankan utuh.</li>
                    <li>Dukungan ekspor cetak PDF A4 langsung dengan satu klik.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 text-center">
                <a
                  href="/public/assets/aistudio/Master_CV_Muhammad_Ikhsan_Raihan_Fadilah_c7947c6c.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-700 hover:text-black underline underline-offset-4"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Buka File PDF Asli di Tab Baru
                </a>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex justify-end">
              <button
                onClick={() => setShowOriginalModal(false)}
                className="px-4 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800"
              >
                Kembali ke Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
