import { useGLTF } from '@react-three/drei'

export const React3d = ({ isMobile }) => {
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

export default React3d
