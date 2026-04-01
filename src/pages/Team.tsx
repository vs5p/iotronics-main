import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, ArrowLeft, Shield, Code, Cpu, Camera } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageFooter from '@/components/PageFooter';
import OrangeAtmosphere from '@/components/OrangeAtmosphere';
import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import JoinTeamSection from '@/components/JoinTeamSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   DATA
   ============================================================ */

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  linkedin?: string;
  github?: string;
}

interface Domain {
  id: string;
  label: string;
  tag: string;
  icon: React.ReactNode;
  color: string;
  responsibilities: string[];
  members: TeamMember[];
}

const domains: Domain[] = [
  {
    id: 'admin',
    label: 'ADMINISTRATION',
    tag: 'ADMIN_DEPT',
    icon: <Shield size={32} />,
    color: '#FF6B00',
    responsibilities: [
      'Event Coordination',
      'Club Management',
      'Budget Planning',
      'Outreach & Partnerships',
      'Member Recruitment',
    ],
    members: [
      { name: 'Alex Chen', role: 'PRESIDENT', avatar: 'AC' },
      { name: 'Sarah Williams', role: 'VICE_PRESIDENT', avatar: 'SW' },
      { name: 'Amy Foster', role: 'EVENTS_COORD', avatar: 'AF' },
      { name: 'Ryan Smith', role: 'LOGISTICS_HEAD', avatar: 'RS' },
    ],
  },
  {
    id: 'coding',
    label: 'CODING',
    tag: 'CODING_DEPT',
    icon: <Code size={32} />,
    color: '#FF6B00',
    responsibilities: [
      'Firmware Development',
      'Full-Stack Web Apps',
      'IoT Protocols & MQTT',
      'Cloud & APIs',
      'Mobile App Dev',
    ],
    members: [
      { name: 'David Kim', role: 'LEAD_DEVELOPER', avatar: 'DK' },
      { name: 'Priya Sharma', role: 'BACKEND_DEV', avatar: 'PS' },
      { name: 'Jake Morrison', role: 'FRONTEND_DEV', avatar: 'JM' },
    ],
  },
  {
    id: 'tech',
    label: 'TECHNICAL',
    tag: 'TECH_DEPT',
    icon: <Cpu size={32} />,
    color: '#FF6B00',
    responsibilities: [
      'Circuit Design',
      'PCB Fabrication',
      'Sensor Integration',
      'Embedded Systems',
      '3D Prototyping',
    ],
    members: [
      { name: 'Raj Patel', role: 'TECH_LEAD', avatar: 'RP' },
      { name: 'Michael Lee', role: 'HW_ENGINEER', avatar: 'ML' },
      { name: 'Emma Johnson', role: 'RESEARCH_HEAD', avatar: 'EJ' },
    ],
  },
  {
    id: 'media',
    label: 'MEDIA',
    tag: 'MEDIA_DEPT',
    icon: <Camera size={32} />,
    color: '#FF6B00',
    responsibilities: [
      'Graphic Design',
      'Social Media Content',
      'Video Production',
      'Photography',
      'Brand Identity',
    ],
    members: [
      { name: 'Lisa Wang', role: 'PR_HEAD', avatar: 'LW' },
      { name: 'Nina Rodriguez', role: 'DESIGN_LEAD', avatar: 'NR' },
      { name: 'Chris Park', role: 'GRAPHIC_DESIGNER', avatar: 'CP' },
      { name: 'Tom Bradley', role: 'SOCIAL_MEDIA', avatar: 'TB' },
    ],
  },
];

/* ============================================================
   EXIT DIRECTIONS for the 3 non-clicked cards
   ============================================================ */
const exitDirections = [
  { x: -600, y: -400, rotate: -25 },
  { x: 600, y: -400, rotate: 25 },
  { x: -600, y: 400, rotate: 15 },
  { x: 600, y: 400, rotate: -15 },
];

/* ============================================================
   DOMAIN CARD (the flippable card)
   ============================================================ */
