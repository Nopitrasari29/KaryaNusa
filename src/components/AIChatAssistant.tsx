import { useState, useRef, useEffect } from "react"

type Message = { role: "user" | "ai"; text: string; typing?: boolean }

const suggestedQuestions = [
  "Skill apa yang paling menghasilkan?",
  "Cara mulai freelance dari nol?",
  "Bagaimana memasarkan produk digital?",
]

const dummyReplies = [
  "Berdasarkan pertanyaan kamu, ada beberapa langkah yang bisa dimulai sekarang:\n\n1. Identifikasi skill utama yang kamu kuasai\n2. Riset pasar dan kompetitor di bidang tersebut\n3. Buat portofolio sederhana sebagai bukti kemampuan\n4. Mulai tawarkan jasa ke lingkaran terdekat dulu\n\nSkill apa yang paling ingin kamu kembangkan lebih lanjut?",
  "Untuk memulai freelance dari nol, kunci utamanya adalah konsistensi dan membangun kepercayaan klien.\n\nCoba mulai dengan:\n• Bergabung di komunitas freelancer online\n• Ambil 1–2 proyek kecil untuk membangun reputasi\n• Minta testimoni dari klien pertama\n\nApakah kamu sudah punya gambaran target pasar yang ingin dituju?",
  "Strategi pemasaran digital yang efektif untuk pemula biasanya dimulai dari platform yang sudah kamu gunakan sehari-hari.\n\nBeberapa cara yang terbukti:\n✅ Optimasi profil LinkedIn dan Instagram\n✅ Bagikan konten edukatif sesuai bidang skill\n✅ Manfaatkan word-of-mouth dari orang terdekat\n\nMau saya bantu susun strategi yang lebih spesifik?",
]
let replyIdx = 0

function TypingMessage({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    setDisplayed("")
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(interval); onDone() }
    }, 16)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span style={{ whiteSpace: "pre-wrap" }}>
      {displayed}
      <span style={{ display: "inline-block", width: 2, height: "1em", background: "#1F7A63", marginLeft: 2, verticalAlign: "text-bottom", animation: "cursorBlink 0.7s infinite" }} />
    </span>
  )
}

