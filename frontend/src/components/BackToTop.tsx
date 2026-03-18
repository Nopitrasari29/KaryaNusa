import { useState, useEffect } from "react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <>
      <style>{`
        @keyframes fadeInBtn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .back-top-btn {
          position: fixed; bottom: 24px; right: 24px; z-index: 999;
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, #1F7A63, #25957A);
          border: none; cursor: pointer; color: #fff; font-size: 18px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(31,122,99,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.25s ease;
          animation: fadeInBtn 0.25s ease both;
        }
        .back-top-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 22px rgba(31,122,99,0.45); }
      `}</style>

      {visible && (
        <button className="back-top-btn" onClick={scrollTop} title="Kembali ke atas">
          ↑
        </button>
      )}
    </>
  )
}