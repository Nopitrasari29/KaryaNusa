import { motion } from "framer-motion"
import { cn } from "../lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar" // Pastikan folder namanya 'ui' kecil
import { Quote, Sparkles, TrendingUp } from "lucide-react" // CheckCircle2 dihapus karena tidak dipakai

const stories = [
  { name: "Rizky Aditya", handle: "@rizky_dev", skill: "Programming", income: "Rp 8jt/bln", text: "Dulu skill codingku cuma hobi, sekarang dapet klien nyata berkat roadmap Karyanusa.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { name: "Sari Dewi", handle: "@saridesign", skill: "Desain Grafis", income: "Rp 5jt/bln", text: "Roadmap Karyanusa sangat praktis, hobi desain saya kini menghasilkan profit di Canva.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  { name: "Fajar Nugroho", handle: "@fajar_mkt", skill: "Marketing", income: "Rp 12jt/bln", text: "Karyanusa kasih tau cara dapet klien pertama dalam 3 minggu. Sangat aplikatif!", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { name: "Nadya Rahma", handle: "@nad_writer", skill: "Menulis", income: "Rp 6jt/bln", text: "AI Assistant bantu susun strategi e-book sampai jadi bestseller. Hobiku sekarang dibayar.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
  { name: "Bima Sakti", handle: "@bima_photo", skill: "Fotografi", income: "Rp 10jt/bln", text: "Kini jadwal pemotretan penuh! Dari portofolio sampe pricing dibantu Karyanusa.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { name: "Citra M.", handle: "@citra_speak", skill: "Public Speaking", income: "Rp 15jt/bln", text: "Sekali tampil bisa dapat lebih dari UMR. Terima kasih Karyanusa!", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
]

export default function SuccessStory() {
  return (
    <section id="success" className="relative py-24 bg-[#0F172A] overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1F7A63]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F0D060]/5 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 text-center">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#F0D060] text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            <Sparkles className="w-3 h-3 fill-[#F0D060]" /> Real Impact Stories
          </motion.div>
          <h2 className="max-w-[800px] text-4xl font-serif font-black text-white md:text-6xl tracking-tighter uppercase leading-none">
            Mereka Sudah <span className="text-[#1F7A63]">Membuktikannya.</span>
          </h2>
          <p className="max-w-[600px] text-slate-400 text-lg font-medium">
            Bergabunglah dengan ribuan talenta yang telah bertransformasi dari hobi menjadi penghasilan nyata.
          </p>
        </div>

        {/* Marquee Section */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-4 [--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex gap-[var(--gap)]">
                  {stories.map((story, i) => (
                    <div
                      key={`${setIdx}-${i}`}
                      className={cn(
                        "flex flex-col rounded-[32px] border border-white/10 shadow-2xl",
                        "bg-slate-900/40 backdrop-blur-xl",
                        "p-8 text-start w-[350px] transition-all duration-500 hover:border-[#1F7A63]/50 hover:-translate-y-2"
                      )}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-white/10">
                            <AvatarImage src={story.avatar} alt={story.name} />
                            <AvatarFallback className="bg-[#1F7A63] text-white">KN</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <h3 className="text-sm font-black text-white tracking-tight leading-none uppercase">
                              {story.name}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-bold mt-1">
                              {story.handle}
                            </p>
                          </div>
                        </div>
                        <div className="p-2 bg-[#1F7A63]/10 rounded-lg">
                           <TrendingUp className="w-4 h-4 text-[#1F7A63]" />
                        </div>
                      </div>

                      <div className="relative mb-6">
                         <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/5" />
                         <p className="text-sm text-slate-300 font-medium leading-relaxed italic relative z-10">
                            "{story.text}"
                         </p>
                      </div>

                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                         <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Skill</span>
                            <span className="text-xs font-bold text-[#1F7A63]">{story.skill}</span>
                         </div>
                         <div className="flex flex-col text-right">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Revenue</span>
                            <span className="text-xs font-black text-[#F0D060]">{story.income}</span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-[#0F172A] sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-[#0F172A] sm:block" />
        </div>

        {/* Global Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-6">
           {[
             { label: "Talenta Aktif", val: "10.000+", desc: "Tumbuh setiap hari" },
             { label: "Rata-rata Profit", val: "Rp 15jt", desc: "Per bulan per user" },
             { label: "Success Rate", val: "98%", desc: "Berdasarkan roadmap" }
           ].map((stat, i) => (
             <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] shadow-inner text-center">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{stat.label}</div>
                <div className="text-4xl font-serif font-black text-white mb-1 tracking-tight">{stat.val}</div>
                <div className="text-xs font-bold text-[#1F7A63] uppercase tracking-tighter opacity-60">{stat.desc}</div>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}