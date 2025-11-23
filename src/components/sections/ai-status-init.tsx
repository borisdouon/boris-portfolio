"use client";

import { useState, useEffect, useRef } from "react";

// Status messages for the boot sequence
export const STATUS_STEPS = [
  "Booting intelligent systems…",
  "Loading AI workflows & tools…",
  "Loading AI workflows & tools…",
  "Portfolio model v2025 online.",
] as const;

// Configuration constants
const CHAR_DELAY_MS = 40; // Delay between each character (30-50ms range)
const STEP_DELAY_MS = 600; // Delay between completing one step and starting the next (500-800ms range)

export function AiStatusInit() {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedTexts, setDisplayedTexts] = useState<string[]>(
    Array(STATUS_STEPS.length).fill("")
  );
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(STATUS_STEPS.length).fill(false)
  );
  const [isSkipped, setIsSkipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef<number>(0);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Reset character index when step changes
  useEffect(() => {
    if (!isSkipped && !prefersReducedMotion) {
      charIndexRef.current = displayedTexts[currentStep]?.length || 0;
    }
  }, [currentStep, isSkipped, prefersReducedMotion]);

  // Typewriter effect logic
  useEffect(() => {
    // If reduced motion is preferred, show all messages instantly
    if (prefersReducedMotion) {
      setDisplayedTexts([...STATUS_STEPS]);
      setCompletedSteps(Array(STATUS_STEPS.length).fill(true));
      return;
    }

    // If skipped, show all messages instantly
    if (isSkipped) {
      setDisplayedTexts([...STATUS_STEPS]);
      setCompletedSteps(Array(STATUS_STEPS.length).fill(true));
      return;
    }

    // If all steps are completed, stop
    if (currentStep >= STATUS_STEPS.length) {
      return;
    }

    const currentMessage = STATUS_STEPS[currentStep];
    
    // Reset character index when moving to a new step
    const currentDisplayedLength = displayedTexts[currentStep]?.length || 0;
    if (currentDisplayedLength === 0) {
      charIndexRef.current = 0;
    } else {
      charIndexRef.current = currentDisplayedLength;
    }

    // If current message is fully typed
    if (charIndexRef.current >= currentMessage.length) {
      // Mark current step as completed
      setCompletedSteps((prev) => {
        const newCompleted = [...prev];
        newCompleted[currentStep] = true;
        return newCompleted;
      });

      // Wait before moving to next step
      timeoutRef.current = setTimeout(() => {
        if (currentStep < STATUS_STEPS.length - 1) {
          charIndexRef.current = 0;
          setCurrentStep((prev) => prev + 1);
        }
      }, STEP_DELAY_MS);

      return;
    }

    // Clear any existing interval before starting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Type next character
    intervalRef.current = setInterval(() => {
      charIndexRef.current += 1;
      const newLength = charIndexRef.current;
      
      setDisplayedTexts((prev) => {
        const newTexts = [...prev];
        newTexts[currentStep] = currentMessage.substring(0, newLength);
        return newTexts;
      });

      // If we've typed all characters, clear interval
      if (newLength >= currentMessage.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, CHAR_DELAY_MS);

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [currentStep, isSkipped, prefersReducedMotion]);

  // Handle skip functionality
  const handleSkip = () => {
    setIsSkipped(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayedTexts([...STATUS_STEPS]);
    setCompletedSteps(Array(STATUS_STEPS.length).fill(true));
  };

  return (
    <div
      onClick={handleSkip}
      className="mt-4 max-w-md mx-auto rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm px-4 py-3 text-xs sm:text-sm font-mono text-muted-foreground shadow-[0_0_30px_rgba(0,0,0,0.25)] cursor-pointer hover:border-border/80 transition-colors"
      role="button"
      tabIndex={0}
      aria-label="AI Status Initialization - Click to skip animation"
    >
      {STATUS_STEPS.map((step, index) => {
        // Skip the first three lines (index 0, 1, and 2) - they're rendered separately in the background
        // Also skip index 3 as it's removed
        if (index === 0 || index === 1 || index === 2 || index === 3) return null;
        
        const isCompleted = completedSteps[index];
        const displayedText = displayedTexts[index] || "";
        const showLine = displayedText.length > 0 || isCompleted;

        if (!showLine) return null;

        return (
          <div
            key={index}
            className="flex items-center gap-2 mb-2 last:mb-0"
          >
            {/* Status indicator dot */}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] flex-shrink-0" />
            
            {/* Status text */}
            <span className="whitespace-pre-wrap flex-1">
              {displayedText}
              {/* Blinking cursor effect for current line */}
              {!isCompleted && index === currentStep && (
                <span className="inline-block w-0.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse" />
              )}
            </span>
            
            {/* Completion checkmark */}
            {isCompleted && (
              <span className="text-emerald-400 text-[0.7rem] flex-shrink-0">✔</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Floating first status line component for background (shows index 0 and index 2 stacked)
export function FloatingFirstStatus() {
  const [displayedTexts, setDisplayedTexts] = useState<string[]>(["", ""]);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false]);
  const [currentStep, setCurrentStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef<number>(0);

  const firstMessage = STATUS_STEPS[0];
  const thirdMessage = STATUS_STEPS[2];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Reset character index when step changes
  useEffect(() => {
    if (!prefersReducedMotion && currentStep < 2) {
      charIndexRef.current = displayedTexts[currentStep]?.length || 0;
    }
  }, [currentStep, prefersReducedMotion]);

  // Typewriter effect for both lines
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedTexts([firstMessage, thirdMessage]);
      setCompletedSteps([true, true]);
      return;
    }

    // If all steps are completed, stop
    if (currentStep >= 2) {
      return;
    }

    const currentMessage = currentStep === 0 ? firstMessage : thirdMessage;
    const currentDisplayedLength = displayedTexts[currentStep]?.length || 0;

    // If current message is fully typed
    if (charIndexRef.current >= currentMessage.length) {
      // Mark current step as completed
      setCompletedSteps((prev) => {
        const newCompleted = [...prev];
        newCompleted[currentStep] = true;
        return newCompleted;
      });

      // Wait before moving to next step
      timeoutRef.current = setTimeout(() => {
        if (currentStep < 1) {
          charIndexRef.current = 0;
          setCurrentStep((prev) => prev + 1);
        }
      }, STEP_DELAY_MS);

      return;
    }

    // Clear any existing interval before starting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Type next character
    intervalRef.current = setInterval(() => {
      charIndexRef.current += 1;
      const newLength = charIndexRef.current;
      
      setDisplayedTexts((prev) => {
        const newTexts = [...prev];
        newTexts[currentStep] = currentMessage.substring(0, newLength);
        return newTexts;
      });

      // If we've typed all characters, clear interval
      if (newLength >= currentMessage.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, CHAR_DELAY_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [currentStep, prefersReducedMotion, firstMessage, thirdMessage, displayedTexts]);

  return (
    <div className="absolute top-4 left-[5%] sm:top-6 z-20 flex flex-col gap-2">
      {/* First line */}
      <div className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] flex-shrink-0" />
        <span className="whitespace-pre-wrap text-xs sm:text-sm font-mono text-muted-foreground">
          {displayedTexts[0]}
          {!completedSteps[0] && currentStep === 0 && (
            <span className="inline-block w-0.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse" />
          )}
        </span>
        {completedSteps[0] && (
          <span className="text-emerald-400 text-[0.7rem] flex-shrink-0">✔</span>
        )}
      </div>
      
      {/* Second line (index 2) */}
      {(displayedTexts[1] || currentStep >= 1) && (
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] flex-shrink-0" />
          <span className="whitespace-pre-wrap text-xs sm:text-sm font-mono text-muted-foreground">
            {displayedTexts[1]}
            {!completedSteps[1] && currentStep === 1 && (
              <span className="inline-block w-0.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse" />
            )}
          </span>
          {completedSteps[1] && (
            <span className="text-emerald-400 text-[0.7rem] flex-shrink-0">✔</span>
          )}
        </div>
      )}
    </div>
  );
}

// Floating second status line component for background (bottom-left, aligned with console)
export function FloatingSecondStatus() {
  const [displayedText, setDisplayedText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const secondMessage = STATUS_STEPS[1];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Typewriter effect for second line (starts after first line completes)
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(secondMessage);
      setIsCompleted(true);
      return;
    }

    // Wait for first message to complete before starting second
    timeoutRef.current = setTimeout(() => {
      if (charIndexRef.current >= secondMessage.length) {
        setIsCompleted(true);
        return;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        charIndexRef.current += 1;
        const newLength = charIndexRef.current;
        
        setDisplayedText(secondMessage.substring(0, newLength));

        if (newLength >= secondMessage.length) {
          setIsCompleted(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, CHAR_DELAY_MS);
    }, STEP_DELAY_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [prefersReducedMotion, secondMessage]);

  return (
    <div className="absolute bottom-[10%] right-4 sm:right-6 z-20">
      <div className="flex items-center gap-2">
        {/* Status indicator dot */}
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] flex-shrink-0" />
        
        {/* Status text */}
        <span className="whitespace-pre-wrap text-xs sm:text-sm font-mono text-muted-foreground">
          {displayedText}
          {/* Blinking cursor effect */}
          {!isCompleted && (
            <span className="inline-block w-0.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse" />
          )}
        </span>
        
        {/* Completion checkmark */}
        {isCompleted && (
          <span className="text-emerald-400 text-[0.7rem] flex-shrink-0">✔</span>
        )}
      </div>
    </div>
  );
}

