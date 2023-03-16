import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Duck = () => {
    const duck = useGLTF('./rubber_duck/scene.gltf')

    return (
        <mesh>
            <hemisphereLight intensity={0.25} groundColor="black" />
            <pointLight intensity={1} />
            <primitive
                object={duck.scene}
                scale={0.8}
                position={[-500, -200.25, 400]}
                rotation={[-0.01, -0.2, -0.1]}
            />
        </mesh>
    )
}

const DuckCanvas = () => {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [-1000, 600, 800], fov: 40 }}
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

export default DuckCanvas
