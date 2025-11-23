"use client";

import { useEffect } from "react";
import Hero from "@/components/sections/hero";
import { SystemsDashboard } from "@/components/sections/systems-dashboard";
import DouonSniperEngineDiagram from "@/components/sections/douon-sniper-engine-diagram";
import { RecruiterHighlights } from "@/components/sections/recruiter-highlights";

export default function HomePage() {
  // Ensure page starts at top on load
  useEffect(() => {
    window.scrollTo(0, 0);
    // Also handle hash navigation if present
    if (window.location.hash) {
      const hash = window.location.hash;
      window.location.hash = "";
      setTimeout(() => {
        window.location.hash = hash;
      }, 0);
    }
  }, []);

  return (
    <div className="pt-16">
      <Hero />
      <SystemsDashboard />
      <DouonSniperEngineDiagram />
      <RecruiterHighlights />
    </div>
  );
}
