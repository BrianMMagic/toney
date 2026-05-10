# Reference Design Analysis: aventuradentalarts.com
**For Design Inspiration — anthonyentertains.com (Corporate Magician)**

Analyzed: May 2026 | Source: https://aventuradentalarts.com/
Tech Stack: Nuxt.js (Vue 3) with scoped component CSS, Swiper.js for carousels, Lenis for smooth scroll, GSAP for scroll-driven animations

---

## 1. OVERALL VISUAL STYLE

### Mood / Aesthetic
Premium, dark-luxury with light counterpoint. The site operates in two worlds simultaneously: a deep navy/near-black foundation for cinematic sections, and a warm off-white (`#eae8e8`) for clinical/content sections. The contrast between these creates breathing room and visual rhythm. The gold accent provides warmth and signals luxury without being flashy. Overall impression: editorial, sophisticated, unhurried.

### Color Palette (from `:root` CSS variables)

| Variable | Hex/Value | Role |
|---|---|---|
| `--c-black` | `#000000` | Absolute black |
| `--c-white` | `#ffffff` | Pure white |
| `--c-brand-navy` | `#14151d` | PRIMARY dark — near-black navy, the dominant dark background |
| `--c-brand-gold` | `#b38c61` | ACCENT — warm bronze-gold for highlights |
| `--c-light-base` | `#eae8e8` | PRIMARY light — warm off-white, used for light sections and some text |
| `--c-light-beige` | `#d6d1d0` | Secondary light — slightly warmer/darker off-white |
| `--c-dark-base` | `#424346` | Body text color — medium dark gray |
| `--c-dark-brown` | `#6f6968` | Tertiary text, muted elements |
| `--c-error` | `#ff3c3c` | Error states |

### Gradient Tokens

```css
--c-brand-navy-linear: linear-gradient(180deg, #2a2b35, #010203);
--c-brand-navy-radial: radial-gradient(44.61% 50% at 48.59% 50%, #000 0%, #101013 46.9%, #474b55 100%);
--c-brand-gold-gradient: linear-gradient(270deg, #b38b61, #dac8b7);
```

### Opacity Variants (CSS variables for semi-transparent layers)

```css
--c-light-40:  hsla(0, 5%, 91%, 0.4)   /* muted light text, dividers */
--c-light-15:  hsla(0, 5%, 91%, 0.15)  /* subtle borders in dark sections */
--c-dark-40:   rgba(66, 67, 70, 0.4)   /* muted dark text */
--c-dark-10:   rgba(66, 67, 70, 0.1)   /* very subtle dividers in light sections */
```

### Section Background Color Alternation
The page alternates between dark navy and light off-white sections in a deliberate rhythm:

1. **Hero** → Light (`var(--c-light-base)` = `#eae8e8`) — but contains a dark video panel
2. **Our Goal** → Light (`var(--c-light-base)`)
3. **Services** → Dark (`var(--c-brand-navy)` = `#14151d`)
4. **Banner** → Dark (full-screen photo with gradient overlay)
5. **Technology** → Light (`var(--c-light-base)`)
6. **Experts** → Dark (`var(--c-brand-navy)`)
7. **Testimonials** → Dark (`#111115` — near black, slight blue-purple tint)
8. **Pre-Footer CTA** → Dark (`var(--c-brand-navy)`)
9. **Footer** → Deep dark (`#000203` on mobile; navy gradient on desktop)

---

## 2. TYPOGRAPHY

### Font Stack
Two fonts only — no Google Fonts. Both are self-hosted TTF files via `@font-face`:

```css
/* DISPLAY / SERIF — used for all headings */
@font-face {
  font-family: InstrumentSerif;
  font-weight: 400;
  src: url(/_nuxt/InstrumentSerif-Regular.C8Ywmrcl.ttf);
}
@font-face {
  font-family: InstrumentSerif;
  font-style: italic;
  font-weight: 400;
  src: url(/_nuxt/InstrumentSerif-Italic.BeW3a6To.ttf);
}

/* BODY / UI — used for all UI text, labels, buttons */
@font-face {
  font-family: InterTight;
  font-weight: 400 | 500 | 600 | 700;
  /* four weights loaded */
}
```

### CSS Variables for Fonts
```css
--font-instrument: "InstrumentSerif";   /* serif, display font */
--font-inter: "InterTight";              /* sans-serif, UI font */
```

### Default Body Font
```css
body {
  font-family: var(--font-instrument);  /* serif by default! */
  font-size: calc(16/var(--viewport)*100vw);  /* fluid type using vw */
  -webkit-font-smoothing: antialiased;
}
```

Note: The entire font size system is **fluid/viewport-relative**. The `--viewport` variable is `1440` on desktop and `375` on mobile. All `rem` values in this codebase are effectively `vw` units scaled to design width.

### Type Scale Classes

All headings use `InstrumentSerif` at weight 400 (normal). Italic variants are provided by `.h1_italic`, `.h2_italic`, etc., which force `font-style: italic`.

