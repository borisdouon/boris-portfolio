"use client";

import { motion } from "framer-motion";

interface AboutHeaderProps {
  title: string;
  description: string;
}

export function AboutHeader({ title, description }: AboutHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
        {description}
      </p>
    </motion.div>
  );
}
