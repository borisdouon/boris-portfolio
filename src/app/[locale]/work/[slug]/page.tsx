import { notFound } from "next/navigation";
import Link from "next/link";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  // Return known case study slugs
  return [
    { slug: "futurafric-portfolio" }
  ];
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug, locale } = await params;
  
  // Redirect to our custom FuturAfric portfolio page
  if (slug === "futurafric-portfolio") {
    return (
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
          <p className="mb-4">You are being redirected to the case study.</p>
          <Link href={`/${locale}/work/futurafric-portfolio`} className="text-primary hover:underline">
            Click here if you are not redirected automatically
          </Link>
          <script dangerouslySetInnerHTML={{
            __html: `window.location.href = '/${locale}/work/futurafric-portfolio';`
          }} />
        </div>
      </div>
    );
  }

  notFound();
}
