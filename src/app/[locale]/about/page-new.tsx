"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Download, Mail, Phone, MapPin, Globe, ExternalLink, Star, Award, Languages } from "lucide-react";
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Boris Douon
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
            Customer Support Engineer | Frontend & UI Designer | React & Next.js Enthusiast
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="outline" className="text-sm">Bilingual: English & French</Badge>
            <Badge variant="outline" className="text-sm">Available for Remote Work</Badge>
          </div>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a href="mailto:douon2010@gmail.com" className="text-sm font-medium hover:text-primary">
                  douon2010@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">(+225) 0788233647</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">Abidjan, Côte d'Ivoire</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">LinkedIn</p>
                <a 
                  href="https://linkedin.com/in/boris-douon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary flex items-center gap-1"
                  onClick={() => handleLinkClick('linkedin')}
                >
                  Connect <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Layout - Two Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Professional Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-primary" />
                Professional Summary
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm a <strong>Customer Support Engineer</strong> and <strong>Frontend Designer</strong> with five years of experience supporting users, troubleshooting web applications, and designing digital interfaces. I combine technical expertise in HTML, CSS, JavaScript, and NoCode platforms with strong communication and problem-solving skills to deliver excellent customer experiences.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Experienced with cloud-based deployment, domain management, and UI/UX design tools, I'm passionate about helping developers and businesses build performant, accessible, and visually engaging websites. My goal is to bridge technology and customer success — ensuring every issue becomes an opportunity for growth and innovation.
                </p>
              </div>
            </motion.section>

            {/* Work Experience */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-semibold text-foreground">Work Experience</h2>
              </div>
              
              <div className="relative">
                {/* Timeline rail */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
                
                <div className="space-y-8">
                  {/* FuturAfric */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-4 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-foreground mb-1">Designer & Magazine Writer</h3>
                        <p className="text-muted-foreground">FuturAfric — Abidjan, Côte d'Ivoire</p>
                        <p className="text-sm text-muted-foreground mt-1">Nov 2024 – Oct 2025 (Full-time, On-site)</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Designed visual content, brand assets, and digital graphics to support company branding and marketing campaigns.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Contributed UX/UI design input to enhance user experience on web and mobile projects.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Wrote, edited, and published magazine articles aligning with FuturAfric's vision, managing editorial calendars and research.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Collaborated with cross-functional teams to ensure consistent visual and written communication across platforms.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Mastercard Cybersecurity */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-4 top-2 w-4 h-4 bg-muted rounded-full border-4 border-background" />
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-foreground mb-1">Cybersecurity Analyst (Virtual Internship)</h3>
                        <p className="text-muted-foreground">Mastercard Cybersecurity (via Forage) — Remote</p>
                        <p className="text-sm text-muted-foreground mt-1">Jan 2024 – Feb 2024 (2 months)</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Served as an analyst on Mastercard's Security Awareness Team, identifying phishing and social-engineering threats.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Supported training content creation for business units requiring enhanced cybersecurity awareness.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Developed analytical and communication skills applicable to secure web environments and customer data protection.</span>
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
                    <div className="absolute left-4 top-2 w-4 h-4 bg-muted rounded-full border-4 border-background" />
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-foreground mb-1">IT Contractor (Technical Support)</h3>
                        <p className="text-muted-foreground">Strikingly — Remote (US)</p>
                        <p className="text-sm text-muted-foreground mt-1">May 2022 – Nov 2023 (1 yr 7 mos)</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Provided comprehensive technical support to clients via email and live chat for website development, hosting, and domain issues.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Guided users through troubleshooting, ensuring high satisfaction across thousands of tickets handled.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Collaborated with engineering and product teams to report bugs, suggest improvements, and test new platform features.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Translated UI elements, documentation, and help content (EN ↔ FR) for accessibility and accuracy.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Authored and maintained internal and public knowledge-base documentation, improving team efficiency and user education.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Monitored KPIs such as response times and resolution rates to identify recurring issues and streamline workflows.</span>
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
                    <div className="absolute left-4 top-2 w-4 h-4 bg-muted rounded-full border-4 border-background" />
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-foreground mb-1">French Service Desk Analyst (Internship)</h3>
                        <p className="text-muted-foreground">Tata Consultancy Services (TCS) — Remote</p>
                        <p className="text-sm text-muted-foreground mt-1">Jul 2022 – Oct 2022 (4 mos)</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Delivered IT service desk support in French for enterprise clients under supervision of senior analysts.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Managed incident tickets, guided users, and maintained accurate troubleshooting documentation.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Gained professional experience in technical communication and customer support escalation processes.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* ThoughtWorks */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-4 top-2 w-4 h-4 bg-muted rounded-full border-4 border-background" />
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-foreground mb-1">Web Development Intern</h3>
                        <p className="text-muted-foreground">ThoughtWorks — Bengaluru, India</p>
                        <p className="text-sm text-muted-foreground mt-1">Sep 2019 – Dec 2019 (4 mos, On-site)</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Designed UI/UX interfaces using HTML, CSS, and JavaScript.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Collaborated with developers to build and test front-end components in Agile sprints.</span>
                        </li>
                        <li className="text-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>Strengthened knowledge of user-centered design and frontend engineering principles.</span>
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
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-semibold text-foreground">Education</h2>
              </div>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Bachelor of Science in Computer Science, Coding & Design
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Indian School of Business & Computing (ISBC) — India
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>2016 – 2020</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Grade: A
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="space-y-8">
            {/* Download Resume */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Download Resume</h3>
                  <Button 
                    className="w-full group" 
                    onClick={handleResumeDownload}
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Download CV
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Frontend & Web</h4>
                    <div className="flex flex-wrap gap-2">
                      {["HTML5", "CSS3", "JavaScript (ES6+)", "WordPress", "NoCode Builders"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Support & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Troubleshooting", "Zendesk", "Knowledge Base", "Customer Communication"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Design</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Figma", "Adobe XD", "Photoshop", "Illustrator"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Collaboration</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Cross-functional teamwork", "Documentation", "Process improvement", "Remote communication"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Bonus</h4>
                    <div className="flex flex-wrap gap-2">
                      {["DNS", "Hosting", "Deployment pipelines"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Soft Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Empathy", "Patience", "Adaptability", "Problem-solving", "Bilingual communication"].map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Languages className="w-5 h-5" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">English</span>
                    <Badge>Full Professional Proficiency</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">French</span>
                    <Badge>Native / Bilingual</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Web Performance & Accessibility",
                      "Developer and User Experience (DX / UX)",
                      "AI in Web Development & Design",
                      "Cybersecurity Awareness"
                    ].map((interest) => (
                      <li key={interest} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{interest}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
