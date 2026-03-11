import { useState } from "react"

type Message = {
  role: "user" | "ai"
  text: string
}

export function useAIChat() {

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Halo! Saya AI Assistant KARYANUSA."
    }
  ])

  const sendMessage = (text: string) => {

    const userMessage: Message = {
      role: "user",
      text
    }

    setMessages((prev) => [...prev, userMessage])

    setTimeout(() => {

      const aiMessage: Message = {
        role: "ai",
        text: "Berdasarkan skill kamu, ada beberapa peluang usaha yang bisa dicoba."
      }

      setMessages((prev) => [...prev, aiMessage])

    }, 1000)

  }

  return {
    messages,
    sendMessage
  }

}