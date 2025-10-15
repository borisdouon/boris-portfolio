"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, ExternalLink, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/components/analytics/analytics";

interface ContactInfo {
  email: string;
  phones: string[];
  location: string;
  availability: string;
  languages: {
    english: string;
    french: string;
  };
  links: {
    portfolio: string;
    linkedin: string;
  };
}

interface ContactCardProps {
  contact: ContactInfo;
}

export function ContactCard({ contact }: ContactCardProps) {
  const { download, contact: trackContact } = useAnalytics();

  const handleResumeDownload = () => {
    download('Boris_Douon_Resume.pdf', 'resume');
  };

  const handleLinkClick = (platform: string) => {
    trackContact(platform);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
          Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="w-4 h-4 text-muted-foreground mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <a 
              href={`mailto:${contact.email}`}
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => handleLinkClick('email')}
            >
              {contact.email}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="w-4 h-4 text-muted-foreground mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <div className="space-y-1">
              {contact.phones.map((phone, index) => (
                <p key={index} className="text-foreground">
                  {phone}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-foreground">{contact.location}</p>
            <p className="text-sm text-muted-foreground mt-1">{contact.availability}</p>
          </div>
        </div>

        {/* Languages */}
        <div className="flex items-start gap-3">
          <Globe className="w-4 h-4 text-muted-foreground mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm text-muted-foreground">Languages</p>
            <div className="space-y-1">
              <p className="text-foreground">
                🇺🇸 English ({contact.languages.english})
              </p>
              <p className="text-foreground">
                🇫🇷 French ({contact.languages.french})
              </p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="pt-2 border-t border-border/50">
          <div className="space-y-2">
            <a
              href={`https://${contact.links.portfolio}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={() => handleLinkClick('portfolio')}
            >
              Portfolio
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href={`https://${contact.links.linkedin}`}
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

        {/* Download CV Button */}
        <div className="pt-4">
          <Button 
            className="w-full" 
            asChild
          >
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
  );
}
