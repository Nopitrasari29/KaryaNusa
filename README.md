# 🌿 KaryaNusa

## 🏫 Institusi
Institut Teknologi Sepuluh Nopember

---

## 👥 Anggota Tim
- Ketua      : Aswalia Novitriasari
- Anggota 1  : Rafika Az Zahra Kusumastuti
- Anggota 2  : Nisrina Atiqah Dwiputri Ridzki

---

## 📖 Deskripsi Karya
KaryaNusa merupakan platform berbasis AI yang membantu masyarakat mengubah skill sehari-hari menjadi peluang ekonomi nyata.

Website ini dikembangkan dengan latar belakang meningkatnya kebutuhan masyarakat terhadap pemanfaatan keterampilan yang dimiliki agar dapat menghasilkan nilai ekonomi. Banyak individu memiliki potensi, namun belum mengetahui bagaimana cara mengembangkannya menjadi peluang usaha yang konkret.

KaryaNusa hadir sebagai solusi dengan pendekatan teknologi berbasis Artificial Intelligence (AI) untuk membantu pengguna mengenali skill dominan mereka, memberikan rekomendasi peluang usaha, serta menyediakan roadmap bisnis yang terstruktur.

### 🎯 Tujuan
- Membantu pengguna mengenali skill dominan mereka
- Memberikan rekomendasi peluang usaha berbasis AI
- Menyediakan roadmap bisnis yang terarah dan sistematis
- Mendukung pengembangan ekonomi kreatif berbasis individu

### 💡 Manfaat
- Membuka peluang usaha baru berbasis skill
- Meningkatkan kemandirian ekonomi masyarakat
- Mempermudah proses belajar dan pengembangan skill
- Mendorong inovasi dalam pemanfaatan teknologi AI

KaryaNusa mengusung subtema **Ekonomi + Sosial** dengan tujuan memberikan dampak nyata bagi masyarakat luas.

---

## 🚀 Alur Platform

```
User buka KARYANUSA
  → Jawab 7 pertanyaan (Skill Discovery)
  → AI deteksi skill dominan + confidence score
  → Lihat 3 rekomendasi peluang usaha
  → Ikuti Business Roadmap (checklist 4 fase)
  → Konsultasi lewat AI Chat Assistant
```

---

## 📁 Struktur Folder

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── SkillDiscovery.tsx
│   ├── Opportunities.tsx
│   ├── BusinessRoadmap.tsx
│   ├── SuccessStory.tsx
│   ├── AIChatAssistant.tsx
│   └── Footer.tsx
├── pages/
│   └── HomePage.tsx
└── main.tsx
```

---

## ⚙️ Setup & Jalankan

```bash
# 1. Clone repo
git clone https://github.com/Nopitrasari29/KaryaNusa.git
cd KaryaNusa

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
```

Buka di browser: `http://localhost:5173`

---

## 🛠️ Commands

| Command | Fungsi |
|---|---|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview hasil build |

---

## 🔑 Environment Variables

Buat file `.env` di root folder:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

> Groq API key bisa didapat gratis di [console.groq.com](https://console.groq.com)

---

## 👥 Tim & Pembagian Kerja

| Nama | Bagian |
|---|---|
| *(isi nama)* | Frontend UI/UX |
| *(isi nama)* | Backend + Database |
| *(isi nama)* | AI Integration (Groq) |

---

## 📌 Status Fitur

| Fitur | Status |
|---|---|
| Navbar + Hero | ✅ Done |
| HowItWorks + Features | ✅ Done |
| Skill Discovery (7 pertanyaan) | ✅ Done |
| Opportunities per Skill | ✅ Done |
| Business Roadmap Interaktif | ✅ Done |
| Success Story / Testimoni | ✅ Done |
| AI Chat Assistant | ⚠️ UI done, AI belum |
| Skill Comparison Chart | ❌ Belum |
| Backend + MongoDB | ❌ Belum |
| Deploy | ❌ Belum |

---

## 🔮 Coming Soon

- Groq API integration (chatbot + scoring)
- Skill Comparison Chart
- Backend Node.js + MongoDB
- Deploy ke Vercel + Railway
