import { motion } from 'framer-motion';
import { isMobile } from '../lib/isMobile';

export const AnimatedCubeBackground = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 200"
      style={{ opacity: 0.3 }}
    >
      <defs>
        <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5500" />
          <stop offset="100%" stopColor="#00F0FF" />
        </linearGradient>
      </defs>

      {/* Animated cube */}
      <motion.g
        animate={{ rotateX: 360, rotateY: 360, rotateZ: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear' as const,
        }}
        style={{ transformOrigin: '100px 100px' } as any}
      >
        {/* Cube faces */}
        <rect x="50" y="50" width="100" height="100" fill="url(#cubeGrad)" opacity="0.8" />
        <rect x="55" y="45" width="100" height="100" fill="#FF5500" opacity="0.6" />
        <rect x="45" y="55" width="100" height="100" fill="#00F0FF" opacity="0.6" />
      </motion.g>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 200}
          cy={Math.random() * 200}
          r={2}
          fill="#FF5500"
          opacity={0.5}
          animate={{
            cx: Math.random() * 200,
            cy: Math.random() * 200,
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: 'reverse' as const,
          }}
        />
      ))}
    </svg>
  );
};

export const FloatingOrbsBackground = () => {
  if (isMobile()) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FF5500 0%, transparent 70%)',
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '60%',
            left: '65%',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #00F0FF 0%, transparent 70%)',
            opacity: 0.3,
          }}
        />
      </div>
    );
  }

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" style={{ opacity: 0.15 }}>
      <defs>
        <radialGradient id="orbGrad1">
          <stop offset="0%" stopColor="#FF5500" />
          <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orbGrad2">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Floating Orbs */}
      <motion.circle
        cx="100"
        cy="100"
        r="40"
        fill="url(#orbGrad1)"
        animate={{ cx: [100, 150, 100], cy: [100, 80, 100] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.circle
        cx="300"
        cy="150"
        r="35"
        fill="url(#orbGrad2)"
        animate={{ cx: [300, 250, 300], cy: [150, 180, 150] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.circle
        cx="200"
        cy="300"
        r="30"
        fill="url(#orbGrad1)"
        animate={{ cx: [200, 180, 200], cy: [300, 250, 300] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      {/* Connection lines */}
      <motion.line
        x1="100"
        y1="100"
        x2="300"
        y2="150"
        stroke="#FF5500"
        strokeWidth="0.5"
        opacity="0.3"
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.line
        x1="300"
        y1="150"
        x2="200"
        y2="300"
        stroke="#00F0FF"
        strokeWidth="0.5"
        opacity="0.3"
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </svg>
  );
};

export const NetworkBackground = () => {
  const nodes = [
    { x: 100, y: 100 },
    { x: 300, y: 150 },
    { x: 200, y: 300 },
    { x: 350, y: 300 },
    { x: 50, y: 250 },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" style={{ opacity: 0.1 }}>
      <defs>
        <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5500" />
          <stop offset="100%" stopColor="#00F0FF" />
        </linearGradient>
      </defs>

      {/* Connection lines between nodes */}
      {nodes.map((node, i) =>
        nodes.slice(i + 1).map((nextNode, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={node.x}
            y1={node.y}
            x2={nextNode.x}
            y2={nextNode.y}
            stroke="url(#netGrad)"
            strokeWidth="0.5"
            opacity="0.3"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: (i + j) * 0.2,
            }}
          />
        ))
      )}

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <g key={i}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={4}
            fill="#FF5500"
            animate={{ r: [4, 6, 4], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        </g>
      ))}
    </svg>
  );
};
