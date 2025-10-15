import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnalyticsProvider } from "@/components/analytics/analytics";
import { PerformanceMonitor } from "@/components/analytics/performance-monitor";
import { AccessibilityMonitor } from "@/components/accessibility/a11y-monitor";

const locales = ['en', 'fr'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Note: Locale validation is handled by middleware
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AnalyticsProvider>
        <PerformanceMonitor />
        <AccessibilityMonitor />
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </AnalyticsProvider>
    </NextIntlClientProvider>
  );
}