const DomainCard = ({
  domain,
  index,
  onSelect,
  activeMobileIndex,
}: {
  domain: Domain;
  index: number;
  onSelect: (id: string) => void;
  activeMobileIndex: number | null;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // On touch devices, flip when this card is the active (most centered) one
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;
    setIsFlipped(activeMobileIndex === index);
  }, [activeMobileIndex, index]);

  return (
    <div className="card-anim-wrapper" ref={cardRef}>
      <div
        className="domain-card-container w-full h-full"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => onSelect(domain.id)}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="domain-card-flipper"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ── BACK FACE (idle — black with logo glow) ── */}
          <div className="domain-card-face domain-card-back">
            <motion.div
              className="domain-card-glow"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(255,107,0,0.2), inset 0 0 30px rgba(255,107,0,0.05)',
                  '0 0 60px rgba(255,107,0,0.4), inset 0 0 60px rgba(255,107,0,0.1)',
                  '0 0 30px rgba(255,107,0,0.2), inset 0 0 30px rgba(255,107,0,0.05)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="domain-card-icon">{domain.icon}</div>
            <span className="domain-card-label">{domain.label}</span>
          </div>

          {/* ── FRONT FACE (hover — white with responsibilities) ── */}
          <div className="domain-card-face domain-card-front">
            <span className="domain-card-tag">[{domain.tag}]</span>
            <ul className="domain-card-list">
              {domain.responsibilities.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isFlipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                >
                  <span className="domain-card-bullet">›</span> {item}
                </motion.li>
              ))}
            </ul>
            <span className="domain-card-cta">CLICK TO VIEW TEAM →</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ============================================================
   MEMBER CARD (glassmorphism)
   ============================================================ */
const MemberCard = ({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="member-glass-card"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 22,
        delay: 0.3 + index * 0.1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.03 }}
    >
      {/* Orange diagonal gradient overlay */}
      <div
        className="member-card-gradient"
        style={{ opacity: hovered ? 0.7 : 0.35 }}
      />

      {/* Avatar */}
      <div className={`member-avatar ${hovered ? 'member-avatar-active' : ''}`}>
        <span className="member-avatar-text">{member.avatar}</span>
      </div>

      {/* Info */}
      <h3 className="member-name">{member.name}</h3>
      <p className="member-role">{member.role}</p>

      {/* Socials — appear on hover */}
      <motion.div
        className="member-socials"
        initial={{ opacity: 0, y: 8 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.25 }}
      >
        <a href="#" className="member-social-icon" aria-label="LinkedIn">
          <Linkedin size={16} />
        </a>
        <a href="#" className="member-social-icon" aria-label="GitHub">
          <Github size={16} />
        </a>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   FLOATING PARTICLES (orange + and . symbols)
   ============================================================ */
const DomainParticles = () => {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 14 + 8,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 6,
    char: Math.random() > 0.5 ? '+' : '.',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-mono select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            color: 'rgba(255,107,0,0.15)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.char}
        </motion.span>
      ))}
    </div>
  );
};

/* ============================================================
   GSAP DOMAIN DECK SECTION
   ============================================================ */
