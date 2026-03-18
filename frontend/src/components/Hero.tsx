export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        .hero-section { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.6); opacity: 0.3; }
        }
        @keyframes blobMove {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(14px,-10px) scale(1.04); }
        }
        @keyframes rowSlideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .anim-1 { animation: fadeUp 0.65s ease both; }
        .anim-2 { animation: fadeUp 0.65s ease 0.12s both; }
        .anim-3 { animation: fadeUp 0.65s ease 0.22s both; }
        .anim-4 { animation: fadeUp 0.65s ease 0.34s both; }
        .anim-card { animation: fadeUp 0.65s ease 0.15s both, cardFloat 5s ease-in-out 1s infinite; }
        .row-1 { animation: rowSlideIn 0.4s ease 0.55s both; }
        .row-2 { animation: rowSlideIn 0.4s ease 0.7s both; }
        .row-3 { animation: rowSlideIn 0.4s ease 0.85s both; }

        .gold-shimmer {
          background: linear-gradient(90deg, #C9A84C, #F0D060, #C9A84C, #A8832A);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3.5s linear infinite;
        }

        .btn-primary-hero {
          background: linear-gradient(135deg, #1F7A63, #25957A);
          color: #fff; font-weight: 600; padding: 14px 28px; border-radius: 13px; border: none;
          cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 18px rgba(31,122,99,0.32); white-space: nowrap;
        }
        .btn-primary-hero:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(31,122,99,0.42); }

        .btn-secondary-hero {
          background: transparent; color: #1E3A5F; font-weight: 600;
          padding: 14px 28px; border-radius: 13px; border: 1.5px solid #CBD5E1;
          cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px;
          transition: all 0.2s ease; white-space: nowrap;
        }
        .btn-secondary-hero:hover { border-color: #1F7A63; color: #1F7A63; background: rgba(31,122,99,0.04); }

        .hero-card {
          background: #fff; border-radius: 22px; padding: 26px;
          box-shadow: 0 20px 56px rgba(30,58,95,0.12), 0 4px 14px rgba(30,58,95,0.06);
          border: 1px solid rgba(30,58,95,0.07);
        }
        .card-row {
          display: flex; align-items: center; gap: 11px;
          padding: 12px 14px; border-radius: 11px; margin-bottom: 9px;
        }
        .card-row-neutral { background: #F8F9FB; }
        .card-row-green   { background: rgba(31,122,99,0.08); border: 1px solid rgba(31,122,99,0.14); }
        .card-row-gold    { background: rgba(212,175,55,0.07); border: 1px solid rgba(212,175,55,0.18); }

        .stat-num   { font-family: 'Lora', serif; font-size: 1.5rem; font-weight: 700; color: #1F7A63; }
        .stat-label { font-size: 12px; color: #94A3B8; margin-top: 2px; }
        .stat-divider { width: 1px; height: 30px; background: #E2E8F0; }

        .btn-hero-wrap { display: flex; flex-direction: column; gap: 12px; }
        @media (min-width: 480px) { .btn-hero-wrap { flex-direction: row; } }
      `}</style>

      <section id="home" className="hero-section relative overflow-hidden" style={{
        background: "linear-gradient(155deg, #EEF6F4 0%, #F6F5F2 55%, #EBF1F8 100%)",
        paddingTop: "100px",
        paddingBottom: "100px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}>
        {/* Blobs */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(31,122,99,0.1) 0%, transparent 70%)", animation: "blobMove 9s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", animation: "blobMove 11s ease-in-out infinite reverse" }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <div className="anim-1 inline-flex items-center gap-2 mb-6" style={{ background: "rgba(31,122,99,0.09)", border: "1px solid rgba(31,122,99,0.22)", borderRadius: "100px", padding: "7px 16px" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1F7A63", display: "inline-block", animation: "pulseDot 2s ease-in-out infinite" }} />
                <span style={{ fontSize: "13px", color: "#1F7A63", fontWeight: 500 }}>Platform AI · Gratis untuk Semua</span>
              </div>

              <h1 className="anim-2" style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.12, color: "#1E3A5F", letterSpacing: "-0.025em", marginBottom: "1.4rem" }}>
                Temukan Potensi<br />
                <span className="gold-shimmer">Keterampilanmu</span><br />
                <span style={{ color: "#1F7A63" }}>dengan AI</span>
              </h1>

              <p className="anim-3" style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#64748B", maxWidth: "460px", marginBottom: "2rem" }}>
                Platform AI yang membantu masyarakat mengubah skill sehari-hari menjadi{" "}
                <strong style={{ color: "#1E3A5F", fontWeight: 600 }}>peluang ekonomi nyata</strong>{" "}
                — tanpa perlu pengalaman bisnis sebelumnya.
              </p>

              <div className="anim-3 btn-hero-wrap" style={{ marginBottom: "2.5rem" }}>
                <button className="btn-primary-hero" onClick={() => scrollTo("discover")}>🚀 Mulai Analisis Skill</button>
                <button className="btn-secondary-hero" onClick={() => scrollTo("assistant")}>Coba AI Assistant →</button>
              </div>

              <div className="anim-4" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                {[
                  { num: "10K+", label: "Pengguna Aktif" },
                  { num: "50+",  label: "Peluang Usaha" },
                  { num: "95%",  label: "Kepuasan User" },
                ].map((s, i) => (
                  <>
                    <div key={s.num}>
                      <div className="stat-num">{s.num}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                    {i < 2 && <div className="stat-divider" key={`d${i}`} />}
                  </>
                ))}
              </div>
            </div>

            {/* Right: Card */}
            <div className="anim-card">
              <div className="hero-card">
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg, #1F7A63, #25957A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>🤖</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: "#1E3A5F", fontSize: 15 }}>AI Skill Analysis</div>
                    <div style={{ fontSize: 12, color: "#94A3B8" }}>Menganalisis potensi kamu...</div>
                  </div>
                  <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                  </div>
                </div>

                <div className="card-row card-row-neutral row-1">
                  <span style={{ fontSize: 20, flexShrink: 0 }}>💻</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>Skill Terdeteksi</div>
                    <div style={{ fontWeight: 600, color: "#1E3A5F", fontSize: 14 }}>Programming</div>
                  </div>
                </div>
                <div className="card-row card-row-green row-2">
                  <span style={{ fontSize: 20, flexShrink: 0 }}>🎯</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#1F7A63" }}>Peluang Terbaik</div>
                    <div style={{ fontWeight: 600, color: "#1F7A63", fontSize: 14 }}>Freelance Developer</div>
                  </div>
                </div>
                <div className="card-row card-row-gold row-3" style={{ marginBottom: 0 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>📈</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#B8942A" }}>Market Demand</div>
                    <div style={{ fontWeight: 600, color: "#C9A84C", fontSize: 14 }}>High</div>
                  </div>
                  <div style={{ width: 64, height: 6, borderRadius: 3, background: "rgba(212,175,55,0.15)", overflow: "hidden", flexShrink: 0 }}>
                    <div style={{ width: "85%", height: "100%", background: "linear-gradient(90deg,#C9A84C,#F0D060)", borderRadius: 3 }} />
                  </div>
                </div>

                <button className="btn-primary-hero" onClick={() => scrollTo("discover")} style={{ width: "100%", marginTop: 18, textAlign: "center" }}>
                  Analisis Skillmu Sekarang ✨
                </button>
                <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", marginTop: 10 }}>
                  🔒 Gratis · Tanpa daftar · Hasil instan
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}