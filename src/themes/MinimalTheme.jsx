import { useState, useEffect } from 'react';
import { ExternalLink, Download, Menu, X, ArrowRight } from 'lucide-react';
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaTelegram, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { useReveal, useActiveSection, useScrollProgress } from '../hooks';
import { PROFILE, SKILLS } from '../data/portfolio';

const NAV = ['home', 'about', 'projects', 'contact'];

export default function MinimalTheme() {
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
            description: repo.description || "Clean, scalable application currently in development.",
            tags: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
            github: repo.html_url,
            live: repo.homepage || null,
            // Minimalist monochromatic palette for project icons
            color: ["#1a1a1a", "#2a2a2a", "#3a3a3a", "#4a4a4a", "#5a5a5a"][index % 5],
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
    <div className="bg-[#fafaf8] text-[#1a1a1a] min-h-screen overflow-x-hidden" style={{ fontFamily: '"DM Sans", sans-serif' }}>
      {/* Progress */}
      <div className="fixed top-0 left-0 z-50 h-0.5 bg-[#1a1a1a] transition-all duration-200" style={{ width: `${progress * 100}%` }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#fafaf8]/95 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tight" style={{ fontFamily: '"Syne", sans-serif' }}>
            {PROFILE.name.split(' ')[0]}<span className="text-[#6b6052]">.</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV.map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className={`text-sm capitalize transition-all duration-200 relative group
                  ${active === s ? 'text-[#1a1a1a] font-semibold' : 'text-[#888] hover:text-[#1a1a1a]'}`}>
                {s}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#1a1a1a] transition-all duration-300
                  ${active === s ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={PROFILE.social.whatsapp} target="_blank" rel="noreferrer"
              className="hidden sm:block text-[#999] hover:text-[#25d366] transition-colors">
              <FaWhatsapp size={17} />
            </a>
            <a href={PROFILE.social.github} target="_blank" rel="noreferrer"
              className="hidden sm:block text-[#999] hover:text-[#1a1a1a] transition-colors">
              <FaGithub size={17} />
            </a>
            <button className="md:hidden ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-black/5 px-6 py-5 flex flex-col gap-4 bg-[#fafaf8]">
            {NAV.map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className="text-sm capitalize text-[#888] hover:text-[#1a1a1a] transition-colors text-left">
                {s}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center px-6 md:px-8 pt-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-6 md:space-y-8 order-2 md:order-1">
              <div className="space-y-3">
                <p className="text-[#999] text-sm uppercase tracking-widest">Available for work</p>
                <h1 style={{ fontFamily: '"Syne", sans-serif' }}
                  className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-tight tracking-tight text-[#1a1a1a]">
                  {PROFILE.name.split(' ')[0]}
                  <br />
                  {PROFILE.name.split(' ').slice(1).join(' ')}
                  <span className="text-[#d4d0c8]">.</span>
                </h1>
              </div>
              <p className="text-[#555] text-lg md:text-xl leading-relaxed max-w-md">{PROFILE.title} — {PROFILE.tagline}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollTo('projects')}
                  className="group px-8 py-3.5 bg-[#1a1a1a] text-white text-sm flex items-center justify-center gap-2 hover:bg-[#333] transition-colors">
                  See My Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href={PROFILE.resumeUrl} download
                  className="px-8 py-3.5 border border-[#ccc] text-[#555] text-sm flex items-center justify-center gap-2 hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors">
                  <Download size={14} /> Resume
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="relative">
                <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-[#e8e6df] relative">
                  <img src={PROFILE.photo} alt={PROFILE.name} className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display='none'; }} />
                </div>
                <div className="absolute -bottom-4 -right-2 md:-right-4 bg-[#1a1a1a] text-white text-xs px-4 py-2 font-medium uppercase tracking-widest">
                  {PROFILE.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28 px-6 md:px-8 bg-white">
        <div ref={aboutRef} className="max-w-6xl mx-auto section-reveal">
          <p className="text-[#ccc] text-xs uppercase tracking-[0.4em] mb-3">About</p>
          <h2 style={{ fontFamily: '"Syne", sans-serif' }} className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-12 text-[#1a1a1a]">
            Who I Am
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2 text-[#555] text-base md:text-lg leading-relaxed space-y-4">
              <p>{PROFILE.bio}</p>
            </div>
            <div className="space-y-5">
              {SKILLS.map(({ category, items }) => (
                <div key={category}>
                  <p className="text-xs uppercase tracking-widest text-[#999] mb-2">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map(s => (
                      <span key={s} className="text-xs px-2.5 py-1 bg-[#f0ede8] text-[#555] rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 md:py-28 px-6 md:px-8">
        <div ref={projectsRef} className="max-w-6xl mx-auto section-reveal">
          <p className="text-[#ccc] text-xs uppercase tracking-[0.4em] mb-3">Work</p>
          <h2 style={{ fontFamily: '"Syne", sans-serif' }} className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-12 text-[#1a1a1a]">
            Selected Projects
          </h2>

          {loading ? (
            <div className="py-16 flex justify-center">
              <span className="text-[#999] text-xs font-medium uppercase tracking-[0.2em] animate-pulse">
                Retrieving projects...
              </span>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div key={p.id}
                  className="group bg-white p-6 rounded-xl border border-black/5 hover:border-black/15 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-white text-lg font-bold"
                    style={{ background: p.color }}>
                    {p.title[0]}
                  </div>
                  <h3 style={{ fontFamily: '"Syne", sans-serif' }}
                    className="font-bold text-lg mb-2 text-[#1a1a1a]">{p.title}</h3>
                  <p className="text-[#888] text-sm leading-relaxed mb-4 line-clamp-3">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 bg-[#f5f3ef] text-[#666] rounded">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-black/5">
                    <a href={p.github} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#999] hover:text-[#1a1a1a] transition-colors font-medium">
                      <FaGithub size={13} /> GitHub
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-[#999] hover:text-[#1a1a1a] transition-colors font-medium">
                        <ExternalLink size={12} /> Live Demo
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
      <section id="contact" className="py-20 md:py-28 px-6 md:px-8 bg-white">
        <div ref={contactRef} className="max-w-4xl mx-auto section-reveal text-center md:text-left">
          <p className="text-[#ccc] text-xs uppercase tracking-[0.4em] mb-3">Contact</p>
          <h2 style={{ fontFamily: '"Syne", sans-serif' }} className="text-3xl md:text-5xl font-extrabold mb-6 text-[#1a1a1a]">
            Get In Touch
          </h2>
          <p className="text-[#888] text-base md:text-lg mb-10 max-w-xl mx-auto md:mx-0">
            Whether you have a project idea, a question, or just want to say hi — I'd love to hear from you. Let's build something great together.
          </p>
          <a href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors mb-10 md:mb-14 w-full md:w-auto">
            <Mail size={15} /> {PROFILE.email}
          </a>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-9 gap-3">
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
                className="group flex flex-col items-center gap-2 py-4 bg-[#fafaf8] hover:bg-[#f0ede8] transition-colors rounded-lg border border-black/5">
                <span className="text-[#999] group-hover:text-[#1a1a1a] transition-colors">{icon}</span>
                <span className="text-[#bbb] text-[10px] md:text-xs">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 py-6 text-center text-[#bbb] text-sm">
        © {new Date().getFullYear()} {PROFILE.name}
      </footer>
    </div>
  );
}