| Class | Desktop Size | Mobile Size | Letter-Spacing | Line-Height | Notes |
|---|---|---|---|---|---|
| `.h0` | `20.5625rem` (~329px at 1440) | `6.75rem` | `-1.0281rem` | `90%` | Massive display only |
| `.h1` | `17.25rem` (~276px) | `6.75rem` | `-0.69rem` | `84%` | Hero-scale headings |
| `.h2` | `9.5625rem` (~153px) | `4.3125rem` | `-0.2869rem` | `80%` | Section headings |
| `.h3` | `5.1875rem` (~83px) | `2.9375rem` | `-0.1037rem` | `93%` | Sub-headings |
| `.h4` | `3.4375rem` (~55px) | `2.375rem` | `-0.1031rem` | `87%` | Card headings |
| `.h5` | `2.1875rem` (~35px) | `1.5rem` | `-0.0656rem` | `85%` | Small headings |

### Body/UI Text Classes (all use `InterTight`)

| Class | Size | Weight | Letter-Spacing | Line-Height | Use |
|---|---|---|---|---|---|
| `.p1` | `1.25rem` | `600` | `-0.025rem` | `109%` | Large body, intro text |
| `.p2` | `0.9375rem` | `700` | `normal` | `113%` | Medium bold text |
| `.p3` | `0.9375rem` | `400` | `0.0094rem` | `105%` | Regular body copy |
| `.c0` | `0.9375rem` | `700` | `normal` | `113%` | UI labels (same as p2) |
| `.c1` | `0.875rem` | `700` | `-0.0175rem` | `113%` | Button text, small labels |
| `.c2` | `0.875rem` | `500` | `-0.0088rem` | `113%` | Secondary labels |
| `.c3` | `0.75rem` | `500` | `normal` | `119%` | Caption text |
| `.c4` | `0.625rem` | `400` | `normal` | `100%` | Tiny labels |

### Typography Approach
- **Headings are italic-aware**: Every heading class has an `_italic` variant and supports `<i>` tags within headlines to switch specific words to italic serif — creating editorial mixed-style headlines like "Your *Perfect* Smile *to Life*"
- **Negative letter spacing at large sizes**: All headings have aggressive negative tracking, especially at large sizes, creating tight cinematic lettering
- **Line-height below 100%**: Large headings use 80–93% line-height for dense stacking
- **Fluid scaling**: No fixed breakpoints for type size — each heading has exactly one mobile override at `max-width: 1023px`
- **Underline links**: Custom underline styling with `text-decoration-thickness: 6.5%` and `text-underline-offset: 12.5%`

---

## 3. NAVIGATION

### Header Structure
```html
<header class="header with-phone-list" ...>
  <div class="left-part">
    <a class="logo-icon">  <!-- SVG logo mark + SVG wordmark, side by side -->
      <div class="wrap-logo-icon">  <!-- 4.625rem × 2.3125rem icon -->
      <div class="wrap-logo-text">  <!-- 5.8125rem wide wordmark -->
    </a>
    <div class="header-controls">  <!-- desktop nav: Services + Menu -->
      <div class="header-btn service">  <!-- "Services" with chevron dropdown -->
      <div class="header-btn menu">     <!-- "Menu" with animated hamburger lines -->
    </div>
  </div>
  <div class="right-part">
    <div class="phone-list">       <!-- phone number dropdown -->
    <div class="patient-text">    <!-- "Patient Form" with corner-arrow icon -->
    <button class="header-btn-book">  <!-- "Book A Call" CTA button -->
  </div>
  <!-- Mobile: phone icon circle + hamburger circle -->
  <div class="flex-mob">
    <div class="mob-call-modal">  <!-- 2.5rem circle, beige bg, phone icon -->
    <button class="menu-btn-mob"> <!-- 2.5rem circle, navy bg, hamburger icon -->
  </div>
</header>
```

### Header CSS (Key Rules)
```css
.header {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  padding: 0.75rem 2rem;          /* 12px 32px */
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;           /* transparent by default! */
  z-index: 10;
  transition: transform 0.3s var(--default-ease),
              background-color 0.3s var(--default-ease);
}
/* Mobile */
@media (max-width: 1023px) {
  .header { padding: 0.75rem 1rem; }
}

/* States (JS-toggled classes) */
.header.hide       { transform: translateY(-105%); }       /* scrolled down */
.header.bg         { background-color: var(--c-light-base); } /* on light sections */
.header.light      { /* logo/text in white */ }
.header.dark-base  { /* logo/text in dark-base */ }
```

### Desktop Navigation Links
- Text links (`c2` class = `InterTight 500 0.875rem`) in `var(--c-white)` or `var(--c-dark-base)` depending on section
- Services button has animated chevron that enters from above on hover
- Menu button text has animated hamburger lines that slide-exit right and new "close" lines slide in from left (staggered with `transition-delay: 0.15s` and `0.3s`)
- Transition duration: `0.9s cubic-bezier(0.24, 0.43, 0.15, 0.97)` — very long, theatrical

### "Book A Call" Button (Header CTA)
```css
.wrap-btn {
  background-color: var(--btn-bg, var(--c-light-base));
  border-radius: 4rem;            /* fully pill-shaped */
  padding: 1rem 1.5rem;           /* 16px 24px */
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s var(--default-ease);
}
.wrap-btn.book-btn {
  justify-content: space-between;
  width: 12rem;                   /* ~192px fixed width */
}
```
Button text uses the slide-up animation on hover: `transform: translateY(-105%)` with absolute-positioned duplicate text below.

