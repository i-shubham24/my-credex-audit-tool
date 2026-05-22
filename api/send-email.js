import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, savings } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Credex Auditor <onboarding@resend.dev>', // Resend provides this test email address for free
      to: email,
      subject: 'Your AI Spend Audit Results',
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
          <h2>Your AI Stack Audit is Complete</h2>
          <p>Thanks for running your stack through the Credex AI Auditor.</p>
          <p>We identified <strong>$${savings}</strong> in potential monthly savings by optimizing your current licenses and API routing.</p>
          <p>Our team is reviewing your specific tool breakdown and will follow up shortly with a step-by-step downgrade guide.</p>
          <br/>
          <p>Best,</p>
          <p><strong>The Credex Engineering Team</strong></p>
        </div>
      `
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}