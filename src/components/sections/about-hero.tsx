"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import aboutData from "../../../content/about.json";

export function AboutHero() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
                About Me
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {aboutData.bio}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-gradient-gold mb-2">
                      {aboutData.experience}
                    </div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-gradient-gold mb-2">
                      50+
                    </div>
                    <p className="text-sm text-muted-foreground">Projects</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-gradient-gold mb-2">
                      {aboutData.location}
                    </div>
                    <p className="text-sm text-muted-foreground">Location</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Core Values</h3>
                <ul className="space-y-3">
                  {aboutData.values.map((value, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full" />
                      <span className="text-sm">{value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
