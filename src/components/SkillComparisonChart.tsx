import { useEffect, useRef, useState } from "react"

const skillData = [
  { skill: "Programming",     icon: "💻", color: "#1F7A63", min: 3,  max: 15, passive: 5,  demand: 95 },
  { skill: "Desain Grafis",   icon: "🎨", color: "#6366F1", min: 2,  max: 10, passive: 3,  demand: 88 },
  { skill: "Marketing",       icon: "📣", color: "#DC2626", min: 2,  max: 10, passive: 5,  demand: 92 },
  { skill: "Public Speaking", icon: "🎤", color: "#C9A84C", min: 2,  max: 15, passive: 8,  demand: 78 },
  { skill: "Fotografi",       icon: "📷", color: "#D97706", min: 1,  max: 8,  passive: 2,  demand: 80 },
  { skill: "Menulis",         icon: "✍️",  color: "#DB2777", min: 0.5,max: 5,  passive: 3,  demand: 82 },
]

type Tab = "income" | "passive" | "demand"

export default function SkillComparisonChart() {
  const [activeTab, setActiveTab] = useState<Tab>("income")
  const [animated, setAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { setAnimated(true); observer.unobserve(e.target) } }),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const getData = (tab: Tab) => {
    if (tab === "income") return skillData.map(s => ({ ...s, value: s.max, label: `Rp ${s.max} jt` }))
    if (tab === "passive") return skillData.map(s => ({ ...s, value: s.passive, label: `Rp ${s.passive} jt` }))
    return skillData.map(s => ({ ...s, value: s.demand, label: `${s.demand}%` }))
  }

  const data = getData(activeTab)
  const maxVal = Math.max(...data.map(d => d.value))

  const tabs: { key: Tab; label: string; desc: string }[] = [
    { key: "income", label: "💰 Max Income", desc: "Potensi penghasilan tertinggi per bulan" },
    { key: "passive", label: "😴 Passive Income", desc: "Potensi pendapatan pasif per bulan" },
    { key: "demand", label: "📈 Market Demand", desc: "Tingkat permintaan pasar saat ini" },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .chart-section { font-family: 'Plus Jakarta Sans', sans-serif; }

        .chart-wrap { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .chart-wrap.visible { opacity: 1; transform: translateY(0); }

        .tab-btn { border: 1.5px solid #EEF0F4; background: #fff; border-radius: 10px; padding: 8px 14px; font-size: 13px; font-weight: 500; color: #64748B; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.18s; white-space: nowrap; }
        .tab-btn:hover { border-color: #1F7A63; color: #1F7A63; }
        .tab-btn.active { background: #1F7A63; border-color: #1F7A63; color: #fff; font-weight: 600; }

        .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .bar-label { width: 130px; flex-shrink: 0; display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 500; color: #1E3A5F; }
        .bar-track { flex: 1; height: 32px; background: #F1F5F9; border-radius: 8px; overflow: hidden; position: relative; }
        .bar-fill { height: 100%; border-radius: 8px; display: flex; align-items: center; justify-content: flex-end; padding-right: 10px; transition: width 1s cubic-bezier(0.34, 1.2, 0.64, 1); }
        .bar-val { font-size: 11px; font-weight: 700; color: #fff; white-space: nowrap; }

        @media (max-width: 480px) { .bar-label { width: 90px; font-size: 11px; } }
      `}</style>

      <section className="chart-section py-14 sm:py-16" style={{ background: "#F6F5F2" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-6">

          <div className="text-center mb-8">
            <span style={{ display: "inline-block", background: "rgba(31,122,99,0.09)", color: "#1F7A63", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "100px", marginBottom: "12px", border: "1px solid rgba(31,122,99,0.18)" }}>
              Perbandingan Skill
            </span>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Potensi <span style={{ color: "#1F7A63" }}>Setiap Skill</span>
            </h2>
            <p style={{ marginTop: "8px", color: "#64748B", fontSize: "0.92rem", lineHeight: 1.65 }}>
              Bandingkan potensi penghasilan dari setiap skill secara visual.
            </p>
          </div>

          <div ref={sectionRef} className={`chart-wrap ${animated ? "visible" : ""}`}>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              {tabs.map(t => (
                <button key={t.key} className={`tab-btn ${activeTab === t.key ? "active" : ""}`} onClick={() => setActiveTab(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: 20 }}>
              {tabs.find(t => t.key === activeTab)?.desc}
            </p>

            {/* Chart */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "22px 20px", border: "1px solid #EEF0F4", boxShadow: "0 2px 12px rgba(30,58,95,0.06)" }}>
              {data.sort((a, b) => b.value - a.value).map((d, i) => (
                <div key={d.skill} className="bar-row" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="bar-label">
                    <span style={{ fontSize: 16 }}>{d.icon}</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.skill}</span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: animated ? `${(d.value / maxVal) * 100}%` : "0%",
                        background: `linear-gradient(90deg, ${d.color}cc, ${d.color})`,
                        transitionDelay: `${i * 0.08}s`,
                        minWidth: animated ? "40px" : "0px",
                      }}
                    >
                      <span className="bar-val">{d.label}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid #F1F5F9", display: "flex", gap: 16, flexWrap: "wrap" }}>
                {activeTab === "income" && <p style={{ fontSize: "11px", color: "#94A3B8" }}>* Estimasi max income/bulan dari freelance & jasa aktif. Hasil aktual dapat berbeda.</p>}
                {activeTab === "passive" && <p style={{ fontSize: "11px", color: "#94A3B8" }}>* Estimasi passive income/bulan dari produk digital, template, kursus, dll.</p>}
                {activeTab === "demand" && <p style={{ fontSize: "11px", color: "#94A3B8" }}>* Market demand score berdasarkan tren platform freelance & job market Indonesia 2025.</p>}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}