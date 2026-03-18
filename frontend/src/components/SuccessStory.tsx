import { useState, useEffect, useRef } from "react"

const stories = [
  {
    name: "Rizky Aditya",
    location: "Bandung, Jawa Barat",
    skill: "Programming",
    avatar: "👨‍💻",
    color: "#1F7A63",
    bg: "rgba(31,122,99,0.07)",
    border: "rgba(31,122,99,0.15)",
    before: "Mahasiswa semester 6 yang kerja sambilan jadi kasir minimarket",
    after: "Freelance web developer dengan penghasilan Rp 8 juta/bulan",
    income: "Rp 8 jt/bulan",
    duration: "4 bulan",
    quote: "Aku kira skill coding yang aku pelajari sendiri itu ga ada nilainya. Ternyata setelah pakai KARYANUSA, aku sadar bisa langsung jual skill itu ke klien nyata. Bulan ketiga udah bisa bayar kuliah sendiri.",
    tags: ["Freelance", "Web Dev", "Upwork"],
  },
  {
    name: "Sari Dewi Putri",
    location: "Surabaya, Jawa Timur",
    skill: "Desain Grafis",
    avatar: "👩‍🎨",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.07)",
    border: "rgba(99,102,241,0.15)",
    before: "Ibu rumah tangga yang hobi desain poster untuk acara RT",
    after: "Pemilik toko template Canva dengan 400+ pelanggan aktif",
    income: "Rp 5 jt/bulan",
    duration: "6 bulan",
    quote: "Saya pikir desain itu cuma hobi. Roadmap dari KARYANUSA bikin saya step-by-step dari bikin portofolio sampai jualan template. Sekarang sambil ngurus anak pun bisa tetap menghasilkan.",
    tags: ["Passive Income", "Canva", "Template"],
  },
  {
    name: "Fajar Nugroho",
    location: "Yogyakarta, DIY",
    skill: "Marketing",
    avatar: "👨‍💼",
    color: "#DC2626",
    bg: "rgba(239,68,68,0.07)",
    border: "rgba(239,68,68,0.15)",
    before: "Fresh graduate yang belum dapat kerja selama 8 bulan",
    after: "Social media manager untuk 4 brand UMKM lokal",
    income: "Rp 12 jt/bulan",
    duration: "3 bulan",
    quote: "8 bulan nganggur bikin down banget. Tapi ternyata skill marketing yang aku pelajari dari YouTube bisa langsung dipakai. KARYANUSA kasih tau caranya mulai dari nol sampai dapat klien pertama dalam 3 minggu.",
    tags: ["Social Media", "UMKM", "Meta Ads"],
  },
  {
    name: "Nadya Rahma",
    location: "Medan, Sumatera Utara",
    skill: "Menulis",
    avatar: "👩‍💻",
    color: "#DB2777",
    bg: "rgba(236,72,153,0.07)",
    border: "rgba(236,72,153,0.15)",
    before: "Guru SD yang suka nulis di blog pribadi tanpa penghasilan",
    after: "Content writer freelance + penulis e-book bestseller lokal",
    income: "Rp 6 jt/bulan",
    duration: "5 bulan",
    quote: "Blog saya sudah jalan 2 tahun tapi ga pernah termonetisasi. AI Assistant KARYANUSA bantu saya susun strategi dan kenalan sama platform yang tepat. Sekarang tulisan saya benar-benar dibayar!",
    tags: ["Content Writing", "E-book", "SEO"],
  },
  {
    name: "Bima Sakti",
    location: "Makassar, Sulawesi Selatan",
    skill: "Fotografi",
    avatar: "📸",
    color: "#D97706",
    bg: "rgba(245,158,11,0.07)",
    border: "rgba(245,158,11,0.15)",
    before: "Karyawan swasta yang foto-foto cuma buat feed Instagram pribadi",
    after: "Fotografer produk & event dengan studio mini sendiri",
    income: "Rp 10 jt/bulan",
    duration: "7 bulan",
    quote: "Awalnya malu nawarin jasa foto karena takut ditolak. Roadmap KARYANUSA step-by-step banget — dari bikin portofolio sampai cara pricing yang benar. Sekarang malah sering nolak klien karena jadwal penuh.",
    tags: ["Foto Produk", "Event", "Studio"],
  },
  {
    name: "Citra Maharani",
    location: "Jakarta Selatan, DKI",
    skill: "Public Speaking",
    avatar: "🎤",
    color: "#B8942A",
    bg: "rgba(201,168,76,0.07)",
    border: "rgba(201,168,76,0.2)",
    before: "Mahasiswi aktif organisasi yang sering jadi MC acara kampus gratis",
    after: "MC profesional & trainer public speaking korporat",
    income: "Rp 15 jt/bulan",
    duration: "5 bulan",
    quote: "Dulu MC gratis mulu karena ga tau cara charge yang benar. KARYANUSA bikin aku sadar nilai skill ku jauh lebih tinggi dari yang aku kira. Sekarang sekali tampil bisa dapat lebih dari UMR.",
    tags: ["MC Profesional", "Training", "Korporat"],
  },
]

