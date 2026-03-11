import { useState } from "react"

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import Features from "../components/Features"
import SkillDiscovery from "../components/SkillDiscovery"
import Opportunities from "../components/Opportunities"
import BusinessRoadmap from "../components/BusinessRoadmap"
import SuccessStory from "../components/SuccessStory"
import AIChatAssistant from "../components/AIChatAssistant"
import Footer from "../components/Footer"

export default function HomePage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [confidenceScore, setConfidenceScore] = useState<number>(0)

  const handleSkillSelect = (skill: string, score: number) => {
    setSelectedSkill(skill)
    setConfidenceScore(score)
  }

  return (
    <div className="bg-[#F6F5F2] text-[#2B2B2B]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <SkillDiscovery onSelectSkill={handleSkillSelect} />
      <Opportunities skill={selectedSkill} score={confidenceScore} />
      <BusinessRoadmap skill={selectedSkill} />
      <SuccessStory />
      <AIChatAssistant />
      <Footer />
    </div>
  )
}