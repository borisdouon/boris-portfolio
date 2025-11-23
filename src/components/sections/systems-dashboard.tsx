"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";

/**
 * Systems Dashboard Section
 * 
 * Live AI control panel with highly animated, reactive cards.
 * Features:
 * - Strong cinematic scroll reveal with staggered entrance
 * - Idle floating/breathing with rotation (8-12px amplitude)
 * - Strong cursor-reactive tilt and magnetic effect (3D rotation)
 * - Cursor-follow glow inside each card
 * - Internal signal particles moving slowly
 * - Clear status pulse animation
 * - Enhanced hover depth and glow
 * 
 * To add/edit systems: Modify the `SYSTEM_CARDS` array below.
 * To adjust animation timing: Change constants (CARD_STAGGER, FLOAT_AMPLITUDE, FLOAT_DURATION).
 * To customize card styling: Modify the `baseCardClasses` constant.
 */

type SystemStatus = "Online" | "Optimized" | "Scalable" | "Improving" | "High-speed";

type SystemCard = {
  id: string;
  systemCode: string;
  status: SystemStatus;
  title: string;
  tagline: string;
  bullets: string[];
  // New fields for holographic detail view:
  longDescription: string;
  keyPoints: string[]; // 3–5 deeper bullets
  hologramLabel?: string; // e.g. "DATA FLOW MAP", "OBSERVABILITY STACK"
};

const SYSTEM_CARDS: SystemCard[] = [
  {
    id: "01",
    systemCode: "SYSTEM 01 · INTELLIGENT AUTOMATION",
    status: "Online",
    title: "Intelligent Automation & AI Workflows",
    tagline: "Orchestrating models, agents and APIs to automate real work.",
    bullets: [
      "LLMs, vector search, APIs, webhooks",
      "Agents, pipelines, retrieval, monitoring",
    ],
    longDescription:
      "I build AI-powered automation systems that connect language models, vector databases, and APIs into intelligent workflows. These systems learn from context, retrieve relevant information, and execute complex tasks autonomously while maintaining observability and control.",
    keyPoints: [
      "Design agent architectures that chain LLM calls with tool use and memory.",
      "Implement RAG pipelines with vector search for context-aware responses.",
      "Create webhook-driven workflows that trigger actions across services.",
      "Build monitoring and logging systems to track AI decision-making.",
      "Ensure reliability through retries, fallbacks, and human-in-the-loop checkpoints.",
    ],
    hologramLabel: "AI WORKFLOW ARCHITECTURE",
  },
  {
    id: "02",
    systemCode: "SYSTEM 02 · EXPERIENCE",
    status: "Optimized",
    title: "Interface & Experience Engine",
    tagline: "Building fast, reactive UIs that feel alive and intentional.",
    bullets: [
      "React, Next.js, TypeScript, Tailwind",
      "Design systems, animations, dashboards",
    ],
    longDescription:
      "I craft user interfaces that respond instantly to user actions, with smooth animations and thoughtful micro-interactions. Every component is built with performance in mind, using modern React patterns and optimized rendering strategies.",
    keyPoints: [
      "Build component libraries with consistent design tokens and patterns.",
      "Implement complex animations using Framer Motion for fluid interactions.",
      "Create responsive layouts that adapt seamlessly across devices.",
      "Optimize bundle sizes and rendering performance for fast load times.",
      "Design accessible interfaces that work for all users.",
    ],
    hologramLabel: "UI COMPONENT SYSTEM",
  },
  {
    id: "03",
    systemCode: "SYSTEM 03 · INFRASTRUCTURE",
    status: "Scalable",
    title: "Backend & Infrastructure Core",
    tagline: "Designing resilient backends that support intelligent behavior.",
    bullets: [
      "Node.js / Python, REST & WebSocket APIs",
      "Postgres, Redis, queues, background jobs",
    ],
    longDescription:
      "I architect backend systems that scale horizontally, handle high concurrency, and maintain data consistency. These systems support real-time features, background processing, and intelligent caching strategies.",
    keyPoints: [
      "Design RESTful and WebSocket APIs that support real-time communication.",
      "Implement database schemas optimized for query performance and scalability.",
      "Build job queues and background workers for async processing.",
      "Set up caching layers with Redis for fast data retrieval.",
      "Ensure system reliability through error handling, retries, and monitoring.",
    ],
    hologramLabel: "INFRASTRUCTURE DIAGRAM",
  },
  {
    id: "04",
    systemCode: "SYSTEM 04 · DATA & METRICS",
    status: "Improving",
    title: "Data, Observability & Experimentation",
    tagline: "Measuring, logging and iterating instead of guessing.",
    bullets: [
      "Analytics & dashboards",
      "Experimentation, logging, CI/CD",
    ],
    longDescription:
      "I design observability layers that make systems explain themselves: traces, metrics, logs and experiments are wired to answer real product questions, not just collect data.",
    keyPoints: [
      "Set up metrics and dashboards tied to business and reliability goals.",
      "Instrument APIs, jobs and workflows for traces and logs.",
      "Design experiments and feature flags for safe iteration.",
      "Use CI/CD and monitoring to close the feedback loop.",
    ],
    hologramLabel: "OBSERVABILITY STACK MAP",
  },
  {
    id: "05",
    systemCode: "SYSTEM 05 · LAB",
    status: "High-speed",
    title: "Creative Tech & Prototyping Lab",
    tagline: "Rapid prototypes to validate ideas in days, not months.",
    bullets: [
      "Cursor, Windsurf, AI coding assistants",
      "Experimental tools, visual demos, POCs",
    ],
    longDescription:
      "I use AI-powered development tools to rapidly prototype and validate ideas. This lab is where experimental concepts become tangible demos, testing new approaches to problem-solving and user experience.",
    keyPoints: [
      "Leverage AI coding assistants to accelerate development cycles.",
      "Build proof-of-concepts that demonstrate technical feasibility.",
      "Create visual demos and interactive prototypes for stakeholder feedback.",
      "Experiment with emerging technologies and frameworks.",
      "Iterate quickly based on user feedback and technical constraints.",
    ],
    hologramLabel: "PROTOTYPE WORKFLOW",
  },
];

