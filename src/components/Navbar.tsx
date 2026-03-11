import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        .navbar { font-family: 'Plus Jakarta Sans', sans-serif; position: sticky; top: 0; z-index: 50; background: #1E3A5F; box-shadow: 0 2px 16px rgba(15,35,55,0.25); }
        .nav-link { font-size: 0.9rem; font-weight: 500; color: rgba(255,255,255,0.75); background: none; border: none; cursor: pointer; padding: 6px 4px; position: relative; transition: color 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: #D4AF37; border-radius: 2px; transition: width 0.25s ease; }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }
        .nav-btn { background: linear-gradient(135deg, #1F7A63, #25957A); color: #fff; border: none; border-radius: 10px; padding: 9px 22px; font-size: 0.88rem; font-weight: 600; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.2s ease; box-shadow: 0 3px 12px rgba(31,122,99,0.4); }
        .nav-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(31,122,99,0.45); }
        .mobile-link { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.95rem; font-weight: 500; color: rgba(255,255,255,0.8); background: none; border: none; cursor: pointer; padding: 14px 0; text-align: left; width: 100%; border-bottom: 1px solid rgba(255,255,255,0.08); transition: color 0.2s; }
        .mobile-link:hover { color: #D4AF37; }
      `}</style>

      <nav className="navbar">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <button onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 700, fontSize: "1.2rem", color: "#fff", letterSpacing: "-0.01em" }}>KARYANUSA</span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1F7A63", display: "inline-block", marginBottom: 8 }} />
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <button className="nav-link" onClick={() => scrollTo("discover")}>Discover</button>
            <button className="nav-link" onClick={() => scrollTo("assistant")}>AI Assistant</button>
            <button className="nav-btn" onClick={() => scrollTo("discover")}>Get Started</button>
          </div>

          {/* Mobile toggle — ☰ or ✕ */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: "20px", padding: "4px", lineHeight: 1 }}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden" style={{ background: "#1E3A5F", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "8px 20px 20px" }}>
            <button className="mobile-link" onClick={() => scrollTo("discover")}>Discover</button>
            <button className="mobile-link" onClick={() => scrollTo("assistant")}>AI Assistant</button>
            <button className="nav-btn" onClick={() => scrollTo("discover")} style={{ marginTop: 14, width: "100%" }}>Get Started</button>
          </div>
        )}
      </nav>
    </>
  )
}