// ============================================================
// KARYANUSA — Centralized Data
// Import dari file ini ke semua komponen yang butuh data
// ============================================================

// ─── TYPES ──────────────────────────────────────────────────
export type SkillName =
  | "Programming"
  | "Desain Grafis"
  | "Fotografi"
  | "Menulis"
  | "Marketing"
  | "Public Speaking"

export type Question = {
  id: number
  question: string
  options: { label: string; skills: string[]; points: number }[]
}

export type Opportunity = {
  title: string
  desc: string
  income: string
  icon: string
  type: string
  color: string
  steps: string[]
}

export type RoadmapPhase = {
  id: number
  phase: string
  title: string
  desc: string
  icon: string
  duration: string
  tasks: string[]
}

export type Badge = {
  id: number
  icon: string
  name: string
  desc: string
  phase: number
  color: string
}

export type CommunityPost = {
  name: string
  skill: string
  avatar: string
  text: string
  time: string
  likes: number
  badge: string
  color: string
  bg: string
}

// ─── SKILL METADATA ─────────────────────────────────────────
export const skillColors: Record<string, { bg: string; border: string; color: string; icon: string }> = {
  "Desain Grafis":   { bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.2)",  color: "#6366F1", icon: "🎨" },
  "Programming":     { bg: "rgba(31,122,99,0.08)",   border: "rgba(31,122,99,0.2)",   color: "#1F7A63", icon: "💻" },
  "Fotografi":       { bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)",  color: "#D97706", icon: "📷" },
  "Menulis":         { bg: "rgba(236,72,153,0.08)",  border: "rgba(236,72,153,0.2)",  color: "#DB2777", icon: "✍️"  },
  "Marketing":       { bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)",   color: "#DC2626", icon: "📣" },
  "Public Speaking": { bg: "rgba(201,168,76,0.08)",  border: "rgba(201,168,76,0.2)",  color: "#B8942A", icon: "🎤" },
}

export const skillIcons: Record<string, string> = {
  "Programming":     "💻",
  "Desain Grafis":   "🎨",
  "Fotografi":       "📷",
  "Menulis":         "✍️",
  "Marketing":       "📣",
  "Public Speaking": "🎤",
}

export const allSkills: SkillName[] = [
  "Programming",
  "Desain Grafis",
  "Fotografi",
  "Menulis",
  "Marketing",
  "Public Speaking",
]

