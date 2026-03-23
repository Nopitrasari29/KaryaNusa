import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Instagram, Twitter, Linkedin, Github, 
  Mail, X, Star, 
  Info, ShieldCheck, MessageSquare, CheckCircle2, Sparkles 
} from "lucide-react";

type Props = { onGetStarted: () => void };

export default function Footer({ onGetStarted }: Props) {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [feedback, setFeedback] = useState({ name: "", message: "", rating: 0 });
  const [submitted, setSubmitted] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmitFeedback = async () => {
    if (!feedback.message.trim()) return;
    try {
      const userSkill = localStorage.getItem('user_identified_skill') || "Umum";
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/feedback`, {
          name: feedback.name || "Anonim",
          message: feedback.message,
          rating: feedback.rating,
          skill: userSkill
        });
      } catch (err) { console.error("DB Error:", err); }

      await fetch("https://formspree.io/f/xpqyrqpo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...feedback, identified_skill: userSkill })
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFeedback({ name: "", message: "", rating: 0 });
        setShowModal(null);
      }, 2500);
    } catch (error) {
      alert("Terjadi kesalahan.");
    }
  };

  const modalContent: Record<string, { title: string; icon: any; content: React.ReactNode }> = {
    "Tentang Kami": {
      title: "Tentang KARYANUSA",
      icon: Info,
      content: (
        <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
          <p><strong className="text-[#1F7A63]">KARYANUSA</strong> adalah pionir platform berbasis AI untuk mendemokrasi akses ekonomi bagi seluruh masyarakat Indonesia.</p>
          <div className="grid grid-cols-3 gap-2">
            {[{ n: "10K+", l: "User" }, { n: "50+", l: "Peluang" }, { n: "2026", l: "Est." }].map(s => (
              <div key={s.l} className="text-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-[#1E3A5F]">{s.n}</div>
                <div className="text-[8px] uppercase text-slate-400 font-bold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    "Kebijakan Privasi": {
      title: "Kebijakan Privasi",
      icon: ShieldCheck,
      content: (
        <div className="space-y-3">
          {[
            { t: "Keamanan Data", d: "Enkripsi tingkat tinggi untuk data input Anda." },
            { t: "Transparansi AI", d: "Data digunakan murni untuk algoritma rekomendasi." }
          ].map(i => (
            <div key={i.t} className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1F7A63] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-[#1E3A5F]">{i.t}</h5>
                <p className="text-[11px] text-slate-500">{i.d}</p>
              </div>
            </div>
          ))}
        </div>
      )
    }
  };

  return (
    <footer className="bg-[#1E3A5F] text-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 border-b border-white/5 pb-10">
          
          {/* BRAND */}
          <div className="md:col-span-2">
            <span className="text-2xl font-serif font-black tracking-tighter block mb-4">
              KARYANUSA<span className="text-[#F0D060]">.</span>
            </span>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Pemberdayaan talenta berbasis AI untuk menciptakan kemandirian ekonomi digital bagi seluruh masyarakat Indonesia.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#F0D060] transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* NAV LINKS */}
          <div>
            <h4 className="text-[10px] font-black text-[#F0D060] uppercase tracking-widest mb-5">Eksplorasi</h4>
            <ul className="space-y-3 text-xs font-bold text-slate-300">
              <li><button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-white transition-all">Skill Discovery</button></li>
              <li><button onClick={() => setShowModal("feedback")} className="hover:text-white transition-all flex items-center gap-2">Kirim Feedback <Sparkles className="w-3 h-3 text-[#F0D060]" /></button></li>
              <li><button onClick={onGetStarted} className="px-4 py-2 bg-[#1F7A63] text-white rounded-lg hover:bg-[#25957A] transition-all mt-2">Mulai Journey</button></li>
            </ul>
          </div>

          {/* INFO LINKS */}
          <div>
            <h4 className="text-[10px] font-black text-[#F0D060] uppercase tracking-widest mb-5">Informasi</h4>
            <ul className="space-y-3 text-xs font-bold text-slate-300">
              <li><button onClick={() => setShowModal("Tentang Kami")} className="hover:text-white transition-all">Tentang Kami</button></li>
              <li><button onClick={() => setShowModal("Kebijakan Privasi")} className="hover:text-white transition-all">Kebijakan Privasi</button></li>
              <li><a href="mailto:hello@karyanusa.id" className="flex items-center gap-2 hover:text-white transition-all"><Mail className="w-3.5 h-3.5" /> hello@karyanusa.id</a></li>
            </ul>
          </div>

          {/* COMPACT HELP BOX */}
          <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
            <h4 className="text-[10px] font-black text-[#F0D060] uppercase tracking-widest mb-4">Butuh Bantuan?</h4>
            <p className="text-[11px] text-slate-400 mb-4 font-medium leading-relaxed">Punya masukan untuk tim pengembang Karyanusa?</p>
            <button 
              onClick={() => setShowModal("feedback")} 
              className="w-full py-3 bg-white text-[#1E3A5F] font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#F0D060] transition-all"
            >
              Hubungi Kami
            </button>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            © {currentYear} KARYANUSA — Empowering Indonesian Talents.
          </p>
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase">
        
          </div>
        </div>
      </div>

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} 
              className="bg-white rounded-[40px] w-full max-w-sm p-8 relative shadow-2xl border border-white/10 overflow-hidden"
            >
              <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"><X className="w-4 h-4" /></button>
              
              {showModal === "feedback" ? (
                submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="text-6xl">🎉</div>
                    <h3 className="text-xl font-black text-[#1E3A5F]">Tersimpan!</h3>
                    <p className="text-slate-500 text-xs px-4 leading-relaxed">Terima kasih atas kontribusi Anda membangun KARYANUSA.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <MessageSquare className="w-6 h-6 text-[#1F7A63]" />
                       <h3 className="text-xl font-black text-[#1E3A5F]">Feedback</h3>
                    </div>
                    <div className="flex justify-center gap-2 pb-2">
                       {[1,2,3,4,5].map(n => (
                         <button key={n} onClick={() => setFeedback(p => ({...p, rating: n}))}>
                           <Star className={`w-7 h-7 ${n <= feedback.rating ? "fill-[#F0D060] text-[#F0D060]" : "text-slate-200"}`} />
                         </button>
                       ))}
                    </div>
                    <div className="space-y-3">
                       <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-[#1F7A63]" placeholder="Nama (opsional)" value={feedback.name} onChange={e => setFeedback(p => ({...p, name: e.target.value}))} />
                       <textarea className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-[#1F7A63] min-h-[120px]" placeholder="Pesan Anda... *" value={feedback.message} onChange={e => setFeedback(p => ({...p, message: e.target.value}))} />
                    </div>
                    <button onClick={handleSubmitFeedback} disabled={!feedback.message.trim()} className="w-full py-4 bg-[#1F7A63] text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all">KIRIM SEKARANG</button>
                  </div>
                )
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-green-50 rounded-xl text-[#1F7A63]">
                      {/* FIX: Menggunakan React.createElement untuk memanggil ikon dari objek */}
                      {React.createElement(modalContent[showModal]?.icon || Info, { className: "w-5 h-5" })}
                    </div>
                    <h3 className="text-xl font-black text-[#1E3A5F]">{modalContent[showModal]?.title}</h3>
                  </div>
                  {modalContent[showModal]?.content}
                  <button onClick={() => setShowModal(null)} className="w-full py-3 bg-slate-900 text-white font-black rounded-xl uppercase text-[9px] tracking-widest">Tutup</button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}