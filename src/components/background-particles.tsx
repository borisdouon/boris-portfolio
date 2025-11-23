"use client";

import { useEffect, useRef, useState } from "react";

// Configuration constants - easily tweakable
const NODE_COUNT_MULTIPLIER = 15000; // Lower = more nodes
const MAX_CONNECTION_DISTANCE = 150; // Maximum distance for drawing connections
const CURSOR_AURA_RADIUS = 200; // Radius of cursor influence
const PARTICLE_SPEED = 0.2; // Base velocity for particle drift
const CURSOR_LERP_SPEED = 0.15; // Smoothing factor for cursor movement (0-1, lower = smoother)
const MIN_OPACITY = 0.2; // Minimum opacity for particles
const MAX_OPACITY = 0.8; // Maximum opacity for particles
const LINE_OPACITY = 0.15; // Base opacity for connection lines
const PARTICLE_SIZE = 2; // Base size of particles
const PARTICLE_SIZE_HOVER = 4; // Size when near cursor

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  targetOpacity: number;
  targetSize: number;
}

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const colorsRef = useRef<{
    particle: ColorRGB;
    line: ColorRGB;
    cursor: ColorRGB;
  }>({ particle: { r: 255, g: 255, b: 255 }, line: { r: 255, g: 255, b: 255 }, cursor: { r: 255, g: 255, b: 255 } });

  // Read CSS variable and convert HSL to RGB
  const getCSSVariableColor = (variableName: string): ColorRGB => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
    
    // Parse HSL format: "0 0% 98%" or "220 70% 50%"
    const hslMatch = value.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);
    if (!hslMatch) {
      return { r: 255, g: 255, b: 255 }; // Fallback to white
    }

    const h = parseFloat(hslMatch[1]) / 360;
    const s = parseFloat(hslMatch[2]) / 100;
    const l = parseFloat(hslMatch[3]) / 100;

    // Convert HSL to RGB
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // Update colors based on theme
  const updateColors = () => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    if (isDarkMode) {
      // Dark mode: more luminous/neon effect
      const primary = getCSSVariableColor("--primary");
      const muted = getCSSVariableColor("--muted-foreground");
      colorsRef.current = {
        particle: primary,
        line: muted,
        cursor: primary,
      };
    } else {
      // Light mode: softer colors
      const primary = getCSSVariableColor("--primary");
      const accent = getCSSVariableColor("--accent");
      const muted = getCSSVariableColor("--muted-foreground");
      colorsRef.current = {
        particle: primary,
        line: muted,
        cursor: accent,
      };
    }
  };

  // Initialize particles
  const initParticles = (width: number, height: number, reducedMotion: boolean) => {
    const nodeCount = Math.floor((width * height) / NODE_COUNT_MULTIPLIER);
    const particles: Particle[] = [];

    for (let i = 0; i < nodeCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: reducedMotion ? 0 : (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: reducedMotion ? 0 : (Math.random() - 0.5) * PARTICLE_SPEED,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        size: PARTICLE_SIZE,
        opacity: MIN_OPACITY,
        targetOpacity: MIN_OPACITY,
        targetSize: PARTICLE_SIZE,
      });
    }

    particlesRef.current = particles;
  };

  // Linear interpolation for smooth cursor movement
  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  // Animation loop
  const animate = (ctx: CanvasRenderingContext2D, width: number, height: number, reducedMotion: boolean) => {
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;
    const colors = colorsRef.current;
    const cursor = cursorRef.current;

    // Smooth cursor position
    cursor.x = lerp(cursor.x, mouseRef.current.x, CURSOR_LERP_SPEED);
    cursor.y = lerp(cursor.y, mouseRef.current.y, CURSOR_LERP_SPEED);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      if (!reducedMotion) {
        // Update position with drift
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary wrapping
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
      }

      // Calculate distance from cursor
      const dx = cursor.x - particle.x;
      const dy = cursor.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Cursor interaction
      if (distance < CURSOR_AURA_RADIUS && !reducedMotion) {
        const force = (CURSOR_AURA_RADIUS - distance) / CURSOR_AURA_RADIUS;
        const angle = Math.atan2(dy, dx);
        
        // Slight attraction/repulsion
        const attraction = force * 0.5;
        particle.x += Math.cos(angle) * attraction;
        particle.y += Math.sin(angle) * attraction;

        // Increase opacity and size
        particle.targetOpacity = Math.min(MAX_OPACITY, MIN_OPACITY + force * (MAX_OPACITY - MIN_OPACITY));
        particle.targetSize = PARTICLE_SIZE + force * (PARTICLE_SIZE_HOVER - PARTICLE_SIZE);
      } else {
        particle.targetOpacity = MIN_OPACITY;
        particle.targetSize = PARTICLE_SIZE;
      }

      // Smooth opacity and size transitions
      particle.opacity = lerp(particle.opacity, particle.targetOpacity, 0.1);
      particle.size = lerp(particle.size, particle.targetSize, 0.1);

      // Draw connections to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MAX_CONNECTION_DISTANCE) {
          const opacity = LINE_OPACITY * (1 - distance / MAX_CONNECTION_DISTANCE);
          ctx.strokeStyle = `rgba(${colors.line.r}, ${colors.line.g}, ${colors.line.b}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      // Draw particle with glow effect
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 2
      );
      
      const particleColor = isDark
        ? `rgba(${colors.particle.r}, ${colors.particle.g}, ${colors.particle.b}, ${particle.opacity})`
        : `rgba(${colors.particle.r}, ${colors.particle.g}, ${colors.particle.b}, ${particle.opacity * 0.6})`;
      
      gradient.addColorStop(0, particleColor);
      gradient.addColorStop(0.5, particleColor.replace(/[\d.]+\)$/, "0.3)"));
      gradient.addColorStop(1, particleColor.replace(/[\d.]+\)$/, "0)"));

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw cursor aura - make it more visible
    if (!reducedMotion) {
      const gradient = ctx.createRadialGradient(
        cursor.x,
        cursor.y,
        0,
        cursor.x,
        cursor.y,
        CURSOR_AURA_RADIUS
      );
      
      // Increased opacity for better visibility
      const cursorColor = isDark
        ? `rgba(${colors.cursor.r}, ${colors.cursor.g}, ${colors.cursor.b}, 0.25)`
        : `rgba(${colors.cursor.r}, ${colors.cursor.g}, ${colors.cursor.b}, 0.15)`;
      
      gradient.addColorStop(0, cursorColor);
      gradient.addColorStop(0.3, cursorColor.replace(/[\d.]+\)$/, "0.1)"));
      gradient.addColorStop(0.6, cursorColor.replace(/[\d.]+\)$/, "0.05)"));
      gradient.addColorStop(1, cursorColor.replace(/[\d.]+\)$/, "0)"));

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, CURSOR_AURA_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    animationFrameRef.current = requestAnimationFrame(() =>
      animate(ctx, width, height, reducedMotion)
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion preference
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initialize cursor to center of screen
    const initCursor = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseRef.current = { x: centerX, y: centerY };
      cursorRef.current = { x: centerX, y: centerY };
    };

    initCursor();

    // Set up canvas
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Reinitialize particles on resize
      initParticles(width, height, reducedMotion);
      
      // Update cursor position to center on resize
      initCursor();
    };

    resizeCanvas();

    // Update colors on mount
    updateColors();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    // Theme change detection
    const observer = new MutationObserver(() => {
      updateColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Start animation
    animationFrameRef.current = requestAnimationFrame(() =>
      animate(ctx, window.innerWidth, window.innerHeight, reducedMotion)
    );

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}

