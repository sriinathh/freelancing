import React from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'E-Commerce Platform',
    desc: 'Full-stack e-commerce with AI product recommendations, inventory automation, and real-time analytics.',
    tech: ['React','Node','MongoDB','Stripe','Redis'],
    logo: '🛒',
    live: '#', repo: '#',
    client: 'Clarity Retail',
    year: 2025,
    role: 'Lead Engineer',
    duration: '12 weeks',
    featured: true,
    color: 'from-blue-600/20 to-cyan-600/20'
  },
  {
    title: 'SaaS Analytics Dashboard',
    desc: 'Enterprise analytics dashboard with real-time streams, role-based access, and collaborative reports.',
    tech: ['React','Express','Postgres','WebSocket','D3'],
    logo: '📊',
    live: '#', repo: '#',
    client: 'MetricFlow',
    year: 2024,
    role: 'Frontend + API',
    duration: '8 weeks',
    featured: true,
    color: 'from-purple-600/20 to-pink-600/20'
  },
  {
    title: 'AI Chat Assistant',
    desc: 'Context-aware assistant integrated with knowledge bases and multi-language fallback.',
    tech: ['OpenAI','Node','React','Pinecone'],
    logo: '🤖',
    live: '#', repo: '#',
    client: 'HelpBot Inc',
    year: 2025,
    role: 'AI Integrator',
    duration: '6 weeks',
    featured: true,
    color: 'from-emerald-600/20 to-cyan-600/20'
  },
  {
    title: 'Social Media Management Tool',
    desc: 'Schedule posts, analytics, and engagement tracking across multiple platforms with AI insights.',
    tech: ['React','GraphQL','PostgreSQL','AWS','Next.js'],
    logo: '📱',
    live: '#', repo: '#',
    client: 'SocialHub',
    year: 2025,
    role: 'Full Stack Developer',
    duration: '10 weeks',
    featured: true,
    color: 'from-pink-600/20 to-rose-600/20'
  },
  {
    title: 'Real-Time Collaboration App',
    desc: 'Document collaboration platform with live cursor tracking, version control, and comments.',
    tech: ['React','WebSocket','Firebase','Yjs','Tailwind'],
    logo: '📝',
    live: '#', repo: '#',
    client: 'CollabFlow',
    year: 2024,
    role: 'Frontend Lead',
    duration: '9 weeks',
    featured: true,
    color: 'from-indigo-600/20 to-blue-600/20'
  },
  {
    title: 'Portfolio Builder',
    desc: 'Custom portfolio generator for freelancers with CMS, SEO optimizations and one-click deploy.',
    tech: ['React','Vite','Netlify','Tailwind'],
    logo: '🎨',
    live: '#', repo: '#',
    client: 'Self',
    year: 2026,
    role: 'Full Product',
    duration: '4 weeks',
    featured: true,
    color: 'from-amber-500/20 to-orange-400/20'
  },
  {
    title: 'Video Streaming Platform',
    desc: 'Adaptive video streaming with HLS/DASH, end-to-end encryption, and viewer analytics.',
    tech: ['Node','React','FFmpeg','Redis','AWS S3'],
    logo: '🎬',
    live: '#', repo: '#',
    client: 'StreamMax',
    year: 2024,
    role: 'Backend Engineer',
    duration: '14 weeks',
    featured: false,
    color: 'from-red-600/20 to-pink-600/20'
  },
  {
    title: 'Task Management System',
    desc: 'Team task management with Kanban boards, time tracking, and automated workflows.',
    tech: ['Vue','Node','MongoDB','Socket.io','Docker'],
    logo: '✅',
    live: '#', repo: '#',
    client: 'ProductTeam',
    year: 2023,
    role: 'Full Stack',
    duration: '8 weeks',
    featured: false,
    color: 'from-green-600/20 to-emerald-600/20'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
}

export default function Projects(){
  return (
    <section id="projects" className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="section-header text-4xl md:text-5xl font-black mb-16 gradient-text">Featured Projects</h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.filter(p => p.featured).map((p, idx) => (
            <motion.article
              key={p.title}
              variants={itemVariant}
              whileHover={{ y: -8, scale: 1.01 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="glass card-hover overflow-hidden group grid grid-cols-1 md:grid-cols-3 gap-4 p-0 rounded-xl relative"
            >
              <div className="md:col-span-1 relative overflow-hidden rounded-l-xl">
                <div className={`h-48 md:h-full bg-gradient-to-br ${p.color} w-full flex flex-col items-center justify-center p-4`}> 
                  <motion.div 
                    className="text-7xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {p.logo}
                  </motion.div>
                  <div className="bg-black/30 px-3 py-1 rounded text-xs themed-text font-semibold">{p.client} • {p.year}</div>
                </div>
              </div>

              <div className="md:col-span-2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    {p.featured && <div className="text-xs px-2 py-1 bg-amber-500/20 border border-amber-500/25 rounded-full themed-text font-semibold whitespace-nowrap">Featured</div>}
                    <h3 className="font-extrabold text-xl md:text-2xl themed-text">{p.title}</h3>
                  </div>

                  <p className="text-sm themed-text/80 mb-4 leading-relaxed">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tech.map(t=> (
                      <motion.span
                        key={t}
                        whileHover={{ scale: 1.06 }}
                        className="px-3 py-1 text-xs font-semibold bg-white/3 border border-white/6 themed-text rounded-full transition-all hover:bg-white/6"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <motion.a 
                      href={p.live} 
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-md font-semibold shadow hover:shadow-lg transition-all"
                    >
                      🌐 Live
                    </motion.a>
                    <motion.a 
                      href={p.repo} 
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-white/8 themed-text rounded-md hover:bg-white/6 transition-all"
                    >
                      💻 Code
                    </motion.a>
                    <motion.a 
                      href="#" 
                      whileHover={{ x: 4 }}
                      className="ml-auto text-sm themed-text/80 hover:text-cyan-400 underline transition-colors"
                    >
                      Case study →
                    </motion.a>
                  </div>

                  <div className="text-sm themed-text/70 flex gap-4 flex-wrap">
                    <div>👤 Role: <span className="font-semibold themed-text">{p.role}</span></div>
                    <div>⏱️ Duration: <span className="font-semibold themed-text">{p.duration}</span></div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* All Projects grid removed per request */}
      </motion.div>
    </section>
  )
}
