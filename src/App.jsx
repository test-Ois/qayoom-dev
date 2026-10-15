import { useMemo, useState } from 'react'
import { categories, projects } from './data/projects.js'

const Icon = ({ name, size = 18 }) => {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
    external: <><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card" style={{ '--delay': `${index * 70}ms` }}>
      <div className={`project-art ${project.tone}`}>
        <span className="project-mark">{project.mark}</span>
        <span className="art-orbit orbit-one" />
        <span className="art-orbit orbit-two" />
        <span className="art-caption">PROJECT / {String(index + 1).padStart(2, '0')}</span>
        {project.featured && <span className="featured-tag"><span /> Featured</span>}
      </div>
      <div className="project-content">
        <div className="project-title-row"><h3>{project.name}</h3><span className="project-category">{project.category}</span></div>
        <p>{project.description}</p>
        <div className="stack-list">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
        <div className="project-links">
          {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live preview <Icon name="external" size={15} /></a>}
          {project.github && <a href={project.github} target="_blank" rel="noreferrer">Source code <Icon name="github" size={15} /></a>}
          {!project.live && !project.github && <span className="soon-label">Repository link coming soon</span>}
        </div>
      </div>
    </article>
  )
}

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const visibleProjects = useMemo(() => projects.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory
    const searchText = `${project.name} ${project.description} ${project.stack.join(' ')}`.toLowerCase()
    return matchesCategory && searchText.includes(query.toLowerCase().trim())
  }), [activeCategory, query])

  return (
    <div className={`site-shell theme-${theme}`}>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar wrap">
        <a className="brand" href="#home" aria-label="Qayoom.dev home"><span className="brand-icon">q<span>.</span></span><span>Qayoom<span className="brand-muted">.dev</span></span></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Work <span>↘</span></a><a href="#about">About <span>↘</span></a><a href="#stats">GitHub <span>↗</span></a><a href="#contact">Contact <span>↘</span></a></nav>
        <div className="topbar-actions">
          <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} /></button>
          <a className="header-cta" href="https://github.com/test-Ois" target="_blank" rel="noreferrer">Let's connect <Icon name="arrow" size={15} /></a>
        </div>
      </header>

      <main id="home">
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> DEVELOPER HUB <span className="eyebrow-line" /></div>
            <h1>Building things<br />for the <span className="highlight-word">digital world.</span></h1>
            <p className="hero-description">Hey, I'm Qayoom — a developer who likes turning ideas into useful, thoughtful digital experiences. Here's what I've been building.</p>
            <div className="hero-actions"><a className="button-primary" href="#work">Explore my work <Icon name="arrow" size={17} /></a><a className="button-quiet" href="https://github.com/test-Ois" target="_blank" rel="noreferrer"><Icon name="github" size={17} /> GitHub profile</a></div>
            <div className="hero-footnote"><span className="footnote-rule" /> Independent builder <span className="footnote-dot">/</span> Always learning</div>
          </div>
          <div className="hero-visual" aria-label="Decorative code-inspired illustration">
            <div className="visual-grid" />
            <div className="visual-ring ring-large" /><div className="visual-ring ring-small" />
            <div className="floating-chip chip-top"><span className="chip-led" /> CRAFTING WITH CARE</div>
            <div className="terminal-card"><div className="terminal-head"><div className="terminal-dots"><i /><i /><i /></div><span>~/qayoom.dev</span><span className="terminal-lock">⌘</span></div><div className="terminal-body"><div><span className="code-muted">01</span> <span className="code-purple">const</span> <span className="code-lime">creator</span> = {'{'}</div><div><span className="code-muted">02</span> &nbsp; name: <span className="code-orange">'Qayoom'</span>,</div><div><span className="code-muted">03</span> &nbsp; focus: <span className="code-orange">'Full stack'</span>,</div><div><span className="code-muted">04</span> &nbsp; mindset: <span className="code-orange">'Keep building'</span></div><div><span className="code-muted">05</span> {'}'}</div><div className="terminal-output"><span className="terminal-cursor" /> ready to create something good<span className="terminal-period">.</span></div></div></div>
            <div className="floating-chip chip-bottom"><Icon name="spark" size={15} /> IDEAS → REALITY</div>
            <div className="visual-coordinate">30°44' N<br />76°39' E</div>
          </div>
        </section>

        <section className="ticker" aria-label="Technologies"><div className="ticker-track"><span>REACT.JS</span><i>✳</i><span>JAVASCRIPT</span><i>✳</i><span>NODE.JS</span><i>✳</i><span>AI INTEGRATION</span><i>✳</i><span>WEB EXPERIENCES</span><i>✳</i><span>REACT.JS</span><i>✳</i><span>JAVASCRIPT</span><i>✳</i><span>NODE.JS</span><i>✳</i><span>AI INTEGRATION</span><i>✳</i><span>WEB EXPERIENCES</span><i>✳</i></div></section>

        <section className="work-section wrap section-pad" id="work">
          <div className="section-heading"><div><div className="eyebrow">01 / SELECTED WORK</div><h2>A few things I've <span className="heading-muted">put into the world.</span></h2></div><p>Experiments, products, and ideas in progress. Each one is a chance to learn something new.</p></div>
          <div className="project-toolbar"><div className="filter-list" role="group" aria-label="Filter projects">{categories.map((category) => <button key={category} className={activeCategory === category ? 'filter-button active' : 'filter-button'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a project..." aria-label="Search projects" /><kbd>/</kbd></label></div>
          <div className="project-grid">{visibleProjects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
          {visibleProjects.length === 0 && <div className="empty-state">No projects match that search. Try another keyword.</div>}
          <div className="all-projects-note"><span className="note-star">✳</span><span>More projects are taking shape. This list grows as I build.</span><a href="https://github.com/test-Ois?tab=repositories" target="_blank" rel="noreferrer">Browse all repositories <Icon name="arrow" size={15} /></a></div>
        </section>

        <section className="about-section" id="about"><div className="wrap about-inner"><div className="about-label"><div className="eyebrow">02 / A LITTLE ABOUT ME</div><div className="about-stamp">BUILD<br />WITH<br /><span>INTENT.</span></div></div><div className="about-copy"><h2>Curious by nature.<br /><span className="heading-muted">Builder by choice.</span></h2><p>I enjoy creating full-stack web apps, exploring AI integrations, and polishing the little details that make a product feel right. I believe good software should be useful first, clear by design, and always improving.</p><div className="principles"><div><span>01</span><strong>Stay curious</strong><p>Keep exploring new ideas and tools.</p></div><div><span>02</span><strong>Build to learn</strong><p>Turn concepts into working projects.</p></div><div><span>03</span><strong>Mind the details</strong><p>Make the experience feel considered.</p></div></div></div></div></section>

        <section className="stats-section wrap section-pad" id="stats"><div className="section-heading"><div><div className="eyebrow">03 / OPEN SOURCE</div><h2>My corner of <span className="heading-muted">GitHub.</span></h2></div><a className="text-link" href="https://github.com/test-Ois" target="_blank" rel="noreferrer">Follow the journey <Icon name="arrow" size={16} /></a></div><div className="stats-panel"><div className="stats-intro"><span className="stats-github-icon"><Icon name="github" size={28} /></span><h3>Building in public.</h3><p>Projects, experiments, and code — one commit at a time.</p><a href="https://github.com/test-Ois?tab=repositories" target="_blank" rel="noreferrer">Explore repositories <Icon name="arrow" size={15} /></a></div><div className="stats-image-wrap"><img src="https://github-readme-stats.vercel.app/api?username=test-Ois&show_icons=true&hide_border=true&bg_color=00000000&title_color=b7f36b&text_color=9ca69a&icon_color=b7f36b&ring_color=b7f36b" alt="GitHub profile statistics for test-Ois" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none' }} /><div className="stats-fallback">Live GitHub stats will appear here when the stats service is available.</div></div></div></section>

        <section className="contact-section wrap" id="contact"><div className="contact-card"><div className="contact-orb" /><div className="eyebrow"><span className="status-dot" /> 04 / YOUR TURN</div><h2>Got an idea?<br /><span>Let's make it real.</span></h2><p>Have a project in mind, want to collaborate, or just want to talk tech? Find me on GitHub and let's start there.</p><a className="button-primary" href="https://github.com/test-Ois" target="_blank" rel="noreferrer">Connect on GitHub <Icon name="arrow" size={17} /></a><span className="contact-aside">NO FORMS. NO FUSS. JUST GOOD CONVERSATIONS.</span></div></section>
      </main>

      <footer className="footer wrap"><a className="brand footer-brand" href="#home"><span className="brand-icon">q<span>.</span></span><span>Qayoom<span className="brand-muted">.dev</span></span></a><span className="footer-center">Designed with intention. Built with curiosity.</span><div className="footer-right"><span>© {new Date().getFullYear()} Qayoom</span><a href="https://github.com/test-Ois" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={17} /></a><a href="#home" aria-label="Back to top">↑</a></div></footer>
    </div>
  )
}