export default function SuccessStory() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-rotate every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      goTo((active + 1) % stories.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [active])

  const goTo = (idx: number) => {
    if (idx === active || animating) return
    setAnimating(true)
    setTimeout(() => { setActive(idx); setAnimating(false) }, 220)
  }

  const s = stories[active]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .story-section { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .story-wrap { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .story-wrap.visible { opacity: 1; transform: translateY(0); }

        .story-card { transition: opacity 0.22s ease, transform 0.22s ease; }
        .story-card.out { opacity: 0; transform: translateY(8px); }
        .story-card.in  { animation: fadeIn 0.3s ease both; }

        .avatar-circle {
          width: 64px; height: 64px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(0,0,0,0.1);
        }

        .dot-btn { width: 8px; height: 8px; border-radius: 50%; border: none; cursor: pointer; transition: all 0.2s ease; padding: 0; }
        .dot-btn.active { width: 22px; border-radius: 4px; }

        .thumb-btn {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          background: none; border: 1.5px solid #EEF0F4; border-radius: 12px;
          padding: 10px 8px; cursor: pointer; transition: all 0.18s ease;
          font-family: 'Plus Jakarta Sans', sans-serif; flex: 1;
        }
        .thumb-btn:hover { border-color: #CBD5E1; transform: translateY(-2px); }
        .thumb-btn.active { border-color: var(--thumb-color); background: var(--thumb-bg); }

        .stat-chip { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; }

        @keyframes quoteIn { from { opacity: 0; } to { opacity: 1; } }
        .quote-text { animation: quoteIn 0.35s ease both; }
      `}</style>

      <section className="story-section py-14 sm:py-16" style={{ background: "#F6F5F2" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          {/* Header */}
          <div className="text-center mb-10">
            <span style={{ display: "inline-block", background: "rgba(31,122,99,0.09)", color: "#1F7A63", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "100px", marginBottom: "12px", border: "1px solid rgba(31,122,99,0.18)" }}>
              Kisah Sukses
            </span>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Mereka Sudah <span style={{ color: "#1F7A63" }}>Membuktikannya</span>
            </h2>
            <p style={{ marginTop: "8px", color: "#64748B", fontSize: "0.92rem", lineHeight: 1.65 }}>
              Ribuan orang telah mengubah skill sehari-hari menjadi penghasilan nyata bersama KARYANUSA.
            </p>
          </div>

          <div ref={sectionRef} className="story-wrap">
            <div className="grid lg:grid-cols-3 gap-5 items-start">

              {/* Left: thumbnail list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {stories.map((st, i) => (
                  <button
                    key={i}
                    className={`thumb-btn ${active === i ? "active" : ""}`}
                    style={{ "--thumb-color": st.color, "--thumb-bg": st.bg } as React.CSSProperties}
                    onClick={() => goTo(i)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: st.bg, border: `1px solid ${st.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{st.avatar}</div>
                      <div style={{ textAlign: "left", minWidth: 0 }}>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: active === i ? st.color : "#1E3A5F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{st.name}</div>
                        <div style={{ fontSize: "11px", color: "#94A3B8" }}>{st.skill}</div>
                      </div>
                      {active === i && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: st.color, flexShrink: 0 }} />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Right: main story card */}
              <div className="lg:col-span-2">
                <div
                  className={`story-card ${animating ? "out" : "in"}`}
                  style={{ background: "#fff", borderRadius: 20, padding: "24px", border: `1.5px solid ${s.border}`, boxShadow: "0 4px 20px rgba(30,58,95,0.07)" }}
                >
                  {/* Top: avatar + name + stats */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
                    <div className="avatar-circle" style={{ background: s.bg, border: `2px solid ${s.border}` }}>{s.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: "#1E3A5F", fontSize: "1rem" }}>{s.name}</div>
                      <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: 2 }}>📍 {s.location}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                        <span className="stat-chip" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>💰 {s.income}</span>
                        <span className="stat-chip" style={{ background: "rgba(30,58,95,0.06)", border: "1px solid rgba(30,58,95,0.12)", color: "#1E3A5F" }}>⏱️ {s.duration}</span>
                        <span className="stat-chip" style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.18)", color: "#B8942A" }}>✨ {s.skill}</span>
                      </div>
                    </div>
                  </div>

                  {/* Before → After */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "center", marginBottom: 18 }}>
                    <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 10, padding: "10px 12px" }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "#DC2626", marginBottom: 4, letterSpacing: "0.05em" }}>SEBELUM</div>
                      <div style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.5 }}>{s.before}</div>
                    </div>
                    <div style={{ fontSize: "18px", flexShrink: 0 }}>→</div>
                    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "10px 12px" }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: s.color, marginBottom: 4, letterSpacing: "0.05em" }}>SETELAH</div>
                      <div style={{ fontSize: "0.8rem", color: "#1E3A5F", fontWeight: 500, lineHeight: 1.5 }}>{s.after}</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div style={{ position: "relative", padding: "14px 16px", background: "#F8FAFB", borderRadius: 12, borderLeft: `3px solid ${s.color}`, marginBottom: 16 }}>
                    <div style={{ fontSize: "1.8rem", color: s.color, lineHeight: 1, marginBottom: 4, opacity: 0.4 }}>"</div>
                    <p key={active} className="quote-text" style={{ fontSize: "0.88rem", color: "#1E3A5F", lineHeight: 1.75, fontStyle: "italic" }}>
                      {s.quote}
                    </p>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center" }}>
                    {s.tags.map(t => (
                      <span key={t} style={{ fontSize: "11px", color: "#64748B", background: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "100px", padding: "3px 10px" }}>#{t}</span>
                    ))}
                    <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
                      {stories.map((_, i) => (
                        <button key={i} className={`dot-btn ${active === i ? "active" : ""}`} style={{ background: active === i ? s.color : "#CBD5E1" }} onClick={() => goTo(i)} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom stats strip */}
            <div style={{ marginTop: 24, background: "#fff", borderRadius: 14, padding: "16px 24px", border: "1px solid #EEF0F4", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, textAlign: "center" }}>
              {[
                { num: "10.000+", label: "Pengguna Aktif", icon: "👥" },
                { num: "Rp 2–15 jt", label: "Rata-rata Penghasilan/Bulan", icon: "💰" },
                { num: "3–7 bulan", label: "Rata-rata Waktu Hasil Pertama", icon: "⏱️" },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: "18px", marginBottom: 4 }}>{stat.icon}</div>
                  <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: "1.1rem", color: "#1E3A5F" }}>{stat.num}</div>
                  <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}