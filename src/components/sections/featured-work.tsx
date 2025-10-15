"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import projectsData from "../../../content/projects.json";

export function FeaturedWork() {
  const t = useTranslations("work");
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  const featuredProjects = projectsData.projects.filter(project => project.featured);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my expertise in web development and design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
                {/* Special Badge for Top Projects */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
                      🔥 Featured
                    </Badge>
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                      🌟 Open Source
                    </Badge>
                  </div>
                )}
                
                <div className="aspect-video rounded-t-lg relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
                  {project.thumbnail ? (
                    <>
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="text-2xl md:text-3xl font-bold mb-2 text-white">
                      {project.title}
                    </div>
                    <div className="text-sm text-gray-300">
                      {project.category}
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
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        Key Results
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.kpis.slice(0, 2).map((kpi, i) => (
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
                        {project.stack.slice(0, 3).map((tech, i) => (
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
                    {project.links.live && (
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 group/btn"
                        asChild
                      >
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Live
                          <ExternalLink className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className={project.links.live ? "" : "flex-1"}
                      asChild
                    >
                      <Link href={`/${currentLocale}${project.links.case_study}`}>
                        Case Study
                        <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="gold" size="lg" asChild>
            <Link href={`/${currentLocale}/work`}>
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
