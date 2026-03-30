import { motion } from 'framer-motion';

type AtmosphereVariant = 'radial-sweep' | 'diagonal-bars' | 'spotlight' | 'horizon-glow' | 'corner-flares';

interface OrangeAtmosphereProps {
  variant: AtmosphereVariant;
}

/**
 * Rich atmospheric orange gradient background effects.
 * Each page gets a unique pattern to avoid visual monotony.
 */
const OrangeAtmosphere = ({ variant }: OrangeAtmosphereProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {variant === 'radial-sweep' && <RadialSweep />}
      {variant === 'diagonal-bars' && <DiagonalBars />}
      {variant === 'spotlight' && <Spotlight />}
      {variant === 'horizon-glow' && <HorizonGlow />}
      {variant === 'corner-flares' && <CornerFlares />}
    </div>
  );
};

/* ─── About Page: radial sweep ─── */
const RadialSweep = () => (
  <>
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 800,
        height: 800,
        top: '-15%',
        right: '-10%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 600,
        height: 600,
        bottom: '-10%',
        left: '-8%',
        background: 'radial-gradient(circle, rgba(255,140,0,0.06) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }}
      animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 400,
        height: 400,
        top: '40%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }}
      animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
    />
  </>
);

/* ─── Projects Page: diagonal bars ─── */
const DiagonalBars = () => (
  <>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          width: '200%',
          height: 120 + i * 40,
          top: `${15 + i * 30}%`,
          left: '-50%',
          background: `linear-gradient(135deg, transparent 30%, rgba(255,107,0,${0.03 + i * 0.01}) 50%, transparent 70%)`,
          filter: 'blur(40px)',
          transform: `rotate(${-8 + i * 4}deg)`,
        }}
        animate={{ opacity: [0.3, 0.6, 0.3], x: [-30, 30, -30] }}
        transition={{ duration: 12 + i * 3, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
      />
    ))}
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 500,
        height: 500,
        bottom: '-5%',
        right: '-5%',
        background: 'radial-gradient(circle, rgba(255,140,0,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  </>
);

/* ─── Achievements Page: spotlight ─── */
const Spotlight = () => (
  <>
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 700,
        height: 700,
        top: '10%',
        left: '20%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 60%)',
        filter: 'blur(80px)',
      }}
      animate={{
        x: [0, 200, -100, 0],
        y: [0, -50, 100, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 500,
        height: 500,
        bottom: '5%',
        right: '10%',
        background: 'radial-gradient(circle, rgba(255,140,0,0.06) 0%, transparent 65%)',
        filter: 'blur(70px)',
      }}
      animate={{
        x: [0, -150, 80, 0],
        y: [0, 60, -40, 0],
      }}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
    />
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(180deg, rgba(255,107,0,0.02) 0%, transparent 30%, transparent 70%, rgba(255,107,0,0.02) 100%)',
      }}
    />
  </>
);

/* ─── Events Page: horizon glow ─── */
const HorizonGlow = () => (
  <>
    <motion.div
      className="absolute"
      style={{
        width: '120%',
        height: 300,
        top: '45%',
        left: '-10%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(255,107,0,0.06) 40%, rgba(255,140,0,0.08) 50%, rgba(255,107,0,0.06) 60%, transparent 100%)',
        filter: 'blur(50px)',
      }}
      animate={{ opacity: [0.4, 0.8, 0.4], scaleY: [0.9, 1.1, 0.9] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 400,
        height: 400,
        top: '-10%',
        right: '5%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
      animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 350,
        height: 350,
        bottom: '-5%',
        left: '10%',
        background: 'radial-gradient(circle, rgba(255,140,0,0.04) 0%, transparent 70%)',
        filter: 'blur(55px)',
      }}
      animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
    />
  </>
);

/* ─── Contact Page: corner flares ─── */
const CornerFlares = () => (
  <>
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 600,
        height: 600,
        top: '-15%',
        left: '-10%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 65%)',
        filter: 'blur(70px)',
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 550,
        height: 550,
        bottom: '-12%',
        right: '-8%',
        background: 'radial-gradient(circle, rgba(255,140,0,0.06) 0%, transparent 65%)',
        filter: 'blur(65px)',
      }}
      animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
    />
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(255,107,0,0.02) 0%, transparent 60%)',
      }}
    />
  </>
);

export default OrangeAtmosphere;
