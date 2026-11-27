const express = require('express')
const router = express.Router()
// Using Resend HTTP API only (no SMTP fallback)

// No database — contact messages are sent via email only (Resend preferred)

async function sendNotificationEmail(name, email, message){
  // Strict Resend-only sending
  if (!process.env.RESEND_API_KEY) {
    const err = new Error('RESEND configuration missing: set RESEND_API_KEY and RESEND_FROM')
    err.code = 'RESEND_CONFIG'
    throw err
  }
  // require a configured sending address for Resend (must be a verified domain)
  if (!process.env.RESEND_FROM) {
    const err = new Error('RESEND configuration missing: set RESEND_FROM to a verified address in Resend')
    err.code = 'RESEND_CONFIG'
    throw err
  }
  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM,
        to: process.env.RESEND_TO || 'psrinath821@gmail.com',
        subject: `New message from ${name}`,
        text: `${name} <${email}>\n\n${message}`,
        html: `<p><strong>${name}</strong> &lt;${email}&gt;</p><p>${message.replace(/\n/g,'<br/>')}</p>`,
        reply_to: email
      })
    })
    if (!resp.ok) {
      let bodyText = ''
      try { bodyText = await resp.text() } catch (_) {}
      let parsed = null
      try { parsed = JSON.parse(bodyText) } catch (_) {}
      if (resp.status === 403 || (parsed && parsed.name === 'validation_error')) {
        const msg = (parsed && parsed.message) ? parsed.message : bodyText || 'Resend domain validation error'
        const err = new Error('ResendValidation: ' + msg)
        err.code = 'RESEND_VALIDATION'
        throw err
      }
      throw new Error('Resend error: ' + bodyText)
    }
    return true
  } catch (e) {
    console.error('Resend API failed', e)
    if (e.code === 'RESEND_CONFIG') throw e
    if (e.code === 'RESEND_VALIDATION' || (e.message && e.message.startsWith('ResendValidation:'))) throw e
    throw e
  }
}

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {}
    if(!name || !email || !message) return res.status(400).json({ success: false, error: 'Missing name, email or message' })

    // send immediately via Resend or SMTP
    try{
      const ok = await sendNotificationEmail(name, email, message)
      if(!ok) return res.status(500).json({ success: false, error: 'No email provider configured' })
      return res.json({ success: true })
    }catch(e){
      console.error('Email send failed', e)
      if (e.code === 'RESEND_CONFIG') {
        return res.status(500).json({ success: false, error: e.message })
      }
      if (e.code === 'RESEND_VALIDATION' || (e.message && e.message.startsWith('ResendValidation:'))) {
        return res.status(400).json({ success: false, error: e.message.replace(/^ResendValidation:\s*/,'') })
      }
      return res.status(500).json({ success:false, error:'Email send failed' })
    }

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
})
module.exports = router
