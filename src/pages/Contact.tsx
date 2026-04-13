import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Instagram, Linkedin, Github, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import OrangeAtmosphere from "@/components/OrangeAtmosphere";

const Contact = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  const handleSubmit = (e: React.FormEvent) => {
    // FormSubmit handles the submission natively via the action attribute.
    // We just do basic validation here if needed.
    if (!formData.name || !formData.email || !formData.message) {
      e.preventDefault();
      toast.error("Please fill in all required fields.");
      return;
    }
    // Proceed with normal form submission
  };

  return (
    <div className="min-h-screen">
      <HangingBulb isOn={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      <Navigation />
      <OrangeAtmosphere variant="corner-flares" />

      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-primary">CONTACT US</span>
              </motion.div>

              <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
                Let's <span className="gradient-text">Connect</span>
              </h1>

              <p className="font-rajdhani text-lg md:text-xl text-muted-foreground leading-relaxed">
                Have a project idea, question, or want to collaborate? We'd love to hear from you!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-orbitron text-2xl font-bold mb-8">Contact Information</h3>

                <div className="space-y-6 mb-12">
                    {[
                      { icon: <MapPin size={24} />, label: "Location", value: "Room 302, F Block, EEE Dept, NMIT", href: "https://www.google.com/maps/search/?api=1&query=Nitte+Meenakshi+Institute+of+Technology" },
                      { icon: <Mail size={24} />, label: "Email", value: "iotronics@nmit.ac.in", href: "mailto:iotronics@nmit.ac.in" },
                    ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-start gap-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-mono text-sm text-muted-foreground mb-1">{item.label}</p>
                        <a 
                          href={item.href} 
                          target={item.label === "Location" ? "_blank" : undefined} 
                          rel={item.label === "Location" ? "noopener noreferrer" : undefined} 
                          className="font-rajdhani text-lg font-medium whitespace-pre-line hover:text-primary transition-colors block"
                        >
                          {item.value}
                        </a>
                      </div>
                    </motion.div>
                  ))}

                  {/* Phone contacts */}
                  <motion.div
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="font-mono text-sm text-muted-foreground mb-1">Contact</p>
                      <a href="tel:+918005863350" className="font-rajdhani text-lg font-medium block hover:text-primary transition-colors">
                        Rounak: +91 80058 63350
                      </a>
                      <a href="tel:+916354959448" className="font-rajdhani text-lg font-medium block hover:text-primary transition-colors">
                        Rohit: +91 63549 59448
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Social links */}
                <div className="mb-12">
                  <h4 className="font-orbitron text-lg font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    {[
                      { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/iotronics.nmit/" },
                      { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com/company/iotronics-nmit" },
                      { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/iotronicsnmit" },
                    ].map((social, i) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <motion.div
                  className="rounded-2xl overflow-hidden border border-border bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-64 bg-muted">
                    <iframe 
                      src="https://maps.google.com/maps?q=Nitte%20Meenakshi%20Institute%20of%20Technology&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    
                    {/* Label */}
                    <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border pointer-events-none">
                      <p className="font-orbitron text-sm font-semibold text-primary">IoTRONICS Lab</p>
                      <p className="font-rajdhani text-xs text-muted-foreground">F Block, EEE Dept, NMIT</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <form 
                  action="https://formsubmit.co/iotronics@nmit.ac.in" 
                  method="POST" 
                  onSubmit={handleSubmit} 
                  className="card-circuit relative z-50"
                >
                  <h3 className="font-orbitron text-2xl font-bold mb-8">Send a Message</h3>

                  {/* Anti-spam and configuration fields */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value={`New Message from IoTRONICS Website: ${formData.subject || 'Contact Form'}`} />

                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-sm text-muted-foreground mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-sm text-muted-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-sm text-muted-foreground mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-sm text-muted-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani resize-none"
                        placeholder="Your message..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full btn-glow flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={18} />
                      Send Message
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default Contact;
