"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, ExternalLink, Calendar, FileText, Image as ImageIcon, Palette, Target, X, ZoomIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalytics } from "@/components/analytics/analytics";
import { useState } from "react";

export default function FuturAfricPortfolioPage() {
  const { download, click } = useAnalytics();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

  const handleDownload = (filename: string, type: string) => {
    download(filename, type);
    window.open(`/documents/${filename}`, '_blank');
  };

  const handleResumeDownload = () => {
    download('Boris_Douon_Resume.pdf', 'resume');
    window.open('/documents/Boris_Douon_Resume.pdf', '_blank');
  };

  const handleExternalClick = (url: string) => {
    click('external_link', { url });
    window.open(url, '_blank');
  };

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const handlePDFClick = (pdfPath: string) => {
    setSelectedPDF(pdfPath);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedPDF(null);
  };

  const roadmapSteps = [
    {
      id: 1,
      title: "Magazine Design",
      description: "Complete magazine layout and design for October 2025 edition",
      icon: FileText,
      color: "bg-blue-500",
      images: ["magazine-cover1.png", "magazine-cover2.png"]
    },
    {
      id: 2,
      title: "Social Media Campaign",
      description: "LinkedIn and social media post designs for brand awareness",
      icon: Palette,
      color: "bg-green-500",
      images: ["Linkedin-post.png"]
    },
    {
      id: 3,
      title: "Awareness Campaigns",
      description: "October Rose campaign and other awareness initiatives",
      icon: Target,
      color: "bg-purple-500",
      images: ["OctoberRose.png"]
    }
  ];

  return (
    <div className="pt-20 pb-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/work" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
            <Badge variant="outline" className="text-sm">Portfolio</Badge>
            <Badge variant="outline" className="text-sm">2024</Badge>
            <Badge variant="outline" className="text-sm">Ongoing</Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-gold mb-6">
            FUTURAFRIC
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Creative Portfolio Case Study
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            A comprehensive showcase of creative work spanning magazine publishing, social media campaigns, 
            and awareness initiatives. This case study demonstrates the versatility and impact of integrated design solutions.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => handleExternalClick('https://futurafric.com')}
              size="lg"
              className="group"
            >
              <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Visit Website
            </Button>
            <Button 
              onClick={handleResumeDownload}
              variant="outline"
              size="lg"
              className="group"
            >
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Download CV
            </Button>
          </div>
        </motion.div>

        {/* Project Roadmap */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Project Roadmap</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow the creative journey through three key phases of the FuturAfric portfolio development
            </p>
          </div>

          <div className="relative">
            {/* Roadmap Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 h-full hidden md:block" />
            
            <div className="space-y-16">
              {roadmapSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8`}
                  >
                    {/* Content Card */}
                    <div className="flex-1 max-w-lg">
                      <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <Badge variant="secondary">Phase {step.id}</Badge>
                          </div>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{step.description}</p>
                          <div className="grid grid-cols-2 gap-3">
                            {step.images.map((image, imgIndex) => (
                              <div 
                                key={imgIndex} 
                                className="aspect-video relative overflow-hidden rounded-lg group cursor-pointer"
                                onClick={() => handleImageClick(`/images/projects/futurafric/${image}`)}
                              >
                                <Image
                                  src={`/images/projects/futurafric/${image}`}
                                  alt={`${step.title} - Image ${imgIndex + 1}`}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center Icon (Desktop) */}
                    <div className="hidden md:flex w-16 h-16 rounded-full bg-background border-4 border-primary items-center justify-center shadow-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 max-w-lg hidden md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Downloads & Resources */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Project Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access the complete magazine publication and professional portfolio materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Magazine Download */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">FuturAfric Magazine</CardTitle>
                <p className="text-muted-foreground">October 2025 Edition - "L'Afrique Parle IA"</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-6">
                  Complete magazine design featuring AI in Africa theme with professional layout and typography
                </p>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handlePDFClick('/documents/FUTURAFRIC MAG EDITION OCTOBRE 2025 - L\'AFRIQUE PARLE IA.pdf')}
                    className="flex-1 group"
                    size="lg"
                    variant="outline"
                  >
                    <ZoomIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    View PDF
                  </Button>
                  <Button 
                    onClick={() => handleDownload('FUTURAFRIC MAG EDITION OCTOBRE 2025 - L\'AFRIQUE PARLE IA.pdf', 'magazine')}
                    className="flex-1 group"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CV Download */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Professional Resume</CardTitle>
                <p className="text-muted-foreground">Boris Douon - Creative Portfolio</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-6">
                  Comprehensive CV showcasing web development and graphic design expertise
                </p>
                <Button 
                  onClick={handleResumeDownload}
                  variant="outline"
                  className="w-full group"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Download CV
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Project Stats */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">4+</div>
                <div className="text-sm text-muted-foreground">Design Assets</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Campaign Phases</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">2024</div>
                <div className="text-sm text-muted-foreground">Project Year</div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={closeModal}
              >
                <X className="w-6 h-6" />
              </Button>
              <div className="relative w-full h-[80vh]">
                <Image
                  src={selectedImage}
                  alt="Enlarged view"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {selectedPDF && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between z-10">
                <h3 className="font-semibold">PDF Viewer</h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => window.open(selectedPDF, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={closeModal}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <iframe
                src={`${selectedPDF}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full pt-16"
                title="PDF Viewer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
