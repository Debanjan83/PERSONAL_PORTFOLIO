import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Projects from './components/pages/Projects'
import Contact from './components/pages/Contact'

function App() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white 
                      [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      </div>

      <Navbar />

      <main className="flex-grow">
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
