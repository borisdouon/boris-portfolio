"use client";

import { useEffect } from "react";
import { useAnalytics } from "./analytics";

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export function PerformanceMonitor() {
  const { track } = useAnalytics();

  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // First Contentful Paint (FCP)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            const fcp = entry.startTime;
            const rating = fcp <= 1800 ? 'good' : fcp <= 3000 ? 'needs-improvement' : 'poor';
            
            track({
              event: 'performance_metric',
              action: 'first_contentful_paint',
              value: Math.round(fcp),
              section: rating,
            });
          }
        }
      });

      observer.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcp = lastEntry.startTime;
          const rating = lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor';
          
          track({
            event: 'performance_metric',
            action: 'largest_contentful_paint',
            value: Math.round(lcp),
            section: rating,
          });
        }
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Track CLS on page unload
      const trackCLS = () => {
        const rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';
        track({
          event: 'performance_metric',
          action: 'cumulative_layout_shift',
          value: Math.round(clsValue * 1000) / 1000,
          section: rating,
        });
      };

      window.addEventListener('beforeunload', trackCLS);

      // First Input Delay (FID) - approximated with event timing
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime;
          const rating = fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor';
          
          track({
            event: 'performance_metric',
            action: 'first_input_delay',
            value: Math.round(fid),
            section: rating,
          });
        }
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Fallback for browsers that don't support first-input
        console.log('First Input Delay measurement not supported');
      }

      // Track page load time
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;
            const rating = loadTime <= 2000 ? 'good' : loadTime <= 4000 ? 'needs-improvement' : 'poor';
            
            track({
              event: 'performance_metric',
              action: 'page_load_time',
              value: Math.round(loadTime),
              section: rating,
            });
          }
        }, 0);
      });

      // Track memory usage (if available)
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        track({
          event: 'performance_metric',
          action: 'memory_usage',
          value: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          section: 'info',
        });
      }

      // Cleanup function
      return () => {
        observer.disconnect();
        lcpObserver.disconnect();
        clsObserver.disconnect();
        fidObserver.disconnect();
        window.removeEventListener('beforeunload', trackCLS);
      };
    };

    // Start tracking after a short delay to ensure page is loaded
    const timeout = setTimeout(trackWebVitals, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [track]);

  // This component doesn't render anything
  return null;
}