// ─── QUESTIONS (Psikometrik) ─────────────────────────────────
export const questions: Question[] = [
  {
    id: 1,
    question: "Ketika kamu punya waktu bebas tanpa deadline, kamu paling sering berakhir melakukan apa?",
    options: [
      { label: "Mengatur atau merapikan sesuatu sampai tampilannya memuaskan secara estetika", skills: ["Desain Grafis"], points: 3 },
      { label: "Mencoba memahami cara kerja sesuatu lalu mencoba membuatnya sendiri", skills: ["Programming"], points: 3 },
      { label: "Memperhatikan detail di sekitar dan menemukan sudut pandang yang menarik", skills: ["Fotografi"], points: 3 },
      { label: "Merefleksikan pengalaman atau menyusun pikiran menjadi tulisan", skills: ["Menulis"], points: 3 },
    ],
  },
  {
    id: 2,
    question: "Ketika kamu melihat sesuatu yang menarik perhatianmu, reaksi pertamamu adalah...",
    options: [
      { label: "Menganalisis komposisi, warna, dan elemen visualnya", skills: ["Desain Grafis", "Fotografi"], points: 2 },
      { label: "Memikirkan bagaimana cara mereplikasinya secara teknis atau otomatis", skills: ["Programming"], points: 3 },
      { label: "Ingin segera mendokumentasikan atau mengabadikannya", skills: ["Fotografi"], points: 3 },
      { label: "Merasa ingin menceritakannya kepada orang lain", skills: ["Menulis", "Public Speaking"], points: 2 },
    ],
  },
  {
    id: 3,
    question: "Saat mengerjakan sesuatu sendirian, kamu paling termotivasi ketika...",
    options: [
      { label: "Ada masalah logis yang harus dipecahkan dengan cara yang efisien", skills: ["Programming"], points: 3 },
      { label: "Hasilnya bisa dilihat dan dinikmati secara visual oleh orang lain", skills: ["Desain Grafis", "Fotografi"], points: 2 },
      { label: "Kamu bisa mengekspresikan perspektif atau sudut pandang unikmu", skills: ["Menulis", "Fotografi"], points: 2 },
      { label: "Kamu tahu hasilnya akan mempengaruhi keputusan atau tindakan orang lain", skills: ["Marketing", "Public Speaking"], points: 3 },
    ],
  },
  {
    id: 4,
    question: "Ketika bergabung dalam kelompok diskusi, orang-orang biasanya mengandalkan kamu untuk...",
    options: [
      { label: "Memberikan solusi praktis dan terstruktur terhadap hambatan teknis", skills: ["Programming"], points: 3 },
      { label: "Membuat presentasi atau materi visual yang mudah dipahami", skills: ["Desain Grafis"], points: 3 },
      { label: "Merangkum dan menyampaikan inti diskusi dengan bahasa yang tepat", skills: ["Menulis", "Public Speaking"], points: 2 },
      { label: "Membaca dinamika kelompok dan menyesuaikan pesan agar diterima dengan baik", skills: ["Marketing", "Public Speaking"], points: 2 },
    ],
  },
  {
    id: 5,
    question: "Jika kamu harus menjelaskan ide kompleks kepada orang awam, caramu adalah...",
    options: [
      { label: "Membuat diagram, skema, atau visualisasi yang memperjelas alur", skills: ["Desain Grafis", "Programming"], points: 2 },
      { label: "Menuliskan penjelasan bertahap yang terstruktur dan mudah diikuti", skills: ["Menulis"], points: 3 },
      { label: "Menggunakan contoh visual atau foto nyata sebagai ilustrasi", skills: ["Fotografi"], points: 3 },
      { label: "Langsung menyampaikannya secara lisan dengan analogi dan cerita", skills: ["Public Speaking", "Marketing"], points: 2 },
    ],
  },
  {
    id: 6,
    question: "Ketika suatu proyek berhasil melampaui ekspektasi, bagian mana yang paling membuat kamu puas?",
    options: [
      { label: "Sistem atau proses yang dibangun berjalan sempurna tanpa hambatan", skills: ["Programming"], points: 3 },
      { label: "Tampilan akhirnya terlihat jauh lebih baik dari yang dibayangkan sebelumnya", skills: ["Desain Grafis", "Fotografi"], points: 2 },
      { label: "Pesan yang ingin disampaikan benar-benar sampai ke audiens yang tepat", skills: ["Menulis", "Marketing"], points: 2 },
      { label: "Audiens merespons dengan antusias saat kamu mempresentasikannya", skills: ["Public Speaking", "Marketing"], points: 3 },
    ],
  },
  {
    id: 7,
    question: "Saat belajar hal baru, kamu cenderung lebih cepat memahami jika...",
    options: [
      { label: "Langsung mencoba dan bereksperimen sendiri, trial and error", skills: ["Programming", "Fotografi"], points: 2 },
      { label: "Melihat contoh visual atau referensi yang bisa dijadikan panduan", skills: ["Desain Grafis", "Fotografi"], points: 2 },
      { label: "Membaca penjelasan mendalam sampai benar-benar paham konsepnya", skills: ["Menulis", "Programming"], points: 2 },
      { label: "Mendengar seseorang menjelaskan langsung dan bisa langsung bertanya", skills: ["Public Speaking", "Marketing"], points: 3 },
    ],
  },
  {
    id: 8,
    question: "Ketika kamu melihat sebuah produk atau layanan yang menurutmu kurang baik, instingmu adalah...",
    options: [
      { label: "Memikirkan cara memperbaiki sistem atau mekanisme di baliknya", skills: ["Programming"], points: 3 },
      { label: "Melihat bagaimana tampilan atau pengalaman penggunanya bisa dioptimalkan", skills: ["Desain Grafis"], points: 3 },
      { label: "Menulis ulasan atau catatan kritis yang membangun tentang kekurangannya", skills: ["Menulis"], points: 3 },
      { label: "Memikirkan bagaimana cara mengomunikasikannya agar lebih menarik audiens", skills: ["Marketing", "Public Speaking"], points: 2 },
    ],
  },
  {
    id: 9,
    question: "Dalam situasi yang penuh tekanan, kamu biasanya menjaga fokus dengan cara...",
    options: [
      { label: "Memecah masalah besar menjadi langkah-langkah kecil yang bisa dikerjakan satu per satu", skills: ["Programming", "Menulis"], points: 2 },
      { label: "Menciptakan ketertiban visual — merapikan ruang atau menyusun ulang elemen pekerjaan", skills: ["Desain Grafis"], points: 3 },
      { label: "Mengambil jarak sebentar, lalu kembali dengan sudut pandang segar", skills: ["Fotografi", "Menulis"], points: 2 },
      { label: "Berbicara dengan orang lain untuk memvalidasi pendekatan yang akan diambil", skills: ["Public Speaking", "Marketing"], points: 3 },
    ],
  },
  {
    id: 10,
    question: "Jika diminta menggambarkan dirimu dalam satu kalimat, kamu kemungkinan besar berkata...",
    options: [
      { label: "Saya orang yang suka membangun solusi dari nol dengan logika yang terstruktur", skills: ["Programming"], points: 3 },
      { label: "Saya peka terhadap estetika dan selalu ingin membuat sesuatu terlihat lebih baik", skills: ["Desain Grafis", "Fotografi"], points: 2 },
      { label: "Saya berpikir lebih baik saat menulis dan suka mengekspresikan diri lewat kata-kata", skills: ["Menulis"], points: 3 },
      { label: "Saya mudah terhubung dengan orang dan senang memengaruhi atau menginspirasi mereka", skills: ["Public Speaking", "Marketing"], points: 3 },
    ],
  },
]

