import React, { Suspense, useState, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { OrbitControls, Preload } from '@react-three/drei'
import { TextureLoader, Raycaster } from 'three'
import { technologies } from '../../constants'

const generateCubePositions = () => {
    return [...technologies, ...technologies, ...technologies].map((tech) => ({
        position: [
            Math.random() * 4 - 2,
            Math.random() * 600 + 2,
            Math.random() * 4 - 2,
        ],
        icon: tech.icon,
        id: tech.id,
    }))
}

const PhysicsSimulation = () => {
    const [cubes, setCubes] = useState([])
    const cubesMemo = useMemo(() => cubes, [cubes])
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
        const texture = useMemo(() => new TextureLoader().load(icon), [icon])
        const [ref] = useBox(() => ({
            mass: 0.2,
            position,
            rotation: [0.4, 0.2, 0.5],
            args: [1, 1, 1],
        }))
        return (
            <mesh receiveShadow castShadow scale={1} ref={ref}>
                <boxGeometry />
                <meshStandardMaterial
                    roughness={0.5}
                    metalness={0.8}
                    map={texture}
                />
            </mesh>
        )
    }

    useEffect(() => {
        const existingCubes = generateCubePositions().map((cube) => (
            <Cube key={cube.id} icon={cube.icon} position={cube.position} />
        ))
        setCubes(existingCubes)
    }, [])

    const handleCanvasClick = (event) => {
        const { offsetX, offsetY } = event.nativeEvent
        const x = (offsetX / event.target.clientWidth) * 2 - 1
        const y = (offsetY / event.target.clientHeight) * 15 + 1
        const z = 0
        const position = [x, y, z]
        const newCube = (
            <Cube
                key={cubes.length + 1}
                icon={
                    technologies[
                        Math.floor(Math.random() * technologies.length)
                    ].icon
                }
                position={position}
            />
        )

        setCubes((cubes) => [...cubes, newCube])
    }

    return (
        <Canvas
            style={{ height: '500px', width: '100%' }}
            frameloop="demand"
            dpr={[1, 2]}
            gl={{ alpha: false }}
            camera={{ position: [0, 20, -5], fov: 30 }}
            onClick={handleCanvasClick}
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
                <Physics gravity={[0, -20, 0]}>
                    <Plane position={[0, -2.5, 0]} />
                    {cubesMemo.map((cube) => cube)}
                </Physics>
            </Suspense>
            <Preload all />
        </Canvas>
    )
}

export default PhysicsSimulation