const DomainDeckContent = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(null);

  // On touch devices, find which card is closest to the viewport center on scroll
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;

    const handleScroll = () => {
      const cards = document.querySelectorAll<HTMLElement>('.card-anim-wrapper');
      const viewportMid = window.innerHeight / 2;
      let closestIndex: number | null = null;
      let closestDist = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardMid = rect.top + rect.height / 2;
        const dist = Math.abs(cardMid - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      setActiveMobileIndex(closestIndex);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.card-anim-wrapper');
    if (!cards.length) return;

    // Responsive setup
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Phase 1 Setup: Offscreen to the right
      gsap.set(cards, {
        x: '100vw',
        y: 0,
        rotation: -30,
        scale: 0.8,
        opacity: 0
      });

      // Auto-playing timeline (no scroll reaction)
      const tl = gsap.timeline({ delay: 0.2 });

      const fanAngles = [-15, -5, 5, 15];
      const fanYOffsets = [20, 0, 0, 20];

      // The Fan Phase: cluster at the center like playing cards
      tl.to(cards, {
        x: (i) => `calc(${(1.5 - i as number) * 100}% + ${(1.5 - i as number) * 24}px)`,
        y: (i) => fanYOffsets[i],
        rotation: (i) => fanAngles[i],
        scale: 0.9,
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Settle Phase: drop perfectly into the grid positions
      tl.to(cards, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power3.inOut',
      }, "+=0.5");

      // Curve Phase: slow deviation outwards forming an arch
      tl.to(cards, {
        y: (i) => [-60, 20, 20, -60][i as number],
        x: (i) => [-60, -20, 20, 60][i as number],
        rotation: (i) => [-20, -5, 5, 20][i as number],
        scale: 0.9,
        duration: 2.0,
        ease: 'power2.inOut',
      }, "+=0.5");
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile sequence setup (Start offscreen at the bottom)
      gsap.set(cards, { 
        y: '50vh', 
        rotation: (i) => [-20, 20, -15, 15][i],
        scale: 0.8,
        opacity: 0 
      });

      const tl = gsap.timeline({ delay: 0.2 });

      // The Fan Phase (Mobile version): fly in to a messy, slightly zigzagged stack
      tl.to(cards, {
        y: 0,
        x: (i) => [15, -15, 10, -10][i],
        rotation: (i) => [6, -6, 4, -4][i],
        scale: 0.95,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Settle Phase: straighten perfectly into their vertical grid positions
      tl.to(cards, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power3.inOut',
      }, "+=0.3");

      // Curve Phase (Mobile version): a subtle alternating lean
      tl.to(cards, {
        x: (i) => [-15, 15, -10, 10][i as number],
        y: (i) => [-10, 10, 10, -10][i as number],
        rotation: (i) => [-3, 3, -2, 2][i as number],
        scale: 0.96,
        duration: 2.0,
        ease: 'power2.inOut',
      }, "+=0.5");
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <motion.div
      ref={containerRef as any}
      key="deck"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="domains-pin-section w-full"
    >
      <div className="text-center mb-12 relative z-10 w-full">
        <motion.h1
          className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our <span style={{ color: '#FF6B00' }}>Domains</span>
        </motion.h1>
        <motion.p
          className="font-mono text-sm text-gray-500 mt-3 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Hover to explore · Click to meet the team
        </motion.p>
      </div>

      <div ref={gridRef} className="domain-deck-grid w-full relative z-10">
        {domains.map((domain, i) => (
          <DomainCard
            key={domain.id}
            domain={domain}
            index={i}
            onSelect={onSelect}
            activeMobileIndex={activeMobileIndex}
          />
        ))}
      </div>
    </motion.div>
  );
};

/* ============================================================
   JOIN TEAM SECTION
   ============================================================ */
// Extracted to src/components/JoinTeamSection.tsx

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const Team = () => {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const activeDomainData = domains.find((d) => d.id === activeDomain) || null;

  const handleSelect = useCallback((id: string) => {
    setActiveDomain(id);
  }, []);

  const handleBack = useCallback(() => {
    setActiveDomain(null);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <DomainParticles />

      <main className="relative pt-20">
        <AnimatePresence mode="wait">
          {/* ===================== STATE 1: DOMAIN DECK ===================== */}
          {!activeDomain && (
            <motion.div
              key="domain-deck-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DomainDeckContent onSelect={handleSelect} />
              <JoinTeamSection />
            </motion.div>
          )}

          {/* ===================== STATE 2: TEAM EXPLOSION ===================== */}
          {activeDomain && activeDomainData && (
            <motion.div
              key={`team-${activeDomain}`}
              className="min-h-screen relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Expanded domain background */}
              <motion.div
                className="fixed inset-0 z-0"
                style={{
                  background: `radial-gradient(ellipse at 50% 30%, rgba(255,107,0,0.08) 0%, black 70%)`,
                }}
                initial={{ scale: 0, borderRadius: '50%' }}
                animate={{ scale: 1, borderRadius: '0%' }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              />

              {/* Back button */}
              <motion.button
                className="domain-back-btn"
                onClick={handleBack}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={18} />
                <span>Return to Clusters</span>
              </motion.button>

              {/* Department header */}
              <div className="relative z-10 pt-24 pb-8 text-center px-4">
                <motion.div
                  className="inline-flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span style={{ color: '#FF6B00' }}>{activeDomainData.icon}</span>
                </motion.div>
                <motion.h2
                  className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {activeDomainData.label}{' '}
                  <span style={{ color: '#FF6B00' }}>Team</span>
                </motion.h2>
                <motion.p
                  className="font-mono text-xs text-gray-500 mt-2 tracking-widest"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  [{activeDomainData.tag}] · {activeDomainData.members.length} MEMBERS
                </motion.p>
              </div>

              {/* Member cards grid */}
              <div className="relative z-10 px-4 pb-20">
                <div className="member-grid">
                  {activeDomainData.members.map((member, i) => (
                    <MemberCard key={member.name} member={member} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <PageFooter />
    </div>
  );
};

export default Team;
