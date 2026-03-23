import { motion, type Variants } from "framer-motion";
import { Sparkles, Bot, Code2, Target, Lock, TrendingUp, Zap, ArrowRight } from "lucide-react";

type Props = { onGetStarted: () => void };

export default function Hero({ onGetStarted }: Props) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative w-full pt-40 pb-20 bg-[#0F172A] flex items-center overflow-hidden min-h-screen"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#1F7A63]/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#F0D060]/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-14 grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        
        {/* KIRI: CONTENT */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-xl text-center lg:text-left">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full mx-auto lg:mx-0">
            <Zap className="w-3.5 h-3.5 text-[#F0D060] fill-[#F0D060]" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Next-Gen AI Platform</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-8 tracking-tight">
            Temukan Potensi <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0D060] via-[#1F7A63] to-[#F0D060] animate-shimmer bg-[length:200%_auto]">Keterampilanmu</span> <br/> 
            <span className="text-white/90 font-sans">dengan AI.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl mb-12 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
            Ubah keahlian sehari-hari menjadi sumber <span className="text-[#F0D060] font-bold">aset ekonomi</span> melalui bimbingan AI Mentor.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-5">
            <button onClick={onGetStarted} className="px-8 py-4 bg-[#1F7A63] text-white font-black rounded-2xl hover:bg-[#25957A] transition-all shadow-xl hover:scale-105 active:scale-95 uppercase text-[10px] tracking-widest">
              Mulai Analisis
            </button>
            <button onClick={() => scrollTo('how-it-works')} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2 text-[10px] tracking-widest uppercase">
              Pelajari Fitur <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* KANAN: COMPACT AI CARD */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center lg:justify-end">
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-slate-900/60 backdrop-blur-xl rounded-[40px] p-8 md:p-10 border border-white/10 shadow-2xl w-full max-w-[380px] relative z-10"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1F7A63] to-[#25957A] rounded-xl flex items-center justify-center text-white"><Bot className="w-7 h-7" /></div>
                <div><div className="font-bold text-white text-sm uppercase">KARYANUSA AI</div><div className="text-[9px] font-black text-green-400 uppercase tracking-widest">Ready...</div></div>
              </div>
              <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500/50" /><div className="w-2 h-2 rounded-full bg-yellow-500/50" /><div className="w-2 h-2 rounded-full bg-green-500/50" /></div>
            </div>
            <div className="space-y-4">
               <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                  <Code2 className="w-5 h-5 text-slate-400" />
                  <div><div className="text-[9px] text-slate-500 font-black uppercase">Skill</div><div className="font-bold text-white text-sm">Engineering</div></div>
               </div>
               <div className="p-5 bg-[#1F7A63]/10 rounded-2xl border border-[#1F7A63]/20 flex items-center gap-4">
                  <Target className="w-5 h-5 text-[#1F7A63]" />
                  <div><div className="text-[9px] text-[#1F7A63] font-black uppercase">Opportunity</div><div className="font-bold text-white text-sm">SaaS Expert</div></div>
               </div>
            </div>
            <button onClick={onGetStarted} className="w-full mt-8 py-4 bg-white text-[#0F172A] font-black rounded-xl hover:bg-[#F0D060] transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest shadow-xl">
              Start Analyze
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}