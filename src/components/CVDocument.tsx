import React from 'react';
import { CVData } from '../data/cvData';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CVDocumentProps {
  data: CVData;
  fontStyle: 'sans' | 'serif' | 'hybrid';
  density: 'normal' | 'compact';
  showPhoto: boolean;
  photoStyle: 'color' | 'grayscale';
  headerAlign: 'left' | 'center';
  searchKeyword?: string;
  onOpenPhotoEditor?: () => void;
  onOpenContentEditor?: () => void;
}

export const CVDocument: React.FC<CVDocumentProps> = ({
  data,
  fontStyle,
  density,
  showPhoto,
  photoStyle,
  headerAlign,
  searchKeyword = '',
  onOpenPhotoEditor,
  onOpenContentEditor,
}) => {
  // Helper to highlight matching text
  const highlightText = (text: string) => {
    if (!searchKeyword.trim()) return text;
    const parts = text.split(new RegExp(`(${searchKeyword})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === searchKeyword.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded-none font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const fontClass =
    fontStyle === 'sans'
      ? 'font-sans-modern'
      : fontStyle === 'serif'
      ? 'font-serif-elegant'
      : 'font-tech-clean';

  const headingFontClass =
    fontStyle === 'hybrid'
      ? 'font-serif-elegant'
      : fontClass;

  const spacingClass =
    density === 'compact'
      ? {
          sectionGap: 'mb-4',
          itemGap: 'mb-2.5',
          bulletGap: 'space-y-0.5',
          textBase: 'text-[12.5px] leading-relaxed',
          headingSize: 'text-[13px]',
          titleSize: 'text-2xl',
        }
      : {
          sectionGap: 'mb-6',
          itemGap: 'mb-4',
          bulletGap: 'space-y-1',
          textBase: 'text-[13.5px] leading-relaxed',
          headingSize: 'text-[14px]',
          titleSize: 'text-[26px]',
        };

  const photo = data.photoSettings;
  const photoFilter =
    photoStyle === 'grayscale' || photo?.filter === 'grayscale'
      ? `brightness(${photo?.brightness ?? 100}%) contrast(${photo?.contrast ?? 100}%) grayscale(100%)`
      : photo?.filter === 'high-contrast'
      ? `brightness(${photo?.brightness ?? 100}%) contrast(${Math.max(photo?.contrast ?? 100, 130)}%) grayscale(100%)`
      : photo?.filter === 'warm'
      ? `brightness(${photo?.brightness ?? 100}%) contrast(${photo?.contrast ?? 100}%) sepia(35%)`
      : `brightness(${photo?.brightness ?? 100}%) contrast(${photo?.contrast ?? 100}%)`;

  const shapeClass =
    photo?.shape === 'circle'
      ? 'w-24 h-24 md:w-28 md:h-28 rounded-full'
      : photo?.shape === 'rounded'
      ? 'w-24 h-32 md:w-28 md:h-36 rounded-xl'
      : 'w-24 h-32 md:w-28 md:h-36 rounded-none';

  const borderClass =
    photo?.border === 'bold'
      ? 'border-2 border-neutral-900'
      : photo?.border === 'thin'
      ? 'border border-neutral-900'
      : 'border-none';

  return (
    <article
      id="cv-printable-document"
      className={`print-page-container mx-auto bg-white text-neutral-900 shadow-xl print:shadow-none border border-neutral-200 print:border-none p-8 md:p-12 print:p-0 max-w-[850px] w-full transition-all duration-200 ${fontClass}`}
      style={{ minHeight: '297mm' }}
    >
      {/* HEADER SECTION */}
      <header
        className={`border-b-2 border-neutral-900 pb-5 mb-5 ${
          headerAlign === 'center' ? 'text-center' : 'text-left'
        } ${showPhoto ? 'flex flex-col-reverse md:flex-row md:items-center justify-between gap-6' : ''}`}
      >
        <div className="flex-1">
          <div className="flex items-baseline gap-2 flex-wrap justify-start">
            <h1
              className={`${headingFontClass} ${spacingClass.titleSize} font-bold tracking-tight text-neutral-950 uppercase`}
            >
              {highlightText(data.name)}
            </h1>
            <span className="text-lg md:text-xl font-semibold text-neutral-800">
              , {data.titleSuffix}
            </span>
          </div>

          {/* Subtitle / Professional Title line */}
          <p className="text-xs uppercase tracking-widest text-neutral-600 font-medium mt-1">
            {highlightText(data.headline || 'Ekonomi Syariah · Operasional & Retail · Administrasi Perbankan · Desain Grafis')}
          </p>

          {/* Contact Details with ATS-safe semantic text and clickable links */}
          <div
            className={`mt-3 flex flex-wrap gap-y-1.5 gap-x-4 text-xs text-neutral-700 ${
              headerAlign === 'center' && !showPhoto ? 'justify-center' : 'justify-start'
            }`}
          >
            <a
              href={`tel:${data.contact.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-900 shrink-0 print:hidden" />
              <span>{highlightText(data.contact.phone)}</span>
            </a>

            <span className="text-neutral-300 print:text-neutral-400">|</span>

            <a
              href={`mailto:${data.contact.email}`}
              className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-900 shrink-0 print:hidden" />
              <span>{highlightText(data.contact.email)}</span>
            </a>

            <span className="text-neutral-300 print:text-neutral-400">|</span>

            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-900 shrink-0 print:hidden" />
              <span>{highlightText(data.contact.location)}</span>
            </span>

            <span className="text-neutral-300 print:text-neutral-400">|</span>

            <a
              href={`https://${data.contact.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-black underline decoration-neutral-300 hover:decoration-black transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-neutral-900 shrink-0 print:hidden" />
              <span>{highlightText(data.contact.linkedin)}</span>
            </a>

            <span className="text-neutral-300 print:text-neutral-400">|</span>

            <a
              href={`https://${data.contact.behance}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-black underline decoration-neutral-300 hover:decoration-black transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-900 shrink-0 print:hidden" />
              <span>{highlightText(data.contact.behance)}</span>
            </a>
          </div>
        </div>

        {/* Optional Profile Photo - ATS mode allows hiding or showing */}
        {showPhoto && (
          <div className="shrink-0 self-center md:self-auto flex flex-col items-center">
            <div
              onClick={onOpenPhotoEditor}
              className={`relative overflow-hidden bg-neutral-100 shadow-sm cursor-pointer group ${shapeClass} ${borderClass}`}
              title="Klik untuk membuka Editor Foto Profil"
            >
              <img
                src={photo?.url || '/profile_photo.jpg'}
                alt={data.name}
                referrerPolicy="no-referrer"
                style={{
                  transform: `translate(${photo?.offsetX ?? 0}%, ${photo?.offsetY ?? 0}%) scale(${photo?.zoom ?? 1}) rotate(${photo?.rotate ?? 0}deg)`,
                  filter: photoFilter,
                }}
                className="w-full h-full object-cover object-center select-none"
              />
              <div className="no-print absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-semibold text-center p-1">
                Edit Foto ✎
              </div>
            </div>
            <button
              onClick={onOpenPhotoEditor}
              className="no-print text-[10px] text-neutral-500 hover:text-black mt-1 font-mono underline decoration-neutral-300 hover:decoration-black cursor-pointer"
            >
              Ubah Foto
            </button>
          </div>
        )}
      </header>

      {/* 1. PROFIL PROFESIONAL */}
      <section className={`${spacingClass.sectionGap} break-inside-avoid`}>
        <div className="border-b border-neutral-900 pb-1 mb-2.5 flex items-center justify-between">
          <h2
            className={`${headingFontClass} ${spacingClass.headingSize} font-bold tracking-wider text-neutral-950 uppercase`}
          >
            PROFIL PROFESIONAL
          </h2>
          <span className="text-[10px] text-neutral-400 tracking-widest font-mono uppercase print:hidden">
            Ringkasan
          </span>
        </div>
        <p className={`${spacingClass.textBase} text-neutral-800 text-justify font-normal leading-relaxed`}>
          {highlightText(data.summary)}
        </p>
      </section>

      {/* 2. PENGALAMAN KERJA */}
      <section className={`${spacingClass.sectionGap}`}>
        <div className="border-b border-neutral-900 pb-1 mb-3 flex items-center justify-between">
          <h2
            className={`${headingFontClass} ${spacingClass.headingSize} font-bold tracking-wider text-neutral-950 uppercase`}
          >
            PENGALAMAN KERJA
          </h2>
          <span className="text-[10px] text-neutral-400 tracking-widest font-mono uppercase print:hidden">
            {data.workExperience.length} Posisi
          </span>
        </div>

        <div className="space-y-4">
          {data.workExperience.map((job, idx) => (
            <div key={idx} className={`break-inside-avoid ${spacingClass.itemGap}`}>
              {/* Job Header: Role & Period on first row, Company & Location on second row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-2">
                <div className="font-bold text-neutral-950 text-[14px]">
                  {highlightText(job.role)}
                </div>
                <div className="text-xs font-semibold text-neutral-700 tracking-wide sm:text-right shrink-0">
                  {highlightText(job.period)}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs text-neutral-700 mb-1.5 italic">
                <span className="font-medium text-neutral-800">
                  {highlightText(job.company)}
                </span>
                {job.location && (
                  <span className="text-neutral-600 not-italic sm:text-right">
                    {highlightText(job.location)}
                  </span>
                )}
              </div>

              {/* Bullet Points */}
              <ul className={`list-outside pl-4 list-disc text-neutral-800 ${spacingClass.textBase} ${spacingClass.bulletGap}`}>
                {job.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-justify pl-1">
                    {highlightText(bullet)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PENGALAMAN ORGANISASI & KEPEMIMPINAN */}
      <section className={`${spacingClass.sectionGap}`}>
        <div className="border-b border-neutral-900 pb-1 mb-3 flex items-center justify-between">
          <h2
            className={`${headingFontClass} ${spacingClass.headingSize} font-bold tracking-wider text-neutral-950 uppercase`}
          >
            PENGALAMAN ORGANISASI & KEPEMIMPINAN
          </h2>
        </div>

        <div className="space-y-3.5">
          {data.organizationExperience.map((org, idx) => (
            <div key={idx} className={`break-inside-avoid ${spacingClass.itemGap}`}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-2">
                <div className="font-bold text-neutral-950 text-[14px]">
                  {highlightText(org.role)}
                </div>
                <div className="text-xs font-semibold text-neutral-700 tracking-wide sm:text-right shrink-0">
                  {highlightText(org.period)}
                </div>
              </div>

              <div className="text-xs font-medium text-neutral-700 mb-1.5 italic">
                {highlightText(org.organization)}
              </div>

              <ul className={`list-outside pl-4 list-disc text-neutral-800 ${spacingClass.textBase} ${spacingClass.bulletGap}`}>
                {org.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-justify pl-1">
                    {highlightText(bullet)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PENGALAMAN BISNIS & PENGAJARAN */}
      <section className={`${spacingClass.sectionGap}`}>
        <div className="border-b border-neutral-900 pb-1 mb-3 flex items-center justify-between">
          <h2
            className={`${headingFontClass} ${spacingClass.headingSize} font-bold tracking-wider text-neutral-950 uppercase`}
          >
            PENGALAMAN BISNIS & PENGAJARAN
          </h2>
        </div>

        <div className="space-y-3.5">
          {data.businessTeachingExperience.map((item, idx) => (
            <div key={idx} className={`break-inside-avoid ${spacingClass.itemGap}`}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-2">
                <div className="font-bold text-neutral-950 text-[14px]">
                  {highlightText(item.role)}
                </div>
                <div className="text-xs font-semibold text-neutral-700 tracking-wide sm:text-right shrink-0">
                  {highlightText(item.period)}
                </div>
              </div>

              <div className="text-xs font-medium text-neutral-700 mb-1.5 italic">
                {highlightText(item.entity)}
              </div>

              <ul className={`list-outside pl-4 list-disc text-neutral-800 ${spacingClass.textBase} ${spacingClass.bulletGap}`}>
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-justify pl-1">
                    {highlightText(bullet)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PENDIDIKAN */}
      <section className={`${spacingClass.sectionGap} break-inside-avoid`}>
        <div className="border-b border-neutral-900 pb-1 mb-3 flex items-center justify-between">
          <h2
            className={`${headingFontClass} ${spacingClass.headingSize} font-bold tracking-wider text-neutral-950 uppercase`}
          >
            PENDIDIKAN
          </h2>
        </div>

        <div className="space-y-2.5">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-2">
                <div className="text-[13.5px] text-neutral-950">
                  <span className="font-bold">{highlightText(edu.degree)}</span>
                  <span className="mx-1.5 text-neutral-400">|</span>
                  <span className="font-medium text-neutral-800">{highlightText(edu.institution)}</span>
                  {edu.honors && (
                    <>
                      <span className="mx-1.5 text-neutral-400">|</span>
                      <span className="text-neutral-700 font-semibold">{highlightText(edu.honors)}</span>
                    </>
                  )}
                </div>
                <div className="text-xs font-semibold text-neutral-700 tracking-wide sm:text-right shrink-0">
                  {highlightText(edu.period)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. KEAHLIAN */}
      <section className={`${spacingClass.sectionGap} break-inside-avoid`}>
        <div className="border-b border-neutral-900 pb-1 mb-3 flex items-center justify-between">
          <h2
            className={`${headingFontClass} ${spacingClass.headingSize} font-bold tracking-wider text-neutral-950 uppercase`}
          >
            KEAHLIAN
          </h2>
        </div>

        <div className="space-y-1.5">
          {data.skills.map((skillGroup, idx) => (
            <div key={idx} className={`${spacingClass.textBase} text-neutral-800 flex flex-col sm:flex-row gap-x-2`}>
              <span className="font-bold text-neutral-950 min-w-[170px] shrink-0">
                {highlightText(skillGroup.category)}:
              </span>
              <span className="text-neutral-800">{highlightText(skillGroup.skills)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PELATIHAN & PENCAPAIAN */}
      <section className={`${spacingClass.sectionGap} break-inside-avoid`}>
        <div className="border-b border-neutral-900 pb-1 mb-3 flex items-center justify-between">
          <h2
            className={`${headingFontClass} ${spacingClass.headingSize} font-bold tracking-wider text-neutral-950 uppercase`}
          >
            PELATIHAN & PENCAPAIAN
          </h2>
        </div>

        <ul className={`list-outside pl-4 list-disc text-neutral-800 ${spacingClass.textBase} ${spacingClass.bulletGap}`}>
          {data.trainingsAndAchievements.map((item, idx) => (
            <li key={idx} className="pl-1">
              {highlightText(item)}
            </li>
          ))}
        </ul>
      </section>

      {/* FOOTER (Print-friendly page indicator) */}
      <footer className="mt-8 pt-4 border-t border-neutral-200 text-center text-[10px] text-neutral-400 font-mono flex items-center justify-between">
        <span>CURRICULUM VITAE · MUHAMMAD IKHSAN RAIHAN FADILAH, S.E.</span>
        <span>ATS COMPLIANT · FORMAT RESMI</span>
      </footer>
    </article>
  );
};
