"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface RecruiterModeContextType {
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
}

const RecruiterModeContext = createContext<RecruiterModeContextType | undefined>(
  undefined
);

export function RecruiterModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("recruiter-mode");
    if (saved) {
      setIsRecruiterMode(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("recruiter-mode", JSON.stringify(isRecruiterMode));
  }, [isRecruiterMode]);

  const toggleRecruiterMode = () => {
    setIsRecruiterMode(!isRecruiterMode);
  };

  return (
    <RecruiterModeContext.Provider
      value={{
        isRecruiterMode,
        toggleRecruiterMode,
      }}
    >
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode() {
  const context = useContext(RecruiterModeContext);
  if (context === undefined) {
    throw new Error("useRecruiterMode must be used within a RecruiterModeProvider");
  }
  return context;
}
