export function getSkills() {

  return [

    "Desain Grafis",
    "Menulis",
    "Fotografi",
    "Editing Video",
    "Memasak",
    "Programming",
    "Marketing",
    "Public Speaking"

  ]

}


// =======================================
// Analisis skill menggunakan AI
// =======================================

import { askAI } from "./aiService"

export async function analyzeSkillAI(jawaban: string[]) {

  const prompt = `
Pengguna menjawab beberapa pertanyaan berikut:

${jawaban.join(", ")}

Tentukan skill yang paling cocok dari daftar berikut:

Desain Grafis
Menulis
Fotografi
Editing Video
Memasak
Programming
Marketing
Public Speaking

Jawab dalam format JSON seperti berikut:

{
 "skill": "",
 "confidenceScore": 0,
 "reasoning": ""
}
`

  try {

    const hasil = await askAI(prompt)

    return JSON.parse(hasil)

  } catch {

    return {
      skill: "Menulis",
      confidenceScore: 60,
      reasoning: "Rekomendasi default karena AI gagal memproses."
    }

  }

}