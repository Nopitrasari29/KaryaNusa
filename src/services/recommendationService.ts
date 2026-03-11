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
    },
    {
      title: "Template Marketplace",
      difficulty: "Medium",
      income: "High"
    }
  ],

  "Programming": [
    {
      title: "Freelance Web Developer",
      difficulty: "Medium",
      income: "High"
    },
    {
      title: "Website UMKM",
      difficulty: "Medium",
      income: "High"
    }
  ]

}

export function getOpportunities(skill: string) {

  return opportunities[skill] || []

}