"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  Download, 
  ExternalLink,
  Github,
  Linkedin,
  Twitter
} from "lucide-react";
import { useRecruiterMode } from "@/contexts/recruiter-mode";
import { useAnalytics } from "@/components/analytics/analytics";

export function ContactInfo() {
  const t = useTranslations("contact");
  const { isRecruiterMode } = useRecruiterMode();
  const analytics = useAnalytics();

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "boris@borisdouon.com",
      href: "mailto:boris@borisdouon.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Montreal, Canada",
      href: null,
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      href: null,
    },
    {
      icon: Calendar,
      label: "Availability",
      value: "Available for new projects",
      href: null,
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/borisdouon",
      color: "bg-blue-600",
    },
    {
      name: "GitHub",
      url: "https://github.com/borisdouon",
      color: "bg-gray-800",
    },
    {
      name: "Dribbble",
      url: "https://dribbble.com/borisdouon",
      color: "bg-pink-500",
    },
    {
      name: "Behance",
      url: "https://behance.net/borisdouon",
      color: "bg-blue-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("info.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">{method.label}</p>
                  {method.href ? (
                    <a
                      href={method.href}
                      className="text-sm text-muted-foreground hover:text-gold-600 transition-colors"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{method.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            asChild
          >
            <a 
              href="/api/resume" 
              download="Boris_Douon_Resume.pdf"
              onClick={() => analytics.download('Boris_Douon_Resume.pdf', 'resume')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </a>
          </Button>
          
          <Button variant="outline" className="w-full justify-start" asChild>
            <a 
              href="https://calendly.com/borisdouon" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => analytics.contact('calendly')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule a Call
              <ExternalLink className="w-4 h-4 ml-auto" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connect</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start"
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <div className={`w-3 h-3 rounded-full ${link.color} mr-2`} />
                  {link.name}
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferred Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="gold">SaaS Platforms</Badge>
            <Badge variant="silver">E-commerce</Badge>
            <Badge variant="gold">Design Systems</Badge>
            <Badge variant="silver">Web Apps</Badge>
            <Badge variant="gold">Branding</Badge>
            <Badge variant="silver">UI/UX Design</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