// ─── DETECT SKILL FUNCTION ───────────────────────────────────
export function detectSkill(answers: number[]): {
  skill: string
  score: number
  allScores: Record<string, number>
} {
  const scores: Record<string, number> = {
    "Desain Grafis": 0, "Programming": 0, "Fotografi": 0,
    "Menulis": 0, "Marketing": 0, "Public Speaking": 0,
  }
  answers.forEach((optIdx, qIdx) => {
    const opt = questions[qIdx]?.options[optIdx]
    if (opt) opt.skills.forEach(skill => { scores[skill] = (scores[skill] || 0) + opt.points })
  })
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
  const maxPossible = 30
  const score = Math.min(Math.round((top[1] / maxPossible) * 100), 98)
  return { skill: top[0], score, allScores: scores }
}

// ─── OPPORTUNITY MAP ─────────────────────────────────────────
export const opportunityMap: Record<string, Opportunity[]> = {
  "Programming": [
    { title: "Freelance Web Developer", desc: "Bangun website untuk bisnis lokal, startup, atau klien internasional via platform freelance.", income: "Rp 3–15 jt/proyek", icon: "💻", type: "High Income", color: "#1F7A63", steps: ["Buat portofolio GitHub", "Daftar Upwork/Fiverr", "Ambil proyek pertama"] },
    { title: "Website Template Marketplace", desc: "Jual template website di ThemeForest atau Gumroad dan hasilkan pendapatan pasif.", income: "Rp 1–5 jt/bulan", icon: "🛒", type: "Passive Income", color: "#C9A84C", steps: ["Buat 3 template premium", "Upload ke ThemeForest", "Promosi di sosmed"] },
    { title: "Startup Technical Co-Founder", desc: "Bergabung dengan startup sebagai co-founder teknis dan dapatkan equity bernilai tinggi.", income: "Equity + Salary", icon: "🚀", type: "High Potential", color: "#7C3AED", steps: ["Ikuti komunitas startup", "Cari co-founder bisnis", "Bangun MVP bersama"] },
  ],
  "Desain Grafis": [
    { title: "Freelance Brand Designer", desc: "Buat logo, identitas merek, dan materi pemasaran untuk bisnis lokal maupun internasional.", income: "Rp 2–10 jt/proyek", icon: "🎨", type: "High Income", color: "#1F7A63", steps: ["Buat portofolio Behance", "Daftar 99designs", "Tawarkan ke UMKM lokal"] },
    { title: "Jual Aset Digital", desc: "Jual template desain, preset, dan ilustrasi di marketplace seperti Creative Market.", income: "Rp 500rb–3 jt/bulan", icon: "🖼️", type: "Passive Income", color: "#C9A84C", steps: ["Buat 10 aset berkualitas", "Upload ke Creative Market", "Promosi di Pinterest"] },
    { title: "Social Media Designer", desc: "Kelola konten visual untuk brand dan bisnis di Instagram, TikTok, dan LinkedIn.", income: "Rp 1–4 jt/klien/bln", icon: "📱", type: "High Potential", color: "#7C3AED", steps: ["Buat paket desain", "Tawarkan ke UKM", "Gunakan Canva Pro"] },
  ],
  "Fotografi": [
    { title: "Fotografer Produk & Event", desc: "Layani foto produk UMKM, pernikahan, dan event korporat di kotamu.", income: "Rp 1–8 jt/sesi", icon: "📷", type: "High Income", color: "#1F7A63", steps: ["Bangun portofolio", "Bergabung komunitas wedding", "Promosi via Instagram"] },
    { title: "Jual Foto di Stock Platform", desc: "Upload foto berkualitas tinggi ke Shutterstock, Getty, dan Adobe Stock.", income: "Rp 300rb–2 jt/bulan", icon: "🖼️", type: "Passive Income", color: "#C9A84C", steps: ["Pilih niche foto", "Daftar Shutterstock", "Upload 50+ foto konsisten"] },
    { title: "Kursus Fotografi Online", desc: "Bagikan ilmu fotografi lewat kelas online di Udemy atau platform lokal.", income: "Rp 2–10 jt/bulan", icon: "🎓", type: "High Potential", color: "#7C3AED", steps: ["Rekam 10 video tutorial", "Upload ke Udemy", "Promosi di komunitas foto"] },
  ],
  "Menulis": [
    { title: "Content Writer & Copywriter", desc: "Tulis artikel SEO, copywriting iklan, dan konten blog untuk bisnis online.", income: "Rp 50–300rb/artikel", icon: "✍️", type: "High Income", color: "#1F7A63", steps: ["Buat portofolio tulisan", "Daftar Projects.co.id", "Tawarkan ke startup"] },
    { title: "Self-Publishing E-Book", desc: "Tulis dan jual e-book di Amazon Kindle, Gumroad, atau platform lokal.", income: "Rp 500rb–5 jt/bulan", icon: "📚", type: "Passive Income", color: "#C9A84C", steps: ["Pilih topik niche", "Tulis 50–80 halaman", "Publish di Amazon KDP"] },
    { title: "Ghost Writer", desc: "Tulis konten, buku, atau artikel untuk klien yang membutuhkan penulis profesional.", income: "Rp 2–20 jt/proyek", icon: "👻", type: "High Potential", color: "#7C3AED", steps: ["Buat profil LinkedIn", "Tawarkan di Fiverr", "Cari klien via networking"] },
  ],
  "Marketing": [
    { title: "Digital Marketing Freelance", desc: "Kelola iklan Google, Meta Ads, dan strategi digital marketing untuk bisnis.", income: "Rp 2–10 jt/klien/bln", icon: "📣", type: "High Income", color: "#1F7A63", steps: ["Pelajari Meta Ads", "Ambil sertifikasi Google", "Cari klien UMKM"] },
    { title: "Affiliate Marketing", desc: "Promosikan produk orang lain dan dapatkan komisi dari setiap penjualan.", income: "Rp 500rb–5 jt/bulan", icon: "🤝", type: "Passive Income", color: "#C9A84C", steps: ["Daftar program affiliate", "Buat konten review", "Optimalkan SEO"] },
    { title: "Social Media Manager", desc: "Kelola akun sosial media brand dan bantu mereka tumbuh secara organik.", income: "Rp 1–5 jt/klien/bln", icon: "📊", type: "High Potential", color: "#7C3AED", steps: ["Buat paket layanan", "Tawarkan ke brand lokal", "Gunakan tools analytics"] },
  ],
  "Public Speaking": [
    { title: "Trainer & Motivator", desc: "Isi seminar, workshop, dan pelatihan korporat sebagai pembicara profesional.", income: "Rp 2–15 jt/sesi", icon: "🎤", type: "High Income", color: "#1F7A63", steps: ["Pilih niche topik", "Mulai dari komunitas kecil", "Bangun personal branding"] },
    { title: "Kursus Online", desc: "Rekam kelas online dan jual ke ribuan pelajar di seluruh Indonesia.", income: "Rp 1–8 jt/bulan", icon: "🎓", type: "Passive Income", color: "#C9A84C", steps: ["Rekam materi kelas", "Upload ke Udemy/Skillshare", "Promosi di LinkedIn"] },
    { title: "MC & Moderator Profesional", desc: "Pimpin acara pernikahan, seminar, dan event korporat sebagai MC profesional.", income: "Rp 1–10 jt/acara", icon: "🎙️", type: "High Potential", color: "#7C3AED", steps: ["Bergabung komunitas MC", "Mulai dari acara kecil", "Buat reel portfolio"] },
  ],
}

