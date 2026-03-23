import { skillColors } from "../services/karyanusaData"

type Props = { skill: string | null }

const skillGaps: Record<string, { gap: string; priority: "high" | "medium" | "low"; resource: string }[]> = {
  "Programming": [
    { gap: "Version Control dengan Git & GitHub", priority: "high", resource: "Git Handbook — gratis di git-scm.com" },
    { gap: "Deploy aplikasi ke cloud (Vercel/Railway)", priority: "high", resource: "Dokumentasi resmi Vercel" },
    { gap: "Testing & debugging yang terstruktur", priority: "medium", resource: "Jest Documentation" },
    { gap: "Keamanan web dasar (SQL injection, XSS)", priority: "medium", resource: "OWASP Top 10" },
    { gap: "Membaca & menulis dokumentasi teknis", priority: "low", resource: "Google Technical Writing" },
  ],
  "Desain Grafis": [
    { gap: "Branding strategy & brand identity", priority: "high", resource: "Brand Identity Essentials — buku/Coursera" },
    { gap: "UI/UX research & user testing", priority: "high", resource: "Google UX Design Certificate" },
    { gap: "Motion design & micro-animation", priority: "medium", resource: "After Effects untuk desainer" },
    { gap: "Copywriting untuk materi visual", priority: "medium", resource: "The Copywriter's Handbook" },
    { gap: "Pricing & negosiasi dengan klien", priority: "low", resource: "Komunitas desainer lokal" },
  ],
  "Fotografi": [
    { gap: "Pencahayaan studio profesional", priority: "high", resource: "Strobist.com — panduan lighting gratis" },
    { gap: "Color grading & editing konsisten", priority: "high", resource: "Adobe Lightroom Masterclass" },
    { gap: "Foto untuk platform stock (komposisi SEO)", priority: "medium", resource: "Panduan contributor Shutterstock" },
    { gap: "Videografi & konten hybrid foto-video", priority: "medium", resource: "YouTube Creator Academy" },
    { gap: "Kontrak & lisensi foto profesional", priority: "low", resource: "Template kontrak fotografer" },
  ],
  "Menulis": [
    { gap: "SEO writing & optimasi konten", priority: "high", resource: "Ahrefs Blog — gratis & lengkap" },
    { gap: "Storytelling & narrative structure", priority: "high", resource: "Story oleh Robert McKee" },
    { gap: "Content strategy & editorial calendar", priority: "medium", resource: "HubSpot Content Marketing Course" },
    { gap: "Email marketing & newsletter", priority: "medium", resource: "Substack Masterclass" },
    { gap: "Riset & fact-checking profesional", priority: "low", resource: "Poynter Institute resources" },
  ],
  "Marketing": [
    { gap: "Data analytics & Google Analytics 4", priority: "high", resource: "Google Analytics Academy — gratis" },
    { gap: "Conversion rate optimization (CRO)", priority: "high", resource: "CXL Institute free courses" },
    { gap: "Email marketing & automation", priority: "medium", resource: "Mailchimp Academy" },
    { gap: "Influencer & partnership marketing", priority: "medium", resource: "CreatorIQ resources" },
    { gap: "Performance marketing reporting", priority: "low", resource: "Meta Blueprint" },
  ],
  "Public Speaking": [
    { gap: "Storytelling & struktur presentasi", priority: "high", resource: "TED Masterclass — berbayar" },
    { gap: "Manajemen panggung & body language", priority: "high", resource: "Toastmasters International" },
    { gap: "Fasilitasi workshop & training", priority: "medium", resource: "Facilitator's Guide to Participatory Decision-Making" },
    { gap: "Personal branding & thought leadership", priority: "medium", resource: "LinkedIn Learning" },
    { gap: "Monetisasi & negosiasi fee pembicara", priority: "low", resource: "Komunitas speaker Indonesia" },
  ],
}

const priorityConfig = {
  high:   { label: "Prioritas Tinggi", color: "#DC2626", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)"  },
  medium: { label: "Prioritas Sedang", color: "#D97706", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)" },
  low:    { label: "Prioritas Rendah", color: "#1F7A63", bg: "rgba(31,122,99,0.08)",   border: "rgba(31,122,99,0.2)"  },
}

export default function SkillGapAnalyzer({ skill }: Props) {
  if (!skill) return null

  const gaps = skillGaps[skill] ?? []
  const cfg = skillColors[skill]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .gap-section { font-family: 'Plus Jakarta Sans', sans-serif; }
        .gap-card { background: #fff; border-radius: 12px; border: 1.5px solid #EEF0F4; padding: 14px 16px; display: flex; align-items: flex-start; gap: 12px; transition: all 0.2s; }
        .gap-card:hover { border-color: #CBD5E1; box-shadow: 0 4px 14px rgba(30,58,95,0.07); transform: translateX(4px); }
      `}</style>

      <section className="gap-section py-14 sm:py-16" style={{ background: "#F8FAFB" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-6">

          <div className="text-center mb-8">
            <span style={{ display: "inline-block", background: cfg?.bg ?? "rgba(31,122,99,0.09)", color: cfg?.color ?? "#1F7A63", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "100px", marginBottom: "12px", border: `1px solid ${cfg?.border ?? "rgba(31,122,99,0.18)"}` }}>
              Skill Gap Analyzer
            </span>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.02em" }}>
              Area yang Perlu <span style={{ color: cfg?.color ?? "#1F7A63" }}>Ditingkatkan</span>
            </h2>
            <p style={{ marginTop: "8px", color: "#64748B", fontSize: "0.9rem" }}>
              5 skill gap paling umum untuk {skill} — beserta rekomendasi resource belajarnya.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {gaps.map((item, i) => {
              const p = priorityConfig[item.priority]
              return (
                <div key={i} className="gap-card">
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#F1F5F9", color: "#1E3A5F", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1E3A5F" }}>{item.gap}</span>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: p.color, background: p.bg, border: `1px solid ${p.border}`, borderRadius: "100px", padding: "2px 8px", flexShrink: 0 }}>{p.label}</span>
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#94A3B8", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ flexShrink: 0 }}>Belajar dari:</span>
                      <span style={{ color: "#64748B", fontWeight: 500 }}>{item.resource}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ marginTop: 20, background: "linear-gradient(135deg, rgba(31,122,99,0.07), rgba(30,58,95,0.05))", borderRadius: 12, padding: "14px 18px", border: "1px solid rgba(31,122,99,0.12)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 22, flexShrink: 0 }}>💡</div>
            <p style={{ fontSize: "0.83rem", color: "#475569", lineHeight: 1.65 }}>
              Fokus pada <strong style={{ color: "#1E3A5F" }}>Prioritas Tinggi</strong> dulu sebelum lanjut ke yang lain. Menguasai 1 skill gap secara mendalam lebih berharga dari belajar 5 sekaligus.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}