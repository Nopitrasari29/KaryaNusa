import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";

type Props = { onGetStarted: () => void };

export default function Navbar({ onGetStarted }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi navigasi smooth dengan offset (agar tidak tertutup navbar)
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Jarak aman dari atas navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { name: "Discover", id: "how-it-works" },
    { name: "Fitur", id: "features" },
    { name: "Market", id: "trend" },
    { name: "Cerita", id: "success" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled 
          ? "py-3 bg-[#1E3A5F] shadow-2xl border-b border-white/10" 
          : "py-5 bg-[#1E3A5F]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="text-2xl font-serif font-black tracking-tighter text-white">
            KARYANUSA<span className="text-[#F0D060]">.</span>
          </span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 hover:text-[#F0D060] transition-colors"
            >
              {link.name}
            </button>
          ))}
          
          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#1F7A63] to-[#25957A] text-white text-xs font-black tracking-widest rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(31,122,99,0.4)] active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F0D060]" />
            GET STARTED
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#1E3A5F] border-t border-white/10 shadow-2xl overflow-hidden md:hidden"
          >
            <div className="p-6 flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => scrollToSection(link.id)} 
                  className="text-lg font-bold text-white py-2"
                >
                  {link.name}
                </button>
              ))}
              <button onClick={() => { onGetStarted(); setMobileMenuOpen(false); }} className="w-full py-4 bg-[#1F7A63] text-white rounded-xl font-black tracking-widest">
                MULAI SEKARANG
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}