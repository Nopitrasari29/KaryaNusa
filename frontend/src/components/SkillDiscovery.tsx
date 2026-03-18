import { useState } from "react"
import axios from "axios"

type Props = { onSelectSkill: (skill: string, score: number) => void }

type Question = {
  id: number
  question: string
  options: { label: string; skills: string[]; points: number }[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "Aktivitas apa yang paling sering kamu lakukan di waktu luang?",
    options: [
      { label: "🎨 Menggambar, mendesain, atau membuat sesuatu secara visual", skills: ["Desain Grafis"], points: 3 },
      { label: "💻 Ngoding, utak-atik website, atau belajar programming", skills: ["Programming"], points: 3 },
      { label: "📷 Foto-foto, rekam video, atau edit konten", skills: ["Fotografi"], points: 3 },
      { label: "✍️ Nulis, bikin konten, atau journaling", skills: ["Menulis"], points: 3 },
    ],
  },
  {
    id: 2,
    question: "Teman-teman sering minta bantuan kamu dalam hal apa?",
    options: [
      { label: "🖼️ Bikin poster, logo, atau desain untuk acara mereka", skills: ["Desain Grafis"], points: 3 },
      { label: "🔧 Benerin atau bikin website/aplikasi mereka", skills: ["Programming"], points: 3 },
      { label: "📸 Fotoin momen penting atau edit foto mereka", skills: ["Fotografi"], points: 3 },
      { label: "🎤 Bantu nulis speech, caption, atau presentasi", skills: ["Menulis", "Public Speaking"], points: 2 },
    ],
  },
  {
    id: 3,
    question: "Kalau dapat uang Rp 5 juta, kamu paling mau invest ke apa?",
    options: [
      { label: "🖥️ Software desain premium (Adobe, Figma Pro, dll)", skills: ["Desain Grafis"], points: 2 },
      { label: "📚 Kursus coding atau langganan platform belajar tech", skills: ["Programming"], points: 2 },
      { label: "📷 Kamera, lensa, atau peralatan studio", skills: ["Fotografi"], points: 2 },
      { label: "📣 Iklan digital atau tools marketing/analytics", skills: ["Marketing"], points: 2 },
    ],
  },
  {
    id: 4,
    question: "Konten atau topik apa yang paling sering kamu konsumsi online?",
    options: [
      { label: "🎨 Tutorial desain, inspirasi UI/UX, atau branding", skills: ["Desain Grafis"], points: 2 },
      { label: "💡 Tutorial coding, tech news, atau open source projects", skills: ["Programming"], points: 2 },
      { label: "📸 Tips fotografi, videografi, atau editing", skills: ["Fotografi"], points: 2 },
      { label: "📊 Tips bisnis, marketing digital, atau growth hacking", skills: ["Marketing"], points: 2 },
    ],
  },
  {
    id: 5,
    question: "Pernah menghasilkan uang dari aktivitas apa sebelumnya?",
    options: [
      { label: "🖌️ Jasa desain, edit foto/video, atau bikin konten visual", skills: ["Desain Grafis", "Fotografi"], points: 3 },
      { label: "💻 Bikin website, freelance coding, atau jualan template", skills: ["Programming"], points: 3 },
      { label: "✍️ Nulis artikel, copywriting, atau jadi ghostwriter", skills: ["Menulis"], points: 3 },
      { label: "🎤 Jadi MC, ngisi seminar, atau public speaking berbayar", skills: ["Public Speaking"], points: 3 },
    ],
  },
  {
    id: 6,
    question: "Kalau harus presentasi atau tampil di depan orang banyak, kamu...",
    options: [
      { label: "😎 Suka banget, itu zona nyaman aku", skills: ["Public Speaking"], points: 3 },
      { label: "😊 Oke-oke aja, bisa kalau perlu", skills: ["Marketing"], points: 1 },
      { label: "😅 Kurang nyaman, lebih suka kerja di belakang layar", skills: ["Programming", "Desain Grafis"], points: 1 },
      { label: "📝 Lebih suka komunikasi lewat tulisan atau visual", skills: ["Menulis", "Desain Grafis"], points: 2 },
    ],
  },
  {
    id: 7,
    question: "Kamu paling bangga kalau berhasil...",
    options: [
      { label: "🎯 Bikin desain yang orang bilang 'keren banget!'", skills: ["Desain Grafis"], points: 3 },
      { label: "🚀 Nge-launch app atau website yang beneran dipakai orang", skills: ["Programming"], points: 3 },
      { label: "📸 Foto/video kamu di-repost atau viral", skills: ["Fotografi"], points: 3 },
      { label: "💰 Dapet klien pertama dari skill yang kamu jual", skills: ["Marketing", "Menulis", "Public Speaking"], points: 2 },
    ],
  },
  {
    id: 8,
    question: "Ketika menghadapi masalah baru dalam sebuah proyek, kamu biasanya...",
    options: [
      { label: "🔍 Mencari cara teknis untuk memecahkan masalah tersebut", skills: ["Programming"], points: 3 },
      { label: "🎨 Membuat konsep visual untuk menjelaskan solusi", skills: ["Desain Grafis"], points: 3 },
      { label: "📷 Mengamati detail dan menangkap momen atau perspektif unik", skills: ["Fotografi"], points: 3 },
      { label: "✍️ Menyusun penjelasan atau dokumentasi yang jelas", skills: ["Menulis"], points: 3 },
    ],
  },
  {
    id: 9,
    question: "Dalam sebuah tim proyek, peran apa yang paling nyaman kamu ambil?",
    options: [
      { label: "🛠️ Orang yang membangun sistem atau teknologinya", skills: ["Programming"], points: 3 },
      { label: "🎨 Orang yang merancang tampilan atau visual proyek", skills: ["Desain Grafis"], points: 3 },
      { label: "📢 Orang yang mempromosikan dan mengenalkan produk ke publik", skills: ["Marketing"], points: 3 },
      { label: "🎤 Orang yang menjelaskan ide proyek kepada banyak orang", skills: ["Public Speaking"], points: 3 },
    ],
  },
  {
    id: 10,
    question: "Jika diberi waktu 1 minggu untuk membuat sesuatu dari nol, kamu lebih tertarik membuat...",
    options: [
      { label: "💻 Sebuah aplikasi atau website sederhana", skills: ["Programming"], points: 3 },
      { label: "🎨 Brand visual atau desain produk digital", skills: ["Desain Grafis"], points: 3 },
      { label: "📸 Seri foto atau video kreatif", skills: ["Fotografi"], points: 3 },
      { label: "✍️ Artikel, blog, atau konten edukasi", skills: ["Menulis"], points: 3 },
    ],
  },  
]

