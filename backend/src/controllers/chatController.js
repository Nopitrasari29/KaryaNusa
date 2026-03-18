const ChatHistory = require('../models/ChatHistory');
const { Groq } = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, message, skillContext } = req.body;

    // Cari riwayat chat lama atau buat baru
    let chat = await ChatHistory.findOne({ sessionId });
    const history = chat ? chat.messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text })) : [];

    const systemPrompt = `Kamu adalah AI business mentor KARYANUSA. User memiliki skill: ${skillContext}. Bantu mereka dengan strategi bisnis dan langkah praktis. Jawab dalam Bahasa Indonesia, singkat dan memberikan motivasi.`;

    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message }
      ],
      model: "llama-3.1-8b-instant",
    });

    const aiText = response.choices[0].message.content;

    // Update DB
    if (!chat) {
      chat = new ChatHistory({ sessionId, skillContext, messages: [] });
    }
    chat.messages.push({ role: 'user', text: message });
    chat.messages.push({ role: 'ai', text: aiText });
    chat.updatedAt = Date.now();
    await chat.save();

    res.json({ role: 'ai', text: aiText });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHistory = async (req, res) => {
  const chat = await ChatHistory.findOne({ sessionId: req.params.sessionId });
  res.json(chat ? chat.messages : []);
};