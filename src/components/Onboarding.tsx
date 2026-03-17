import { useEffect, useState } from "react"

export default function Onboarding() {

  const [show, setShow] = useState(true)

  useEffect(() => {

    const seen = localStorage.getItem("karyanusa_onboarding")

    if (seen) {
      setShow(false)
      return
    }

    setTimeout(() => {

      setShow(false)
      localStorage.setItem("karyanusa_onboarding", "true")

    }, 2500)

  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-[#1F7A63] text-white flex items-center justify-center z-50">

      <div className="text-center">

        <h1 className="text-4xl font-bold mb-4">
          🌿 KARYANUSA
        </h1>

        <p className="opacity-80">
          Platform AI untuk menemukan peluang ekonomi dari skill digital
        </p>

      </div>

    </div>
  )
}