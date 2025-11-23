import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { RecruiterModeProvider } from "@/contexts/recruiter-mode";
import { CustomCursor } from "@/components/custom-cursor";
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
  title: "Boris Douon - AI & Software Engineer | Intelligent Systems | Full-Stack | Creative Tech Designer",
  description: "Software Engineer specializing in AI-powered systems, intelligent automation, and full-stack development. Currently building high-performance digital systems at ADGroupe using Cursor, Windsurf, and modern AI workflows. Based in Abidjan, Côte d'Ivoire — Available for Remote Work.",
  keywords: ["AI engineer", "software engineer", "intelligent systems", "Cursor", "Windsurf", "full-stack developer", "AI workflows", "automation", "software architecture", "creative tech designer"],
  authors: [{ name: "Boris Douon" }],
  creator: "Boris Douon",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boris-douon-portfolio.netlify.app",
    title: "Boris Douon - AI & Software Engineer | Intelligent Systems | Full-Stack",
    description: "Software Engineer specializing in AI-powered systems, intelligent automation, and full-stack development. Building high-performance digital systems using Cursor, Windsurf, and modern AI workflows.",
    siteName: "Boris Douon Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boris Douon - AI & Software Engineer | Intelligent Systems | Full-Stack",
    description: "Software Engineer specializing in AI-powered systems, intelligent automation, and full-stack development. Cursor, Windsurf, and AI workflows expert.",
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
            <CustomCursor />
            {children}
          </RecruiterModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
