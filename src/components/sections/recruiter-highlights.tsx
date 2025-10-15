"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, Award, Users, Clock, Globe, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRecruiterMode } from "@/contexts/recruiter-mode";

const highlights = [
  {
    icon: TrendingUp,
    metric: "+20%",
    label: "User Engagement",
    description: "Improved through UI optimization",
  },
  {
    icon: Award,
    metric: "+15%",
    label: "Brand Recognition",
    description: "Via WordPress redesigns",
  },
  {
    icon: Users,
    metric: "95%",
    label: "Customer Satisfaction",
    description: "Technical support excellence",
  },
  {
    icon: Clock,
    metric: "5+",
    label: "Years Experience",
    description: "Professional development",
  },
  {
    icon: Globe,
    metric: "EN/FR",
    label: "Bilingual",
    description: "English & French fluency",
  },
  {
    icon: Zap,
    metric: "React",
    label: "Expert Level",
    description: "Modern ecosystem mastery",
  },
];

export function RecruiterHighlights() {
  const t = useTranslations("home.recruiterHighlights");
  const tCommon = useTranslations("common");
  const { isRecruiterMode } = useRecruiterMode();

  if (!isRecruiterMode) return null;

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
            Key metrics and achievements that demonstrate proven impact
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-8 border border-border"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Ready to Connect?</h3>
            <p className="text-muted-foreground">
              Let's discuss how I can contribute to your team's success
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" className="flex-1 sm:flex-none">
              {tCommon("scheduleCall")}
            </Button>
            <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
              {tCommon("downloadResume")}
            </Button>
            <Button variant="ghost" size="lg" className="flex-1 sm:flex-none">
              {tCommon("emailMe")}
            </Button>
          </div>
        </motion.div>

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
            {["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "WordPress", "Node.js"].map((skill) => (
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
