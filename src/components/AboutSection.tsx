import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timelineNodes = [
  {
    index: "01",
    label: "Identity",
    text: "I am Dhiraj — a visual storyteller operating at the intersection of cinema and code.",
    accent: true,
  },
  {
    index: "02",
    label: "Conviction",
    text: "My work is rooted in a single conviction: that the most powerful experiences are the ones that bypass logic and land directly in the chest. Every edit, every interface, every motion — crafted to create that sensation.",
    accent: false,
  },
  {
    index: "03",
    label: "Obsession",
    text: "I grew up studying light. How it falls, how it changes, how it lies. That obsession with the quality of seeing informs everything I build — from a three-second transition to a five-page website.",
    accent: false,
  },
  {
    index: "04",
    label: "Belief",
    text: "I do not believe in lorem ipsum lives. I believe every creative decision is a statement about what matters. And I work with clients who feel the same.",
    accent: false,
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-28 px-6"
      style={{ zIndex: 10 }}
    >
      {/* Top horizontal divider */}
      <motion.div
        className="max-w-7xl mx-auto mb-20 relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(201,168,76,0.25), rgba(201,168,76,0.08), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "-3px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#C9A84C",
            boxShadow: "0 0 10px 3px rgba(201,168,76,0.5)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Two-column grid header */}
        <div
          className="grid gap-12 mb-20"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          {/* Left — Large heading */}
          <div className="relative">
            <motion.p
              className="tracking-[0.35em] uppercase mb-4"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                color: "#C9A84C",
                opacity: 0.75,
              }}
              initial={{ opacity: 0, x: -15 }}
              animate={
                isInView ? { opacity: 0.75, x: 0 } : { opacity: 0, x: -15 }
              }
              transition={{ duration: 0.8 }}
            >
              The Maker
            </motion.p>

            <motion.h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(52px, 6vw, 88px)",
                fontWeight: 800,
                color: "#E8E8F0",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              About
              <br />
              <span style={{ color: "#C9A84C" }}>the</span>
              <br />
              Studio
            </motion.h2>

            {/* Vertical accent line */}
            <motion.div
              style={{
                position: "absolute",
                left: "-24px",
                top: "40px",
                width: "1px",
                height: "120px",
                background:
                  "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)",
                transformOrigin: "top",
              }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          {/* Right — Intro quote block */}
          <motion.div
            className="flex flex-col justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div
              style={{
                borderLeft: "1px solid rgba(201,168,76,0.2)",
                paddingLeft: "24px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(18px, 2vw, 26px)",
                  color: "#E8E8F0",
                  lineHeight: 1.55,
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                "At the intersection of cinema and code — where every pixel is
                intentional, and every frame tells a story."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, rgba(201,168,76,0.15), rgba(255,255,255,0.04), transparent)",
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />

        {/* Timeline grid */}
        <div className="relative">
          {/* Vertical spine line */}
          <motion.div
            style={{
              position: "absolute",
              left: "calc(25% - 1px)",
              top: 0,
              bottom: 0,
              width: "1px",
              background:
                "linear-gradient(to bottom, rgba(201,168,76,0.18), rgba(201,168,76,0.06), transparent)",
              pointerEvents: "none",
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          {timelineNodes.map((node, index) => (
            <TimelineNode
              key={node.index}
              node={node}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Signature row */}
        <motion.div
          className="mt-0 pt-12 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="flex items-center gap-5">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(201,168,76,0.07)",
                border: "1px solid rgba(201,168,76,0.22)",
                boxShadow: "0 0 18px rgba(201,168,76,0.1)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "20px",
                  color: "#C9A84C",
                }}
              >
                D
              </span>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "18px",
                  color: "#E8E8F0",
                }}
              >
                Dhiraj
              </p>
              <p
                className="tracking-widest uppercase mt-0.5"
                style={{
                  color: "#7A7A9A",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                }}
              >
                Video Editor & Web Designer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                color: "#7A7A9A",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              End of story
            </p>
            <div
              style={{
                width: "28px",
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(201,168,76,0.3), transparent)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <motion.div
        className="max-w-7xl mx-auto mt-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

/* ── Timeline Node ── */
function TimelineNode({
  node,
  index,
  isInView,
}: {
  node: (typeof timelineNodes)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="grid relative group"
      style={{
        gridTemplateColumns: "25% 1fr",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        cursor: "default",
      }}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{
        duration: 0.85,
        delay: 0.6 + index * 0.18,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ backgroundColor: "rgba(201,168,76,0.015)" }}
    >
      {/* Left column — index + label */}
      <div className="py-10 pr-8 flex flex-col justify-start relative">
        {/* Dot on spine */}
        <motion.div
          style={{
            position: "absolute",
            right: "-5px",
            top: "42px",
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: "#080810",
            border: "1px solid rgba(201,168,76,0.4)",
            zIndex: 2,
          }}
          whileHover={{
            background: "#C9A84C",
            boxShadow: "0 0 12px 4px rgba(201,168,76,0.45)",
            scale: 1.3,
          }}
          transition={{ duration: 0.2 }}
        />

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            color: "#C9A84C",
            letterSpacing: "0.3em",
            opacity: 0.6,
            marginBottom: "10px",
          }}
        >
          {node.index}
        </p>
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "11px",
            color: "#7A7A9A",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {node.label}
        </p>
      </div>

      {/* Right column — text */}
      <div className="py-10 pl-10">
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: node.accent ? "19px" : "17px",
            lineHeight: 1.85,
            color: node.accent ? "#E8E8F0" : "#7A7A9A",
            fontWeight: node.accent ? 400 : 300,
            maxWidth: "640px",
          }}
        >
          {node.accent ? (
            <>
              <span
                style={{
                  float: "left",
                  fontFamily: "'Fraunces', serif",
                  fontSize: "62px",
                  lineHeight: 0.85,
                  marginRight: "12px",
                  marginTop: "8px",
                  color: "#C9A84C",
                }}
              >
                {node.text[0]}
              </span>
              {node.text.slice(1)}
            </>
          ) : (
            node.text
          )}
        </p>
      </div>
    </motion.div>
  );
}
