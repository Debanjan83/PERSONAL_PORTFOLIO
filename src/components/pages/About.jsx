import React from "react"
import { motion } from "framer-motion"

const About = () => {
    return (
        <section
            id="about"
            className="min-h-screen flex items-center justify-center px-6 md:px-20 py-16"
        >
            <motion.div
                className="max-w-4xl text-center md:text-left"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    About <span className="text-purple-600">Me</span>
                </h2>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    I am a <span className="font-semibold text-purple-600">passionate web developer </span>
                    with a strong foundation in designing and building modern, responsive, and dynamic web applications.
                    Over time, I have worked on projects that not only enhanced my technical expertise but also
                    strengthened my problem-solving and analytical thinking abilities.

                    My core skills include <span className="font-semibold">Full Stack Development</span>,
                    where I actively work with <span className="font-semibold">Java, C, and modern web frameworks </span>
                    to craft scalable, user-friendly, and high-performance solutions. Beyond coding,
                    I have a keen interest in <span className="font-semibold">UI/UX design</span>, ensuring that
                    every application I create is not only functional but also intuitive and visually appealing.

                    I thrive in environments where I can collaborate, brainstorm innovative ideas, and
                    continuously explore new technologies. My ultimate goal is to contribute to impactful
                    projects that make a difference, while consistently sharpening my skills
                    and pushing the boundaries of what I can achieve as a developer. 🚀
                </p>


                <motion.div
                    className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p className="text-lg md:text-xl font-medium text-center">
                        🔹 Full Stack Web Developer | 🔹 Java Programmer | 🔹 Web Enthusiast
                    </p>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default About
