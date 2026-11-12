import React, { useState } from 'react';
import { CVData, PhotoSettings, defaultCvData } from './data/cvData';
import { CVDocument } from './components/CVDocument';
import { TopBar } from './components/TopBar';
import { Toolbar } from './components/Toolbar';
import { ATSInspectorModal } from './components/ATSInspectorModal';
import { PhotoEditorModal } from './components/PhotoEditorModal';
import { CVEditorDrawer } from './components/CVEditorDrawer';
import { LoginScreen } from './components/LoginScreen';
import { downloadDirectPDF } from './utils/pdfExport';
import { downloadDocx } from './utils/docxExport';
import {
  Check,
  Info,
  FileText,
  ExternalLink,
  Sparkles,
  Eye,
  Download,
  Shield,
  Edit3,
  Crop,
  CheckCircle,
  Loader2,
  Printer,
} from 'lucide-react';

const STORAGE_KEY = 'cv_ats_custom_data_v2';
const AUTH_SESSION_KEY = 'cv_owner_auth_session';
const AUTH_REMEMBER_KEY = 'cv_owner_auth_remember';

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const session = sessionStorage.getItem(AUTH_SESSION_KEY);
      const remember = localStorage.getItem(AUTH_REMEMBER_KEY);
      return session === 'true' || remember === 'true';
    } catch {
      return false;
    }
  });

  // Load saved CV data or default
  const [data, setData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.photoSettings) {
          parsed.photoSettings = defaultCvData.photoSettings;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved CV data:', e);
    }
    return defaultCvData;
  });

  const [fontStyle, setFontStyle] = useState<'sans' | 'serif' | 'hybrid'>('sans');
  const [density, setDensity] = useState<'normal' | 'compact'>('normal');
  const [showPhoto, setShowPhoto] = useState<boolean>(true);
  const [photoStyle, setPhotoStyle] = useState<'color' | 'grayscale'>('color');
  const [headerAlign, setHeaderAlign] = useState<'left' | 'center'>('left');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Modals & Drawers state
  const [isATSModalOpen, setIsATSModalOpen] = useState<boolean>(false);
  const [showOriginalModal, setShowOriginalModal] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isPhotoEditorOpen, setIsPhotoEditorOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Direct export loading states
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [isExportingWord, setIsExportingWord] = useState<boolean>(false);

  // Check if current data has been modified compared to default
  const isCustomized = JSON.stringify(data) !== JSON.stringify(defaultCvData);

  const handleLoginSuccess = (rememberMe: boolean) => {
    try {
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      if (rememberMe) {
        localStorage.setItem(AUTH_REMEMBER_KEY, 'true');
      } else {
        localStorage.removeItem(AUTH_REMEMBER_KEY);
      }
    } catch (e) {
      console.error('Session storage error:', e);
    }
    setIsAuthenticated(true);
    showToast('Akses berhasil dibuka. Selamat datang!');
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
      localStorage.removeItem(AUTH_REMEMBER_KEY);
    } catch (e) {
      console.error('Storage error during logout:', e);
    }
    setIsAuthenticated(false);
  };

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleSaveCVData = (newData: CVData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save CV data to localStorage:', e);
    }
    showToast('Isi konten CV berhasil diperbarui & disimpan.');
  };

  const handleSavePhotoSettings = (newSettings: PhotoSettings) => {
    setData((prev) => {
      const updated = {
        ...prev,
        photoSettings: newSettings,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save photo settings:', e);
      }
      return updated;
    });
    showToast('Foto profil & penyesuaian gambar berhasil diterapkan.');
  };

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh isi CV dan foto ke dokumen PDF asli?')) {
      setData(defaultCvData);
      localStorage.removeItem(STORAGE_KEY);
      showToast('Data CV dikembalikan ke versi PDF asli.');
    }
  };

  // Direct PDF Download (Pixel-perfect high resolution A4 PDF)
  const handleDownloadDirectPDF = async () => {
    try {
      showToast('Memproses file PDF resolusi tinggi A4...');
      await downloadDirectPDF('cv-printable-document', data.name, setIsExportingPDF);
      showToast('File PDF resmi berhasil diunduh ke komputer!');
    } catch (err) {
      console.error('Direct PDF error:', err);
      showToast('Gagal membuat PDF otomatis, beralih ke dialog cetak...');
      window.print();
    }
  };

  // Direct Word (.docx) Download
  const handleDownloadDirectWord = async () => {
    try {
      setIsExportingWord(true);
      showToast('Membuat file Microsoft Word (.docx)...');
      await downloadDocx(data);
      showToast('File Word (.docx) siap diedit berhasil diunduh!');
    } catch (err) {
      console.error('Direct Word error:', err);
      showToast('Gagal membuat file Word.');
    } finally {
      setIsExportingWord(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // If user is not authenticated, show password lock screen
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-neutral-950 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-neutral-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <TopBar
        onPrint={handlePrint}
        onOpenATS={() => setIsATSModalOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
        onDownloadPDF={handleDownloadDirectPDF}
        onDownloadWord={handleDownloadDirectWord}
        onLogout={handleLogout}
      />

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
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenPhotoEditor={() => setIsPhotoEditorOpen(true)}
        onDownloadPDF={handleDownloadDirectPDF}
        onDownloadWord={handleDownloadDirectWord}
        onPrint={handlePrint}
        isExportingPDF={isExportingPDF}
        isExportingWord={isExportingWord}
        isCustomized={isCustomized}
        onResetData={handleResetData}
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
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-semibold text-neutral-950">
                  Format CV ATS Modern & Elegan
                </h2>
                {isCustomized ? (
                  <span className="text-[10px] bg-neutral-900 text-white px-2 py-0.5 rounded font-mono font-medium">
                    Tersimpan Otomatis (Custom Edit)
                  </span>
                ) : (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-medium">
                    100% Sesuai PDF Asli
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed max-w-3xl">
                Unduh langsung CV Anda dalam format <strong>PDF Resolusi Tinggi (A4)</strong> atau <strong>Microsoft Word (.docx)</strong> yang dapat diedit langsung di komputer/HP Anda.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0 flex-wrap">
            <button
              onClick={() => setIsPhotoEditorOpen(true)}
              className="px-3 py-1.5 text-xs font-medium border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5 text-neutral-800 cursor-pointer"
              title="Edit pas foto profil"
            >
              <Crop className="w-3.5 h-3.5 text-neutral-700" />
              <span>Edit Foto</span>
            </button>

            <button
              onClick={() => setIsEditorOpen(true)}
              className="px-3 py-1.5 text-xs font-medium border border-neutral-900 bg-white hover:bg-neutral-50 text-neutral-950 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Edit semua teks dan riwayat CV"
            >
              <Edit3 className="w-3.5 h-3.5 text-neutral-900" />
              <span>Edit Teks</span>
            </button>

            {/* Direct Word (.docx) Download Button */}
            <button
              onClick={handleDownloadDirectWord}
              disabled={isExportingWord}
              className="px-3.5 py-1.5 text-xs font-semibold bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-2xs"
              title="Unduh dokumen format Microsoft Word (.docx) resmi"
            >
              {isExportingWord ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FileText className="w-3.5 h-3.5 text-blue-700" />
              )}
              <span>Unduh Word (.docx)</span>
            </button>

            {/* Direct High-Res PDF Download Button */}
            <button
              onClick={handleDownloadDirectPDF}
              disabled={isExportingPDF}
              className="px-4 py-1.5 text-xs font-semibold bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-60"
              title="Unduh langsung file PDF A4 berkualitas tinggi"
            >
              {isExportingPDF ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Membuat PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh PDF Langsung</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* The Printable / Rendered CV Paper */}
        <div className="flex justify-center pb-12">
          <CVDocument
            data={data}
            fontStyle={fontStyle}
            density={density}
            showPhoto={showPhoto}
            photoStyle={photoStyle}
            headerAlign={headerAlign}
            searchKeyword={searchKeyword}
            onOpenPhotoEditor={() => setIsPhotoEditorOpen(true)}
            onOpenContentEditor={() => setIsEditorOpen(true)}
          />
        </div>

        {/* Quick Printing Guidelines Footer Banner */}
        <div className="no-print max-w-[850px] mx-auto mt-2 p-4 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-neutral-500 shrink-0" />
            <span>
              <strong>Pilihan Unduh:</strong> Klik <em>Unduh PDF Langsung</em> untuk file PDF A4 tajam tanpa dialog cetak browser, atau <em>Unduh Word (.docx)</em> untuk file dokumen Microsoft Word resmi.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadDirectWord}
              className="px-3 py-1 border border-neutral-300 rounded font-medium text-neutral-800 hover:bg-neutral-50 whitespace-nowrap cursor-pointer text-xs"
            >
              Unduh .docx
            </button>
            <button
              onClick={handleDownloadDirectPDF}
              className="px-3 py-1 bg-neutral-950 text-white rounded font-medium hover:bg-neutral-800 whitespace-nowrap cursor-pointer text-xs"
            >
              Unduh .pdf
            </button>
          </div>
        </div>
      </main>

      {/* ATS Inspector Modal */}
      <ATSInspectorModal
        data={data}
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        onSearchKeyword={(kw) => setSearchKeyword(kw)}
      />

      {/* Photo Editor Modal */}
      <PhotoEditorModal
        settings={data.photoSettings}
        isOpen={isPhotoEditorOpen}
        onClose={() => setIsPhotoEditorOpen(false)}
        onSave={handleSavePhotoSettings}
      />

      {/* CV Content Editor Drawer */}
      <CVEditorDrawer
        data={data}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveCVData}
        onReset={handleResetData}
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
                className="text-neutral-500 hover:text-black font-semibold text-lg p-1 cursor-pointer"
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
                    <li>Fitur <strong>Unduh PDF Langsung</strong> resolusi tinggi & <strong>Unduh Word (.docx)</strong> asli.</li>
                    <li>Fitur <strong>Live Editor</strong> untuk teks dan foto.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 text-center">
                <a
                  href="/assets/aistudio/Master_CV_Muhammad_Ikhsan_Raihan_Fadilah_c7947c6c.pdf"
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
                className="px-4 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 cursor-pointer"
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
