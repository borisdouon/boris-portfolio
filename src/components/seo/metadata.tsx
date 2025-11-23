import { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: string;
}

const defaultMetadata = {
  title: "Boris Douon - AI & Software Engineer | Intelligent Systems | Full-Stack | Creative Tech Designer",
  description: "Software Engineer specializing in AI-powered systems, intelligent automation, and full-stack development. Currently building high-performance digital systems at ADGroupe using Cursor, Windsurf, and modern AI workflows. Based in Abidjan, Côte d'Ivoire.",
  keywords: [
    "Boris Douon",
    "AI Engineer",
    "Software Engineer",
    "Intelligent Systems",
    "Cursor",
    "Windsurf",
    "Full-Stack Developer",
    "AI Workflows",
    "Automation",
    "Software Architecture",
    "Creative Tech Designer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Portfolio",
    "Abidjan Developer",
    "Côte d'Ivoire Developer"
  ],
  image: "/og-image.jpg",
  url: "https://borisdouon.com",
};

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  locale = 'en'
}: SEOProps = {}): Metadata {
  const finalTitle = title 
    ? `${title} | Boris Douon`
    : defaultMetadata.title;
  
  const finalDescription = description || defaultMetadata.description;
  const finalKeywords = keywords ? [...defaultMetadata.keywords, ...keywords] : defaultMetadata.keywords;
  const finalImage = image || defaultMetadata.image;
  const finalUrl = url || defaultMetadata.url;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords.join(', '),
    authors: [{ name: 'Boris Douon', url: 'https://borisdouon.com' }],
    creator: 'Boris Douon',
    publisher: 'Boris Douon',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(defaultMetadata.url),
    alternates: {
      canonical: finalUrl,
      languages: {
        'en': '/en',
        'fr': '/fr',
      },
    },
    openGraph: {
      type,
      locale,
      url: finalUrl,
      title: finalTitle,
      description: finalDescription,
      siteName: 'Boris Douon Portfolio',
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
      creator: '@borisdouon',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export const structuredData = {
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Boris Douon",
    "jobTitle": "AI & Software Engineer | Intelligent Systems | Full-Stack | Creative Tech Designer",
    "description": "Software Engineer specializing in AI-powered systems, intelligent automation, and full-stack development. Building high-performance digital systems using Cursor, Windsurf, and modern AI workflows.",
    "url": "https://borisdouon.com",
    "image": "https://borisdouon.com/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abidjan",
      "addressRegion": "Lagunes",
      "addressCountry": "CI"
    },
    "email": "douon2010@gmail.com",
    "sameAs": [
      "https://github.com/borisdouon",
      "https://linkedin.com/in/boris-douon"
    ],
    "knowsAbout": [
      "AI Engineering",
      "Intelligent Systems",
      "Cursor",
      "Windsurf",
      "Software Architecture",
      "Automation Pipelines",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Full-Stack Development",
      "Creative Tech Design"
    ]
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Boris Douon Portfolio",
    "description": "Portfolio website of Boris Douon, AI & Software Engineer specializing in Intelligent Systems and Full-Stack Development",
    "url": "https://borisdouon.com",
    "author": {
      "@type": "Person",
      "name": "Boris Douon"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://borisdouon.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
};
