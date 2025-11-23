"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/borisdouon",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/boris-douon",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:douon2010@gmail.com",
    icon: Mail,
  },
];

// Particle component for lighting effects
function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        x: x + Math.random() * 20 - 10,
        y: y + Math.random() * 20 - 10,
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
      style={{
        boxShadow: "0 0 10px rgba(251, 191, 36, 0.8)",
      }}
    />
  );
}

// Cursor trail effect
function CursorTrail() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newParticle = {
        x: e.clientX,
        y: e.clientY,
        id: particleIdRef.current++,
      };
      
      setParticles((prev) => [...prev.slice(-10), newParticle]);
      
      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-50"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1 }}
          style={{
            left: particle.x,
            top: particle.y,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(251,191,36,0) 70%)",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 20px rgba(251, 191, 36, 0.6)",
          }}
        />
      ))}
    </>
  );
}

// Lighting particles background
function LightingParticles() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <Particle key={i} x={particle.x} y={particle.y} delay={particle.delay} />
      ))}
    </div>
  );
}

export function Footer() {
  const t = useTranslations("footer");

  return (
    <>
      <CursorTrail />
      <footer className="relative bg-gradient-to-br from-background via-background to-muted/30 border-t border-border overflow-hidden">
        <LightingParticles />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-500" />
                <h3 className="text-lg font-semibold text-gradient-gold">
                  Boris Douon
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                AI & Software Engineer | Intelligent Systems | Full-Stack | Creative Tech Designer
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Abidjan, Côte d'Ivoire — Available for Remote Work
              </p>
              <p className="text-xs text-muted-foreground">
                douon2010@gmail.com | (+225) 0788233647
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                Quick Links
              </h4>
              <div className="space-y-2">
                {[
                  { href: "/work", label: "Portfolio" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-muted-foreground hover:text-gold-500 transition-colors relative group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="absolute left-0 top-0 w-0 h-full bg-gold-500/20 group-hover:w-1 transition-all" />
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                Connect
              </h4>
              <div className="flex space-x-2">
                {socialLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="w-10 h-10 relative group"
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                      >
                        <link.icon className="h-4 w-4 group-hover:text-gold-500 transition-colors" />
                        <span className="absolute inset-0 rounded-md bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {t("copyright")}
            </p>
            <p className="text-xs text-muted-foreground flex items-center mt-2 sm:mt-0">
              {t("madeWith").split("❤️")[0]}
              <Heart className="h-3 w-3 mx-1 text-red-500 fill-current animate-pulse" />
              {t("madeWith").split("❤️")[1]}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
