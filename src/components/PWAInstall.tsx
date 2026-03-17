import { useEffect, useState } from "react"

export default function PWAInstall() {

  const [prompt, setPrompt] = useState<any | null>(null)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const install = () => {
    if (prompt) {
      prompt.prompt()
    }
  }

  if (!prompt) return null

  return (
    <button
      onClick={install}
      className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-lg"
    >
      Install App
    </button>
  )
}