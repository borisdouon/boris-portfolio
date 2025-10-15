"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const colorTokens = [
  { name: "Gold Primary", value: "#f59e0b", class: "bg-gold-500" },
  { name: "Gold Light", value: "#fbbf24", class: "bg-gold-400" },
  { name: "Gold Dark", value: "#d97706", class: "bg-gold-600" },
  { name: "Silver Light", value: "#e5e7eb", class: "bg-silver-200" },
  { name: "Silver Medium", value: "#9ca3af", class: "bg-silver-400" },
  { name: "Silver Dark", value: "#6b7280", class: "bg-silver-500" },
];

const spacingTokens = [
  { name: "xs", value: "0.25rem", size: "4px" },
  { name: "sm", value: "0.5rem", size: "8px" },
  { name: "md", value: "1rem", size: "16px" },
  { name: "lg", value: "1.5rem", size: "24px" },
  { name: "xl", value: "2rem", size: "32px" },
  { name: "2xl", value: "3rem", size: "48px" },
];

const typographyTokens = [
  { name: "Display", size: "text-6xl", weight: "font-bold", example: "Aa" },
  { name: "Heading 1", size: "text-4xl", weight: "font-bold", example: "Heading 1" },
  { name: "Heading 2", size: "text-3xl", weight: "font-semibold", example: "Heading 2" },
  { name: "Heading 3", size: "text-2xl", weight: "font-semibold", example: "Heading 3" },
  { name: "Body Large", size: "text-lg", weight: "font-normal", example: "Body Large Text" },
  { name: "Body", size: "text-base", weight: "font-normal", example: "Body Text" },
  { name: "Small", size: "text-sm", weight: "font-normal", example: "Small Text" },
];

const shadowTokens = [
  { name: "Soft", class: "shadow-soft", description: "Subtle elevation" },
  { name: "Medium", class: "shadow-medium", description: "Standard cards" },
  { name: "Hard", class: "shadow-hard", description: "Prominent elements" },
  { name: "Glow", class: "shadow-glow", description: "Interactive states" },
];

export function DesignTokensPanel() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gradient-gold mb-4">Design Tokens</h2>
        <p className="text-muted-foreground">
          The foundation of our design system - colors, typography, spacing, and more
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colors */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {colorTokens.map((color, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${color.class} border border-border`} />
                    <div>
                      <p className="text-sm font-medium">{color.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{color.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Typography */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {typographyTokens.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${type.size} ${type.weight}`}>
                        {type.example}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {type.name}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Spacing */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Spacing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {spacingTokens.map((spacing, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium">{spacing.name}</div>
                    <div className="flex-1 bg-muted rounded h-2 relative">
                      <div 
                        className="bg-gold-500 rounded h-full"
                        style={{ width: spacing.size }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground font-mono w-16">
                      {spacing.value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shadows */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Shadows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {shadowTokens.map((shadow, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 bg-background rounded-lg mx-auto mb-2 ${shadow.class}`} />
                    <p className="text-sm font-medium">{shadow.name}</p>
                    <p className="text-xs text-muted-foreground">{shadow.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
