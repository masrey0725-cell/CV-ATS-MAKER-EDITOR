import React, { useState } from 'react';
import { CVData, WorkExperience, OrganizationExperience, BusinessTeachingExperience, EducationItem, SkillCategory } from '../data/cvData';
import {
  X,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface CVEditorDrawerProps {
  data: CVData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: CVData) => void;
  onReset: () => void;
}

export const CVEditorDrawer: React.FC<CVEditorDrawerProps> = ({
  data,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<CVData>(JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'education' | 'skills' | 'achievements'>('profile');

  // Keep form data synced when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(data)));
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof CVData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: keyof CVData['contact'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  // --- Work Experience Handlers ---
  const handleWorkExpChange = (index: number, field: keyof WorkExperience, value: any) => {
    const updated = [...formData.workExperience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, workExperience: updated }));
  };

  const handleWorkBulletChange = (expIndex: number, bulletIndex: number, value: string) => {
    const updated = [...formData.workExperience];
    const newBullets = [...updated[expIndex].bullets];
    newBullets[bulletIndex] = value;
    updated[expIndex].bullets = newBullets;
    setFormData((prev) => ({ ...prev, workExperience: updated }));
  };

  const addWorkBullet = (expIndex: number) => {
    const updated = [...formData.workExperience];
    updated[expIndex].bullets = [...updated[expIndex].bullets, ''];
    setFormData((prev) => ({ ...prev, workExperience: updated }));
  };

  const removeWorkBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...formData.workExperience];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, idx) => idx !== bulletIndex);
    setFormData((prev) => ({ ...prev, workExperience: updated }));
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      role: 'Posisi Baru',
      company: 'Nama Perusahaan / Organisasi',
      location: 'Kota',
      period: 'Bln Tahun – Bln Tahun',
      bullets: ['Deskripsi tanggung jawab atau pencapaian utama.'],
    };
    setFormData((prev) => ({
      ...prev,
      workExperience: [newExp, ...prev.workExperience],
    }));
  };

  const removeWorkExperience = (index: number) => {
    if (window.confirm('Yakin ingin menghapus riwayat pekerjaan ini?')) {
      setFormData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.filter((_, i) => i !== index),
      }));
    }
  };

  // --- Organization Experience Handlers ---
  const handleOrgChange = (index: number, field: keyof OrganizationExperience, value: any) => {
    const updated = [...formData.organizationExperience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, organizationExperience: updated }));
  };

  const handleOrgBulletChange = (orgIndex: number, bulletIndex: number, value: string) => {
    const updated = [...formData.organizationExperience];
    const newBullets = [...updated[orgIndex].bullets];
    newBullets[bulletIndex] = value;
    updated[orgIndex].bullets = newBullets;
    setFormData((prev) => ({ ...prev, organizationExperience: updated }));
  };

  const addOrgExperience = () => {
    const newOrg: OrganizationExperience = {
      role: 'Jabatan Organisasi',
      organization: 'Nama Organisasi / Lembaga',
      period: 'Tahun – Tahun',
      bullets: ['Pencapaian atau tanggung jawab utama dalam divisi.'],
    };
    setFormData((prev) => ({
      ...prev,
      organizationExperience: [...prev.organizationExperience, newOrg],
    }));
  };

  const removeOrgExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      organizationExperience: prev.organizationExperience.filter((_, i) => i !== index),
    }));
  };

  // --- Education Handlers ---
  const handleEduChange = (index: number, field: keyof EducationItem, value: any) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    const newEdu: EducationItem = {
      degree: 'Jenjang & Jurusan',
      institution: 'Nama Universitas / Sekolah',
      period: 'Tahun – Tahun',
      honors: '',
    };
    setFormData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // --- Skills Handlers ---
  const handleSkillChange = (index: number, field: keyof SkillCategory, value: string) => {
    const updated = [...formData.skills];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, skills: updated }));
  };

  const addSkillCategory = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { category: 'Kategori Keahlian', skills: 'Keahlian 1, Keahlian 2' }],
    }));
  };

  const removeSkillCategory = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // --- Achievements Handlers ---
  const handleAchievementChange = (index: number, value: string) => {
    const updated = [...formData.trainingsAndAchievements];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, trainingsAndAchievements: updated }));
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      trainingsAndAchievements: [...prev.trainingsAndAchievements, 'Nama Pelatihan atau Sertifikasi Baru (Tahun)'],
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      trainingsAndAchievements: prev.trainingsAndAchievements.filter((_, i) => i !== index),
    }));
  };

  const handleSaveAll = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs no-print">
      <div className="bg-white text-neutral-900 w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-neutral-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50 shrink-0">
          <div>
            <h3 className="font-bold text-neutral-950 text-base">Editor Konten CV</h3>
            <p className="text-xs text-neutral-500">Edit isi teks riwayat, kontak, dan keterampilan Anda</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 px-6 gap-2 bg-neutral-100/70 overflow-x-auto shrink-0 text-xs font-medium py-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profil & Kontak</span>
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'experience'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Pengalaman Kerja</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'education'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Pendidikan</span>
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'skills'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Keahlian</span>
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'achievements'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Pelatihan & Prestasi</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* TAB 1: PROFIL & KONTAK */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleTextChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-medium focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Gelar (Suffix)
                  </label>
                  <input
                    type="text"
                    value={formData.titleSuffix}
                    onChange={(e) => handleTextChange('titleSuffix', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-medium focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Tagline / Bidang Spesialisasi
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => handleTextChange('headline', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-medium focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Nomor WhatsApp / Telepon
                  </label>
                  <input
                    type="text"
                    value={formData.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Domisili / Kota
                  </label>
                  <input
                    type="text"
                    value={formData.contact.location}
                    onChange={(e) => handleContactChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    URL LinkedIn
                  </label>
                  <input
                    type="text"
                    value={formData.contact.linkedin}
                    onChange={(e) => handleContactChange('linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    URL Behance / Portofolio
                  </label>
                  <input
                    type="text"
                    value={formData.contact.behance}
                    onChange={(e) => handleContactChange('behance', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-neutral-800">
                    Profil Profesional (Deskripsi Diri)
                  </label>
                  <span className="text-[11px] text-neutral-500">
                    {formData.summary.length} karakter
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={formData.summary}
                  onChange={(e) => handleTextChange('summary', e.target.value)}
                  className="w-full p-3 border border-neutral-300 rounded-lg text-xs leading-relaxed focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PENGALAMAN KERJA & ORGANISASI */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950">
                  Daftar Pengalaman Kerja ({formData.workExperience.length})
                </h4>
                <button
                  onClick={addWorkExperience}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Posisi Baru
                </button>
              </div>

              <div className="space-y-5">
                {formData.workExperience.map((job, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-neutral-200 rounded-xl bg-neutral-50 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-500 font-mono">
                        #{idx + 1}
                      </span>
                      <button
                        onClick={() => removeWorkExperience(idx)}
                        className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1"
                        title="Hapus pengalaman ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Posisi / Jabatan
                        </label>
                        <input
                          type="text"
                          value={job.role}
                          onChange={(e) => handleWorkExpChange(idx, 'role', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Periode Waktu
                        </label>
                        <input
                          type="text"
                          value={job.period}
                          onChange={(e) => handleWorkExpChange(idx, 'period', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Perusahaan / Tempat Kerja
                        </label>
                        <input
                          type="text"
                          value={job.company}
                          onChange={(e) => handleWorkExpChange(idx, 'company', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Lokasi (Kota)
                        </label>
                        <input
                          type="text"
                          value={job.location || ''}
                          onChange={(e) => handleWorkExpChange(idx, 'location', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                        />
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[11px] font-semibold text-neutral-700">
                          Poin Tanggung Jawab & Capaian:
                        </label>
                        <button
                          onClick={() => addWorkBullet(idx)}
                          className="text-[11px] text-neutral-900 hover:underline font-medium flex items-center gap-0.5"
                        >
                          <Plus className="w-3 h-3" /> Tambah Poin
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {job.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-1.5">
                            <span className="text-neutral-400 mt-1.5">•</span>
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) =>
                                handleWorkBulletChange(idx, bIdx, e.target.value)
                              }
                              className="flex-1 p-2 bg-white border border-neutral-300 rounded text-xs leading-normal"
                            />
                            <button
                              onClick={() => removeWorkBullet(idx, bIdx)}
                              className="p-1 text-neutral-400 hover:text-red-600 mt-1"
                              title="Hapus poin"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sub-section: Organisasi */}
              <div className="border-t border-neutral-300 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950">
                    Pengalaman Organisasi & Kepemimpinan ({formData.organizationExperience.length})
                  </h4>
                  <button
                    onClick={addOrgExperience}
                    className="px-3 py-1.5 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 rounded-md text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Organisasi
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.organizationExperience.map((org, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 border border-neutral-200 rounded-lg bg-neutral-50 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={org.role}
                          onChange={(e) => handleOrgChange(idx, 'role', e.target.value)}
                          placeholder="Jabatan"
                          className="font-bold text-xs bg-white px-2 py-1 border border-neutral-300 rounded flex-1 mr-2"
                        />
                        <input
                          type="text"
                          value={org.period}
                          onChange={(e) => handleOrgChange(idx, 'period', e.target.value)}
                          placeholder="Tahun"
                          className="text-xs bg-white px-2 py-1 border border-neutral-300 rounded w-28 mr-2 text-right"
                        />
                        <button
                          onClick={() => removeOrgExperience(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={org.organization}
                        onChange={(e) => handleOrgChange(idx, 'organization', e.target.value)}
                        placeholder="Nama Organisasi"
                        className="text-xs bg-white px-2 py-1 border border-neutral-300 rounded w-full italic"
                      />

                      {org.bullets.map((b, bIdx) => (
                        <textarea
                          key={bIdx}
                          rows={2}
                          value={b}
                          onChange={(e) => handleOrgBulletChange(idx, bIdx, e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-neutral-300 rounded"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PENDIDIKAN */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950">
                  Riwayat Pendidikan ({formData.education.length})
                </h4>
                <button
                  onClick={addEducation}
                  className="px-3 py-1.5 bg-neutral-900 text-white rounded-md text-xs font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Pendidikan
                </button>
              </div>

              <div className="space-y-3">
                {formData.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 space-y-2.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-neutral-500">#{idx + 1}</span>
                      <button
                        onClick={() => removeEducation(idx)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Hapus
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Jenjang & Jurusan
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Periode / Kelulusan
                        </label>
                        <input
                          type="text"
                          value={edu.period}
                          onChange={(e) => handleEduChange(idx, 'period', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Institusi / Kampus / Sekolah
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleEduChange(idx, 'institution', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          IPK / Predikat (Opsional)
                        </label>
                        <input
                          type="text"
                          value={edu.honors || ''}
                          placeholder="misal: IPK 3,89/4,00 | Cum Laude"
                          onChange={(e) => handleEduChange(idx, 'honors', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: KEAHLIAN */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950">
                  Kelompok Keahlian ({formData.skills.length})
                </h4>
                <button
                  onClick={addSkillCategory}
                  className="px-3 py-1.5 bg-neutral-900 text-white rounded-md text-xs font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Kategori
                </button>
              </div>

              <div className="space-y-3">
                {formData.skills.map((skillGroup, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 border border-neutral-200 rounded-lg bg-neutral-50 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={skillGroup.category}
                        onChange={(e) => handleSkillChange(idx, 'category', e.target.value)}
                        placeholder="Nama Kategori (misal: Operasional & Retail)"
                        className="font-bold text-xs bg-white px-2.5 py-1.5 border border-neutral-300 rounded flex-1"
                      />
                      <button
                        onClick={() => removeSkillCategory(idx)}
                        className="text-red-500 hover:text-red-700 text-xs px-2 py-1"
                      >
                        Hapus
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={skillGroup.skills}
                      onChange={(e) => handleSkillChange(idx, 'skills', e.target.value)}
                      placeholder="Daftar keahlian dipisahkan koma..."
                      className="w-full text-xs p-2.5 bg-white border border-neutral-300 rounded leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PELATIHAN & PENCAPAIAN */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950">
                  Daftar Sertifikasi & Prestasi ({formData.trainingsAndAchievements.length})
                </h4>
                <button
                  onClick={addAchievement}
                  className="px-3 py-1.5 bg-neutral-900 text-white rounded-md text-xs font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Pelatihan
                </button>
              </div>

              <div className="space-y-2">
                {formData.trainingsAndAchievements.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 font-mono w-5">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleAchievementChange(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                    />
                    <button
                      onClick={() => removeAchievement(idx)}
                      className="text-neutral-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              if (window.confirm('Kembalikan semua data CV ke isi dokumen PDF asli?')) {
                onReset();
                onClose();
              }
            }}
            className="text-xs text-neutral-600 hover:text-red-600 font-medium flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ke Asli</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 border border-neutral-300 font-medium text-xs text-neutral-800 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleSaveAll}
              className="px-4 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
