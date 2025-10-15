"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useRecruiterMode } from "@/contexts/recruiter-mode";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "home", href: "/" },
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "system", href: "/system" },
];

export function Navigation() {
  const t = useTranslations("navigation");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();

  // Extract current locale from pathname
  const currentLocale = pathname?.split('/')[1] || 'en';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/${currentLocale}`} className="text-xl font-bold text-gradient-gold">
              Boris Douon
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.key}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    href={item.href === '/' ? `/${currentLocale}` : `/${currentLocale}${item.href}`}
                    className="text-foreground hover:text-gold-500 px-3 py-2 rounded-md text-sm font-medium transition-colors block"
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Recruiter Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {tCommon("recruiterMode")}
              </span>
              <Switch
                checked={isRecruiterMode}
                onCheckedChange={toggleRecruiterMode}
              />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Language Toggle */}
            <Button variant="ghost" size="icon" className="w-9 h-9">
              <Globe className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9"
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md rounded-lg mt-2 border border-border">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href === '/' ? `/${currentLocale}` : `/${currentLocale}${item.href}`}
                    className="text-foreground hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-muted-foreground">
                      {tCommon("recruiterMode")}
                    </span>
                    <Switch
                      checked={isRecruiterMode}
                      onCheckedChange={toggleRecruiterMode}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleTheme}
                      className="flex-1"
                    >
                      {isDark ? (
                        <>
                          <Sun className="h-4 w-4 mr-2" />
                          {tCommon("lightMode")}
                        </>
                      ) : (
                        <>
                          <Moon className="h-4 w-4 mr-2" />
                          {tCommon("darkMode")}
                        </>
                      )}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Globe className="h-4 w-4 mr-2" />
                      FR
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
