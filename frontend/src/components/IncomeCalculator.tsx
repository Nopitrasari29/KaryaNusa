import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Code2, Palette, Camera, PenTool, Megaphone, Mic2, 
  Clock, Calendar, Coins, TrendingUp, ChevronDown, Sparkles
} from "lucide-react"

const skillRates: Record<string, { rate: number; icon: any; color: string }> = {
  "Programming":     { rate: 150000, icon: Code2,     color: "#1F7A63" },
  "Desain Grafis":   { rate: 120000, icon: Palette,   color: "#6366F1" },
  "Fotografi":       { rate: 130000, icon: Camera,    color: "#F59E0B" },
  "Menulis":         { rate: 90000,  icon: PenTool,   color: "#EC4899" },
  "Marketing":       { rate: 110000, icon: Megaphone, color: "#EF4444" },
  "Public Speaking": { rate: 200000, icon: Mic2,      color: "#C9A84C" },
}

export default function IncomeCalculator() {
  const [skill, setSkill] = useState("Programming")
  const [hours, setHours] = useState(20)

  const calc = useMemo(() => {
    const rate = skillRates[skill].rate
    const weekly = hours * rate
    const monthly = weekly * 4
    const yearly = monthly * 12
    return { weekly, monthly, yearly }
  }, [skill, hours])

  const format = (num: number) => new Intl.NumberFormat("id-ID").format(num)

  return (
    <section id="calculator" className="relative py-24 bg-[#0F172A] font-sans">
      <div className="relative max-w-4xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-[#F0D060] text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <Sparkles className="w-3 h-3" /> Financial Simulator
          </motion.div>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            Profit <span className="text-[#1F7A63]">Projection.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium">Estimasi pendapatan digital Anda berdasarkan keahlian dan jam kerja.</p>
        </div>

        {/* CALCULATOR TOOL */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[48px] p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 gap-12">
            
            {/* INPUTS */}
            <div className="space-y-10">
              <div className="relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block ml-2">Pilih Keahlian Utama</label>
                <div className="relative group">
                  <select 
                    className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#1F7A63] transition-all cursor-pointer"
                    value={skill} 
                    onChange={e => setSkill(e.target.value)}
                  >
                    {Object.keys(skillRates).map(s => (
                      <option key={s} value={s} className="bg-[#0F172A]">{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none group-hover:text-white" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-6 px-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Waktu Investasi / Minggu</label>
                  <div className="font-serif text-4xl font-black text-white tracking-tighter">
                    {hours}<span className="text-lg text-[#1F7A63] ml-1">Jam</span>
                  </div>
                </div>
                <div className="relative h-12 flex items-center">
                  <input 
                    type="range" min={1} max={60} value={hours} 
                    onChange={e => setHours(Number(e.target.value))} 
                    className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#1F7A63]"
                  />
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[9px] font-black text-slate-600 uppercase tracking-tighter">
                    <span>Part-time</span>
                    <span>Standard (40h)</span>
                    <span>Max Effort</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RESULTS DASHBOARD */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5">
              {[
                { label: "Weekly", val: calc.weekly, icon: Clock, col: "text-slate-400" },
                { label: "Monthly", val: calc.monthly, icon: Calendar, col: "text-[#1F7A63]" },
                { label: "Yearly", val: calc.yearly, icon: TrendingUp, col: "text-[#F0D060]" },
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.03)" }}
                  className={`p-8 rounded-[32px] text-center border transition-all ${
                    i === 1 ? 'border-[#1F7A63]/30 bg-[#1F7A63]/5' : 'border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mx-auto mb-4 ${item.col}`} />
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">{item.label}</p>
                  <h4 className={`text-xl md:text-2xl font-black tracking-tight ${i === 1 ? 'text-[#1F7A63]' : 'text-white'}`}>
                    <span className="text-xs mr-1 opacity-40">Rp</span>{format(item.val)}
                  </h4>
                </motion.div>
              ))}
            </div>

            {/* AI SMART INSIGHT */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={skill + hours}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-5 p-6 bg-white/[0.03] border border-white/5 rounded-3xl"
              >
                <div className="w-12 h-12 bg-[#F0D060]/10 rounded-xl flex items-center justify-center text-[#F0D060] shrink-0">
                   <Coins className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-400 leading-relaxed">
                  Bekerja sebagai <span className="text-white font-bold">{skill}</span> selama <span className="text-white font-bold">{hours} jam</span> per minggu dapat menghasilkan aset senilai <span className="text-[#1F7A63] font-black text-lg">Rp {format(calc.monthly)}</span> per bulan.
                </p>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  )
}