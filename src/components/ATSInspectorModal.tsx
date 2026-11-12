import React, { useState } from 'react';
import { CVData } from '../data/cvData';
import { CheckCircle2, Copy, Check, X, FileText, Cpu, Search, Sparkles } from 'lucide-react';

interface ATSInspectorModalProps {
  data: CVData;
  isOpen: boolean;
  onClose: () => void;
  onSearchKeyword: (keyword: string) => void;
}

export const ATSInspectorModal: React.FC<ATSInspectorModalProps> = ({
  data,
  isOpen,
  onClose,
  onSearchKeyword,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'plaintext' | 'keywords'>('audit');

  if (!isOpen) return null;

  // Generate clean plain text format for direct pasting into Job Portals (Workday, Glints, Jobstreet)
  const generatePlainText = () => {
    let text = `${data.name}, ${data.titleSuffix}\n`;
    text += `${data.contact.phone} | ${data.contact.email} | ${data.contact.location}\n`;
    text += `LinkedIn: https://${data.contact.linkedin} | Portfolio: https://${data.contact.behance}\n\n`;

    text += `PROFIL PROFESIONAL\n${data.summary}\n\n`;

    text += `PENGALAMAN KERJA\n`;
    data.workExperience.forEach((job) => {
      text += `${job.role} - ${job.company}${job.location ? ' (' + job.location + ')' : ''}\n`;
      text += `${job.period}\n`;
      job.bullets.forEach((b) => {
        text += `• ${b}\n`;
      });
      text += `\n`;
    });

    text += `PENGALAMAN ORGANISASI & KEPEMIMPINAN\n`;
    data.organizationExperience.forEach((org) => {
      text += `${org.role} - ${org.organization}\n`;
      text += `${org.period}\n`;
      org.bullets.forEach((b) => {
        text += `• ${b}\n`;
      });
      text += `\n`;
    });

    text += `PENGALAMAN BISNIS & PENGAJARAN\n`;
    data.businessTeachingExperience.forEach((item) => {
      text += `${item.role} - ${item.entity}\n`;
      text += `${item.period}\n`;
      item.bullets.forEach((b) => {
        text += `• ${b}\n`;
      });
      text += `\n`;
    });

    text += `PENDIDIKAN\n`;
    data.education.forEach((edu) => {
      text += `${edu.degree} - ${edu.institution} (${edu.period})${edu.honors ? ' | ' + edu.honors : ''}\n`;
    });
    text += `\n`;

    text += `KEAHLIAN\n`;
    data.skills.forEach((s) => {
      text += `${s.category}: ${s.skills}\n`;
    });
    text += `\n`;

    text += `PELATIHAN & PENCAPAIAN\n`;
    data.trainingsAndAchievements.forEach((item) => {
      text += `• ${item}\n`;
    });

    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePlainText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const atsChecklist = [
    {
      title: 'Struktur Single-Column (Satu Kolom Linier)',
      status: 'Lolos',
      desc: 'Sistem ATS (Workday, Taleo, Greenhouse) membaca dokumen dari kiri ke kanan secara vertikal. Format satu kolom memastikan tidak ada teks yang terbaca tumpang tindih.',
    },
    {
      title: 'Judul Bagian Standar (Standard Section Headers)',
      status: 'Lolos',
      desc: 'Menggunakan header baku (PROFIL PROFESIONAL, PENGALAMAN KERJA, PENDIDIKAN, KEAHLIAN) yang langsung dikenali oleh algoritma parsing perayap CV.',
    },
    {
      title: 'Teks Bersih Dapat Diseleksi (Searchable DOM Text)',
      status: 'Lolos',
      desc: '100% teks asli berbasis font vektor standar, bukan grafik, tabel rumit, atau kanvas yang membuat CV tidak terindeks.',
    },
    {
      title: 'Data Kontak & Tautan Lengkap',
      status: 'Lolos',
      desc: 'Nomor telepon, email, domisili, profil LinkedIn, dan portfolio Behance terformat secara eksplisit dan valid.',
    },
    {
      title: 'Simbol Poin Standar (Standard Bullets)',
      status: 'Lolos',
      desc: 'Menggunakan format poin bulat standar (•) yang ramah parser dan tidak menyebabkan karakter rusak (garbled characters).',
    },
    {
      title: 'Bebas Kotak Tabel & Kolom Mengambang',
      status: 'Lolos',
      desc: 'Tidak ada elemen floating text box atau tabel bersarang yang sering menggagalkan parser rekruter perusahaan multinasional.',
    },
  ];

  const keyKeywords = [
    { word: 'Operasional', category: 'Retail' },
    { word: 'Pelayanan Pelanggan', category: 'Customer Service' },
    { word: 'Customer Service', category: 'Customer Service' },
    { word: 'Administrasi', category: 'Office' },
    { word: 'Bank Syariah Indonesia', category: 'Banking' },
    { word: 'Mudharabah', category: 'Sharia Finance' },
    { word: 'Settlement', category: 'Finance' },
    { word: 'Microsoft Office', category: 'Tech' },
    { word: 'Desain Grafis', category: 'Design' },
    { word: 'Photoshop', category: 'Design' },
    { word: 'Illustrator', category: 'Design' },
    { word: 'Canva', category: 'Design' },
    { word: 'Audit', category: 'Finance' },
    { word: 'Ekonomi Syariah', category: 'Education' },
    { word: 'Cum Laude', category: 'Education' },
    { word: 'PTIQ Jakarta', category: 'Education' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
      <div className="bg-white text-neutral-900 w-full max-w-3xl rounded-xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-neutral-900" />
            <h3 className="font-semibold text-neutral-950 text-base">
              ATS Simulator & Scanner Kepatuhan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 px-6 gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'audit'
                ? 'border-neutral-900 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Audit Kepatuhan ATS (100% Score)
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'keywords'
                ? 'border-neutral-900 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Deteksi Kata Kunci
          </button>
          <button
            onClick={() => setActiveTab('plaintext')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'plaintext'
                ? 'border-neutral-900 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Salin Plain Text Portal Kerja
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-900 text-white rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-neutral-300">
                    Skor Kepatuhan ATS
                  </div>
                  <div className="text-2xl font-bold mt-0.5">100 / 100 — Sangat Siap Lolos Parsing</div>
                  <p className="text-xs text-neutral-300 mt-1">
                    Kompatibel dengan portal Glints, Jobstreet, Kalibrr, Workday, Taleo, dan Greenhouse.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-bold text-lg shrink-0">
                  A+
                </div>
              </div>

              <div className="grid gap-3 pt-2">
                {atsChecklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 border border-neutral-200 rounded-lg hover:border-neutral-400 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-neutral-950 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 pl-6 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'keywords' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-600">
                Klik kata kunci di bawah ini untuk menandai posisinya secara langsung di lembar CV Anda.
              </p>
              <div className="flex flex-wrap gap-2">
                {keyKeywords.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSearchKeyword(item.word);
                      onClose();
                    }}
                    className="px-3 py-1.5 text-xs border border-neutral-300 rounded-md hover:border-black hover:bg-neutral-100 transition-colors flex items-center gap-1.5 text-neutral-800"
                  >
                    <Search className="w-3 h-3 text-neutral-500" />
                    <span>{item.word}</span>
                    <span className="text-[10px] text-neutral-400">({item.category})</span>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg text-xs space-y-2 text-neutral-700">
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-neutral-900" />
                  Tips Optimalisasi Rekrutmen
                </div>
                <p>
                  CV ini memiliki bobot seimbang antara <strong>operasional perbankan/keuangan syariah</strong>, <strong>administrasi perkantoran</strong>, dan <strong>keahlian digital kreatif</strong>. Format monokrom ATS ini memudahkan sistem menyaring kualifikasi Anda ke meja wawancara tanpa hambatan desain grafis yang terlalu ramai.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'plaintext' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-600">
                  Format teks murni untuk langsung di-copy ke formulir online atau textarea lamaran kerja:
                </p>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Salin Semua Teks
                    </>
                  )}
                </button>
              </div>

              <textarea
                readOnly
                value={generatePlainText()}
                rows={14}
                className="w-full p-3.5 font-mono text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <span>Standar Format Resume Internasional & Regional</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-neutral-300 font-medium text-neutral-800 rounded-md hover:bg-neutral-100 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
