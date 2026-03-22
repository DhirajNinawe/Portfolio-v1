import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SpaceCanvasProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  particleDensityMultiplier?: number;
}

export default function SpaceCanvas({
  scrollProgress,
  mouseX,
  mouseY,
  particleDensityMultiplier = 1,
}: SpaceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 2000;
    const starsPositions = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);
    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 200;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      starsSizes[i] = Math.random() * 1.5 + 0.3;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute("size", new THREE.BufferAttribute(starsSizes, 1));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xe8e8f0,
      size: 0.12,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // Floating particles
    const particlesCount = 800;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      const isGold = Math.random() > 0.6;
      if (isGold) {
        colors[i * 3] = 0.79;
        colors[i * 3 + 1] = 0.66;
        colors[i * 3 + 2] = 0.3;
      } else {
        colors[i * 3] = 0.1;
        colors[i * 3 + 1] = 0.23;
        colors[i * 3 + 2] = 0.42;
      }
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Bloom light sphere
    const glowGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x1a3a6b,
      transparent: true,
      opacity: 0.1,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    glowSphere.position.set(0, 0, -2);
    scene.add(glowSphere);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.005;

      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      const camera = cameraRef.current;
      const particles = particlesRef.current;
      const stars = starsRef.current;

      // Camera Z movement based on scroll
      const targetZ = 5 - scrollProgress * 20;
      camera.position.z += (targetZ - camera.position.z) * 0.05;

      // Mouse parallax on camera
      const targetX = mouseX * 1.5;
      const targetY = -mouseY * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;

      if (particles) {
        particles.rotation.y = timeRef.current * 0.05;
        particles.rotation.x = timeRef.current * 0.02;
        const mat = particles.material as THREE.PointsMaterial;
        mat.opacity = 0.6 * particleDensityMultiplier;
      }

      if (stars) {
        stars.rotation.y = timeRef.current * 0.01;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [scrollProgress, mouseX, mouseY, particleDensityMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
