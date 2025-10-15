"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ComponentPlayground() {
  const [buttonVariant, setButtonVariant] = useState("default");
  const [buttonSize, setButtonSize] = useState("default");
  const [cardElevation, setCardElevation] = useState([1]);
  const [badgeVariant, setBadgeVariant] = useState("default");

  const buttonVariants = ["default", "gold", "silver", "outline", "ghost"];
  const buttonSizes = ["sm", "default", "lg"];
  const badgeVariants = ["default", "gold", "silver", "outline", "secondary"];

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gradient-gold mb-4">Component Playground</h2>
        <p className="text-muted-foreground">
          Interactive components with live customization controls
        </p>
      </motion.div>

      <Tabs defaultValue="buttons" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Button Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Variant</label>
                  <div className="flex flex-wrap gap-2">
                    {buttonVariants.map((variant) => (
                      <Button
                        key={variant}
                        variant={buttonVariant === variant ? "gold" : "outline"}
                        size="sm"
                        onClick={() => setButtonVariant(variant)}
                      >
                        {variant}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Size</label>
                  <div className="flex gap-2">
                    {buttonSizes.map((size) => (
                      <Button
                        key={size}
                        variant={buttonSize === size ? "gold" : "outline"}
                        size="sm"
                        onClick={() => setButtonSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[200px]">
                <Button
                  variant={buttonVariant as any}
                  size={buttonSize as any}
                >
                  Sample Button
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cards" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Card Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Elevation: {cardElevation[0]}
                  </label>
                  <Slider
                    value={cardElevation}
                    onValueChange={setCardElevation}
                    max={3}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={`transition-shadow duration-200 ${
              cardElevation[0] === 0 ? "" :
              cardElevation[0] === 1 ? "shadow-soft" :
              cardElevation[0] === 2 ? "shadow-medium" : "shadow-hard"
            }`}>
              <CardHeader>
                <CardTitle>Sample Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This is a sample card with adjustable elevation. Use the controls to see how shadows affect the visual hierarchy.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Badge Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Variant</label>
                  <div className="flex flex-wrap gap-2">
                    {badgeVariants.map((variant) => (
                      <Button
                        key={variant}
                        variant={badgeVariant === variant ? "gold" : "outline"}
                        size="sm"
                        onClick={() => setBadgeVariant(variant)}
                      >
                        {variant}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badge Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[200px]">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={badgeVariant as any}>Sample Badge</Badge>
                  <Badge variant={badgeVariant as any}>React</Badge>
                  <Badge variant={badgeVariant as any}>TypeScript</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Form Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch id="demo-switch" />
                  <label htmlFor="demo-switch" className="text-sm font-medium">
                    Enable notifications
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sample Slider</label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    placeholder="Enter your message"
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
