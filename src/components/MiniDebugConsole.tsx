"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Terminal, X, ChevronUp, Maximize2, Minimize2, Cpu, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasNewActivity, setHasNewActivity] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const bootTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTo({
        top: logsContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    if (!isExpanded && logs.length > initialLogs.length) {
      setHasNewActivity(true);
    }
  }, [logs, isExpanded]);

  // Onboarding: Auto-expand then minimize on every visit
  useEffect(() => {
    // Initial delay before opening
    const openTimeout = setTimeout(() => {
      setIsExpanded(true);

      // Auto-minimize after being open for a short duration
      const closeTimeout = setTimeout(() => {
        setIsExpanded(false);
      }, 2500);

      return () => clearTimeout(closeTimeout);
    }, 1500);

    return () => clearTimeout(openTimeout);
  }, []);

  // Simulate boot messages on mount
  useEffect(() => {
    if (shouldReduceMotion) {
      setLogs([...initialLogs, ...bootMessages]);
      return;
    }

    let messageIndex = 0;
    let innerTimeoutId: NodeJS.Timeout | null = null;

    const addBootMessage = () => {
      if (messageIndex < bootMessages.length) {
        setIsTyping(true);
        innerTimeoutId = setTimeout(() => {
          const currentMessage = bootMessages[messageIndex];
          if (currentMessage) {
            setLogs((prev) => [...prev, currentMessage].slice(-15));
          }
          setIsTyping(false);
          messageIndex++;
          if (messageIndex < bootMessages.length) {
            bootTimeoutRef.current = setTimeout(addBootMessage, 1500);
          }
        }, 800);
      }
    };

    bootTimeoutRef.current = setTimeout(addBootMessage, 3000);

    return () => {
      if (bootTimeoutRef.current) clearTimeout(bootTimeoutRef.current);
      if (innerTimeoutId) clearTimeout(innerTimeoutId);
    };
  }, [shouldReduceMotion]);

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const newLogs: string[] = [`> ${cmd}`];

    switch (command) {
      case "help":
        newLogs.push("commands: help, status, stack, clear, exit");
        break;
      case "status":
        newLogs.push("ai-core: stable");
        newLogs.push("latency: 12ms");
        newLogs.push("agents: cognitive-prime, data-synth, vision-node");
        break;
      case "stack":
        newLogs.push("tech: next.js 15 · react 19 · motion · tailwind 4");
        break;
      case "clear":
        setLogs(["console cleared. monitoring core systems..."]);
        return;
      case "exit":
        setIsExpanded(false);
        return;
      case "":
        return;
      default:
        newLogs.push(`command not found: ${command}. type 'help' for available commands.`);
    }

    setLogs((prev) => {
      const updated = [...prev, ...newLogs];
      return updated.slice(-15);
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    }
    if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (hasNewActivity) setHasNewActivity(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="minimized"
            layoutId="console-container"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={toggleExpand}
            className="group pointer-events-auto relative flex items-center justify-center w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-accent/40 hover:shadow-accent/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <Terminal className="w-6 h-6 text-foreground/70 group-hover:text-accent transition-colors" />
              {hasNewActivity && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
              )}
            </div>

            {/* Tooltip-like label on hover */}
            <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-popover/90 border border-border/50 text-[10px] font-mono text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
              AI DEBUG CONSOLE
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            layoutId="console-container"
            initial={{ opacity: 0, scale: 0.9, y: 30, width: 60, height: 60 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              width: typeof window !== "undefined" && window.innerWidth < 640 ? "calc(100vw - 48px)" : 380,
              height: 480
            }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="pointer-events-auto flex flex-col rounded-2xl bg-background/95 backdrop-blur-2xl border border-border shadow-[0_20px_70px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-accent/10 border border-accent/20">
                  <Cpu className="w-3.5 h-3.5 text-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-foreground uppercase">
                    AI Systems Console
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-emerald-600 dark:text-emerald-500/80 uppercase tracking-tighter">Live Monitor</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleExpand}
                  className="p-1.5 rounded-md hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Logs Area */}
            <div
              ref={logsContainerRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent selection:bg-accent/20"
            >
              <div className="space-y-1.5">
                {logs.filter(log => typeof log === "string").map((log, index) => (
                  <div key={index} className={cn(
                    "whitespace-pre-wrap break-words",
                    log.startsWith(">") ? "text-accent font-medium" : "text-muted-foreground"
                  )}>
                    {log}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-muted-foreground/60">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span className="animate-pulse">Processing...</span>
                  </div>
                )}
                <div className="h-2" />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-muted/30 border-t border-border">
              <div className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-border focus-within:border-accent/40 transition-colors">
                <span className="text-accent font-bold text-xs select-none">❯</span>
                <input
                  ref={inputRef}
                  autoFocus
                  data-interactive
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Execute command... (try 'help')"
                  className="w-full bg-transparent outline-none text-[11px] font-mono text-foreground placeholder:text-muted-foreground"
                  autoComplete="off"
                />
              </div>
              <div className="mt-2 flex justify-between items-center px-1">
                <span className="text-[8px] font-mono text-muted-foreground uppercase">v2.0.4-alpha</span>
                <div className="flex gap-2 text-[8px] font-mono text-muted-foreground">
                  <span>ESC to exit</span>
                  <span>ENTER to send</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