### Mobile Navigation
- Desktop controls (`header-controls`, `right-part`) hidden via `display: none`
- Two circular icon buttons shown: beige phone circle + navy hamburger circle, both `2.5rem` (40px)
- Full-screen menu slide-up from bottom when hamburger tapped
- Service links expand/collapse within mobile menu with chevron indicator
- Social links and "Book" button appear at bottom of mobile menu

### Sticky/Scroll Behavior
- Header is `position: fixed` at all times
- JavaScript adds `.hide` class to translate it out of view when scrolling down
- Header background changes (`.bg`, `.light`, `.dark-base`, `.dark-btn` classes) as sections change — the JS tracks which section is in view
- `pointer-events: none` on header by default — individual items re-enable pointer events as needed

### Phone Number Dropdown (Desktop)
```css
.phone-list-content {
  background-color: var(--c-light-base);
  border: 1px solid var(--c-dark-10);
  border-radius: 0 0 1.875rem 1.875rem;  /* rounded bottom only */
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);  /* hidden by default */
  padding: 4.5rem 0.75rem 2.5rem;
  transition: clip-path 0.8s var(--ease-menu);  /* clip-path reveal animation */
}
.phone-list:hover .phone-list-content {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);  /* revealed */
}
```

---

## 4. HERO SECTION

### Section Class: `.hero`
```css
.hero {
  position: relative;
  width: 100%;
  /* The hero is a scrollytelling section — it uses sticky positioning internally */
}
```

### Layout
The homepage hero is a **video + scroll-driven split**. A full-viewport sticky container holds a split layout:
- **Left**: Location tags, animated headline text (appears via clip-path split in white/dark)
- **Right**: Autoplay muted looping `.webm` video with dark overlay (`#14151d40`)

The hero headline text is rendered **twice** (`.wrap-titles.static` and `.wrap-titles.black`) using `clip-path` to create a two-toned text effect where the left half is dark and the right half is white — then these animate as the video/left panel scroll position changes.

### Hero Headline Animation
```css
.wrap-titles.static { clip-path: inset(0 0 -1.5rem 50%); color: var(--c-white); }
.wrap-titles.black  { clip-path: inset(0 50% 0 0); }
```
The two overlapping `.h2` texts use different `clip-path` values, so left side shows dark text (on light bg) and right side shows white text (on video). As scroll progresses, the clip-path values animate.

### Video Panel
```css
.video-preview {
  position: absolute;
  overflow: hidden;
  transform: translateZ(10px);   /* force GPU layer */
  z-index: -1;
}
.video-preview::after {
  background-color: #14151d40;   /* 25% navy overlay */
  content: "";
  position: absolute;
  inset: 0;
}
```

### Text Reveal on Hero
```css
.anim-line1,
.anim-line2 { opacity: 0; }  /* start invisible, JS animates in */
.right-title {
  background: linear-gradient(90deg, #eee8e6 var(--start-gradient, 0), hsla(15,19%,92%,0) var(--stop-gradient, 50%));
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  /* Text fades in gradient-clipped, driven by scroll */
}
```

### Hero Bottom Info Bar
- Location links (Aventura, Bay Harbor, Coral Gables) — `c3` class text, `0.5` opacity label, links in `p2` weight
- Service category labels (Implant Restoration, Advanced Esthetic, Restorative Dentistry) positioned absolutely at bottom center

### Mobile Hero
On mobile, the sticky parallax system is replaced with a simpler layout:
- Full-height single column
- Centered `.h2` title
- Mobile overlay with `backdrop-filter: blur(10px)` over the video

---

## 5. PAGE SECTION PATTERNS

### Section Rhythm (desktop vs. mobile padding)

| Section | Desktop Padding | Mobile Padding | Background |
|---|---|---|---|
| `.hero` | sticky/100vh | `padding: 13.5rem 1rem 3.5rem` | `--c-light-base` |
| `.our-goal` | `12rem 2rem` | `7rem 1rem` | `--c-light-base` |
| `.services` | sticky/100vh | dark | `--c-brand-navy` |
| `.banner` | `75.125rem` tall | `31.25rem` tall | photo |
| `.technology` | `13.5rem 2rem 0` | `1.5rem 0 7rem` | `--c-light-base` |
| `.experts` | ~100vh | dark | `--c-brand-navy` |
| `.testimonials` | `10.5rem 2rem 6rem` | `3.5rem 1rem 8rem` | `#111115` |
| `.pre-footer` | `77.125rem` tall | `41.75rem` tall | `--c-brand-navy` |
| `.footer` | `8rem 2rem 1.5rem` | `4.5rem 1rem 1.5rem` | navy gradient |

### Section Header Pattern
Sections don't use a repeated "label + heading + subtext" pattern. Instead each section has its own editorial approach:
- **Our Goal**: Heading on left, body text + team avatars + scroll-fill paragraph on right
- **Services**: Category navigation on right, sticky image panel on left
- **Technology**: Giant `.h2` sticky title that transitions from light to dark as it scrolls past
- **Experts**: `.h1` heading with `mix-blend-mode: color-dodge` over background image
- **Testimonials**: Quote text on right, slide names list on left

