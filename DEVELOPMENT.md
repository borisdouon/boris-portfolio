# Boris Douon Portfolio - Development Documentation

## Project Overview

This is a modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. The portfolio showcases Boris Douon's work as a Full-Stack Developer and UI/UX Designer with advanced features including internationalization, analytics, and performance monitoring.

## Tech Stack

### Core Technologies
- **Next.js 15.5.3** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Turbopack** - Fast bundler for development

### UI Components
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Custom Design System** - Consistent styling tokens

### Content Management
- **Contentlayer** - Type-safe content management
- **MDX** - Markdown with React components
- **next-intl** - Internationalization (EN/FR)

### Analytics & Performance
- **Custom Analytics System** - Privacy-friendly tracking
- **Performance Monitor** - Core Web Vitals tracking
- **Accessibility Monitor** - A11y compliance checking

### PDF Generation
- **@react-pdf/renderer** - Resume PDF generation
- **Custom API Routes** - Dynamic PDF creation

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── api/               # API routes (resume generation)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # SEO robots.txt
├── components/            # React components
│   ├── analytics/         # Analytics and performance
│   ├── accessibility/     # A11y monitoring
│   ├── case-study/        # Case study layouts
│   ├── mdx/              # MDX components
│   ├── navigation/        # Navigation components
│   ├── sections/          # Page sections
│   ├── seo/              # SEO metadata
│   └── ui/               # Reusable UI components
├── contexts/             # React contexts
├── i18n/                 # Internationalization
├── lib/                  # Utilities
└── styles/               # Additional styles

content/
├── case-studies/         # MDX case studies
├── translations/         # i18n translations
├── about.json           # About page data
├── projects.json        # Projects data
└── skills.json          # Skills data

public/
├── images/              # Static images
└── *.svg               # SVG assets
```

## Key Features

### 1. Internationalization
- English and French language support
- Dynamic route generation for both locales
- Translated content and UI elements
- SEO-optimized alternate language links

### 2. Content Management
- Type-safe MDX content with Contentlayer
- Dynamic case study pages
- Rich interactive components in MDX
- Structured data for projects and skills

### 3. Analytics & Performance
- **Custom Analytics System**:
  - Page view tracking
  - User interaction monitoring
  - Download and contact tracking
  - Privacy-friendly (localStorage-based)
  
- **Performance Monitoring**:
  - Core Web Vitals (FCP, LCP, CLS, FID)
  - Page load time tracking
  - Memory usage monitoring
  - Performance rating system

- **Accessibility Monitoring**:
  - Missing alt text detection
  - Button accessibility checks
  - Form label validation
  - Heading hierarchy verification
  - Color contrast analysis

### 4. Resume Generation
- Dynamic PDF generation with @react-pdf/renderer
- Standard and recruiter mode variants
- Real-time data integration
- Professional styling with brand colors

### 5. Interactive Components
- **CodeEditor**: Syntax-highlighted code display with copy/download
- **Typography Playground**: Interactive font testing
- **Component Playground**: Live component demos
- **Before/After Slider**: Image comparison tool

### 6. Recruiter Mode
- Context-based feature toggle
- Enhanced content for recruiters
- Additional KPIs and achievements
- Persistent user preference

## Performance Optimizations

### Next.js Configuration
```typescript
// next.config.ts optimizations
experimental: {
  optimizeCss: true,
  optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-accordion'],
},
images: {
  formats: ['image/webp', 'image/avif'],
  minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
},
compress: true,
swcMinify: true,
compiler: {
  removeConsole: process.env.NODE_ENV === 'production',
}
```

### Image Optimization
- WebP and AVIF format support
- Responsive image sizing
- Lazy loading with Next.js Image component
- 30-day cache TTL

### Bundle Optimization
- Package import optimization for large libraries
- CSS optimization in production
- Console removal in production builds
- SWC minification

## SEO Implementation

### Metadata Generation
- Dynamic metadata for each page
- Open Graph and Twitter Card support
- Structured data (JSON-LD) for person and website
- Canonical URLs and language alternates

### Sitemap & Robots
- Dynamic sitemap generation including case studies
- SEO-friendly robots.txt
- Proper crawling directives

## Development Workflow

### Getting Started
```bash
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript checking

### Content Management
1. Add new case studies in `content/case-studies/`
2. Update skills and projects in respective JSON files
3. Add translations in `content/translations/`
4. Contentlayer automatically generates types

### Component Development
1. Create components in appropriate directories
2. Use TypeScript for type safety
3. Follow accessibility best practices
4. Add analytics tracking where appropriate

## API Routes

### Resume Generation (`/api/resume`)
- **GET**: Standard resume PDF
- **POST**: Recruiter mode resume with additional data
- Dynamic content from JSON data sources
- Professional PDF styling

## Deployment Considerations

### Environment Variables
```env
GOOGLE_SITE_VERIFICATION=your_verification_code
NODE_ENV=production
```

### Build Optimization
- Static generation for most pages
- Dynamic generation for API routes
- Optimized bundle splitting
- Asset compression

### Performance Targets
- **FCP**: < 1.8s (Good)
- **LCP**: < 2.5s (Good)
- **CLS**: < 0.1 (Good)
- **FID**: < 100ms (Good)

## Browser Support
- Modern browsers (ES2020+)
- Progressive enhancement for older browsers
- Graceful degradation for JavaScript-disabled users

## Accessibility Features
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- High contrast mode support
- Focus management
- Semantic HTML structure

## Future Enhancements
- Real analytics service integration (Google Analytics 4, Plausible)
- Advanced Monaco Editor integration for code examples
- Blog section with MDX support
- Contact form with email integration
- Advanced search functionality
- PWA capabilities

## Troubleshooting

### Common Issues
1. **Contentlayer build errors**: Ensure all MDX files have valid frontmatter
2. **i18n routing issues**: Check locale configuration in middleware
3. **PDF generation errors**: Verify React.createElement usage in PDF components
4. **Performance issues**: Check bundle analyzer for large dependencies

### Development Tips
- Use the analytics console logs in development to debug tracking
- Performance metrics are logged to console in development
- Accessibility issues are warned in development console
- Use React DevTools for component debugging
