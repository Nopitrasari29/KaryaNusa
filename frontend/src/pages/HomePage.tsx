import { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"

// Components
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import Features from "../components/Features"
import SkillComparisonChart from "../components/SkillComparisonChart"
import OpportunityTrend from "../components/OpportunityTrend"
import IncomeCalculator from "../components/IncomeCalculator"
import SuccessStory from "../components/SuccessStory"
import AnalyticsDashboard from "../components/AnalyticsDashboard"
import Footer from "../components/Footer"
import BackToTop from "../components/BackToTop"
import WaveDivider from "../components/WaveDivider"
import AIChatAssistant from "../components/AIChatAssistant"
import JourneyPanel from "../components/JourneyPanel"

export default function HomePage() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => { 
    setIsLoaded(true) 
  }, [])

  // VARIANT UNTUK SENSASI SCROLL REPEATABLE (MUNCUL BOLAK BALIK)
  const revealVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      transition: { duration: 0.5 } 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.21, 0.45, 0.32, 0.9] 
      } 
    }
  }

  return (
    <div className="relative font-sans bg-[#0F172A] text-white selection:bg-[#1F7A63]/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {panelOpen ? (
          <motion.div 
            key="journey" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.05 }} 
            className="fixed inset-0 z-[2000]"
          >
            <JourneyPanel onClose={() => setPanelOpen(false)} />
          </motion.div>
        ) : (
          <motion.div 
            key="landing" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: isLoaded ? 1 : 0 }} 
            className="flex flex-col"
          >
            <Navbar onGetStarted={() => setPanelOpen(true)} />
            
            {/* 1. HERO (MUNCUL PERTAMA) */}
            <Hero onGetStarted={() => setPanelOpen(true)} />
            
            {/* 2. HOW IT WORKS (SOFT DARK BG) */}
            <div className="relative bg-[#1E293B]">
              <WaveDivider color="fill-[#1E293B]" /> 
              
              <motion.section 
                id="how-it-works"
                initial="hidden" 
                whileInView="visible" 
                // once: false bikin efeknya muncul setiap kali masuk layar (atas/bawah)
                // amount: 0.2 biar animasinya jalan pas 20% bagian section udah keliatan
                viewport={{ once: false, amount: 0.2 }}
                variants={revealVariants}
                className="py-20 md:py-28"
              >
                <HowItWorks />
              </motion.section>

              <WaveDivider color="fill-[#0F172A]" rotate={true} />
            </div>

            {/* 3. FEATURES (DEEP DARK BG) */}
            <motion.section 
              id="features"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false, amount: 0.2 }}
              variants={revealVariants}
              className="py-20 md:py-32 bg-[#0F172A]"
            >
              <Features />
            </motion.section>

            {/* 4. MARKET & TREND (SOFT DARK BG) */}
            <div className="relative bg-[#1E293B]">
              <WaveDivider color="fill-[#1E293B]" />
              
              <motion.section 
                id="market"
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: false, amount: 0.1 }}
                variants={revealVariants}
                className="py-20 md:py-32 space-y-32"
              >
                <SkillComparisonChart />
                <OpportunityTrend />
              </motion.section>

              <WaveDivider color="fill-[#0F172A]" rotate={true} />
            </div>

            {/* 5. CALCULATOR (DEEP DARK BG) */}
            <motion.section 
              id="calculator"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false, amount: 0.2 }}
              variants={revealVariants}
              className="py-20 md:py-32 bg-[#0F172A]"
            >
              <IncomeCalculator />
            </motion.section>

            {/* 6. GLOBAL IMPACT (SOFT DARK BG) */}
            <div className="relative bg-[#1E293B]">
              <WaveDivider color="fill-[#1E293B]" />
              
              <motion.section 
                id="analytics"
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: false, amount: 0.2 }}
                variants={revealVariants}
                className="py-20 md:py-28"
              >
                <AnalyticsDashboard />
              </motion.section>

              <WaveDivider color="fill-[#0F172A]" rotate={true} />
            </div>

            {/* 7. SUCCESS STORIES (DEEP DARK BG) */}
            <motion.section 
              id="stories"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false, amount: 0.2 }}
              variants={revealVariants}
              className="py-24 bg-[#0F172A]"
            >
              <SuccessStory />
            </motion.section>

            {/* 8. FOOTER */}
            <Footer onGetStarted={() => setPanelOpen(true)} />

            <BackToTop />
            <AIChatAssistant />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}