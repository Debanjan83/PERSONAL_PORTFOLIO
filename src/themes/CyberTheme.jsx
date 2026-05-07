import { useState, useEffect } from 'react';
import { ExternalLink, Mail, Download, Menu, X } from 'lucide-react';
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaTelegram, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useReveal, useActiveSection, useScrollProgress } from '../hooks';
import { PROFILE, SKILLS } from '../data/portfolio';

const NAV = ['home', 'about', 'projects', 'contact'];

function NavLink({ section, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-sm font-mono uppercase tracking-widest transition-all duration-300 px-2 py-1 group
        ${active === section ? 'text-[#00ff88]' : 'text-gray-400 hover:text-[#00ff88]'}`}
    >
      <span className="mr-1 text-[#00ff88]/50">//</span>{section}
      <span className={`absolute -bottom-1 left-0 h-px bg-[#00ff88] transition-all duration-300
        ${active === section ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </button>
  );
}

export default function CyberTheme() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // --- NEW: Dynamic Projects State ---
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const active = useActiveSection(NAV);
  const progress = useScrollProgress();
  const aboutRef = useReveal();
  const projectsRef = useReveal();
  const contactRef = useReveal();

  // Mouse tracking effect
  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

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
          .map((repo) => ({
            id: repo.id,
            title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || "System architecture in development phase.",
            tags: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
            github: repo.html_url,
            live: repo.homepage || null,
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#050a0e] text-gray-100 min-h-screen font-mono noise-overlay">
      {/* Cursor glow */}
      <div
        className="fixed pointer-events-none z-0 w-96 h-96 rounded-full transition-all duration-100"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 z-50 h-0.5 bg-[#00ff88] transition-all duration-200" style={{ width: `${progress * 100}%` }} />

      {/* Grid background */}
      <div className="fixed inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#00ff88]/10 bg-[#050a0e]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-[#00ff88] font-bold text-lg tracking-wider">
            <span className="text-gray-500">&lt;</span>
            {PROFILE.name.split(' ')[0].toLowerCase()}
            <span className="text-gray-500">/&gt;</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV.map(s => <NavLink key={s} section={s} active={active} onClick={() => scrollTo(s)} />)}
          </div>
          <div className="flex items-center gap-3">
            <a href={PROFILE.social.whatsapp} target="_blank" rel="noreferrer"
              className="text-gray-400 hover:text-[#25d366] transition-colors p-1.5 border border-[#00ff88]/10 rounded hover:border-[#25d366]/40">
              <FaWhatsapp size={16} />
            </a>
            <a href={PROFILE.social.github} target="_blank" rel="noreferrer"
              className="text-gray-400 hover:text-[#00ff88] transition-colors p-1.5 border border-[#00ff88]/10 rounded hover:border-[#00ff88]/40">
              <FaGithub size={16} />
            </a>
            <button className="md:hidden text-[#00ff88] ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#050a0e]/95 border-t border-[#00ff88]/10 px-6 py-4 flex flex-col gap-4">
            {NAV.map(s => <NavLink key={s} section={s} active={active} onClick={() => scrollTo(s)} />)}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative z-10 min-h-screen flex items-center px-6 pt-16">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-[#00ff88]/60 text-sm tracking-widest uppercase animate-fade-in">
              <span className="inline-block w-8 h-px bg-[#00ff88]/40 mr-3 align-middle" />
              Hello, World!
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight">
              <span className="text-gray-500 text-2xl block mb-2">const dev = </span>
              <span className="text-[#00ff88]">{PROFILE.name}</span>
            </h1>
            <div className="text-gray-400 text-xl">
              <span className="text-[#00ff88]/60">// </span>{PROFILE.title}
            </div>
            <p className="text-gray-500 max-w-md leading-relaxed">{PROFILE.tagline}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => scrollTo('projects')}
                className="px-6 py-3 border border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black transition-all duration-300 text-sm uppercase tracking-widest">
                View Projects
              </button>
              <a href={PROFILE.resumeUrl} download
                className="px-6 py-3 border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-300 text-sm uppercase tracking-widest flex items-center gap-2">
                <Download size={14} /> Resume
              </a>
            </div>
          </div>
          {/* Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 border-2 border-[#00ff88]/30 translate-x-4 translate-y-4 rounded" />
              <div className="w-72 h-72 md:w-80 md:h-80 border-2 border-[#00ff88]/50 overflow-hidden relative bg-[#0a1a12]">
                <img src={PROFILE.photo} alt={PROFILE.name} className="w-full h-full object-cover object-center"
                  onError={(e) => { e.target.style.display = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a0e]/50 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#00ff88] text-black text-xs px-3 py-1 font-bold uppercase tracking-widest">
                Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div ref={aboutRef} className="max-w-6xl mx-auto section-reveal">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[#00ff88]/40 text-sm tracking-widest">01.</span>
            <h2 className="text-3xl font-bold text-white">About<span className="text-[#00ff88]">_</span>me</h2>
            <div className="flex-1 h-px bg-[#00ff88]/10" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>{PROFILE.bio}</p>
              <p className="text-[#00ff88]/80">📍 {PROFILE.location}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.map(({ category, items }) => (
                <div key={category} className="border border-[#00ff88]/10 p-4 hover:border-[#00ff88]/30 transition-colors">
                  <div className="text-[#00ff88] text-xs uppercase tracking-widest mb-3">{category}</div>
                  <ul className="space-y-1">
                    {items.map(s => (
                      <li key={s} className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#00ff88] rounded-full inline-block" />
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
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[#00ff88]/40 text-sm tracking-widest">02.</span>
            <h2 className="text-3xl font-bold text-white">Projects<span className="text-[#00ff88]">_</span></h2>
            <div className="flex-1 h-px bg-[#00ff88]/10" />
          </div>

          {/* Conditional Rendering for Loading vs Data */}
          {loading ? (
            <div className="w-full py-12 flex justify-center items-center">
              <span className="text-[#00ff88] animate-pulse uppercase tracking-widest text-sm border border-[#00ff88]/30 px-6 py-3 bg-[#00ff88]/5">
                [ INITIALIZING GITHUB UPLINK... ]
              </span>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p, i) => (
                <div key={p.id}
                  className="group border border-[#00ff88]/10 p-6 hover:border-[#00ff88]/40 transition-all duration-300 relative overflow-hidden"
                  style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-[#00ff88] group-hover:w-full transition-all duration-500" />
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-semibold text-lg group-hover:text-[#00ff88] transition-colors">{p.title}</h3>
                    <div className="flex gap-2">
                      <a href={p.github} target="_blank" rel="noreferrer" title="GitHub"
                        className="text-gray-600 hover:text-[#00ff88] transition-colors p-1">
                        <FaGithub size={16} />
                      </a>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" title="Live Demo"
                          className="text-gray-600 hover:text-[#00ff88] transition-colors p-1">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 border border-[#00ff88]/20 text-[#00ff88]/60">{t}</span>
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
          <div className="flex items-center gap-4 mb-12 justify-center">
            <span className="text-[#00ff88]/40 text-sm tracking-widest">03.</span>
            <h2 className="text-3xl font-bold text-white">Get<span className="text-[#00ff88]">_</span>in<span className="text-[#00ff88]">_</span>touch</h2>
          </div>
          <p className="text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto">
            Have a project in mind, want to collaborate, or just say hi? My inbox is always open.
            Feel free to reach out through any channel below — I'll get back to you promptly!
          </p>
          <a href={`mailto:${PROFILE.email}`}
            className="inline-block px-8 py-4 border-2 border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black transition-all duration-300 text-sm uppercase tracking-widest mb-12">
            {PROFILE.email}
          </a>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center">
            {[
              { icon: <Mail size={20}/>, label: 'Email', href: `mailto:${PROFILE.email}`, color: '#ea4335' },
              { icon: <FaPhone size={18}/>, label: 'Phone', href: `tel:${PROFILE.phone}`, color: '#34a853' },
              { icon: <FaWhatsapp size={20}/>, label: 'WhatsApp', href: PROFILE.social.whatsapp, color: '#25d366' },
              { icon: <FaTelegram size={20}/>, label: 'Telegram', href: PROFILE.social.telegram, color: '#0088cc' },
              { icon: <FaLinkedin size={20}/>, label: 'LinkedIn', href: PROFILE.social.linkedin, color: '#0a66c2' },
              { icon: <FaGithub size={20}/>, label: 'GitHub', href: PROFILE.social.github, color: '#00ff88' },
              { icon: <FaInstagram size={20}/>, label: 'Instagram', href: PROFILE.social.instagram, color: '#e1306c' },
              { icon: <FaXTwitter size={20}/>, label: 'X / Twitter', href: PROFILE.social.twitter, color: '#fff' },
            ].map(({ icon, label, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                className="group flex flex-col items-center gap-2 p-3 border border-[#00ff88]/10 hover:border-[#00ff88]/40 transition-all duration-300 w-full">
                <span className="text-gray-500 group-hover:scale-110 transition-transform" style={{ color: `${color}99` }}>
                  {icon}
                </span>
                <span className="text-gray-600 text-xs">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#00ff88]/10 py-6 text-center text-gray-600 text-xs font-mono">
        <span className="text-[#00ff88]/40">&lt;</span>
        Built with React + Tailwind by {PROFILE.name}
        <span className="text-[#00ff88]/40"> /&gt;</span>
      </footer>
    </div>
  );
}