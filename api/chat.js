export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable missing in Vercel' });
  }

  try {
    // History ko Gemini format me pack karo
    const formattedHistory = (history || []).map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: [{ text: h.text }]
    }));

    // AKTU Syllabus & Exam Persona System Instruction
    const systemInstruction = `You are Zen, an expert AI mentor for engineering students under Dr. A.P.J. Abdul Kalam Technical University (AKTU).
Your guidelines:
1. Deliver structured, point-to-point technical solutions for derivations, codes, and numericals.
2. Highlight key terms and exam keywords that evaluators look for in 7-mark and 10-mark questions.
3. Be encouraging, concise, and clear. Avoid robotic greetings.`;

    const payload = {
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ],
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 1500
      }
    };

    // Google Gemini 3.5 Flash Model Endpoint
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Solution generate karne me dikkat aayi, please dobara pucho!";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}