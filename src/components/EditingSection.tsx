import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  tags: string[];
  image: string;
  year: string;
}

const editingProjects: Project[] = [
  {
    id: 1,
    title: "Neon Odyssey",
    type: "Cinematic Edit",
    description:
      "A high-intensity reel weaving together neon-drenched urban landscapes with rhythm-driven cuts. Every frame was treated as a canvas — color graded to feel like memory, not footage.",
    tags: ["Color Grading", "Motion Graphics", "Sound Design"],
    image: "https://images.unsplash.com/photo-1518655048521-f130df041f66?w=800&q=80",
    year: "2024",
  },
  {
    id: 2,
    title: "The Stillness Edit",
    type: "Documentary Short",
    description:
      "A meditation on solitude. Slow-paced, breath-like editing where silence is treated as a narrative element. Won regional recognition for emotional depth.",
    tags: ["Documentary", "Narrative Editing", "Color Science"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    year: "2024",
  },
  {
    id: 3,
    title: "Velocity",
    type: "Commercial Reel",
    description:
      "A fast-cut commercial edit for an automotive brand — precision-timed to the microsecond with sound design woven into every visual beat.",
    tags: ["Commercial", "Fast Cut", "VFX"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    year: "2023",
  },
  {
    id: 4,
    title: "Echoes",
    type: "Music Video",
    description:
      "A hauntingly beautiful music video for an indie artist — built around reverse time-lapse and double exposure techniques that blur the line between past and present.",
    tags: ["Music Video", "VFX", "Experimental"],
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    year: "2023",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  isGold?: boolean;
  delay?: number;
}

function ProjectCard({ project, index, isGold = true, delay = 0 }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Scroll lock when card is expanded
  useEffect(() => {
    if (expanded) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [expanded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 12, y: -x * 12 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const accentColor = isGold ? "#C9A84C" : "#1A6B8A";
  const glowColor = isGold ? "rgba(201,168,76,0.15)" : "rgba(26,107,138,0.2)";

  return (
    <>
      <motion.div
        className="relative cursor-pointer group"
        style={{
          transformStyle: "preserve-3d",
          perspective: "800px",
        }}
        initial={{ opacity: 0, y: 60, z: index * -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: delay + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => setExpanded(true)}
      >
        <motion.div
          style={{
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <div
            className="relative overflow-hidden rounded-xl"
            style={{
              background: "rgba(8, 8, 16, 0.6)",
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(255,255,255,0.06)`,
              boxShadow: hovered
                ? `0 8px 40px ${glowColor}, 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
                : `0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)`,
              transition: "box-shadow 0.3s ease",
            }}
          >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: "200px" }}>
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.7) saturate(0.8)" }}
                animate={{ scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 0.5 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 40%, rgba(8,8,16,0.9) 100%)`,
                }}
              />
              {/* Gold accent glow on hover */}
              {hovered && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <div
                className="absolute top-3 right-3 text-xs font-mono px-2 py-1 rounded"
                style={{
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                  backgroundColor: "rgba(8,8,16,0.7)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                }}
              >
                {project.year}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{
                  color: accentColor,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                }}
              >
                {project.type}
              </p>
              <h3
                className="font-bold mb-3"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "20px",
                  color: "#E8E8F0",
                  letterSpacing: "-0.01em",
                }}
              >
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      color: "#7A7A9A",
                      border: "1px solid rgba(122,122,154,0.2)",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "10px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <motion.div
                className="flex items-center gap-1 text-xs"
                style={{
                  color: accentColor,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                }}
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                View Project <ExternalLink size={10} />
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <motion.div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              }}
              animate={{ width: hovered ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Portal expanded modal */}
      {expanded && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 1000, backgroundColor: "rgba(8,8,16,0.95)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setExpanded(false)}
        >
          <motion.div
            className="relative w-full max-w-3xl mx-6 overflow-hidden rounded-2xl"
            style={{
              background: "rgba(13,27,75,0.4)",
              backdropFilter: "blur(30px)",
              border: `1px solid ${accentColor}30`,
              boxShadow: `0 40px 80px rgba(0,0,0,0.8), 0 0 60px ${glowColor}`,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 p-2 rounded-full"
              style={{
                color: "#E8E8F0",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onClick={() => setExpanded(false)}
            >
              <X size={16} />
            </button>

            {/* Hero image */}
            <div className="relative overflow-hidden" style={{ height: "300px" }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.6) saturate(0.9)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 30%, rgba(8,8,16,0.95) 100%)`,
                }}
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{
                  color: accentColor,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                }}
              >
                {project.type} · {project.year}
              </p>
              <h2
                className="font-bold mb-4"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "36px",
                  color: "#E8E8F0",
                  letterSpacing: "-0.02em",
                }}
              >
                {project.title}
              </h2>
              <p
                className="mb-6 leading-relaxed"
                style={{
                  color: "#7A7A9A",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "16px",
                  lineHeight: 1.8,
                }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      color: accentColor,
                      border: `1px solid ${accentColor}30`,
                      backgroundColor: `${accentColor}08`,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default function EditingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{
              color: "#C9A84C",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            Selected Work
          </motion.p>
          <motion.h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "#E8E8F0",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Video Editing
          </motion.h2>
          <motion.p
            style={{
              color: "#7A7A9A",
              fontFamily: "'Syne', sans-serif",
              fontSize: "16px",
              marginTop: "12px",
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Stories told through light, rhythm, and intention
          </motion.p>
        </div>

        {/* Cards grid — staggered depth layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {editingProjects.map((project, index) => (
            <div
              key={project.id}
              style={{
                marginTop: index % 2 === 1 ? "32px" : "0",
              }}
            >
              <ProjectCard
                project={project}
                index={index}
                isGold={true}
                delay={isInView ? 0 : 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
