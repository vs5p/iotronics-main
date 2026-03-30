import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, ArrowLeft, Shield, Code, Cpu, Camera } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageFooter from '@/components/PageFooter';
import OrangeAtmosphere from '@/components/OrangeAtmosphere';
import { useState, useCallback } from 'react';

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
}: {
  domain: Domain;
  index: number;
  onSelect: (id: string) => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="domain-card-container"
      initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 20,
        mass: 1,
        delay: 0.15 * index,
      }}
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
    </motion.div>
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
              key="deck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-h-[80vh] flex flex-col items-center justify-center px-4"
            >
              {/* Header */}
              <motion.h1
                className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-black text-white text-center mb-3 tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Our <span style={{ color: '#FF6B00' }}>Domains</span>
              </motion.h1>
              <motion.p
                className="font-mono text-sm text-gray-500 text-center mb-12 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hover to explore · Click to meet the team
              </motion.p>

              {/* Domain Cards Grid */}
              <div className="domain-deck-grid">
                {domains.map((domain, i) => (
                  <DomainCard
                    key={domain.id}
                    domain={domain}
                    index={i}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
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
