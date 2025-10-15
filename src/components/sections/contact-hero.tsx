"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function ContactHero() {
  const t = useTranslations("contact");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
