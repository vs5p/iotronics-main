import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { isMobile } from '../../lib/isMobile';

const MobileCubePlaceholder = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        width: 64,
        height: 64,
        border: '2px solid #FF5500',
        boxShadow: '0 0 12px rgba(255,85,0,0.5)',
        animation: 'cubeRotate 3s linear infinite',
      }}
    />
    <style>{`
      @keyframes cubeRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const CubeGeometry = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color={'#FF5500'}
        emissive={'#FF5500'}
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
};

const IoTWireframe = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= 0.005;
      meshRef.current.rotation.y -= 0.01;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={'#00F0FF'}
        emissive={'#00F0FF'}
        emissiveIntensity={0.3}
        wireframe={true}
      />
    </mesh>
  );
};

export const RotatingCube = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;
  if (isMobile()) return <MobileCubePlaceholder />;

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 3] }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, 10]} intensity={1} color={'#00F0FF'} />
      <CubeGeometry />
      <IoTWireframe />
    </Canvas>
  );
};
