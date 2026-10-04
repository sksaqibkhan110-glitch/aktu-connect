export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, history } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on Vercel.' });
  }

  // Model hierarchy: gemini-2.5-flash (fast, robust & latest stable flash)
  const MODEL_NAME = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

  const systemInstruction = `You are Zen, an energetic, highly knowledgeable, and friendly AI academic mentor specifically designed for Dr. A.P.J. Abdul Kalam Technical University (AKTU) B.Tech engineering students.
- Tone: Friendly, motivating, helpful, and natural Hinglish/English.
- Answer user queries directly. If they casually greet or chat (like "sun bhai", "kaise ho", "kya chal raha hai"), respond naturally and warmly, don't throw random textbook definitions.
- For AKTU engineering questions, provide accurate exam-oriented answers, key points, derivations, quantum tips, and mention 2-mark or 7/10-mark exam importance when relevant.
- Keep answers formatted with neat markdown and bullet points.`;

  const contents = [
    { role: 'user', parts: [{ text: systemInstruction }] },
    { role: 'model', parts: [{ text: 'Samajh gaya! Main Zen hoon, AKTU students ka smart study buddy. Poochho kya doubt hai!' }] }
  ];

  if (history && Array.isArray(history)) {
    history.forEach(item => {
      contents.push({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      });
    });
  }

  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      const reply = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ reply });
    } else {
      console.error('Gemini API Error:', data);
      return res.status(500).json({ error: 'Failed to generate response from Gemini.' });
    }
  } catch (error) {
    console.error('Request failed:', error);
    return res.status(500).json({ error: 'Server error while calling Gemini.' });
  }
}