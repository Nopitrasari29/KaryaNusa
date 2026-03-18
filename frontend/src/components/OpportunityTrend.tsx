import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

const trendData: Record<string, any[]> = {

  Programming: [
    { month: "Jan", demand: 40 },
    { month: "Feb", demand: 55 },
    { month: "Mar", demand: 70 },
    { month: "Apr", demand: 82 },
    { month: "Mei", demand: 95 }
  ],

  "Desain Grafis": [
    { month: "Jan", demand: 30 },
    { month: "Feb", demand: 42 },
    { month: "Mar", demand: 58 },
    { month: "Apr", demand: 63 },
    { month: "Mei", demand: 75 }
  ],

  Marketing: [
    { month: "Jan", demand: 25 },
    { month: "Feb", demand: 38 },
    { month: "Mar", demand: 50 },
    { month: "Apr", demand: 60 },
    { month: "Mei", demand: 72 }
  ],

  Fotografi: [
    { month: "Jan", demand: 28 },
    { month: "Feb", demand: 35 },
    { month: "Mar", demand: 48 },
    { month: "Apr", demand: 52 },
    { month: "Mei", demand: 60 }
  ]

}

export default function OpportunityTrend() {

  const skills = Object.keys(trendData)

  const [activeSkill, setActiveSkill] = useState(skills[0])

  const data = trendData[activeSkill]

  return (

    <section
      id="trend"
      className="py-16"
      style={{ background:"#ffffff" }}
    >

      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}

        <div className="text-center mb-10">

          <span
            style={{
              display:"inline-block",
              background:"rgba(31,122,99,0.1)",
              color:"#1F7A63",
              fontSize:"12px",
              fontWeight:600,
              padding:"5px 14px",
              borderRadius:"100px",
              marginBottom:"12px"
            }}
          >
            Market Insight
          </span>

          <h2
            style={{
              fontFamily:"'Lora', serif",
              fontSize:"clamp(1.6rem,3vw,2.3rem)",
              fontWeight:700,
              color:"#1E3A5F"
            }}
          >
            Tren Permintaan Skill Digital
          </h2>

          <p
            style={{
              marginTop:"8px",
              color:"#64748B",
              fontSize:"0.9rem"
            }}
          >
            Data simulasi tren permintaan pasar untuk beberapa skill digital populer.
          </p>

        </div>

        {/* Skill selector */}

        <div
          style={{
            display:"flex",
            justifyContent:"center",
            gap:"10px",
            flexWrap:"wrap",
            marginBottom:"30px"
          }}
        >

          {skills.map(skill => (

            <button
              key={skill}
              onClick={()=>setActiveSkill(skill)}
              style={{
                padding:"8px 16px",
                borderRadius:"100px",
                border:"1px solid #E2E8F0",
                background: activeSkill === skill ? "#1F7A63" : "#fff",
                color: activeSkill === skill ? "#fff" : "#1E3A5F",
                fontSize:"0.85rem",
                fontWeight:600,
                cursor:"pointer",
                transition:"all .2s"
              }}
            >
              {skill}
            </button>

          ))}

        </div>

        {/* Chart */}

        <div
          style={{
            background:"#F8FAFB",
            borderRadius:"16px",
            padding:"24px",
            border:"1px solid #EEF0F4"
          }}
        >

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={data}>

              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

              <XAxis
                dataKey="month"
                stroke="#64748B"
              />

              <YAxis
                stroke="#64748B"
              />

              <Tooltip
                contentStyle={{
                  borderRadius:"10px",
                  border:"none",
                  boxShadow:"0 6px 18px rgba(0,0,0,0.08)"
                }}
              />

              <Line
                type="monotone"
                dataKey="demand"
                stroke="#1F7A63"
                strokeWidth={3}
                dot={{ r:4 }}
                activeDot={{ r:6 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* Insight text */}

        <p
          style={{
            marginTop:"18px",
            textAlign:"center",
            fontSize:"0.85rem",
            color:"#64748B"
          }}
        >
          Permintaan untuk skill <b>{activeSkill}</b> menunjukkan tren meningkat dalam beberapa bulan terakhir.
        </p>

      </div>

    </section>

  )

}