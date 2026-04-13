import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, ArrowLeft, Shield, Code, Cpu, Camera, GraduationCap } from 'lucide-react';
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
      { name: 'Ujwala.P', role: 'Lead', avatar: '/images/admin_comm/ujwalaP.jpeg' },
      { name: 'Lakshmy S', role: 'Co-Lead', avatar: '/images/admin_comm/Lakshmy S.jpg' },
      { name: 'Sai Vikas', role: 'Member', avatar: '/images/admin_comm/saivikas.jpg' },
      { name: 'Keerthi V', role: 'Member', avatar: '/images/admin_comm/keerthi V.jpeg' },
      { name: 'Sneha K Binu', role: 'Member', avatar: '/images/admin_comm/sneha.jpeg' },
      { name: 'Siri Patil', role: 'Member', avatar: '/images/admin_comm/siripatil.jpeg' },
      { name: 'Amith Sham', role: 'Member', avatar: '/images/admin_comm/Amith Sham.jpg' },
      { name: 'C.Nevesha Tanya', role: 'Member', avatar: '/images/admin_comm/cnevasha.jpeg' },
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
      { name: 'Sankalp Vyas', role: 'Lead', avatar: '/images/coding/Sankalp.jpg' },
      { name: 'Disha Gupta', role: 'Member', avatar: '/images/coding/Disha.jpg.jpeg' },
      { name: 'Karthik G', role: 'Member', avatar: '/images/coding/Karthik G.jpg' },
      { name: 'Jayakrishnan R', role: 'Member', avatar: '/images/coding/Jayakrishnan R.jpg' },
      { name: 'Sniti Jain', role: 'Member', avatar: '/images/coding/Sniti Jain.jpg' },
      { name: 'Manish Omprakash', role: 'Member', avatar: '/images/coding/Manish.jpg' },
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
      { name: 'Tanushri vijay', role: 'Lead', avatar: '/images/tech/Tanushri.jpg' },
      { name: 'Aditya Suhas Satwik', role: 'Member', avatar: '/images/tech/Aditya Satwik.jpg' },
      { name: 'Karan M Bhat', role: 'Member', avatar: '/images/tech/Karan.jpg' },
      { name: 'Kavyesh Gujetiya', role: 'Member', avatar: '/images/tech/kavyesh gujetiya.jpeg' },
      { name: 'Ajay C A', role: 'Member', avatar: '/images/tech/Ajay C A.jpg' },
      { name: 'Shreya Fouzdar', role: 'Member', avatar: '/images/tech/Shreya Fouzdar.jpg' },
      { name: 'Aditya Vijaykumar', role: 'Member', avatar: '/images/tech/AdityaVG.jpg' },
      { name: 'Ananya Manjunath', role: 'Member', avatar: '/images/tech/Ananya Manjunath.jpg' },
      { name: 'Amogh D Pinglay', role: 'Member', avatar: '/images/tech/Amogh Pinglay.jpg' },
      { name: 'Keertana Kavitha', role: 'Member', avatar: '/images/tech/Keertana Kavitha.jpg' },
      { name: 'Madhusudhan M R', role: 'Member', avatar: '/images/tech/Madhusudhan M R.jpg' },
      { name: 'Meher Chaitanya', role: 'Member', avatar: '/images/tech/Meher Chaitanya.jpg' },
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
      { name: 'Yashaswini', role: 'Lead', avatar: '/images/media/Yashaswini.jpg' },
      { name: 'Sameeksha Beram', role: 'Member', avatar: '/images/media/sameeksha.jpg' },
      { name: 'Diddekunta Bhavitha', role: 'Member', avatar: '/images/media/WhatsApp Image 2026-02-04 at 7.54.25 PM.jpeg' },
      { name: 'Srinidhi A U', role: 'Member', avatar: '/images/media/20250701_092625~2.jpg' },
      { name: 'Adit jain', role: 'Member', avatar: '/images/media/adit_jain.jpg' },
      { name: 'Hardik T', role: 'Member', avatar: '/images/media/Hardik T.jpg' },
      { name: 'Jyothsna D.M', role: 'Member', avatar: '/images/media/Jyothsna_102091.jpg' },
      { name: 'Harini Prabagaran', role: 'Member', avatar: '/images/media/Harini.jpg' },
      { name: 'Umang', role: 'Member', avatar: '/images/media/Umang.jpg' },
    ],
  },
  {
    id: 'faculty',
    label: 'LEADERSHIP & FACULTY',
    tag: 'COORDINATORS',
    icon: <GraduationCap size={32} />,
    color: '#FF6B00',
    responsibilities: [
      'Mentorship & Guidance',
      'Strategic Planning',
      'Institutional Support',
      'Project Approvals',
    ],
    members: [
      { name: 'Rounak Vyas', role: 'Lead', avatar: '/images/Heads/Rounak_Vyas.jpg' },
      { name: 'Rohit Soni', role: 'Co-Lead', avatar: '/images/Heads/Rohit Soni.jpg' },
      { name: 'Ms. Smitha B', role: 'Faculty', avatar: '/images/coordinators/WhatsApp Image 2026-01-30 at 3.46.19 PM.jpeg' },
      { name: 'Ms. Meghana A', role: 'Faculty', avatar: '/images/coordinators/WhatsApp Image 2026-01-28 at 1.46.38 PM.jpeg' },
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
  { x: 0, y: -500, rotate: 0 },
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
            <div className="domain-card-glow pulse-glow" style={{ opacity: 0.6 }} />
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

      <motion.div 
        className="flex flex-col items-center justify-center w-full relative z-10"
        animate={{ y: hovered ? -20 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Avatar */}
        <div className={`member-avatar overflow-hidden ${hovered ? 'member-avatar-active' : ''}`}>
          {member.avatar.startsWith('/') ? (
            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full" loading="lazy" />
          ) : (
            <span className="member-avatar-text">{member.avatar}</span>
          )}
        </div>

        {/* Info */}
        <h3 className="member-name" style={{ marginBottom: "2px" }}>{member.name}</h3>
        <p className="member-role" style={{ marginBottom: "4px" }}>{member.role}</p>
      </motion.div>

      {/* Socials — appear on hover */}
      <motion.div
        className="member-socials"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
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

  // On mobile devices, find which card is closest to the viewport center on scroll
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

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

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.set(cards, {
        x: '100vw',
        y: 0,
        rotation: -30,
        scale: 0.8,
        opacity: 0
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      const fanAngles = [-20, -10, 0, 10, 20];
      const fanYOffsets = [30, 10, -5, 10, 30];

      tl.to(cards, {
        x: (i) => `calc(${(2 - (i as number)) * 100}% + ${(2 - (i as number)) * 24}px)`,
        y: (i) => fanYOffsets[i as number] || 0,
        rotation: (i) => fanAngles[i as number] || 0,
        scale: 0.9,
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.out',
      });

      tl.to(cards, {
        x: 0, y: 0, rotation: 0, scale: 1,
        duration: 1.5,
        ease: 'power3.inOut',
      }, "+=0.5");

      tl.to(cards, {
        y: (i) => [-40, 0, 20, 0, -40][i as number] || 0,
        x: (i) => [-60, -20, 0, 20, 60][i as number] || 0,
        rotation: (i) => [-20, -10, 0, 10, 20][i as number] || 0,
        scale: 0.9,
        duration: 2.0,
        ease: 'power2.inOut',
      }, "+=0.5");
    });

    mm.add("(max-width: 1023px)", () => {
      // Individual smoothed scroll-triggered animations for each card on mobile
      cards.forEach((card, i) => {
        gsap.fromTo(card as HTMLElement, 
          { 
            y: 60, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
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
      <div className="text-center mb-8 mt-2 md:mb-12 md:-mt-12 lg:-mt-20 relative z-10 w-full">
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
  const scrollPosRef = useRef(0);

  const handleSelect = useCallback((id: string) => {
    scrollPosRef.current = window.scrollY;
    setActiveDomain(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setActiveDomain(null);
    setTimeout(() => {
      window.scrollTo({ top: scrollPosRef.current, behavior: 'instant' });
    }, 50);
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
                <div className={`member-grid ${activeDomainData.members.length <= 2 ? 'member-grid-centered' : ''}`}>
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
