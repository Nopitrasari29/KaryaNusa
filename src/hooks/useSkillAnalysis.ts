import { useState } from "react"

export function useSkillAnalysis() {

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const selectSkill = (skill: string) => {
    setSelectedSkill(skill)
  }

  return {
    selectedSkill,
    selectSkill
  }

}