export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, history } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable missing in Vercel' });
  }

  try {
    const formattedHistory = (history || []).slice(-6).map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: [{ text: h.text }]
    }));

    const systemInstruction = `You are Zen, an expert AI tutor for AKTU engineering students.
Provide clear, point-to-point explanations, derivation steps, exam tips, and code snippets where needed. Keep the tone friendly, crisp, and direct.`;

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
        temperature: 0.6,
        maxOutputTokens: 1000
      }
    };

    // Updated strictly to gemini-3.8-flash as required by API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.error?.message || 'Gemini API Error' 
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      return res.status(500).json({ error: 'No response from model' });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}