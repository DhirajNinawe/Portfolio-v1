import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Instagram, Linkedin } from "lucide-react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-15%" });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-32 px-6" style={{ zIndex: 10 }}>
      <div className="text-center max-w-2xl mx-auto">
        {/* Label */}
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-8"
          style={{
            color: "#C9A84C",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          Let's Create Together
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="mb-6"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            color: "#E8E8F0",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Begin a Conversation
        </motion.h2>

        <motion.p
          className="mb-16"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "17px",
            color: "#7A7A9A",
            lineHeight: 1.8,
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Whether it's a film that needs to breathe, a website that needs to live,
          or a vision that needs a collaborator — I'm here.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <motion.a
            href="mailto:dhirajninawe7@gmail.com"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full relative overflow-hidden"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#E8E8F0",
              background: "rgba(201,168,76,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(201,168,76,0.35)",
              letterSpacing: "0.05em",
              textDecoration: "none",
            }}
            animate={{
              boxShadow: [
                "0 0 18px rgba(201,168,76,0.15), inset 0 0 12px rgba(201,168,76,0.04), 0 4px 15px rgba(0,0,0,0.5)",
                "0 0 36px rgba(201,168,76,0.3), inset 0 0 20px rgba(201,168,76,0.08), 0 4px 20px rgba(0,0,0,0.5)",
                "0 0 18px rgba(201,168,76,0.15), inset 0 0 12px rgba(201,168,76,0.04), 0 4px 15px rgba(0,0,0,0.5)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              scale: 1.05,
              background: "rgba(201,168,76,0.15)",
              borderColor: "rgba(240,192,96,0.6)",
              boxShadow: "0 0 50px rgba(201,168,76,0.4), inset 0 0 24px rgba(201,168,76,0.1), 0 8px 30px rgba(0,0,0,0.5)",
            } as any}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={16} style={{ color: "#C9A84C" }} />
            Begin a Conversation
          </motion.a>
        </motion.div>

        {/* Email link */}
        <motion.a
          href="mailto:dhirajninawe7@gmail.com"
          className="block mb-12 text-sm"
          style={{
            color: "#7A7A9A",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "13px",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ color: "#C9A84C", opacity: 1 } as any}
        >
          dhirajninawe7@gmail.com
        </motion.a>

        {/* Divider */}
        <motion.div
          className="mx-auto mb-10"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            width: "200px",
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        />

        {/* Social icons */}
        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { icon: <Github size={16} />, href: "https://github.com/DhirajNinawe", label: "GitHub" },
            { icon: <Instagram size={16} />, href: "https://www.instagram.com/dhiraj__11_?igsh=dm8xM2NsdHM1bDRn", label: "Instagram" },
            { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/dhiraj-ninawe-148575331", label: "LinkedIn" },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                color: "#7A7A9A",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
              }}
              whileHover={{
                color: "#C9A84C",
                borderColor: "rgba(201,168,76,0.3)",
                backgroundColor: "rgba(201,168,76,0.05)",
                scale: 1.1,
              }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Footer label */}
        <motion.p
          className="mt-20 text-xs"
          style={{
            color: "#7A7A9A",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            opacity: 0.4,
            letterSpacing: "0.1em",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          © {new Date().getFullYear()} DHIRAJ STUDIO · CRAFTED WITH INTENTION
        </motion.p>
      </div>
    </section>
  );
}
