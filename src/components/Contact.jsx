import React from 'react'
import { motion } from 'framer-motion'

export default function Contact(){
  const [form, setForm] = React.useState({name:'',email:'',message:''})
  const [status, setStatus] = React.useState(null)
  const [savedId, setSavedId] = React.useState(null)
  const [storedIn, setStoredIn] = React.useState(null)

  async function submit(e){
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try{
      const res = await fetch('/api/contact', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
      const j = await res.json()
      if(j.success){ 
        setStatus('sent')
        setSavedId(j.id || null)
        setStoredIn(j.storedIn || null)
        setForm({name:'',email:'',message:''})
        // keep success visible until user dismisses
      }
      else setStatus('error')
    }catch(err){ 
      setStatus('error')
      setTimeout(() => setStatus(null), 3000)
    }
  }

  async function resend(){
    if(!savedId) return
    setStatus('sending-email')
    try{
      const res = await fetch('/api/contact/resend', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({id: savedId})})
      const j = await res.json()
      if(j.success){ setStatus('email-sent'); setTimeout(()=>setStatus(null), 3000) }
      else { setStatus('email-error'); setTimeout(()=>setStatus(null), 3000) }
    }catch(e){ setStatus('email-error'); setTimeout(()=>setStatus(null), 3000) }
  }

  return (
    <section id="contact" className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="section-header text-4xl md:text-5xl font-black mb-4 gradient-text">Let's Work Together</h2>
        <p className="themed-text max-w-2xl mb-12 text-lg">Have a project in mind? Let's discuss how I can help bring your ideas to life.</p>
        
            <div className="max-w-3xl mx-auto">
              <motion.form onSubmit={submit} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="glass p-6 md:p-8 shadow-glow-hover rounded-lg">
                <div className="mb-4">
                  <div className="text-sm text-slate-300">Get in touch</div>
                  <h2 className="text-2xl md:text-3xl font-bold themed-text">Contact me</h2>
                  <p className="text-sm themed-text/80 mt-2">Tell me about your project — I'll reply within 24–48 hours.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="relative block">
                    <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder=" " className="peer p-3 bg-white/5 border border-white/10 rounded-md themed-text w-full" />
                    <span className="absolute left-3 -top-3 text-xs bg-transparent px-1 themed-text/70 peer-focus:text-cyan-300">Full name</span>
                  </label>
                  <label className="relative block">
                    <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder=" " className="peer p-3 bg-white/5 border border-white/10 rounded-md themed-text w-full" />
                    <span className="absolute left-3 -top-3 text-xs bg-transparent px-1 themed-text/70 peer-focus:text-cyan-300">Email address</span>
                  </label>
                </div>

                <label className="relative block mt-4">
                  <textarea required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder=" " className="peer w-full p-3 bg-white/5 border border-white/10 rounded-md themed-text" rows={6} />
                  <span className="absolute left-3 -top-3 text-xs bg-transparent px-1 themed-text/70 peer-focus:text-cyan-300">Briefly describe your project...</span>
                </label>

                <div className="mt-4 flex gap-3 items-center">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={status==='loading' || status==='sending-email'} className="neon-btn px-5 py-2 font-semibold themed-text flex items-center gap-3">
                    {status === 'loading' ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"></path></svg> Sending…</>) : status==='sending-email' ? 'Sending email…' : 'Send Message'}</motion.button>
                  {savedId && <button onClick={resend} className="px-4 py-2 bg-white/6 rounded-md text-cyan-300 hover:bg-white/8 transition">Resend notification</button>}
                </div>

                {status==='sent' && <motion.div initial={{opacity: 0, y: -6}} animate={{opacity: 1, y: 0}} className="mt-4 p-3 bg-green-500/10 border border-green-500/40 rounded-md text-green-400 text-sm flex items-center justify-between"><div>✓ Thanks — I'll get back to you soon.</div><div className="text-xs themed-text/60">Saved: {savedId} ({storedIn})</div></motion.div>}
                {status==='email-sent' && <motion.div initial={{opacity: 0, y: -6}} animate={{opacity: 1, y: 0}} className="mt-4 p-3 bg-green-500/10 border border-green-500/40 rounded-md text-green-400 text-sm">✓ Email sent to site owner.</motion.div>}
                {status==='email-error' && <motion.div initial={{opacity: 0, y: -6}} animate={{opacity: 1, y: 0}} className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/40 rounded-md text-yellow-400 text-sm">⚠️ Email not configured or failed to send.</motion.div>}
                {status==='error' && <motion.div initial={{opacity: 0, y: -6}} animate={{opacity: 1, y: 0}} className="mt-4 p-3 bg-red-500/10 border border-red-500/40 rounded-md text-red-400 text-sm">✗ Please fill in all fields and try again.</motion.div>}
              </motion.form>
            </div>

          {/* Right column removed per request: kept only the contact form */}
      </motion.div>
    </section>
  )
}
