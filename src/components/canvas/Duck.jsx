import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Duck = ({ isMobile }) => {
    const duck = useGLTF('./rubber_duck/scene.gltf')

    return (
        <mesh>
            <hemisphereLight intensity={0.35} groundColor="black" />
            <pointLight intensity={0.9} />
            <spotLight
                position={[-1000, 500, 10]}
                angle={0.2}
                penumbra={1}
                intensity={0.8}
                castShadow
            />
            <primitive
                object={duck.scene}
                scale={isMobile ? 0.5 : 0.8}
                position={[-10, -200.25, 0]}
                rotation={[-0.12, -0.0, -0.0]}
            />
        </mesh>
    )
}

const DuckCanvas = () => {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width:500px)')
        setIsMobile(mediaQuery.matches)
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches)
        }
        mediaQuery.addEventListener('change', handleMediaQueryChange)
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
        }
    }, [])
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [-400, 400, 600], fov: 40 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Duck isMobile={isMobile} />
            </Suspense>
            <Preload all />
        </Canvas>
    )
}

export default DuckCanvas
