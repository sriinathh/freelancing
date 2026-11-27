import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  { 
    title: 'Full-Stack Development', 
    icon: '💼', 
    desc: 'Complete web applications from frontend to backend',
    details: 'Build production-ready web applications with modern tech stack. Includes architecture design, development, testing, and deployment support.'
  },
  { 
    title: 'E-Commerce Solutions', 
    icon: '🛒', 
    desc: 'Online stores with payments and inventory',
    details: 'Complete e-commerce platforms with payment integration, inventory management, order tracking, and analytics dashboards.'
  },
  { 
    title: 'Portfolio & Branding', 
    icon: '🎨', 
    desc: 'Modern portfolios and personal brands',
    details: 'Create stunning portfolio websites and personal brands that showcase your work and attract opportunities.'
  },
  { 
    title: 'API Development', 
    icon: '⚙️', 
    desc: 'Scalable REST & GraphQL APIs',
    details: 'Design and develop robust, scalable APIs with proper authentication, documentation, and performance optimization.'
  },
  { 
    title: 'UI/UX Design', 
    icon: '✨', 
    desc: 'Beautiful and intuitive user interfaces',
    details: 'Create engaging and user-friendly interfaces with attention to accessibility, responsiveness, and modern design principles.'
  },
  { 
    title: 'Deployment & Ops', 
    icon: '🚀', 
    desc: 'DevOps, CI/CD, and cloud optimization',
    details: 'Set up deployment pipelines, containerization, monitoring, and cloud infrastructure for seamless operations.'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
}

export default function Services(){
  const [selectedService, setSelectedService] = React.useState(null)

  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="section-header text-4xl md:text-5xl font-black mb-4 gradient-text">Services</h2>
        <p className="themed-text max-w-2xl mb-16 text-lg">I offer a range of services to help your business succeed</p>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s, idx) => (
            <motion.div
              key={s.title}
              variants={itemVariant}
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="glass card-hover p-6 group shadow-glow-hover"
            >
              <div className="text-6xl mb-4 group-hover:scale-125 group-hover:animate-smooth-float transition-transform duration-300">{s.icon}</div>
              <h3 className="font-bold text-lg mb-3 themed-text group-hover:text-cyan-300 transition-colors">{s.title}</h3>
              <p className="text-sm themed-text mb-6 leading-relaxed">{s.desc}</p>
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedService(s)}
                className="w-full text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/60 to-cyan-600/60 hover:from-purple-600 hover:to-cyan-600 font-semibold transition-all shadow-lg"
              >
                Learn more
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-md p-8 rounded-2xl border border-white/20"
            >
              <div className="text-6xl mb-4">{selectedService.icon}</div>
              <h3 className="text-2xl font-bold gradient-text mb-4">{selectedService.title}</h3>
              <p className="themed-text text-sm mb-6 leading-relaxed">{selectedService.desc}</p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                <h4 className="font-semibold themed-text mb-2">Overview</h4>
                <p className="text-sm themed-text opacity-90">{selectedService.details}</p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedService(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/8 hover:bg-white/12 themed-text font-semibold transition-all"
                >
                  Close
                </motion.button>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedService(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-lg transition-all text-center"
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
