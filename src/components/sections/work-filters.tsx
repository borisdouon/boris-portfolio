"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const filters = [
  { key: "all", label: "All Projects" },
  { key: "webApps", label: "Web Apps" },
  { key: "wordpress", label: "WordPress" },
  { key: "branding", label: "Branding" },
  { key: "uiComponents", label: "UI Components" },
];

export function WorkFilters() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {filters.map((filter) => (
        <motion.div
          key={filter.key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={activeFilter === filter.key ? "gold" : "outline"}
            onClick={() => setActiveFilter(filter.key)}
            className="transition-all duration-200"
          >
            {filter.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
