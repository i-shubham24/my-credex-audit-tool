# LLM Prompts
Verified: 2026-05-21

## Audit Summary Generation
**Model:** Claude 3 Haiku (via Anthropic API)

**Prompt:**
`You are a financial auditor for a startup. Review this AI spend report: {JSON_REPORT_DATA}. Write a punchy, 100-word personalized summary paragraph explaining their largest area of waste and how to fix it. Be direct and professional. Do not use buzzwords.`

**Why I wrote it this way:**
I gave the LLM a specific persona ("financial auditor") to prevent it from sounding like a generic chatbot. By passing the raw JSON data, I forced it to ground its response in the actual math rather than hallucinating savings. I chose the Haiku model because latency is critical for a web form; users will bounce if they wait 10 seconds for a response.

**What I tried that didn't work:**
Initially, I didn't include the "Do not use buzzwords" constraint, and the model outputted overly enthusiastic marketing copy ("Synergize your stack!"). Adding that constraint grounded the tone to match a B2B finance tool.