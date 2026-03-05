import SpaceBackground from './components/SpaceBackground'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

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
