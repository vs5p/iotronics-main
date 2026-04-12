import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { isMobile } from '../../lib/isMobile';

const MobileOrbPlaceholder = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at 30% 40%, rgba(255,85,0,0.25) 0%, rgba(0,240,255,0.12) 50%, transparent 70%)',
      animation: 'orbPulse 4s ease-in-out infinite',
    }}
  >
    <style>{`
      @keyframes orbPulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.06); opacity: 1; }
      }
    `}</style>
  </div>
);

interface OrbProps {
  position: [number, number, number];
  speed: number;
  color: string;
  radius: number;
}

const Orb = ({ position, speed, color, radius }: OrbProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime * speed) * 0.01;
      meshRef.current.position.y += Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.01;
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const Particles = () => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0001;
      groupRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={i} position={[Math.random() * 8 - 4, Math.random() * 8 - 4, Math.random() * 8 - 4]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color={'#FF5500'} emissive={'#FF5500'} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

export const FloatingOrbs = () => {
  if (isMobile()) return <MobileOrbPlaceholder />;

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 8], fov: 75 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={'#FF5500'} />
      <pointLight position={[-10, -10, 5]} intensity={1} color={'#00F0FF'} />
      
      <Orb position={[-3, 2, -2]} speed={1.5} color={'#FF5500'} radius={0.8} />
      <Orb position={[3, -1, -3]} speed={1.2} color={'#00F0FF'} radius={0.6} />
      <Orb position={[0, 3, -4]} speed={1.8} color={'#FFD700'} radius={0.5} />
      <Orb position={[-2, -2, -5]} speed={2} color={'#FF5500'} radius={0.4} />
      
      <Particles />
    </Canvas>
  );
};
