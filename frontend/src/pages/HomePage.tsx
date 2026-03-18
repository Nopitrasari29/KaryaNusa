import { useState } from "react"

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import Features from "../components/Features"
import SkillComparisonChart from "../components/SkillComparisonChart"
import SkillDiscovery from "../components/SkillDiscovery"
import Opportunities from "../components/Opportunities"
import BusinessRoadmap from "../components/BusinessRoadmap"
import SuccessStory from "../components/SuccessStory"
import AIChatAssistant from "../components/AIChatAssistant"
import Footer from "../components/Footer"
import BackToTop from "../components/BackToTop"
import WaveDivider from "../components/WaveDivider"
import IncomeCalculator from "../components/IncomeCalculator"
import BadgeSection from "../components/BadgeSection"
import OpportunityTrend from "../components/OpportunityTrend"
import SkillGapAnalyzer from "../components/SkillGapAnalyzer"
import ShareResult from "../components/ShareResult"
import AnalyticsDashboard from "../components/AnalyticsDashboard"
import CommunityBoard from "../components/CommunityBoard"
import DarkModeToggle from "../components/DarkModeToggle"
import PWAInstall from "../components/PWAInstall"
import Onboarding from "../components/Onboarding"
import RoadmapReminder from "../components/RoadmapReminder"

export default function HomePage() {

  const [selectedSkill, setSelectedSkill] = useState<string>("Programming")
  const [confidenceScore, setConfidenceScore] = useState<number>(0)
  const [roadmapProgress, setRoadmapProgress] = useState(0)
  const [finishedPhases, setFinishedPhases] = useState<number>(0); 

  const handleSkillSelect = (skill: string, score: number) => {
  setSelectedSkill(skill)
  setConfidenceScore(score)}

  return (
    <div className="bg-[#F6F5F2] text-[#2B2B2B] dark:bg-[#0F172A] dark:text-white">
      <Navbar/>
      <Hero/>
      <WaveDivider/>
      <HowItWorks/>
      <Features/>
      <SkillComparisonChart/>
      <OpportunityTrend/>
      <IncomeCalculator/>
      <SkillDiscovery onSelectSkill={handleSkillSelect} />
      <Opportunities
        skill={selectedSkill}
        score={confidenceScore}
      />
      <SkillGapAnalyzer skill={selectedSkill}/>
      <BusinessRoadmap
        skill={selectedSkill}
        onPhasesComplete={(count: number) => setFinishedPhases(count)} 
        onProgressChange={(pct: number) => setRoadmapProgress(pct)} 
      />
      <RoadmapReminder progress={roadmapProgress}/>
      <BadgeSection phasesCompleted={finishedPhases} />
      <ShareResult skill={selectedSkill} score={confidenceScore}/>
      <AnalyticsDashboard/>
      <SuccessStory/>
      <CommunityBoard/>
      <AIChatAssistant/>
      <Footer/>
      <BackToTop/>
      <DarkModeToggle/>
      <PWAInstall/>
      <Onboarding/>
    </div>
  )
}