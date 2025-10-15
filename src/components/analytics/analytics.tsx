"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface AnalyticsEvent {
  event: string;
  page?: string;
  section?: string;
  action?: string;
  value?: string | number;
}

class Analytics {
  private static instance: Analytics;
  private events: AnalyticsEvent[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  track(event: AnalyticsEvent) {
    const enrichedEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.events.push(enrichedEvent);
    
    // In a real implementation, you would send this to your analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', enrichedEvent);
    }

    // Store in localStorage for demo purposes
    try {
      const storedEvents = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
      storedEvents.push(enrichedEvent);
      localStorage.setItem('portfolio_analytics', JSON.stringify(storedEvents.slice(-100))); // Keep last 100 events
    } catch (error) {
      console.error('Failed to store analytics event:', error);
    }
  }

  pageView(page: string) {
    this.track({
      event: 'page_view',
      page,
    });
  }

  interaction(action: string, section?: string, value?: string | number) {
    this.track({
      event: 'interaction',
      action,
      section,
      value,
    });
  }

  download(filename: string, type: string) {
    this.track({
      event: 'download',
      action: 'file_download',
      section: type,
      value: filename,
    });
  }

  contact(method: string) {
    this.track({
      event: 'contact',
      action: method,
    });
  }
}

export const analytics = Analytics.getInstance();

// React component for automatic page view tracking
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    analytics.pageView(pathname);
  }, [pathname]);

  return <>{children}</>;
}

// Hook for tracking interactions
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    pageView: analytics.pageView.bind(analytics),
    interaction: analytics.interaction.bind(analytics),
    download: analytics.download.bind(analytics),
    contact: analytics.contact.bind(analytics),
  };
}
