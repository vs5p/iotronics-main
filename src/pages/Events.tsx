import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import OrangeAtmosphere from "@/components/OrangeAtmosphere";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const eventData = [
  {
    id: 1,
    title: "Nirmith'26 Ideathon",
    shortDesc: "National-level Ideathon to bring together innovators from across India",
    date: "28th April 2026",
    time: "9:15 AM - 5:00 PM",
    banner: "/images/events/ideathon.webp",
    tagColor: "#FFD700",
    tag: "Ideathon",
    unstopLink: "https://unstop.com/hackathons/ideathon-nirmith26-nirmith26-nitte-meenakshi-institute-of-technology-nmit-yelahanka-1667936",
    fullDetails: {
      overview: "Nirmith 2026 is a national-level Ideathon hosted by the IoTronics Club at NMIT Bangalore, designed to bring together student innovators from across India to conceptualize and present impactful solutions to real-world problems.",
      eligibility: [
        "Open to all undergraduate students (1st to 4th year) across India",
        "Students from all branches and disciplines are eligible",
        "Inter-college teams are allowed",
        "Inter-specialization teams are allowed (e.g., engineering + management)",
        "Team size: 3–4 members per team",
      ],
      format: [
        {
          title: "Round 1: On-Spot Ideation & Submission",
          details: [
            "Teams will be given access to all themes at the start of the event",
            "10 minutes to select a theme and register it via Google Form",
            "1:30 hrs to identify problem, develop solution, and prepare PPT",
            "Teams must submit PPT within the given time",
            "Top ~15 teams will be selected for the final round",
          ],
        },
        {
          title: "Round 2: Final Presentation",
          details: [
            "Shortlisted teams present ideas to a panel of judges",
            "Presentation time: 5–7 minutes per team",
            "Q&A: 2–3 minutes per team",
          ],
        },
      ],
      evaluation: [
        "Problem clarity and relevance",
        "Innovation and originality",
        "Technical feasibility",
        "Business viability and scalability",
        "Clarity of presentation",
      ],
      rules: [
        "Teams must adhere strictly to the given time limits",
        "Late submissions will not be accepted",
        "Plagiarism or copying ideas will lead to disqualification",
        "Teams must work only within the allocated time during Round 1",
        "The decision of judges will be final and binding",
        "Each team must submit only one final solution",
      ],
    },
  },
  {
    id: 2,
    title: "Nirmith'26 Hackathon",
    shortDesc: "National-level execution-focused competition with Hardware & Software tracks",
    date: "28th April 2026",
    time: "5:00 PM onwards",
    banner: "/images/events/hackathon.webp",
    tagColor: "#00D4FF",
    tag: "Hackathon",
    unstopLink: "https://unstop.com/hackathons/hackathon-hardware-and-software-nirmith26-nirmith26-nitte-meenakshi-institute-of-technology-nmit-yelahanka-1668493",
    fullDetails: {
      overview: "Nirmith 2026 Hackathon is a national-level, execution-focused competition hosted by the IoTronics Club at NMIT Bangalore, where participants build and demonstrate real-world solutions within a limited time.",
      eligibility: [
        "Open to all undergraduate students (1st to 4th year) across India",
        "Students from all branches and disciplines are eligible",
        "Inter-college teams are allowed",
        "Inter-specialization teams are allowed",
        "Team size: 3–4 members per team",
        "Participants must choose one track: Hardware or Software",
      ],
      tracks: {
        hardware: [
          "Healthcare & Assistive Technology",
          "Environment & Sustainability",
          "Smart Mobility & Transportation",
          "IoT for Smart Cities",
          "Open Hardware Innovation",
        ],
        software: [
          "AI/ML Application",
          "Sustainability & Resource Optimization",
          "Healthcare & Wellness",
          "Fintech and Web3",
          "Open Innovation Software",
        ],
      },
      fees: {
        round1: "ENTIRELY FREE for all participants",
        round2: "₹400 per team (only for shortlisted teams) - Includes meals, refreshments, infrastructure",
      },
      format: [
        {
          title: "Round 1: Online Screening",
          details: [
            "Teams will submit a PPT explaining their project",
            "Include problem statement, proposed solution, implementation approach",
            "Evaluation based on clarity, feasibility, and innovation",
          ],
        },
        {
          title: "Round 2: On-Campus Hackathon (14 hours)",
          details: [
            "Build and develop working prototype",
            "Food, refreshments, and infrastructure provided",
            "Networking opportunities and mini-activities",
          ],
        },
      ],
      evaluation: [
        "Innovation and originality",
        "Technical implementation",
        "Functionality of the prototype",
        "Practical applicability",
        "Presentation and clarity",
      ],
      prizes: {
        total: "₹1,00,000",
        hardware: { winner: "₹25,000", runnerUp: "₹15,000", secondRunner: "₹10,000" },
        software: { winner: "₹25,000", runnerUp: "₹15,000", secondRunner: "₹10,000" },
      },
      rules: [
        "Teams must participate in only one track",
        "All development must happen during the hackathon duration",
        "Pre-built or previously developed projects are not allowed",
        "Teams must present a working prototype",
        "Plagiarism or copying will lead to disqualification",
        "Judges' decision will be final and binding",
      ],
    },
  },
];

