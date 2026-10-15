import { useEffect, useMemo, useRef, useState } from 'react'
import { directory, categories } from './data/projects.js'

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const shapes = {
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    external: <><path d="M14 3h7v7" /><path d="M10 14 21 3" /><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    folder: <><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M3 10h18" /></>,
    tool: <><path d="M14.7 6.3a5 5 0 0 0-6.6 6.6L3 18l3 3 5.1-5.1a5 5 0 0 0 6.6-6.6L14 13l-3-3z" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  }
  return <svg {...common}>{shapes[name] || shapes.globe}</svg>
}

function Brand({ compact = false }) {
  return <a className={compact ? 'brand brand-compact' : 'brand'} href="#home" aria-label="Qayoom.dev home"><span className="brand-symbol"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 5.5a14.5 14.5 0 1 0 9.4 25.5L34 35" /><path d="M26.2 20a6.2 6.2 0 1 1-12.4 0 6.2 6.2 0 0 1 12.4 0Z" /></svg></span><span className="brand-word">qayoom<span>.dev</span></span></a>
}

function WelcomeIntro({ onEnter }) {
  return <section className="intro-screen" aria-label="Welcome to Qayoom.dev">
    <div className="intro-noise" /><div className="intro-grid" />
    <div className="intro-star star-a">✳</div><div className="intro-star star-b">✦</div><div className="intro-star star-c">·</div><div className="intro-star star-d">✳</div>
    <div className="intro-content">
      <div className="intro-logo-wrap"><div className="intro-logo"><svg viewBox="0 0 80 80" aria-hidden="true"><path d="M40 9a31 31 0 1 0 20 54.7L70 74" /><path d="M53.2 40a13.2 13.2 0 1 1-26.4 0 13.2 13.2 0 0 1 26.4 0Z" /></svg></div><span className="logo-ping" /></div>
      <p className="intro-kicker"><span /> YOUR LINKS. YOUR WORLD.</p>
      <h1>Welcome to<br /><span>my digital space.</span></h1>
      <p className="intro-description">A little corner of the internet where all my websites, projects, tools, and links come together.</p>
      <button className="enter-button" onClick={onEnter}><span>Enter Qayoom.dev</span><Icon name="arrow" size={18} /></button>
      <p className="intro-foot">TAKE A LOOK AROUND <span>✳</span></p>
    </div>
    <div className="intro-bottom"><Brand compact /><span>PERSONAL LINK HUB <i>·</i> EST. 2026</span></div>
  </section>
}

