import React, { useEffect, useState } from "react"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch("https://api.github.com/users/Debanjan83/repos")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <section
      id="projects"
      className="min-h-screen px-6 md:px-20 py-16"
    >
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        My <span className="text-purple-600">Projects</span>
      </h2>

      <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto text-center mb-12">
        Over the past few years, I’ve worked on a variety of{" "}
        <span className="font-semibold text-purple-600">full-stack applications</span>,
        small utilities, and fun side projects. These projects reflect my journey
        in <span className="font-semibold">Java, Web technologies, and modern frameworks</span>.
        Each repository is a step forward in problem-solving, UI/UX design, and
        building reliable software. 🚀
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((repo) => (
          <div
            key={repo.id}
            className="group block p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition"
          >
            <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-600 mb-2">
              {repo.name.replace(/_/g, " ")}
            </h3>

            {repo.description ? (
              <p className="text-gray-600 mb-4 italic">{repo.description}</p>
            ) : (
              <p className="text-gray-400 mb-4 italic">No description provided</p>
            )}

            <div className="flex gap-4 mt-4">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                <FaGithub className="w-5 h-5 mr-2" />
                GitHub
              </a>

              {repo.homepage && repo.homepage.trim() !== "" && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-md border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition"
                >
                  <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
