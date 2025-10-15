"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRecruiterMode } from "@/contexts/recruiter-mode";
import { useAnalytics } from "@/components/analytics/analytics";

export function Hero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common");
  const { isRecruiterMode } = useRecruiterMode();
  const { download } = useAnalytics();

  const handleResumeDownload = () => {
    download('Boris_Douon_Resume.pdf', 'resume');
    // Trigger download from documents folder
    window.open('/documents/Boris_Douon_Resume.pdf', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gold-gradient rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-silver-gradient rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge variant="outline" className="text-sm px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {t("availability")}
            </Badge>
          </motion.div>

          {/* Main heading with animated text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-lg text-muted-foreground mb-2">
              {t("greeting")}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
              <span className="text-gradient-gold">{t("name")}</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
              {t("title")}
            </h2>
            
            {/* Kart Racing Animation */}
            <div className="relative h-24 overflow-hidden mb-4">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-center"
              >
                <p className="text-lg md:text-xl italic text-muted-foreground/80">
                  ({t("techStack")})
                </p>
              </motion.div>
              
              {/* Racing Karts */}
              <div className="absolute inset-0 flex items-center justify-center gap-8 mt-2">
                {/* React Kart */}
                <motion.div
                  initial={{ x: -200, rotate: -10 }}
                  animate={{ 
                    x: [0, 20, 0],
                    y: [0, -5, 0],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="text-4xl md:text-5xl">🏎️</div>
                  <div className="text-xs font-bold text-blue-500 mt-1">React</div>
                </motion.div>

                {/* VS Text */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8
                  }}
                  className="text-2xl font-bold text-muted-foreground"
                >
                  &
                </motion.div>

                {/* Next.js Kart */}
                <motion.div
                  initial={{ x: 200, rotate: 10 }}
                  animate={{ 
                    x: [0, -20, 0],
                    y: [0, -5, 0],
                    rotate: [5, -5, 5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.7
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="text-4xl md:text-5xl">🏎️</div>
                  <div className="text-xs font-bold text-black dark:text-white mt-1">Next.js</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Subtitle - Creative Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mb-8 max-w-3xl mx-auto"
          >
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
              {t("subtitle")}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground italic mb-4">
              ({t("description")})
            </p>
            <p className="text-base md:text-lg text-muted-foreground font-medium">
              {t("languages")}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {isRecruiterMode ? (
              <>
                <Button size="lg" variant="gold" className="group" onClick={handleResumeDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  {tCommon("downloadResume")}
                </Button>
                <Button size="lg" variant="outline" className="group">
                  <Calendar className="w-4 h-4 mr-2" />
                  {tCommon("scheduleCall")}
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" variant="gold" className="group">
                  {t("cta")}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  {tCommon("emailMe")}
                </Button>
                <Button size="lg" variant="outline" onClick={handleResumeDownload} className="group">
                  <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Download CV
                </Button>
              </>
            )}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
