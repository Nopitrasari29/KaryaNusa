type Opportunity = {
  title: string
  difficulty: string
  income: string
}

const opportunities: Record<string, Opportunity[]> = {

  "Desain Grafis": [
    {
      title: "Jasa Desain Logo",
      difficulty: "Easy",
      income: "Medium"
    },
    {
      title: "Social Media Designer",
      difficulty: "Easy",
      income: "Medium"
    }
  ],

  "Programming": [
    {
      title: "Freelance Web Developer",
      difficulty: "Medium",
      income: "High"
    },
    {
      title: "Build Website UMKM",
      difficulty: "Medium",
      income: "High"
    }
  ]

}

export function useRecommendation(skill: string | null) {

  if (!skill) return []

  return opportunities[skill] || []

}