// Animation constants
const CARD_STAGGER = 0.12;
const FLOAT_AMPLITUDE = 10; // px up/down (increased from 6)
const FLOAT_DURATION = 7; // seconds

// Base card classes
const baseCardClasses =
  "relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm px-5 py-5 sm:px-6 sm:py-6 shadow-sm group transition-shadow transition-transform duration-300 hover:shadow-[0_0_45px_rgba(0,0,0,0.7)] hover:border-accent/70";

// Animation variants - stronger scroll reveal
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: CARD_STAGGER,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Individual card component with all enhanced animations
function SystemCard({
  card,
  index,
  onCardClick,
}: {
  card: SystemCard;
  index: number;
  onCardClick: (card: SystemCard) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const cardRef = useRef<HTMLElement>(null);

  // Cursor-follow glow using transform to create gradient string
  const spotlight = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(56,189,248,0.22), transparent 60%)`
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    const maxTranslate = 12;
    const maxRotate = 6; // degrees

    // Translation
    x.set((offsetX / rect.width) * maxTranslate);
    y.set((offsetY / rect.height) * maxTranslate);

    // 3D Rotation (tilt)
    rotateX.set((-offsetY / rect.height) * maxRotate);
    rotateY.set((offsetX / rect.width) * maxRotate);

    // Cursor-follow glow position (percentage 0-100)
    mx.set(((offsetX / rect.width + 1) / 2) * 100);
    my.set(((offsetY / rect.height + 1) / 2) * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
    mx.set(50);
    my.set(30);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      className={baseCardClasses + " cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent"}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      role="button"
      tabIndex={0}
      onClick={() => onCardClick(card)}
      onKeyDown={(e) => e.key === "Enter" && onCardClick(card)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        shouldReduceMotion
          ? {}
          : {
              y: [0, -FLOAT_AMPLITUDE, 0, 6, 0],
              rotate: [-1.2, 1.2, -0.6, 0.6, 0],
              transition: {
                duration: FLOAT_DURATION + index,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }
      }
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.03,
              transition: { duration: 0.25, ease: "easeOut" },
            }
      }
    >
      <div className="relative">
        {/* Cursor-follow glow layer */}
        {!shouldReduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-[-40%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen"
            style={{ backgroundImage: spotlight }}
          />
        )}

        {/* Internal signal particles */}
        {!shouldReduceMotion && (
          <>
            <motion.span
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-accent/70 z-0"
              style={{ top: "10%", left: "20%" }}
              animate={{
                x: [0, 40, -20, 0],
                y: [0, -30, 10, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-accent/50 z-0"
              style={{ bottom: "15%", right: "18%" }}
              animate={{
                x: [0, -30, 15, 0],
                y: [0, 20, -25, 0],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-accent/60 z-0"
              style={{ top: "60%", left: "70%" }}
              animate={{
                x: [0, 25, -15, 0],
                y: [0, -20, 15, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          </>
        )}

        {/* Foreground content */}
        <div className="relative z-10">
          {/* Top Row: Label and Status */}
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground mb-2">
            <span>{card.systemCode}</span>
            <div className="flex items-center gap-1 text-[0.7rem] text-muted-foreground">
              <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                {!shouldReduceMotion && (
                  <span
                    className="absolute inline-block h-3 w-3 rounded-full bg-emerald-500/40"
                    style={{
                      animation: "status-pulse-strong 2.4s ease-out infinite",
                    }}
                  />
                )}
              </span>
              <span className="uppercase tracking-wide">{card.status}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mt-3">
            {card.title}
          </h3>

          {/* Tagline */}
          <p className="mt-1 text-sm text-muted-foreground">{card.tagline}</p>

          {/* Bullets */}
          <ul className="mt-3 space-y-1">
            {card.bullets.map((bullet, bulletIndex) => (
              <li
                key={bulletIndex}
                className="text-xs text-muted-foreground flex items-start gap-2"
              >
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

// Hologram Illustration Component
type HologramIllustrationProps = {
  system: SystemCard;
};

const HologramIllustration: React.FC<HologramIllustrationProps> = ({
  system,
}) => {
  const label = system.hologramLabel ?? "AI WORKFLOW ARCHITECTURE";
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex-[0.9] min-w-[260px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, x: 24, y: 16 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 24, y: 16 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-md aspect-[4/3] rounded-[24px] border border-[var(--system-holo-border)] bg-[radial-gradient(circle_at_top_left,var(--system-modal-glow),var(--system-holo-bg))] backdrop-blur-lg shadow-[0_0_60px_rgba(0,0,0,0.45)] dark:shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -inset-12 opacity-25 dark:opacity-35">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.32),transparent_60%)]" />
        </div>

        {/* Grid + scanlines */}
        <div className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20">
          <div className="w-full h-full bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:26px_26px,26px_26px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-10 hologram-scanlines" />

        {/* Scan bar */}
        {!shouldReduceMotion && (
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-12 bg-gradient-to-b from-accent/15 via-accent/0 to-transparent"
            initial={{ y: "-20%" }}
            animate={{ y: ["-20%", "110%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Inner frame that floats slightly */}
        <motion.div
          className="relative z-10 m-4 rounded-2xl border border-[var(--system-holo-border)] bg-[var(--system-holo-bg)] px-4 py-3 flex flex-col gap-3"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -6, 0, 4, 0],
                  transition: {
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                }
          }
        >
          {/* Header */}
          <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground mb-1">
            <span>{label}</span>
            <span className="inline-flex items-center gap-1 text-[0.65rem]">
              <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                {!shouldReduceMotion && (
                  <span className="absolute h-3 w-3 rounded-full bg-emerald-500/40 animate-[status-pulse-strong_2.4s_ease-out_infinite]" />
                )}
              </span>
              Active
            </span>
          </div>

          {/* Three blocks diagram, brighter for light mode */}
          <div className="mt-1 grid grid-cols-3 gap-2 text-[0.72rem]">
            <div className="col-span-1 rounded-lg border border-[var(--system-holo-border)] bg-[var(--system-holo-bg)] px-2.5 py-2">
              <p className="text-[0.65rem] text-muted-foreground mb-1">Inputs</p>
              <p className="font-medium text-foreground">
                Events<br />
                Metrics<br />
                Logs
              </p>
            </div>
            <div className="col-span-1 rounded-lg border border-[var(--system-holo-border)] bg-[var(--system-holo-bg)] px-2.5 py-2">
              <p className="text-[0.65rem] text-muted-foreground mb-1">
                Processing
              </p>
              <p className="font-medium text-foreground">
                Pipelines<br />
                Tracing<br />
                Aggregation
              </p>
            </div>
            <div className="col-span-1 rounded-lg border border-[var(--system-holo-border)] bg-[var(--system-holo-bg)] px-2.5 py-2">
              <p className="text-[0.65rem] text-muted-foreground mb-1">Outputs</p>
              <p className="font-medium text-foreground">
                Dashboards<br />
                Alerts<br />
                Experiments
              </p>
            </div>
          </div>

          {/* Signal dots */}
          {!shouldReduceMotion && (
            <>
              <motion.span
                className="pointer-events-none absolute h-1 w-1 rounded-full bg-accent/80"
                style={{ top: "18%", left: "12%" }}
                animate={{ x: [0, 80, 140, 0], y: [0, -12, 20, 0] }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="pointer-events-none absolute h-1 w-1 rounded-full bg-accent/50"
                style={{ bottom: "16%", right: "10%" }}
                animate={{ x: [0, -70, -15, 0], y: [0, 18, -24, 0] }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export function SystemsDashboard() {
  const [activeSystem, setActiveSystem] = useState<SystemCard | null>(null);

  // Handle Escape key to close modal
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveSystem(null);
    }
    if (activeSystem) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeSystem]);

  return (
    <section
      id="systems"
      className="relative z-10 mt-20 sm:mt-28 md:mt-32 px-4 sm:px-6 lg:px-8 pb-32 sm:pb-40 md:pb-48"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Systems I Design & Operate
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            I don't just write code — I build systems. Here are the engines I design, connect and
            maintain to ship intelligent products.
          </p>
        </motion.div>

        {/* Systems Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:gap-7 lg:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        >
          {SYSTEM_CARDS.map((card, index) => (
            <SystemCard
              key={card.id}
              card={card}
              index={index}
              onCardClick={setActiveSystem}
            />
          ))}
        </motion.div>
      </div>

      {/* Holographic Modal */}
      <AnimatePresence>
        {activeSystem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-white/80 dark:bg-[#050505]/90 backdrop-blur-xl"
            onClick={() => setActiveSystem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              className="relative max-w-5xl w-[92vw] md:w-[80vw] rounded-[28px] border border-border/70 bg-[radial-gradient(circle_at_top_left,var(--system-modal-glow),var(--system-modal-bg))] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)] dark:shadow-[0_45px_140px_rgba(0,0,0,0.85)] overflow-hidden px-6 py-6 sm:px-9 sm:py-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveSystem(null)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 dark:border-border/50 bg-background/80 dark:bg-background/90 text-muted-foreground hover:text-foreground hover:border-accent/70 hover:bg-background/95 dark:hover:bg-background/85 transition-colors shadow-[0_0_18px_rgba(0,0,0,0.25)] dark:shadow-[0_0_18px_rgba(0,0,0,0.5)] z-20"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Two-column layout */}
              <div className="relative flex flex-col md:flex-row gap-8 md:gap-10">
                {/* LEFT COLUMN: text */}
                <div className="flex-[1.1] min-w-0">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                    {activeSystem.systemCode}
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-semibold text-foreground">
                    {activeSystem.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {activeSystem.longDescription}
                  </p>

                  <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                    {activeSystem.keyPoints.map((point, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/80 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT COLUMN: hologram box */}
                <HologramIllustration system={activeSystem} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
