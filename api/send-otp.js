import nodemailer from "nodemailer";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, otp } = req.body || {};

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  // Gmail App Password credentials (set in Vercel Environment Variables)
  const smtpUser = process.env.EMAIL_USER;
  const smtpPass = process.env.EMAIL_PASS;

  if (!smtpUser || !smtpPass) {
    return res.status(500).json({
      error: "EMAIL_USER or EMAIL_PASS environment variables are missing on Vercel."
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  try {
    await transporter.sendMail({
      from: `"AKTU Connect Verification" <${smtpUser}>`,
      to: email,
      subject: `Your AKTU Connect Verification Code: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
          <h2 style="color: #1d4ed8; margin-bottom: 8px;">AKTU Connect</h2>
          <p style="color: #475569; font-size: 14px;">Use the following 6-digit verification code to complete your student registration:</p>
          <div style="background-color: #f1f5f9; padding: 16px; border-radius: 12px; text-align: center; margin: 20px 0;">
            <span style="font-size: 28px; font-weight: 800; letter-spacing: 6px; color: #0f172a; font-family: monospace;">${otp}</span>
          </div>
          <p style="color: #94a3b8; font-size: 12px;">This code is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `
    });

    return res.status(200).json({ success: true, message: "OTP sent successfully to email" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to send email" });
  }
}