// ─── ROADMAP DATA ─────────────────────────────────────────────
export const roadmapData: Record<string, RoadmapPhase[]> = {
  "Programming": [
    { id: 1, phase: "Fase 1", title: "Bangun Fondasi", desc: "Siapkan semua yang dibutuhkan sebelum mulai mencari klien.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Buat akun GitHub dan upload 3 project terbaik", "Setup profil LinkedIn yang profesional", "Pilih spesialisasi (web, mobile, atau backend)", "Pelajari dasar-dasar freelancing online"] },
    { id: 2, phase: "Fase 2", title: "Buat Portofolio", desc: "Portofolio adalah senjata utama untuk menarik klien pertama.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Bangun 2–3 project demo yang relevan dengan target klien", "Deploy semua project ke Vercel/Netlify", "Tulis README yang jelas di setiap project", "Buat website portofolio sederhana"] },
    { id: 3, phase: "Fase 3", title: "Cari Klien Pertama", desc: "Mulai aktif menawarkan jasa dan bangun reputasi awal.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Daftar di Upwork dan Fiverr, lengkapi profil 100%", "Kirim 5–10 proposal per hari dengan personalisasi", "Tawarkan harga kompetitif untuk 2–3 proyek pertama", "Minta testimoni dari setiap klien yang puas"] },
    { id: 4, phase: "Fase 4", title: "Skalakan Penghasilan", desc: "Optimalkan rate dan bangun aliran klien yang konsisten.", icon: "📈", duration: "Bulan 3–6", tasks: ["Naikkan rate setelah 5+ review positif", "Spesialisasikan layanan untuk niche tertentu", "Bangun jaringan via komunitas developer lokal", "Pertimbangkan membuka agency kecil"] },
  ],
  "Desain Grafis": [
    { id: 1, phase: "Fase 1", title: "Kuasai Tools", desc: "Pastikan skill teknis sudah solid sebelum mencari klien.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Kuasai minimal 1 tool utama (Figma/Adobe Illustrator)", "Pelajari prinsip desain: tipografi, warna, layout", "Ikuti 1 kursus desain gratis di YouTube", "Kumpulkan inspirasi di Pinterest/Behance"] },
    { id: 2, phase: "Fase 2", title: "Bangun Portofolio", desc: "Buat karya yang menunjukkan kemampuan terbaikmu.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Buat 5–8 karya terbaik (logo, poster, UI mockup)", "Upload ke Behance dan Dribbble", "Buat case study singkat untuk setiap karya", "Minta feedback dari komunitas desainer"] },
    { id: 3, phase: "Fase 3", title: "Klien Pertama", desc: "Mulai monetisasi skill dengan klien nyata.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Tawarkan jasa ke UMKM di sekitarmu", "Daftar di 99designs dan Sribulancer", "Buat paket harga yang jelas", "Promosi di Instagram dengan konten behind-the-scenes"] },
    { id: 4, phase: "Fase 4", title: "Passive & Skalabel", desc: "Buat aset digital yang menghasilkan pendapatan pasif.", icon: "📈", duration: "Bulan 3–6", tasks: ["Jual template di Creative Market atau Envato", "Buat Canva template dan jual di Etsy", "Buka kelas online di Skill Academy atau Udemy", "Bangun personal brand sebagai desainer spesialis"] },
  ],
  "Fotografi": [
    { id: 1, phase: "Fase 1", title: "Kuasai Teknik Dasar", desc: "Perkuat kemampuan teknis sebelum masuk pasar.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Pelajari segitiga eksposur (ISO, aperture, shutter)", "Latihan foto setiap hari minimal 30 menit", "Pelajari editing dasar di Lightroom/VSCO", "Tentukan niche: produk, portrait, atau event"] },
    { id: 2, phase: "Fase 2", title: "Bangun Portofolio", desc: "Buat karya yang menunjukkan kemampuan terbaikmu.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Foto 3–5 sesi gratis untuk teman/keluarga", "Buat akun Instagram khusus portofolio", "Upload ke 500px atau Flickr untuk exposure", "Edit dengan konsistensi gaya/preset"] },
    { id: 3, phase: "Fase 3", title: "Klien Berbayar", desc: "Mulai menerima order dan bangun reputasi.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Bergabung grup wedding/event planner di Facebook", "Tawarkan foto produk ke UMKM dengan harga starter", "Pasang iklan di OLX/Tokopedia kategori jasa foto", "Minta review Google My Business"] },
    { id: 4, phase: "Fase 4", title: "Skalakan Bisnis", desc: "Diversifikasi pendapatan dan bangun brand fotografer.", icon: "📈", duration: "Bulan 3–6", tasks: ["Jual foto di Shutterstock dan Adobe Stock", "Buka preset pack dan jual di Gumroad", "Buat kursus fotografi online", "Pertimbangkan studio foto mini"] },
  ],
  "Menulis": [
    { id: 1, phase: "Fase 1", title: "Asah Kemampuan", desc: "Tingkatkan kualitas tulisan sebelum mencari klien.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Tulis 500 kata setiap hari tanpa henti", "Pelajari dasar SEO writing dan copywriting", "Baca 1 buku tentang menulis profesional", "Pilih niche tulisan: tech, bisnis, lifestyle, dll"] },
    { id: 2, phase: "Fase 2", title: "Bangun Portofolio", desc: "Buat karya yang menunjukkan kemampuan terbaikmu.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Buat blog pribadi di Medium atau WordPress", "Tulis 5–10 artikel berkualitas di niche pilihanmu", "Publish di LinkedIn untuk exposure profesional", "Buat 2–3 contoh copywriting/sales page"] },
    { id: 3, phase: "Fase 3", title: "Klien Pertama", desc: "Mulai monetisasi skill dengan klien nyata.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Daftar di Projects.co.id dan Sribulancer", "Pitch ke startup dan agensi digital langsung", "Tawarkan paket: 4 artikel/bulan dengan harga bundling", "Cari klien internasional di ProBlogger Job Board"] },
    { id: 4, phase: "Fase 4", title: "Produk Digital", desc: "Ciptakan aset tulisan yang menghasilkan pasif income.", icon: "📈", duration: "Bulan 3–6", tasks: ["Tulis dan jual e-book di Amazon KDP atau Gumroad", "Buka kelas menulis online", "Jadi ghost writer untuk klien premium", "Bangun newsletter berbayar di Substack"] },
  ],
  "Marketing": [
    { id: 1, phase: "Fase 1", title: "Pelajari Fundamentals", desc: "Kuasai dasar-dasar digital marketing modern.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Selesaikan Google Digital Garage (gratis, bersertifikat)", "Pelajari Meta Ads Manager dari nol", "Ikuti 5 akun marketing expert di LinkedIn", "Pahami funnel: awareness → consideration → conversion"] },
    { id: 2, phase: "Fase 2", title: "Praktik & Portofolio", desc: "Buktikan kemampuan dengan hasil nyata.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Kelola akun sosmed bisnis teman/keluarga gratis", "Jalankan campaign iklan kecil (budget Rp 100rb)", "Dokumentasikan hasil: reach, engagement, konversi", "Buat studi kasus dari setiap pengalaman"] },
    { id: 3, phase: "Fase 3", title: "Klien Berbayar", desc: "Mulai menerima order dan bangun reputasi.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Tawarkan ke UMKM yang belum aktif di sosmed", "Buat paket: kelola 1 platform Rp 1–2 jt/bulan", "Daftar di platform freelance lokal", "Minta referral dari klien yang puas"] },
    { id: 4, phase: "Fase 4", title: "Agency & Scale", desc: "Bangun bisnis marketing yang lebih besar.", icon: "📈", duration: "Bulan 3–6", tasks: ["Rekrut 1–2 asisten untuk scale kapasitas", "Spesialisasi: e-commerce, F&B, atau property", "Jual kursus digital marketing", "Bangun media sosial pribadi sebagai thought leader"] },
  ],
  "Public Speaking": [
    { id: 1, phase: "Fase 1", title: "Bangun Kepercayaan Diri", desc: "Latih kemampuan berbicara di depan umum secara konsisten.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Rekam diri sendiri berbicara 5 menit setiap hari", "Bergabung komunitas Toastmasters atau publik speaking lokal", "Tonton TED Talks dan analisis teknik pembicara", "Tentukan topik keahlian utama yang ingin dikuasai"] },
    { id: 2, phase: "Fase 2", title: "Bangun Reputasi", desc: "Tampil di depan publik dan bangun rekam jejak.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Isi acara komunitas atau kampus secara gratis", "Buat konten edukasi di LinkedIn/Instagram", "Minta testimoni tertulis dari setiap penampilan", "Buat reel/video highlight penampilan terbaik"] },
    { id: 3, phase: "Fase 3", title: "Berbayar Pertama", desc: "Mulai charge untuk penampilan dan pelatihan.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Tawarkan ke perusahaan untuk training karyawan", "Daftar sebagai MC di platform event organizer", "Buat paket: seminar 2 jam, workshop setengah hari", "Bangun website personal dengan portofolio penampilan"] },
    { id: 4, phase: "Fase 4", title: "Skalakan Dampak", desc: "Perbesar jangkauan dan diversifikasi penghasilan.", icon: "📈", duration: "Bulan 3–6", tasks: ["Rekam kursus online tentang topik keahlianmu", "Tulis buku atau e-book sebagai otoritas bidang", "Bergabung speaker bureau profesional", "Bangun komunitas berbayar atau mastermind group"] },
  ],
}

