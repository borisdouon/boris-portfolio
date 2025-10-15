import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { RecruiterModeProvider } from "@/contexts/recruiter-mode";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boris Douon - Customer Support Engineer | Frontend Developer (React & Next.js)",
  description: "Bilingual Customer Support Engineer and Frontend Developer with 5+ years of experience. Proficient in React, Next.js, Vercel deployment, and frontend performance optimization. Based in Abidjan, Côte d'Ivoire — Available for Remote Work.",
  keywords: ["customer support engineer", "frontend developer", "React", "Next.js", "Vercel", "technical support", "UI/UX", "web development", "troubleshooting"],
  authors: [{ name: "Boris Douon" }],
  creator: "Boris Douon",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boris-douon-portfolio.netlify.app",
    title: "Boris Douon - Customer Support Engineer | Frontend Developer",
    description: "Bilingual Customer Support Engineer and Frontend Developer with 5+ years of experience supporting web users and building intuitive digital interfaces.",
    siteName: "Boris Douon Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boris Douon - Customer Support Engineer | Frontend Developer",
    description: "Bilingual Customer Support Engineer and Frontend Developer with 5+ years of experience. React, Next.js, Vercel deployment specialist.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <RecruiterModeProvider>
            {children}
          </RecruiterModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
