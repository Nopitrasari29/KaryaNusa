import { useState } from "react"

export default function Footer() {
  const [showModal, setShowModal] = useState<string | null>(null)
  const [feedback, setFeedback] = useState({ name: "", message: "", rating: 0 })
  const [submitted, setSubmitted] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmitFeedback = () => {
    if (!feedback.message.trim()) return
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setFeedback({ name: "", message: "", rating: 0 }); setShowModal(null) }, 2500)
  }

  const modalContent: Record<string, { title: string; content: React.ReactNode }> = {
    "Tentang Kami": {
      title: "Tentang KARYANUSA",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.75 }}>
            <strong style={{ color: "#1E3A5F" }}>KARYANUSA</strong> adalah platform berbasis AI yang lahir dari kepedulian terhadap potensi masyarakat Indonesia yang belum termanfaatkan secara optimal.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.75 }}>
            Kami percaya bahwa setiap orang memiliki keterampilan yang bisa menjadi sumber penghasilan — mulai dari mendesain, menulis, hingga berbicara di depan umum. KARYANUSA hadir untuk menjembatani skill tersebut dengan peluang ekonomi nyata.
          </p>
          <div style={{ background: "rgba(31,122,99,0.07)", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(31,122,99,0.15)" }}>
            <div style={{ fontWeight: 700, color: "#1F7A63", fontSize: "0.88rem", marginBottom: 8 }}>🎯 Misi Kami</div>
            <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.7 }}>Memberdayakan 1 juta masyarakat Indonesia untuk menemukan dan memonetisasi skill mereka melalui teknologi AI yang accessible dan gratis.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 4 }}>
            {[{ num: "10K+", label: "Pengguna" }, { num: "50+", label: "Peluang Usaha" }, { num: "2026", label: "Didirikan" }].map(s => (
              <div key={s.label} style={{ textAlign: "center", background: "#F8FAFB", borderRadius: 10, padding: "10px 8px" }}>
                <div style={{ fontWeight: 700, color: "#1E3A5F", fontSize: "1.1rem" }}>{s.num}</div>
                <div style={{ fontSize: "11px", color: "#94A3B8" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    "Kebijakan Privasi": {
      title: "Kebijakan Privasi",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: "🔒", title: "Data yang Kami Kumpulkan", desc: "KARYANUSA hanya mengumpulkan jawaban kuesioner skill kamu untuk keperluan analisis AI. Kami tidak meminta data pribadi seperti KTP, nomor HP, atau informasi sensitif lainnya." },
            { icon: "🛡️", title: "Penggunaan Data", desc: "Data jawaban kamu digunakan semata-mata untuk mengidentifikasi skill dominan dan memberikan rekomendasi peluang usaha yang relevan. Data tidak dijual ke pihak ketiga manapun." },
            { icon: "🍪", title: "Cookie", desc: "Kami menggunakan cookie minimal untuk menjaga performa platform. Tidak ada tracking iklan atau profiling komersial." },
            { icon: "📧", title: "Kontak Privasi", desc: "Jika ada pertanyaan terkait privasi data kamu, hubungi kami melalui form feedback atau email tim kami." },
          ].map(item => (
            <div key={item.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#1E3A5F", fontSize: "0.88rem", marginBottom: 4 }}>{item.title}</div>
                <p style={{ fontSize: "0.83rem", color: "#64748B", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
          <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: 4 }}>Terakhir diperbarui: Maret 2026</p>
        </div>
      )
    },
    "Kontak": {
      title: "Hubungi Kami",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { icon: "📧", label: "Email", val: "hello@karyanusa.id" },
            { icon: "📱", label: "Instagram", val: "@karyanusa.id" },
            { icon: "💼", label: "LinkedIn", val: "KARYANUSA Official" },
            { icon: "📍", label: "Lokasi", val: "Indonesia 🇮🇩" },
          ].map(c => (
            <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: "#F8FAFB", borderRadius: 10, border: "1px solid #EEF0F4" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{c.icon}</span>
              <div>
                <div style={{ fontSize: "10px", color: "#94A3B8", fontWeight: 600 }}>{c.label}</div>
                <div style={{ fontSize: "0.88rem", color: "#1E3A5F", fontWeight: 500 }}>{c.val}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 4, padding: "12px 14px", background: "rgba(31,122,99,0.07)", borderRadius: 10, border: "1px solid rgba(31,122,99,0.15)" }}>
            <p style={{ fontSize: "0.83rem", color: "#64748B", lineHeight: 1.7 }}>
              Untuk feedback, laporan bug, atau kolaborasi — gunakan tombol <strong style={{ color: "#1F7A63" }}>Kirim Feedback</strong> di bawah halaman ini ya! 😊
            </p>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        .footer-section { font-family: 'Plus Jakarta Sans', sans-serif; }
        .footer-link { background: none; border: none; cursor: pointer; font-size: 0.88rem; color: rgba(255,255,255,0.5); font-family: 'Plus Jakarta Sans', sans-serif; transition: color 0.2s; padding: 0; text-align: left; }
        .footer-link:hover { color: #D4AF37; }
        .info-link { background: none; border: none; cursor: pointer; font-size: 0.88rem; color: rgba(255,255,255,0.5); font-family: 'Plus Jakarta Sans', sans-serif; transition: color 0.2s; padding: 0; text-align: left; text-decoration: underline; text-decoration-color: transparent; }
        .info-link:hover { color: #D4AF37; text-decoration-color: #D4AF37; }
        .footer-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
        @media (min-width: 640px) { .footer-grid { grid-template-columns: repeat(3, 1fr); } }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(15,35,55,0.7); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeOverlay 0.2s ease; }
        @keyframes fadeOverlay { from { opacity: 0; } to { opacity: 1; } }
        .modal-box { background: #fff; border-radius: 20px; padding: 28px 24px; max-width: 480px; width: 100%; max-height: 85vh; overflow-y: auto; animation: slideUp 0.25s ease; box-shadow: 0 20px 60px rgba(15,35,55,0.25); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

        .close-btn { background: #F1F5F9; border: none; border-radius: 8px; width: 32px; height: 32px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: background 0.18s; flex-shrink: 0; }
        .close-btn:hover { background: #E2E8F0; }

        .star-btn { background: none; border: none; cursor: pointer; font-size: 24px; padding: 2px; transition: transform 0.15s; line-height: 1; }
        .star-btn:hover { transform: scale(1.2); }

        .feedback-input { width: 100%; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 10px 13px; font-size: 0.88rem; font-family: 'Plus Jakarta Sans', sans-serif; color: #1E3A5F; outline: none; transition: border-color 0.18s; box-sizing: border-box; }
        .feedback-input:focus { border-color: #1F7A63; box-shadow: 0 0 0 3px rgba(31,122,99,0.09); }
        .feedback-textarea { width: 100%; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 10px 13px; font-size: 0.88rem; font-family: 'Plus Jakarta Sans', sans-serif; color: #1E3A5F; outline: none; transition: border-color 0.18s; resize: vertical; min-height: 90px; box-sizing: border-box; }
        .feedback-textarea:focus { border-color: #1F7A63; box-shadow: 0 0 0 3px rgba(31,122,99,0.09); }

        .submit-btn { background: linear-gradient(135deg, #1F7A63, #25957A); color: #fff; border: none; border-radius: 11px; padding: 12px 24px; font-weight: 600; font-size: 0.9rem; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; width: 100%; transition: all 0.2s; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(31,122,99,0.32); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        @keyframes successPop { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .success-state { animation: successPop 0.3s ease both; text-align: center; padding: 20px 0; }
      `}</style>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(null) }}>
          <div className="modal-box">

            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 700, fontSize: "1.15rem", color: "#1E3A5F" }}>
                {showModal === "feedback" ? "💬 Kirim Feedback" : modalContent[showModal]?.title}
              </h3>
              <button className="close-btn" onClick={() => { setShowModal(null); setSubmitted(false) }}>✕</button>
            </div>

            {/* Feedback form */}
            {showModal === "feedback" ? (
              submitted ? (
                <div className="success-state">
                  <div style={{ fontSize: "3rem", marginBottom: 12 }}>🎉</div>
                  <div style={{ fontWeight: 700, color: "#1F7A63", fontSize: "1rem", marginBottom: 6 }}>Terima kasih atas feedbackmu!</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748B" }}>Masukan kamu sangat berarti untuk pengembangan KARYANUSA 💚</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#64748B", display: "block", marginBottom: 6 }}>Nama (opsional)</label>
                    <input className="feedback-input" placeholder="Nama kamu..." value={feedback.name} onChange={e => setFeedback(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#64748B", display: "block", marginBottom: 6 }}>Rating Pengalaman</label>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[1,2,3,4,5].map(n => (
                        <button key={n} className="star-btn" onClick={() => setFeedback(p => ({ ...p, rating: n }))}>
                          {n <= feedback.rating ? "⭐" : "☆"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#64748B", display: "block", marginBottom: 6 }}>Pesan / Saran *</label>
                    <textarea className="feedback-textarea" placeholder="Ceritakan pengalamanmu menggunakan KARYANUSA, atau saran untuk kami..." value={feedback.message} onChange={e => setFeedback(p => ({ ...p, message: e.target.value }))} />
                  </div>
                  <button className="submit-btn" onClick={handleSubmitFeedback} disabled={!feedback.message.trim()}>
                    Kirim Feedback 🚀
                  </button>
                  <p style={{ fontSize: "11px", color: "#94A3B8", textAlign: "center" }}>Feedbackmu bersifat anonim dan tidak akan dipublikasikan tanpa izin.</p>
                </div>
              )
            ) : (
              /* Info modal content */
              modalContent[showModal]?.content
            )}

          </div>
        </div>
      )}

      <footer className="footer-section" style={{ background: "linear-gradient(135deg, #0F2337 0%, #1E3A5F 100%)" }}>

        {/* CTA strip */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "36px 20px", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.3rem, 2.5vw, 2rem)", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>
            Siap Mengubah Skill Jadi <span style={{ color: "#D4AF37" }}>Penghasilan?</span>
          </h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: "22px" }}>
            Bergabung dengan ribuan orang yang sudah menemukan peluang ekonominya.
          </p>
          <button
            onClick={() => scrollTo("discover")}
            style={{ background: "linear-gradient(135deg, #1F7A63, #25957A)", color: "#fff", border: "none", borderRadius: "12px", padding: "13px 28px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 4px 18px rgba(31,122,99,0.4)", transition: "all 0.2s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)" }}
          >
            🚀 Mulai Gratis Sekarang
          </button>
        </div>

        {/* Main grid */}
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
          <div className="footer-grid">

            {/* Brand */}
            <div>
              <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 700, fontSize: "1.15rem", color: "#fff", marginBottom: "10px", display: "flex", alignItems: "center", gap: 4 }}>
                KARYANUSA
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1F7A63", display: "inline-block", marginBottom: 6 }} />
              </div>
              <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.7, maxWidth: "220px", marginBottom: 16 }}>
                Platform AI yang membantu masyarakat menemukan peluang ekonomi dari keterampilan mereka.
              </p>
              <button
                onClick={() => setShowModal("feedback")}
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 9, padding: "8px 16px", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.7)", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.18s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.14)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)" }}
              >
                💬 Kirim Feedback
              </button>
            </div>

            {/* Platform */}
            <div>
              <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.88rem", marginBottom: "14px" }}>Platform</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Skill Discovery", id: "discover" },
                  { label: "Opportunity Finder", id: "opportunities" },
                  { label: "AI Assistant", id: "assistant" },
                ].map(l => (
                  <button key={l.label} className="footer-link" onClick={() => scrollTo(l.id)}>{l.label}</button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.88rem", marginBottom: "14px" }}>Info</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Tentang Kami", "Kebijakan Privasi", "Kontak"].map(l => (
                  <button key={l} className="info-link" onClick={() => setShowModal(l)}>{l}</button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "14px 20px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
            © 2026 KARYANUSA — Empowering Skills into Economic Opportunities
          </p>
          <button
            onClick={() => setShowModal("feedback")}
            style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "color 0.18s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#D4AF37" }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)" }}
          >
            💬 Feedback
          </button>
        </div>

      </footer>
    </>
  )
}