const skillColors: Record<string, { bg: string; border: string; color: string; icon: string }> = {
  "Desain Grafis":   { bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", color: "#6366F1", icon: "🎨" },
  "Programming":     { bg: "rgba(31,122,99,0.08)",  border: "rgba(31,122,99,0.2)",  color: "#1F7A63", icon: "💻" },
  "Fotografi":       { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", color: "#D97706", icon: "📷" },
  "Menulis":         { bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.2)", color: "#DB2777", icon: "✍️" },
  "Marketing":       { bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)",  color: "#DC2626", icon: "📣" },
  "Public Speaking": { bg: "rgba(201,168,76,0.08)", border: "rgba(201,168,76,0.2)", color: "#B8942A", icon: "🎤" },
}

function detectSkill(answers: number[]): { skill: string; score: number; allScores: Record<string, number> } {
  const scores: Record<string, number> = {
    "Desain Grafis": 0, "Programming": 0, "Fotografi": 0,
    "Menulis": 0, "Marketing": 0, "Public Speaking": 0,
  }
  answers.forEach((optIdx, qIdx) => {
    const opt = questions[qIdx].options[optIdx]
    opt.skills.forEach(skill => { scores[skill] = (scores[skill] || 0) + opt.points })
  })
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
  const maxPossible = 21
  const score = Math.min(Math.round((top[1] / maxPossible) * 100), 98)
  return { skill: top[0], score, allScores: scores }
}

export default function SkillDiscovery({ onSelectSkill }: Props) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [result, setResult] = useState<{ 
    skill: string; 
    score: number; 
    allScores: Record<string, number>; 
    reasoning?: string; 
  } | null>(null)
  const [animating, setAnimating] = useState(false)

  const handleSelect = (optIdx: number) => { setSelected(optIdx) }

  const handleNext = async () => {
    if (selected === null) return
    const newAnswers = [...answers, selected]

    if (current < questions.length - 1) {
      setAnimating(true)
      setTimeout(() => {
        setAnswers(newAnswers)
        setCurrent(current + 1)
        setSelected(null)
        setAnimating(false)
      }, 250)
    } else {
      setAnimating(true);
      setAnswers(newAnswers);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/skill/analyze`, {
          sessionId: localStorage.getItem('karyanusa_session') || 'sess-' + Date.now(),
          answers: newAnswers,
          questionnaireData: newAnswers.map((ans, idx) => ({ 
            q: questions[idx].question, 
            a: questions[idx].options[ans].label 
          }))
        });

        // Simpan SessionID dan Skill ke memory browser
        localStorage.setItem('karyanusa_session', response.data.sessionId);
        localStorage.setItem('user_identified_skill', response.data.skillResult);

        // Ambil hitungan bar grafik secara lokal agar tidak hilang
        const localStats = detectSkill(newAnswers); 

        setResult({
          skill: response.data.skillResult,
          score: response.data.confidenceScore,
          reasoning: response.data.reasoning, // Penjelasan dari AI muncul di sini!
          allScores: localStats.allScores
        });
        
        onSelectSkill(response.data.skillResult, response.data.confidenceScore);
      } catch (error) {
        console.error("Koneksi AI Gagal, pakai backup lokal", error);
        const res = detectSkill(newAnswers);
        setResult(res);
      } finally {
        setAnimating(false);
      }
    }
  }

  const handleBack = () => {
    if (current === 0) return
    setCurrent(current - 1)
    setAnswers(answers.slice(0, -1))
    setSelected(null)
  }

  const handleReset = () => {
    setCurrent(0); setAnswers([]); setSelected(null); setResult(null)
  }

  const progress = ((current) / questions.length) * 100

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .skill-section { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes fadeSlide { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes fillBar { from { width: 0%; } to { width: var(--target-width); } }

        .q-enter { animation: fadeSlide 0.3s ease both; }
        .result-enter { animation: scaleIn 0.4s ease both; }

        .opt-btn {
          width: 100%; text-align: left; background: #fff;
          border: 1.5px solid #EEF0F4; border-radius: 12px;
          padding: 13px 16px; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem; color: #1E3A5F; font-weight: 500;
          transition: all 0.18s ease; display: flex; align-items: center; gap: 10px;
        }
        .opt-btn:hover { border-color: #1F7A63; background: rgba(31,122,99,0.03); transform: translateX(3px); }
        .opt-btn.selected { border-color: #1F7A63; background: rgba(31,122,99,0.07); color: #1F7A63; font-weight: 600; }
        .opt-btn.selected .opt-check { opacity: 1; transform: scale(1); }

        .opt-check { width: 20px; height: 20px; border-radius: 50%; background: #1F7A63; color: #fff; font-size: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: auto; opacity: 0; transform: scale(0.5); transition: all 0.18s; }

        .next-btn { background: linear-gradient(135deg, #1F7A63, #25957A); color: #fff; border: none; border-radius: 11px; padding: 12px 28px; font-weight: 600; font-size: 0.95rem; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.2s; box-shadow: 0 4px 14px rgba(31,122,99,0.28); }
        .next-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 7px 20px rgba(31,122,99,0.36); }
        .next-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }

        .back-btn { background: none; border: 1.5px solid #E2E8F0; border-radius: 11px; padding: 12px 20px; font-weight: 500; font-size: 0.95rem; cursor: pointer; color: #64748B; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.18s; }
        .back-btn:hover { border-color: #94A3B8; color: #1E3A5F; }

        .score-ring { position: relative; width: 120px; height: 120px; }
        .score-ring svg { transform: rotate(-90deg); }
        .score-ring .track { fill: none; stroke: #EEF0F4; stroke-width: 8; }
        .score-ring .fill { fill: none; stroke: #1F7A63; stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset 1.5s ease; }
        .score-num { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); text-align: center; }

        .bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #1F7A63, #25957A); transition: width 1s ease; }

        .skill-result-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 100px; font-weight: 700; font-size: 1rem; }
      `}</style>

      <section id="discover" className="skill-section py-14 sm:py-16" style={{ background: "#F6F5F2" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-6">

          {/* Header */}
          <div className="text-center mb-8">
            <span style={{ display: "inline-block", background: "rgba(31,122,99,0.09)", color: "#1F7A63", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "100px", marginBottom: "12px", border: "1px solid rgba(31,122,99,0.18)" }}>
              {result ? "Hasil Analisis" : `Pertanyaan ${current + 1} dari ${questions.length}`}
            </span>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {result ? "Skill Kamu Teridentifikasi!" : <>Temukan <span style={{ color: "#1F7A63" }}>Skill Kamu</span></>}
            </h2>
            {!result && (
              <p style={{ marginTop: "8px", color: "#64748B", fontSize: "0.92rem" }}>
                Jawab jujur — AI akan menganalisis skill terbaikmu secara akurat.
              </p>
            )}
          </div>

          {/* ── RESULT ── */}
          {result ? (
            <div className="result-enter" style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 24px rgba(30,58,95,0.08)", border: "1px solid #EEF0F4" }}>

              {/* Top: skill + score */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
                {/* Score ring */}
                <div className="score-ring" style={{ flexShrink: 0 }}>
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle className="track" cx="60" cy="60" r="52" />
                    <circle
                      className="fill"
                      cx="60" cy="60" r="52"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${2 * Math.PI * 52 * (1 - result.score / 100)}`}
                    />
                  </svg>
                  <div className="score-num">
                    <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: "1.6rem", color: "#1F7A63", lineHeight: 1 }}>{result.score}%</div>
                    <div style={{ fontSize: "10px", color: "#94A3B8", marginTop: 2 }}>match</div>
                  </div>
                </div>

                {/* Skill info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "12px", color: "#94A3B8", marginBottom: 6 }}>Skill Dominan Kamu</div>
                  <div className="skill-result-badge" style={{ background: skillColors[result.skill]?.bg, border: `1.5px solid ${skillColors[result.skill]?.border}`, color: skillColors[result.skill]?.color, marginBottom: 10 }}>
                    <span>{skillColors[result.skill]?.icon}</span>
                    {result.skill}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.65 }}>
                    Berdasarkan jawaban kamu, AI mendeteksi kamu punya potensi kuat di bidang <strong style={{ color: "#1E3A5F" }}>{result.skill}</strong>. Scroll ke bawah untuk lihat peluang usahanya! 👇
                  </p>
                </div>
              </div>

              {/* All skill scores */}
              <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 18, marginBottom: 20 }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", letterSpacing: "0.05em", marginBottom: 12 }}>BREAKDOWN SEMUA SKILL</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {Object.entries(result.allScores)
                    .sort((a, b) => b[1] - a[1])
                    .map(([skill, pts]) => {
                      const max = Math.max(...Object.values(result.allScores))
                      const pct = max > 0 ? Math.round((pts / max) * 100) : 0
                      const cfg = skillColors[skill]
                      return (
                        <div key={skill}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: "12px", fontWeight: 500, color: "#1E3A5F" }}>{cfg?.icon} {skill}</span>
                            <span style={{ fontSize: "12px", color: "#94A3B8" }}>{pts} pts</span>
                          </div>
                          <div style={{ height: 7, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
                            <div className="bar-fill" style={{ width: `${pct}%`, background: skill === result.skill ? `linear-gradient(90deg, ${cfg?.color}, ${cfg?.color}88)` : "#CBD5E1" }} />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={handleReset}
                  style={{ flex: 1, background: "none", border: "1.5px solid #E2E8F0", borderRadius: 11, padding: "11px 16px", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer", color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.18s" }}
                >
                  🔄 Ulangi Tes
                </button>
                <button
                  onClick={() => document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" })}
                  className="next-btn"
                  style={{ flex: 2 }}
                >
                  Lihat Peluang Usaha →
                </button>
              </div>
            </div>

          ) : (
            /* ── QUESTIONNAIRE ── */
            <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 24px rgba(30,58,95,0.08)", border: "1px solid #EEF0F4" }}>

              {/* Progress bar */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: "12px", color: "#94A3B8" }}>Progress</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#1F7A63" }}>{current}/{questions.length}</span>
                </div>
                <div style={{ height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #1F7A63, #25957A)", borderRadius: 3, transition: "width 0.4s ease" }} />
                </div>
                {/* Step dots */}
                <div style={{ display: "flex", gap: 6, marginTop: 8, justifyContent: "center" }}>
                  {questions.map((_, i) => (
                    <div key={i} style={{ width: i === current ? 20 : 8, height: 8, borderRadius: 4, background: i < current ? "#1F7A63" : i === current ? "#1F7A63" : "#E2E8F0", transition: "all 0.3s ease" }} />
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className={animating ? "" : "q-enter"} key={current}>
                <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 700, fontSize: "1.05rem", color: "#1E3A5F", lineHeight: 1.5, marginBottom: 18 }}>
                  {questions[current].question}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {questions[current].options.map((opt, i) => (
                    <button
                      key={i}
                      className={`opt-btn ${selected === i ? "selected" : ""}`}
                      onClick={() => handleSelect(i)}
                    >
                      <span style={{ fontSize: "0.9rem" }}>{opt.label}</span>
                      <div className="opt-check">✓</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nav buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
                <button className="back-btn" onClick={handleBack} disabled={current === 0} style={{ opacity: current === 0 ? 0.4 : 1 }}>
                  ← Kembali
                </button>
                <button className="next-btn" onClick={handleNext} disabled={selected === null}>
                  {current === questions.length - 1 ? "Lihat Hasil 🎯" : "Lanjut →"}
                </button>
              </div>

            </div>
          )}

        </div>
      </section>
    </>
  )
}