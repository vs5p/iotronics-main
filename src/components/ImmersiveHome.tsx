import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Thermometer, Droplets, Activity, ArrowRight } from 'lucide-react';
import useImmersiveScroll from '@/hooks/useImmersiveScroll';

/* ============================================================
   IoT Dashboard — fake pulsing sensor values
   ============================================================ */
const usePulsingValue = (base: number, range: number, interval = 2000) => {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue(base + (Math.random() - 0.5) * range);
    }, interval);
    return () => clearInterval(id);
  }, [base, range, interval]);
  return value.toFixed(1);
};

const IoTCard = ({
  icon,
  label,
  unit,
  base,
  range,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  unit: string;
  base: number;
  range: number;
  color: string;
}) => {
  const val = usePulsingValue(base, range, 1800 + Math.random() * 800);

  return (
    <div className="imm-iot-card group">
      {/* Orange glow border pulse */}
      <div className="imm-iot-card-glow" style={{ borderColor: color }} />
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${color}22`, border: `1px solid ${color}44` }}
        >
          {icon}
        </div>
        <span className="font-rajdhani text-sm text-gray-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className="font-orbitron text-4xl font-bold tabular-nums transition-all duration-500"
          style={{ color }}
        >
          {val}
        </span>
        <span className="font-rajdhani text-lg text-gray-500">{unit}</span>
      </div>
      {/* Fake sparkline bar */}
      <div className="mt-4 flex gap-[3px] items-end h-6">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{ background: `${color}66` }}
            animate={{ height: `${20 + Math.random() * 80}%` }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   Event Cards — horizontal scroll
   ============================================================ */
const events = [
  { name: 'IoT Build Night', date: 'Apr 12, 2025', tag: 'Workshop', tagColor: '#FF6B35' },
  { name: 'HackIoT 2025', date: 'May 3–4, 2025', tag: 'Hackathon', tagColor: '#00D4FF' },
  { name: 'Sensors & AI Talk', date: 'May 18, 2025', tag: 'Talk', tagColor: '#FFD700' },
];

/* ============================================================
   Decorative background layers shared across panels
   ============================================================ */

/** Ambient floating glow orb */
const AmbientOrb = ({
  color,
  size = 500,
  top,
  left,
  delay = 0,
}: {
  color: string;
  size?: number;
  top: string;
  left: string;
  delay?: number;
}) => (
  <div
    className="imm-panel-ambient"
    style={{
      width: size,
      height: size,
      top,
      left,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      animationDelay: `${delay}s`,
    }}
  />
);

/** Top/bottom gradient fade for seamless inter-panel blending */
const PanelFade = ({ position }: { position: 'top' | 'bottom' }) => (
  <div className={position === 'top' ? 'imm-panel-fade-top' : 'imm-panel-fade-bottom'} />
);

/* ============================================================
   Main Component
   ============================================================ */
const ImmersiveHome = () => {
  // Initialize GSAP ScrollTrigger + Lenis
  useImmersiveScroll();

  return (
    <div className="imm-panels-container">
      {/* ==================== PANEL 1 — HERO ==================== */}
      <section className="imm-panel" id="imm-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* No canvas here — ParticleCanvas.tsx (rendered in Home.tsx) covers the full viewport */}
        <div className="imm-panel-content flex flex-col items-center text-center px-4" style={{ position: 'relative', zIndex: 1 }}>
          {/* Main heading */}
          <h1 className="font-orbitron text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-4 text-white">
            IoT<span className="text-[#FF6B35]">RONICS</span>
          </h1>

          {/* Subtitle with animated underline */}
          <p className="font-rajdhani text-xl sm:text-2xl md:text-3xl text-gray-300 mb-2 tracking-wide">
            Where Hardware Meets{' '}
            <span className="imm-underline-orange relative inline-block">
              Intelligence
            </span>
          </p>

          <p className="font-rajdhani text-base text-gray-500 max-w-xl mt-4 mb-12 leading-relaxed">
            NMIT's premier IoT tech society — connecting minds, building the future
            at the intersection of electronics, software, and intelligence.
          </p>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer select-none"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown size={22} />
          </motion.div>
        </div>
      </section>

      {/* ==================== PANEL 2 — ABOUT ==================== */}
      <section className="imm-panel" id="imm-about">
        {/* Rich decorative backgrounds */}
        <PanelFade position="top" />
        <div className="imm-grid-bg" />
        <AmbientOrb color="rgba(255, 107, 53, 0.08)" size={700} top="-15%" left="-20%" delay={0} />
        <AmbientOrb color="rgba(0, 212, 255, 0.05)" size={500} top="50%" left="70%" delay={3} />
        <div className="imm-panel-gradient" style={{ background: 'linear-gradient(180deg, rgba(255, 107, 53, 0.03) 0%, transparent 40%, rgba(0, 212, 255, 0.02) 100%)' }} />
        <PanelFade position="bottom" />

        <div className="imm-panel-content flex flex-col items-center text-center px-4">
          <h2 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-12 leading-tight">
            We Build What
            <br />
            Others <span className="text-[#FF6B35]">Imagine</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { target: 40, suffix: '+', label: 'Members' },
              { target: 12, suffix: '+', label: 'Projects' },
              { target: 6, suffix: '+', label: 'Events' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span
                  className="imm-stat-number font-orbitron text-5xl md:text-6xl font-black text-[#FF6B35]"
                  data-target={stat.target}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </span>
                <span className="font-rajdhani text-lg text-gray-400 uppercase tracking-widest mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PANEL 3 — PROJECTS / IoT DASHBOARD ==================== */}
      <section className="imm-panel" id="imm-projects">
        {/* Rich decorative backgrounds */}
        <PanelFade position="top" />
        <AmbientOrb color="rgba(255, 107, 53, 0.06)" size={600} top="20%" left="-10%" delay={1} />
        <AmbientOrb color="rgba(74, 222, 128, 0.05)" size={450} top="-10%" left="75%" delay={4} />
        <AmbientOrb color="rgba(0, 212, 255, 0.04)" size={350} top="70%" left="50%" delay={2} />
        <div className="imm-panel-gradient" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255, 107, 53, 0.02) 50%, transparent 100%)' }} />
        <PanelFade position="bottom" />

        <div className="imm-panel-content flex flex-col items-center px-4 w-full max-w-5xl">
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
            Live from the <span className="text-[#FF6B35]">Lab</span>
          </h2>
          <p className="font-rajdhani text-gray-400 text-center mb-12 max-w-lg">
            Real-time data streaming from our IoT sensor network
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <IoTCard
              icon={<Thermometer size={20} className="text-[#FF6B35]" />}
              label="Temperature"
              unit="°C"
              base={24.5}
              range={4}
              color="#FF6B35"
            />
            <IoTCard
              icon={<Droplets size={20} className="text-[#00D4FF]" />}
              label="Humidity"
              unit="%"
              base={62}
              range={10}
              color="#00D4FF"
            />
            <IoTCard
              icon={<Activity size={20} className="text-[#4ADE80]" />}
              label="Motion"
              unit="m/s²"
              base={0.8}
              range={1.2}
              color="#4ADE80"
            />
          </div>
        </div>
      </section>

      {/* ==================== PANEL 4 — EVENTS ==================== */}
      <section className="imm-panel events-section" id="imm-events">
        {/* Rich decorative backgrounds */}
        <PanelFade position="top" />
        <AmbientOrb color="rgba(0, 212, 255, 0.06)" size={550} top="10%" left="-15%" delay={2} />
        <AmbientOrb color="rgba(255, 215, 0, 0.05)" size={400} top="60%" left="80%" delay={5} />
        <div className="imm-panel-gradient" style={{ background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.02) 0%, transparent 50%, rgba(255, 215, 0, 0.02) 100%)' }} />
        <PanelFade position="bottom" />

        <div className="imm-panel-content flex flex-col items-center px-4 w-full">
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-white mb-12 text-center">
            What's <span className="text-[#FF6B35]">Coming</span>
          </h2>

          {/* Horizontal scrolling event cards */}
          <div className="events-track">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                className="imm-event-card flex-shrink-0"
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Decorative top stripe */}
                <div className="h-1 w-full rounded-t-xl" style={{ background: ev.tagColor }} />
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-4"
                      style={{
                        color: ev.tagColor,
                        background: `${ev.tagColor}18`,
                        border: `1px solid ${ev.tagColor}44`,
                      }}
                    >
                      {ev.tag}
                    </span>
                    <h3 className="font-orbitron text-xl font-bold text-white mb-2">{ev.name}</h3>
                  </div>
                  <p className="font-rajdhani text-gray-400 text-sm mt-auto">{ev.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PANEL 5 — JOIN CTA ==================== */}
      <section className="imm-panel" id="imm-join">
        {/* Rich decorative backgrounds */}
        <PanelFade position="top" />
        <AmbientOrb color="rgba(255, 107, 53, 0.10)" size={800} top="30%" left="30%" delay={0} />
        <AmbientOrb color="rgba(255, 107, 53, 0.06)" size={500} top="-20%" left="-10%" delay={3} />
        <AmbientOrb color="rgba(255, 215, 0, 0.04)" size={400} top="70%" left="80%" delay={6} />
        <div className="imm-panel-gradient" style={{ background: 'radial-gradient(ellipse at center 60%, rgba(255, 107, 53, 0.04) 0%, transparent 70%)' }} />

        {/* Radial orange glow (original CTA effect) */}
        <div className="imm-cta-glow" />

        <div className="imm-panel-content flex flex-col items-center text-center px-4">
          <h2 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Build
            <br />
            the <span className="text-[#FF6B35]">Future</span>?
          </h2>

          <p className="font-rajdhani text-lg text-gray-400 max-w-lg mb-12">
            Join a community of makers, engineers, and innovators shaping the world
            through the Internet of Things.
          </p>

          <motion.a
            href="/contact"
            className="imm-cta-button group"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="font-orbitron font-bold text-lg tracking-wider">
              Join IoTRONICS
            </span>
            <ArrowRight
              size={20}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default ImmersiveHome;
