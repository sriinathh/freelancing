import React from 'react'
import { motion } from 'framer-motion'

const allSkills = [
  // Languages
  { name: 'JavaScript', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'Kotlin', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name: 'HTML5', category: 'Languages' },
  { name: 'CSS3', category: 'Languages' },
  { name: 'Sass', category: 'Languages' },
  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Vue', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'Redux', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'Storybook', category: 'Frontend' },
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'GraphQL', category: 'Backend' },
  { name: 'Mongoose', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  // Databases
  { name: 'MongoDB', category: 'Databases' },
  { name: 'PostgreSQL', category: 'Databases' },
  { name: 'MySQL', category: 'Databases' },
  { name: 'SQLite', category: 'Databases' },
  { name: 'Redis', category: 'Databases' },
  // DevOps
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'Terraform', category: 'DevOps' },
  { name: 'Ansible', category: 'DevOps' },
  { name: 'Nginx', category: 'DevOps' },
  { name: 'Apache', category: 'DevOps' },
  { name: 'Linux', category: 'DevOps' },
  // Cloud & Platforms
  { name: 'AWS', category: 'Cloud' },
  { name: 'Google Cloud', category: 'Cloud' },
  { name: 'Firebase', category: 'Cloud' },
  { name: 'Vercel', category: 'Cloud' },
  { name: 'Heroku', category: 'Cloud' },
  // Security
  { name: 'Kali Linux', category: 'Security' },
  { name: 'Metasploit', category: 'Security' },
  { name: 'Nmap', category: 'Security' },
  { name: 'Wireshark', category: 'Security' },
  { name: 'SQLMap', category: 'Security' },
  // Tools
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'Application Developer', category: 'Roles' },
  { name: 'GitLab', category: 'Tools' },
  { name: 'Postman', category: 'Tools' },
  { name: 'Figma', category: 'Tools' },
  { name: 'Notion', category: 'Tools' },
  { name: 'Slack', category: 'Tools' },
]

const skillToUrl = {
  JavaScript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  TypeScript: 'https://www.typescriptlang.org/',
  Python: 'https://www.python.org/',
  Java: 'https://www.java.com/',
  Kotlin: 'https://kotlinlang.org/',
  'C++': 'https://isocpp.org/',
  HTML5: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5',
  CSS3: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  Sass: 'https://sass-lang.com/',
  React: 'https://react.dev/',
  'Next.js': 'https://nextjs.org/',
  Vue: 'https://vuejs.org/',
  Angular: 'https://angular.io/',
  Redux: 'https://redux.js.org/',
  'Tailwind CSS': 'https://tailwindcss.com/',
  Bootstrap: 'https://getbootstrap.com/',
  'Framer Motion': 'https://www.framer.com/motion/',
  Storybook: 'https://storybook.js.org/',
  'Node.js': 'https://nodejs.org/',
  Express: 'https://expressjs.com/',
  GraphQL: 'https://graphql.org/',
  Mongoose: 'https://mongoosejs.com/',
  'REST APIs': 'https://en.wikipedia.org/wiki/Representational_state_transfer',
  MongoDB: 'https://www.mongodb.com/',
  PostgreSQL: 'https://www.postgresql.org/',
  MySQL: 'https://www.mysql.com/',
  SQLite: 'https://www.sqlite.org/',
  Redis: 'https://redis.io/',
  Docker: 'https://www.docker.com/',
  Kubernetes: 'https://kubernetes.io/',
  Terraform: 'https://www.terraform.io/',
  Ansible: 'https://www.ansible.com/',
  Nginx: 'https://www.nginx.com/',
  Apache: 'https://httpd.apache.org/',
  Linux: 'https://www.kernel.org/',
  AWS: 'https://aws.amazon.com/',
  'Google Cloud': 'https://cloud.google.com/',
  Firebase: 'https://firebase.google.com/',
  Vercel: 'https://vercel.com/',
  Heroku: 'https://www.heroku.com/',
  'Kali Linux': 'https://www.kali.org/',
  Metasploit: 'https://www.metasploit.com/',
  Nmap: 'https://nmap.org/',
  Wireshark: 'https://www.wireshark.org/',
  SQLMap: 'https://sqlmap.org/',
  Git: 'https://git-scm.com/',
  GitHub: 'https://github.com/',
  'Application Developer': 'https://en.wikipedia.org/wiki/Application_software_developer',
  GitLab: 'https://about.gitlab.com/',
  Postman: 'https://www.postman.com/',
  Figma: 'https://www.figma.com/',
  Notion: 'https://www.notion.so/',
  Slack: 'https://slack.com/',
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
}

export default function Skills() {
  const [query, setQuery] = React.useState('')
  const [activeCat, setActiveCat] = React.useState('All')

  const categories = React.useMemo(() => ['All', ...Array.from(new Set(allSkills.map(s => s.category)))], [])

  const filtered = React.useMemo(() => {
    return allSkills.filter(s => {
      if (activeCat !== 'All' && s.category !== activeCat) return false
      if (query.trim() === '') return true
      return s.name.toLowerCase().includes(query.toLowerCase())
    })
  }, [query, activeCat])

  return (
    <section id="skills" className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="section-header text-4xl md:text-5xl font-black gradient-text">Skills & Expertise</h2>
            <p className="text-sm themed-text/70 mt-2">A curated set of tools, languages and roles I work with — hover to discover.</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills"
              className="px-3 py-2 rounded-md bg-white/5 themed-text placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-3 py-1 text-sm rounded-full ${activeCat === cat ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' : 'bg-white/4 themed-text'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 items-center justify-center md:justify-start"
        >
          {filtered.map((skill, idx) => {
            const url = skillToUrl[skill.name] || `https://www.google.com/search?q=${encodeURIComponent(skill.name)}`
            const isRole = skill.category === 'Roles'

            return (
              <motion.a
                key={skill.name + idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
                whileHover={{ scale: 1.08, y: -6, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5 + (idx % 4) * 0.2, repeat: Infinity, delay: idx * 0.04, ease: 'easeInOut' }}
                title={`${skill.name} — ${skill.category}`}
                className="group relative"
              >
                <div className={`rounded-full p-[1.5px] ${isRole ? 'bg-gradient-to-r from-purple-500 to-cyan-400' : 'bg-white/6'}`}>
                  <div className={`px-4 py-2 rounded-full backdrop-blur-sm ${isRole ? 'text-white' : 'themed-text'} flex items-center gap-3 shadow-sm hover:shadow-md transition-all`}
                    style={isRole ? { background: 'linear-gradient(90deg,#7c3aed,#06b6d4)' } : undefined}
                  >
                    <span className={`w-2 h-2 rounded-full ${isRole ? 'bg-white/80 animate-pulse' : 'bg-white/20'}`} aria-hidden />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
