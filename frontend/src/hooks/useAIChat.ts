import { useState } from "react"
import { askAI } from "../services/aiService"

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

  const sendMessage = async (text: string) => {

    const userMessage: Message = {
      role: "user",
      text
    }

    setMessages((prev) => [...prev, userMessage])

    try {

      const reply = await askAI(text)

      const aiMessage: Message = {
        role: "ai",
        text: reply
      }

      setMessages((prev) => [...prev, aiMessage])

    } catch {

      const aiMessage: Message = {
        role: "ai",
        text: "Maaf, AI sedang mengalami gangguan."
      }

      setMessages((prev) => [...prev, aiMessage])

    }

  }

  return {
    messages,
    sendMessage
  }

}