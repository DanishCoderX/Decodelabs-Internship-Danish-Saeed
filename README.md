# Danish Saeed — Frontend Developer Portfolio
### DecodeLabs Batch 2026

A multi-project portfolio built during the DecodeLabs Frontend Development internship program. Each project demonstrates a distinct layer of frontend mastery — from semantic structure, to responsive design, to JavaScript interactivity — all sharing a unified dark/amber design system.

---

## 🗂️ Project Structure

```
/
├── index.html       # Portfolio Homepage (this file)
├── P0.css           # Homepage styles
├── P1.html          # Project 1 — Static Webpage Design
├── P1.css           # Project 1 styles
├── P2.html          # Project 2 — Responsive Web Layout
├── P2.css           # Project 2 styles
├── P3.html          # Project 3 — Interactive Web Elements
├── P3.css           # Project 3 styles
├── P3.js            # Project 3 JavaScript
├── Me.jpeg          # Profile photo
└── README.md        # This file
```

---

## 🚀 Live Projects

| Project | Title | Link |
|---------|-------|------|
| index | Portfolio Homepage | `index.html` |
| P1 | Static Webpage Design | `P1.html` |
| P2 | Responsive Web Layout | `P2.html` |
| P3 | Interactive Web Elements | `P3.html` |

> Open any `.html` file directly in a browser — no build step, no dependencies, no server required.

---

## 📁 Projects

### index — Portfolio Homepage
The central hub linking all three projects. Features a theme toggle (dark/light), animated hero visual with rotating CSS rings, about section, full project showcase, skills grid, and contact section.

**Key techniques:** CSS custom properties, `color-mix()`, `clamp()`, localStorage persistence, smooth scroll.

---

### P1 — Static Webpage Design
A pixel-perfect static page built with zero JavaScript. Demonstrates that great frontend starts with solid structure before a single line of CSS.

**Key techniques:**
- Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- BEM methodology — Block, Element, Modifier naming
- CSS Grid (macro layout) + Flexbox (micro alignment)
- CSS custom properties (design tokens)
- W3C-valid markup, ARIA attributes, 4.5:1 contrast ratios
- Animated scrolling ticker via `@keyframes`
- Responsive breakpoints at 900px and 600px

---

### P2 — Responsive Web Layout
A mobile-first page that adapts gracefully from 320px to 1440px+. Demonstrates progressive enhancement — base CSS written for the smallest screen, enhanced upward with `min-width` media queries.

**Key techniques:**
- Mobile-first strategy: base → `480px` → `768px` → `1024px`
- Fluid typography with `clamp()` — no stepped font-size breakpoints
- `repeat(auto-fit, minmax(...))` self-responsive grid
- Hamburger menu with JavaScript (open/close, body scroll lock, resize cleanup)
- 44×44px minimum touch targets throughout
- `min()` container width for fluid gutters
- WCAG-compliant — zoom never disabled

---

### P3 — Interactive Web Elements
Four JavaScript-powered features, each following the **IPO loop** (Input → Process → Output). All DOM manipulation uses safe patterns — `textContent` over `innerHTML`, `const` for references, `let` for mutable state, no `var`.

**Features:**

| Feature | Input | Process | Output |
|---------|-------|---------|--------|
| **Dark Mode Toggle** | Button click | Flip `isDark`, write `localStorage` | `data-theme` on `<html>` → CSS variables cascade |
| **Tab Switcher** | Tab button click | Toggle `is-active` on correct btn/panel | Panel shown, ARIA updated |
| **Accordion FAQ** | Accordion button click | Close all, open clicked (if closed) | `is-open` → CSS `max-height` transition |
| **Character Counter** | `input` event on textarea | Calc length vs limit | `textContent` update + `is-warning` / `is-error` state |
| **Dynamic Task List** | Add/delete/clear | `createElement`, `appendChild`, `remove()` | DOM nodes built and destroyed safely |

**Engineering conventions:**
- `js-` prefix → JavaScript hooks only, never styled
- `is-` prefix → Visual state classes, toggled by JS, styled by CSS
- Toast notification system built with `createElement` + auto-dismiss
- `'use strict'` mode enforced

---

## 🎨 Design System

All four pages share a unified visual language:

| Token | Value |
|-------|-------|
| Background | `#0f0e0e` |
| Surface | `#1a1918` |
| Accent (amber gold) | `#e8c547` |
| Text | `#f0ede8` |
| Muted text | `#8a8480` |
| Border | `#2e2c2b` |
| Display font | Fraunces (Google Fonts) |
| Body font | DM Sans (Google Fonts) |

Light theme variants are defined via `[data-theme="light"]` CSS overrides, toggled in P0 and P3.

---

## 🛠️ Tech Stack

- **HTML5** — Semantic landmarks, ARIA, W3C validation
- **CSS3** — Custom properties, Grid, Flexbox, `clamp()`, `min()`, `@keyframes`
- **JavaScript (ES6+)** — DOM API, `classList`, `localStorage`, `addEventListener`, `createElement`
- **Google Fonts** — Fraunces + DM Sans
- **No frameworks, no build tools, no dependencies**

---

## ✅ Quality Standards

- [x] W3C HTML Validator — zero errors
- [x] External CSS only — zero inline styles
- [x] BEM methodology — consistent naming
- [x] DRY principle — shared design tokens, reusable components
- [x] WCAG AA contrast ratios (4.5:1 minimum)
- [x] Keyboard navigable — all interactive elements reachable via Tab
- [x] ARIA attributes — `aria-label`, `aria-expanded`, `aria-selected`, `aria-live`
- [x] `textContent` only — no `innerHTML` for user-generated content (XSS-safe)
- [x] `'use strict'` — enforced in all JS files
- [x] Touch targets — 44×44px minimum on all interactive elements
- [x] Images — `alt` text on every `<img>`, `aria-hidden` on decorative elements

---

## 👤 Author

**Danish Saeed**
Frontend Developer Intern — DecodeLabs Batch 2026

📧 [daanishsaeed593@gmail.com](mailto:daanishsaeed593@gmail.com)
🐙 [github.com/DanishCoderX](https://github.com/DanishCoderX)

---

*DecodeLabs Frontend Development Program · Batch 2026*
