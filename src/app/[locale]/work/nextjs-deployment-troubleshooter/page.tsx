"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Terminal, CheckCircle, AlertCircle, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAnalytics } from "@/components/analytics/analytics";

export default function NextjsDeploymentTroubleshooterPage() {
  const { interaction } = useAnalytics();

  const handleExternalClick = (url: string) => {
    interaction('external_link', 'case_study', url);
    window.open(url, '_blank');
  };

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
            <Badge variant="outline" className="text-sm">Developer Tool</Badge>
            <Badge variant="outline" className="text-sm">2025</Badge>
            <Badge className="text-sm bg-gradient-to-r from-green-500 to-emerald-500">🌟 Open Source</Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-gold mb-6">
            Next.js Deployment Troubleshooter
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            An open-source diagnostic tool that automatically analyzes Next.js deployment logs,
            identifies common issues, and provides instant fix suggestions. Save hours of debugging time.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => handleExternalClick('https://github.com/borisdouon/nextjs-deployment-troubleshooter')}
              size="lg"
              className="group"
            >
              <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Contribute on GitHub
            </Button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 rounded-2xl overflow-hidden shadow-2xl border border-border"
        >
          <div className="relative aspect-video bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-3xl font-bold text-white mb-2">Next.js Troubleshooter</h3>
              <p className="text-gray-300">Automatic deployment diagnostics</p>
            </div>
          </div>
        </motion.div>

        {/* Overview Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Project Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">The Problem</h3>
                <p className="text-muted-foreground">
                  Developers spend hours debugging failed Next.js deployments, searching through
                  cryptic error logs and stack traces to find the root cause.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">The Solution</h3>
                <p className="text-muted-foreground">
                  Automated log analysis that identifies common issues like missing environment
                  variables, API route errors, and build configuration problems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">The Tech</h3>
                <p className="text-muted-foreground">
                  Built with Next.js 15, Node.js for log parsing, Vercel API integration,
                  and TypeScript for type safety throughout.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Key Features */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Terminal className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Automatic Log Parsing</h3>
                <p className="text-muted-foreground">
                  Upload or paste deployment logs and get instant analysis. The tool automatically
                  categorizes errors and identifies patterns across multiple log types.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Smart Diagnostics</h3>
                <p className="text-muted-foreground">
                  Detects common issues like missing env vars, incorrect API routes, build
                  configuration errors, and dependency conflicts with high accuracy.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">One-Click Fix Guides</h3>
                <p className="text-muted-foreground">
                  Get step-by-step instructions to resolve each issue, with code snippets and
                  configuration examples you can copy directly into your project.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Github className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Open Source</h3>
                <p className="text-muted-foreground">
                  Fully open-source and community-driven. Contribute new diagnostic patterns,
                  improve detection accuracy, or add support for more deployment platforms.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-500">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Upload Logs</h3>
                <p className="text-sm text-muted-foreground">
                  Paste your deployment logs or upload a log file from Vercel, Netlify, or any platform
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-500">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Auto-Analyze</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered parsing identifies error patterns and categorizes issues automatically
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-500">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Get Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Receive detailed fix guides with code examples and configuration snippets
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-500">4</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Deploy Fixed</h3>
                <p className="text-sm text-muted-foreground">
                  Apply the fixes and redeploy with confidence - your build will succeed
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Screenshots Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Interface Preview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden shadow-lg border border-border group cursor-pointer">
              <div className="relative aspect-video bg-gradient-to-br from-teal-900 to-cyan-800 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-5xl mb-3">💻</div>
                  <h4 className="text-xl font-bold text-white mb-1">Clean Interface</h4>
                  <p className="text-gray-300 text-sm">Developer-friendly UI</p>
                </div>
              </div>
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-foreground">Clean Interface</h3>
                <p className="text-sm text-muted-foreground">Simple, developer-friendly UI</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg border border-border group cursor-pointer">
              <div className="relative aspect-video bg-gradient-to-br from-emerald-800 to-teal-900 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-5xl mb-3">✅</div>
                  <h4 className="text-xl font-bold text-white mb-1">Diagnostics</h4>
                  <p className="text-gray-300 text-sm">Terminal-style output</p>
                </div>
              </div>
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-foreground">Diagnostic Output</h3>
                <p className="text-sm text-muted-foreground">Terminal-style results with fixes</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Technology Stack</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {["Next.js", "Node.js", "TypeScript", "Vercel API", "Tailwind CSS", "Framer Motion", "Open Source"].map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-12">
            <CardContent>
              <h2 className="text-3xl font-bold text-foreground mb-4">Try It Out or Contribute</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Use the tool to debug your Next.js deployments or contribute to make it even better.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => handleExternalClick('https://github.com/borisdouon/nextjs-deployment-troubleshooter')}
                  size="lg"
                  className="group"
                >
                  <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Contribute on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
