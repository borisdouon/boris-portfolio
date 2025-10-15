"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MDXContent } from "@/components/mdx/mdx-content";

interface CaseStudyLayoutProps {
  caseStudy: any;
}

export function CaseStudyLayout({ caseStudy }: CaseStudyLayoutProps) {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="group">
            <a href="/work">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Work
            </a>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
                {caseStudy.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {caseStudy.goals}
              </p>
              
              {/* KPIs */}
              <div className="flex flex-wrap gap-2">
                {caseStudy.kpis.map((kpi: string, index: number) => (
                  <Badge key={index} variant="gold" className="text-sm">
                    {kpi}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Role</p>
                    <p className="text-sm text-muted-foreground">{caseStudy.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Year</p>
                    <p className="text-sm text-muted-foreground">{caseStudy.year}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-1">
                    {caseStudy.stack.map((tech: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {caseStudy.links && (
                  <div className="space-y-2">
                    {caseStudy.links.live && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={caseStudy.links.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Site
                        </a>
                      </Button>
                    )}
                    {caseStudy.links.figma && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={caseStudy.links.figma} target="_blank" rel="noopener noreferrer">
                          <Code className="w-4 h-4 mr-2" />
                          View Design
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="accessibility">A11y</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-8">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <MDXContent content={caseStudy.body.raw} />
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Design Process & Decisions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Design system, visual decisions, and user experience considerations.
                  </p>
                  {/* Design content would go here */}
                  <div className="bg-muted/30 rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">Design assets and process documentation</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="code" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Implementation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Code examples, architecture decisions, and technical challenges.
                  </p>
                  <div className="bg-muted/30 rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">Code examples and technical details</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="accessibility" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility & Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Accessibility considerations, performance optimizations, and compliance details.
                  </p>
                  <div className="bg-muted/30 rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">Accessibility audit and performance metrics</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
