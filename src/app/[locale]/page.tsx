import { Hero } from "@/components/sections/hero";
import { RecruiterHighlights } from "@/components/sections/recruiter-highlights";
import { TypographyPlayground } from "@/components/sections/typography-playground";
import { FeaturedWork } from "@/components/sections/featured-work";

export default function HomePage() {
  return (
    <div className="pt-16">
      <Hero />
      <RecruiterHighlights />
      <FeaturedWork />
      <TypographyPlayground />
    </div>
  );
}
