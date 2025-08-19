import React, { useEffect, useState } from "react"
import { FaGithub, FaWhatsapp, FaBars, FaTimes, FaHome, FaUser, FaProjectDiagram, FaEnvelope } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("home")
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const sections = document.querySelectorAll("section")
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.6 }
        )

        sections.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    const navLinks = [
        { id: "home", label: "Home", icon: <FaHome className="w-5 h-5" /> },
        { id: "about", label: "About", icon: <FaUser className="w-5 h-5" /> },
        { id: "projects", label: "Projects", icon: <FaProjectDiagram className="w-5 h-5" /> },
        { id: "contact", label: "Contact", icon: <FaEnvelope className="w-5 h-5" /> },
    ]

    return (
        <>
            <nav className="sticky top-0 z-50 flex justify-between md:justify-around items-center p-4 
                    bg-purple-300 backdrop-blur-lg border-b border-white/30 text-gray-900 shadow-md">
                <h1 className="text-2xl font-bold"><a href="#home">Debanjan's Portfolio</a></h1>

                <ul className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <li key={link.id} className="flex items-center">
                            <a
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    document
                                        .getElementById(link.id)
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }}
                                className={`relative px-2 py-1 font-medium transition duration-300
                   ${activeSection === link.id
                                        ? "text-purple-600"
                                        : "text-gray-900 hover:text-purple-800"
                                    }
                   after:content-[''] after:block after:h-[2px] after:bg-purple-600 
                   after:transition-all after:duration-300
                   ${activeSection === link.id
                                        ? "after:w-full"
                                        : "after:w-0 hover:after:w-full"
                                    }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:flex gap-3">
                    <a
                        href="https://wa.me/919883031461"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white bg-gradient-to-r from-green-400 to-green-600 
                     hover:scale-105 transition rounded-full text-sm px-5 py-2.5 cursor-pointer"
                    >
                        <FaWhatsapp className="w-4 h-4" />
                        Whatsapp
                    </a>

                    <a
                        href="https://github.com/Debanjan83"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white bg-gradient-to-r from-gray-700 to-black 
                     hover:scale-105 transition rounded-full text-sm px-5 py-2.5 cursor-pointer"
                    >
                        <FaGithub className="w-4 h-4" />
                        Github
                    </a>
                </div>

                <button
                    className="md:hidden text-2xl text-gray-900"
                    onClick={() => setMenuOpen(true)}
                >
                    <FaBars />
                </button>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        />

                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="fixed top-0 left-0 h-full w-72 
                         bg-purple/80 backdrop-blur-xl shadow-lg border-r border-white/30 
                         z-50 flex flex-col p-6"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold">
                                    Debanjan's Portfolio
                                </h2>
                                <button
                                    className="text-2xl"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <ul className="flex flex-col gap-6 text-lg font-medium">
                                {navLinks.map((link) => (
                                    <li key={link.id}>
                                        <a
                                            href={`#${link.id}`}
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-3 hover:text-purple-300 transition"
                                        >
                                            {link.icon}
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-115 flex flex-col gap-4">
                                <a
                                    href="https://wa.me/919883031461"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 text-white bg-gradient-to-r from-green-400 to-green-600 
                           hover:scale-105 transition rounded-full text-sm px-5 py-2.5 cursor-pointer"
                                >
                                    <FaWhatsapp className="w-4 h-4" />
                                    Whatsapp
                                </a>

                                <a
                                    href="https://github.com/Debanjan83"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 text-white bg-gradient-to-r from-gray-700 to-black 
                           hover:scale-105 transition rounded-full text-sm px-5 py-2.5 cursor-pointer"
                                >
                                    <FaGithub className="w-4 h-4" />
                                    Github
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