export default function AIChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Halo! Saya AI Assistant KARYANUSA 👋\n\nSaya siap membantu kamu menemukan peluang usaha dari skill yang kamu miliki. Tanyakan apa saja tentang memulai bisnis, strategi pemasaran, atau pengembangan skill!" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [typingIdx, setTypingIdx] = useState<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const send = async (text?: string) => {
    const userText = (text ?? input).trim()
    if (!userText || loading) return
    const newMsgs: Message[] = [...messages, { role: "user", text: userText }]
    setMessages(newMsgs)
    setInput("")
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    const reply = dummyReplies[replyIdx++ % dummyReplies.length]
    const aiIdx = newMsgs.length
    setMessages([...newMsgs, { role: "ai", text: reply, typing: true }])
    setTypingIdx(aiIdx)
    setLoading(false)
  }

  const handleDoneTyping = (idx: number) => {
    setTypingIdx(null)
    setMessages(prev => prev.map((m, i) => i === idx ? { ...m, typing: false } : m))
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .chat-section { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes msgIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dotBounce { 0%,80%,100% { transform: translateY(0); opacity:0.4; } 40% { transform: translateY(-5px); opacity:1; } }
        @keyframes cursorBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        .msg-bubble { animation: msgIn 0.25s ease both; line-height: 1.65; font-size: 0.87rem; max-width: 78%; }
        .msg-ai   { background: #fff; border: 1px solid #EEF0F4; color: #1E3A5F; border-radius: 4px 14px 14px 14px; padding: 10px 13px; box-shadow: 0 1px 6px rgba(30,58,95,0.06); white-space: pre-wrap; }
        .msg-user { background: linear-gradient(135deg, #1F7A63, #25957A); color: #fff; border-radius: 14px 4px 14px 14px; padding: 10px 13px; margin-left: auto; box-shadow: 0 3px 12px rgba(31,122,99,0.22); white-space: pre-wrap; }

        .dot-typing span { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #94A3B8; margin: 0 2px; }
        .dot-typing span:nth-child(1) { animation: dotBounce 1.2s ease infinite 0s; }
        .dot-typing span:nth-child(2) { animation: dotBounce 1.2s ease infinite 0.2s; }
        .dot-typing span:nth-child(3) { animation: dotBounce 1.2s ease infinite 0.4s; }

        .chip-btn { background: #fff; border: 1.5px solid #E2E8F0; border-radius: 100px; padding: 6px 12px; font-size: 0.75rem; font-weight: 500; color: #1E3A5F; cursor: pointer; transition: all 0.18s; font-family: 'Plus Jakarta Sans', sans-serif; white-space: nowrap; }
        .chip-btn:hover { border-color: #1F7A63; color: #1F7A63; background: rgba(31,122,99,0.04); }

        .send-btn { background: linear-gradient(135deg, #1F7A63, #25957A); color: #fff; border: none; border-radius: 10px; padding: 0 16px; font-weight: 600; font-size: 0.87rem; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.18s; height: 42px; flex-shrink: 0; }
        .send-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(31,122,99,0.32); }
        .send-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .chat-input { flex: 1; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 10px 13px; font-size: 0.87rem; font-family: 'Plus Jakarta Sans', sans-serif; color: #1E3A5F; outline: none; transition: border-color 0.18s; background: #fff; height: 42px; min-width: 0; }
        .chat-input:focus { border-color: #1F7A63; box-shadow: 0 0 0 3px rgba(31,122,99,0.09); }
        .chat-input::placeholder { color: #CBD5E1; }
      `}</style>

      <section id="assistant" className="chat-section py-14 sm:py-16 bg-white">
        <div className="max-w-2xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-7">
            <span style={{ display: "inline-block", background: "rgba(31,122,99,0.09)", color: "#1F7A63", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "100px", marginBottom: "12px", border: "1px solid rgba(31,122,99,0.18)" }}>
              Langkah 4 dari 4
            </span>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.02em" }}>
              AI <span style={{ color: "#1F7A63" }}>Business Assistant</span>
            </h2>
            <p style={{ marginTop: "8px", color: "#64748B", fontSize: "0.92rem", lineHeight: 1.65 }}>
              Tanyakan apa saja tentang peluang usaha, strategi bisnis, dan pengembangan skill.
            </p>
          </div>

          <div style={{ background: "#F8FAFB", border: "1.5px solid #EEF0F4", borderRadius: "16px", overflow: "hidden", boxShadow: "0 3px 18px rgba(30,58,95,0.07)" }}>
            {/* Header */}
            <div style={{ background: "#fff", borderBottom: "1px solid #EEF0F4", padding: "11px 15px", display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #1F7A63, #25957A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.87rem", color: "#1E3A5F" }}>KARYANUSA AI</div>
                <div style={{ fontSize: "11px", color: "#22C55E", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
                  Online · Siap membantu
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ height: "300px", overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-start", gap: 7 }}>
                  {m.role === "ai" && (
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #1F7A63, #25957A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, marginTop: 1 }}>🤖</div>
                  )}
                  <div className={`msg-bubble ${m.role === "ai" ? "msg-ai" : "msg-user"}`}>
                    {m.role === "ai" && m.typing && typingIdx === i
                      ? <TypingMessage text={m.text} onDone={() => handleDoneTyping(i)} />
                      : m.text
                    }
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #1F7A63, #25957A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>🤖</div>
                  <div className="msg-ai" style={{ padding: "10px 13px" }}>
                    <div className="dot-typing"><span /><span /><span /></div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Chips */}
            {messages.length <= 1 && (
              <div style={{ padding: "0 14px 10px", display: "flex", gap: 7, flexWrap: "wrap" }}>
                {suggestedQuestions.map(q => <button key={q} className="chip-btn" onClick={() => send(q)}>{q}</button>)}
              </div>
            )}

            {/* Input */}
            <div style={{ background: "#fff", borderTop: "1px solid #EEF0F4", padding: "11px 13px", display: "flex", gap: "9px" }}>
              <input className="chat-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Tanyakan sesuatu... (Enter untuk kirim)" disabled={loading} />
              <button className="send-btn" onClick={() => send()} disabled={loading || !input.trim()}>
                {loading ? "..." : "Kirim →"}
              </button>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: "11px", color: "#94A3B8", marginTop: "10px" }}>
            🔒 Percakapan bersifat privat · Didukung teknologi AI terkini
          </p>
        </div>
      </section>
    </>
  )
}