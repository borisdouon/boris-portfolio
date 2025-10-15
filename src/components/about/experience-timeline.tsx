"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-8">
        <Briefcase className="w-6 h-6 text-primary" aria-hidden="true" />
        <h2 className="text-3xl font-semibold text-foreground">Work Experience</h2>
      </div>
      
      <div className="relative">
        {/* Timeline rail */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
        
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.period}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-16"
            >
              {/* Timeline bullet */}
              <div 
                className="absolute left-4 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background"
                aria-hidden="true"
              />
              
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {experience.role}
                  </h3>
                  <p className="text-muted-foreground">
                    {experience.company} — {experience.location}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {experience.period}
                  </p>
                </div>
                
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li 
                      key={achievementIndex}
                      className="text-foreground flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                      <span 
                        dangerouslySetInnerHTML={{ 
                          __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                        }} 
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
