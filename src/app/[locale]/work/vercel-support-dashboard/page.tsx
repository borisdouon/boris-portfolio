"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Zap, Database, Layout, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAnalytics } from "@/components/analytics/analytics";

export default function VercelSupportDashboardPage() {
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
            <Badge variant="outline" className="text-sm">Full-Stack Dashboard</Badge>
            <Badge variant="outline" className="text-sm">2025</Badge>
            <Badge className="text-sm bg-gradient-to-r from-blue-500 to-cyan-500">🔥 Featured</Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-gold mb-6">
            Vercel Support Dashboard Clone
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            A fully functional replica of Vercel's internal support dashboard featuring real-time ticket management,
            threaded messaging, and an admin control panel. Built with Next.js, Supabase, and Tailwind CSS.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => handleExternalClick('https://github.com/borisdouon/vercel-support-dashboard-clone')}
              size="lg"
              className="group"
            >
              <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              View on GitHub
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
          <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-black">
            <Image
              src="/images/projects/vercel-dashboard/cover.png"
              alt="Vercel Support Dashboard - Main Interface"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-2">Vercel Support Dashboard</h3>
              <p className="text-gray-300">Real-time ticket management system</p>
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
                  <Layout className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">The Challenge</h3>
                <p className="text-muted-foreground">
                  Recreate Vercel's sophisticated support dashboard with real-time capabilities,
                  maintaining the clean, minimal aesthetic while ensuring full functionality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">The Solution</h3>
                <p className="text-muted-foreground">
                  Built with Next.js App Router and Supabase for real-time data sync, implementing
                  ticket management, threaded conversations, and admin analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">The Tech Stack</h3>
                <p className="text-muted-foreground">
                  Next.js 15, TypeScript, Supabase (PostgreSQL + Realtime), Tailwind CSS,
                  Framer Motion, and Radix UI for accessible components.
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
                <MessageSquare className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Real-Time Ticket Feed</h3>
                <p className="text-muted-foreground">
                  Live updates using Supabase's real-time subscriptions. Tickets appear instantly
                  as they're created, with status changes reflected across all connected clients.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Threaded Messaging</h3>
                <p className="text-muted-foreground">
                  Full conversation threads between users and support agents with markdown support,
                  file attachments, and typing indicators.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Layout className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Admin Control Panel</h3>
                <p className="text-muted-foreground">
                  Comprehensive dashboard showing ticket volume, response rates, agent performance,
                  and system health metrics with interactive charts.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Dark/Light Mode</h3>
                <p className="text-muted-foreground">
                  Seamless theme switching with persistent preferences, matching Vercel's signature
                  black-and-white aesthetic with smooth transitions.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Screenshots Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Screenshots</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden shadow-lg border border-border group cursor-pointer hover:shadow-2xl transition-shadow">
              <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-700">
                <Image
                  src="/images/projects/vercel-dashboard/inbox.png"
                  alt="Ticket Dashboard - Inbox View"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-foreground">Ticket Dashboard</h3>
                <p className="text-sm text-muted-foreground">Main dashboard with real-time ticket feed and filters</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg border border-border group cursor-pointer hover:shadow-2xl transition-shadow">
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                <Image
                  src="/images/projects/vercel-dashboard/messaging.png"
                  alt="Messaging Interface - Threaded Conversations"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-foreground">Threaded Conversations</h3>
                <p className="text-sm text-muted-foreground">Real-time messaging with markdown support</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg border border-border group cursor-pointer hover:shadow-2xl transition-shadow">
              <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-700">
                <Image
                  src="/images/projects/vercel-dashboard/admin.png"
                  alt="Admin Panel - User Management"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-foreground">Admin Panel</h3>
                <p className="text-sm text-muted-foreground">User management and role assignment</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg border border-border group cursor-pointer hover:shadow-2xl transition-shadow">
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                <Image
                  src="/images/projects/vercel-dashboard/analytics.png"
                  alt="Analytics Dashboard - Charts and Metrics"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-foreground">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground">Ticket metrics and performance insights</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Technology Stack</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {["Next.js", "Supabase", "Tailwind CSS", "TypeScript", "Framer Motion", "Radix UI", "PostgreSQL", "Real-time Subscriptions"].map((tech) => (
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
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-12">
            <CardContent>
              <h2 className="text-3xl font-bold text-foreground mb-4">Interested in this project?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Check out the live demo or explore the source code on GitHub to see how it was built.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => handleExternalClick('https://github.com/borisdouon/vercel-support-dashboard-clone')}
                  size="lg"
                  className="group"
                >
                  <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  View Source Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
