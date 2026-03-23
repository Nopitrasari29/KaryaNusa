import { useEffect, useRef } from "react"
import { opportunityMap } from "../services/karyanusaData"

type Props = { skill: string | null; score?: number }

const incomeConfig: Record<string, { label: string; bg: string; border: string; color: string }> = {
  "High Income":    { label: "High Income",    bg: "rgba(31,122,99,0.08)",  border: "rgba(31,122,99,0.18)",  color: "#1F7A63" },
  "Passive Income": { label: "Passive Income", bg: "rgba(201,168,76,0.08)", border: "rgba(201,168,76,0.22)", color: "#B8942A" },
  "High Potential": { label: "High Potential", bg: "rgba(30,58,95,0.07)",   border: "rgba(30,58,95,0.16)",   color: "#1E3A5F" },
}

export default function Opportunities({ skill, score }: Props) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    cardRefs.current.forEach(r => { if (r) observer.observe(r) })
    return () => observer.disconnect()
  }, [skill])

  if (!skill) return null
  const list = opportunityMap[skill] ?? opportunityMap["Programming"]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .opp-section { font-family: 'Plus Jakarta Sans', sans-serif; }

        .opp-card {
          background: #fff; border-radius: 16px; border: 1.5px solid #EEF0F4;
          padding: 20px 18px; box-shadow: 0 1px 8px rgba(30,58,95,0.05);
          display: flex; flex-direction: column; gap: 12px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .opp-card.visible { opacity: 1; transform: translateY(0); }
        .opp-card:nth-child(2) { transition-delay: 0.1s; }
        .opp-card:nth-child(3) { transition-delay: 0.2s; }
        .opp-card:hover { box-shadow: 0 8px 24px rgba(30,58,95,0.1); border-color: #1F7A63; transform: translateY(-3px) !important; }

        .step-row { display: flex; align-items: center; gap: 8px; font-size: 0.78rem; color: #64748B; }
        .step-num { width: 18px; height: 18px; border-radius: 50%; background: rgba(31,122,99,0.1); color: #1F7A63; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      `}</style>

      <section id="opportunities" className="opp-section py-14 sm:py-16" style={{ background: "#F6F5F2" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          <div className="text-center mb-8">
            <span style={{ display: "inline-block", background: "rgba(31,122,99,0.09)", color: "#1F7A63", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "100px", marginBottom: "12px", border: "1px solid rgba(31,122,99,0.18)" }}>
              Langkah 2 dari 3
            </span>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Peluang untuk <span style={{ color: "#1F7A63" }}>{skill}</span>
            </h2>
            <p style={{ marginTop: "8px", color: "#64748B", fontSize: "0.92rem", lineHeight: 1.65 }}>
              3 peluang ekonomi terbaik yang bisa kamu mulai sekarang.
            </p>
            {typeof score === "number" && score > 0 && (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 12, background: "rgba(31,122,99,0.08)", border: "1px solid rgba(31,122,99,0.2)", borderRadius: "100px", padding: "6px 16px" }}>
    <span style={{ fontSize: 14 }}>🎯</span>
    <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F7A63" }}>
      Confidence Score: {score}% match
    </span>
  </div>
)}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((item, i) => {
              const cfg = incomeConfig[item.type] ?? incomeConfig['High Income']
              return (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el }}
                  className="opp-card"
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(31,122,99,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>{item.icon}</div>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: "100px", padding: "3px 10px", whiteSpace: "nowrap" }}>{cfg.label}</span>
                  </div>

                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: "0.93rem", color: "#1E3A5F", marginBottom: 5 }}>{item.title}</h3>
                    <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>

                  <div style={{ background: "rgba(31,122,99,0.06)", borderRadius: 9, padding: "9px 12px", display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 14 }}>💰</span>
                    <div>
                      <div style={{ fontSize: "10px", color: "#94A3B8" }}>Estimasi penghasilan</div>
                      <div style={{ fontWeight: 700, color: "#1F7A63", fontSize: "0.86rem" }}>{item.income}</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "10px", fontWeight: 600, color: "#94A3B8", marginBottom: 6, letterSpacing: "0.05em" }}>LANGKAH MULAI</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {item.steps.map((step, si) => (
                        <div key={si} className="step-row">
                          <div className="step-num">{si + 1}</div>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>
    </>
  )
}