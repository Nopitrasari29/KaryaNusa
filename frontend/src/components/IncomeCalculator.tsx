import { useState } from "react"

const skillRates: Record<string, number> = {
  Programming: 150000,
  "Desain Grafis": 120000,
  Fotografi: 130000,
  Menulis: 90000,
  Marketing: 110000,
  "Public Speaking": 200000
}

export default function IncomeCalculator() {

  const [skill, setSkill] = useState("Programming")
  const [hours, setHours] = useState(20)

  const rate = skillRates[skill]

  const weeklyIncome = hours * rate
  const monthlyIncome = weeklyIncome * 4
  const yearlyIncome = monthlyIncome * 12

  const format = (num:number) =>
    new Intl.NumberFormat("id-ID").format(num)

  return (
    <>
      <style>{`

        .income-card{
          background:#fff;
          border-radius:20px;
          padding:32px;
          border:1px solid #EEF0F4;
          box-shadow:0 8px 28px rgba(30,58,95,0.08);
        }

        .income-output{
          font-family:'Lora',serif;
          font-size:2rem;
          font-weight:700;
          color:#1F7A63;
        }

        .income-slider{
          width:100%;
          margin-top:14px;
        }

      `}</style>

      <section
        id="income"
        className="py-16"
        style={{ background:"#F6F5F2" }}
      >

        <div className="max-w-4xl mx-auto px-6">

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
              Simulasi Penghasilan
            </span>

            <h2
              style={{
                fontFamily:"'Lora', serif",
                fontSize:"clamp(1.6rem,3vw,2.3rem)",
                fontWeight:700,
                color:"#1E3A5F"
              }}
            >
              Kalkulator Potensi Penghasilan
            </h2>

            <p
              style={{
                color:"#64748B",
                fontSize:"0.9rem",
                marginTop:"8px"
              }}
            >
              Simulasikan berapa penghasilan yang bisa kamu dapatkan dari skill digitalmu.
            </p>

          </div>

          <div className="income-card">

            {/* Pilih skill */}

            <div className="mb-6">

              <label
                style={{
                  fontSize:"0.8rem",
                  fontWeight:600,
                  color:"#64748B"
                }}
              >
                Pilih Skill
              </label>

              <select
                value={skill}
                onChange={(e)=>setSkill(e.target.value)}
                className="w-full mt-2 p-3 rounded-lg border border-gray-200"
              >
                {Object.keys(skillRates).map(s=>(
                  <option key={s}>{s}</option>
                ))}
              </select>

            </div>

            {/* Jam kerja */}

            <div className="mb-6">

              <div className="flex justify-between items-center">

                <label
                  style={{
                    fontSize:"0.8rem",
                    fontWeight:600,
                    color:"#64748B"
                  }}
                >
                  Jam kerja per minggu
                </label>

                <span
                  style={{
                    fontWeight:600,
                    color:"#1E3A5F"
                  }}
                >
                  {hours} jam
                </span>

              </div>

              <input
                type="range"
                min={1}
                max={60}
                value={hours}
                onChange={(e)=>setHours(Number(e.target.value))}
                className="income-slider"
              />

            </div>

            {/* Output */}

            <div className="grid md:grid-cols-3 gap-6 text-center">

              <div>

                <div
                  style={{
                    fontSize:"0.75rem",
                    color:"#94A3B8",
                    marginBottom:"6px"
                  }}
                >
                  Per Minggu
                </div>

                <div className="income-output">
                  Rp {format(weeklyIncome)}
                </div>

              </div>

              <div>

                <div
                  style={{
                    fontSize:"0.75rem",
                    color:"#94A3B8",
                    marginBottom:"6px"
                  }}
                >
                  Per Bulan
                </div>

                <div className="income-output">
                  Rp {format(monthlyIncome)}
                </div>

              </div>

              <div>

                <div
                  style={{
                    fontSize:"0.75rem",
                    color:"#94A3B8",
                    marginBottom:"6px"
                  }}
                >
                  Per Tahun
                </div>

                <div className="income-output">
                  Rp {format(yearlyIncome)}
                </div>

              </div>

            </div>

            {/* Insight */}

            <div
              style={{
                marginTop:"24px",
                padding:"16px",
                background:"rgba(31,122,99,0.08)",
                borderRadius:"12px",
                fontSize:"0.85rem",
                color:"#1E3A5F"
              }}
            >
              Jika kamu bekerja <b>{hours} jam per minggu</b> dengan skill <b>{skill}</b>,
              kamu berpotensi menghasilkan sekitar <b>Rp {format(monthlyIncome)}</b> per bulan.
            </div>

          </div>

        </div>

      </section>

    </>
  )
}