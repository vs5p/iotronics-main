import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { isMobile } from '../../lib/isMobile';

const MobileDevicePlaceholder = () => (
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
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Device body */}
      <rect x="15" y="20" width="50" height="35" rx="4" stroke="#FF5500" strokeWidth="2" fill="rgba(255,85,0,0.08)" />
      {/* Antenna */}
      <line x1="58" y1="20" x2="58" y2="10" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="58" cy="8" r="2" fill="#00F0FF" />
      {/* LED dots */}
      <circle cx="28" cy="37" r="3" fill="#FF5500" />
      <circle cx="40" cy="37" r="3" fill="#00F0FF" />
      <circle cx="52" cy="37" r="3" fill="#FFD700" />
    </svg>
  </div>
);

const MobileNetworkPlaceholder = () => (
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
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Central node */}
      <circle cx="40" cy="40" r="8" fill="#FF5500" fillOpacity="0.8" />
      {/* Outer nodes */}
      <circle cx="20" cy="20" r="5" fill="#00F0FF" fillOpacity="0.7" />
      <circle cx="60" cy="20" r="5" fill="#00F0FF" fillOpacity="0.7" />
      <circle cx="20" cy="60" r="5" fill="#00F0FF" fillOpacity="0.7" />
      <circle cx="60" cy="60" r="5" fill="#00F0FF" fillOpacity="0.7" />
      {/* Connecting lines */}
      <line x1="40" y1="40" x2="20" y2="20" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="40" y1="40" x2="60" y2="20" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="40" y1="40" x2="20" y2="60" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="40" y1="40" x2="60" y2="60" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  </div>
);

const IoTDevice = () => {
  const groupRef = useRef<any>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.8, 0.4]} />
        <meshStandardMaterial color={'#FF5500'} metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0.6, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8]} />
        <meshStandardMaterial color={'#00F0FF'} emissive={'#00F0FF'} emissiveIntensity={0.3} />
      </mesh>

      {/* LED indicators */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.3 + i * 0.3, 0.35, 0.21]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={['#FF5500', '#00F0FF', '#FFD700'][i]} emissive={['#FF5500', '#00F0FF', '#FFD700'][i]} emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const ConnectedNodes = () => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.002;
    }
  });

  const positions = [
    [0, 0, 0],
    [2, 1.5, 0],
    [-2, 1.5, 0],
    [1, -1.5, 0],
    [-1, -1.5, 0],
  ];

  return (
    <group ref={groupRef}>
      {/* Central node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={'#FF5500'} emissive={'#FF5500'} emissiveIntensity={0.5} />
      </mesh>

      {/* Connected nodes */}
      {positions.slice(1).map((pos, i) => (
        <group key={i}>
          <mesh position={pos as any}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={'#00F0FF'} emissive={'#00F0FF'} emissiveIntensity={0.4} />
          </mesh>
          {/* Connecting lines */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, pos[0], pos[1], pos[2]])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={'#00F0FF'} linewidth={2} />
          </line>
        </group>
      ))}
    </group>
  );
};

export const IoTDeviceViewer = () => {
  if (isMobile()) return <MobileDevicePlaceholder />;

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
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color={'#FF5500'} />
      <pointLight position={[-5, -5, 5]} intensity={1} color={'#00F0FF'} />
      
      <IoTDevice />
    </Canvas>
  );
};

export const NetworkVisualization = () => {
  if (isMobile()) return <MobileNetworkPlaceholder />;

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color={'#FF5500'} />
      <pointLight position={[-5, -5, 5]} intensity={1} color={'#00F0FF'} />
      
      <ConnectedNodes />
    </Canvas>
  );
};
