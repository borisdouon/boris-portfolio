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
  title: "Boris Douon - Full-Stack Developer & UI/UX Designer",
  description: "Experienced Full-Stack Developer and UI/UX Designer specializing in React, Next.js, TypeScript, and modern web technologies. Based in Montreal, Canada.",
  keywords: [
    "Boris Douon",
    "Full-Stack Developer",
    "UI/UX Designer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Montreal Developer",
    "Canada Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "Portfolio",
    "Web Design",
    "User Experience",
    "User Interface"
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
    "jobTitle": "Full-Stack Developer & UI/UX Designer",
    "description": "Experienced Full-Stack Developer and UI/UX Designer specializing in React, Next.js, TypeScript, and modern web technologies.",
    "url": "https://borisdouon.com",
    "image": "https://borisdouon.com/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montreal",
      "addressRegion": "QC",
      "addressCountry": "CA"
    },
    "email": "boris@borisdouon.com",
    "sameAs": [
      "https://github.com/borisdouon",
      "https://linkedin.com/in/borisdouon",
      "https://twitter.com/borisdouon"
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "UI/UX Design",
      "Web Development",
      "Frontend Development",
      "Backend Development"
    ]
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Boris Douon Portfolio",
    "description": "Portfolio website of Boris Douon, Full-Stack Developer and UI/UX Designer",
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
