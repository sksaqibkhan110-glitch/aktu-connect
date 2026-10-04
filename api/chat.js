export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { text, imageBase64, mimeType } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY Vercel me missing hai!" });
  }

  try {
    let partsArray = [
      {
        text: "You are Zen, a friendly and casual AI study buddy/mentor for AKTU engineering students. Keep answers natural, concise, and to the point. User prompt: " + (text || "Explain this image.")
      }
    ];

    if (imageBase64 && mimeType) {
      partsArray.push({
        inline_data: {
          mime_type: mimeType,
          data: imageBase64
        }
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: partsArray }]
        })
      }
    );

    const data = await response.json();
    let reply = "";

    if (data.candidates && data.candidates[0]?.content?.parts) {
      reply = data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      reply = "API Error: " + (data.error.message || JSON.stringify(data.error));
    } else {
      reply = "Arey kuch samajh nahi aaya, dubara try karo na!";
    }

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Server connection failed: " + err.message });
  }
}