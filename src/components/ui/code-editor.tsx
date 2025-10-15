"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/components/analytics/analytics";

interface CodeEditorProps {
  code: string;
  language: string;
  title?: string;
  filename?: string;
  showLineNumbers?: boolean;
  readOnly?: boolean;
  height?: string;
  className?: string;
}

export function CodeEditor({
  code,
  language,
  title,
  filename,
  showLineNumbers = true,
  readOnly = true,
  height = "400px",
  className,
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const { interaction, download } = useAnalytics();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      interaction('copy_code', 'code_editor', filename || language);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const downloadFilename = filename || `code.${language}`;
    a.href = url;
    a.download = downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    download(downloadFilename, 'code_file');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              {title && <CardTitle className="mb-2">{title}</CardTitle>}
              {filename && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{filename}</Badge>
                  <Badge variant="silver">{language}</Badge>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 w-8 p-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              {filename && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="h-8 w-8 p-0"
                >
                  <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t">
            <pre 
              className="bg-slate-900 text-slate-100 p-4 overflow-x-auto font-mono text-sm"
              style={{ height }}
            >
              <code className={`language-${language}`}>{code}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Simplified code block for smaller snippets
export function CodeBlock({
  code,
  language,
  className,
}: {
  code: string;
  language: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <pre className="bg-muted rounded-md p-4 overflow-x-auto">
        <code className={`language-${language} text-sm`}>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
