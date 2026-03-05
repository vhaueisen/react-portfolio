import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { COLORS } from '../constants/colors'
import { FloatingShape, NebulaDust } from './three'

/** All geometries and lights that populate the fixed starfield background. */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color={COLORS.indigo} />
      <pointLight position={[-10, -5, -5]} intensity={0.3} color={COLORS.cyan} />
      <Stars radius={100} depth={60} count={4000} factor={3} saturation={0.2} speed={0.5} fade />
      <NebulaDust />
      <FloatingShape
        position={[-8, 3, -8]}
        rotation={[0.5, 0.3, 0]}
        geometry="icosahedron"
        color={COLORS.indigo}
        speed={0.4}
      />
      <FloatingShape
        position={[9, -2, -10]}
        rotation={[0.2, 0.8, 0.3]}
        geometry="octahedron"
        color={COLORS.cyan}
        speed={0.3}
      />
      <FloatingShape
        position={[-5, -5, -6]}
        rotation={[1, 0.2, 0.5]}
        geometry="torus"
        color={COLORS.purple}
        speed={0.5}
      />
      <FloatingShape
        position={[6, 5, -9]}
        rotation={[0.8, 0.5, 0.2]}
        geometry="tetrahedron"
        color={COLORS.cyan}
        speed={0.35}
      />
      <FloatingShape
        position={[0, -7, -12]}
        rotation={[0.3, 1.2, 0.4]}
        geometry="icosahedron"
        color={COLORS.purple}
        speed={0.25}
      />
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </>
  )
}

/** Fixed full-viewport WebGL canvas rendered behind all page content. */
export default function SpaceBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: COLORS.void }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
