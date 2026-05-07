import { useState, useEffect } from 'react';
import { ExternalLink, Download, Menu, X } from 'lucide-react';
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaTelegram, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { useReveal, useActiveSection, useScrollProgress } from '../hooks';
import { PROFILE, SKILLS } from '../data/portfolio';
const NAV = ['home', 'about', 'projects', 'contact'];

export default function LuxuryTheme() {
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
          .map((repo) => ({
            id: repo.id,
            title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || "A curated digital experience currently in development.",
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

  return (
    <div className="bg-[#0c0b09] text-[#e8dcc8] min-h-screen" style={{ fontFamily: '"Crimson Pro", serif' }}>
      {/* Gold progress bar */}
      <div className="fixed top-0 left-0 z-50 h-0.5 transition-all duration-200" style={{ width: `${progress * 100}%`, background: 'linear-gradient(90deg, #c9a96e, #f0d080)' }} />

      {/* Decorative side lines */}
      <div className="fixed left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a96e]/20 to-transparent z-10" />
      <div className="fixed right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a96e]/20 to-transparent z-10" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0c0b09]/95 backdrop-blur-sm border-b border-[#c9a96e]/10">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div style={{ fontFamily: '"Playfair Display", serif' }} className="text-[#c9a96e] text-2xl font-bold tracking-widest">
            {PROFILE.name.split(' ').map(n => n[0]).join('')}.
          </div>
          <div className="hidden md:flex items-center gap-10">
            {NAV.map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className={`text-xs uppercase tracking-[0.3em] transition-all duration-300
                  ${active === s ? 'text-[#c9a96e]' : 'text-[#6b6052] hover:text-[#c9a96e]'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={PROFILE.social.whatsapp} target="_blank" rel="noreferrer"
              className="text-[#6b6052] hover:text-[#25d366] transition-colors">
              <FaWhatsapp size={16} />
            </a>
            <a href={PROFILE.social.github} target="_blank" rel="noreferrer"
              className="text-[#6b6052] hover:text-[#c9a96e] transition-colors">
              <FaGithub size={16} />
            </a>
            <button className="md:hidden text-[#c9a96e] ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-[#c9a96e]/10 px-8 py-6 flex flex-col gap-5">
            {NAV.map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className="text-xs uppercase tracking-[0.3em] text-[#6b6052] hover:text-[#c9a96e] transition-colors text-left">
                {s}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center px-8 pt-20">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-5 gap-16 items-center">
          <div className="md:col-span-3 space-y-8">
            <div className="space-y-1">
              <p className="text-[#c9a96e]/60 text-xs uppercase tracking-[0.4em]">Portfolio — {new Date().getFullYear()}</p>
              <h1 style={{ fontFamily: '"Playfair Display", serif' }}
                className="text-6xl md:text-8xl font-bold text-[#e8dcc8] leading-none">
                {PROFILE.name.split(' ')[0]}
                <span className="block text-[#c9a96e] italic">{PROFILE.name.split(' ').slice(1).join(' ')}</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#c9a96e]/40" />
              <p className="text-[#9a8672] text-sm tracking-widest uppercase">{PROFILE.title}</p>
            </div>
            <p className="text-[#6b6052] text-lg leading-relaxed max-w-lg">{PROFILE.tagline}</p>
            <div className="flex gap-5 pt-2">
              <button onClick={() => scrollTo('projects')}
                className="px-8 py-3 text-xs uppercase tracking-[0.3em] text-[#0c0b09] transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #c9a96e, #f0d080)' }}>
                View Work
              </button>
              <a href={PROFILE.resumeUrl} download
                className="px-8 py-3 text-xs uppercase tracking-[0.3em] border border-[#c9a96e]/30 text-[#c9a96e]/70 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300 flex items-center gap-2">
                <Download size={12} /> Resume
              </a>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 border border-[#c9a96e]/20" />
              <div className="absolute -inset-6 border border-[#c9a96e]/10" />
              <div className="w-64 h-80 md:w-72 md:h-96 overflow-hidden relative bg-[#1a1712]">
                <img src={PROFILE.photo} alt={PROFILE.name} className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display='none'; }} />
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ fontFamily: '"Playfair Display", serif', color: '#c9a96e22', fontSize: '5rem', fontWeight: 'bold' }}>
                  {PROFILE.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-8">
        <div ref={aboutRef} className="max-w-6xl mx-auto section-reveal">
          <div className="flex items-center gap-6 mb-16">
            <p className="text-[#c9a96e]/50 text-xs tracking-[0.4em] uppercase">About</p>
            <div className="flex-1 h-px bg-gradient-to-r from-[#c9a96e]/30 to-transparent" />
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div style={{ fontFamily: '"Crimson Pro", serif' }} className="text-[#9a8672] text-lg leading-relaxed space-y-4">
              <p>{PROFILE.bio}</p>
              <p className="text-[#c9a96e]/60 text-sm">✦ {PROFILE.location}</p>
            </div>
            <div className="space-y-6">
              {SKILLS.map(({ category, items }) => (
                <div key={category} className="border-b border-[#c9a96e]/10 pb-4">
                  <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-3">{category}</p>
                  <p className="text-[#6b6052] text-sm">{items.join('  ·  ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 px-8">
        <div ref={projectsRef} className="max-w-6xl mx-auto section-reveal">
          <div className="flex items-center gap-6 mb-16">
            <p className="text-[#c9a96e]/50 text-xs tracking-[0.4em] uppercase">Projects</p>
            <div className="flex-1 h-px bg-gradient-to-r from-[#c9a96e]/30 to-transparent" />
          </div>
          
          {loading ? (
            <div className="py-20 text-center">
              <p style={{ fontFamily: '"Playfair Display", serif' }} className="text-[#c9a96e] text-2xl italic animate-pulse">
                Curating projects...
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {projects.map((p, i) => (
                <div key={p.id}
                  className="group grid md:grid-cols-12 gap-4 py-6 border-b border-[#c9a96e]/10 hover:border-[#c9a96e]/30 transition-all cursor-default items-start">
                  <div className="md:col-span-1 text-[#c9a96e]/30 text-xs pt-1 tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="md:col-span-4">
                    <h3 style={{ fontFamily: '"Playfair Display", serif' }}
                      className="text-xl font-bold text-[#e8dcc8] group-hover:text-[#c9a96e] transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <div className="md:col-span-5 text-[#6b6052] text-sm leading-relaxed">
                    {p.description}
                  </div>
                  <div className="md:col-span-2 flex gap-3 md:justify-end items-start pt-1">
                    <a href={p.github} target="_blank" rel="noreferrer"
                      className="text-[#6b6052] hover:text-[#c9a96e] transition-colors flex items-center gap-1 text-xs uppercase tracking-widest">
                      <FaGithub size={14} /> Code
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer"
                        className="text-[#6b6052] hover:text-[#c9a96e] transition-colors flex items-center gap-1 text-xs uppercase tracking-widest">
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-8">
        <div ref={contactRef} className="max-w-3xl mx-auto text-center section-reveal">
          <div className="mb-6">
            <p className="text-[#c9a96e]/50 text-xs tracking-[0.4em] uppercase mb-4">Contact</p>
            <h2 style={{ fontFamily: '"Playfair Display", serif' }}
              className="text-5xl md:text-6xl font-bold text-[#e8dcc8] leading-tight">
              Let's Create<br /><span className="text-[#c9a96e] italic">Something</span><br />Beautiful
            </h2>
          </div>
          <p className="text-[#6b6052] text-lg leading-relaxed mb-10">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
          <a href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#0c0b09] mb-14"
            style={{ background: 'linear-gradient(135deg, #c9a96e, #f0d080)' }}>
            <Mail size={14} /> Get In Touch
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
                className="group flex flex-col items-center gap-1.5 py-4 border border-[#c9a96e]/10 hover:border-[#c9a96e]/50 transition-all duration-300">
                <span className="text-[#6b6052] group-hover:text-[#c9a96e] transition-colors">{icon}</span>
                <span className="text-[#4a4035] text-xs">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#c9a96e]/10 py-8 text-center text-[#4a4035] text-xs tracking-widest uppercase">
        Crafted with care by {PROFILE.name} — {new Date().getFullYear()}
      </footer>
    </div>
  );
}