### Sticky Scrollytelling Pattern (used in Services and Technology)
Sections are taller than the viewport and use `position: sticky` on internal containers to create scroll-driven reveals. As the user scrolls through the "fake" height, the sticky container updates content. This is the primary interaction pattern.

```css
.sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
}
```

### Container / Layout
- Side padding: `2rem` desktop (`32px`), `1rem` mobile (`16px`)
- The site does NOT use a max-width container — it spans full width at all sizes
- Primary layout for content sections uses the `.content-part` grid: `grid-template-columns: 42.5rem 1fr` (fixed left column ~680px, flexible right)
- Left column `42.5rem` acts as a consistent sidebar width across sections

---

## 6. CARDS

### Service Cards (Mobile)
```css
.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.service-image-wrap {
  aspect-ratio: 0.86;    /* portrait */
  position: relative;
  width: 100%;
}
/* Gradient overlay at bottom of service images */
.service-image-wrap::after {
  background: linear-gradient(180deg, #14151d00, #14151d08 12.19%, ... #14151d);
  height: 10.5rem;
  bottom: 0;
  position: absolute;
}
```

### Team Member Cards (`.teammate`)
- Grid layout within a 3-column container
- Name in `.p1` (InterTight 600), job title in `.c3` (dimmed with `--c-light-40`)
- Description text hidden on mobile
- No border or shadow — pure typographic cards on the dark background

### Technology Cards / List Items
```css
.list-item {
  border-bottom: 1px solid rgba(66, 67, 70, 0.1);
  padding: 3rem 0;
  position: relative;
  width: 100%;
}
.list-item .opacity { opacity: 0.3; }
.list-item.active .opacity { opacity: 1; }  /* JS-triggered */
```

### Highlight/Feature Cards (hero area)
```css
.highlight {
  aspect-ratio: 2.77;               /* wide landscape */
  background-color: var(--c-light-beige);
  border-radius: 1.5rem;            /* 24px */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  position: relative;
}
/* Dot indicator in top-right corner */
.highlight::before {
  background-color: var(--c-brand-navy);
  border-radius: 50%;
  content: "";
  height: 0.375rem;
  width: 0.375rem;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
}
```

### No Traditional "Card" Component
The site does not use a standard card pattern with borders and shadows. Instead, cards are content-area units defined by `aspect-ratio` constraints, `border-radius`, and background color. There is NO `box-shadow` anywhere in the design.

---

## 7. BUTTONS

### Primary Button Component
```css
.wrap-btn {
  background-color: var(--btn-bg, var(--c-light-base));  /* default: off-white */
  border-radius: 4rem;                  /* full pill / capsule shape */
  padding: 1rem 1.5rem;                 /* 16px 24px */
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s var(--default-ease);
}
/* Book Call button variant */
.wrap-btn.book-btn {
  justify-content: space-between;
  width: 12rem;                         /* ~192px fixed width */
}
/* Mobile override */
@media (max-width: 1023px) {
  .wrap-btn {
    justify-content: space-between;
    min-width: 12rem;
    padding: 1.5rem;                    /* square-ish padding */
  }
}
```

### Button Text Animation on Hover
The button text has an ingenious slide-up reveal — two copies of the text are stacked, the second positioned absolutely below at `top: 105%`:
```css
.text { overflow: hidden; position: relative; }
.text span { display: inline-block; transition: all 0.3s var(--default-ease); }
.text span:nth-child(2) { position: absolute; left: 0; top: 105%; }

.wrap-btn:hover .text span { transform: translateY(-105%); }
/* Both spans slide up together — the first exits top, second enters from bottom */
```

### Button Color Variants (via CSS custom properties)
```css
/* Dark navy button (used for "About Us", "Book A Call" in some contexts) */
.btn-about {
  --btn-bg: var(--c-brand-navy);
  --btn-color: var(--c-light-base);
  --icon-color: var(--c-light-base);
}

/* Light button (default) */
/* --btn-bg: var(--c-light-base) */
/* --btn-color: var(--c-dark-base) */
```

### Submit / Icon-Only Button (Circle)
```css
.wrap-btn {
  background-color: var(--c-light-base);
  border-radius: 50%;               /* circle */
  height: 5rem; width: 5rem;       /* 80px × 80px */
  overflow: hidden;
  position: relative;
}
/* On mobile, expands to pill shape */
@media (max-width: 1023px) {
  .wrap-btn {
    border-radius: 4rem;
    height: 4rem;
    width: 12rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
  }
}
```

### Social / Circle Link Buttons
```css
.circle-link {
  border-radius: 50%;
  height: var(--social-size, 5rem);   /* 80px default */
  width: var(--social-size, 5rem);
  background-color: var(--c-dark-40); /* semi-transparent dark */
  outline: 1px solid transparent;
  overflow: hidden;
  transition: all 0.3s var(--default-ease);
}
.circle-link:hover {
  --icon-color: var(--c-dark-base);
  background-color: var(--c-light-base);
}
/* Light variant */
.socials.light .circle-link {
  --icon-color: var(--c-brand-navy);
  background-color: var(--c-light-base);
}
/* Beige variant (footer area) */
.socials.beige .circle-link {
  --social-size: 3rem;
  background-color: var(--c-light-beige);
}
```

