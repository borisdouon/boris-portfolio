# 📸 Image Setup Guide for Vercel Support Dashboard

## **Required Images**

To complete the portfolio integration, you need to add screenshots of the Vercel Support Dashboard to the following locations:

### **Image Locations**

```
boris-portfolio/public/images/projects/vercel-dashboard/
├── cover.png          # Main hero image (1920x1080 recommended)
├── inbox.png          # Inbox/ticket list view
├── messaging.png      # Ticket detail with messaging
├── admin.png          # Admin panel screenshot
└── analytics.png      # Analytics dashboard
```

---

## **How to Take Screenshots**

### **Step 1: Run the Dashboard**

```bash
cd vercel-support-dashboard
npm run dev
```

Visit: http://localhost:3000

### **Step 2: Take Screenshots**

Use your browser's screenshot tool or a tool like:
- **Windows**: Windows + Shift + S
- **Mac**: Cmd + Shift + 4
- **Browser DevTools**: F12 → Device Toolbar → Screenshot

### **Step 3: Recommended Screenshots**

#### **1. cover.png** (Main Hero Image)
- **Page**: Inbox page
- **What to show**: Full dashboard with sidebar, ticket list, and filters
- **Size**: 1920x1080px or 16:9 aspect ratio
- **Tips**: 
  - Make sure there are several tickets visible
  - Show the sidebar with navigation
  - Capture in light or dark mode (your preference)

#### **2. inbox.png** (Inbox View)
- **Page**: `/app/inbox`
- **What to show**: Ticket list with filters active
- **Tips**:
  - Show "All Tickets", "My Tickets", or "Unassigned" filter
  - Display ticket cards with priority badges
  - Include the search bar

#### **3. messaging.png** (Messaging Interface)
- **Page**: `/app/ticket/[id]` (any ticket)
- **What to show**: Ticket detail with message thread
- **Tips**:
  - Show at least 3-4 messages
  - Include the message composer at the bottom
  - Display ticket metadata sidebar on the right

#### **4. admin.png** (Admin Panel)
- **Page**: `/app/admin`
- **What to show**: User management table
- **Tips**:
  - Show the statistics cards at the top
  - Display the user table with different roles
  - Sign in as admin to access this page

#### **5. analytics.png** (Analytics Dashboard)
- **Page**: `/app/analytics`
- **What to show**: Charts and KPIs
- **Tips**:
  - Show the KPI cards (Total, Open, Avg Resolution, SLA)
  - Include at least one chart (pie or bar chart)
  - Sign in as admin to access this page

---

## **Quick Screenshot Workflow**

### **Option 1: Manual Screenshots**

1. Run the dashboard locally
2. Navigate to each page
3. Take screenshots
4. Resize to 1920x1080 (or maintain 16:9 aspect ratio)
5. Save as PNG files
6. Place in `public/images/projects/vercel-dashboard/`

### **Option 2: Use Placeholder Images (Temporary)**

If you want to test the layout first, you can use placeholder images:

```bash
# Create placeholder images (requires ImageMagick or similar)
cd boris-portfolio/public/images/projects/vercel-dashboard/

# Or download from placeholder services:
# https://placehold.co/1920x1080/1e293b/white?text=Dashboard+Cover
```

---

## **Image Optimization Tips**

### **Before Adding Images:**

1. **Resize**: Keep images at 1920x1080 or smaller
2. **Compress**: Use tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - ImageOptim (Mac)
3. **Format**: PNG for screenshots (better quality)
4. **File Size**: Aim for under 500KB per image

### **Next.js Automatic Optimization**

Next.js will automatically optimize your images when you use the `<Image>` component (which we're already using), so don't worry too much about perfect optimization.

---

## **Testing the Images**

After adding the images:

1. **Restart your portfolio dev server**:
   ```bash
   cd boris-portfolio
   npm run dev
   ```

2. **Visit the homepage**: http://localhost:3000
   - Scroll to "Featured Work" section
   - You should see the Vercel Dashboard card with the cover image

3. **Click "Case Study"**: 
   - Should navigate to `/en/work/vercel-support-dashboard`
   - You should see all 5 images displayed

---

## **Fallback Behavior**

If images are missing, the portfolio will show:
- **Featured Work**: Gradient background with project title
- **Case Study Page**: Gradient backgrounds as placeholders

This means the site won't break if images are missing, but it will look much better with real screenshots!

---

## **Alternative: Use Demo Images**

If you want to use demo/mockup images temporarily, you can:

1. Create simple mockups in Figma/Canva
2. Use browser mockup generators
3. Add "Coming Soon" text overlays

---

## **Current Status**

✅ **Code Updated**: Portfolio now expects images
✅ **Paths Configured**: All image paths are set correctly
⏳ **Images Needed**: 5 screenshots required
🎯 **Next Step**: Take screenshots and add to `public/images/projects/vercel-dashboard/`

---

## **Quick Checklist**

- [ ] Run Vercel Support Dashboard locally
- [ ] Take screenshot of inbox page → save as `cover.png`
- [ ] Take screenshot of inbox with filters → save as `inbox.png`
- [ ] Take screenshot of ticket detail → save as `messaging.png`
- [ ] Take screenshot of admin panel → save as `admin.png`
- [ ] Take screenshot of analytics → save as `analytics.png`
- [ ] Place all images in `boris-portfolio/public/images/projects/vercel-dashboard/`
- [ ] Restart portfolio dev server
- [ ] Test on homepage and case study page

---

**Once images are added, your portfolio will be 100% complete!** 🎉
