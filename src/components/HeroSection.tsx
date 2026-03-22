import { useRef } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  mouseX: number;
  mouseY: number;
}

export default function HeroSection({ mouseX, mouseY }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToWork = () => {
    const el = document.getElementById("editing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          zIndex: 1,
        }}
      />

      <motion.div
        className="text-center px-6 select-none"
        style={{
          transform: `translate(${mouseX * -15}px, ${mouseY * -10}px)`,
          transition: "transform 0.1s ease-out",
          zIndex: 2,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Pre-title label */}
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-6 font-mono"
          style={{ color: "#C9A84C", fontFamily: "'JetBrains Mono', monospace" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          Creative Studio
        </motion.p>

        {/* Main title */}
        <motion.h1
          className="font-bold leading-none mb-8"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(52px, 8vw, 96px)",
            color: "#E8E8F0",
            letterSpacing: "-0.02em",
            textShadow: "0 0 60px rgba(201, 168, 76, 0.15), 0 0 120px rgba(26, 58, 107, 0.3)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Dhiraj Studio
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="mx-auto mb-8"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            width: "200px",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />

        {/* Tagline */}
        <motion.p
          className="font-light tracking-widest"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "18px",
            color: "#7A7A9A",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0 }}
        >
          Lost in pursuit of perfection
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6 }}
        >
          <motion.button
            onClick={scrollToWork}
            className="relative px-8 py-3 rounded-full text-sm tracking-[0.25em] uppercase font-light cursor-pointer"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "#E8E8F0",
              background: "rgba(8,8,16,0.4)",
              border: "1px solid rgba(201,168,76,0.4)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 20px rgba(201,168,76,0.08), inset 0 0 20px rgba(201,168,76,0.03)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(201,168,76,0.25), 0 0 80px rgba(201,168,76,0.08), inset 0 0 30px rgba(201,168,76,0.06)",
              borderColor: "rgba(201,168,76,0.7)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Let's Dive
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating particles parallax layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mouseX * 8}px, ${mouseY * 6}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              backgroundColor: i % 2 === 0 ? "#C9A84C" : "#1A3A6B",
              filter: "blur(0.5px)",
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
