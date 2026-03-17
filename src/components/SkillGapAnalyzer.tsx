type Props = {
  skill: string | null
}

const skillGaps: Record<string, string[]> = {

  Programming: [
    "Belajar Git dan Version Control",
    "Deploy aplikasi ke cloud",
    "Belajar testing software"
  ],

  "Desain Grafis": [
    "Branding strategy",
    "UI/UX research",
    "Motion design"
  ],

  Marketing: [
    "Analytics data",
    "Conversion optimization",
    "Email marketing"
  ],

  Fotografi: [
    "Lighting studio",
    "Color grading",
    "Stock photography"
  ],

  Menulis: [
    "SEO writing",
    "Storytelling",
    "Content strategy"
  ]

}

export default function SkillGapAnalyzer({ skill }: Props) {

  if (!skill) return null

  const gaps = skillGaps[skill] || []

  return (
    <section className="py-16 bg-[#F8FAFB]">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold text-center mb-8 text-[#1E3A5F]">
          Skill Gap Analyzer
        </h2>

        <div className="grid gap-4">

          {gaps.map((gap, index) => (

            <div
              key={index}
              className="p-4 bg-white border rounded-lg shadow-sm"
            >
              {gap}
            </div>

          ))}

        </div>

      </div>

    </section>
  )
}