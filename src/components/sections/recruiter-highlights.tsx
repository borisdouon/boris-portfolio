"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, Award, Users, Clock, Globe, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const highlights = [
  {
    icon: TrendingUp,
    metric: "AI-First",
    label: "Development Approach",
    description: "Building intelligent systems with Cursor & Windsurf",
  },
  {
    icon: Award,
    metric: "Full-Stack",
    label: "Expertise",
    description: "Software Architecture • APIs • Automation",
  },
  {
    icon: Users,
    metric: "6+",
    label: "Years Experience",
    description: "Professional software engineering",
  },
  {
    icon: Clock,
    metric: "ADGroupe",
    label: "Current Role",
    description: "Software Engineer (Oct 2025 - Present)",
  },
  {
    icon: Globe,
    metric: "EN/FR",
    label: "Bilingual",
    description: "English & French fluency",
  },
  {
    icon: Zap,
    metric: "Intelligent",
    label: "Systems",
    description: "AI workflows & automation pipelines",
  },
];

export function RecruiterHighlights() {
  const t = useTranslations("home.recruiterHighlights");

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mission oriented with a passion & disciplined to build intelligent systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gradient-gold mb-2">
                    {highlight.metric}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {highlight.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Core Technologies</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Cursor", "Windsurf", "React", "Next.js", "TypeScript", "Node.js", "AI Workflows", "Software Architecture"].map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
