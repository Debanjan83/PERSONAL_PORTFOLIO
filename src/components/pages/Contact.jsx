import React from "react"
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaWhatsapp,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen px-6 md:px-20 py-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Get in <span className="text-purple-600">Touch</span>
      </h2>

      <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center mb-12">
        Have a question, project idea, or just want to say hi? 💬  
        Fill out the form below and I’ll get back to you as soon as possible!
      </p>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <form
          action="https://formspree.io/f/mzzvlpae"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="Name"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="E-mail"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="Message"
              rows="5"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-purple-600 text-white font-medium 
                       hover:bg-purple-700 transition duration-300 shadow-lg cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-6">
        <a href="mailto:debanjanpal79611@gmail.com" className="text-gray-700 hover:text-red-500 transition">
          <FaEnvelope size={28} />
        </a>
        <a href="https://github.com/Debanjan83" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition">
          <FaGithub size={28} />
        </a>
        <a href="https://linkedin.com/in/debanjan-pal-231976221" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition">
          <FaLinkedin size={28} />
        </a>
        <a href="tel:+919883031461" className="text-gray-700 hover:text-green-600 transition">
          <FaPhone size={28} />
        </a>
        <a href="https://wa.me/919883031461" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-500 transition">
          <FaWhatsapp size={28} />
        </a>
        <a href="https://instagram.com/_._debanjan_d.p_._83" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-500 transition">
          <FaInstagram size={28} />
        </a>
        <a href="https://t.me/Debanjan_83" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-sky-500 transition">
          <FaTelegram size={28} />
        </a>
        <a href="https://x.com/Debanjan_83_dp" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition">
          <FaXTwitter size={28} />
        </a>
      </div>
    </section>
  )
}

export default Contact
