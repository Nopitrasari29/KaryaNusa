import { askAI } from "./aiService"
import { allSkills } from "./karyanusaData"

// =======================================
// Analisis skill menggunakan AI (Groq)
// =======================================

export async function analyzeSkillAI(jawaban: string[]) {

  const prompt = `
Pengguna menjawab beberapa pertanyaan berikut:

${jawaban.join("\n")}

Tentukan skill yang paling cocok dari daftar berikut:
${allSkills.join("\n")}

Jawab HANYA dalam format JSON berikut, tanpa teks lain:
{
  "skill": "",
  "confidenceScore": 0,
  "reasoning": ""
}

- "skill" harus salah satu dari daftar di atas
- "confidenceScore" adalah angka 0-100
- "reasoning" adalah penjelasan singkat dalam Bahasa Indonesia (1-2 kalimat)
`

  try {
    const hasil = await askAI(prompt)
    // Bersihkan response jika ada markdown code block
    const clean = hasil.replace(/```json|```/g, "").trim()
    return JSON.parse(clean)
  } catch {
    return {
      skill: "Programming",
      confidenceScore: 60,
      reasoning: "Rekomendasi default karena AI gagal memproses jawaban."
    }
  }

}