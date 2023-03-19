import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon'
import { OrbitControls, Preload } from '@react-three/drei'

import CanvasLoader from '../Loader'

const PhysicsSimulation = () => {
    function Plane(props) {
        const [ref] = usePlane(() => ({
            rotation: [-Math.PI / 2, 0, 0],
            ...props,
        }))
        return (
            <mesh ref={ref} receiveShadow>
                <planeGeometry args={[300, 300]} />
                <shadowMaterial color="#171717" transparent opacity={0.4} />
            </mesh>
        )
    }

    function Cube(props) {
        const [ref] = useBox(() => ({
            mass: 1,
            position: [0, 5, 0],
            rotation: [0.4, 0.2, 0.5],
            ...props,
        }))
        return (
            <mesh receiveShadow castShadow ref={ref}>
                <boxGeometry />
                <meshLambertMaterial color="hotpink" />
            </mesh>
        )
    }

    return (
        <Canvas
            frameloop="demand"
            shadows
            dpr={[1, 2]}
            gl={{ alpha: false }}
            camera={{ position: [0, -5, 10], fov: 25 }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <color attach="background" args={['lightblue']} />
                <ambientLight />
                <directionalLight
                    position={[10, 10, 10]}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <Physics>
                    <Plane position={[0, -1.5, 3]} />
                    <Cube position={[0.1, 5, 0]} />
                    <Cube position={[0, 10, -1]} />
                    <Cube position={[0, 20, -2]} />
                </Physics>
            </Suspense>
            <Preload all />
        </Canvas>
    )
}

export default PhysicsSimulation
