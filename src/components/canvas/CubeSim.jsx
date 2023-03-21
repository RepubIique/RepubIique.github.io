import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { OrbitControls, Preload } from '@react-three/drei'
import { TextureLoader } from 'three'
import { technologies } from '../../constants'

const PhysicsSimulation = () => {
    function Plane(props) {
        const [ref] = usePlane(() => ({
            rotation: [-Math.PI / 2, 0, 0],
            ...props,
        }))
        return (
            <mesh ref={ref} receiveShadow>
                <planeGeometry args={[20, 20, 20]} />
                <shadowMaterial transparent opacity={0} />
            </mesh>
        )
    }

    const Cube = ({ icon, position }) => {
        const texture = new TextureLoader().load(icon)

        const [ref] = useBox(() => ({
            mass: 0.2,
            position,
            rotation: [0.4, 0.2, 0.5],
            args: [1.5, 1.5, 1.5],
        }))
        return (
            <mesh receiveShadow castShadow scale={1.5} ref={ref}>
                <boxGeometry />
                <meshStandardMaterial
                    roughness={0.5}
                    metalness={0.8}
                    map={texture}
                />
            </mesh>
        )
    }

    return (
        <Canvas
            style={{ height: '500px', width: '100%' }}
            frameloop="demand"
            dpr={[1, 2]}
            gl={{ alpha: false }}
            camera={{ position: [0, 20, -5], fov: 30 }}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <OrbitControls
                    autoRotate={true}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                />
                <color attach="background" args={['#060815']} />
                <ambientLight intensity={3} />
                <pointLight position={[10, 10, 10]} />
                <directionalLight
                    position={[-10, 10, 10]}
                    shadow-mapSize={[250, 250]}
                />
                <Physics>
                    <Plane position={[0, -2.5, 0]} />
                    {[
                        ...technologies,
                        ...technologies,
                        ...technologies,
                        ...technologies,
                        ...technologies,
                        ...technologies,
                        ...technologies,
                        ...technologies,
                        ...technologies,
                        ...technologies,
                        ...technologies,
                        ...technologies,
                    ].map((tech, index) => (
                        <Cube
                            key={index}
                            icon={tech.icon}
                            position={[
                                Math.random() * 4 - 2,
                                Math.random() * 700 + 2,
                                Math.random() * 4 - 2,
                            ]}
                        />
                    ))}
                </Physics>
            </Suspense>
            <Preload all />
        </Canvas>
    )
}

export default PhysicsSimulation
