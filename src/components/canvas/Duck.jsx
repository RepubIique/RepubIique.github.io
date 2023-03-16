import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Duck = () => {
    const duck = useGLTF('./rubber_duck/scene.gltf')

    return (
        <mesh>
            <hemisphereLight intensity={0.15} groundColor="black" />
            <pointLight intensity={1} />
            <primitive object={duck.scene} />
        </mesh>
    )
}

const DuckCanvas = () => {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [0, 0, 0], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Duck />
            </Suspense>
            <Preload all />
        </Canvas>
    )
}

export default Duck
