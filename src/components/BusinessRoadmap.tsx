import { useState, useEffect, useRef } from "react"

type Props = { skill: string | null }

type RoadmapStep = {
  id: number
  phase: string
  title: string
  desc: string
  tasks: string[]
  duration: string
  icon: string
}

const roadmapData: Record<string, RoadmapStep[]> = {
  "Programming": [
    { id: 1, phase: "Fase 1", title: "Bangun Fondasi", desc: "Siapkan semua yang dibutuhkan sebelum mulai mencari klien.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Buat akun GitHub dan upload 3 project terbaik", "Setup profil LinkedIn yang profesional", "Pilih spesialisasi (web, mobile, atau backend)", "Pelajari dasar-dasar freelancing online"] },
    { id: 2, phase: "Fase 2", title: "Buat Portofolio", desc: "Portofolio adalah senjata utama untuk menarik klien pertama.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Bangun 2–3 project demo yang relevan dengan target klien", "Deploy semua project ke Vercel/Netlify", "Tulis README yang jelas di setiap project", "Buat website portofolio sederhana"] },
    { id: 3, phase: "Fase 3", title: "Cari Klien Pertama", desc: "Mulai aktif menawarkan jasa dan bangun reputasi awal.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Daftar di Upwork dan Fiverr, lengkapi profil 100%", "Kirim 5–10 proposal per hari dengan personalisasi", "Tawarkan harga kompetitif untuk 2–3 proyek pertama", "Minta testimoni dari setiap klien yang puas"] },
    { id: 4, phase: "Fase 4", title: "Skalakan Penghasilan", desc: "Optimalkan rate dan bangun aliran klien yang konsisten.", icon: "📈", duration: "Bulan 3–6", tasks: ["Naikkan rate setelah 5+ review positif", "Spesialisasikan layanan untuk niche tertentu", "Bangun jaringan via komunitas developer lokal", "Pertimbangkan membuka agency kecil"] },
  ],
  "Desain Grafis": [
    { id: 1, phase: "Fase 1", title: "Kuasai Tools", desc: "Pastikan skill teknis sudah solid sebelum mencari klien.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Kuasai minimal 1 tool utama (Figma/Adobe Illustrator)", "Pelajari prinsip desain: tipografi, warna, layout", "Ikuti 1 kursus desain gratis di YouTube", "Kumpulkan inspirasi di Pinterest/Behance"] },
    { id: 2, phase: "Fase 2", title: "Bangun Portofolio", desc: "Buat karya yang menunjukkan kemampuan terbaikmu.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Buat 5–8 karya terbaik (logo, poster, UI mockup)", "Upload ke Behance dan Dribbble", "Buat case study singkat untuk setiap karya", "Minta feedback dari komunitas desainer"] },
    { id: 3, phase: "Fase 3", title: "Klien Pertama", desc: "Mulai monetisasi skill dengan klien nyata.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Tawarkan jasa ke UMKM di sekitarmu", "Daftar di 99designs dan Sribulancer", "Buat paket harga yang jelas (logo, branding, sosmed)", "Promosi di Instagram dengan konten behind-the-scenes"] },
    { id: 4, phase: "Fase 4", title: "Pasif & Skalabel", desc: "Buat aset digital yang menghasilkan pendapatan pasif.", icon: "📈", duration: "Bulan 3–6", tasks: ["Jual template di Creative Market atau Envato", "Buat Canva template dan jual di Etsy", "Buka kelas online di Skill Academy atau Udemy", "Bangun personal brand sebagai desainer spesialis"] },
  ],
  "Fotografi": [
    { id: 1, phase: "Fase 1", title: "Kuasai Teknik Dasar", desc: "Perkuat kemampuan teknis sebelum masuk pasar.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Pelajari segitiga eksposur (ISO, aperture, shutter)", "Latihan foto setiap hari minimal 30 menit", "Pelajari editing dasar di Lightroom/VSCO", "Tentukan niche: produk, portrait, atau event"] },
    { id: 2, phase: "Fase 2", title: "Bangun Portofolio", desc: "Kumpulkan karya terbaik yang mencerminkan gayamu.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Foto 3–5 sesi gratis untuk teman/keluarga", "Buat akun Instagram khusus portofolio", "Upload ke 500px atau Flickr untuk exposure", "Edit dengan konsistensi gaya/preset"] },
    { id: 3, phase: "Fase 3", title: "Klien Berbayar", desc: "Mulai menerima order dan bangun reputasi.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Bergabung grup wedding/event planner di Facebook", "Tawarkan foto produk ke UMKM dengan harga starter", "Pasang iklan di OLX/Tokopedia kategori jasa foto", "Minta review Google My Business"] },
    { id: 4, phase: "Fase 4", title: "Skalakan Bisnis", desc: "Diversifikasi pendapatan dan bangun brand fotografer.", icon: "📈", duration: "Bulan 3–6", tasks: ["Jual foto di Shutterstock dan Adobe Stock", "Buka preset pack dan jual di Gumroad", "Buat kursus fotografi online", "Pertimbangkan studio foto mini"] },
  ],
  "Menulis": [
    { id: 1, phase: "Fase 1", title: "Asah Kemampuan", desc: "Tingkatkan kualitas tulisan sebelum mencari klien.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Tulis 500 kata setiap hari tanpa henti", "Pelajari dasar SEO writing dan copywriting", "Baca 1 buku tentang menulis profesional", "Pilih niche tulisan: tech, bisnis, lifestyle, dll"] },
    { id: 2, phase: "Fase 2", title: "Bangun Portofolio", desc: "Buat sampel tulisan yang bisa ditunjukkan ke calon klien.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Buat blog pribadi di Medium atau WordPress", "Tulis 5–10 artikel berkualitas di niche pilihanmu", "Publish di LinkedIn untuk exposure profesional", "Buat 2–3 contoh copywriting/sales page"] },
    { id: 3, phase: "Fase 3", title: "Klien Pertama", desc: "Mulai dapat bayaran dari tulisanmu.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Daftar di Projects.co.id dan Sribulancer", "Pitch ke startup dan agensi digital langsung", "Tawarkan paket: 4 artikel/bulan dengan harga bundling", "Cari klien internasional di ProBlogger Job Board"] },
    { id: 4, phase: "Fase 4", title: "Produk Digital", desc: "Ciptakan aset tulisan yang menghasilkan pasif income.", icon: "📈", duration: "Bulan 3–6", tasks: ["Tulis dan jual e-book di Amazon KDP atau Gumroad", "Buka kelas menulis online", "Jadi ghost writer untuk klien premium", "Bangun newsletter berbayar di Substack"] },
  ],
  "Marketing": [
    { id: 1, phase: "Fase 1", title: "Pelajari Fundamentals", desc: "Kuasai dasar-dasar digital marketing modern.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Selesaikan Google Digital Garage (gratis, bersertifikat)", "Pelajari Meta Ads Manager dari nol", "Ikuti 5 akun marketing expert di LinkedIn", "Pahami funnel: awareness → consideration → conversion"] },
    { id: 2, phase: "Fase 2", title: "Praktik & Portofolio", desc: "Buktikan kemampuan dengan hasil nyata.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Kelola akun sosmed bisnis teman/keluarga gratis", "Jalankan campaign iklan kecil (budget Rp 100rb)", "Dokumentasikan hasil: reach, engagement, konversi", "Buat studi kasus dari setiap pengalaman"] },
    { id: 3, phase: "Fase 3", title: "Klien Berbayar", desc: "Monetisasi skill marketing kamu.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Tawarkan ke UMKM yang belum aktif di sosmed", "Buat paket: kelola 1 platform Rp 1–2 jt/bulan", "Daftar di platform freelance lokal", "Minta referral dari klien yang puas"] },
    { id: 4, phase: "Fase 4", title: "Agency & Scale", desc: "Bangun bisnis marketing yang lebih besar.", icon: "📈", duration: "Bulan 3–6", tasks: ["Rekrut 1–2 asisten untuk scale kapasitas", "Spesialisasi: e-commerce, F&B, atau property", "Jual kursus digital marketing", "Bangun media sosial pribadi sebagai thought leader"] },
  ],
  "Public Speaking": [
    { id: 1, phase: "Fase 1", title: "Bangun Kepercayaan Diri", desc: "Latih kemampuan berbicara di depan umum secara konsisten.", icon: "🧱", duration: "Minggu 1–2", tasks: ["Rekam diri sendiri berbicara 5 menit setiap hari", "Bergabung komunitas Toastmasters atau publik speaking lokal", "Tonton TED Talks dan analisis teknik pembicara", "Tentukan topik keahlian utama yang ingin dikuasai"] },
    { id: 2, phase: "Fase 2", title: "Bangun Reputasi", desc: "Tampil di depan publik dan bangun rekam jejak.", icon: "🗂️", duration: "Minggu 3–5", tasks: ["Isi acara komunitas atau kampus secara gratis", "Buat konten edukasi di LinkedIn/Instagram", "Minta testimoni tertulis dari setiap penampilan", "Buat reel/video highlight penampilan terbaik"] },
    { id: 3, phase: "Fase 3", title: "Berbayar Pertama", desc: "Mulai charge untuk penampilan dan pelatihan.", icon: "🎯", duration: "Minggu 6–8", tasks: ["Tawarkan ke perusahaan untuk training karyawan", "Daftar sebagai MC di platform event organizer", "Buat paket: seminar 2 jam, workshop setengah hari", "Bangun website personal dengan portofolio penampilan"] },
    { id: 4, phase: "Fase 4", title: "Skalakan Dampak", desc: "Perbesar jangkauan dan diversifikasi penghasilan.", icon: "📈", duration: "Bulan 3–6", tasks: ["Rekam kursus online tentang topik keahlianmu", "Tulis buku atau e-book sebagai otoritas bidang", "Bergabung speaker bureau profesional", "Bangun komunitas berbayar atau mastermind group"] },
  ],
}

