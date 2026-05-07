import { useState, useEffect } from 'react';
import { ExternalLink, Download, Menu, X, Mail } from 'lucide-react';
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaTelegram, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useReveal, useActiveSection, useScrollProgress } from '../hooks';
import { PROFILE, SKILLS } from '../data/portfolio';

const NAV = ['home', 'about', 'projects', 'contact'];

export default function AuroraTheme() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // --- NEW: Dynamic Projects State ---
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const active = useActiveSection(NAV);
  const progress = useScrollProgress();
  const aboutRef = useReveal();
  const projectsRef = useReveal();
  const contactRef = useReveal();
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  // --- NEW: GitHub Fetch Effect ---
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/Debanjan83/repos?sort=updated&per_page=6`
        );
        
        if (!response.ok) throw new Error("Failed to fetch repositories");
        
        const data = await response.json();

        const formattedData = data
          .filter(repo => !repo.fork)
          .map((repo, index) => ({
            id: repo.id,
            title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || "Building digital experiences that matter.",
            tags: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
            github: repo.html_url,
            live: repo.homepage || null,
            // Custom Aurora palette colors mapped to projects
            color: ["#8b5cf6", "#06b6d4", "#ec4899", "#a78bfa", "#22d3ee"][index % 5],
          }));

        setProjects(formattedData);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: '"DM Sans", sans-serif', background: '#070b14' }}>
      {/* Aurora background blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vh] rounded-full opacity-20 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-[30%] right-[-15%] w-[60vw] h-[60vh] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', filter: 'blur(80px)', animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vh] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)', filter: 'blur(80px)', animation: 'float 10s ease-in-out infinite reverse' }} />
      </div>

      {/* Progress */}
      <div className="fixed top-0 left-0 z-50 h-0.5 transition-all duration-200"
        style={{ width: `${progress * 100}%`, background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899)' }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40" style={{ background: 'rgba(7,11,20,0.7)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-lg" style={{ fontFamily: '"Syne", sans-serif', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {PROFILE.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className={`text-sm px-4 py-2 rounded-lg capitalize transition-all duration-200
                  ${active === s ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                style={active === s ? { background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)' } : {}}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={PROFILE.social.whatsapp} target="_blank" rel="noreferrer"
              className="text-white/40 hover:text-[#25d366] transition-colors">
              <FaWhatsapp size={17} />
            </a>
            <a href={PROFILE.social.github} target="_blank" rel="noreferrer"
              className="text-white/40 hover:text-white transition-colors">
              <FaGithub size={17} />
            </a>
            <button className="md:hidden text-white/70 ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 px-6 py-5 flex flex-col gap-3">
            {NAV.map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className="text-sm capitalize text-white/50 hover:text-white transition-colors text-left py-1">
                {s}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative z-10 min-h-screen flex items-center px-6 pt-16">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-white/60"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Available for opportunities
            </div>
            <h1 style={{ fontFamily: '"Syne", sans-serif', lineHeight: 1.05 }}
              className="text-5xl md:text-7xl font-extrabold">
              Hi, I'm{' '}
              <span style={{ background: 'linear-gradient(135deg, #a78bfa, #22d3ee, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {PROFILE.name}
              </span>
            </h1>
            <p className="text-white/50 text-xl">{PROFILE.title}</p>
            <p className="text-white/40 leading-relaxed max-w-lg">{PROFILE.tagline}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button onClick={() => scrollTo('projects')}
                className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
                View Projects
              </button>
              <a href={PROFILE.resumeUrl} download
                className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white/60 hover:text-white flex items-center gap-2 transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Download size={14}/> Resume
              </a>
            </div>
          </div>
          {/* Photo with aurora ring */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full scale-110 opacity-50 animate-spin-slow"
                style={{ background: 'conic-gradient(from 0deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6)', filter: 'blur(12px)' }} />
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden ring-2 ring-white/10 bg-[#1a1028]">
                <img src={PROFILE.photo} alt={PROFILE.name} className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display='none'; }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div ref={aboutRef} className="max-w-6xl mx-auto section-reveal">
          <h2 style={{ fontFamily: '"Syne", sans-serif' }}
            className="text-4xl font-extrabold mb-12">
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              About Me
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-white/50 leading-relaxed space-y-4">
              <p>{PROFILE.bio}</p>
              <p className="text-white/30">📍 {PROFILE.location}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.map(({ category, items }) => (
                <div key={category} className="p-5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-xs uppercase tracking-widest mb-3"
                    style={{ background: 'linear-gradient(135deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {category}
                  </p>
                  <ul className="space-y-1.5">
                    {items.map(s => (
                      <li key={s} className="text-white/40 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-violet-400/50" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative z-10 py-24 px-6">
        <div ref={projectsRef} className="max-w-6xl mx-auto section-reveal">
          <h2 style={{ fontFamily: '"Syne", sans-serif' }}
            className="text-4xl font-extrabold mb-12">
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Projects
            </span>
          </h2>

          {loading ? (
            <div className="w-full py-16 flex justify-center items-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#a78bfa] border-t-transparent animate-spin" />
                <span className="text-white/50 text-sm tracking-widest uppercase">Loading Repositories...</span>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {projects.map((p) => (
                <div key={p.id}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                      style={{ background: `${p.color}30`, border: `1px solid ${p.color}50`, color: p.color }}>
                      {p.title[0]}
                    </div>
                    <div className="flex gap-2">
                      <a href={p.github} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors px-3 py-1.5 rounded-lg"
                        style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                        <FaGithub size={12}/> Code
                      </a>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors px-3 py-1.5 rounded-lg"
                          style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                          <ExternalLink size={11}/> Live
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 style={{ fontFamily: '"Syne", sans-serif' }}
                    className="text-white font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-0.5 rounded-full text-white/40"
                        style={{ background: 'rgba(255,255,255,0.05)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div ref={contactRef} className="max-w-3xl mx-auto text-center section-reveal">
          <h2 style={{ fontFamily: '"Syne", sans-serif' }} className="text-5xl md:text-6xl font-extrabold mb-5">
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #22d3ee, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Get In Touch
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
            Have an idea, a project, or just want to connect? My inbox is always open. Let's make something amazing together.
          </p>
          <a href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white mb-12 transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
            <Mail size={16}/> {PROFILE.email}
          </a>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
            {[
              { icon: <Mail size={18}/>, label: 'Email', href: `mailto:${PROFILE.email}` },
              { icon: <FaPhone size={16}/>, label: 'Phone', href: `tel:${PROFILE.phone}` },
              { icon: <FaWhatsapp size={18}/>, label: 'WhatsApp', href: PROFILE.social.whatsapp },
              { icon: <FaTelegram size={18}/>, label: 'Telegram', href: PROFILE.social.telegram },
              { icon: <FaLinkedin size={18}/>, label: 'LinkedIn', href: PROFILE.social.linkedin },
              { icon: <FaGithub size={18}/>, label: 'GitHub', href: PROFILE.social.github },
              { icon: <FaInstagram size={18}/>, label: 'Instagram', href: PROFILE.social.instagram },
              { icon: <FaXTwitter size={18}/>, label: 'X', href: PROFILE.social.twitter },
              { icon: <FaFacebook size={18}/>, label: 'Facebook', href: PROFILE.social.facebook },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                className="group flex flex-col items-center gap-2 py-4 rounded-xl transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="text-white/30 group-hover:text-white/70 transition-colors">{icon}</span>
                <span className="text-white/20 text-xs">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-6 text-center text-white/20 text-xs">
        Built with React + Tailwind · {PROFILE.name} © {new Date().getFullYear()}
      </footer>
    </div>
  );
}