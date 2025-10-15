"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Download, Mail, Phone, MapPin, Globe, ExternalLink, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAnalytics } from "@/components/analytics/analytics";

export default function AboutPage() {
  const { download, contact: trackContact } = useAnalytics();

  const handleResumeDownload = () => {
    download('Boris_Douon_Resume.pdf', 'resume');
    window.open('/documents/Boris_Douon_Resume.pdf', '_blank');
  };

  const handleLinkClick = (platform: string) => {
    trackContact(platform);
  };

  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Me
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            Bilingual Customer Support Engineer and Frontend Developer with over 5 years of experience supporting web users, troubleshooting complex application issues, and designing intuitive digital interfaces. Proficient in React, Next.js, Vercel deployment, and frontend performance optimization, with strong communication and documentation skills. I bridge the gap between customers and engineering — ensuring every technical challenge becomes an opportunity for innovation, growth, and better developer experience.
          </p>
        </motion.div>

        {/* Main Layout - Two Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Work Experience */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 text-primary" aria-hidden="true" />
                <h2 className="text-3xl font-semibold text-foreground">Work Experience</h2>
              </div>
              
              <div className="relative">
                {/* Timeline rail */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
                
                <div className="space-y-8">
                  {/* FuturAfric */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-4 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background" aria-hidden="true" />
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-foreground mb-1">Frontend Designer & Brand Writer</h3>
                        <p className="text-muted-foreground">FuturAfric — Abidjan, Côte d'Ivoire</p>
                        <p className="text-sm text-muted-foreground mt-1">Nov 2024 – Oct 2025</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Designed UI/UX layouts, graphics, and landing pages aligned with brand identity.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Collaborated on web and mobile design projects using Figma and Next.js-based components.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Authored and edited digital publication articles for the company's magazine and online platform.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Strikingly */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-4 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background" aria-hidden="true" />
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-foreground mb-1">Technical Support Engineer</h3>
                        <p className="text-muted-foreground">Strikingly — Remote (US)</p>
                        <p className="text-sm text-muted-foreground mt-1">May 2022 – Nov 2023</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Delivered full-spectrum technical support for <strong>1000+ users</strong> via live chat and email, resolving issues related to hosting, domains, SSL, and site deployment.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Collaborated with engineering teams to reproduce, document, and fix frontend issues in production environments.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Authored <strong>50+ knowledge base articles</strong>, product documentation, and UI translations (EN ↔ FR).</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Introduced structured incident response workflows that reduced ticket resolution times by <strong>15%</strong>.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* TCS */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-4 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background" aria-hidden="true" />
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-foreground mb-1">French Service Desk Analyst (Intern)</h3>
                        <p className="text-muted-foreground">Tata Consultancy Services (TCS) — Remote</p>
                        <p className="text-sm text-muted-foreground mt-1">Jul 2022 – Oct 2022</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Supported enterprise users in French-speaking regions, managing IT tickets and troubleshooting workflows.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Escalated technical incidents and tracked resolutions in collaboration with engineering supervisors.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* ThoughtWorks */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-4 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background" aria-hidden="true" />
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-foreground mb-1">Frontend Intern (Web Development)</h3>
                        <p className="text-muted-foreground">ThoughtWorks — Bengaluru, India</p>
                        <p className="text-sm text-muted-foreground mt-1">Sep 2019 – Dec 2019</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Built and tested UI components using HTML, CSS, and JavaScript.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>Participated in Agile sprints focused on accessibility and frontend performance improvements.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
            
            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-primary" aria-hidden="true" />
                <h2 className="text-3xl font-semibold text-foreground">Education</h2>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Bachelor of Science in Computer Science, Coding, and Design
                </h3>
                <p className="text-muted-foreground mb-1">
                  Indian School of Business & Computing (ISBC) — India
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>2016 – 2020</span>
                  <span>•</span>
                  <span>Grade: A</span>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Contact Card */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                    Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a 
                        href="mailto:douon2010@gmail.com"
                        className="text-foreground hover:text-primary transition-colors"
                        onClick={() => handleLinkClick('email')}
                      >
                        douon2010@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <div className="space-y-1">
                        <p className="text-foreground">(+225) 0788233647</p>
                        <p className="text-foreground">0161371787</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground">Abidjan, Côte d'Ivoire</p>
                      <p className="text-sm text-muted-foreground mt-1">Available for global remote work</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm text-muted-foreground">Languages</p>
                      <div className="space-y-1">
                        <p className="text-foreground">🇺🇸 English (Professional)</p>
                        <p className="text-foreground">🇫🇷 French (Native)</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <div className="space-y-2">
                      <a
                        href="https://boris-douon-portfolio.netlify.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => handleLinkClick('portfolio')}
                      >
                        Portfolio
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                      <a
                        href="https://linkedin.com/in/boris-douon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => handleLinkClick('linkedin')}
                      >
                        LinkedIn
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" asChild>
                      <a 
                        href="/api/resume" 
                        download="Boris_Douon_Resume.pdf"
                        onClick={handleResumeDownload}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download CV
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Skills Cards */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Star className="w-4 h-4 text-primary" aria-hidden="true" />
                        Frontend Development
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["React", "Next.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"].map((skill, index) => (
                          <Badge 
                            key={index}
                            variant="secondary"
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Star className="w-4 h-4 text-primary" aria-hidden="true" />
                        Deployment & Cloud
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["Vercel", "Netlify", "DNS", "Hosting", "Serverless Functions"].map((skill, index) => (
                          <Badge 
                            key={index}
                            variant="secondary"
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Star className="w-4 h-4 text-primary" aria-hidden="true" />
                        Support & Collaboration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["Zendesk", "Ticketing Systems", "Knowledge Base", "Troubleshooting", "Technical Writing"].map((skill, index) => (
                          <Badge 
                            key={index}
                            variant="secondary"
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Star className="w-4 h-4 text-primary" aria-hidden="true" />
                        Design & Branding
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["Figma", "Adobe XD", "Photoshop", "Illustrator"].map((skill, index) => (
                          <Badge 
                            key={index}
                            variant="secondary"
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Star className="w-4 h-4 text-primary" aria-hidden="true" />
                        Soft Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["Empathy", "Analytical thinking", "Communication", "Adaptability", "Problem-solving"].map((skill, index) => (
                          <Badge 
                            key={index}
                            variant="secondary"
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
