import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import PageFooter from "@/components/PageFooter";
import ParticleCanvas from "@/components/3d/ParticleCanvas";
import ImmersiveHome from "@/components/ImmersiveHome";
import JoinTeamSection from "@/components/JoinTeamSection";

const Home = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        {/* Particle system — fixed background behind all panels */}
        <ParticleCanvas />

        {/* Top navigation bar */}
        <Navigation />

        {/* Immersive fullscreen scroll panels */}
        <main className="relative">
          <ImmersiveHome />
        </main>

        <JoinTeamSection />

        {/* Footer */}
        <PageFooter />
      </motion.div>
    </>
  );
};

export default Home;
