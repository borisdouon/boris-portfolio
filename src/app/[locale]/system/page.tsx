import { DesignTokensPanel } from "@/components/sections/design-tokens-panel";
import { ComponentPlayground } from "@/components/sections/component-playground";

export default function SystemPage() {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Design System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive playground showcasing design tokens and components
          </p>
        </div>
        
        <div className="space-y-16">
          <DesignTokensPanel />
          <ComponentPlayground />
        </div>
      </div>
    </div>
  );
}