function LinkCard({ item, index }) {
  return <a className="link-card" href={item.url} target="_blank" rel="noreferrer" style={{ '--card-delay': `${index * 55}ms` }}>
    <span className={`link-icon icon-${item.tone || 'lime'}`}>{item.mark ? <span className="link-mark">{item.mark}</span> : <Icon name={item.icon || 'globe'} size={21} />}</span>
    <span className="link-copy"><span className="link-title">{item.title}{item.badge && <span className="link-badge">{item.badge}</span>}</span><span className="link-description">{item.description}</span><span className="link-kind">{item.kind}</span></span>
    <span className="link-arrow"><Icon name="external" size={16} /></span>
  </a>
}

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [activeCategory, setActiveCategory] = useState('All links')
  const [query, setQuery] = useState('')
  const [showIntro, setShowIntro] = useState(() => {
    try { return window.localStorage.getItem('qayoom-intro-seen') !== 'yes' } catch { return true }
  })
  const searchRef = useRef(null)

  useEffect(() => {
    const handleShortcut = event => {
      if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName) && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        searchRef.current?.focus()
      }
      if (event.key === 'Escape' && document.activeElement === searchRef.current) setQuery('')
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  const enterSite = () => {
    try { window.localStorage.setItem('qayoom-intro-seen', 'yes') } catch {}
    setShowIntro(false)
  }
  const replayIntro = () => {
    setShowIntro(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const visibleLinks = useMemo(() => directory.filter(item => {
    const categoryMatch = activeCategory === 'All links' || item.category === activeCategory
    const q = query.trim().toLowerCase()
    const searchMatch = !q || `${item.title} ${item.description} ${item.category} ${item.kind} ${(item.tags || []).join(' ')}`.toLowerCase().includes(q)
    return categoryMatch && searchMatch
  }), [activeCategory, query])

  const countFor = category => directory.filter(item => category === 'All links' || item.category === category).length

  return <div className={`site-shell theme-${theme}`}>
    {showIntro && <WelcomeIntro onEnter={enterSite} />}
    <div className={`main-site ${showIntro ? 'main-hidden' : 'main-visible'}`} id="home">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar wrap">
        <Brand />
        <div className="topbar-right"><span className="availability"><i /> DIGITAL SPACE ONLINE</span><button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} /></button><a className="github-shortcut" href="https://github.com/test-Ois" target="_blank" rel="noreferrer" aria-label="GitHub profile"><Icon name="github" size={18} /></a></div>
      </header>
      <main className="wrap hub-main">
        <section className="hub-heading">
          <div className="heading-orbit"><div className="orbit-core"><Brand compact /></div><span className="orbit-dot orbit-dot-one" /><span className="orbit-dot orbit-dot-two" /></div>
          <div className="hub-heading-copy"><p className="eyebrow"><Icon name="spark" size={14} /> MY LITTLE CORNER OF THE INTERNET</p><h1>Everything, <span>in one place.</span></h1><p className="hub-subtitle">Websites I've made, code I've shared, tools I use, and places to find me.</p></div>
        </section>
        <section className="search-section" aria-label="Search links"><label className="hub-search"><Icon name="search" size={21} /><input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a website, repository, tool..." aria-label="Search all links" /><kbd>/</kbd>{query && <button className="clear-search" onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label><span className="search-hint">TIP: SEARCH BY NAME OR TYPE</span></section>
        <nav className="category-nav" aria-label="Link categories">{categories.map(category => <button key={category} className={activeCategory === category ? 'category-tab active' : 'category-tab'} onClick={() => setActiveCategory(category)}><Icon name={category === 'All links' ? 'spark' : category === 'Websites' ? 'globe' : category === 'Repositories' ? 'folder' : category === 'Tools' ? 'tool' : 'heart'} size={16} /><span>{category}</span><small>{countFor(category)}</small></button>)}</nav>
        <section className="directory-section">
          <div className="directory-heading"><div><p className="eyebrow">THE DIRECTORY</p><h2>{activeCategory === 'All links' ? 'Your map around here.' : activeCategory + '.'}</h2></div><span className="result-count">{visibleLinks.length.toString().padStart(2, '0')} LINKS FOUND</span></div>
          {visibleLinks.length ? <div className="link-grid">{visibleLinks.map((item, index) => <LinkCard key={`${item.category}-${item.title}`} item={item} index={index} />)}</div> : <div className="empty-state"><Icon name="search" size={25} /><strong>No links found.</strong><span>Try another search or choose a different category.</span><button onClick={() => { setQuery(''); setActiveCategory('All links') }}>Show all links <Icon name="arrow" size={15} /></button></div>}
        </section>
        <section className="small-note"><span className="note-icon"><Icon name="spark" size={18} /></span><p><strong>One place. Many little worlds.</strong><span>This space will keep growing as new links and projects come to life.</span></p><a href="https://github.com/test-Ois?tab=repositories" target="_blank" rel="noreferrer">Explore GitHub <Icon name="arrow" size={15} /></a></section>
      </main>
      <footer className="footer wrap"><Brand compact /><span className="footer-message">A personal corner of the internet <i>✳</i></span><div className="footer-actions"><button onClick={replayIntro}>Replay intro ↗</button><span>© {new Date().getFullYear()} Qayoom</span></div></footer>
    </div>
  </div>
}
