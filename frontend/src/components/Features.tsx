import { useEffect, useRef } from "react"

export default function Features() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target) }
      }),
      { threshold: 0.15 }
    )
    cardRefs.current.forEach(r => { if (r) observer.observe(r) })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const features = [
    { icon: "🔍", title: "Skill Discovery", desc: "Jawab beberapa pertanyaan singkat, AI mengidentifikasi keterampilan tersembunyi yang bisa kamu monetisasi.", accent: "#1F7A63", bg: "rgba(31,122,99,0.07)", border: "rgba(31,122,99,0.15)" },
    { icon: "🎯", title: "Opportunity Recommendation", desc: "Dapatkan rekomendasi peluang usaha yang relevan dan realistis berdasarkan skill yang kamu miliki.", accent: "#1E3A5F", bg: "rgba(30,58,95,0.07)", border: "rgba(30,58,95,0.15)" },
    { icon: "🤖", title: "AI Business Assistant", desc: "Konsultasikan strategi bisnis, cara pemasaran, dan langkah memulai usaha langsung dengan AI mentor.", accent: "#C9A84C", bg: "rgba(201,168,76,0.07)", border: "rgba(201,168,76,0.2)" },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        .features-section { font-family: 'Plus Jakarta Sans', sans-serif; }

        .scroll-fade { opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .scroll-fade.visible { opacity: 1; transform: translateY(0); }
        .scroll-fade:nth-child(2) { transition-delay: 0.1s; }
        .scroll-fade:nth-child(3) { transition-delay: 0.2s; }

        .feature-card { background: #fff; border-radius: 16px; padding: 22px 20px; border: 1px solid #EEF0F4; box-shadow: 0 1px 8px rgba(30,58,95,0.05); transition: transform 0.25s ease, box-shadow 0.25s ease; position: relative; overflow: hidden; }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(30,58,95,0.09); }
        .feature-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 16px 16px 0 0; opacity: 0; transition: opacity 0.25s; }
        .feature-card:hover::before { opacity: 1; }
        .card-0::before { background: linear-gradient(90deg, #1F7A63, #25957A); }
        .card-1::before { background: linear-gradient(90deg, #1E3A5F, #2A5298); }
        .card-2::before { background: linear-gradient(90deg, #C9A84C, #F0D060); }

        .stats-bar { opacity: 0; transform: translateY(18px); transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s; }
        .stats-bar.visible { opacity: 1; transform: translateY(0); }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media (min-width: 640px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>

      <section className="features-section py-14 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          <div className="text-center mb-10">
            <span style={{ display: "inline-block", background: "rgba(31,122,99,0.09)", color: "#1F7A63", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "100px", marginBottom: "12px", border: "1px solid rgba(31,122,99,0.18)" }}>
              Apa yang bisa KARYANUSA lakukan?
            </span>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Fitur Utama <span style={{ color: "#1F7A63" }}>KARYANUSA</span>
            </h2>
            <p style={{ marginTop: "8px", color: "#64748B", fontSize: "0.92rem", maxWidth: "420px", margin: "8px auto 0", lineHeight: 1.65 }}>
              Semua yang kamu butuhkan untuk mengubah keterampilan menjadi penghasilan nyata.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                ref={(el) => { cardRefs.current[i] = el }}
                className={`feature-card card-${i} scroll-fade`}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: f.bg, border: `1px solid ${f.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "0.97rem", color: "#1E3A5F", marginBottom: 7 }}>{f.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.65, marginBottom: 14 }}>{f.desc}</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: f.accent }}>
                  Pelajari lebih lanjut <span>→</span>
                </div>
              </div>
            ))}
          </div>

          <div ref={statsRef} className="stats-bar" style={{ marginTop: "32px", background: "linear-gradient(135deg, #F0F7F5, #EDF3F8)", borderRadius: "14px", padding: "20px 24px", border: "1px solid rgba(31,122,99,0.09)" }}>
            <div className="stats-grid">
              {[
                { icon: "👥", num: "10.000+", label: "Pengguna Terbantu" },
                { icon: "💼", num: "50+",     label: "Kategori Peluang" },
                { icon: "⭐", num: "4.9/5",   label: "Rating Pengguna" },
                { icon: "🚀", num: "< 2 min", label: "Waktu Analisis" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "18px", marginBottom: "3px" }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: "1.1rem", color: "#1E3A5F" }}>{s.num}</div>
                  <div style={{ fontSize: "11px", color: "#64748B", marginTop: "1px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}