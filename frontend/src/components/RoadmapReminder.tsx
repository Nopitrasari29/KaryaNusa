import { useEffect, useState } from "react"

type Props = { progress: number }

export default function RoadmapReminder({ progress }: Props) {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (progress >= 100 || dismissed) return

    const timer = setTimeout(() => {
      setShow(true)
    }, 20000)

    return () => clearTimeout(timer)
  }, [progress, dismissed])

  const handleDismiss = () => {
    setShow(false)
    setDismissed(true)
  }

  const handleAction = () => {
    document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" })
    setShow(false)
    setDismissed(true)
  }

  if (!show) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastSlideOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(16px) scale(0.96); }
        }
        @keyframes progressShrink {
          from { width: 100%; }
          to   { width: 0%; }
        }

        .roadmap-toast {
          position: fixed;
          bottom: 88px;
          left: 24px;
          z-index: 997;
          width: 320px;
          max-width: calc(100vw - 48px);
          background: #fff;
          border-radius: 16px;
          border: 1.5px solid #EEF0F4;
          box-shadow: 0 8px 32px rgba(30,58,95,0.14), 0 2px 8px rgba(30,58,95,0.06);
          overflow: hidden;
          animation: toastSlideIn 0.3s cubic-bezier(0.34,1.1,0.64,1) both;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .toast-progress {
          height: 3px;
          background: linear-gradient(90deg, #1F7A63, #25957A);
          border-radius: 0;
          animation: progressShrink 8s linear forwards;
        }

        .toast-dismiss-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #94A3B8;
          font-size: 14px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.18s;
          flex-shrink: 0;
        }
        .toast-dismiss-btn:hover { background: #F1F5F9; color: #1E3A5F; }

        .toast-action-btn {
          background: linear-gradient(135deg, #1F7A63, #25957A);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.18s;
          white-space: nowrap;
        }
        .toast-action-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(31,122,99,0.3); }
      `}</style>

      <div className="roadmap-toast">
        {/* Auto-dismiss progress bar */}
        <div className="toast-progress" onAnimationEnd={handleDismiss} />

        <div style={{ padding: "14px 16px" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(31,122,99,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
              🗺️
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1E3A5F", marginBottom: 2 }}>
                Lanjutkan Roadmap Kamu!
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.5 }}>
                Progress kamu saat ini <strong style={{ color: "#1F7A63" }}>{progress}%</strong> — masih ada langkah yang bisa diselesaikan hari ini! 💪
              </div>
            </div>
            <button className="toast-dismiss-btn" onClick={handleDismiss}>✕</button>
          </div>

          {/* Progress mini bar */}
          <div style={{ height: 5, background: "#F1F5F9", borderRadius: 3, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#1F7A63,#25957A)", borderRadius: 3, transition: "width 0.5s ease" }} />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ fontSize: "11px", color: "#94A3B8" }}>
              {progress === 0 ? "Belum mulai" : `${progress}% selesai`}
            </div>
            <button className="toast-action-btn" onClick={handleAction}>
              Lanjut Sekarang →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}