import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import OrangeAtmosphere from "@/components/OrangeAtmosphere";
import { useState, useEffect } from "react";

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
      overview: "Nirmith 2026 is a national-level Ideathon hosted by the IoTronics Club at NMIT Bangalore, designed to bring together student innovators from across India to conceptualize and present impactful solutions to real-world problems. The Ideathon focuses on structured thinking, innovation, and feasibility, where participants will identify a problem, propose a solution, and evaluate its technical and business viability.",
      eligibility: [
        "Open to all undergraduate students (1st to 4th year) across India",
        "Students from all branches and disciplines are eligible",
        "Inter-college teams are allowed",
        "Inter-specialization teams are allowed (e.g., engineering + management)",
        "Team size: 3–4 members per team"
      ],
      format: [
        {
          title: "Round 1: On-Spot Ideation & Submission",
          details: [
            "Teams will be given access to all themes at the start of the event",
            "10 minutes to select a theme and register it via Google Form",
            "1:30 hrs to identify problem, develop solution, and prepare PPT",
            "Teams must submit PPT within the given time",
            "Top ~15 teams will be selected for the final round"
          ]
        },
        {
          title: "Round 2: Final Presentation",
          details: [
            "Shortlisted teams present ideas to a panel of judges",
            "Presentation time: 5–7 minutes per team",
            "Q&A: 2–3 minutes per team"
          ]
        }
      ],
      evaluation: [
        "Problem clarity and relevance",
        "Innovation and originality",
        "Technical feasibility",
        "Business viability and scalability",
        "Clarity of presentation"
      ],
      rewards: {
        winner: "Winner",
        runnerUp: "First Runner-Up",
        secondRunner: "Second Runner-Up"
      },
      rules: [
        "Teams must adhere strictly to the given time limits",
        "Late submissions will not be accepted",
        "Plagiarism or copying ideas will lead to disqualification",
        "Teams must work only within the allocated time during Round 1",
        "The decision of judges will be final and binding",
        "Each team must submit only one final solution"
      ]
    }
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
      overview: "Nirmith 2026 Hackathon is a national-level, execution-focused competition hosted by the IoTronics Club at NMIT Bangalore, where participants build and demonstrate real-world solutions within a limited time. The hackathon emphasizes practical implementation, requiring teams to develop working prototypes and present them to a panel of judges. The hackathon is conducted under two dedicated tracks: Hardware and Software.",
      eligibility: [
        "Open to all undergraduate students (1st to 4th year) across India",
        "Students from all branches and disciplines are eligible",
        "Inter-college teams are allowed",
        "Inter-specialization teams are allowed",
        "Team size: 3–4 members per team",
        "Participants must choose one track: Hardware or Software"
      ],
      tracks: {
        hardware: [
          "Healthcare & Assistive Technology",
          "Environment & Sustainability",
          "Smart Mobility & Transportation",
          "IoT for Smart Cities",
          "Open Hardware Innovation"
        ],
        software: [
          "AI/ML Application",
          "Sustainability & Resource Optimization",
          "Healthcare & Wellness",
          "Fintech and Web3",
          "Open Innovation Software"
        ]
      },
      fees: {
        round1: "ENTIRELY FREE for all participants",
        round2: "₹400 per team (only for shortlisted teams) - Includes meals, refreshments, infrastructure"
      },
      format: [
        {
          title: "Round 1: Online Screening",
          details: [
            "Teams will submit a PPT explaining their project",
            "Include problem statement, proposed solution, implementation approach",
            "Evaluation based on clarity, feasibility, and innovation"
          ]
        },
        {
          title: "Round 2: On-Campus Hackathon (14 hours)",
          details: [
            "Build and develop working prototype",
            "Food, refreshments, and infrastructure provided",
            "Networking opportunities and mini-activities"
          ]
        }
      ],
      evaluation: [
        "Innovation and originality",
        "Technical implementation",
        "Functionality of the prototype",
        "Practical applicability",
        "Presentation and clarity"
      ],
      prizes: {
        total: "₹1,00,000",
        hardware: { winner: "₹25,000", runnerUp: "₹15,000", secondRunner: "₹10,000" },
        software: { winner: "₹25,000", runnerUp: "₹15,000", secondRunner: "₹10,000" }
      },
      rules: [
        "Teams must participate in only one track",
        "All development must happen during the hackathon duration",
        "Pre-built or previously developed projects are not allowed",
        "Teams must present a working prototype",
        "Plagiarism or copying will lead to disqualification",
        "Judges' decision will be final and binding"
      ]
    }
  }
];

