import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatWidget(){
  const [open, setOpen] = React.useState(false)
  const [aboutOpen, setAboutOpen] = React.useState(false)
  const [messages, setMessages] = React.useState([{from:'bot',text:'👋 Hi there! Ask me about skills, projects, pricing, or services.'}])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const scrollRef = React.useRef(null)

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, aboutOpen])

  // Allow external toggles (e.g., buttons elsewhere) to open the chat
  React.useEffect(() => {
    function handleOpen() { setOpen(true) }
    window.addEventListener('openChat', handleOpen)
    return () => window.removeEventListener('openChat', handleOpen)
  }, [])

  async function send(){
    if(!input.trim()) return
    const user = {from:'user', text: input}
    setMessages(m=>[...m,user])
    setInput('')
    setLoading(true)
    try{
      const res = await fetch('/api/ai', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({message: input})})
      const j = await res.json()
      setMessages(m=>[...m, {from:'bot', text: j.reply || 'Sorry, I had trouble with that.'}])
    }catch(err){
      setMessages(m=>[...m, {from:'bot', text: '⚠️ Connection error. Please try again.'}])
    }finally{ setLoading(false) }
  }

  const avatar = "https://res.cloudinary.com/notes1/image/upload/Purple_Blue_AI_Learning_Book_Cover_5_t1maj0.png"

  return (
    <div className="fixed right-6 bottom-6 z-50 font-sans">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: 'spring', damping: 22 }}
            className="glass w-96 mb-4 rounded-2xl overflow-hidden shadow-2xl border border-white/12 shadow-glow"
          >
            <div className="chat-header p-3 flex items-center justify-between border-b border-white/8 bg-gradient-to-r from-purple-700/8 to-cyan-600/6">
              <div className="flex items-center gap-3">
                <img src={avatar} alt="Srinath" className="w-10 h-10 rounded-full object-cover ring-1 ring-white/6 shadow-sm" onError={(e)=>{e.target.style.display='none'}} />
                <div>
                  <div className="font-bold themed-text text-lg">Assistant</div>
                  <div className="text-xs text-white/60">Srinath's assistant — quick answers</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  aria-pressed={aboutOpen}
                  onClick={() => setAboutOpen(s => !s)}
                  className="chat-header-btn p-2 rounded-md hover:bg-white/6 transition-colors"
                  title="About"
                >
                  ℹ️
                </button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setOpen(false)}
                  className="chat-header-btn p-2 rounded-md hover:bg-white/6 transition-colors"
                  aria-label="Close chat"
                >
                  ✕
                </motion.button>
              </div>
            </div>

            {/* About panel */}
            <AnimatePresence>
                {aboutOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-4 bg-transparent border-b border-white/6"
                  >
                    <div className="chat-about-card glass-sm p-3 flex gap-4 items-start">
                      <img src={avatar} alt="Srinath" className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="chat-about-name gradient-text">Srinath</div>
                            <div className="chat-about-role text-sm text-white/70">Full-stack engineer · React · Node · AI</div>
                          </div>
                          <div className="text-xs text-white/50">Available for hire</div>
                        </div>

                        <p className="chat-about-bio text-sm text-white/70 mt-3 mb-3">I build polished, high-performance web apps and AI features. I focus on performance, clean UX, and reliable delivery — happy to consult or join short-term projects.</p>

                        <div className="chat-about-links flex items-center gap-2 mb-3">
                          <a className="skill-badge" href="mailto:sri.nxth@yahoo.com">Email</a>
                          <a className="skill-badge" href="https://github.com/sriinathh" target="_blank" rel="noreferrer">GitHub</a>
                          <a className="skill-badge" href="https://x.com/NithiinSrinu" target="_blank" rel="noreferrer">X</a>
                          <a className="skill-badge" href="https://www.linkedin.com/in/srinath-potharaju/" target="_blank" rel="noreferrer">LinkedIn</a>
                        </div>

                        <div className="chat-about-skills flex flex-wrap gap-2">
                          <span className="skill-badge">React</span>
                          <span className="skill-badge">Node</span>
                          <span className="skill-badge">Tailwind</span>
                          <span className="skill-badge">Mongoose</span>
                          <span className="skill-badge">Docker</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
            </AnimatePresence>

            {/* Messages area */}
            <div ref={scrollRef} className="h-72 overflow-auto p-4 space-y-4 bg-slate-900/30">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl ${
                      m.from === 'bot'
                        ? 'bg-white/7 backdrop-blur-sm text-slate-200 border border-white/8'
                        : 'bg-gradient-to-br from-purple-600 to-cyan-500 themed-text shadow-lg'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{m.text}</p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/7 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/8">
                    <div className="flex gap-2">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/10 flex gap-2 bg-slate-900/20 items-center">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && send()}
                placeholder="Ask me about projects, skills, or availability"
                className="flex-1 p-2.5 bg-white/4 border border-white/8 rounded-xl themed-text placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/12 transition-all text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                onClick={send}
                disabled={loading}
                className="chat-send-btn px-4 py-2 themed-text font-semibold text-sm shadow-sm"
              >
                {loading ? '…' : 'Send'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(s => !s)}
        aria-label="Toggle chat"
        className="chat-toggle p-3 rounded-full transition-all"
        title="Chat with Srinath"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="4" width="18" height="14" rx="3" fill="rgba(255,255,255,0.06)" />
          <circle cx="8.5" cy="10" r="1.1" fill="white" opacity="0.95" />
          <circle cx="15.5" cy="10" r="1.1" fill="white" opacity="0.95" />
        </svg>
      </motion.button>
    </div>
  )
}
