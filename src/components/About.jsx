import React from 'react'
import { motion } from 'framer-motion'
import resume from '../assets/Srinath-potharaju.pdf'

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '25+', label: 'Projects Completed' },
  { value: '15+', label: 'Happy Clients' },
  { value: '100%', label: 'Satisfaction' }
]

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="glass p-8 md:p-16 max-w-6xl mx-auto relative overflow-hidden"
      >
        <div className="perf-orb" style={{ top: '-8%', left: '-6%', width: 256, height: 256, opacity: 0.14 }} />
        <div className="perf-orb" style={{ bottom: '-6%', right: '-6%', width: 320, height: 320, opacity: 0.12 }} />
        <h2 className="section-header text-4xl md:text-5xl font-black mb-4 gradient-text">About Me</h2>
        <p className="themed-text mb-12 text-lg">Get to know the person behind the code</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className=""
          >
            <div>
              <p className="themed-text leading-relaxed mb-3 text-lg">
                Hi — I'm <strong className="gradient-text">Srinath Potharaju</strong>. I build modern web apps and AI-driven features with attention to performance and refined UX.
              </p>
              <p className="themed-text leading-relaxed mb-3 text-base">I specialize in React, Node.js, and scalable cloud deployments. I enjoy open-source, mentoring, and shipping production-ready systems.</p>

              <div className="flex items-center gap-3 mt-3">
                <a href="https://github.com/sriinathh" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-md bg-white/6 hover:bg-white/8 themed-text">GitHub</a>
                <a href="https://x.com/NithiinSrinu" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-md bg-white/6 hover:bg-white/8 themed-text">X</a>
                <a href="https://www.linkedin.com/in/srinath-potharaju/" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-md bg-white/6 hover:bg-white/8 themed-text">LinkedIn</a>
              </div>

              <motion.a whileHover={{ y: -3 }} href={resume} download className="inline-block px-4 py-2 mt-6 rounded-md bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-sm">📄 Download Resume</motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s, idx) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="glass-sm p-6 text-center border border-white/6 rounded-lg"
              >
                <div className="text-3xl md:text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent">
                  {s.value}
                </div>
                <div className="text-sm themed-text mt-3">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
