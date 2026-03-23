import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Code2, Palette, Megaphone, Mic2, Camera, PenTool, 
  TrendingUp, BarChart3, Info, Zap, DollarSign, Activity
} from "lucide-react"

const skillData = [
  { id: 1, skill: "Programming",     icon: Code2,    color: "#1F7A63", max: 15, passive: 5,  demand: 95 },
  { id: 2, skill: "Marketing",       icon: Megaphone,color: "#EF4444", max: 10, passive: 5,  demand: 92 },
  { id: 3, skill: "Desain Grafis",   icon: Palette,  color: "#6366F1", max: 10, passive: 3,  demand: 88 },
  { id: 4, skill: "Public Speaking", icon: Mic2,     color: "#F0D060", max: 15, passive: 8,  demand: 78 },
  { id: 5, skill: "Menulis",         icon: PenTool,  color: "#EC4899", max: 5,  passive: 3,  demand: 82 },
  { id: 6, skill: "Fotografi",       icon: Camera,   color: "#F59E0B", max: 8,  passive: 2,  demand: 80 },
]

type Tab = "income" | "passive" | "demand"

export default function SkillComparisonChart() {
  const [activeTab, setActiveTab] = useState<Tab>("income")

  const tabs = [
    { key: "income", label: "Max Income", icon: DollarSign, desc: "Potensi penghasilan aktif/jasa per bulan" },
    { key: "passive", label: "Passive Income", icon: Zap, desc: "Potensi royalti/produk digital per bulan" },
    { key: "demand", label: "Market Demand", icon: Activity, desc: "Tingkat kebutuhan industri global 2026" },
  ] as const;

  const getActiveValue = (s: typeof skillData[0]) => {
    if (activeTab === "income") return { val: s.max, label: `Rp ${s.max}jt` }
    if (activeTab === "passive") return { val: s.passive, label: `Rp ${s.passive}jt` }
    return { val: s.demand, label: `${s.demand}%` }
  }

  const maxPossibleVal = activeTab === "demand" ? 100 : 15;

  return (
    <section id="comparison" className="relative py-24 bg-[#0F172A] overflow-hidden">
      {/* Dekorasi Background Khusus (Berbeda dari section lain) */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: `radial-gradient(#1F7A63 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />

      <div className="relative max-w-5xl mx-auto px-6">
        
        {/* HEADER TOOL STYLE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="max-w-md">
            <h2 className="font-serif text-4xl font-black text-white tracking-tight mb-4 uppercase">
              Skill <span className="text-[#1F7A63]">Intelligence.</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium">Bandingkan metrik ekonomi setiap keahlian untuk menentukan strategi karirmu.</p>
          </div>

          {/* TABS CONTROLLER (Gaya Alat Profesional) */}
          <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-white/5 flex gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    isActive ? "bg-[#1F7A63] text-white shadow-lg shadow-green-900/20" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* DATA GRID DISPLAY */}
        <div className="bg-slate-900/40 backdrop-blur-md rounded-[40px] border border-white/5 p-8 md:p-12">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {/* Deskripsi Metrik Terpilih */}
              <div className="flex items-center gap-3 text-[#F0D060] bg-[#F0D060]/5 w-fit px-4 py-2 rounded-full border border-[#F0D060]/10">
                <Info className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">{tabs.find(t => t.key === activeTab)?.desc}</span>
              </div>

              {/* Bar Rows */}
              <div className="space-y-8">
                {skillData
                  .sort((a, b) => getActiveValue(b).val - getActiveValue(a).val)
                  .map((s) => {
                    const { val, label } = getActiveValue(s);
                    const percentage = (val / maxPossibleVal) * 100;

                    return (
                      <div key={s.id} className="group relative">
                        <div className="flex items-center justify-between mb-3 px-1">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg text-slate-400 group-hover:text-white transition-colors">
                               <s.icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold text-slate-200 uppercase tracking-tighter">{s.skill}</span>
                          </div>
                          <span className="text-sm font-black text-white font-mono">{label}</span>
                        </div>

                        {/* Track & Glow Bar */}
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                            className="h-full rounded-full relative"
                            style={{ backgroundColor: s.color }}
                          >
                            {/* Efek Cahaya di Ujung Bar */}
                            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30" />
                          </motion.div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Legend Area */}
          <div className="mt-16 pt-8 border-t border-white/5 grid md:grid-cols-2 gap-8 items-center">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl">
                   <BarChart3 className="text-[#1F7A63] w-6 h-6" />
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic uppercase tracking-wider">
                  * Data simulasi berdasarkan rata-rata industri kreatif 2026. <br/>
                  Metrik dapat berubah sesuai domisili dan jam terbang.
                </p>
             </div>
             <div className="flex justify-end gap-3">
                <div className="h-10 px-6 rounded-full border border-white/10 flex items-center gap-2 text-white/40 text-[9px] font-black uppercase">
                   <TrendingUp className="w-3 h-3" /> Growth Verified
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}