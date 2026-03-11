import { useEffect, useRef } from "react"

const steps = [
  {
    num: "01",
    icon: "🧠",
    title: "Jawab Pertanyaan Singkat",
    desc: "Ceritakan aktivitas, kebiasaan, dan hal yang kamu sukai. Tidak perlu pengalaman khusus — cukup jujur!",
    color: "#1F7A63",
    bg: "rgba(31,122,99,0.07)",
    border: "rgba(31,122,99,0.15)",
  },
  {
    num: "02",
    icon: "🤖",
    title: "AI Analisis Skillmu",
    desc: "AI kami memproses jawabanmu dan mengidentifikasi skill tersembunyi yang bisa dimonetisasi.",
    color: "#1E3A5F",
    bg: "rgba(30,58,95,0.07)",
    border: "rgba(30,58,95,0.15)",
  },
  {
    num: "03",
    icon: "🚀",
    title: "Mulai Hasilkan Uang",
    desc: "Dapatkan rekomendasi peluang usaha, roadmap langkah demi langkah, dan konsultasi bisnis via AI.",
    color: "#C9A84C",
    bg: "rgba(201,168,76,0.07)",
    border: "rgba(201,168,76,0.2)",
  },
]

export default function HowItWorks() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target) }
      }),
      { threshold: 0.15 }
    )
    cardRefs.current.forEach(r => { if (r) observer.observe(r) })
    if (lineRef.current) observer.observe(lineRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .hiw-section { font-family: 'Plus Jakarta Sans', sans-serif; }

        .hiw-card {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .hiw-card.visible { opacity: 1; transform: translateY(0); }
        .hiw-card:nth-child(2) { transition-delay: 0.12s; }
        .hiw-card:nth-child(3) { transition-delay: 0.24s; }

        .hiw-line {
          opacity: 0; transform: scaleX(0); transform-origin: left;
          transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
        }
        .hiw-line.visible { opacity: 1; transform: scaleX(1); }

        .step-inner {
          background: #fff; border-radius: 18px; padding: 24px 20px;
          border: 1px solid #EEF0F4;
          box-shadow: 0 2px 12px rgba(30,58,95,0.06);
          height: 100%;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          position: relative; overflow: hidden;
        }
        .step-inner:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(30,58,95,0.1); }
        .step-inner::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; border-radius: 0 0 18px 18px; opacity: 0; transition: opacity 0.22s; }
        .step-0 .step-inner::after { background: linear-gradient(90deg, #1F7A63, #25957A); }
        .step-1 .step-inner::after { background: linear-gradient(90deg, #1E3A5F, #2A5298); }
        .step-2 .step-inner::after { background: linear-gradient(90deg, #C9A84C, #F0D060); }
        .step-inner:hover::after { opacity: 1; }

        @media (max-width: 1023px) { .connector-line { display: none !important; } }
      `}</style>

      <section className="hiw-section py-14 sm:py-16" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          {/* Header */}
          <div className="text-center mb-10">
            <span style={{ display: "inline-block", background: "rgba(31,122,99,0.09)", color: "#1F7A63", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "100px", marginBottom: "12px", border: "1px solid rgba(31,122,99,0.18)" }}>
              Cara Kerja
            </span>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Mulai dalam <span style={{ color: "#1F7A63" }}>3 Langkah Mudah</span>
            </h2>
            <p style={{ marginTop: "8px", color: "#64748B", fontSize: "0.92rem", lineHeight: 1.65 }}>
              Dari nol hingga punya rencana bisnis nyata — hanya butuh beberapa menit.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connector line desktop */}
            <div
              ref={lineRef}
              className="hiw-line connector-line"
              style={{
                position: "absolute", top: "52px", left: "calc(16.66% + 16px)", right: "calc(16.66% + 16px)",
                height: "2px",
                background: "linear-gradient(90deg, #1F7A63 0%, #1E3A5F 50%, #C9A84C 100%)",
                zIndex: 0,
              }}
            />

            <div className="grid sm:grid-cols-3 gap-5 relative z-10">
              {steps.map((s, i) => (
                <div
                  key={i}
                  ref={el => { cardRefs.current[i] = el }}
                  className={`hiw-card step-${i}`}
                >
                  <div className="step-inner">
                    {/* Number + icon */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: s.bg, border: `1.5px solid ${s.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22, flexShrink: 0,
                        position: "relative",
                      }}>
                        {s.icon}
                        {/* Step number bubble */}
                        <div style={{
                          position: "absolute", top: -8, right: -8,
                          width: 20, height: 20, borderRadius: "50%",
                          background: s.color, color: "#fff",
                          fontSize: "10px", fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}>
                          {i + 1}
                        </div>
                      </div>
                      <div style={{ fontFamily: "'Lora', serif", fontSize: "2rem", fontWeight: 700, color: "#EEF0F4", lineHeight: 1 }}>
                        {s.num}
                      </div>
                    </div>

                    <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1E3A5F", marginBottom: 8, lineHeight: 1.3 }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.7 }}>
                      {s.desc}
                    </p>

                    {/* Bottom accent tag */}
                    <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 5, fontSize: "11px", fontWeight: 600, color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: "100px", padding: "4px 10px" }}>
                      {i === 0 && "⏱️ ~2 menit"}
                      {i === 1 && "⚡ Hasil instan"}
                      {i === 2 && "💰 Gratis selamanya"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA bottom */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button
              onClick={() => document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "linear-gradient(135deg, #1F7A63, #25957A)", color: "#fff",
                border: "none", borderRadius: 12, padding: "13px 32px",
                fontWeight: 600, fontSize: "0.95rem", cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "0 4px 16px rgba(31,122,99,0.3)",
                transition: "all 0.2s ease",
              }}
              onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(31,122,99,0.4)" }}
              onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(31,122,99,0.3)" }}
            >
              Coba Sekarang — Gratis! 🚀
            </button>
          </div>

        </div>
      </section>
    </>
  )
}