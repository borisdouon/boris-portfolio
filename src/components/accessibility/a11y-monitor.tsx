"use client";

import { useEffect } from "react";
import { useAnalytics } from "@/components/analytics/analytics";

export function AccessibilityMonitor() {
  const { track } = useAnalytics();

  useEffect(() => {
    // Check for common accessibility issues
    const checkAccessibility = () => {
      const issues: string[] = [];

      // Check for images without alt text
      const images = document.querySelectorAll('img:not([alt])');
      if (images.length > 0) {
        issues.push(`${images.length} images missing alt text`);
      }

      // Check for buttons without accessible names
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      const buttonsWithoutText = Array.from(buttons).filter(btn => !btn.textContent?.trim());
      if (buttonsWithoutText.length > 0) {
        issues.push(`${buttonsWithoutText.length} buttons without accessible names`);
      }

      // Check for form inputs without labels
      const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
      const inputsWithoutLabels = Array.from(inputs).filter(input => {
        const id = input.getAttribute('id');
        return !id || !document.querySelector(`label[for="${id}"]`);
      });
      if (inputsWithoutLabels.length > 0) {
        issues.push(`${inputsWithoutLabels.length} form inputs without labels`);
      }

      // Check for headings hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      let hierarchyIssues = 0;
      
      headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (previousLevel > 0 && level > previousLevel + 1) {
          hierarchyIssues++;
        }
        previousLevel = level;
      });

      if (hierarchyIssues > 0) {
        issues.push(`${hierarchyIssues} heading hierarchy issues`);
      }

      // Check color contrast (basic check)
      const elementsWithColor = document.querySelectorAll('[style*="color"]');
      let contrastIssues = 0;
      
      elementsWithColor.forEach(element => {
        const styles = window.getComputedStyle(element);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;
        
        // This is a simplified check - in production, you'd use a proper contrast ratio calculation
        if (color && backgroundColor && color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
          // Basic heuristic: if colors are too similar, flag as potential issue
          const colorLuminance = getLuminance(color);
          const bgLuminance = getLuminance(backgroundColor);
          const contrast = (Math.max(colorLuminance, bgLuminance) + 0.05) / (Math.min(colorLuminance, bgLuminance) + 0.05);
          
          if (contrast < 4.5) {
            contrastIssues++;
          }
        }
      });

      if (contrastIssues > 0) {
        issues.push(`${contrastIssues} potential color contrast issues`);
      }

      // Track accessibility metrics
      track({
        event: 'accessibility_check',
        action: 'scan_complete',
        value: issues.length,
        section: issues.length === 0 ? 'pass' : 'issues_found',
      });

      if (issues.length > 0 && process.env.NODE_ENV === 'development') {
        console.warn('Accessibility issues found:', issues);
      }
    };

    // Helper function to calculate luminance (simplified)
    function getLuminance(color: string): number {
      // This is a very basic implementation
      // In production, you'd use a proper color parsing library
      const rgb = color.match(/\d+/g);
      if (!rgb || rgb.length < 3) return 0;
      
      const [r, g, b] = rgb.map(c => {
        const val = parseInt(c) / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    // Run accessibility check after page load
    const timeout = setTimeout(checkAccessibility, 2000);

    // Also check on focus events to catch dynamic content
    const handleFocus = () => {
      setTimeout(checkAccessibility, 100);
    };

    document.addEventListener('focusin', handleFocus);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('focusin', handleFocus);
    };
  }, [track]);

  return null;
}
