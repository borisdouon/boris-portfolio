"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillsGroup {
  title: string;
  skills: string[];
}

interface SkillsCardProps {
  skillsGroup: SkillsGroup;
  index: number;
}

export function SkillsCard({ skillsGroup, index }: SkillsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="w-4 h-4 text-primary" aria-hidden="true" />
            {skillsGroup.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skillsGroup.skills.map((skill, skillIndex) => (
              <Badge 
                key={skillIndex}
                variant="secondary"
                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
