import { useState } from "react"
import { communityPosts } from "../services/karyanusaData"

export default function CommunityBoard() {
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({})
  const [filterSkill, setFilterSkill] = useState("Semua")

  const filtered = filterSkill === "Semua"
    ? communityPosts
    : communityPosts.filter(p => p.skill === filterSkill)

  const skills = ["Semua", ...Array.from(new Set(communityPosts.map(p => p.skill)))]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .community-section { font-family: 'Plus Jakarta Sans', sans-serif; }
        .comm-grid { columns: 3; column-gap: 16px; }
        @media(max-width:768px){ .comm-grid{columns:2;} }
        @media(max-width:480px){ .comm-grid{columns:1;} }
        .comm-card { break-inside:avoid; background:#fff; border-radius:14px; padding:16px; margin-bottom:14px; border:1px solid #EEF0F4; transition:all .2s; display:inline-block; width:100%; }
        .comm-card:hover { box-shadow:0 5px 18px rgba(30,58,95,0.09); transform:translateY(-2px); }
        .filter-btn { background:#fff; border:1.5px solid #E2E8F0; border-radius:100px; padding:6px 14px; font-size:.8rem; font-weight:600; color:#64748B; cursor:pointer; transition:all .18s; font-family:'Plus Jakarta Sans',sans-serif; }
        .filter-btn:hover { border-color:#1F7A63; color:#1F7A63; }
        .filter-btn.active { background:#1F7A63; border-color:#1F7A63; color:#fff; }
        .like-btn { background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:5px; font-size:.8rem; font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; padding:0; transition:color .18s; }
      `}</style>

      <section className="community-section py-14 sm:py-16" style={{ background: "#F6F5F2" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          <div className="text-center mb-8">
            <span style={{ display: "inline-block", background: "rgba(31,122,99,0.09)", color: "#1F7A63", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "100px", marginBottom: "12px", border: "1px solid rgba(31,122,99,0.18)" }}>
              Komunitas
            </span>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.02em" }}>
              Mereka Sudah <span style={{ color: "#1F7A63" }}>Membuktikannya</span>
            </h2>
            <p style={{ marginTop: "8px", color: "#64748B", fontSize: "0.92rem" }}>
              Cerita nyata dari pengguna KARYANUSA yang berhasil monetisasi skill mereka.
            </p>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20, justifyContent: "center" }}>
            {skills.map(s => (
              <button key={s} className={`filter-btn ${filterSkill === s ? "active" : ""}`} onClick={() => setFilterSkill(s)}>{s}</button>
            ))}
          </div>

          {/* Pinterest grid */}
          <div className="comm-grid">
            {filtered.map((post, i) => (
              <div key={i} className="comm-card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: post.bg, border: `1.5px solid ${post.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {post.avatar}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: ".88rem", color: "#1E3A5F" }}>{post.name}</div>
                    <div style={{ fontSize: "10px", color: "#94A3B8" }}>{post.time}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: post.color, background: post.bg, borderRadius: "100px", padding: "2px 8px" }}>{post.skill}</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#64748B", background: "#F1F5F9", borderRadius: "100px", padding: "2px 8px" }}>{post.badge}</span>
                </div>
                <p style={{ fontSize: ".85rem", color: "#475569", lineHeight: 1.65, marginBottom: 10 }}>{post.text}</p>
                <button
                  className="like-btn"
                  style={{ color: likedPosts[i] ? "#EF4444" : "#94A3B8" }}
                  onClick={() => setLikedPosts(prev => ({ ...prev, [i]: !prev[i] }))}
                >
                  {likedPosts[i] ? "❤️" : "🤍"} {post.likes + (likedPosts[i] ? 1 : 0)}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}