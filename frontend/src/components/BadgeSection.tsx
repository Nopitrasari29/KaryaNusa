import { useEffect, useState } from "react"
import { badges } from "../services/karyanusaData"

type Props = {
  phasesCompleted: number
}

export default function BadgeSection({ phasesCompleted }: Props) {

  const [newUnlocked, setNewUnlocked] = useState<number | null>(null)

  useEffect(() => {
    if (phasesCompleted > 0) {
      setNewUnlocked(phasesCompleted)
      setTimeout(() => { setNewUnlocked(null) }, 1000)
    }
  }, [phasesCompleted])

  const shareBadge = (badge: typeof badges[0]) => {
    const text = `Saya baru membuka badge "${badge.name}" di KARYANUSA!\n\nPlatform AI untuk menemukan peluang ekonomi dari skill digital.\n\nKARYANUSA`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <>
      <style>{`
        .badge-card { border-radius:16px; padding:22px 18px; background:#fff; border:1px solid #EEF0F4; transition:all .25s ease; text-align:center; position:relative; }
        .badge-card:hover { transform:translateY(-6px); box-shadow:0 12px 28px rgba(30,58,95,0.15); }
        .badge-locked { opacity:.35; filter:grayscale(1); }
        .badge-pop { animation:badgePop .45s ease; }
        @keyframes badgePop { 0%{transform:scale(.75);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1)} }
        .badge-icon { font-size:36px; margin-bottom:6px; }
        .badge-title { font-weight:700; color:#1E3A5F; font-size:.95rem; margin-bottom:4px; }
        .badge-desc { font-size:.78rem; color:#64748B; }
        .badge-share { margin-top:10px; background:#1F7A63; color:#fff; border:none; border-radius:8px; font-size:.75rem; padding:6px 12px; cursor:pointer; transition:.2s; }
        .badge-share:hover { background:#17644F; }
      `}</style>

      <section id="badges" className="py-16" style={{ background: "#F8FAFB" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.3rem)", color: "#1E3A5F" }}>
              Achievement Badge
            </h2>
            <p style={{ fontSize: ".9rem", color: "#64748B", marginTop: 6 }}>
              Badge akan terbuka ketika kamu menyelesaikan setiap fase roadmap.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {badges.map(b => {
              const isUnlocked = b.phase === 5 ? phasesCompleted === 4 : phasesCompleted >= b.phase
              return (
                <div key={b.phase} className={`badge-card ${!isUnlocked ? "badge-locked" : ""} ${newUnlocked === b.phase ? "badge-pop" : ""}`}>
                  <div className="badge-icon">{b.icon}</div>
                  <div className="badge-title">{b.name}</div>
                  <div className="badge-desc">{b.desc}</div>
                  {isUnlocked && (
                    <button className="badge-share" onClick={() => shareBadge(b)}>Share</button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}