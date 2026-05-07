import { useState, useEffect } from 'react';
import { ExternalLink, Download, Menu, X } from 'lucide-react';
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaTelegram, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { useReveal, useActiveSection, useScrollProgress } from '../hooks';
import { PROFILE, SKILLS } from '../data/portfolio';

const NAV = ['home', 'about', 'projects', 'contact'];
const ACCENT = '#ff2d2d';

export default function BrutalistTheme() {
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
            description: repo.description || "RAW DATA. NO DESCRIPTION PROVIDED.",
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

  return (
    <div className="bg-[#f5f5f0] text-[#111] min-h-screen" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
      {/* Bold red progress bar */}
      <div className="fixed top-0 left-0 z-50 h-1 transition-all duration-200" style={{ width: `${progress * 100}%`, background: ACCENT }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#111] border-b-4 border-[#ff2d2d]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="text-white font-black text-xl uppercase tracking-tight" style={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.05em', fontSize: '1.5rem' }}>
            {PROFILE.name.replace(' ', '_')}
          </div>
          <div className="hidden md:flex items-center gap-0">
            {NAV.map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className={`text-xs font-bold uppercase tracking-widest px-5 py-4 transition-all duration-150
                  ${active === s ? 'bg-[#ff2d2d] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href={PROFILE.social.whatsapp} target="_blank" rel="noreferrer"
              className="text-gray-400 hover:text-[#25d366] transition-colors p-1">
              <FaWhatsapp size={17} />
            </a>
            <a href={PROFILE.social.github} target="_blank" rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-1">
              <FaGithub size={17} />
            </a>
            <button className="md:hidden text-white ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 flex flex-col">
            {NAV.map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className={`text-xs font-bold uppercase tracking-widest px-6 py-4 text-left transition-all
                  ${active === s ? 'bg-[#ff2d2d] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                {s}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center pt-14">
        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-0 items-stretch">
          <div className="bg-[#111] p-10 md:p-16 flex flex-col justify-center space-y-6">
            <div className="inline-block bg-[#ff2d2d] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 self-start">
              Available
            </div>
            <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', lineHeight: 0.9, letterSpacing: '0.02em' }}
              className="text-7xl md:text-9xl text-white">
              {PROFILE.name.split(' ').map((word, i) => (
                <span key={i} className={`block ${i % 2 === 1 ? 'text-[#ff2d2d]' : ''}`}>{word}</span>
              ))}
            </h1>
            <div className="border-l-4 border-[#ff2d2d] pl-4">
              <p className="text-gray-400 text-base font-medium">{PROFILE.title}</p>
            </div>
            <p className="text-gray-500 leading-relaxed">{PROFILE.tagline}</p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => scrollTo('projects')}
                className="px-6 py-3 bg-[#ff2d2d] text-white font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-colors">
                Projects
              </button>
              <a href={PROFILE.resumeUrl} download
                className="px-6 py-3 border-2 border-gray-600 text-gray-400 font-bold text-xs uppercase tracking-widest hover:border-white hover:text-white transition-colors flex items-center gap-2">
                <Download size={12}/> Resume
              </a>
            </div>
          </div>
          {/* Photo panel */}
          <div className="relative overflow-hidden min-h-[400px] bg-[#222]">
            <img src={PROFILE.photo} alt={PROFILE.name} className="w-full h-full object-cover object-top absolute inset-0"
              onError={(e) => { e.target.style.display='none'; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="h-1 bg-[#ff2d2d]" />
              <p className="text-white text-xs uppercase tracking-widest mt-2 font-bold">{PROFILE.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6">
        <div ref={aboutRef} className="max-w-6xl mx-auto section-reveal">
          <div className="flex items-end gap-4 mb-12">
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.05em' }}
              className="text-6xl text-[#111]">ABOUT</h2>
            <div className="flex-1 h-1 bg-[#ff2d2d] mb-3" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 text-[#444] leading-relaxed space-y-4">
              <p>{PROFILE.bio}</p>
              <p className="font-bold text-[#111]">📍 {PROFILE.location}</p>
            </div>
            <div className="space-y-4">
              {SKILLS.map(({ category, items }) => (
                <div key={category} className="border-2 border-[#111] p-4">
                  <div className="bg-[#ff2d2d] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 inline-block mb-3">{category}</div>
                  <p className="text-[#555] text-sm">{items.join(' / ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6 bg-[#111]">
        <div ref={projectsRef} className="max-w-6xl mx-auto section-reveal">
          <div className="flex items-end gap-4 mb-12">
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.05em' }}
              className="text-6xl text-white">PROJECTS</h2>
            <div className="flex-1 h-1 bg-[#ff2d2d] mb-3" />
          </div>

          {loading ? (
            <div className="border-4 border-[#ff2d2d] bg-[#ff2d2d]/10 p-10 flex justify-center items-center my-10">
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.05em' }} className="text-4xl text-[#ff2d2d] animate-pulse">
                [ FETCHING_DATA... ]
              </h3>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((p, i) => (
                <div key={p.id}
                  className="group border-2 border-white/10 p-6 hover:border-[#ff2d2d] transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#ff2d2d] font-black text-xs">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex gap-2">
                      <a href={p.github} target="_blank" rel="noreferrer"
                        className="text-xs font-bold uppercase tracking-wider border border-white/20 px-3 py-1.5 text-gray-400 hover:border-[#ff2d2d] hover:text-[#ff2d2d] transition-all flex items-center gap-1.5">
                        <FaGithub size={12}/> Code
                      </a>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer"
                          className="text-xs font-bold uppercase tracking-wider border border-white/20 px-3 py-1.5 text-gray-400 hover:border-[#ff2d2d] hover:text-[#ff2d2d] transition-all flex items-center gap-1.5">
                          <ExternalLink size={11}/> Live
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-white font-black text-xl mb-2 uppercase">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 bg-white/5 text-gray-500 font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6">
        <div ref={contactRef} className="max-w-5xl mx-auto section-reveal">
          <div className="flex items-end gap-4 mb-12">
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.05em' }}
              className="text-6xl text-[#111]">CONTACT</h2>
            <div className="flex-1 h-1 bg-[#ff2d2d] mb-3" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-3xl font-black text-[#111] mb-4 leading-tight">
                Got a project?<br />
                <span className="text-[#ff2d2d]">Let's talk.</span>
              </p>
              <p className="text-[#666] mb-8">I'm open to freelance opportunities, collaborations, and full-time roles. Drop me a message!</p>
              <a href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 bg-[#ff2d2d] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-red-600 transition-colors">
                <Mail size={14}/> {PROFILE.email}
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2">
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
                  className="group border-2 border-[#ddd] hover:border-[#ff2d2d] p-4 flex flex-col items-center gap-2 transition-all duration-200">
                  <span className="text-[#999] group-hover:text-[#ff2d2d] transition-colors">{icon}</span>
                  <span className="text-xs font-bold uppercase text-[#bbb] group-hover:text-[#ff2d2d] tracking-wide">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#111] border-t-4 border-[#ff2d2d] py-6 text-center text-gray-600 text-xs font-bold uppercase tracking-widest">
        {PROFILE.name} — {new Date().getFullYear()}
      </footer>
    </div>
  );
}