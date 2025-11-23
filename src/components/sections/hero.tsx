"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/components/analytics/analytics";
import { FloatingFirstStatus } from "@/components/sections/ai-status-init";
import MiniDebugConsole from "@/components/MiniDebugConsole";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { download } = useAnalytics();

  const handleResumeDownload = () => {
    download("Boris_Douon_Resume.pdf", "resume");
    window.open("/documents/Boris_Douon_Resume.pdf", "_blank");
  };

  const haloAnimation = prefersReducedMotion
    ? { opacity: 0.4 }
    : {
        scale: [0.95, 1.05, 0.95],
        opacity: [0.25, 0.5, 0.25],
        transition: {
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 dark:to-muted/5" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30 dark:opacity-20 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),transparent_55%)]" />
        {/* Animated status indicators */}
        <FloatingFirstStatus />
      </div>

      <div className="relative z-10 w-full max-w-3xl text-center space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-sm uppercase tracking-[0.25em] text-muted-foreground flex items-center justify-center gap-3"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
          <span>AI systems initializing… Agents online • Workflows ready</span>
        </motion.p>

        <div className="relative px-4">
          <motion.div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(251,191,36,0.35),transparent_70%)]"
            animate={haloAnimation}
          />
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent"
              animate={{
                y: ["-20%", "120%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
          >
            <span className="text-gradient-gold">Boris Douon</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground"
        >
          AI Software Engineer | Building Intelligent Systems Architect
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-sm md:text-base text-muted-foreground/90 max-w-2xl mx-auto"
        >
          I build intelligent systems that think, automate, and create value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Button size="lg" variant="gold" className="w-full sm:w-auto" asChild>
            <Link href="#work">Explore My Work</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleResumeDownload}
          >
            Download CV
          </Button>
        </motion.div>
      </div>

      {/* Debug console – desktop */}
      <div className="hidden md:block absolute left-[5%] bottom-[10%] z-20 pointer-events-auto">
        <MiniDebugConsole />
      </div>

      {/* Mobile placement */}
      <div className="mt-10 w-full md:hidden flex justify-center pointer-events-auto">
        <MiniDebugConsole />
      </div>
    </section>
  );
}
