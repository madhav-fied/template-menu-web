# Cafe Menu

Static site for cafe menus, built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 18+
- pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

Generate the static site into `out/`:

```bash
pnpm build
```

The `out/` directory can be deployed to any static host (Nginx, GitHub Pages, Cloudflare Pages, etc.).

To preview the static build locally:

```bash
pnpm dlx serve out
```

## Project Structure

```
app/
  layout.tsx        # Root layout (fonts, metadata)
  page.tsx          # Home page
  globals.css       # Global styles

public/
  images/
    menu/           # Menu item photos
```

## Images

Place menu item images in `public/images/menu/` and reference them as `/images/menu/<filename>`.

Next.js `<Image>` component is recommended for optimized images. Since this is a static export, set a fixed `width` and `height` (or use `fill` with a sized container) — the built-in image optimization loader is disabled in static mode.

```tsx
import Image from "next/image";

<Image src="/images/menu/latte.jpg" alt="Latte" width={400} height={300} />
```
