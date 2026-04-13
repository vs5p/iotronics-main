import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Thermometer, Droplets, Wind } from 'lucide-react';
import useImmersiveScroll from '@/hooks/useImmersiveScroll';
import { isMobile } from '@/lib/isMobile';
import { useInView } from '@/hooks/useInView';

/* ============================================================
   Quote Carousel
   ============================================================ */
const quotes = [
  "NMIT's premier IoT tech society — connecting minds, building the future at the intersection of electronics, software, and intelligence.",
  "Innovation is seeing what everybody has seen and thinking what nobody has thought.",
  "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
  "Empowering students to build the future, one sensor at a time."
];

const QuoteCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = isMobile() ? 8000 : 5000;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % quotes.length), interval);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-24 md:h-20 mt-4 mb-8 flex items-center justify-center max-w-xl mx-auto overflow-hidden relative w-full">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="font-rajdhani text-base md:text-lg text-gray-400 leading-relaxed absolute w-full text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.6 }}
        >
          {quotes[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

/* ============================================================
   IoT Dashboard — live API values + fake sensor pulsing
   ============================================================ */
const useWeatherData = () => {
  const [data, setData] = useState({ temp: 24.5, humidity: 62, wind: 3.5 });
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=13.1007&longitude=77.5963&current=temperature_2m,relative_humidity_2m,wind_speed_10m')
      .then(res => res.json())
      .then(d => {
        if (d.current) {
          setData({
            temp: d.current.temperature_2m,
            humidity: d.current.relative_humidity_2m,
            wind: d.current.wind_speed_10m,
          });
        }
      })
      .catch(console.error);
  }, []);
  return data;
};

const useLivePulsingValue = (liveValue: number, fluctuation: number, interval = 2000, mobileInterval?: number, active = true) => {
  const [val, setVal] = useState(liveValue);
  useEffect(() => {
    // Reset to base live value initially
    setVal(liveValue);
    if (!active) return;
    const delay = isMobile() ? (mobileInterval ?? 5000) : interval;
    const id = setInterval(() => {
      setVal(liveValue + (Math.random() - 0.5) * fluctuation);
    }, delay);
    return () => clearInterval(id);
  }, [liveValue, fluctuation, interval, mobileInterval, active]);
  return val.toFixed(1);
};

const IoTCard = ({
  icon,
  label,
  unit,
  base,
  range,
  color,
  active = true,
}: {
  icon: React.ReactNode;
  label: string;
  unit: string;
  base: number;
  range: number;
  color: string;
  active?: boolean;
}) => {
  const val = useLivePulsingValue(base, range, 1800 + Math.random() * 800, undefined, active);

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
  { name: "Nirmith'26 Ideathon", date: 'Apr 28, 2026, 9:00 AM IST', tag: 'Ideathon', tagColor: '#FFD700', link: 'https://unstop.com/hackathons/ideathon-nirmith26-nirmith26-nitte-meenakshi-institute-of-technology-nmit-yelahanka-1667936', banner: '/images/ideathon-banner.png' },
  { name: "Nirmith'26 Hackathon", date: 'Apr 28, 2026, 5:00 PM IST', tag: 'Hackathon', tagColor: '#00D4FF', link: 'https://unstop.com/hackathons/hackathon-hardware-and-software-nirmith26-nirmith26-nitte-meenakshi-institute-of-technology-nmit-yelahanka-1668493', banner: '/images/hackathon-banner.png' },
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
  const weatherData = useWeatherData();

  // Gate IoT dashboard intervals when Panel 3 is off-screen
  const [iotRef, iotInView] = useInView(0.1);

  return (
    <div className="imm-panels-container">
      {/* ==================== PANEL 1 — HERO ==================== */}
      <section className="imm-panel" id="imm-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* No canvas here — ParticleCanvas.tsx (rendered in Home.tsx) covers the full viewport */}
        <div className="imm-panel-content flex flex-col items-center text-center px-4" style={{ position: 'relative', zIndex: 1 }}>
          {/* Main heading */}
          <h1 className="font-orbitron text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-4 text-white">
            IoT<span className="text-[#FF6B35]">RONICS</span>
          </h1>

          {/* Subtitle with animated underline */}
          <p className="font-rajdhani text-xl sm:text-2xl md:text-3xl text-gray-300 mb-2 tracking-wide">
            Where Hardware Meets{' '}
            <span className="imm-underline-orange relative inline-block">
              Intelligence
            </span>
          </p>

          {/* Animated Quotes */}
          <QuoteCarousel />

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
      <section className="imm-panel" id="imm-projects" ref={iotRef as React.RefObject<HTMLElement>}>
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
              base={weatherData.temp}
              range={0.4}
              color="#FF6B35"
              active={iotInView}
            />
            <IoTCard
              icon={<Droplets size={20} className="text-[#00D4FF]" />}
              label="Humidity"
              unit="%"
              base={weatherData.humidity}
              range={1.2}
              color="#00D4FF"
              active={iotInView}
            />
            <IoTCard
              icon={<Wind size={20} className="text-[#4ADE80]" />}
              label="Wind Speed"
              unit="km/h"
              base={weatherData.wind}
              range={1.5}
              color="#4ADE80"
              active={iotInView}
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
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-white mb-6 sm:mb-12 text-center">
            What's <span className="text-[#FF6B35]">Coming</span>
          </h2>

          {/* Horizontal scrolling event cards */}
          <div className="events-track flex justify-center items-center gap-8 mx-auto w-full max-w-6xl">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                className="imm-event-card flex-shrink-0 relative overflow-hidden"
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Banner background image */}
                {ev.banner && (
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${ev.banner}')`,
                      opacity: 0.3,
                    }}
                  />
                )}

                {/* Decorative top stripe */}
                <div className="h-1 w-full rounded-t-xl relative z-10" style={{ background: ev.tagColor }} />
                <div className="p-6 flex flex-col justify-between h-full relative z-20">
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
                  <div className="flex flex-col gap-3 mt-auto">
                    <p className="font-rajdhani text-gray-400 text-sm">{ev.date}</p>
                    {ev.link && (
                      <a
                        href={ev.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:opacity-80"
                        style={{
                          background: ev.tagColor,
                          color: '#000',
                        }}
                      >
                        <span>Register on</span>
                        <img
                          src="/unstop_logo.svg"
                          alt="Unstop"
                          className="h-4 w-auto"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default ImmersiveHome;
