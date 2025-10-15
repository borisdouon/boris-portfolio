import { useTranslations } from "next-intl";
import { WorkGrid } from "@/components/sections/work-grid";
import { WorkFilters } from "@/components/sections/work-filters";

export default function WorkPage() {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Selected Work
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in web development and design
          </p>
        </div>
        
        <WorkFilters />
        <WorkGrid />
      </div>
    </div>
  );
}
