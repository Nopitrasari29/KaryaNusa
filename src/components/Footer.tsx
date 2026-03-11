export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        .footer-section { font-family: 'Plus Jakarta Sans', sans-serif; }
        .footer-link { background: none; border: none; cursor: pointer; font-size: 0.88rem; color: rgba(255,255,255,0.5); font-family: 'Plus Jakarta Sans', sans-serif; transition: color 0.2s; padding: 0; text-align: left; }
        .footer-link:hover { color: #D4AF37; }
        .footer-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
        @media (min-width: 640px) { .footer-grid { grid-template-columns: repeat(3, 1fr); } }
      `}</style>

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
              <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.7, maxWidth: "220px" }}>
                Platform AI yang membantu masyarakat menemukan peluang ekonomi dari keterampilan mereka.
              </p>
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
                  <span key={l} style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.42)" }}>{l}</span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "14px 20px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
            © 2026 KARYANUSA — Empowering Skills into Economic Opportunities
          </p>
        </div>

      </footer>
    </>
  )
}