const phaseColors = [
  { color: "#1F7A63", bg: "rgba(31,122,99,0.08)", border: "rgba(31,122,99,0.18)" },
  { color: "#1E3A5F", bg: "rgba(30,58,95,0.07)",  border: "rgba(30,58,95,0.15)" },
  { color: "#C9A84C", bg: "rgba(201,168,76,0.08)", border: "rgba(201,168,76,0.2)" },
  { color: "#7C3AED", bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.18)" },
]

export default function BusinessRoadmap({ skill }: Props) {
  const defaultSkill = "Programming"
  const activeSkill = skill ?? defaultSkill
  const steps = roadmapData[activeSkill] ?? roadmapData[defaultSkill]

  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setChecked({}) }, [activeSkill])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }))

  const totalTasks = steps.reduce((acc, s) => acc + s.tasks.length, 0)
  const doneTasks = Object.values(checked).filter(Boolean).length
  const progressPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

  const completedPhases = steps.filter(s =>
    s.tasks.every((_, ti) => checked[`${s.id}-${ti}`])
  ).length

  if (!skill) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .roadmap-section { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .roadmap-wrap { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .roadmap-wrap.visible { opacity: 1; transform: translateY(0); }

        .task-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 9px 0; cursor: pointer;
          border-bottom: 1px solid #F8F9FB;
          transition: opacity 0.15s;
        }
        .task-item:last-child { border-bottom: none; padding-bottom: 0; }
        .task-item:hover { opacity: 0.8; }

        .task-check {
          width: 20px; height: 20px; border-radius: 6px; border: 2px solid #CBD5E1;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
          transition: all 0.18s ease; background: #fff;
        }
        .task-check.done { background: #1F7A63; border-color: #1F7A63; }

        .phase-card {
          background: #fff; border-radius: 16px; border: 1.5px solid #EEF0F4;
          overflow: hidden; box-shadow: 0 2px 10px rgba(30,58,95,0.05);
          transition: box-shadow 0.22s ease;
        }
        .phase-card:hover { box-shadow: 0 6px 22px rgba(30,58,95,0.09); }
        .phase-card.complete { border-color: #1F7A63; }

        .progress-bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #1F7A63, #25957A); transition: width 0.6s ease; }
      `}</style>

      <section id="roadmap" className="roadmap-section py-14 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          {/* Header */}
          <div className="text-center mb-8">
            <span style={{ display: "inline-block", background: "rgba(31,122,99,0.09)", color: "#1F7A63", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "100px", marginBottom: "12px", border: "1px solid rgba(31,122,99,0.18)" }}>
              Langkah 3 dari 4
            </span>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Roadmap <span style={{ color: "#1F7A63" }}>{activeSkill}</span>
            </h2>
            <p style={{ marginTop: "8px", color: "#64748B", fontSize: "0.92rem", lineHeight: 1.65 }}>
              Ikuti langkah-langkah ini secara berurutan untuk hasil maksimal. Centang setiap task yang sudah selesai!
            </p>
          </div>

          <div ref={sectionRef} className="roadmap-wrap">

            {/* Progress overview */}
            <div style={{ background: "linear-gradient(135deg, #F0F7F5, #EDF3F8)", borderRadius: 14, padding: "16px 20px", marginBottom: 24, border: "1px solid rgba(31,122,99,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#1E3A5F", fontSize: "0.95rem" }}>Progress Keseluruhan</div>
                  <div style={{ fontSize: "12px", color: "#64748B", marginTop: 2 }}>{doneTasks} dari {totalTasks} task selesai · {completedPhases} dari 4 fase tuntas</div>
                </div>
                <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: "1.8rem", color: progressPct === 100 ? "#1F7A63" : "#1E3A5F" }}>
                  {progressPct}%
                  {progressPct === 100 && <span style={{ fontSize: "1.2rem", marginLeft: 6 }}>🎉</span>}
                </div>
              </div>
              <div style={{ height: 8, background: "rgba(30,58,95,0.08)", borderRadius: 4, overflow: "hidden" }}>
                <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            {/* Phase cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {steps.map((step, si) => {
                const cfg = phaseColors[si]
                const phaseDone = step.tasks.every((_, ti) => checked[`${step.id}-${ti}`])
                const phaseTasks = step.tasks.filter((_, ti) => checked[`${step.id}-${ti}`]).length
                const phaseProgress = Math.round((phaseTasks / step.tasks.length) * 100)

                return (
                  <div key={step.id} className={`phase-card ${phaseDone ? "complete" : ""}`}>
                    {/* Phase header */}
                    <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid #F1F5F9" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: cfg.bg, border: `1px solid ${cfg.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                          {phaseDone ? "✅" : step.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: "100px", padding: "2px 8px" }}>{step.phase}</span>
                            <span style={{ fontSize: "10px", color: "#94A3B8" }}>{step.duration}</span>
                          </div>
                          <div style={{ fontWeight: 700, color: "#1E3A5F", fontSize: "0.93rem", marginTop: 2 }}>{step.title}</div>
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: phaseDone ? "#1F7A63" : "#94A3B8", flexShrink: 0 }}>
                          {phaseTasks}/{step.tasks.length}
                        </div>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.55, marginBottom: 8 }}>{step.desc}</p>
                      {/* Mini progress */}
                      <div style={{ height: 4, background: "#F1F5F9", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${phaseProgress}%`, background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}99)`, borderRadius: 2, transition: "width 0.4s ease" }} />
                      </div>
                    </div>

                    {/* Tasks */}
                    <div style={{ padding: "12px 18px" }}>
                      {step.tasks.map((task, ti) => {
                        const key = `${step.id}-${ti}`
                        const done = !!checked[key]
                        return (
                          <div key={ti} className="task-item" onClick={() => toggle(key)}>
                            <div className={`task-check ${done ? "done" : ""}`}>
                              {done && <span style={{ color: "#fff", fontSize: "11px", fontWeight: 700 }}>✓</span>}
                            </div>
                            <span style={{ fontSize: "0.83rem", color: done ? "#94A3B8" : "#1E3A5F", textDecoration: done ? "line-through" : "none", lineHeight: 1.55, transition: "all 0.18s" }}>
                              {task}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Completion banner */}
            {progressPct === 100 && (
              <div style={{ marginTop: 20, background: "linear-gradient(135deg, #1F7A63, #25957A)", borderRadius: 14, padding: "20px 24px", textAlign: "center", color: "#fff" }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>🎉</div>
                <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: 6 }}>Selamat! Kamu Telah Menyelesaikan Semua Fase!</div>
                <div style={{ fontSize: "0.88rem", opacity: 0.85 }}>Kamu sudah siap untuk scale bisnis {activeSkill}-mu ke level berikutnya. Konsultasikan langkah selanjutnya dengan AI Assistant!</div>
                <button
                  onClick={() => document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ marginTop: 14, background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.4)", color: "#fff", borderRadius: 10, padding: "10px 22px", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.18s" }}
                >
                  Konsultasi dengan AI →
                </button>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}