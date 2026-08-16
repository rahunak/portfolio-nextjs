# SEO Optimization Plan

**Created:** 2026-08-16  
**Project:** Eugene Zaiko Portfolio (Next.js App Router)

---

## ✅ ВЫПОЛНЕНО

### Phase 1: Core Metadata & Structured Data ✓
- [x] Updated `src/app/page.tsx` with comprehensive metadata
  - [x] Added metadataBase with production URL (https://eugenezaiko.com)
  - [x] Enhanced title with keywords (Senior, Node.js, React, PostgreSQL Expert)
  - [x] Improved description with concrete achievements (5+ years, 109M+ rows, event-driven, AI apps)
  - [x] Added structured keywords array (17 targeted keywords)
  - [x] Configured robots with max-snippet settings
  - [x] Added canonical URL
  - [x] Enhanced OpenGraph (type: profile)
  - [x] Added Twitter Card metadata
- [x] Added JSON-LD structured data (Person schema)
  - [x] Included jobTitle, worksFor, knowsAbout
  - [x] Added sameAs links (GitHub, LinkedIn, Telegram)
  - [x] Included contact information (email, phone, address)

### Phase 2: Portfolio Component Enhancements ✓
- [x] Updated Hero section
  - [x] Changed to "Senior Full-Stack Engineer" (removed location for professional positioning)
  - [x] Focused on English-speaking developer positioning
- [x] Added microdata to experience items
  - [x] Wrapped experience in itemScope/itemType (OrganizationRole)
  - [x] Added itemProp attributes (startDate, roleName, description)

### Phase 3: Technical SEO Files ✓
- [x] Created `public/robots.txt`
  - [x] Allow all crawlers
  - [x] Block /api/ routes
  - [x] Add sitemap reference
- [x] Created `public/sitemap.xml`
  - [x] Added homepage with priority 1.0
  - [x] Added sections (work, skills, about, contact) with priority 0.7-0.8
  - [x] Set appropriate changefreq (monthly)
  - [x] Added lastmod dates (2026-08-16)

### Phase 4: Layout.tsx Updates ✓
- [x] Verified `<html lang="en">` is present
- [x] Removed duplicate metadata (moved to page.tsx)
- [x] Kept only icons metadata in layout.tsx

### Phase 5: Next.js Configuration ✓
- [x] Updated `next.config.ts`
  - [x] Enabled compress: true
  - [x] Configured images.formats: ['image/avif', 'image/webp']

### Phase 6: Optional Enhancements ✓
- [x] Added `public/llms.txt` (for AI search engines like Perplexity, ChatGPT Search)

---

## 🔄 В ПРОЦЕССЕ

### Phase 7: Open Graph Image (REQUIRES MANUAL CREATION)
- [ ] Create Open Graph image
  - [ ] Design 1200×630px og-image.jpg
  - [ ] Include name, title, and visual brand elements
  - [ ] Optimize for social media previews
  - **Note:** Currently using `/og-image.jpg` in metadata - needs to be created

---

## 📋 ЗАПЛАНИРОВАНО

### Phase 7: Validation & Testing
- [ ] Test structured data with Google Rich Results Test
- [ ] Validate metadata with Schema.org validator
- [ ] Check mobile responsiveness
- [ ] Verify Core Web Vitals with Lighthouse
- [ ] Test Open Graph preview on LinkedIn/Twitter
- [ ] Submit sitemap to Google Search Console

### Phase 8: Monitoring Setup
- [ ] Add Google Search Console
- [ ] Configure analytics (if needed)
- [ ] Set up monitoring for indexing status
- [ ] Track Core Web Vitals over time

---

## 🎯 Key SEO Improvements

**Current Issues:**
1. ❌ Client component exports metadata (doesn't work in App Router)
2. ❌ No structured data (JSON-LD) for Person/Profile
3. ❌ No robots.txt or sitemap.xml
4. ❌ No Open Graph image optimized for social media
5. ❌ Generic location "Belarus" (should be "Minsk, Belarus")
6. ❌ Missing microdata on experience items
7. ❌ metadataBase not configured (breaks relative OG URLs)

**After Optimization:**
1. ✅ Server Component (page.tsx) exports rich metadata
2. ✅ Person schema with professional details
3. ✅ Proper robots.txt + sitemap
4. ✅ Optimized OG image (1200×630px)
5. ✅ Specific location for local SEO
6. ✅ Semantic HTML with microdata
7. ✅ Production-ready metadata configuration

---

## 🔍 Trade-offs

**Architecture:**
- Split into `page.tsx` (Server Component with metadata) + `Portfolio.tsx` (Client Component with UI)
- This is the only production-ready way in Next.js App Router
- Adds one file but follows Next.js best practices

**Structured Data:**
- Person schema preferred over ProfilePage for portfolio sites
- Google matches "who is this person" queries better with Person type

**Images:**
- Need to create og-image.jpg (1200×630px) for social previews
- Critical for LinkedIn/Twitter sharing

---

## 📊 Expected Results

**Before:**
- Basic metadata in layout.tsx
- No structured data
- No sitemap/robots.txt
- Generic social preview

**After:**
- Comprehensive metadata with keywords
- Person schema for rich results
- Proper crawling configuration
- Professional social previews
- Better ranking for:
  - "Senior Full-Stack Engineer Node.js"
  - "NestJS developer Belarus"
  - "PostgreSQL optimization expert"
  - "React Next.js developer"
