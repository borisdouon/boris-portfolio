"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
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

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient-gold">
              Boris Douon
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Customer Support Engineer | Frontend Developer (React & Next.js)
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
            <h4 className="text-sm font-semibold text-foreground">
              Quick Links
            </h4>
            <div className="space-y-2">
              <a
                href="/work"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Portfolio
              </a>
              <a
                href="/about"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              Connect
            </h4>
            <div className="flex space-x-2">
              {socialLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="w-8 h-8"
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                    >
                      <link.icon className="h-4 w-4" />
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
            <Heart className="h-3 w-3 mx-1 text-red-500 fill-current" />
            {t("madeWith").split("❤️")[1]}
          </p>
        </div>
      </div>
    </footer>
  );
}
