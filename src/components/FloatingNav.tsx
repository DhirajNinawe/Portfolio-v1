import { motion } from "framer-motion";

interface NavProps {
  activeSection: number;
  onNavigate: (index: number) => void;
  visible: boolean;
}

const sections = ["Hero", "Discovery", "Editing", "Web Design", "About", "Contact"];

export default function FloatingNav({ activeSection, onNavigate, visible }: NavProps) {
  return (
    <motion.nav
      className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 items-center"
      style={{ zIndex: 100 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map((section, index) => (
        <motion.button
          key={section}
          onClick={() => onNavigate(index)}
          className="relative group flex items-center justify-end gap-3"
          style={{ cursor: "pointer" }}
          aria-label={`Navigate to ${section}`}
        >
          {/* Label — appears on hover */}
          <motion.span
            className="text-right pointer-events-none"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              color: "#7A7A9A",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              opacity: 0,
              transition: "opacity 0.2s ease",
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {section}
          </motion.span>

          {/* Dot */}
          <motion.div
            style={{
              width: activeSection === index ? "8px" : "5px",
              height: activeSection === index ? "8px" : "5px",
              borderRadius: "50%",
              backgroundColor:
                activeSection === index ? "#C9A84C" : "rgba(255,255,255,0.2)",
              border:
                activeSection === index
                  ? "1px solid rgba(201,168,76,0.5)"
                  : "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                activeSection === index
                  ? "0 0 8px rgba(201,168,76,0.6)"
                  : "none",
              transition: "all 0.3s ease",
            }}
            whileHover={{
              backgroundColor: "#C9A84C",
              width: "7px",
              height: "7px",
              boxShadow: "0 0 6px rgba(201,168,76,0.5)",
            }}
          />
        </motion.button>
      ))}
    </motion.nav>
  );
}
