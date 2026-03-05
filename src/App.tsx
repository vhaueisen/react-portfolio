import Navbar from './components/Navbar'
import SpaceBackground from './components/SpaceBackground'
import About from './sections/About'
import Contact from './sections/Contact'
import Experience from './sections/Experience'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'

function App() {
  return (
    <>
      {/* Fixed 3D starfield background — z-index: 0 */}
      <SpaceBackground />

      {/* Fixed navigation — z-index: 100 */}
      <Navbar />

      {/* Scrollable content — z-index: 10 */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  )
}

export default App
