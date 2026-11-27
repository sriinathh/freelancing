import React from 'react'
import { motion } from 'framer-motion'

const items = [
  { name: 'Ravi Kumar', role: 'Founder, Lakshmi Labs', text: 'Srinath rebuilt our dashboard and cut load times in half. Very communicative and delivered exactly what we needed.' },
  { name: 'Sowmya Reddy', role: 'CTO, GreenField', text: 'Handled a tricky backend migration with zero downtime. Professional, thoughtful, and thorough.' },
  { name: 'Venkatesh Rao', role: 'Product Manager, NovaApps', text: 'Converted our product requirements into a clean, maintainable codebase. Fast delivery and great documentation.' },
  { name: 'Sruti Varma', role: 'Design Lead, Flux Studio', text: 'Polished the UI interactions and accessibility — the app looks and feels premium now.' },
  { name: 'Karthik Yadav', role: 'Engineering Lead, HarborTech', text: 'Solid engineering, clear PRs, and helpful testing. Srinath is reliable and pragmatic.' },
  { name: 'Lakshmi Narayan', role: 'CEO, MarketWave', text: 'Exceeded expectations and suggested smart product improvements that improved retention.' },
]

export default function Testimonials(){
  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="section-header text-4xl md:text-5xl font-black mb-16 gradient-text">What Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((i, idx) => (
            <motion.blockquote
              key={i.name}
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.09 }}
              viewport={{ once: true }}
              className="glass card-hover p-6 shadow-glow-hover relative rounded-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold">{i.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                <div>
                  <div className="font-semibold themed-text">{i.name}</div>
                  <div className="text-sm text-slate-400">{i.role}</div>
                </div>
                <div className="ml-auto text-amber-400 text-lg">★★★★★</div>
              </div>
              <p className="themed-text text-lg leading-relaxed italic">“{i.text}”</p>
            </motion.blockquote>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
