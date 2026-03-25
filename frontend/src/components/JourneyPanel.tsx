import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { 
  X, ChevronRight, Bot, Sparkles, Target, Map, Trophy, 
  Users, Layout, Send, Search, CheckCircle2, Lock, 
  ArrowLeft, RefreshCw, MessageSquare,
  TrendingUp, Coins, Share2, ShieldCheck, Heart, Rocket, ArrowRight} from "lucide-react"
import { questions, opportunityMap, roadmapData, communityPosts, detectSkill } from "../services/karyanusaData"

// --- TYPES ---
type Menu = "journey" | "chatbot" | "community"
type JourneyStep = "menu" | "discovery" | "opportunities" | "roadmap" | "badges"
type Props = { onClose: () => void }
type Message = { role: "user" | "ai"; text: string; typing?: boolean }

// --- HELPER COMPONENT: TYPING EFFECT ---
function TypingMessage({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    setDisplayed(""); let i = 0
    const iv = setInterval(() => { 
      i++; 
      setDisplayed(text.slice(0, i)); 
      if (i >= text.length) { clearInterval(iv); onDone() } 
    }, 16)
    return () => clearInterval(iv)
  }, [text, onDone])
  
  return (
    <span className="whitespace-pre-wrap">
      {displayed}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.7 }}
        className="inline-block w-1 h-4 bg-[#1F7A63] ml-1 align-middle"
      />
    </span>
  )
}

