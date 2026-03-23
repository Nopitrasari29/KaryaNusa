import { useState } from "react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import { TrendingUp, BarChart3, Info, Globe } from "lucide-react"

const trendData: Record<string, any[]> = {
  Programming: [
    { month: "Jan", demand: 40 }, { month: "Feb", demand: 55 }, { month: "Mar", demand: 70 }, { month: "Apr", demand: 82 }, { month: "Mei", demand: 95 }
  ],
  "Desain Grafis": [
    { month: "Jan", demand: 30 }, { month: "Feb", demand: 42 }, { month: "Mar", demand: 58 }, { month: "Apr", demand: 63 }, { month: "Mei", demand: 75 }
  ],
  Marketing: [
    { month: "Jan", demand: 25 }, { month: "Feb", demand: 38 }, { month: "Mar", demand: 50 }, { month: "Apr", demand: 60 }, { month: "Mei", demand: 72 }
  ],
  Fotografi: [
    { month: "Jan", demand: 28 }, { month: "Feb", demand: 35 }, { month: "Mar", demand: 48 }, { month: "Apr", demand: 52 }, { month: "Mei", demand: 60 }
  ]
}

export default function OpportunityTrend() {
  const skills = Object.keys(trendData) 
  const [activeSkill, setActiveSkill] = useState(skills[0])
  const data = trendData[activeSkill]

  return (
    <section id="trend" className="relative py-20 bg-[#0F172A] overflow-hidden font-sans">
      
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] -right-[5%] w-[400px] h-[400px] bg-[#1F7A63]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[5%] w-[350px] h-[350px] bg-[#F0D060]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        
        {/* HEADER AREA */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-[#1F7A63] text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <Globe className="w-3 h-3" /> Market Intelligence
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
             className="font-serif text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-none"
          >
            Global <span className="text-[#1F7A63]">Demand.</span>
          </motion.h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Pantau pertumbuhan industri untuk memilih keahlian yang paling relevan dengan kebutuhan pasar global.
          </p>
        </div>

        {/* SKILL SELECTOR - GRID 4 KOLOM STABIL */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {skills.map((skill) => {
            const isActive = activeSkill === skill;
            return (
              <button
                key={skill}
                onClick={() => setActiveSkill(skill)}
                className={`relative flex items-center justify-center px-4 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  isActive 
                    ? "bg-[#1F7A63] border-[#1F7A63] text-white shadow-[0_0_20px_rgba(31,122,99,0.3)] scale-105 z-10" 
                    : "bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300"
                }`}
              >
                {skill}
              </button>
            )
          })}
        </div>

        {/* CHART CONTAINER - DARK GLASS UI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/60 backdrop-blur-2xl rounded-[48px] p-8 md:p-12 border border-white/10 shadow-3xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-[#1F7A63]/20 text-[#1F7A63] rounded-2xl shadow-inner">
                  <BarChart3 className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Growth Analytics</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Skill: {activeSkill}</p>
               </div>
            </div>
            <div className="hidden md:flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
               <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
               <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
          </div>

          {/* CHART AREA */}
          <div className="h-[300px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1F7A63" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1F7A63" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 11, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A',
                    borderRadius: '16px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    padding: '12px 16px'
                  }}
                  itemStyle={{ color: '#1F7A63', fontWeight: '900' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="#1F7A63" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorDemand)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* INSIGHT FOOTER - COMPACT */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-white/[0.02] rounded-3xl border border-white/5">
             <div className="flex items-center gap-4">
               <div className="p-2.5 bg-green-500/10 rounded-xl">
                 <TrendingUp className="w-5 h-5 text-[#1F7A63]" />
               </div>
               <p className="text-sm font-medium text-slate-400">
                 Trend permintaan untuk <span className="text-white font-black underline decoration-[#1F7A63]">{activeSkill}</span> meningkat <span className="text-[#1F7A63] font-black">~25%</span> kuartal ini.
               </p>
             </div>
             <div className="flex items-center gap-2 text-[#F0D060] text-[10px] font-black uppercase tracking-[0.2em]">
               <Info className="w-4 h-4" /> Live System
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}