import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three'
import { technologies } from '../../constants'
import { useThree } from '@react-three/fiber'

const PhysicsSimulation = () => {
    function Plane(props) {
        const { size } = useThree()
        const [ref] = usePlane(() => ({
            rotation: [-Math.PI / 2, 0, 0],
            ...props,
        }))
        return (
            <mesh ref={ref} receiveShadow>
                <planeGeometry args={[1, 1, 1]} />
                <shadowMaterial color="#171717" transparent opacity={0.4} />
            </mesh>
        )
    }

    const Cube = ({ icon, position }) => {
        const texture = new TextureLoader().load(icon)

        const [ref] = useBox(() => ({
            mass: 8,
            position,
            rotation: [0.4, 0.2, 0.5],
        }))
        return (
            <mesh receiveShadow castShadow scale={1.5} ref={ref}>
                <boxGeometry />
                <meshStandardMaterial
                    roughness={0.5}
                    metalness={0.5}
                    map={texture}
                />
            </mesh>
        )
    }

    return (
        <Canvas
            style={{ height: '300px' }}
            frameloop="always"
            dpr={[1, 2]}
            gl={{ alpha: false }}
            camera={{ position: [0, -10, 10], fov: 45 }}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <color attach="background" args={['#060815']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <directionalLight
                    position={[10, 10, 10]}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <Physics>
                    <Plane position={[0, -1.3, 0]} />
                    {technologies.map((tech, index) => (
                        <Cube
                            key={index}
                            icon={tech.icon}
                            position={[
                                Math.random() * 4 - 2,
                                Math.random() * 800 + 2,
                                Math.random() * 4 - 2,
                            ]}
                        />
                    ))}
                </Physics>
            </Suspense>
        </Canvas>
    )
}

export default PhysicsSimulation
