"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TypographyPlayground() {
  const t = useTranslations("home.typographyPlayground");
  const [fontSize, setFontSize] = useState([18]);
  const [fontWeight, setFontWeight] = useState([400]);
  const [letterSpacing, setLetterSpacing] = useState([0]);
  const [lineHeight, setLineHeight] = useState([1.5]);

  const sampleText = t("sampleText");

  return (
    <section className="py-20">
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
            Interactive typography controls to explore design possibilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Typography Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      {t("controls.fontSize")}
                    </label>
                    <Badge variant="outline">{fontSize[0]}px</Badge>
                  </div>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    max={72}
                    min={12}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      {t("controls.fontWeight")}
                    </label>
                    <Badge variant="outline">{fontWeight[0]}</Badge>
                  </div>
                  <Slider
                    value={fontWeight}
                    onValueChange={setFontWeight}
                    max={900}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      {t("controls.letterSpacing")}
                    </label>
                    <Badge variant="outline">{letterSpacing[0]}px</Badge>
                  </div>
                  <Slider
                    value={letterSpacing}
                    onValueChange={setLetterSpacing}
                    max={5}
                    min={-2}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      {t("controls.lineHeight")}
                    </label>
                    <Badge variant="outline">{lineHeight[0]}</Badge>
                  </div>
                  <Slider
                    value={lineHeight}
                    onValueChange={setLineHeight}
                    max={3}
                    min={0.8}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[300px]">
                <motion.p
                  key={`${fontSize[0]}-${fontWeight[0]}-${letterSpacing[0]}-${lineHeight[0]}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: `${fontSize[0]}px`,
                    fontWeight: fontWeight[0],
                    letterSpacing: `${letterSpacing[0]}px`,
                    lineHeight: lineHeight[0],
                  }}
                  className="text-center text-foreground"
                >
                  {sampleText}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Typography Specimens */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Typography Scale</h3>
          <div className="space-y-4">
            <div className="text-6xl font-bold text-gradient-gold">Aa</div>
            <div className="text-4xl font-semibold">Typography Matters</div>
            <div className="text-2xl font-medium">Good typography is invisible</div>
            <div className="text-lg">It guides the reader through content seamlessly</div>
            <div className="text-base text-muted-foreground">
              Every font choice, spacing decision, and hierarchy creates meaning
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
