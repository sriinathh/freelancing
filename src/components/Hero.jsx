import React from 'react'
import { motion } from 'framer-motion'

const roles = ['Full Stack Developer', 'AI Builder', 'Web Designer', 'Application Developer', 'AWS Engineer', 'Cybersecurity']

function Typing({ items }) {
  const [idx, setIdx] = React.useState(0)
  const [show, setShow] = React.useState('')

  React.useEffect(() => {
    let i = 0
    let forward = true
    const t = setInterval(() => {
      if (forward) {
        i++
        setShow(items[idx].slice(0, i))
        if (i === items[idx].length) {
          forward = false
          setTimeout(() => {}, 500)
        }
      } else {
        i--
        setShow(items[idx].slice(0, i))
        if (i === 0) {
          forward = true
          setIdx((s) => (s + 1) % items.length)
        }
      }
    }, 70)
    return () => clearInterval(t)
  }, [idx, items])

  return (
    <span className="text-3xl md:text-5xl font-extrabold bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent">
      {show}
      <span className="inline-block w-1 h-10 md:h-14 bg-gradient-to-b from-cyan-400 to-purple-500 ml-2 rounded animate-pulse" />
    </span>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* Full-bleed background + soft orbs (no boxed card) */}
      <div className="absolute inset-0 -z-20 bg-transparent" />
      <div className="perf-orb" style={{ top: '8%', left: '6%', width: 520, height: 520, opacity: 0.14 }} />
      <div className="perf-orb" style={{ bottom: '6%', right: '8%', width: 620, height: 620, opacity: 0.12 }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-7xl px-6 lg:px-12 text-left"
      >
        <div className="max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-4">
            <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60" />
            <div className="text-sm text-slate-300">Design × Code × AI</div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold themed-text leading-tight mb-6">
            I'm <span className="gradient-text">Srinath</span>
          </h1>

          <div className="mb-8">
            <Typing items={roles} />
          </div>

          <p className="text-lg md:text-xl themed-text max-w-3xl mb-8">
            I build sleek, high-performance web apps and AI features. I favor refined details, subtle motion,
            and minimal overhead — delightful experiences without the heavy box.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#contact" className="neon-btn themed-text font-semibold px-6 py-3 shadow-lg">Hire me</a>
            <div className="ml-4 flex gap-3 items-center">
              <motion.a href="https://github.com/sriinathh" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, scale: 1.06 }} className="text-slate-300 hover:text-cyan-400 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .5C5.73.5.74 5.5.74 11.78c0 4.98 3.29 9.2 7.86 10.69.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.76.41-1.27.75-1.56-2.56-.29-5.25-1.28-5.25-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 2.87-.39c.98 0 1.97.13 2.88.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.07 0 4.41-2.7 5.39-5.27 5.67.42.36.8 1.08.8 2.18 0 1.58-.01 2.86-.01 3.25 0 .31.21.68.8.56 4.56-1.5 7.84-5.71 7.84-10.69C23.26 5.5 18.27.5 12 .5z" />
                </svg>
                <span className="sr-only">GitHub</span>
              </motion.a>

              <motion.a href="https://www.linkedin.com/in/srinath-potharaju/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, scale: 1.06 }} className="text-slate-300 hover:text-cyan-400 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.4c0-1.29-.03-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86v5.5H9.4V9h3.42v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.54v6.7zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.15 20.45H3.53V9h3.62v11.45z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default React.memo(Hero)
