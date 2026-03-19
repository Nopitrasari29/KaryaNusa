import {  } from "react"

type Props = {
  skill: string | null
  score?: number
}

export default function ShareResult({ skill, score }: Props) {

  if (!skill) return null

  const text = `Aku baru menemukan skill terbaikku di KARYANUSA!
Skill: ${skill}
Score: ${score ?? "-"}%
Coba juga di: https://karyanusa.vercel.app`

  const shareWhatsApp = () => {

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")

  }

  const shareInstagram = async () => {

    await navigator.clipboard.writeText(text)

    alert("Caption berhasil disalin. Tempelkan di Instagram Story kamu!")

    window.open("https://instagram.com", "_blank")

  }

  return (

    <section className="py-16 text-center">

      <h2 className="text-3xl font-bold mb-4">
        Bagikan Hasil Skill Kamu
      </h2>

      <p className="text-gray-500 mb-8">
        Tunjukkan skill terbaikmu kepada teman-temanmu.
      </p>

      <div className="flex justify-center gap-4">

        <button
          onClick={shareWhatsApp}
          className="bg-green-500 text-white px-6 py-3 rounded-lg"
        >
          Share WhatsApp
        </button>

        <button
          onClick={shareInstagram}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg"
        >
          Share Instagram
        </button>

      </div>

    </section>

  )
}