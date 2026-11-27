const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  const { message } = req.body || {}
  if (!message) return res.status(400).json({ error: 'Missing message' })

  try {
    // If Mistral key provided, prefer Mistral for inference
    if (process.env.MISTRAL_API_KEY) {
      try{
        const model = process.env.MISTRAL_MODEL || 'mistral-large'
        const resp = await fetch(`https://api.mistral.ai/v1/models/${model}/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
          },
          body: JSON.stringify({ input: message, max_new_tokens: 300 })
        })
        const j = await resp.json()
        // attempt to extract sensible text from several possible fields
        const reply = j?.output || j?.results?.[0]?.output || j?.choices?.[0]?.text || (typeof j === 'string' ? j : JSON.stringify(j))
        return res.json({ reply: (reply && reply.toString().trim()) || 'Sorry, no answer.' })
      }catch(e){ console.error('Mistral error', e) }
    }

    // Local fallback when OPENAI_API_KEY is not configured (helps local dev)
    if (!process.env.OPENAI_API_KEY) {
      const m = message.toString().toLowerCase()
      if (m.includes('skill')) return res.json({ reply: 'I specialize in React, Tailwind, Framer Motion, Node.js, Express, MongoDB and AI integrations using OpenAI/Gemini.' })
      if (m.includes('project')) return res.json({ reply: 'I build SaaS dashboards, e-commerce platforms, AI chatbots, and portfolio sites. See the Projects section for examples.' })
      if (m.includes('service') || m.includes('pricing') || m.includes('hire')) return res.json({ reply: 'Services: Full-stack development, e-commerce, UI/UX, API development. Starting from ₹999 — contact for a custom quote.' })
      if (m.includes('contact')) return res.json({ reply: 'Use the contact form, email, or WhatsApp link on the site to reach out.' })
      return res.json({ reply: "Hi — I'm Srinath's assistant. Ask about skills, projects, services, or how to contact." })
    }

    const payload = {
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "You are an assistant answering as Srinath, a professional full-stack developer and AI builder. Keep replies concise, helpful, and focused on skills, projects, services and contact guidance." },
        { role: 'user', content: message }
      ],
      max_tokens: 300,
      temperature: 0.2
    }

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    })

    const j = await r.json()
    const reply = j?.choices?.[0]?.message?.content?.trim() || 'Sorry, no answer.'
    res.json({ reply })
  } catch (err) {
    console.error('AI route error', err)
    res.status(500).json({ error: 'AI service error' })
  }
})

module.exports = router
