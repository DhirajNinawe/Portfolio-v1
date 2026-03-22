import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import SpaceCanvas from "./SpaceCanvas";
import HeroSection from "./HeroSection";
import EditingSection from "./EditingSection";
import WebDesignSection from "./WebDesignSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import FloatingNav from "./FloatingNav";

const SECTION_IDS = [
  "hero",
  "editing",
  "webdesign",
  "about",
  "contact",
];

function SectionDivider() {
  return (
    <div
      className="relative mx-auto my-4"
      style={{
        height: "1px",
        maxWidth: "600px",
        background:
          "linear-gradient(90deg, transparent, rgba(201,168,76,0.08), rgba(26,58,107,0.15), rgba(201,168,76,0.08), transparent)",
      }}
    />
  );
}

function Home() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const [particleDensity, setParticleDensity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set body class for global styles
  useEffect(() => {
    document.body.classList.add("dhiraj-studio");
    return () => document.body.classList.remove("dhiraj-studio");
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouseX((e.clientX / window.innerWidth - 0.5));
    setMouseY((e.clientY / window.innerHeight - 0.5));
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      setNavVisible(scrollTop > window.innerHeight * 0.3);

      // Determine active section
      const windowMid = scrollTop + window.innerHeight / 2;
      let active = 0;
      SECTION_IDS.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (windowMid >= top && windowMid < bottom) {
            active = index;
          }
        }
      });
      setActiveSection(active);

      // Particle density decreases in about/contact sections
      if (active >= 3) {
        setParticleDensity(Math.max(0.2, 1 - (active - 2) * 0.4));
      } else {
        setParticleDensity(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (index: number) => {
    const el = document.getElementById(SECTION_IDS[index]);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        background: "linear-gradient(180deg, #080810 0%, #0A0A2E 40%, #0D1B4B 70%, #080810 100%)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* 3D Space Canvas — fixed background */}
      <SpaceCanvas
        scrollProgress={scrollProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        particleDensityMultiplier={particleDensity}
      />

      {/* Floating Navigation */}
      <FloatingNav
        activeSection={activeSection}
        onNavigate={navigateTo}
        visible={navVisible}
      />

      {/* Scroll progress line */}
      <motion.div
        className="fixed top-0 left-0 h-px"
        style={{
          background: "linear-gradient(90deg, #C9A84C, #F0C060)",
          width: `${scrollProgress * 100}%`,
          zIndex: 200,
          boxShadow: "0 0 8px rgba(201,168,76,0.6)",
        }}
      />

      {/* Content Sections */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div id="hero">
          <HeroSection mouseX={mouseX} mouseY={mouseY} />
        </div>

        <SectionDivider />

        <div id="editing">
          <EditingSection />
        </div>

        <SectionDivider />

        <div id="webdesign">
          <WebDesignSection />
        </div>

        <SectionDivider />

        <div id="about">
          <AboutSection />
        </div>

        <SectionDivider />

        <div id="contact">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

export default Home;
