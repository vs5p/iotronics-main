import { motion } from 'framer-motion';
import { useMemo } from 'react';

const JoinTeamSection = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const yPercent = (1 - Math.pow(Math.random(), 3)) * 100;
      return {
        id: i,
        x: Math.random() * 100,
        y: yPercent,
        size: Math.random() * 8 + 6,
        type: ['+', '■', '▲', '●'][Math.floor(Math.random() * 4)],
        opacity: Math.random() * 0.4 + 0.1,
      };
    });
  }, []);

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center bg-black overflow-hidden z-20 w-full pt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00] rounded-full blur-[150px] opacity-20 pointer-events-none" />
      
      <div className="text-center z-10 space-y-4 px-4 pb-20">
        <motion.p 
          className="text-[#FF6B00] font-mono text-sm tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Is your big idea ready to go wild?
        </motion.p>
        <motion.h2 
          className="font-orbitron text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
        >
          Team<br />IoTronics
        </motion.h2>
      </div>

      <div 
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent, black 100%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 100%)' 
        }}
      >
        {particles.map(p => (
          <span 
            key={p.id} 
            className="absolute text-white" 
            style={{ 
              left: `${p.x}%`, 
              top: `${p.y}%`, 
              fontSize: `${p.size}px`, 
              opacity: p.opacity 
            }}
          >
            {p.type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JoinTeamSection;
