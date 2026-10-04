export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method is allowed" });
  }

  const { text, message, imageBase64, mimeType } = req.body || {};
  const userPrompt = text || message || "Hello Zen!";
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      error: "GEMINI_API_KEY Vercel Environment Variables me missing hai!" 
    });
  }

  let partsArray = [{ text: userPrompt }];

  if (imageBase64 && mimeType) {
    partsArray.push({
      inline_data: {
        mime_type: mimeType,
        data: imageBase64
      }
    });
  }

  // GEMINI-3.8-FLASH STRICTLY FIRST PRIORITY
  const candidateModels = [
    "gemini-3.8-flash",
    "gemini-1.5-flash",
    "gemini-2.5-flash"
  ];

  let lastError = null;

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: partsArray }]
        })
      });

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return res.status(200).json({ reply: data.candidates[0].content.parts[0].text });
      }

      if (data.error) {
        lastError = data.error.message || JSON.stringify(data.error);
        continue;
      }
    } catch (err) {
      lastError = err.message;
      continue;
    }
  }

  return res.status(200).json({ 
    reply: `Zen server error: ${lastError || "Try again in a moment."}` 
  });
}