// --- HELPER COMPONENTS: ICONS ---
const UserProfileIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default function JourneyPanel({ onClose }: Props) {
  // --- STATE LOGIC ---
  const [menu, setMenu] = useState<Menu>("journey")
  const [journeyStep, setJourneyStep] = useState<JourneyStep>("menu")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [skillResult, setSkillResult] = useState<{ skill: string; score: number } | null>(null)
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [roadmapStarted, setRoadmapStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: "ai", text: "Halo! Saya AI Assistant KARYANUSA 👋\n\nCeritakan skill kamu dan saya akan bantu temukan peluang terbaik untuk menghasilkan uang!" }])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [typingIdx, setTypingIdx] = useState<number | null>(null)
  const [joinedCommunity, setJoinedCommunity] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({})
  const [showPostForm, setShowPostForm] = useState(false)
  const [newPost, setNewPost] = useState({ name: "", skill: "Programming", text: "" })
  const [localPosts, setLocalPosts] = useState<typeof communityPosts>([])
  const [postSubmitted, setPostSubmitted] = useState(false)
  const [filterSkill, setFilterSkill] = useState<string>("Semua")

  const bottomRef = useRef<HTMLDivElement>(null)

  // --- DERIVED DATA ---
  const skill = skillResult?.skill ?? "Programming"
  const roadmap = roadmapData[skill] ?? roadmapData["Programming"]
  const totalTasks = roadmap.reduce((acc, s) => acc + s.tasks.length, 0)
  const doneTasks = Object.values(checked).filter(Boolean).length
  const progressPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0
  const completedPhases = roadmap.filter((s, si) => s.tasks.every((_, ti) => checked[`${si}-${ti}`])).length

  useEffect(() => { 
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" } 
  }, [])

  useEffect(() => { 
    if (menu === "chatbot") {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
    }
  }, [messages, loading, menu])

  // --- HANDLERS ---
  const handleNext = async () => {
    if (selected === null) return
    const newAnswers = [...answers, selected]
    if (current < questions.length - 1) { 
      setAnswers(newAnswers)
      setCurrent(current + 1)
      setSelected(null) 
    } else { 
      setLoading(true) // Nyalakan loading
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/skill/analyze`, {
          sessionId: localStorage.getItem('karyanusa_session') || 'sess-' + Date.now(),
          answers: newAnswers,
          questionnaireData: newAnswers.map((ans, idx) => ({ 
            q: questions[idx].question, 
            a: questions[idx].options[ans].label 
          }))
        });

        // Simpan data hasil dari AI (Groq)
        localStorage.setItem('karyanusa_session', response.data.sessionId);
        localStorage.setItem('user_identified_skill', response.data.skillResult);

        setSkillResult({ 
          skill: response.data.skillResult, 
          score: response.data.confidenceScore,
          // reasoning: response.data.reasoning (Opsional jika ingin disimpan di state)
        })
        
        setAnswers(newAnswers)
        setChecked({}) 

      } catch (error) {
        console.error("AI Gagal, pake cadangan lokal", error);
        // Fallback (Cadangan) kalau internet atau backend mati
        setSkillResult(detectSkill(newAnswers))
        setAnswers(newAnswers)
        setChecked({}) 
      } finally {
        setLoading(false)
      }
    }
  }

  const handleReset = () => { 
    setCurrent(0); setAnswers([]); setSelected(null); 
    setSkillResult(null); setChecked({}); 
    setRoadmapStarted(false); setJourneyStep("menu") 
  }

  const sendChat = async (text?: string) => {
    const userText = (text ?? input).trim()
    if (!userText || loading) return
    const newMsgs: Message[] = [...messages, { role: "user", text: userText }]
    setMessages(newMsgs); setInput(""); setLoading(true)
    try {
      const session = localStorage.getItem("karyanusa_session") || "anon"
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat/send`, { 
        sessionId: session, 
        message: userText, 
        skillContext: skill 
      })
      setMessages([...newMsgs, { role: "ai", text: response.data.text, typing: true }])
      setTypingIdx(newMsgs.length)
    } catch { 
      setMessages([...newMsgs, { role: "ai", text: "Maaf, AI sedang istirahat. Coba lagi ya! 🙏" }]) 
    } finally { 
      setLoading(false) 
    }
  }

  const pageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.3 } }
  }

  return (
    <div className="fixed inset-0 z-[2000] bg-[#0F172A] flex overflow-hidden font-sans text-white">
      
      {/* ── 1. PREMIUM SIDEBAR ── */}
      <aside className="w-20 md:w-24 bg-slate-900/80 backdrop-blur-xl flex flex-col items-center py-10 gap-10 border-r border-white/10 z-30">
        <div className="w-12 h-12 bg-gradient-to-br from-[#1F7A63] to-[#25957A] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-900/40">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        
        <div className="flex flex-col gap-6 flex-1">
          {[
            { id: "journey" as Menu, icon: Layout, label: "Journey", activeColor: "bg-[#1F7A63]" },
            { id: "chatbot" as Menu, icon: Bot, label: "AI Chat", activeColor: "bg-[#C9A84C]" },
            { id: "community" as Menu, icon: Users, label: "Komunitas", activeColor: "bg-[#6366F1]" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setMenu(item.id); if(item.id === "journey") setJourneyStep("menu"); }}
              className={`group relative p-4 rounded-2xl transition-all duration-300 ${
                menu === item.id 
                ? `${item.activeColor} text-white shadow-xl scale-110` 
                : "text-slate-600 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <div className="absolute left-full ml-4 px-3 py-1 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                {item.label}
              </div>
            </button>
          ))}
        </div>

        <button onClick={onClose} className="p-4 text-slate-500 hover:text-red-400 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </aside>

      {/* ── 2. MAIN CONTENT AREA ── */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0F172A]">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1F7A63]/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F0D060]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

        {/* --- DYNAMIC HEADER --- */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 md:px-10 z-20">
          <div className="flex items-center gap-6">
            {journeyStep !== "menu" && menu === "journey" && (
              <button 
                onClick={() => setJourneyStep("menu")} 
                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-sm font-serif font-black tracking-tight text-white">
                {menu === "journey" ? (journeyStep === "menu" ? "Mission Control" : journeyStep.toUpperCase()) : menu.toUpperCase()}
              </h2>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Active Skill: {skill}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
             <div className="text-right">
                <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Roadmap Tracking</div>
                <div className="text-sm font-bold text-[#1F7A63]">{progressPct}% Task Finished</div>
             </div>
             <div className="w-36 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${progressPct}%` }} 
                  className="h-full bg-gradient-to-r from-[#1F7A63] to-[#25957A] rounded-full shadow-[0_0_12px_rgba(31,122,99,0.4)]" 
                />
             </div>
          </div>
        </header>

        {/* --- MAIN SCROLLABLE CONTENT --- */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">

            {/* A. JOURNEY DASHBOARD */}
            {menu === "journey" && journeyStep === "menu" && (
              <motion.div key="menu" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="max-w-5xl mx-auto p-6 md:p-8">
                <div className="mb-6 text-center md:text-left">
                   <div className="inline-block px-4 py-1.5 bg-[#1F7A63]/10 text-[#1F7A63] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 border border-[#1F7A63]/20">
                      Welcome Back, Talenta!
                   </div>
                   <h1 className="text-2xl md:text-3xl font-serif font-black text-white mb-2">Misi <span className="text-[#1F7A63]">Ekonomi</span> Digital</h1>
                   <p className="text-slate-400 text-sm font-medium max-w-xl">Lalui setiap tahap analisis untuk membangun fondasi bisnis yang kuat.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* CARD 1: DISCOVERY */}
                  <button onClick={() => setJourneyStep("discovery")} 
                    className={`group relative overflow-hidden p-6 rounded-[20px] text-left transition-all duration-300 hover:scale-[1.01] border-2 ${skillResult ? 'bg-slate-800/80 border-[#1F7A63]/30 shadow-lg' : 'bg-slate-900/80 border-white/10 shadow-xl'}`}>
                    <Search className={`w-8 h-8 mb-4 ${skillResult ? 'text-[#1F7A63]' : 'text-[#F0D060]'}`} />
                    <h3 className="text-sm font-black mb-1 text-white">Skill Discovery</h3>
                    <p className={`text-xs mb-4 leading-relaxed ${skillResult ? 'text-slate-400' : 'text-slate-500'}`}>Analisis psikometrik AI untuk menemukan bakat tersembunyimu.</p>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs ${skillResult ? 'bg-green-50 text-[#1F7A63]' : 'bg-[#F0D060] text-slate-900'}`}>
                      {skillResult ? "Hasil Tersedia ✓" : "Mulai Sekarang"} <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>

                  {/* CARD 2: OPPORTUNITIES */}
                  <button disabled={!skillResult} onClick={() => setJourneyStep("opportunities")} 
                    className={`group p-6 rounded-[20px] border-2 text-left transition-all duration-300 ${!skillResult ? 'bg-slate-900/40 border-white/5 opacity-40 grayscale' : 'bg-slate-900/60 border-white/10 shadow-lg hover:border-[#1F7A63]/30 hover:scale-[1.01]'}`}>
                    <Target className={`w-8 h-8 mb-4 ${!skillResult ? 'text-slate-300' : 'text-[#1F7A63]'}`} />
                    <h3 className="text-sm font-black mb-1 text-white">Peluang Usaha</h3>
                    <p className="text-slate-400 text-xs mb-4 leading-relaxed">3 model bisnis profitabel dikurasi untuk skill kamu.</p>
                    {!skillResult ? (
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest"><Lock className="w-4 h-4" /> Locked Stage</div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white rounded-2xl font-black text-xs uppercase tracking-widest">Buka Peluang <ChevronRight className="w-4 h-4" /></div>
                    )}
                  </button>

                  {/* CARD 3: ROADMAP */}
                  <button disabled={!skillResult} onClick={() => setJourneyStep("roadmap")} 
                    className={`group p-6 rounded-[20px] border-2 text-left transition-all duration-300 ${!skillResult ? 'bg-slate-900/40 border-white/5 opacity-40 grayscale' : 'bg-slate-900/60 border-white/10 shadow-lg hover:border-[#C9A84C]/30 hover:scale-[1.01]'}`}>
                    <Map className={`w-8 h-8 mb-4 ${!skillResult ? 'text-slate-300' : 'text-[#C9A84C]'}`} />
                    <h3 className="text-sm font-black mb-1 text-white">Roadmap Bisnis</h3>
                    <p className="text-slate-400 text-xs mb-4 leading-relaxed">Panduan langkah demi langkah membangun aset digital.</p>
                    <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                      {!skillResult ? <><Lock className="w-4 h-4" /> Locked</> : <div className="text-[#C9A84C]">Active Strategy <ChevronRight className="w-4 h-4 inline" /></div>}
                    </div>
                  </button>

                  {/* CARD 4: BADGES */}
                  <button disabled={!roadmapStarted} onClick={() => setJourneyStep("badges")} 
                    className={`group p-6 rounded-[20px] border-2 text-left transition-all duration-300 ${!roadmapStarted ? 'bg-slate-900/40 border-white/5 opacity-40 grayscale' : 'bg-slate-900/60 border-white/10 shadow-lg hover:border-[#7C3AED]/30 hover:scale-[1.01]'}`}>
                    <Trophy className={`w-8 h-8 mb-4 ${!roadmapStarted ? 'text-slate-300' : 'text-[#7C3AED]'}`} />
                    <h3 className="text-sm font-black mb-1 text-white">Badge & Pencapaian</h3>
                    <p className="text-slate-400 text-xs mb-4 leading-relaxed">Koleksi badge sebagai bukti kemajuan karirmu.</p>
                    <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                      {!roadmapStarted ? <><Lock className="w-4 h-4" /> Locked</> : <div className="text-[#7C3AED]">Claim Reward <ChevronRight className="w-4 h-4 inline" /></div>}
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* B. DISCOVERY FLOW */}
            {menu === "journey" && journeyStep === "discovery" && (
              <motion.div key="disc" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="h-full flex flex-col">
                {!skillResult ? (
                  <div className="flex-1 flex flex-col p-6 md:p-10 max-w-2xl mx-auto w-full">
                    <div className="mb-6">
                      <div className="flex justify-between items-end mb-4 px-2">
                        <span className="text-[10px] font-black text-[#1F7A63] uppercase tracking-[0.3em]">Phase: Analysis</span>
                        <span className="text-3xl font-serif font-black text-[#1E3A5F]">{Math.round(((current+1)/questions.length)*100)}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${((current+1)/questions.length)*100}%` }} className="h-full bg-gradient-to-r from-[#1F7A63] to-[#25957A]" />
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-6 leading-tight">
                       {questions[current].question}
                    </h3>
                    
                    <div className="space-y-3 flex-1">
                      {questions[current].options.map((opt, i) => (
                        <button key={i} onClick={() => setSelected(i)} 
                          className={`w-full text-left p-5 rounded-[20px] border-2 transition-all flex items-center justify-between group ${selected === i ? 'bg-[#1F7A63] border-[#1F7A63] text-white shadow-xl shadow-green-900/20' : 'bg-white/5 border-white/10 hover:border-[#1F7A63]/40 text-slate-300'}`}>
                          <span className="font-medium text-sm">{opt.label}</span>
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selected === i ? 'bg-white border-white text-[#1F7A63]' : 'border-slate-200 text-transparent opacity-0 group-hover:opacity-100'}`}>
                             <CheckCircle2 className="w-5 h-5" />
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-auto pt-6 border-t border-slate-100">
                      <button disabled={current === 0} onClick={() => { setCurrent(c => c-1); setAnswers(a => a.slice(0,-1)); setSelected(null); }} 
                        className="w-10 h-10 rounded-xl bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></button>
                      <button disabled={selected === null} onClick={handleNext}
                        className="flex-1 h-11 bg-[#1F7A63] text-white font-bold rounded-xl shadow-md hover:bg-[#25957A] transition-all text-sm">
                        {current === questions.length - 1 ? "Lihat Hasil" : "Lanjut"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} 
                      className="bg-slate-900/60 backdrop-blur-xl rounded-[24px] p-8 shadow-xl border border-white/10 relative overflow-hidden max-w-md mx-auto">
                       
                       <Sparkles className="absolute top-12 left-12 text-[#F0D060]/40 w-16 h-16 animate-pulse" />
                       
                       <div className="relative w-32 h-32 mx-auto mb-6">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                             <circle cx="64" cy="64" r="56" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                             <motion.circle cx="64" cy="64" r="56" fill="none" stroke="#1F7A63" strokeWidth="10" strokeLinecap="round" strokeDasharray="352" initial={{ strokeDashoffset: 352 }} animate={{ strokeDashoffset: 352 * (1 - skillResult.score/100) }} transition={{ duration: 2, ease: "easeOut" }} />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <span className="text-2xl font-black text-[#1E3A5F]">{skillResult.score}%</span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Accuracy</span>
                          </div>
                       </div>

                       <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Discovery Confirmed</h4>
                       <h2 className="text-2xl font-serif font-black text-white mb-4 tracking-tighter uppercase">
                         {skillResult.skill}
                       </h2>

                       <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="p-4 bg-white/5 rounded-[16px] border border-white/10 flex flex-col items-center">
                             <TrendingUp className="text-[#1F7A63] w-6 h-6 mb-2" />
                             <div className="text-[11px] font-black text-slate-400 uppercase mb-2">Market Demand</div>
                             <div className="font-bold text-sm text-white">9.8 / 10</div>
                          </div>
                          <div className="p-4 bg-white/5 rounded-[16px] border border-white/10 flex flex-col items-center">
                             <Coins className="text-[#C9A84C] w-6 h-6 mb-2" />
                             <div className="text-[11px] font-black text-slate-400 uppercase mb-2">Income Tier</div>
                             <div className="font-bold text-sm text-white">High Profit</div>
                          </div>
                       </div>

                       <div className="flex flex-col sm:flex-row gap-4">
                          <button onClick={handleReset} className="flex-1 py-3 bg-white/5 text-slate-400 font-bold rounded-xl hover:bg-white/10 transition-all text-sm border border-white/10">Coba Ulang</button>
                          <button onClick={() => setJourneyStep("opportunities")} className="flex-[2] py-3 bg-[#1F7A63] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all active:scale-95 text-sm">Lihat Peluang</button>
                       </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}

            {/* C. OPPORTUNITIES */}
            {menu === "journey" && journeyStep === "opportunities" && (
              <motion.div key="opps" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="max-w-6xl mx-auto p-6 md:p-8">
                 <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="">
                       <div style={{display:"none"}}></div>
                       <h2 className="text-base font-serif font-black">Peluang: <span className="text-[#1F7A63]">{skill}</span></h2>
                       <p className="text-slate-400 text-xs">3 model bisnis profitabel untukmu</p>
                    </div>
                    <button onClick={() => { setRoadmapStarted(true); setJourneyStep("roadmap"); }} 
                      className="px-4 py-2 bg-[#1E3A5F] text-white font-bold rounded-xl text-xs flex items-center gap-2 flex-shrink-0">
                       Ke Roadmap <Rocket className="w-3 h-3" />
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(opportunityMap[skill] ?? opportunityMap["Programming"]).map((opp, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }}
                        className="bg-slate-900/60 rounded-[16px] p-4 border border-white/10 relative overflow-hidden group hover:border-[#1F7A63]/30 transition-all">
                        <div className="relative z-10">
                           <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-lg mb-2">
                              {opp.icon}
                           </div>
                           <h3 className="text-lg font-black mb-2 text-[#1E3A5F] group-hover:text-[#1F7A63] transition-colors leading-tight">{opp.title}</h3>
                           <div className="inline-block px-2 py-0.5 rounded-lg bg-green-50 text-[#1F7A63] text-[9px] font-black uppercase mb-2 border border-green-100">{opp.type}</div>
                           
                           <p className="text-slate-400 text-xs leading-relaxed mb-2 line-clamp-2">{opp.desc}</p>
                           
                           <div className="p-2.5 bg-[#1E3A5F] rounded-xl text-white mb-2 text-center">
                              <div>
                                 <div className="text-[9px] text-slate-300 mb-1">Estimasi</div>
                                 <div className="text-sm font-black text-[#F0D060]">{opp.income}</div>
                              </div>
                           </div>

                           <div className="space-y-1.5">
                              <div className="text-[9px] font-bold text-slate-300 uppercase mb-1">Langkah Mulai</div>
                              {opp.steps.map((step, si) => (
                                <div key={si} className="flex items-center gap-2">
                                   <div className="w-4 h-4 rounded-full bg-slate-100 text-[#1E3A5F] flex items-center justify-center text-[9px] font-bold flex-shrink-0">{si+1}</div>
                                   <span className="text-xs text-slate-400">{step}</span>
                                </div>
                              ))}
                           </div>
                        </div>
                      </motion.div>
                    ))}
                 </div>
              </motion.div>
            )}

            {/* D. ROADMAP INTERAKTIF */}
            {menu === "journey" && journeyStep === "roadmap" && (
              <motion.div key="roadmap" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="max-w-5xl mx-auto p-6 md:p-8">
                 <div className="bg-gradient-to-r from-[#1F7A63]/20 to-[#1E3A5F]/40 rounded-[14px] p-4 text-white relative overflow-hidden mb-4 border border-white/10">
                    
                    <div className="flex items-center justify-between gap-4">
                       <div className="flex-1">
                          <div style={{display:"none"}}></div>
                          <h2 className="text-sm font-bold mb-1">Roadmap <span className="text-[#F0D060]">{skill}</span></h2>
                          <p className="text-slate-300 text-xs">Selesaikan tiap fase untuk mengubah skill kamu jadi penghasilan.</p>
                       </div>
                       <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                          
                          <svg className="w-full h-full -rotate-90">
                             <circle cx="96" cy="96" r="88" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
                             <motion.circle cx="96" cy="96" r="88" fill="transparent" stroke="#F0D060" strokeWidth="14" strokeLinecap="round" strokeDasharray="552.9" initial={{ strokeDashoffset: 552.9 }} animate={{ strokeDashoffset: 552.9 * (1 - progressPct/100) }} transition={{ duration: 1.5 }} />
                          </svg>
                          <span className="absolute text-xs font-black text-white">{progressPct}%</span>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {roadmap.map((phase, si) => {
                      const phaseDone = phase.tasks.every((_, ti) => checked[`${si}-${ti}`])
                      const doneCount = phase.tasks.filter((_, ti) => checked[`${si}-${ti}`]).length
                      return (
                        <div key={si} className={`rounded-[12px] border p-3 transition-all ${phaseDone ? 'bg-[#1F7A63]/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                           <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${phaseDone ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                                    {phaseDone ? <CheckCircle2 className="w-4 h-4" /> : phase.icon}
                                 </div>
                                 <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{phase.phase}</div>
                                    <h4 className="font-bold text-xs text-white">{phase.title}</h4>
                                 </div>
                              </div>
                              <div className={`px-2 py-0.5 rounded-lg text-xs font-bold ${phaseDone ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                                 {doneCount} / {phase.tasks.length}
                              </div>
                           </div>
                           
                           <div className="space-y-3 flex-1">
                              {phase.tasks.map((task, ti) => {
                                const key = `${si}-${ti}`; const isDone = !!checked[key];
                                return (
                                  <button key={ti} onClick={() => setChecked(prev => ({ ...prev, [key]: !prev[key] }))}
                                    className={`w-full flex items-center gap-2 p-2 rounded-lg border transition-all text-left ${isDone ? 'bg-[#1F7A63]/10 border-[#1F7A63]/20' : 'bg-white/5 border-white/5 hover:border-[#1F7A63]/30'}`}>
                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-[#1F7A63] border-[#1F7A63] text-white' : 'bg-white/5 border-white/20'}`}>
                                       {isDone && <CheckCircle2 className="w-3 h-3" />}
                                    </div>
                                    <span className={`text-xs transition-all ${isDone ? 'text-slate-600 line-through' : 'text-slate-300'}`}>{task}</span>
                                  </button>
                                )
                              })}
                           </div>
                        </div>
                      )
                    })}
                 </div>

                 {progressPct === 100 && (
                   <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-4 p-5 bg-gradient-to-r from-[#1F7A63] to-[#25957A] rounded-[16px] text-center text-white">
                      <div className="text-3xl mb-2">🏆</div>
                      <h3 className="text-base font-black mb-1">Semua Fase Selesai!</h3>
                      <p className="text-green-50 text-xs mb-3 opacity-90">Kamu siap membangun bisnis dari skill kamu!</p>
                      <button onClick={() => setJourneyStep("badges")} 
                        className="px-5 py-2 bg-[#F0D060] text-slate-900 font-bold rounded-xl text-sm">
                        Lihat Badge
                      </button>
                   </motion.div>
                 )}
              </motion.div>
            )}

            {/* E. BADGES & ACHIVEMENTS */}
            {menu === "journey" && journeyStep === "badges" && (
              <motion.div key="badges" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="p-6 md:p-8 max-w-5xl mx-auto text-center">
                 <div className="mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F0D060]/10 text-[#A8832A] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 border border-[#F0D060]/20">Verified Achievement</div>
                    <h2 className="text-xl font-serif font-black mb-1 text-white">Badge <span className="text-[#F0D060]">Achievement</span></h2>
                    <p className="text-slate-400 text-xs">Selesaikan fase roadmap untuk unlock badge.</p>
                 </div>

                 <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-5">
                    {[
                      { i: "🌱", n: "Explorer", d: "Phase 1 Done", p: 1, c: "#1F7A63", g: "from-green-50" },
                      { i: "⚡", n: "Starter",  d: "Phase 2 Done", p: 2, c: "#1E3A5F", g: "from-blue-50" },
                      { i: "🔥", n: "Builder",  d: "Phase 3 Done", p: 3, c: "#C9A84C", g: "from-yellow-50" },
                      { i: "🚀", n: "Scaler",   d: "Phase 4 Done", p: 4, c: "#7C3AED", g: "from-purple-50" },
                      { i: "👑", n: "Master",   d: "All Missions", p: 5, c: "#DC2626", g: "from-red-50" },
                    ].map((badge, i) => {
                      const isUnlocked = badge.p === 5 ? completedPhases >= 4 : completedPhases >= badge.p
                      return (
                        <motion.div key={i} whileHover={isUnlocked ? { y: -12, scale: 1.05 } : {}} 
                          className={`bg-white rounded-[14px] p-3 border-2 flex flex-col items-center gap-1 text-center transition-all ${isUnlocked ? 'border-[#F0D060]/50 shadow-md bg-[#F0D060]/5' : 'border-slate-100 opacity-40 grayscale'}`}>
                          <div className="text-2xl">{badge.i}</div>
                          <div className="relative z-10">
                             <div className="text-xs font-black text-white">{badge.n}</div>
                             <div className="text-[9px] text-slate-400">{badge.d}</div>
                          </div>
                          {isUnlocked ? (
                             <div className="px-2 py-0.5 bg-[#1F7A63] text-white text-[9px] font-bold rounded-md">Unlocked</div>
                          ) : (
                             <div className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[9px] rounded-md">Locked</div>
                          )}
                        </motion.div>
                      )
                    })}
                 </div>

                 <div className="bg-slate-900/60 border border-white/10 rounded-[16px] p-5 text-white">
                    
                    <div className="mb-4">
                       <h3 className="text-base font-black mb-1">Bagikan <span className="text-[#F0D060]">Hasilmu!</span></h3>
                       <p className="text-slate-300 text-xs mb-3">Tunjukkan pencapaianmu ke teman-teman!</p>
                       <div className="flex flex-wrap gap-3">
                          <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Skill: ${skill} match ${skillResult?.score}%!`)}`)} 
                            className="px-10 py-5 bg-[#25D366] text-white font-black rounded-3xl flex items-center gap-4 shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm tracking-widest shadow-[#25D366]/20">
                             <Share2 className="w-4 h-4" /> WhatsApp
                          </button>
                          <button onClick={() => { navigator.clipboard.writeText(`Cek skill kamu di KARYANUSA!`); alert("Link Copied!"); }} 
                            className="px-10 py-5 bg-white/10 text-white border border-white/20 font-black rounded-3xl hover:bg-white/20 transition-all uppercase text-xs tracking-[0.2em] backdrop-blur-md">
                             Copy Link
                          </button>
                       </div>
                    </div>

                 </div>
              </motion.div>
            )}

            {/* F. AI CHAT MENTOR */}
            {menu === "chatbot" && (
              <motion.div key="chat" variants={pageVariants} initial="hidden" animate="visible" exit="exit" 
                className="h-full flex flex-col bg-[#0F172A] overflow-hidden relative">
                 
                 <div className="p-6 bg-[#1E3A5F] flex items-center justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#1F7A63]/20 rounded-full blur-[80px]" />
                    <div className="flex items-center gap-6 relative z-10">
                       <div className="w-16 h-16 bg-[#1F7A63] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-900/40 border border-white/10"><Bot className="w-9 h-9" /></div>
                       <div>
                          <div className="font-black tracking-tight text-xl uppercase">AI BUSINESS <span className="text-[#F0D060]">MENTOR</span></div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-green-400 uppercase tracking-widest mt-1"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" /> Online & Analyzing</div>
                       </div>
                    </div>
                    <button onClick={() => setMessages([{ role: "ai", text: "Riwayat chat telah dibersihkan. Apa yang ingin kamu diskusikan kembali?" }])} 
                      className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-slate-400 hover:text-white border border-white/5"><RefreshCw className="w-6 h-6" /></button>
                 </div>

                 <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-[#0F172A] no-scrollbar relative">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex gap-6 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-lg ${m.role === "ai" ? 'bg-[#1F7A63] text-white border border-white/20' : 'bg-white border border-slate-100 text-slate-400'}`}>
                           {m.role === "ai" ? <Bot className="w-7 h-7" /> : <UserProfileIcon className="w-7 h-7" />}
                        </div>
                        <div className={`px-4 py-3 rounded-[18px] text-sm font-medium max-w-[80%] leading-relaxed shadow-sm transition-all hover:shadow-md ${
                          m.role === "user" 
                            ? 'bg-slate-900 text-white rounded-tr-none' 
                            : 'bg-slate-800/80 text-slate-200 border border-white/10 rounded-tl-none'
                        }`}>
                          {m.role === "ai" && m.typing && typingIdx === i ? <TypingMessage text={m.text} onDone={() => setTypingIdx(null)} /> : m.text}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex gap-6 animate-pulse">
                        <div className="w-12 h-12 rounded-[18px] bg-[#1F7A63] text-white flex items-center justify-center shadow-lg"><Bot className="w-7 h-7 animate-bounce" /></div>
                        <div className="bg-slate-800/80 px-4 py-3 rounded-[18px] rounded-tl-none border border-white/10 flex items-center"><div className="dot-typing"><span/><span/><span/></div></div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                 </div>

                 <div className="p-4 bg-slate-900/80 border-t border-white/10 flex gap-4 items-center shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.02)]">
                    <div className="flex-1">
                       <input className="w-full h-11 px-5 bg-white/5 border border-white/10 rounded-[14px] text-sm font-medium text-white outline-none focus:border-[#1F7A63] transition-all placeholder:text-slate-600" 
                        value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat() } }} placeholder="Tanyakan strategi bisnismu..." />
                    </div>
                    <button onClick={() => sendChat()} disabled={loading || !input.trim()} className="w-11 h-11 bg-[#1F7A63] hover:bg-[#25957A] text-white rounded-xl flex items-center justify-center shadow-2xl shadow-blue-900/20 active:scale-90 transition-all hover:scale-105 disabled:opacity-50 disabled:grayscale">
                       <Send className="w-7 h-7" />
                    </button>
                 </div>
              </motion.div>
            )}

            {/* G. COMMUNITY FEED */}
            {menu === "community" && (
              <motion.div key="comm" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="max-w-6xl mx-auto p-6 md:p-8">
                 {!joinedCommunity ? (
                    <div className="max-w-lg mx-auto text-center py-10 px-8 bg-slate-900/60 backdrop-blur-xl rounded-[28px] border border-white/10 shadow-xl relative overflow-hidden">
                       <div className="absolute -top-20 -left-20 w-80 h-80 bg-green-50 rounded-full blur-[80px]" />
                       <div className="w-20 h-20 bg-[#F0D060]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner border border-white relative z-10">🤝</div>
                       <h2 className="text-2xl md:text-3xl font-serif font-black mb-4 leading-tight text-white">Komunitas <span className="text-[#1F7A63]">KARYANUSA</span></h2>
                       <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8 max-w-lg mx-auto">Bergabung dengan ribuan orang yang sudah mengubah skill mereka jadi penghasilan nyata.</p>
                       
                       <div className="grid grid-cols-3 gap-4 mb-8 max-w-xl mx-auto relative z-10">
                          {[{ n: "10K+", l: "Member" }, { n: "2K+", l: "Stories" }, { n: "98%", l: "Success" }].map(s => (
                            <div key={s.l} className="p-4 bg-white/5 rounded-[16px] border border-white/10 transition-transform hover:scale-105 duration-300 group">
                               <div className="text-xl font-black text-white group-hover:text-[#1F7A63] transition-colors">{s.n}</div>
                               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{s.l}</div>
                            </div>
                          ))}
                       </div>

                       <button onClick={() => setJoinedCommunity(true)} 
                         className="px-10 py-4 bg-[#1F7A63] text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-sm relative z-10">
                         Bergabung Sekarang — Gratis
                       </button>
                       <p className="mt-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-60"><ShieldCheck className="w-4 h-4 inline mr-2 text-green-500" /> Professional Community Environment</p>
                    </div>
                 ) : (
                    <div className="space-y-16">
                       <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-16 px-4">
                          <div>
                             <h2 className="text-xl font-serif font-black text-white tracking-tighter leading-none mb-2">Feed <span className="text-[#1F7A63]">Komunitas</span></h2>
                             <p className="text-slate-400 text-lg font-medium">Terhubung dengan talenta hebat dari seluruh penjuru negeri.</p>
                          </div>
                          <button onClick={() => setShowPostForm(true)} 
                            className="px-5 py-3 bg-[#1F7A63] text-white font-bold rounded-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm shadow-lg">
                             <MessageSquare className="w-5 h-5 text-[#F0D060]" /> Bagikan Cerita
                          </button>
                       </div>

                       <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 px-4">
                          {["Semua", "Programming", "Desain Grafis", "Fotografi", "Menulis", "Marketing", "Public Speaking"].map(f => (
                            <button key={f} onClick={() => setFilterSkill(f)} 
                              className={`px-8 py-3 rounded-full whitespace-nowrap text-xs font-black transition-all uppercase tracking-widest border-2 shadow-sm ${filterSkill === f ? 'bg-[#1F7A63] border-[#1F7A63] text-white shadow-green-900/20' : 'bg-white border-slate-100 text-slate-400 hover:border-[#1F7A63]/30 hover:text-[#1F7A63]'}`}>
                              {f}
                            </button>
                          ))}
                       </div>

                       <div className="columns-1 md:columns-2 lg:columns-3 gap-10 px-4">
                          {[...localPosts, ...communityPosts].filter(p => filterSkill === "Semua" || p.skill === filterSkill).map((post, i) => (
                             <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                               className="break-inside-avoid bg-slate-900/60 rounded-[18px] p-5 mb-5 border border-white/10 hover:border-white/20 transition-all duration-300 group relative">
                                <div className="flex items-center gap-3 mb-4">
                                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl group-hover:rotate-12 transition-all duration-300">{post.avatar}</div>
                                   <div>
                                      <div className="font-bold text-white text-sm leading-tight">{post.name}</div>
                                      <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{post.time}</div>
                                   </div>
                                </div>
                                <div className="flex gap-2 mb-3">
                                   <span className="px-3 py-1 bg-green-50 text-[#1F7A63] text-[9px] font-black uppercase rounded-lg border border-green-100 tracking-tighter">{post.skill}</span>
                                   <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase rounded-lg border border-slate-100 tracking-tighter">{post.badge}</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed mb-4 border-l-2 border-white/10 pl-3">{post.text}</p>
                                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                   <button onClick={() => setLikedPosts(prev => ({...prev, [i]: !prev[i]}))} className="flex items-center gap-3 group/like bg-slate-50 px-5 py-2.5 rounded-2xl hover:bg-red-50 transition-all border border-slate-100">
                                      <Heart className={`w-5 h-5 transition-all duration-500 ${likedPosts[i] ? 'fill-red-500 text-red-500 scale-125' : 'text-slate-300 group-hover/like:scale-110'}`} />
                                      <span className={`text-xs font-black ${likedPosts[i] ? 'text-red-500' : 'text-slate-300 group-hover/like:text-slate-500'}`}>{post.likes + (likedPosts[i] ? 1 : 0)}</span>
                                   </button>
                                   <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-[#1F7A63] group-hover:translate-x-1 transition-all" />
                                </div>
                             </motion.div>
                          ))}
                       </div>
                    </div>
                 )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── 3. UNIVERSAL MODAL SYSTEM ── */}
      <AnimatePresence>
        {showPostForm && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }} 
              className="bg-[#0F172A] border border-white/10 rounded-[24px] w-full max-w-lg p-8 relative shadow-2xl overflow-hidden">
              
              {/* Decoration inside Modal */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -z-10" />

              <button onClick={() => setShowPostForm(false)} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/5 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all"><X className="w-4 h-4" /></button>
              
              {!postSubmitted ? (
                <div className="space-y-5">
                  <div>
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-[#1F7A63]"><MessageSquare className="w-8 h-8" /></div>
                    <h3 className="text-xl font-serif font-black mb-2 text-white">Bagikan <span className="text-[#1F7A63]">Ceritamu</span></h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Tulisanmu bisa jadi inspirasi bagi yang lainnya.</p>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">Nama Profil</label>
                       <input className="w-full h-11 px-4 bg-[#1E293B] border border-white/10 rounded-xl text-sm font-medium text-white outline-none focus:border-[#1F7A63] transition-all placeholder:text-slate-500"
                        placeholder="Nama kamu..." value={newPost.name} onChange={e => setNewPost(p => ({...p, name: e.target.value}))} />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">Kategori Keahlian</label>
                       <select className="w-full h-11 px-4 bg-[#1E293B] border border-white/10 rounded-xl text-sm font-medium text-white outline-none focus:border-[#1F7A63] transition-all cursor-pointer"
                        value={newPost.skill} onChange={e => setNewPost(p => ({...p, skill: e.target.value}))}>
                          {["Programming", "Desain Grafis", "Fotografi", "Menulis", "Marketing", "Public Speaking"].map(s => (
                            <option key={s} value={s} style={{ background: "#1E293B", color: "#fff" }}>{s}</option>
                          ))}
                       </select>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">Inspirasi Kamu</label>
                       <textarea className="w-full p-4 bg-[#1E293B] border border-white/10 rounded-xl text-sm font-medium text-white outline-none focus:border-[#1F7A63] transition-all min-h-[100px] resize-none placeholder:text-slate-500"
                        placeholder="Bagaimana Karyanusa membantu kamu mendapatkan hasil nyata?" value={newPost.text} onChange={e => setNewPost(p => ({...p, text: e.target.value}))} />
                    </div>
                  </div>

                  <button disabled={!newPost.text.trim()} onClick={() => {
                    setLocalPosts(prev => [{
                      name: newPost.name.trim() || "User Karyanusa",
                      skill: newPost.skill,
                      avatar: "🌿",
                      text: newPost.text.trim(),
                      time: "Baru saja",
                      likes: 0,
                      badge: "New Hero",
                      color: "#1F7A63",
                      bg: "bg-green-50"
                    }, ...prev])
                    setPostSubmitted(true)
                  }} className="w-full py-3 bg-[#1F7A63] text-white font-bold rounded-xl shadow-lg hover:scale-[1.01] active:scale-95 transition-all text-sm">
                    Bagikan Cerita
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                   <div className="text-5xl mb-6 animate-bounce">🎉</div>
                   <h3 className="text-2xl font-black text-white mb-3">Cerita Berhasil Dibagikan!</h3>
                   <p className="text-slate-400 text-sm mb-8 leading-relaxed">Terima kasih sudah menginspirasi komunitas KARYANUSA!</p>
                   <button onClick={() => { setShowPostForm(false); setPostSubmitted(false); setNewPost({ name: "", skill: "Programming", text: "" }); }} 
                    className="px-10 py-3 bg-[#1E3A5F] text-white font-bold rounded-xl text-sm shadow-lg hover:bg-slate-900 transition-all">Tutup</button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}