const EventCard = ({ event, onOpenModal }: any) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl group bg-card border border-border"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Banner background */}
      <div
        className="w-full h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url('${event.banner}')`,
        }}
      />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Tag & Title */}
        <div>
          <motion.span
            className="inline-block px-4 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3"
            style={{
              color: event.tagColor,
              background: `${event.tagColor}18`,
              border: `1px solid ${event.tagColor}44`,
            }}
          >
            {event.tag}
          </motion.span>
          <h3 className="font-orbitron text-2xl font-bold text-white mb-2">
            {event.title}
          </h3>
        </div>

        {/* Description */}
        <p className="font-rajdhani text-gray-300 text-sm leading-relaxed">
          {event.shortDesc}
        </p>

        {/* Date & Time */}
        <div className="space-y-2 py-3 border-y border-border">
          <div className="flex items-center gap-2 text-sm text-gray-300 font-rajdhani">
            <Calendar size={16} style={{ color: event.tagColor }} />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300 font-rajdhani">
            <Clock size={16} style={{ color: event.tagColor }} />
            <span>{event.time}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <motion.button
            onClick={() => onOpenModal(event)}
            className="flex-1 px-4 py-2 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider border transition-all duration-300"
            style={{
              color: event.tagColor,
              borderColor: event.tagColor,
              background: `${event.tagColor}10`,
            }}
            whileHover={{ 
              scale: 1.05,
              background: `${event.tagColor}20`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Know More
          </motion.button>
          <motion.a
            href={event.unstopLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              background: event.tagColor,
              color: '#000',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/unstop_logo.svg"
              alt="Unstop"
              className="h-4 w-auto"
              style={{ filter: 'brightness(0)' }}
            />
            <span>Register</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const EventModal = ({ event, isOpen, onClose }: any) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="w-full max-w-2xl max-h-[90vh] bg-background rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 22, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Banner - Outside scrollable area */}
              <div
                className="w-full h-56 bg-cover bg-center flex-shrink-0"
                style={{
                  backgroundImage: `url('${event.banner}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Close Button - Fixed to modal */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10 pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>

              {/* Scrollable Content Area */}
              <div className="overflow-y-auto flex-1">
                {/* Main Content */}
                <div className="px-8 py-6 space-y-6">
                  {/* Header */}
                  <div>
                    <motion.span
                      className="inline-block px-4 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-4"
                      style={{
                        color: event.tagColor,
                        background: `${event.tagColor}18`,
                        border: `1px solid ${event.tagColor}44`,
                      }}
                    >
                      {event.tag}
                    </motion.span>
                    <h2 className="font-orbitron text-3xl font-bold mb-4">
                      {event.title}
                    </h2>
                    <div className="flex flex-wrap gap-6 text-sm font-rajdhani">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} style={{ color: event.tagColor }} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} style={{ color: event.tagColor }} />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Overview */}
                  <div>
                    <h3 className="font-orbitron text-xl font-bold mb-3">Overview</h3>
                    <p className="font-rajdhani text-muted-foreground leading-relaxed">
                      {event.fullDetails.overview}
                    </p>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <h3 className="font-orbitron text-xl font-bold mb-3">Eligibility</h3>
                    <ul className="font-rajdhani text-muted-foreground space-y-2">
                      {event.fullDetails.eligibility?.map((item: any, i: any) => (
                        <li key={i} className="flex gap-3">
                          <span style={{ color: event.tagColor }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tracks (Hackathon only) */}
                  {event.fullDetails.tracks && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-orbitron text-lg font-bold mb-3">
                          Hardware Track Themes
                        </h3>
                        <ul className="font-rajdhani text-sm text-muted-foreground space-y-2">
                          {event.fullDetails.tracks.hardware.map((theme: any, i: any) => (
                            <li key={i} className="flex gap-2">
                              <span style={{ color: event.tagColor }}>→</span>
                              <span>{theme}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-orbitron text-lg font-bold mb-3">
                          Software Track Themes
                        </h3>
                        <ul className="font-rajdhani text-sm text-muted-foreground space-y-2">
                          {event.fullDetails.tracks.software.map((theme: any, i: any) => (
                            <li key={i} className="flex gap-2">
                              <span style={{ color: event.tagColor }}>→</span>
                              <span>{theme}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Format/Rounds */}
                  <div>
                    <h3 className="font-orbitron text-xl font-bold mb-4">
                      Competition Format
                    </h3>
                    <div className="space-y-4">
                      {event.fullDetails.format?.map((round: any, i: any) => (
                        <div
                          key={i}
                          className="p-4 rounded-lg border border-border bg-muted/30"
                        >
                          <h4 className="font-orbitron font-bold mb-2">{round.title}</h4>
                          <ul className="font-rajdhani text-sm text-muted-foreground space-y-1">
                            {round.details.map((detail: any, j: any) => (
                              <li key={j} className="flex gap-2">
                                <span style={{ color: event.tagColor }}>•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evaluation Criteria */}
                  <div>
                    <h3 className="font-orbitron text-xl font-bold mb-3">
                      Evaluation Criteria
                    </h3>
                    <ul className="font-rajdhani text-muted-foreground space-y-2">
                      {event.fullDetails.evaluation?.map((criterion: any, i: any) => (
                        <li key={i} className="flex gap-3">
                          <span style={{ color: event.tagColor }}>✓</span>
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fees (Hackathon only) */}
                  {event.fullDetails.fees && (
                    <div className="bg-muted/30 p-4 rounded-lg border border-border">
                      <h3 className="font-orbitron text-lg font-bold mb-3">Fee Structure</h3>
                      <div className="space-y-3 font-rajdhani text-sm">
                        <div>
                          <span className="font-semibold">Round 1 (Online):</span>
                          <p className="text-muted-foreground mt-1">{event.fullDetails.fees.round1}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Round 2 (On-Campus):</span>
                          <p className="text-muted-foreground mt-1">{event.fullDetails.fees.round2}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prizes */}
                  {event.fullDetails.prizes && (
                    <div>
                      <h3 className="font-orbitron text-xl font-bold mb-4">
                        Prize Pool: {typeof event.fullDetails.prizes.total === 'string' 
                          ? event.fullDetails.prizes.total 
                          : ''}
                      </h3>
                      {event.fullDetails.prizes.hardware && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 rounded-lg border border-border bg-muted/30">
                            <h4 className="font-orbitron font-bold mb-3">Hardware Track</h4>
                            <div className="space-y-2 font-rajdhani text-sm">
                              <p>
                                <span className="font-semibold">Winner:</span> {event.fullDetails.prizes.hardware.winner}
                              </p>
                              <p>
                                <span className="font-semibold">Runner Up:</span> {event.fullDetails.prizes.hardware.runnerUp}
                              </p>
                              <p>
                                <span className="font-semibold">Second Runner Up:</span> {event.fullDetails.prizes.hardware.secondRunner}
                              </p>
                            </div>
                          </div>
                          <div className="p-4 rounded-lg border border-border bg-muted/30">
                            <h4 className="font-orbitron font-bold mb-3">Software Track</h4>
                            <div className="space-y-2 font-rajdhani text-sm">
                              <p>
                                <span className="font-semibold">Winner:</span> {event.fullDetails.prizes.software.winner}
                              </p>
                              <p>
                                <span className="font-semibold">Runner Up:</span> {event.fullDetails.prizes.software.runnerUp}
                              </p>
                              <p>
                                <span className="font-semibold">Second Runner Up:</span> {event.fullDetails.prizes.software.secondRunner}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Rules */}
                  <div>
                    <h3 className="font-orbitron text-xl font-bold mb-3">Rules & Guidelines</h3>
                    <ul className="font-rajdhani text-muted-foreground space-y-2">
                      {event.fullDetails.rules?.map((rule: any, i: any) => (
                        <li key={i} className="flex gap-3">
                          <span style={{ color: event.tagColor }}>▪</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sticky Footer with CTA Button */}
              <div className="px-8 py-4 border-t border-border bg-muted/30">
                <motion.a
                  href={event.unstopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 rounded-lg font-mono font-semibold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: event.tagColor,
                    color: '#000',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src="/unstop_logo.svg"
                    alt="Unstop"
                    className="h-5 w-auto"
                    style={{ filter: 'brightness(0)' }}
                  />
                  <span>Register on Unstop</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const Events = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  const handleOpenModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  return (
    <div className="min-h-screen">
      <HangingBulb isOn={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      <Navigation />
      <OrangeAtmosphere variant="horizon-glow" />

      <main className="relative pt-20 pb-16">
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-4">
              Nirmith <span className="gradient-text">'26</span>
            </h1>
            <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us for an exciting lineup of hackathons and ideathons. Click on any event to learn more and register.
            </p>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {eventData.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <EventCard
                  event={event}
                  onOpenModal={handleOpenModal}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <PageFooter />
    </div>
  );
};

export default Events;
