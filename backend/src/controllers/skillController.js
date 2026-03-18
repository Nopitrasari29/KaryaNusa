const SkillResult = require('../models/SkillResult');
const { Groq } = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.analyzeSkill = async (req, res) => {
  try {
    const { sessionId, answers, questionnaireData } = req.body;

    // Persiapan prompt AI (Analisis psikometrik sederhana)
    const prompt = `
      Kamu adalah AI skill analyzer. Berdasarkan 7 jawaban kuesioner user berikut:
      ${JSON.stringify(questionnaireData)}
      
      Identifikasi satu skill paling dominan dari list ini: 
      [Programming, Desain Grafis, Fotografi, Menulis, Marketing, Public Speaking].
      
      Kembalikan HANYA JSON tanpa teks lain:
      {
        "skill": "Nama Skill",
        "confidenceScore": 0-100,
        "reasoning": "Penjelasan singkat kenapa skill ini cocok"
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0].message.content);

    // Simpan ke DB
    const newResult = new SkillResult({
      sessionId,
      answers,
      skillResult: aiResponse.skill,
      confidenceScore: aiResponse.confidenceScore,
      reasoning: aiResponse.reasoning
    });
    await newResult.save();

    res.json(newResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResult = async (req, res) => {
  try {
    const result = await SkillResult.findOne({ sessionId: req.params.sessionId }).sort({ createdAt: -1 });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};