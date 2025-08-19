import React from "react"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"

const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center 
             gap-12 px-6 md:px-20 py-16 md:py-24"
    >
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Welcome to <br />
          <span className="text-purple-600">Debanjan's Portfolio 🚀</span>
        </motion.h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-xl md:max-w-2xl">
          <TypeAnimation
            sequence={[
              "Full Stack Web Developer",
              1000,
              "Java Programmer",
              1000,
              "Web Enthusiast",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-purple-600 font-semibold"
          />
        </p>

        <motion.div
          className="mt-8 flex flex-wrap justify-center md:justify-start gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-purple-600 text-white font-medium 
                   hover:bg-purple-700 transition duration-300 shadow-lg"
          >
            View Projects
          </a>
          <a
            href="/pdf/Debanjan Pal_Resume.pdf"
            download="Debanjan Pal_Resume.pdf"
            className="px-6 py-3 rounded-full border border-purple-600 text-purple-600 font-medium 
                   hover:bg-purple-600 hover:text-white transition duration-300 shadow-md"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <img
          src="/images/Profile.jpg"
          alt="Profile"
          className="w-72 h-72 md:w-96 md:h-96 rounded-full shadow-2xl 
                 border-4 border-white/50 object-cover hover:scale-110 transition duration-500"
        />
      </motion.div>
    </section>

  )
}

export default Home
