# Digital Sketchbook

A customizable full-screen sketch carousel inspired by [liumichelle.com/project/sketchbook/full](https://www.liumichelle.com/project/sketchbook/full).

Built with React, Framer Motion, and Vite.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## How to Customize

All your content lives in **two places**:

### 1. Your Sketches → `public/sketches/`

Drop your sketch images here. Supports `.jpg`, `.png`, `.svg`, `.webp` — any web-compatible format.

### 2. Your Config → `src/content/content.json`

This single file controls everything:

```json
{
  "project": {
    "title": "My Sketchbook",
    "year": "2025",
    "description": "My collection of daily sketches.",
    "logo": "/logo.svg",
    "toolCategories": [
      { "label": "Medium", "tools": ["Pencil", "Watercolor"] }
    ]
  },
  "theme": {
    "backgroundColor": "#ffffff",
    "textColor": "#111827",
    "subtextColor": "#9ca3af",
    "fontFamily": "'Figtree', system-ui, sans-serif",
    "accentColor": "#3b82f6"
  },
  "sketches": [
    {
      "id": "sketch-001",
      "image": "/sketches/001.jpg",
      "location": "Central Park",
      "date": "2025-03-04",
      "note": "Morning light study"
    }
  ]
}
```

### What Each Field Does

| Field | Where It Appears | Example |
|-------|-----------------|---------|
| `project.title` | Info modal header | `"My Sketchbook"` |
| `project.year` | Info modal, next to title | `"2025"` |
| `project.description` | Info modal body text | `"A collection of..."` |
| `project.logo` | Top-left corner logo | `"/logo.svg"` |
| `project.toolCategories` | Info modal, tagged list | See above |
| `theme.backgroundColor` | Page background + edge gradients | `"#ffffff"` |
| `theme.textColor` | Location text color | `"#111827"` |
| `theme.subtextColor` | Date text, info button color | `"#9ca3af"` |
| `theme.fontFamily` | All text on the page | `"'Inter', sans-serif"` |
| `theme.accentColor` | Accent highlights | `"#3b82f6"` |
| `sketches[].image` | The sketch image path | `"/sketches/001.jpg"` |
| `sketches[].location` | Displayed above the carousel | `"Coffee Shop"` |
| `sketches[].date` | Displayed below location (formatted) | `"2025-03-10"` |
| `sketches[].note` | Used as image alt text | `"Quick gesture sketches"` |
| `sketches[].title` | Detail popup heading | `"Cloud Platform"` |
| `sketches[].tags` | Tech stack tag pills | `["Go", "Kubernetes"]` |
| `sketches[].content` | **Markdown** body for the detail popup | `"## Overview\n\nBuilt a..."` |

### Step-by-Step: Add Your Own Content

1. **Replace the logo**: Put your own `logo.svg` (or `.png`) in `public/` and update `project.logo` in `content.json`

2. **Add your sketches**: 
   - Drop images into `public/sketches/`
   - Add entries to the `sketches` array in `content.json`
   - Each entry needs: `id`, `image` (path), `location`, `date`, `note`

3. **Change colors**: Edit `theme.backgroundColor`, `theme.textColor`, etc.

4. **Change fonts**: 
   - Add a Google Fonts `<link>` to `index.html`
   - Update `theme.fontFamily` in `content.json`

5. **Update project info**: Edit `project.title`, `project.year`, `project.description`

## Features

- **Drag/swipe carousel** with momentum and snapping
- **Keyboard navigation** (← →)
- **Responsive** — mobile and desktop layouts
- **Animated pagination bars** that respond to drag position
- **Project detail popup** — click any sketch to see a full markdown-rendered project page (supports headings, lists, code blocks, tables, blockquotes)
- **Info modal** (click ⓘ in top-right)
- **Edge fade gradients** for depth

## Deploy

```bash
npm run build
```

Upload the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Project Structure

```
sketchbook-app/
├── public/
│   ├── sketches/          ← Your sketch images go here
│   └── logo.svg           ← Your logo
├── src/
│   ├── content/
│   │   └── content.json   ← All your content & theme config
│   ├── components/
│   │   ├── SketchbookPage.jsx  (main page layout)
│   │   ├── Header.jsx          (logo + info button)
│   │   ├── InfoModal.jsx       (project details popup)
│   │   ├── SketchMeta.jsx      (location + date display)
│   │   ├── Carousel.jsx        (draggable image carousel)
│   │   ├── PaginationBars.jsx  (animated dot indicators)
│   │   └── EdgeGradients.jsx   (left/right fade overlays)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
└── package.json
```