### No Outline/Ghost Buttons
The site does not use traditional "outline" buttons. The closest equivalent is the transparent header state where the button background is semi-transparent.

---

## 8. ANIMATIONS & MOTION

### Easing Tokens
```css
--default-ease:    ease-in-out
--ease-out-quint:  cubic-bezier(0.22, 1, 0.36, 1)   /* fast start, long deceleration */
--ease-menu:       cubic-bezier(0.6, 0.14, 0, 1)    /* snappy, overshoot-ish */
```

### Page Load / Preloader
A full-screen navy preloader (`z-index: 12`) covers the page on load:
- Background: `var(--c-brand-navy)` (#14151d)
- Center: Animated SVG logo mark (200×200px container)
- Bottom: Three category labels in `.c1` text, spaced across width in a 3-column grid
- Fades out after content loads (opacity animation)

### Between-Pages Transition
```css
.between-pages-overlay {
  background-color: #000000b3;   /* 70% black */
  position: fixed;
  inset: 0;
  opacity: 0;
  z-index: 19;
  /* Fades in/out during route navigation */
}
```

### Scroll-Triggered Animations
The site uses **GSAP** (or custom JS with IntersectionObserver) to trigger animations. Key patterns observed:

1. **Text fill by scroll** (`data-fill-by-scroll`, `data-fill-color="#424346"`)
   - Text starts near-transparent and "fills" to full opacity as user scrolls through
   - Creates typewriter-like reveal without character animation

2. **Text by lines** (`data-anim-text-by-lines`)
   - Each line of a paragraph reveals independently with a slight stagger
   - Lines slide up from below with fade-in

3. **Opacity reveal** (`.opacity-anim`)
   - Simple fade from `opacity: 0` to `opacity: 1` on scroll into view

4. **Hero clip-path animation**
   - The dual-text headline system uses `clip-path` values that change during scroll

5. **"Sticky title" dual rendering** (Technology section)
   - Same heading is rendered twice: one in `--c-light-base` and one in `--c-dark-base`
   - As the section title scrolls past a threshold, the dark version reveals via `clip-path` polygon animation

6. **Sticky scrollytelling sections**
   - Services and Technology sections use multiple viewport-heights of scroll distance to drive content changes
   - Content swaps smoothly as user scrolls through

### CSS Keyframe Animations

```css
/* Ticker / marquee text */
@keyframes ticker {
  0%   { transform: translate(0); }
  100% { transform: translate(-100%); }
}

/* Spinning decorative background element (Experts section) */
@keyframes spin {
  0%   { transform: translate(-75%, -75%) rotate(0); }
  25%  { transform: translate(-50%, -50%) rotate(90deg); }
  50%  { transform: translate(-25%, -25%) rotate(180deg); }
  75%  { transform: translate(-50%, -10%) rotate(270deg); }
  100% { transform: translate(-75%, -75%) rotate(1turn); }
}
/* Applied to experts background image with: animation: spin 50s linear infinite */

/* Blinking caret (typewriter cursor in Experts section) */
@keyframes blink-caret {
  0%   { opacity: 1; }
  50%  { opacity: 0; }
  100% { opacity: 1; }
}

/* Background ambient float */
@keyframes smooth-anim-bg {
  0%   { transform: translate(12.5rem); }
  25%  { transform: translateY(1.5rem); }
  50%  { transform: translate(-12.5rem); }
  75%  { transform: translateY(-12.5rem); }
  100% { transform: translate(12.5rem); }
}

/* Pre-footer SVG path animation */
@keyframes anim-pre-footer-path {
  0%   { transform: translate(0) rotate(0); }
  50%  { transform: translate(30rem) rotate(15deg); }
  100% { transform: translate(0) rotate(0); }
}
/* 15s ease-in infinite */
```

### Hover Transitions
- Standard hover: `transition: all 0.3s var(--default-ease)` (ease-in-out, 300ms)
- Menu icon lines: `0.9s cubic-bezier(0.24, 0.43, 0.15, 0.97)` with staggered delays
- Dropdown reveals: `clip-path` transition `0.8s var(--ease-menu)`
- Navigation links: `color 0.3s var(--default-ease)`

### Arrow Icon Hover (Corner-Arrow Effect)
Many links use a diagonal arrow that slides from bottom-left to upper-right on hover:
```css
.wrap-corner-arrow { overflow: hidden; height: 1rem; width: 1rem; }
.wrap-corner-arrow svg:last-child { transform: translate(-100%, 100%); }
/* On hover: */
.wrap-corner-arrow svg:first-child { transform: translate(100%, -100%); }
.wrap-corner-arrow svg:nth-child(2) { transform: translate(0); }
```

### Procedure Item Arrow (Services)
```css
.arrow-main, .arrow-hover {
  background-image: url(/icons/arrow.svg);
  position: absolute; inset: 0;
  transition: all 0.3s var(--default-ease);
}
.arrow-hover { transform: translate(-100%, 100%); }
/* On hover: */
.procedure:hover .arrow-main { transform: translate(100%, -100%); }
.procedure:hover .arrow-hover { transform: translate(0); }
```

### Lenis Smooth Scroll
The site uses the Lenis library for smooth scrolling:
```css
html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto; }
.lenis.lenis-stopped { overflow: hidden; }
```

### Mix-Blend-Mode Effects
- Experts section title: `mix-blend-mode: color-dodge` (on dark background, creates luminous effect)
- Pre-footer contact form title: `mix-blend-mode: difference` (inverts color based on background)
- Decorative background element: `mix-blend-mode: luminosity; opacity: 0.6`

---

## 9. IMAGES

### Image Sizing and Framing
- All images use `position: absolute; inset: 0; object-fit: cover; width: 100%; height: 100%;` (via the `.inner-img` class)
- Images live inside a wrapper that defines the dimensions and `overflow: hidden`
- Common image wrapper `border-radius` values: `1.875rem` (30px) — used on service image, hero panel, procedure cards

### Service Images
```css
.wrap-image {
  aspect-ratio: 86/81;    /* ~1.06 — nearly square portrait */
  border-radius: 1.875rem;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
  width: 100%;
}
```

### Gradient Overlays on Images
Nearly every image section uses gradient overlays to blend into the page background:
```css
/* Dark gradient at image bottom (navy sections) */
background: linear-gradient(180deg,
  #14151d00,
  #14151d08 12.19%,
  #14151d12 22.01%,
  #14151d1f 29.8%,
  #14151d2e 35.95%,
  #14151d3d 40.81%,
  #14151d4f 44.77%,
  #14151d63 48.18%,
  #14151d75 51.41%,
  #14151d8a 54.84%,
  #14151d9e 58.82%,
  #14151db3 63.73%,
  #14151dc7 69.94%,
  #14151ddb 77.8%,
  #14151ded 87.7%,
  #14151d
);
```
This is a very precise multi-stop gradient (16 stops) for extremely smooth image-to-background blending.

### Team Member Avatars
```css
.avatar, .avatar-empty {
  background-color: #dad5d3;       /* warm light gray placeholder */
  border: 3px solid var(--c-light-base);
  border-radius: 50%;              /* circular */
  height: 5.875rem;
  width: 5.875rem;
  overflow: hidden;
}
/* Stacked avatar group with overlap */
.wrap-avatars { display: flex; }
/* Each avatar overlaps the previous (negative margin implied by transform) */
```

### Experts Background Image
```css
.experts-bg {
  animation: spin 50s linear infinite;  /* very slow rotation */
  height: 101.8125rem;
  width: 104.5rem;
  position: absolute;
  object-fit: cover;
}
.experts-overlay {
  /* 16-stop gradient from transparent navy to solid navy */
  /* Starts at top: 0% opacity, reaches 100% at bottom */
  height: 66.375rem;
  position: absolute;
}
```

---

## 10. SPACING SYSTEM

### Base Unit
Spacing is in `rem`, where `1rem = calc(16/1440 * 100vw)` — making all spacing fluid and viewport-relative.

At 1440px viewport: `1rem ≈ 16px` (but it's actually `16/1440 * 1440 = 16px`)
At 375px mobile: `1rem ≈ 16px` (same ratio, different `--viewport` variable)

### Common Spacing Values

| Use | Value | Approx px (1440) |
|---|---|---|
| Base page padding (desktop) | `2rem` | 32px |
| Base page padding (mobile) | `1rem` | 16px |
| Large section padding | `12rem` | 192px |
| Hero top padding | `8.5rem` | 136px |
| Section top spacing | `4.5rem – 13.5rem` | 72–216px |
| Card internal padding | `1.5rem` | 24px |
| Button padding | `1rem 1.5rem` | 16px 24px |
| Gap between elements | `0.5rem – 2rem` | 8–32px |
| Form grid gap | `0.5rem` | 8px |
| Nav link gap | `2rem` | 32px |
| Footer height | `81.125rem` | 1298px |

### Container System
No max-width container. The site uses full-bleed layout with `2rem` horizontal padding on desktop and `1rem` on mobile. Content width is regulated by specific element widths (e.g., `42.5rem` left column = 680px).

---

## 11. FOOTER

### Structure
```html
<footer class="footer">
  <!-- Decorative radial gradient background (giant circle) -->
  <div class="bg"></div>
  
  <!-- Top section: socials + form -->
  <div class="content-part top">
    <div class="left">
      <!-- Social icon circles -->
      <ul class="socials">...</ul>
    </div>
    <div class="right">
      <!-- "Start your smile journey" heading + contact form -->
      <h2 class="form-title">...</h2>
      <form class="form">
        <!-- 2-column grid: name, email fields + circular submit button -->
      </form>
      <!-- Location nav links: 3-column grid -->
      <div class="list-locations">...</div>
    </div>
  </div>
  
  <!-- Bottom section: nav links + copyright -->
  <div class="content-part bottom">
    <!-- Logo + nav categories -->
    <div class="logo"></div>
    <div class="mt72">
      <!-- Services, About, Contact link columns -->
    </div>
    <!-- Bottom bar: copyright + developer credit -->
    <div class="content-part bottom">...</div>
  </div>
</footer>
```

### Footer CSS
```css
.footer {
  color: var(--c-light-base);
  display: flex;
  flex-direction: column;
  height: 81.125rem;            /* fixed height ~1298px */
  margin-top: -13.625rem;       /* overlaps section above */
  overflow: hidden;
  padding: 8rem 2rem 1.5rem;
  position: relative;
  isolation: isolate;
  width: 100%;
}

/* Giant decorative background circle */
.bg {
  background: linear-gradient(180deg, #2a2b35, #010203);
  border-radius: 50%;
  height: 158.375rem;           /* 2534px — huge circle */
  width: 158.375rem;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%);
  transform-origin: center top;
  z-index: -1;
}
```

### Footer Color Scheme
- Background: Created by the large circular gradient (`#2a2b35` to `#010203`) — not a flat color
- Text: `var(--c-light-base)` = `#eae8e8`
- Category labels: `var(--c-light-40)` (dimmed white)
- Nav links: `var(--c-light-base)` (full white)
- Borders/dividers: `hsla(0, 5%, 91%, 0.15)` (very subtle white)
- Copyright: `var(--c-light-40)`

### Footer Form Grid
```css
.form {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 1fr 5rem;  /* two equal text fields + small submit circle */
}
.form .wrap-textarea { grid-area: 2 / 1 / 3 / 3; }  /* full-width message field */
.btn-submit { grid-area: 2 / 3 / 3 / 4; min-height: 5rem; min-width: 5rem; }
```

### Footer Navigation
```css
.nav ul { display: flex; flex-direction: column; gap: 0.5rem; }
.list-locations { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
```

---

## 12. FORMS

### Input Field Style
```css
.wrap-input {
  border: 1px solid var(--light-15, hsla(0, 5%, 91%, 0.15));  /* very subtle */
  border-radius: 1312.5rem;          /* fully pill-shaped */
  display: block;
  padding: 2rem;                      /* 32px all sides — generous */
  position: relative;
  transition: border 0.3s var(--default-ease);
  width: 100%;
}
/* Dark variant (for light background sections) */
.wrap-input.dark {
  border-color: var(--c-dark-10);    /* rgba(66,67,70,0.1) */
}
```

### Floating Label System
Labels float above the input on focus or when a value exists:
```css
.placeholder {
  color: var(--placeholder-color, var(--c-light-40));
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  transform-origin: top left;
  transition: all 0.3s var(--default-ease);
  pointer-events: none;
}
/* Activated state (has value or focused) */
.input.has-value + .placeholder,
.input:focus + .placeholder {
  transform: scale(0.7) translateY(-200%);
}
```

### Input Text Color
```css
.input { color: var(--c-light-base); }   /* white text in dark form */
.wrap-input.dark .input { color: var(--c-dark-base); }  /* dark text on light bg */
```

### Error State
```css
.wrap-input.error { border-color: var(--c-error); }  /* #ff3c3c */
.wrap-input.error .input,
.wrap-input.error .placeholder { color: var(--c-error); }
```

### Submit Button (Circular)
```css
.btn-submit {
  min-height: 5rem;               /* 80px */
  min-width: 5rem;
  /* Uses the standard .wrap-btn circle button */
}
```

### Contact Form Modal (Mobile)
- Opens from bottom as full-screen slide-up panel
- Background: `var(--c-light-base)` 
- Form layout: single-column, centered, `grid-template-columns: 1fr`

### Success State
```css
.success-modal {
  background: var(--c-brand-navy);
  background-image: url(/images/common/success-bg.webp);
  background-size: cover;
  color: var(--c-light-base);
  border-radius: 2.5rem 2.5rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: 100vh;
  justify-content: center;
  /* Slides up from bottom: transform: translateY(100%) → translateY(0) */
  transition: transform 0.5s var(--ease-menu);
}
```

---

## 13. PREMIUM FEELING ELEMENTS

### What Elevates This Site

**1. Fluid Type Scaling**
Every size from buttons to headings scales proportionally with the viewport using `calc(16/var(--viewport)*100vw)`. The site looks intentional at every screen width, not just at breakpoints.

**2. Dual-Text Headline Technique**
Rendering headings twice with `clip-path` masking creates a two-tone text effect that's impossible with simple CSS. The navy/white split text on the hero is both technically sophisticated and visually striking.

**3. Obsessive Gradient Craft**
The 16-stop gradient overlay on images (computed in precise easing increments) produces seamlessly smooth image-to-background transitions with no visible banding. This level of care is rarely seen.

**4. Restrained Color Palette**
Only `#14151d`, `#eae8e8`, `#b38c61`, and a few muted variants. Nothing else. The discipline creates visual coherence across all sections.

**5. Slow, Theatrical Transitions**
Hover animations (0.9s on menu lines), menu reveals (0.8s clip-path), page transitions (0.5s). Luxury brands move slowly on purpose — it signals confidence.

**6. Lenis Smooth Scroll**
The momentum-based scrolling makes the entire page feel physical and refined. Combined with the scroll-driven animations, it creates a cinematic experience.

**7. Typewriter in Experts Section**
A blinking caret animation (`blink-caret 1s step-start infinite`) makes it feel like names are being typed in real-time. This micro-detail rewards attentive users.

**8. Slowly Rotating Background**
The Experts section background image rotates on a `50s linear infinite` animation — so subtle that users rarely consciously notice it, but it creates subconscious depth and life.

**9. No Box Shadows**
Zero box shadows anywhere. Premium sites use geometry, blur, and overlapping layers instead of drop shadows. This makes the design feel editorial rather than app-like.

**10. Negative Margin Footer Reveal**
The footer has `margin-top: -13.625rem` — it slides beneath the pre-footer section, creating the illusion that the CTA section "opens" to reveal the footer.

**11. Mix-Blend-Mode Typography**
Using `mix-blend-mode: color-dodge` and `mix-blend-mode: difference` for certain headings creates luminous, context-aware text rendering that responds to whatever's behind it.

**12. Pill-Shaped Everything**
Inputs (`border-radius: 1312.5rem`), buttons (`border-radius: 4rem`), dropdowns (`border-radius: 0 0 1.875rem 1.875rem`) — all corners are heavily rounded or fully pill-shaped. This creates softness that counterbalances the otherwise dark/bold aesthetic.

**13. The Preloader as Brand Moment**
The preloader isn't just a spinner — it shows the brand values ("Implant Restoration," "Advanced Esthetic," "Restorative Dentistry") spaced across the screen. It's a micro brand experience before the page even loads.

---

## 14. MOBILE EXPERIENCE

### Breakpoint
Single breakpoint at `max-width: 1023px`. Below 1024px = mobile/tablet.

### Layout Adaptations

**Navigation**
- Desktop controls disappear: `.header-controls { display: none }`, `.right-part` loses most items
- Two circular buttons appear: phone (beige, `#d6d1d0` bg) + hamburger (navy, `#14151d` bg)
- Both circles are `2.5rem` × `2.5rem` (40px) — thumb-friendly
- Full-screen menu replaces the minimal desktop nav

**Hero**
- Sticky parallax system disabled
- Mobile shows: simple centered heading + subtitle, full-height video background with blur overlay (`backdrop-filter: blur(10px)`)
- Typography shifts to centered alignment

**Sections**
- The `42.5rem` left column pattern is replaced with full-width single column
- `.content-part` changes from `grid-template-columns: 42.5rem 1fr` to `grid-template-columns: 1fr`
- Sticky scrollytelling disabled in favor of standard page flow

**Typography Mobile Overrides**

| Class | Desktop | Mobile |
|---|---|---|
| `.h1` | `17.25rem` | `6.75rem` |
| `.h2` | `9.5625rem` | `4.3125rem` |
| `.h3` | `5.1875rem` | `2.9375rem` |
| `.h4` | `3.4375rem` | `2.375rem` |
| `.h5` | `2.1875rem` | `1.5rem` |
| `.p1` | `1.25rem / 600` | `0.9375rem / 500` |

**Forms on Mobile**
- Form grid: `grid-template-columns: 1fr` (single column)
- Inputs: border changes to bottom-only (`border-bottom: 1px solid ...`, all other borders removed)
- Text alignment: `text-align: center`
- Floating labels: `left: 50%; transform: translate(-50%, -50%)` → centered placeholder

**Touch-Friendly Sizing**
- Mobile menu button: `2.5rem` circle (40px)
- Social circles on mobile: `--social-size: 4rem` (64px)
- Mobile button min-width: `12rem` (~192px)
- Input padding increases to `1.5rem` on mobile

**Footer on Mobile**
```css
.footer {
  background: #000203;      /* solid dark instead of gradient circle */
  height: auto;             /* auto height */
  margin-top: 0;            /* no negative overlap */
  padding: 4.5rem 1rem 1.5rem;
}
.bg {
  border-radius: 35rem;
  height: 100%;
  width: 30.5rem;
}
```

**Animations on Mobile**
- Many scroll-driven sticky animations are disabled on mobile (`.sticky { display: none }`)
- The technology section horizontal sticky list is replaced with a swiper carousel
- Experts typewriter names are replaced with static team grid

---

## SUMMARY: Design Pattern Translation to anthonyentertains.com

For a corporate magician site, these patterns from Aventura Dental Arts translate as:

| ADA Pattern | Corporate Magician Adaptation |
|---|---|
| Navy `#14151d` dark sections | Deep dark background for mystery/stage atmosphere |
| Gold `#b38c61` accent | Gold/warm accent for prestige and theater |
| Off-white `#eae8e8` light sections | Light sections for testimonials, client logos |
| Instrument Serif + Inter Tight pairing | Elegant serif display + clean sans-serif UI |
| Scrollytelling sticky sections | Reveal-as-you-scroll performance highlights |
| Video in hero panel | Stage/performance reel in hero |
| Dual clip-path headline | "Magic" themed text reveals |
| Pill-shaped buttons | Maintain this — feels premium |
| 50s spinning background | Slow decorative motion for atmosphere |
| Preloader as brand moment | "Anthony Entertains" brand intro animation |
| No box-shadows | Keep — editorial feel not app-like |
| Gradient image overlays | Same technique for performance photos |
| 0.9s theatrical transitions | Same pace — luxury signals confidence |
| Circular social/action buttons | Keep for contact/booking actions |
| Full-width footer with giant circle BG | Dramatic footer for an entertainer |
