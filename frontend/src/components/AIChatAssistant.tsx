import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, Sparkles, MoreHorizontal, User, RefreshCcw } from "lucide-react"

type Message = { role: "user" | "ai"; text: string; typing?: boolean }

const suggestedQuestions = [
  "Skill apa yang paling menghasilkan?",
  "Cara mulai freelance dari nol?",
  "Tips monetisasi skill digital?",
]

function TypingMessage({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    setDisplayed(""); let i = 0
    const interval = setInterval(() => {
      i++; setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(interval); onDone() }
    }, 12)
    return () => clearInterval(interval)
  }, [text, onDone])

  return (
    <span className="whitespace-pre-wrap">
      {displayed}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }} className="inline-block w-1 h-4 bg-[#F0D060] ml-1 align-middle shadow-[0_0_8px_#F0D060]" />
    </span>
  )
}

export default function AIChatAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Halo! Saya AI Mentor KARYANUSA 👋\n\nSiap membantu kamu memetakan strategi bisnis berdasarkan skill kamu. Ada yang ingin ditanyakan?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [typingIdx, setTypingIdx] = useState<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
  }, [open, messages, loading])

  const send = async (text?: string) => {
    const userText = (text ?? input).trim()
    if (!userText || loading) return
    const newMsgs: Message[] = [...messages, { role: "user", text: userText }]
    setMessages(newMsgs); setInput(""); setLoading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat/send`, {
        sessionId: localStorage.getItem("karyanusa_session") || "anon",
        message: userText,
        skillContext: localStorage.getItem("user_identified_skill") || "Umum",
      })
      setMessages([...newMsgs, { role: "ai", text: response.data.text, typing: true }])
      setTypingIdx(newMsgs.length)
    } catch {
      setMessages([...newMsgs, { role: "ai", text: "Maaf, koneksi saya sedang terganggu. Coba lagi ya! 🙏" }])
    } finally { setLoading(false) }
  }

  return (
    <div className="font-sans">
      {/* ── FAB BUTTON ── */}
      <div className="fixed bottom-6 right-6 z-[1000]">
        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${
            open ? 'bg-slate-900 rotate-90' : 'bg-[#1F7A63]'
          }`}
        >
          {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
        </motion.button>
      </div>

      {/* ── CHAT POPUP ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[999] w-[360px] max-w-[calc(100vw-3rem)] h-[500px] bg-[#0F172A] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden flex flex-col"
          >
            {/* Header (Kaku di Atas) */}
            <div className="p-4 bg-slate-900/80 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1F7A63] flex items-center justify-center text-white">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest leading-none">AI Mentor</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] text-green-400 font-bold uppercase">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setMessages([messages[0]])} className="p-2 hover:bg-white/5 rounded-lg text-slate-500">
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
                    m.role === "ai" ? "bg-slate-800 text-[#1F7A63]" : "bg-[#1F7A63] text-white"
                  }`}>
                    {m.role === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-[12px] leading-relaxed max-w-[80%] ${
                    m.role === "user" ? "bg-[#1F7A63] text-white rounded-tr-none" : "bg-slate-800 text-slate-200 rounded-tl-none border border-white/5"
                  }`}>
                    {m.role === "ai" && m.typing && typingIdx === i 
                      ? <TypingMessage text={m.text} onDone={() => setTypingIdx(null)} /> 
                      : m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-[#1F7A63] flex items-center justify-center"><Bot className="w-4 h-4" /></div>
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-white/5"><MoreHorizontal className="w-4 h-4 text-slate-500 animate-pulse" /></div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested & Input (Kaku di Bawah) */}
            <div className="mt-auto bg-slate-900/50 border-t border-white/5 p-4 space-y-3 shrink-0">
              {messages.length <= 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {suggestedQuestions.map(q => (
                    <button key={q} onClick={() => send(q)} className="whitespace-nowrap px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-[10px] text-slate-400 hover:text-white hover:border-[#1F7A63] transition-all">
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-2 items-center">
                <input
                  className="flex-1 h-11 px-4 bg-white/5 rounded-xl text-xs text-white outline-none border border-white/10 focus:border-[#1F7A63] transition-all"
                  value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Tulis pesan..."
                />
                <button onClick={() => send()} disabled={loading || !input.trim()} className="w-11 h-11 bg-[#1F7A63] hover:bg-[#25957A] disabled:opacity-30 text-white rounded-xl flex items-center justify-center shadow-lg">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-center items-center gap-1.5 opacity-30">
                <Sparkles className="w-2.5 h-2.5 text-[#F0D060]" />
                <span className="text-[8px] font-bold text-white uppercase tracking-[0.2em]">Neural Intelligence Engine</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}