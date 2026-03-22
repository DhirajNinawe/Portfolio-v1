import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function DiscoverySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center"
      style={{ zIndex: 10 }}
    >
      <div className="text-center px-8 max-w-5xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-12"
          style={{
            color: "#C9A84C",
            fontFamily: "'JetBrains Mono', monospace",
            opacity: 0,
          }}
          animate={isInView ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Philosophy
        </motion.p>

        <motion.h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            color: "#E8E8F0",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            opacity: 0,
          }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          "Crafting visuals that{" "}
          <span style={{ color: "#C9A84C", fontStyle: "italic" }}>feel</span>,
          <br />
          not just seen."
        </motion.h2>

        <motion.div
          className="mx-auto mt-16"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
            opacity: 0,
          }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1.4, delay: 0.8 }}
        />
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: "1px",
              height: "80px",
              background: `linear-gradient(to bottom, transparent, rgba(201,168,76,${0.1 + i * 0.05}), transparent)`,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </section>
  );
}
