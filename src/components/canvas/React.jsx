import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

export const React = ({ isMobile }) => {
    const react = useGLTF('./react_logo/scene.gltf')

    return (
        <mesh>
            <hemisphereLight intensity={0.35} groundColor="black" />
            <pointLight intensity={0.9} />
            <spotLight
                position={[1, 2, 2]}
                angle={0.2}
                penumbra={3}
                intensity={0.8}
            />
            <primitive object={react.scene} scale={1} position={[0, 0, 0]} />
        </mesh>
    )
}

const ReactCanvas = () => {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [0, 0, 10], fov: 30 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <OrbitControls
                autoRotate
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
            <React />

            <Preload all />
        </Canvas>
    )
}

export default ReactCanvas
