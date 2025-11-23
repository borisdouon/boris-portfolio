"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

const initialLogs = [
  "booting intelligent systems...",
  "✓ agents online",
  "✓ vector memory mounted",
  "✓ workflows synced",
];

const bootMessages = [
  "initializing ai-core...",
  "loading model weights...",
  "connecting to vector db...",
  "syncing workflows...",
];

export default function MiniDebugConsole() {
  const [logs, setLogs] = useState<string[]>(initialLogs);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const bootTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Simulate boot messages on mount
  useEffect(() => {
    if (shouldReduceMotion) {
      setLogs([...initialLogs, ...bootMessages]);
      return;
    }

    let messageIndex = 0;
    const addBootMessage = () => {
      if (messageIndex < bootMessages.length) {
        setIsTyping(true);
        setTimeout(() => {
          setLogs((prev) => {
            const newLogs = [...prev, bootMessages[messageIndex]];
            // Keep only last 7 lines
            return newLogs.slice(-7);
          });
          setIsTyping(false);
          messageIndex++;
          if (messageIndex < bootMessages.length) {
            bootTimeoutRef.current = setTimeout(addBootMessage, 1000);
          }
        }, 800);
      }
    };

    bootTimeoutRef.current = setTimeout(addBootMessage, 2000);

    return () => {
      if (bootTimeoutRef.current) {
        clearTimeout(bootTimeoutRef.current);
      }
    };
  }, [shouldReduceMotion]);

  const processCommand = (cmd: string) => {
    activateConsole();
    const command = cmd.trim().toLowerCase();
    const newLogs: string[] = [`> ${cmd}`];

    switch (command) {
      case "help":
        newLogs.push("commands: help, status, stack, clear");
        break;
      case "status":
        newLogs.push("ai-core: stable");
        newLogs.push("latency: 8ms");
        newLogs.push("jobs: 3 running");
        break;
      case "stack":
        newLogs.push("stack: next.js · react · node · python · ai workflows");
        break;
      case "clear":
        setLogs(["console cleared. watching systems..."]);
        return;
      case "":
        return;
      default:
        newLogs.push("unknown command. type 'help'.");
    }

    setLogs((prev) => {
      const updated = [...prev, ...newLogs];
      return updated.slice(-7);
    });
  };

  // Handle inactivity timeout - fade out after 8 seconds of no interaction
  useEffect(() => {
    if (!isActive) return;

    // Clear existing timeout
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    // Set new timeout to fade out
    inactivityTimeoutRef.current = setTimeout(() => {
      setIsActive(false);
    }, 8000); // 8 seconds of inactivity

    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [isActive, logs, input]);

  const activateConsole = () => {
    setIsActive(true);
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    activateConsole();
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    activateConsole();
    setInput(e.target.value);
  };

  const handleContainerClick = () => {
    activateConsole();
    inputRef.current?.focus();
  };

  const floatingAnimation = shouldReduceMotion
    ? { 
        opacity: isActive ? 1 : 0.3,
        y: 0, 
        scale: isActive ? 1 : 0.95
      }
    : {
        opacity: isActive ? 1 : 0.3,
        y: isActive ? [0, -6, 0, 4, 0] : 0,
        scale: isActive ? 1 : 0.95,
        transition: isActive
          ? {
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              y: {
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror" as const,
                ease: "easeInOut",
              },
            }
          : { duration: 0.4 },
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={floatingAnimation}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={handleContainerClick}
      onMouseEnter={activateConsole}
      className="relative w-80 h-44 max-w-xs rounded-2xl border border-border/70 bg-background/80 dark:bg-background/90 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.35)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.5)] px-4 py-3 text-xs font-mono text-foreground cursor-text hover:border-border/90 hover:shadow-[0_20px_70px_rgba(0,0,0,0.4)] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-border/30">
        <span className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
          AI DEBUG CONSOLE
        </span>
        <div className="flex items-center gap-1.5">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </span>
          <span className="text-[0.65rem] text-emerald-400 font-medium">ONLINE</span>
        </div>
      </div>

      {/* Logs area */}
      <div className="mt-2 mb-2 h-24 overflow-y-auto overflow-x-hidden bg-background/60 dark:bg-background/40 rounded px-2 py-1.5 scrollbar-thin scrollbar-thumb-border/50 scrollbar-track-transparent">
        <div className="space-y-0.5">
          {logs.map((log, index) => (
            <div
              key={index}
              className="text-[0.7rem] leading-relaxed text-muted-foreground whitespace-pre-wrap break-words"
            >
              {log}
            </div>
          ))}
          {isTyping && (
            <div className="text-[0.7rem] text-muted-foreground/60">
              <span className="inline-block w-2 h-3 bg-emerald-400/80 animate-pulse" />
            </div>
          )}
          <div ref={logsEndRef} />
        </div>
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 pt-1 border-t border-border/30">
        <span className="text-[0.7rem] text-accent font-medium">{" >_"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={activateConsole}
          placeholder="type 'help' or 'status'..."
          className="bg-transparent outline-none flex-1 text-[0.7rem] text-foreground placeholder:text-muted-foreground/50"
          autoComplete="off"
        />
      </div>
    </motion.div>
  );
}

