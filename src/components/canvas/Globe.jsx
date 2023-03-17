import { useGLTF } from '@react-three/drei'

export const Globe3d = ({ isMobile }) => {
    const globe = useGLTF('./globe/scene.gltf')

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
            <primitive object={globe.scene} scale={0.5} position={[0, 0, 0]} />
        </mesh>
    )
}

export default Globe3d
