import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Rocket, Zap, CheckCircle2, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      icon: BrainCircuit,
      title: "Profiling & Ingestion",
      desc: "Algoritma kami menganalisis data psikometrik, hobi, dan pengalaman harianmu untuk memetakan pola talenta unik.",
      color: "#1F7A63",
      tag: "Neural Data"
    },
    {
      id: "02",
      icon: Cpu,
      title: "Deep AI Mapping",
      desc: "Jawabanmu diproses melalui database peluang ekonomi 2026 untuk menemukan 'Hidden Skill' bernilai profit tinggi.",
      color: "#F0D060",
      tag: "AI Processing"
    },
    {
      id: "03",
      icon: Rocket,
      title: "Monetization Path",
      desc: "Kami menyusun Roadmap bisnis eksklusif, strategi pemasaran, hingga platform yang tepat untuk mulai menghasilkan uang.",
      color: "#25957A",
      tag: "Ready to Launch"
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 bg-[#0F172A] overflow-hidden font-sans">
      
      {/* ── ATMOSPHERIC ELEMENTS ── */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1F7A63]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F0D060]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-14">
        
        {/* HEADER: Lebih Berani & Berwarna */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#F0D060] text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Zap className="w-3 h-3 fill-[#F0D060]" /> Intelligent Workflow
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-8">
            The Science Behind <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F7A63] to-[#25957A]">Karyanusa.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            Sistem kami menjembatani kesenjangan antara <span className="text-white border-b-2 border-[#1F7A63]">keahlian mentah</span> dan <span className="text-white border-b-2 border-[#F0D060]">ekosistem ekonomi digital</span>.
          </p>
        </div>

        {/* STEPS GRID: Lebih Padat & Detail */}
        <div className="grid md:grid-cols-3 gap-10 relative">
          
          {/* Garis Penghubung Neon */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1F7A63]/30 to-transparent -translate-y-1/2 -z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              whileHover={{ y: -15 }}
              className="group relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[56px] p-10 shadow-2xl transition-all duration-500 hover:border-[#1F7A63]/50"
            >
              {/* Watermark Number */}
              <div className="absolute top-8 right-12 text-8xl font-black text-white/[0.03] italic select-none group-hover:text-[#1F7A63]/10 transition-colors">
                {step.id}
              </div>

              {/* Icon Container */}
              <div className="relative mb-10">
                <div className="w-20 h-20 rounded-[28px] bg-slate-800 flex items-center justify-center shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <step.icon className="w-9 h-9" style={{ color: step.color }} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#0F172A] p-1.5 rounded-full border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
              </div>

              {/* Tag Label */}
              <div className="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500 mb-6">
                {step.tag}
              </div>

              <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-[#F0D060] transition-colors uppercase leading-none">
                {step.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-10">
                {step.desc}
              </p>

              {/* Decorative Button Element */}
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#1F7A63] opacity-40 group-hover:opacity-100 transition-all">
                Learn Engine <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER CTA SECTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-1 rounded-[40px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        >
          <div className="bg-[#0F172A] rounded-[40px] px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 rounded-2xl bg-[#1F7A63]/10 flex items-center justify-center">
                  <Zap className="text-[#F0D060] w-7 h-7" />
               </div>
               <div className="text-left">
                  <h4 className="text-white font-bold text-lg">Siap mengeksekusi potensimu?</h4>
                  <p className="text-slate-500 text-sm">Gunakan mesin AI kami untuk hasil yang akurat.</p>
               </div>
            </div>
            <button className="w-full md:w-auto px-10 py-4 bg-white text-[#0F172A] font-black rounded-2xl hover:bg-[#F0D060] transition-all uppercase tracking-widest text-xs shadow-xl shadow-white/5">
              Analyze Now
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}