// ─── BADGES ──────────────────────────────────────────────────
export const badges: Badge[] = [
  { id: 1, icon: "🌱", name: "Explorer",  desc: "Selesaikan Fase 1 Roadmap", phase: 1, color: "#1F7A63" },
  { id: 2, icon: "⚡", name: "Starter",   desc: "Selesaikan Fase 2 Roadmap", phase: 2, color: "#1E3A5F" },
  { id: 3, icon: "🔥", name: "Builder",   desc: "Selesaikan Fase 3 Roadmap", phase: 3, color: "#C9A84C" },
  { id: 4, icon: "🚀", name: "Scaler",    desc: "Selesaikan Fase 4 Roadmap", phase: 4, color: "#7C3AED" },
  { id: 5, icon: "👑", name: "Master",    desc: "Selesaikan Semua Fase",     phase: 5, color: "#DC2626" },
]

// ─── COMMUNITY POSTS ─────────────────────────────────────────
export const communityPosts: CommunityPost[] = [
  { name: "Andi R.",  skill: "Programming",     avatar: "💻", text: "Dapat klien pertama setelah ikut roadmap KARYANUSA! 3 minggu langsung ada yang hire dari Upwork.", time: "2 jam lalu",  likes: 24, badge: "Explorer",  color: "#1F7A63", bg: "rgba(31,122,99,0.08)"   },
  { name: "Sari D.",  skill: "Desain Grafis",   avatar: "🎨", text: "Template Canva yang aku buat akhirnya laku di Creative Market. Passive income pertama Rp 800rb!", time: "5 jam lalu",  likes: 41, badge: "Starter",   color: "#6366F1", bg: "rgba(99,102,241,0.08)"  },
  { name: "Budi S.",  skill: "Fotografi",       avatar: "📷", text: "Sekarang dapat job foto produk tiap minggu dari UMKM sekitar. Alhamdulillah rejeki mengalir!", time: "1 hari lalu", likes: 18, badge: "Builder",   color: "#D97706", bg: "rgba(245,158,11,0.08)" },
  { name: "Maya K.",  skill: "Marketing",       avatar: "📣", text: "AI chatbot KARYANUSA beneran helpful buat strategi konten. Recommended banget!", time: "1 hari lalu", likes: 33, badge: "Scaler",    color: "#DC2626", bg: "rgba(239,68,68,0.08)"   },
  { name: "Rizky F.", skill: "Menulis",         avatar: "✍️", text: "Fase 1–3 sudah selesai. Sekarang punya 2 klien tetap ghost writing. Terima kasih KARYANUSA!", time: "2 hari lalu", likes: 29, badge: "Builder",   color: "#DB2777", bg: "rgba(236,72,153,0.08)"  },
  { name: "Citra M.", skill: "Public Speaking", avatar: "🎤", text: "MC berbayar pertama! Fee Rp 2 juta dari acara seminar startup. Tidak menyangka bisa secepat ini.", time: "3 hari lalu", likes: 52, badge: "Master",    color: "#B8942A", bg: "rgba(201,168,76,0.08)"  },
  { name: "Dimas P.", skill: "Programming",     avatar: "💻", text: "Launch SaaS pertama dari skill programming. ARR sudah Rp 15 juta per tahun!", time: "4 hari lalu", likes: 87, badge: "Master",    color: "#1F7A63", bg: "rgba(31,122,99,0.08)"   },
  { name: "Nadia S.", skill: "Desain Grafis",   avatar: "🎨", text: "100 penjualan template di Etsy! Passive income benar-benar works kalau konsisten.", time: "5 hari lalu", likes: 63, badge: "Scaler",    color: "#6366F1", bg: "rgba(99,102,241,0.08)"  },
]