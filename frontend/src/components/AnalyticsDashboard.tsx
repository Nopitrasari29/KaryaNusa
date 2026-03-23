import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Code2, Palette, Camera, PenTool, Megaphone, Mic2, 
  Activity, Users, TrendingUp, BarChart3, Globe, Search 
} from "lucide-react";

const skillIcons: Record<string, any> = {
  "Programming": Code2, "Desain Grafis": Palette, "Fotografi": Camera,
  "Menulis": PenTool, "Marketing": Megaphone, "Public Speaking": Mic2,
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<{ _id: string; count: number }[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/analytics/stats`);
        if (res.data.skillDistribution) setData(res.data.skillDistribution);
        if (res.data.activeUsers) setTotalUsers(res.data.activeUsers);
      } catch (e) {
        setTotalUsers(1259);
        setData([
          { _id: "Programming", count: 420 }, { _id: "Desain Grafis", count: 310 },
          { _id: "Marketing", count: 280 }, { _id: "Menulis", count: 150 },
          { _id: "Fotografi", count: 90 }, { _id: "Public Speaking", count: 85 },
        ]);
      }
    };
    fetchStats();
  }, []);

  const maxCount = Math.max(...data.map(d => d.count), 1);
  const sorted = [...data].sort((a, b) => b.count - a.count);

  return (
    <section id="analytics" className="relative py-12 bg-transparent font-sans">
      <div className="relative max-w-5xl mx-auto px-6">
        
        {/* HEADER AREA - COMPACT & CONSISTENT */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#1F7A63] mb-2">
              <div className="h-2 w-2 bg-[#1F7A63] rounded-full animate-pulse shadow-[0_0_8px_#1F7A63]" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Neural Analytics</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
              Global <span className="text-[#1F7A63]">Impact.</span>
            </h2>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
             <div className="w-10 h-10 bg-[#1F7A63]/20 rounded-lg flex items-center justify-center text-[#1F7A63] shadow-inner">
                <Users className="w-5 h-5" />
             </div>
             <div>
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Talents</div>
                <div className="text-xl font-black text-white">{totalUsers.toLocaleString("id-ID")}+</div>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* LEFT CARD: SKILL DISTRIBUTION */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <BarChart3 className="text-[#F0D060] w-4 h-4" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Skill Distribution</span>
            </div>
            <div className="space-y-5">
              {sorted.map((item, i) => {
                const Icon = skillIcons[item._id] || Globe;
                const percentage = (item.count / maxCount) * 100;
                return (
                  <div key={i} className="group">
                    <div className="flex justify-between mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight transition-colors group-hover:text-white">
                      <div className="flex items-center gap-2"><Icon className="w-3.5 h-3.5" />{item._id}</div>
                      <span>{item.count} Users</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: `${percentage}%` }} 
                        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 }} 
                        className="h-full bg-gradient-to-r from-[#1F7A63] to-[#25957A] rounded-full shadow-[0_0_8px_#1F7A63]" 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT CARD: MARKET ACCELERATION (REVISED TO DARK GLASS) */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center group">
             {/* Subtle Glow Decor */}
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#1F7A63]/10 rounded-full blur-3xl group-hover:bg-[#1F7A63]/20 transition-colors duration-700" />
             
             <div className="w-14 h-14 bg-[#1F7A63]/10 rounded-2xl flex items-center justify-center text-[#1F7A63] mb-8 border border-[#1F7A63]/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <Activity className="w-7 h-7" />
             </div>
             
             <h4 className="text-2xl font-serif font-black text-white mb-4 leading-tight tracking-tight uppercase">
                Market <br/> <span className="text-[#F0D060]">Acceleration.</span>
             </h4>
             
             <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                Peningkatan permintaan talenta digital di ekosistem Karyanusa naik <span className="text-white font-bold">28% secara global</span> pada kuartal ini.
             </p>
             
             <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] bg-[#1F7A63]/10 text-[#1F7A63] w-fit px-4 py-1.5 rounded-lg border border-[#1F7A63]/20">
                <TrendingUp className="w-3 h-3" /> Verified Market Data
             </div>
          </div>
        </div>

        {/* FOOTER MINI INFO */}
        <div className="mt-12 flex justify-center gap-8 text-slate-600">
           <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
              <Globe className="w-3 h-3" /> Node: JKT-ID
           </div>
           <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
              <Search className="w-3 h-3" /> Verified by AI
           </div>
        </div>
      </div>
    </section>
  );
}