"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="mdx-content">
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground">
          MDX content rendering is currently disabled. Please use the dedicated case study pages.
        </p>
      </div>
    </div>
  );
}
