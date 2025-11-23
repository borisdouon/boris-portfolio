"use client";

import { useEffect, useRef, useState } from "react";

// Configuration constants - easily tweakable
const CURSOR_RADIUS = 8; // Radius of inner circle
const MIDDLE_RING_RADIUS = 16; // Radius of middle ring
const OUTER_RING_RADIUS = 24; // Radius of outer ring
const GLOW_RADIUS = 40; // Radius of outer glow
const FOLLOW_SPEED = 0.15; // Easing speed (0-1, lower = smoother)
const CLICK_SCALE = 1.3; // Scale multiplier on click
const HOVER_SCALE = 1.2; // Scale multiplier on hover

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Update theme detection
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Smooth cursor following with easing
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initialize cursor to center
    const initCursor = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseRef.current = { x: centerX, y: centerY };
      cursorPosRef.current = { x: centerX, y: centerY };
      cursor.style.transform = `translate3d(${centerX}px, ${centerY}px, 0)`;
    };

    initCursor();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Detect hover on interactive elements
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("[data-interactive]") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      if (isInteractive) {
        setIsHovering(true);
      } else {
        // Small delay before removing hover state for smoother UX
        hoverTimeoutRef.current = setTimeout(() => {
          setIsHovering(false);
        }, 50);
      }
    };


    // Smooth animation loop
    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      cursorPosRef.current.x = lerp(
        cursorPosRef.current.x,
        mouseRef.current.x,
        FOLLOW_SPEED
      );
      cursorPosRef.current.y = lerp(
        cursorPosRef.current.y,
        mouseRef.current.y,
        FOLLOW_SPEED
      );

      cursor.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", checkHover);

    const animationId = requestAnimationFrame(animate);

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", checkHover);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scale = isClicking ? CLICK_SCALE : isHovering ? HOVER_SCALE : 1;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate3d(0, 0, 0)",
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      {/* Outer glow */}
      <div
        className="cursor-glow"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${GLOW_RADIUS * 2}px`,
          height: `${GLOW_RADIUS * 2}px`,
          borderRadius: "50%",
          background: isDark
            ? `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0.1) 40%, transparent 70%)`
            : `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, hsl(var(--primary) / 0.08) 40%, transparent 70%)`,
          filter: "blur(8px)",
          scale: scale.toString(),
          transition: "scale 0.15s ease-out",
        }}
      />

      {/* Outer ring */}
      <div
        className="cursor-outer-ring"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${OUTER_RING_RADIUS * 2}px`,
          height: `${OUTER_RING_RADIUS * 2}px`,
          borderRadius: "50%",
          border: `1px solid ${isDark ? "hsl(var(--primary) / 0.4)" : "hsl(var(--primary) / 0.3)"}`,
          scale: scale.toString(),
          transition: "scale 0.15s ease-out, border-color 0.2s ease",
        }}
      />

      {/* Middle ring */}
      <div
        className="cursor-middle-ring"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${MIDDLE_RING_RADIUS * 2}px`,
          height: `${MIDDLE_RING_RADIUS * 2}px`,
          borderRadius: "50%",
          border: `1px solid ${isDark ? "hsl(var(--primary) / 0.6)" : "hsl(var(--primary) / 0.5)"}`,
          scale: scale.toString(),
          transition: "scale 0.15s ease-out, border-color 0.2s ease",
        }}
      />

      {/* Inner filled circle */}
      <div
        className="cursor-inner"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${CURSOR_RADIUS * 2}px`,
          height: `${CURSOR_RADIUS * 2}px`,
          borderRadius: "50%",
          background: isDark
            ? `radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)`
            : `radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.9) 100%)`,
          boxShadow: isDark
            ? `0 0 ${CURSOR_RADIUS * 2}px hsl(var(--primary) / 0.6), 0 0 ${CURSOR_RADIUS * 4}px hsl(var(--primary) / 0.3)`
            : `0 0 ${CURSOR_RADIUS * 2}px hsl(var(--primary) / 0.4), 0 0 ${CURSOR_RADIUS * 4}px hsl(var(--primary) / 0.2)`,
          scale: scale.toString(),
          transition: "scale 0.15s ease-out, background 0.2s ease, box-shadow 0.2s ease",
        }}
      />
    </div>
  );
}

