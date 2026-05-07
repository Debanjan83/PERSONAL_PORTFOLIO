import { useState, useEffect } from 'react';

export const PROFILE = {
  name: "Debanjan Pal",
  title: "Full Stack Developer",
  subtitle: "Building digital experiences that matter.",
  tagline: "I craft clean, scalable web applications with a passion for great UX.",
  bio: `I'm a passionate full-stack developer with a love for building clean, 
  performant, and user-centric web applications. With experience across modern 
  JavaScript frameworks, cloud infrastructure, and UI/UX design, I bridge the 
  gap between beautiful design and robust engineering. When I'm not coding, 
  you'll find me playing football, watching sports or experimenting with new technologies.`,
  location: "Asansol, West Bengal, India",
  email: "debanjanpal79611@gmail.com",
  phone: "+91 98830 31461",
  photo: "/profile-pic.png",
  resumeUrl: "/Debanjan_Pal_Resume.pdf",
  social: {
    github: "https://github.com/Debanjan83",
    linkedin: "https://linkedin.com/in/debanjan-pal-231976221",
    twitter: "https://x.com/Debanjan_83_dp",
    instagram: "https://instagram.com/_._debanjan_d.p_._83",
    facebook: "https://facebook.com/debanjan.pal.5492",
    whatsapp: "https://wa.me/919883031461",
    telegram: "https://t.me/Debanjan_83",
  },
};

export const SKILLS = [
  { category: "Languages", items: ["C", "C++", "Java", "HTML", "CSS"] },
  { category: "Frameworks and Technologies", items: ["JSP", "Servlets", "React JS", "Node.js", "Express", "Tailwind CSS", "Bootstrap"] },
  { category: "Databases", items: ["MongoDB", "MySQL"] },
  { category: "Concepts", items: ["Responsive Design", "Object Oriented Programming", "Data Structures & Algorithms"] },
];

const Portfolio = () => {
  // State for dynamic projects
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract GitHub username from your profile link
  const GITHUB_USERNAME = PROFILE.social.github.split('/').pop(); 

  // Fetch GitHub Projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        );
        
        if (!response.ok) throw new Error("Failed to fetch repositories from GitHub");
        
        const data = await response.json();

        // Format the GitHub API data to match your required structure
        const formattedData = data
          .filter(repo => !repo.fork) // Exclude forks
          .map((repo, index) => ({
            id: repo.id,
            title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || "An exciting project currently in development.",
            tags: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
            github: repo.html_url,
            live: repo.homepage || null,
            featured: repo.stargazers_count > 0 || repo.topics.includes("featured"),
            color: ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6"][index % 5],
          }));

        setProjects(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [GITHUB_USERNAME]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* --- HERO SECTION --- */}
      <header className="max-w-5xl mx-auto px-6 py-20 text-center md:text-left md:flex md:items-center md:gap-12">
        <div className="md:w-2/3">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{PROFILE.name}</h1>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{PROFILE.title}</h2>
          <p className="text-xl text-gray-600 mb-6">{PROFILE.tagline}</p>
          <p className="text-gray-600 leading-relaxed mb-8">{PROFILE.bio}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
              View Resume
            </a>
            <a href={PROFILE.social.github} target="_blank" rel="noreferrer" className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
              GitHub
            </a>
            <a href={`mailto:${PROFILE.email}`} className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition">
              Contact Me
            </a>
          </div>
        </div>
        
        {/* Profile Image (Ensure /profile-pic.png is in your public/ folder) */}
        <div className="md:w-1/3 mt-12 md:mt-0 flex justify-center">
          <img 
            src={PROFILE.photo} 
            alt={PROFILE.name} 
            className="w-64 h-64 object-cover rounded-full shadow-2xl border-4 border-white"
          />
        </div>
      </header>

      {/* --- SKILLS SECTION --- */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS.map((skillGroup, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4 text-indigo-600">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DYNAMIC PROJECTS SECTION --- */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Featured Projects</h2>
        <p className="text-center text-gray-600 mb-12">Automatically fetched from my latest GitHub repositories.</p>

        {loading ? (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium">Loading repositories...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-red-50 text-red-600 rounded-lg border border-red-200">
            <p className="font-bold">Oops! Something went wrong.</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full"
              >
                {/* Decorative Top Border using the dynamic color */}
                <div style={{ height: '6px', backgroundColor: project.color }}></div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    {project.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                        ★
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6 flex-grow text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 border-t pt-4 border-gray-100 mt-auto">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition"
                    >
                      View Code →
                    </a>
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm font-bold text-emerald-600 hover:text-emerald-800 transition ml-auto"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>© {new Date().getFullYear()} {PROFILE.name}. Built with Vite & React.</p>
      </footer>
      
    </div>
  );
};

export default Portfolio;