export interface WorkExperience {
  role: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
}

export interface OrganizationExperience {
  role: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface BusinessTeachingExperience {
  role: string;
  entity: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  honors?: string;
}

export interface SkillCategory {
  category: string;
  skills: string;
}

export interface PhotoSettings {
  url: string;
  zoom: number; // 0.5 to 2.5
  offsetX: number; // -50 to 50
  offsetY: number; // -50 to 50
  rotate: number; // 0, 90, 180, 270
  filter: 'color' | 'grayscale' | 'high-contrast' | 'warm';
  brightness: number; // 70 to 130
  contrast: number; // 70 to 130
  shape: 'rect' | 'rounded' | 'circle';
  border: 'none' | 'thin' | 'bold';
}

export interface CVData {
  name: string;
  titleSuffix: string;
  headline: string;
  contact: {
    phone: string;
    email: string;
    location: string;
    linkedin: string;
    behance: string;
  };
  photoSettings: PhotoSettings;
  summary: string;
  workExperience: WorkExperience[];
  organizationExperience: OrganizationExperience[];
  businessTeachingExperience: BusinessTeachingExperience[];
  education: EducationItem[];
  skills: SkillCategory[];
  trainingsAndAchievements: string[];
}

export const defaultPhotoSettings: PhotoSettings = {
  url: "/profile_photo.jpg",
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  rotate: 0,
  filter: "color",
  brightness: 100,
  contrast: 100,
  shape: "rect",
  border: "thin",
};

export const defaultCvData: CVData = {
  name: "MUHAMMAD IKHSAN RAIHAN FADILAH",
  titleSuffix: "S.E.",
  headline: "Ekonomi Syariah · Operasional & Retail · Administrasi Perbankan · Desain Grafis",
  contact: {
    phone: "085695005374",
    email: "mirfikhsan@gmail.com",
    location: "Bekasi",
    linkedin: "linkedin.com/in/mirfikhsan",
    behance: "behance.net/mirfikhsan1",
  },
  photoSettings: defaultPhotoSettings,
  summary:
    "Lulusan S1 Ekonomi Syariah Universitas PTIQ Jakarta (IPK 3,89/4,00, Cum Laude) dengan pengalaman di bidang operasional retail, pelayanan pelanggan, administrasi perbankan, pengelolaan dokumen, transaksi, serta dukungan pemasaran. Memiliki pengalaman tambahan dalam koordinasi organisasi, pengelolaan acara, desain grafis, dan pengembangan konten digital. Terbiasa bekerja secara teliti, mengikuti prosedur, berkomunikasi dengan berbagai pihak, serta mempelajari sistem dan tanggung jawab baru.",
  workExperience: [
    {
      role: "Shopkeeper",
      company: "CITITEX Pamulang",
      location: "Tangerang Selatan",
      period: "Mei 2026 – Okt 2026",
      bullets: [
        "Melayani rata-rata 10–25 pelanggan per shift, membantu pemilihan produk, menjawab pertanyaan, dan menangani keluhan.",
        "Memproses permintaan custom sablon dengan menyiapkan file pelanggan serta memeriksa ukuran, jenis sablon, pilihan kaos, dan kesesuaian desain.",
        "Menangani sekitar 10–25 transaksi penjualan per hari serta membantu proses pembayaran dan settlement transaksi QR dan debit saat closing.",
        "Memeriksa stok harian dan mencocokkan ketersediaan fisik dengan sistem untuk sekitar 17 artikel produk dengan variasi warna.",
      ],
    },
    {
      role: "Student Intern",
      company: "Bank Syariah Indonesia (BSI) KCP Jakarta Fatmawati 2",
      location: "Jakarta Selatan",
      period: "Jul 2024 – Agu 2024",
      bullets: [
        "Mendukung administrasi Customer Service, termasuk pengelolaan data nasabah, rekap pembukaan rekening, pembaruan informasi, dan konfirmasi melalui telepon kantor.",
        "Membantu aktivasi layanan mobile banking bagi nasabah baru serta mendukung pelayanan dan operasional frontliner.",
        "Mendukung pekerjaan back office dengan menghitung nisbah Mudharabah, menginput data, merekap mutasi harian, dan mengarsipkan dokumen untuk kebutuhan audit.",
        "Memeriksa kelengkapan dokumen pembiayaan KUR serta membantu penyusunan surat resmi, permohonan, proposal sponsorship, dan pengiriman dokumen melalui email.",
        "Mendukung kegiatan pemasaran produk, open table, acara/webinar, serta pembuatan flyer, brosur, dan materi visual.",
        "Mendapat penilaian kinerja magang 'sangat baik' dari Branch Office Service Manager.",
      ],
    },
    {
      role: "Freelance Graphic Designer",
      company: "Proyek independen / UMKM",
      period: "2022 – Sekarang",
      bullets: [
        "Mengerjakan kebutuhan desain untuk klien dan UMKM, termasuk branding, desain kemasan, stiker, materi promosi, dan konten digital.",
        "Menggali kebutuhan klien dan menyiapkan materi visual sesuai tujuan komunikasi dan target audiens.",
      ],
    },
    {
      role: "Graphic Design Intern",
      company: "Global Edulink Centre & German Edu Centre",
      period: "2024",
      bullets: [
        "Membuat materi visual untuk media sosial dan kebutuhan promosi, termasuk thumbnail YouTube, posting Instagram, spanduk, kaos, brosur, dan materi cetak lainnya.",
        "Membantu menyusun jadwal publikasi konten dan bekerja dalam sistem hybrid (WFH/WFO).",
      ],
    },
    {
      role: "Private Computer & Microsoft Office Tutor",
      company: "Yayasan Al Asmuriyah",
      location: "Kemang, Jakarta Selatan",
      period: "2024",
      bullets: [
        "Mengajarkan dasar penggunaan komputer serta Microsoft Word, PowerPoint, dan Excel melalui penjelasan teori dan praktik.",
        "Membantu peserta memahami materi dan menyelesaikan tugas terkait komputer dan aplikasi perkantoran.",
      ],
    },
  ],
  organizationExperience: [
    {
      role: "Koordinator Divisi Komunikasi dan Informasi",
      organization: "Himpunan Mahasiswa Ekonomi Syariah (HMJ-ESY), Universitas PTIQ Jakarta",
      period: "2023 – 2024",
      bullets: [
        "Merencanakan dan menjalankan komunikasi internal-eksternal, mengelola media informasi organisasi, serta memastikan penyampaian informasi kepada anggota dan pemangku kepentingan.",
      ],
    },
    {
      role: "Koordinator Publikasi, Dokumentasi, dan Dekorasi",
      organization: "Festival Ekonomi Syariah (FES) 2024",
      period: "Jan 2024",
      bullets: [
        "Memimpin produksi materi publikasi acara, mengoordinasikan konsep dan pelaksanaan dekorasi, serta memastikan dokumentasi rangkaian kegiatan.",
      ],
    },
    {
      role: "Staf Pengembangan Media Sosial",
      organization: "OSDAZ, HIMA EKSYAR, dan KOMPPAQ",
      period: "2022 – 2024",
      bullets: [
        "Melakukan riset dan benchmarking media sosial, membuat konten, menyiapkan kebutuhan desain digital/cetak, dan mempelajari waktu publikasi untuk mendukung engagement.",
      ],
    },
  ],
  businessTeachingExperience: [
    {
      role: "Reseller Keripik Kaca",
      entity: "Wirausaha mandiri",
      period: "2021 – 2022",
      bullets: [
        "Mempromosikan produk dan menyusun strategi pemasaran; berhasil menjual 600 pcs produk.",
      ],
    },
    {
      role: "Asisten Guru",
      entity: "PPTQ At-Taqwa & PPTQ Athohiriyah",
      period: "2019 – 2021",
      bullets: [
        "Membantu kegiatan belajar, menyampaikan informasi antara guru dan siswa, serta mendukung kegiatan kelas saat guru berhalangan.",
      ],
    },
    {
      role: "Staf Bendahara Santri",
      entity: "PPTQ At-Taqwa",
      period: "2019 – 2021",
      bullets: [
        "Mencatat dan melaporkan kas santri serta membantu pengelolaan arus kas untuk kebutuhan kegiatan.",
      ],
    },
  ],
  education: [
    {
      degree: "S1 Ekonomi Syariah",
      institution: "Universitas PTIQ Jakarta",
      period: "2021 – 2025",
      honors: "IPK 3,89/4,00 | Cum Laude",
    },
    {
      degree: "Otomatisasi dan Tata Kelola Perkantoran (OTKP)",
      institution: "SMK Pandu 2 Ciampea, Bogor",
      period: "Lulus 2021",
    },
  ],
  skills: [
    {
      category: "Operasional & Retail",
      skills:
        "Pelayanan pelanggan, pemrosesan pesanan, pengecekan stok, cash handling, settlement QR/debit, sistem kasir/POS.",
    },
    {
      category: "Administrasi & Keuangan",
      skills:
        "Microsoft Office, pengarsipan dokumen, input dan verifikasi data, penyusunan surat, pembukuan dan akuntansi dasar.",
    },
    {
      category: "Digital & Kreatif",
      skills:
        "Graphic design, content creation, branding, social media management, Adobe Photoshop, Adobe Illustrator, CorelDRAW, Canva.",
    },
    {
      category: "Analisis & Kolaborasi",
      skills:
        "Analytical thinking, problem solving, komunikasi, active listening, teamwork, koordinasi, attention to detail, time management.",
    },
  ],
  trainingsAndAchievements: [
    "Online Course Admin, Program Profesi Pintarnya Siap Kerja (2025)",
    "Online Course Customer Service, Program Profesi Pintarnya Siap Kerja (2025)",
    "Pelatihan Audit Lanjutan, Bina Muda Inspira Training Center & Research (2024)",
    "Training IELTS, Specta Edu (2023)",
    "Private Arabic Course, Markaz Arabiyyah Kediri (2023)",
    "Menjual 600 pcs produk sebagai reseller keripik kaca (2021–2022).",
    "Juara 2 Lomba Desain Poster, Tarbiyah Special Event, Universitas PTIQ Jakarta (2023).",
    "Juara 2 MTQ Festival Metode Ummi Tingkat Provinsi Jawa Barat (2017).",
  ],
};

export const cvData = defaultCvData;
