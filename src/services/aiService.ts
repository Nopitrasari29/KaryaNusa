// =======================================
// Chat AI (Dummy dulu)
// =======================================

export async function askAI(question: string) {

  return new Promise<string>((resolve) => {

    setTimeout(() => {
      resolve("Berdasarkan skill kamu, kamu bisa mulai dari freelance atau bisnis digital.")
    }, 1000)

  })

}

// =======================================
// AI Business Idea Generator (REAL GROQ)
// =======================================

export async function generateBusinessIdeas(skill: string) {

  const prompt = `
Pengguna memiliki skill utama: ${skill}.
Berikan 3 ide bisnis digital.
`

  try {

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role: "user", content: prompt }
          ]
        })
      }
    )

    const data = await response.json()

    return data.choices?.[0]?.message?.content || "Tidak ada hasil"

  } catch (error) {

    return "AI gagal"

  }

}