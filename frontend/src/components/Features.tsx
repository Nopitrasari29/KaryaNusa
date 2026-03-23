import { motion } from "framer-motion";
import { BrainCircuit, Compass, Bot, ArrowUpRight } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: BrainCircuit,
      title: "Skill Discovery",
      desc: "Algoritma AI tingkat tinggi untuk mengidentifikasi keahlian yang paling laku di pasar global saat ini.",
      color: "from-[#1F7A63] to-[#25957A]"
    },
    {
      icon: Compass,
      title: "Smart Opportunities",
      desc: "Bukan sekadar saran, kami memberikan data real-time tentang demand pasar dan potensi profit tiap skill.",
      color: "from-[#1E3A5F] to-[#1F7A63]"
    },
    {
      icon: Bot,
      title: "AI Business Mentor",
      desc: "Chatbot mentor yang tersedia 24/7 untuk membimbing strategi pemasaran dan manajemen bisnis kamu.",
      color: "from-[#F0D060] to-[#C9A84C]"
    }
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 font-sans py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
        {/* Menggunakan motion di sini agar error hilang dan teks muncul perlahan */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-black text-white leading-none mb-6">
            TEKNOLOGI <br/> <span className="text-[#1F7A63]">MASA DEPAN.</span>
          </h2>
          <p className="text-slate-400 text-lg">Platform pertama di Indonesia yang menggunakan Deep Analysis AI untuk ekonomi digital.</p>
        </motion.div>
        
        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-xs uppercase tracking-widest hover:bg-[#1F7A63] transition-all">
          Explore All Features
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden bg-slate-900/50 backdrop-blur-md rounded-[48px] p-10 border border-white/5 hover:border-white/20 transition-all duration-500"
          >
            <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-8 shadow-lg`}>
              <f.icon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-[#F0D060] transition-colors">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">{f.desc}</p>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors">
              Learn Technical Details <ArrowUpRight className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}