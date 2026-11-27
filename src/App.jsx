import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import ChatWidget from './components/ChatWidget'
import { motion } from 'framer-motion'

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [showTop, setShowTop] = React.useState(false)
  const [newsletterEmail, setNewsletterEmail] = React.useState('')
  const [newsletterSent, setNewsletterSent] = React.useState(false)
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('theme') || 'system' } catch(e){ return 'system' }
  })
  const [themeToast, setThemeToast] = React.useState('')

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
      setShowTop(window.scrollY > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Theme application: supports 'system', 'dark', 'light', 'hive'
  React.useEffect(() => {
    function applyTheme(t){
      try{
        console.debug('[theme] applyTheme ->', t)
        if(t === 'system'){
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
        } else {
          document.documentElement.setAttribute('data-theme', t)
        }
        // also set a class fallback for environments where attribute selectors don't refresh immediately
        try{
          const el = document.documentElement
          const known = ['dark','light','hive','solar','snow']
          known.forEach(k=>el.classList.remove('theme-'+k))
          // only add a class fallback for concrete themes (not 'system')
          if(t && t !== 'system') el.classList.add('theme-'+t)
          // force reflow
          void el.offsetWidth
        }catch(e){}
        localStorage.setItem('theme', t)
        // show on-screen toast
        try{ setThemeToast((t==='system')? 'Theme: system' : `Theme: ${t}`); setTimeout(()=>setThemeToast(''), 2200) }catch(e){}
      }catch(e){/* ignore */}
    }

    applyTheme(theme)

    const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => { if(localStorage.getItem('theme') === 'system') applyTheme('system') }
    if(mql && mql.addEventListener) mql.addEventListener('change', handleChange)
    else if(mql && mql.addListener) mql.addListener(handleChange)
    return () => {
      if(mql && mql.removeEventListener) mql.removeEventListener('change', handleChange)
      else if(mql && mql.removeListener) mql.removeListener(handleChange)
    }
  }, [theme])

  // Helper to change theme immediately (applies, stores, and shows toast)
  function changeTheme(t){
    try{
      if(t === 'system'){
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
      } else {
        document.documentElement.setAttribute('data-theme', t)
      }
      const el = document.documentElement
      const known = ['dark','light','hive','solar','snow']
      known.forEach(k=>el.classList.remove('theme-'+k))
      if(t && t !== 'system') el.classList.add('theme-'+t)
      void el.offsetWidth
      try{ localStorage.setItem('theme', t) }catch(e){}
      setTheme(t)
      setThemeToast((t==='system')? 'Theme: system' : `Theme: ${t}`)
      setTimeout(()=>setThemeToast(''), 2200)
    }catch(e){/* ignore */}
  }

  function submitNewsletter(e){
    e.preventDefault()
    if(!newsletterEmail) return
    setNewsletterSent(true)
    setNewsletterEmail('')
    setTimeout(()=>setNewsletterSent(false), 3000)
  }

  return (
    <div className="bg-transparent themed-text overflow-x-hidden">
      <header className={`fixed inset-x-0 top-4 z-30 px-4 transition-all ${scrolled ? 'shadow-glow hover:shadow-glow-hover' : ''}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between ${scrolled ? 'glass p-2' : 'glass-sm p-2'} rounded-xl`}> 
          <a href="#" className="flex items-center gap-3">
            <img src="https://res.cloudinary.com/notes1/image/upload/Purple_Blue_AI_Learning_Book_Cover_5_t1maj0.png" alt="Srinath" loading="lazy" onError={(e)=>{e.target.style.display='none'}} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 shadow-md" />
            <div className="font-bold gradient-text text-lg tracking-tight">Srinath</div>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="nav-link themed-text">About</a>
            <a href="#skills" className="nav-link themed-text">Skills</a>
            <a href="#projects" className="nav-link themed-text">Projects</a>
            <a href="#contact" className="nav-link themed-text">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={()=>setMenuOpen(s=>!s)} aria-label="Toggle menu" className="md:hidden themed-text p-2 rounded-md hover:bg-white/6 transition">
              {menuOpen ? '✕' : '☰'}
            </button>

            <div className="hidden md:flex items-center gap-2">
              <a href="https://github.com/sriinathh" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-full bg-white/5 hover:bg-white/8 transition transform hover:-translate-y-1 themed-text flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.93 3.19 9.11 7.61 10.59.56.1.76-.24.76-.54 0-.27-.01-1-.02-1.96-3.09.67-3.74-1.49-3.74-1.49-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.08-.67.08-.67 1.09.08 1.66 1.12 1.66 1.12.97 1.66 2.55 1.18 3.17.9.1-.71.38-1.18.69-1.45-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.4.11-2.92 0 0 .95-.3 3.12 1.15.9-.25 1.86-.38 2.82-.38.96 0 1.92.13 2.82.38 2.17-1.45 3.12-1.15 3.12-1.15.61 1.52.23 2.64.11 2.92.72.78 1.16 1.78 1.16 3 0 4.29-2.61 5.23-5.09 5.51.39.34.74 1.02.74 2.06 0 1.49-.01 2.69-.01 3.05 0 .3.2.65.77.54C19.06 20.86 22.25 16.68 22.25 11.75 22.25 5.48 17.27.5 11 .5z" fill="currentColor"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com/in/srinath-potharaju/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full bg-white/5 hover:bg-white/8 transition transform hover:-translate-y-1 themed-text flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4zM9 8h3.8v2.06h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.09V23h-4V15.3c0-1.85-.04-4.22-2.57-4.22-2.57 0-2.97 2.01-2.97 4.08V23H9V8z" fill="currentColor"/>
                </svg>
              </a>

              <div className="ml-2 relative hidden md:block" tabIndex={0}>
                <button onClick={()=>setThemeMenuOpen(s=>!s)} aria-haspopup="menu" aria-expanded={themeMenuOpen} className="p-1 rounded-md bg-white/5 text-sm themed-text flex items-center gap-2 px-3 hover:bg-white/7 transition">
                  <span className="w-3 h-3 rounded-full" style={{background: theme==='dark' ? '#0f172a' : theme==='light' ? '#f8fafc' : theme==='hive' ? '#f59e0b' : theme==='solar' ? '#ffb86b' : '#e6f6ef'}} />
                  <span className="capitalize font-medium">{theme}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-300 ${themeMenuOpen ? 'rotate-180' : ''} opacity-80`}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </button>
                {themeMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 glass-sm p-2 rounded-lg shadow-glow" role="menu">
                    <button onClick={()=>{changeTheme('system'); setThemeMenuOpen(false)}} className="w-full text-left p-2 rounded-md hover:bg-white/6 transition flex items-center gap-3"> <span className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-slate-400"/> System</button>
                    <button onClick={()=>{changeTheme('dark'); setThemeMenuOpen(false)}} className="w-full text-left p-2 rounded-md hover:bg-white/6 transition flex items-center gap-3"> <span className="w-4 h-4 rounded-full bg-black"/> Dark</button>
                    <button onClick={()=>{changeTheme('light'); setThemeMenuOpen(false)}} className="w-full text-left p-2 rounded-md hover:bg-white/6 transition flex items-center gap-3"> <span className="w-4 h-4 rounded-full bg-white border border-slate-200"/> Light</button>
                    <button onClick={()=>{changeTheme('hive'); setThemeMenuOpen(false)}} className="w-full text-left p-2 rounded-md hover:bg-white/6 transition flex items-center gap-3"> <span className="w-4 h-4 rounded-full" style={{background:'#f59e0b'}}/> Hive</button>
                    <button onClick={()=>{changeTheme('solar'); setThemeMenuOpen(false)}} className="w-full text-left p-2 rounded-md hover:bg-white/6 transition flex items-center gap-3"> <span className="w-4 h-4 rounded-full" style={{background:'#ffb86b'}}/> Solar</button>
                    <button onClick={()=>{changeTheme('snow'); setThemeMenuOpen(false)}} className="w-full text-left p-2 rounded-md hover:bg-white/6 transition flex items-center gap-3"> <span className="w-4 h-4 rounded-full" style={{background:'#f8fafc', border:'1px solid #e6e6e6'}}/> Snow</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="max-w-7xl mx-auto mt-2 p-4 glass-sm rounded-lg md:hidden">
            <nav className="flex flex-col gap-3">
              <a href="#about" onClick={()=>setMenuOpen(false)} className="themed-text hover:text-cyan-300 transition">About</a>
              <a href="#skills" onClick={()=>setMenuOpen(false)} className="themed-text hover:text-cyan-300 transition">Skills</a>
              <a href="#projects" onClick={()=>setMenuOpen(false)} className="themed-text hover:text-cyan-300 transition">Projects</a>
              <a href="#contact" onClick={()=>setMenuOpen(false)} className="themed-text hover:text-cyan-300 transition">Contact</a>
            </nav>
          </div>
        )}
      </header>

      {themeToast && (
        <div className="fixed top-20 right-6 z-50">
          <div className="theme-toast px-4 py-2 rounded-md shadow-lg">{themeToast}</div>
        </div>
      )}

      <Hero />
      <main className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <About />
        <Skills />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      
      <footer className="site-footer mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="footer-top grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="footer-brand">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://res.cloudinary.com/notes1/image/upload/Purple_Blue_AI_Learning_Book_Cover_5_t1maj0.png" alt="Srinath" onError={(e)=>{e.target.style.display='none'}} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10 shadow-md" />
                <div>
                  <div className="font-bold gradient-text text-lg">Srinath</div>
                  <div className="text-sm themed-text/80">Designing & building delightful web and AI experiences.</div>
                </div>
              </div>
              <div className="mt-4">
                <a href="mailto:sri.nxth@yahoo.com" className="text-cyan-300 hover:text-cyan-200 font-semibold">sri.nxth@yahoo.com</a>
                <div className="text-sm text-slate-400 mt-3">Available for freelance & full-time engagements.</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold themed-text mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="footer-link">About</a></li>
                <li><a href="#skills" className="footer-link">Skills</a></li>
                <li><a href="#projects" className="footer-link">Projects</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
              </ul>
              <form onSubmit={submitNewsletter} className="mt-6 flex gap-2">
                <input value={newsletterEmail} onChange={e=>setNewsletterEmail(e.target.value)} placeholder="Your email" className="p-3 rounded-md bg-white/5 border border-white/8 themed-text flex-1" />
                <button className="px-4 py-2 neon-btn themed-text font-semibold">Subscribe</button>
              </form>
              {newsletterSent && <div className="mt-3 text-sm text-green-400">Thanks — you're subscribed!</div>}
            </div>

            <div>
              <h4 className="font-semibold themed-text mb-3">Connect</h4>
              <div className="flex gap-3 items-center mb-4">
                <a href="https://github.com/sriinathh" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social" title="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.93 3.19 9.11 7.61 10.59.56.1.76-.24.76-.54 0-.27-.01-1-.02-1.96-3.09.67-3.74-1.49-3.74-1.49-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.08-.67.08-.67 1.09.08 1.66 1.12 1.66 1.12.97 1.66 2.55 1.18 3.17.9.1-.71.38-1.18.69-1.45-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.4.11-2.92 0 0 .95-.3 3.12 1.15.9-.25 1.86-.38 2.82-.38.96 0 1.92.13 2.82.38 2.17-1.45 3.12-1.15 3.12-1.15.61 1.52.23 2.64.11 2.92.72.78 1.16 1.78 1.16 3 0 4.29-2.61 5.23-5.09 5.51.39.34.74 1.02.74 2.06 0 1.49-.01 2.69-.01 3.05 0 .3.2.65.77.54C19.06 20.86 22.25 16.68 22.25 11.75 22.25 5.48 17.27.5 11 .5z" fill="currentColor"/></svg>
                </a>
                <a href="https://x.com/NithiinSrinu" target="_blank" rel="noopener noreferrer" aria-label="X" className="footer-social" title="X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M22 5.92c-.64.28-1.32.47-2.04.56.73-.44 1.28-1.14 1.54-1.98-.69.41-1.45.71-2.26.88C18.9 4.7 17.8 4 16.55 4c-1.85 0-3.35 1.5-3.35 3.35 0 .26.03.51.09.75C9.6 8.96 6.13 7.2 3.86 4.28c-.29.5-.46 1.08-.46 1.7 0 1.17.6 2.2 1.52 2.8-.56-.02-1.09-.17-1.55-.43v.04c0 1.63 1.16 2.99 2.7 3.3-.28.08-.57.12-.87.12-.21 0-.42-.02-.62-.06.42 1.32 1.64 2.28 3.08 2.31-1.13.88-2.55 1.4-4.09 1.4-.27 0-.53-.02-.79-.05 1.5.96 3.28 1.52 5.2 1.52 6.24 0 9.66-5.17 9.66-9.66v-.44c.66-.48 1.23-1.08 1.68-1.77-.6.27-1.25.46-1.92.54.69-.42 1.22-1.08 1.47-1.87-.64.38-1.35.65-2.11.8z" fill="currentColor"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/srinath-potharaju/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social" title="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4zM9 8h3.8v2.06h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.09V23h-4V15.3c0-1.85-.04-4.22-2.57-4.22-2.57 0-2.97 2.01-2.97 4.08V23H9V8z" fill="currentColor"/></svg>
                </a>
              </div>
              <div className="text-sm themed-text/80 mt-4">© {new Date().getFullYear()} Srinath. All rights reserved. — <a href="https://github.com/sriinathh" className="text-cyan-300 hover:underline">GitHub</a> · <a href="https://x.com/NithiinSrinu" className="text-cyan-300 hover:underline">X</a> · <a href="https://www.linkedin.com/in/srinath-potharaju/" className="text-cyan-300 hover:underline">LinkedIn</a></div>
            </div>
          </div>

          <div className="footer-bottom mt-8 text-center text-sm themed-text/80">
          
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="fixed right-6 bottom-24 neon-btn p-3 rounded-full z-40 themed-text shadow-lg">↑</button>
      )}

      <ChatWidget />
    </div>
  )
}

export default App
