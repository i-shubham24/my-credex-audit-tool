// This runs securely on Vercel's backend, hiding your API key.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { report } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // The Fallback Template (Requirement: Handle API failures gracefully)
  const fallbackSummary = `Based on your audit, you are currently spending $${report.totalMonthlySavings} unnecessarily each month. By optimizing your team's licenses and shifting heavy workloads to direct APIs, you can reclaim significant capital while maintaining the exact same AI capabilities.`;

  if (!apiKey) {
    return res.status(200).json({ summary: fallbackSummary });
  }

  try {
    const prompt = `You are a financial auditor for a startup. Review this AI spend report: ${JSON.stringify(report.results)}. Write a punchy, 100-word personalized summary paragraph explaining their largest area of waste and how to fix it. Be direct and professional. Do not use buzzwords.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // Haiku is fast and cheap
        max_tokens: 150,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) throw new Error('Anthropic API failed');

    const data = await response.json();
    return res.status(200).json({ summary: data.content[0].text });

  } catch (error) {
    // Graceful fallback if the API crashes or rate limits 
    return res.status(200).json({ summary: fallbackSummary });
  }
}
