# Portfolio Site

A minimal portfolio site with two tabs: **About** (nils.io-style bio + project list) and **Work** (image carousel).

## Quick Start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

---

## How to Edit

### 1. Your Name & Bio

Edit `src/components/PortfolioPage.jsx`, lines 14–26:

```jsx
<span className="bold">Hello, welcome!</span>        // ← your greeting
```
```jsx
A collection of engineering projects spanning...      // ← your bio paragraph
```
```jsx
<a href="mailto:hello@example.com">hello@example.com</a>  // ← your email
```

### 2. Site Title & Footer

Edit `src/content/content.json`, the `"project"` object:

```json
{
  "title": "Your Name",          // shows in footer as "Your Name © 2025"
  "year": "2025",
  "description": "Your tagline", // shows under greeting on About page
  "logo": "/logo.svg"
}
```

### 3. Projects

Edit the `"sketches"` array in `src/content/content.json`. Each entry:

```json
{
  "id": "project-001",                        // unique ID
  "image": "./drawings/page_1.webp",          // carousel image (Work tab)
  "location": "Ground Floor Plan",            // label shown above carousel
  "date": "2025-01-15",                       // shown in accordion + carousel
  "title": "Cloud Infrastructure Platform",   // project heading (About tab)
  "tags": ["Go", "Kubernetes", "Terraform"],  // tech stack (About tab accordion)
  "note": "Short description",                // alt text for carousel
  "content": "## Overview\n\nMarkdown..."     // detailed writeup (not rendered yet)
}
```

**To add a project:** duplicate an entry, change the `id`, and update the fields.

**To remove a project:** delete the entire `{ ... }` block and its trailing comma.

### 4. Carousel Images

Place image files in `public/drawings/` and reference them in content.json as `"./drawings/filename.webp"`.

### 5. Logo & Favicon

Replace `public/logo.svg` with your own logo.

### 6. CV / Resume

Replace `public/cv.pdf` with your own file (linked from the Work tab).

---

## File Structure

```
src/
  App.jsx                    # Tab navigation + theme toggle
  index.css                  # Global styles + design tokens
  content/
    content.json             # ← All your content lives here
  components/
    PortfolioPage.jsx        # About tab (bio + project accordion)
    PortfolioPage.css
    SketchbookPage.jsx       # Work tab (carousel)
    Carousel.jsx             # Draggable image carousel
    PaginationBars.jsx       # Thin bar indicators
    SketchMeta.jsx           # Title/date overlay on carousel
    EdgeGradients.jsx        # Fade edges on carousel
public/
  drawings/                  # Carousel images
  logo.svg                   # Site logo
  cv.pdf                     # Resume download
```

## Deploy

```bash
npm run deploy    # builds + deploys to GitHub Pages
```
