"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import projectsData from "../../../content/projects.json";

export function WorkGrid() {
  const projects = projectsData.projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project: any, index: number) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="h-full group hover:shadow-lg transition-all duration-300">
            <div className="aspect-video bg-gradient-to-br from-gold-100 to-silver-100 rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gold-gradient opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl font-bold text-white">
                  {project.client}
                </div>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg group-hover:text-gold-600 transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.client} • {project.year}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {project.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Key Results
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.kpis.slice(0, 2).map((kpi: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {kpi}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 3).map((tech: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.stack.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.stack.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 group/btn"
                  asChild
                >
                  <a href={project.links.case_study || `/work/${project.id}`}>
                    Case Study
                    <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
                {project.links.live && (
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