/* ── Helpers ─────────────────────────────────────────────────── */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="font-orbitron text-base font-bold mb-2 text-white">{title}</h3>
    {children}
  </div>
);

const BulletList = ({ items, color, bullet }: { items: string[]; color: string; bullet: string }) => (
  <ul className="font-rajdhani text-gray-400 space-y-1.5 text-sm">
    {items?.map((item, i) => (
      <li key={i} className="flex gap-2">
        <span style={{ color }} className="flex-shrink-0">{bullet}</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

/* ── Event Card ──────────────────────────────────────────────── */
const EventCard = ({ event, onOpenModal }: any) => (
  <div className="rounded-2xl overflow-hidden bg-card border border-border">
    <div
      className="w-full h-56 bg-cover bg-center"
      style={{ backgroundImage: `url('${event.banner}')` }}
    />
    <div className="p-6 space-y-4">
      <div>
        <span
          className="inline-block px-4 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3"
          style={{ color: event.tagColor, background: `${event.tagColor}18`, border: `1px solid ${event.tagColor}44` }}
        >
          {event.tag}
        </span>
        <h3 className="font-orbitron text-2xl font-bold text-white mb-2">{event.title}</h3>
      </div>
      <p className="font-rajdhani text-gray-300 text-sm leading-relaxed">{event.shortDesc}</p>
      <div className="space-y-2 py-3 border-y border-border">
        <div className="flex items-center gap-2 text-sm text-gray-300 font-rajdhani">
          <Calendar size={16} style={{ color: event.tagColor }} /><span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300 font-rajdhani">
          <Clock size={16} style={{ color: event.tagColor }} /><span>{event.time}</span>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onOpenModal(event)}
          className="flex-1 px-4 py-2 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider border transition-colors duration-200 hover:opacity-80"
          style={{ color: event.tagColor, borderColor: event.tagColor, background: `${event.tagColor}10` }}
        >
          Know More
        </button>
        <a
          href={event.unstopLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-85 transition-opacity duration-200"
          style={{ background: event.tagColor, color: "#000" }}
        >
          <img src="/unstop_logo.svg" alt="Unstop" className="h-4 w-auto" style={{ filter: "brightness(0)" }} />
          <span>Register</span>
        </a>
      </div>
    </div>
  </div>
);

/* ── Event Modal ─────────────────────────────────────────────── */
const EventModal = ({ event, isOpen, onClose }: any) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!event) return null;

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 99998,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Centering shell — plain div, no framer-motion, no transform */}
          <div
            key="shell"
            style={{
              position: "fixed", inset: 0, zIndex: 99999,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "16px",
              pointerEvents: "none",
            }}
          >
            {/* Animated panel — only opacity + scale, no translate */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                pointerEvents: "all",
                width: "100%",
                maxWidth: 680,
                maxHeight: "min(88vh, 780px)",
                display: "flex",
                flexDirection: "column",
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16,
                boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
                overflow: "hidden",
              }}
            >
              {/* Banner */}
              <div style={{ flexShrink: 0, height: 200, overflow: "hidden", position: "relative" }}>
                <img
                  src={event.banner}
                  alt={event.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  draggable={false}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, transparent 45%, #111111 100%)",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: "absolute", top: 12, right: 12,
                  width: 32, height: 32, borderRadius: "50%",
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff", zIndex: 10,
                }}
              >
                <X size={15} />
              </button>

              {/* Scrollable body */}
              <div style={{ flex: 1, overflowY: "auto", overscrollBehavior: "contain" }}>
                <div className="px-6 sm:px-8 py-5 space-y-5">
                  {/* Header */}
                  <div>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3"
                      style={{ color: event.tagColor, background: `${event.tagColor}18`, border: `1px solid ${event.tagColor}44` }}
                    >
                      {event.tag}
                    </span>
                    <h2 className="font-orbitron text-2xl sm:text-3xl font-bold mb-3 text-white">{event.title}</h2>
                    <div className="flex flex-wrap gap-4 text-sm font-rajdhani text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={15} style={{ color: event.tagColor }} /><span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={15} style={{ color: event.tagColor }} /><span>{event.time}</span>
                      </div>
                    </div>
                  </div>

                  <Section title="Overview">
                    <p className="font-rajdhani text-gray-400 leading-relaxed text-sm">{event.fullDetails.overview}</p>
                  </Section>

                  <Section title="Eligibility">
                    <BulletList items={event.fullDetails.eligibility} color={event.tagColor} bullet="•" />
                  </Section>

                  {event.fullDetails.tracks && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(["hardware", "software"] as const).map((track) => (
                        <div key={track}>
                          <h3 className="font-orbitron text-sm font-bold mb-2 capitalize text-white">{track} Track Themes</h3>
                          <BulletList items={event.fullDetails.tracks[track]} color={event.tagColor} bullet="→" />
                        </div>
                      ))}
                    </div>
                  )}

                  <Section title="Competition Format">
                    <div className="space-y-3">
                      {event.fullDetails.format?.map((round: any, i: number) => (
                        <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                          <h4 className="font-orbitron text-xs font-bold mb-2 text-white">{round.title}</h4>
                          <BulletList items={round.details} color={event.tagColor} bullet="•" />
                        </div>
                      ))}
                    </div>
                  </Section>

                  <Section title="Evaluation Criteria">
                    <BulletList items={event.fullDetails.evaluation} color={event.tagColor} bullet="✓" />
                  </Section>

                  {event.fullDetails.fees && (
                    <Section title="Fee Structure">
                      <div className="p-4 rounded-xl space-y-2 font-rajdhani text-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <p><span className="font-semibold text-white">Round 1:</span> <span className="text-gray-400">{event.fullDetails.fees.round1}</span></p>
                        <p><span className="font-semibold text-white">Round 2:</span> <span className="text-gray-400">{event.fullDetails.fees.round2}</span></p>
                      </div>
                    </Section>
                  )}

                  {event.fullDetails.prizes && (
                    <Section title={`Prize Pool${typeof event.fullDetails.prizes.total === "string" ? `: ${event.fullDetails.prizes.total}` : ""}`}>
                      {event.fullDetails.prizes.hardware && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(["hardware", "software"] as const).map((track) => (
                            <div key={track} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                              <h4 className="font-orbitron text-xs font-bold mb-2 capitalize text-white">{track} Track</h4>
                              <div className="space-y-1 font-rajdhani text-sm text-gray-400">
                                <p><span className="text-white font-semibold">Winner:</span> {event.fullDetails.prizes[track].winner}</p>
                                <p><span className="text-white font-semibold">Runner Up:</span> {event.fullDetails.prizes[track].runnerUp}</p>
                                <p><span className="text-white font-semibold">2nd Runner Up:</span> {event.fullDetails.prizes[track].secondRunner}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </Section>
                  )}

                  <Section title="Rules & Guidelines">
                    <BulletList items={event.fullDetails.rules} color={event.tagColor} bullet="▪" />
                  </Section>
                </div>
              </div>

              {/* Footer CTA */}
              <div style={{ flexShrink: 0, padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.1)", background: "#111111" }}>
                <a
                  href={event.unstopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono font-semibold text-sm uppercase tracking-wider hover:opacity-85 transition-opacity duration-150"
                  style={{ background: event.tagColor, color: "#000" }}
                >
                  <img src="/unstop_logo.svg" alt="Unstop" className="h-4 w-auto" style={{ filter: "brightness(0)" }} />
                  <span>Register on Unstop</span>
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
};

/* ── Page ────────────────────────────────────────────────────── */
const Events = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDarkMode);
  }, [isDarkMode]);

  const handleOpenModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 250);
  };

  return (
    <div className="min-h-screen">
      <HangingBulb isOn={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      <Navigation />
      <OrangeAtmosphere variant="horizon-glow" />

      <main className="relative pt-20 pb-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-4">
              Nirmith <span className="gradient-text">'26</span>
            </h1>
            <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us for an exciting lineup of hackathons and ideathons. Click on any event to learn more and register.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {eventData.map((event) => (
              <EventCard key={event.id} event={event} onOpenModal={handleOpenModal} />
            ))}
          </div>
        </div>
      </main>

      <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={handleCloseModal} />
      <PageFooter />
    </div>
  );
};

export default Events;
