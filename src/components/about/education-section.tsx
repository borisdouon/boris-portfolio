"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface EducationInfo {
  degree: string;
  school: string;
  location: string;
  period: string;
  grade: string;
}

interface EducationSectionProps {
  education: EducationInfo;
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="w-6 h-6 text-primary" aria-hidden="true" />
        <h2 className="text-3xl font-semibold text-foreground">Education</h2>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {education.degree}
        </h3>
        <p className="text-muted-foreground mb-1">
          {education.school} — {education.location}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{education.period}</span>
          <span>•</span>
          <span>{education.grade}</span>
        </div>
      </div>
    </motion.section>
  );
}
