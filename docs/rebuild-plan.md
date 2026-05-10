# Anthony Entertains — Rebuild Implementation Plan
**Created:** 2026-05-10  
**Purpose:** Precise, file-by-file instructions for correcting and upgrading the Astro.js rebuild of anthonyentertains.com.  
**Rule:** Execute sections in the order given in Section 6. Do not skip steps. Do not make design decisions — every value is specified.

---

## SECTION 1: Content Fixes (Priority 1 — Must Fix)

These are wrong or invented content items that change the meaning of the site. Fix every P1 before anything else.

---

### 1.1 — `src/components/ThreeGuarantees.astro` (Issues G-3)

**Problem:** The component ships with three invented body paragraphs and three emoji icons (🎭, 🤝, 💫) that do not appear on the original site. The original site shows only the guarantee titles — no body copy, no emoji.

**Fix:** Replace the entire `defaults` array (lines 8–24) with title-only entries and remove the `icon` field from the interface and template.

**Old code (lines 1–49):**
```astro
---
export interface Props {
  title?: string;
  label?: string;
  items?: { icon: string; heading: string; body: string }[];
}

const defaults = [
  {
    icon: '🎭',
    heading: 'Hilarious & Jaw-Dropping Magic',
    body: 'Anthony\'s performances blend comedy, mystery, and astonishment into one unforgettable show your guests will never stop talking about.',
  },
  {
    icon: '🤝',
    heading: 'Interactive Fun',
    body: 'Every performance is designed to pull guests in, get them laughing, and have them become the stars of the show themselves.',
  },
  {
    icon: '💫',
    heading: 'Memories That Will Last A Lifetime',
    body: 'From intimate cocktail hours to 1,000-person galas, Anthony guarantees an experience that stands out years after the event.',
  },
];

const {
  title = 'Anthony Guarantees',
  label = 'Why Anthony',
  items = defaults,
} = Astro.props;
---

<section class="section section--darker guarantees-section">
  <div class="container">
    <span class="section-label" data-reveal="fade-up">{label}</span>
    <h2 class="section-title" data-reveal="fade-up">{title}</h2>
    <div class="divider" data-reveal="fade-up"></div>

    <div class="guarantees-grid" data-reveal-stagger>
      {items.map((item) => (
        <div class="guarantee-card">
          <span class="guarantee-icon" aria-hidden="true">{item.icon}</span>
          <h3 class="guarantee-heading">{item.heading}</h3>
          <p class="guarantee-body">{item.body}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**New code — replace the entire frontmatter and template section:**
```astro
---
export interface Props {
  title?: string;
  label?: string;
  items?: { heading: string; body?: string }[];
}

const defaults = [
  { heading: 'Hilarious & Jaw-Dropping Magic' },
  { heading: 'Interactive Fun' },
  { heading: 'Memories That Will Last A Lifetime' },
];

const {
  title = 'Anthony Guarantees',
  label = 'Why Anthony',
  items = defaults,
} = Astro.props;
---

<section class="section section--darker guarantees-section">
  <div class="container">
    <span class="section-label" data-reveal="fade-up">{label}</span>
    <h2 class="section-title" data-reveal="fade-up">{title}</h2>
    <div class="divider" data-reveal="fade-up"></div>

    <div class="guarantees-grid" data-reveal-stagger>
      {items.map((item) => (
        <div class="guarantee-card">
          <h3 class="guarantee-heading">{item.heading}</h3>
          {item.body && <p class="guarantee-body">{item.body}</p>}
        </div>
      ))}
    </div>
  </div>
</section>
```

Also remove `.guarantee-icon` CSS rule from the `<style>` block (the `font-size: 2.5rem; margin-bottom: 20px;` rule).

---

### 1.2 — `src/pages/corporate-magician.astro` (Issues CM-1, CM-2)

**CM-1 — Missing hero subheadline**

In the `<Hero>` component call (around line 57–66), add the `subheadline` prop:

Old:
```astro
  <Hero
    eyebrow="Magician & Mentalist Anthony Dempsey"
    headline="Award-Winning Corporate Entertainment<br>for Companies Who Like to Have Fun"
    ctaText="Get a Free Quote"
```

New:
```astro
  <Hero
    eyebrow="Magician & Mentalist Anthony Dempsey"
    headline="Award-Winning Corporate Entertainment<br>for Companies Who Like to Have Fun"
    subheadline="Reach Out Today To Find Out How Corporate Magician and Mentalist Anthony Dempsey Can Help You Take Your Corporate Event To The Next Level"
    ctaText="Get a Free Quote"
```

**CM-2 — Magic Up Close card missing paragraph**

In the `serviceOptions` array (around line 23–33), the `Magic Up Close` entry's `body` field is missing the strolling magic description paragraph. Replace the body string:

Old body:
```
'Many corporate events have some sort of welcome reception or something along the lines of a cocktail hour. This is the perfect time for Anthony to stroll around the room and mingle with the guests, captivating them with unique and entertaining mentalism and sleight of hand magic.',
```

New body (verbatim from original):
```
'Many corporate events have some sort of welcome reception or something along the lines of a cocktail hour. This is the perfect time for Anthony to stroll around the room and mingle with the guests, captivating them with unique and entertaining mentalism and sleight of hand magic. Strolling magic and mentalism is a more casual, relaxed approach to entertainment. Anthony treats guests like old friends so they can loosen up and laugh. Anthony can provide a mixture of magic and mentalism for your guests. If you prefer one over the other, no problem! Just specify your preference during the booking process.',
```

---

### 1.3 — `src/pages/wedding-magician.astro` (Issues WM-1, WM-2)

**WM-1 & WM-2 — Replace the three-card "What does a wedding magician do?" section with the original single paragraph**

The `section.section--dark` block (lines 51–72) contains three invented sub-cards. Replace the entire `<div class="wedding-details" data-reveal-stagger>` block and its children with a single paragraph. The original site has one simple paragraph for this section, and the timing question content should be woven in.

Old block to remove (lines 57–70):
```astro
      <div class="wedding-details" data-reveal-stagger>
        <div class="wedding-detail-card">
          <h3>Close-Up Magic &amp; Mentalism</h3>
          <p>Anthony moves between guest groups during cocktail hours and receptions, performing sleight of hand, mind reading, card magic, and object vanishing effects. Each group gets their own personalized show.</p>
        </div>
        <div class="wedding-detail-card">
          <h3>When Does a Wedding Magician Perform?</h3>
          <p>During the cocktail hour while the bridal party takes photos, after dinner for a full crowd, table-to-table intimate performances, or during the evening reception — Anthony adapts to your timeline.</p>
        </div>
        <div class="wedding-detail-card">
          <h3>The Perfect Ice Breaker</h3>
          <p>Anthony helps shy guests come out of their shell, gets people talking who normally might not, and creates unforgettable shared moments that bring your guests together.</p>
        </div>
      </div>
```

Replace with (verbatim original text, including the timing sentence from WM-2):
```astro
      <div class="wedding-intro" data-reveal="fade-up">
        <p>A wedding magician is essentially an entertaining ice breaker. A wedding magician will go from group to group, performing close-up magic and mentalism in a more intimate setting.</p>
        <h2 class="section-title" style="margin-top: 48px; margin-bottom: 16px;">When does a wedding magician perform?</h2>
        <p>The cocktail hour is typically the time when the bridal party is off taking photos, leaving the guests to play the waiting game while having drinks.</p>
      </div>
```

Also remove the `.wedding-details` and `.wedding-detail-card` CSS rules from the `<style>` block at the bottom of this file (they are now unused).

---

### 1.4 — `src/pages/get-a-quote.astro` (Issues GA-1, G-4, G-5)

**GA-1 — H1 text wrong**

In the `<Hero>` component call (line 15), change:
```astro
    headline="Get a Free Quote"
```
to:
```astro
    headline="GET A QUOTE"
```

**G-4 — Form has no submission handler**

On the `<form>` tag (line 61), change:
```astro
          <form class="quote-form" name="get-a-quote" method="POST">
```
to:
```astro
          <form class="quote-form" name="get-a-quote" method="POST" data-netlify="true" netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="get-a-quote" />
            <p style="display:none"><label>Don't fill this out: <input name="bot-field" /></label></p>
```
(The honeypot `<p>` and hidden `form-name` input must be the first children inside the `<form>` tag.)

**G-5 — Standardize budget ranges**

The `get-a-quote.astro` form budget `<select>` (lines 111–119) uses different ranges than `ContactForm.astro`. Change the options in `get-a-quote.astro` to match `ContactForm.astro`:

Old options in `get-a-quote.astro`:
```html
                <option>Under $500</option>
                <option>$500 – $1,000</option>
                <option>$1,000 – $2,500</option>
                <option>$2,500 – $5,000</option>
                <option>$5,000+</option>
```

New options (matching ContactForm.astro):
```html
                <option>Under $1,000</option>
                <option>$1,000 – $2,000</option>
                <option>$2,000 – $3,500</option>
                <option>$3,500 – $5,000</option>
                <option>$5,000+</option>
```

---

### 1.5 — `src/pages/plano-magician.astro` (Issues PL-1, PL-2, PL-3)

**PL-1 — Add missing "ideal for" list to Strolling Magic card**

In the Strolling Magic `.plano-card` (around lines 51–54), append to the existing `<p>`:

Old `<p>`:
```astro
          <p>Strolling magic and mentalism is the perfect opportunity for Anthony to mix and mingle with your guests. He'll spend time with each cluster of people and help break the ice for those who don't know anyone!</p>
```

New `<p>` (verbatim from original):
```astro
          <p>Strolling magic and mentalism is the perfect opportunity for Anthony to mix and mingle with your guests. He'll spend time with each cluster of people and help break the ice for those who don't know anyone! Strolling magic is ideal for: Dinner Parties, Cocktail Hours, Weddings, Adult Birthdays, Corporate Events, Graduations, Anniversaries, Holiday Parties, Proms, and Hospitality.</p>
```

**PL-2 — Add missing content to Stage Shows card**

In the Stage Shows `.plano-card` (around lines 55–58), append to the existing `<p>`:

Old `<p>`:
```astro
          <p>Plan on having a stage at your event? Anthony's got you covered with a mind-blowing magic and mentalism stage show that uses audience participation from start to finish.</p>
```

New `<p>` (verbatim from original):
```astro
          <p>Plan on having a stage at your event? Anthony's got you covered with a mind-blowing magic and mentalism stage show that uses audience participation from start to finish. This show is a perfect mixture of comedy, mystery, and 'what just happened?' Stage Magic is great for: Banquets, Corporate Events, Trade Shows, House Parties, Festivals, Team Building Events, Large Dinner Parties, Sales Presentations, and Surprise Entertainment.</p>
```

**PL-3 — Pass Plano-specific items to ThreeGuarantees**

The `<ThreeGuarantees>` call (around line 68) uses generic defaults. Pass the Plano-specific `items` prop:

Old call:
```astro
  <ThreeGuarantees
    label="The Key to a Truly Memorable Event"
    title="Anthony Guarantees:"
  />
```

New call (exact original text per PL-3 in content-gap-report):
```astro
  <ThreeGuarantees
    label="The Key to a Truly Memorable Event"
    title="Anthony Guarantees:"
    items={[
      {
        heading: 'Guest Interaction',
        body: "Your guests won't be sitting around on their phones all night. They will be up and about, having a great time with one another!",
      },
      {
        heading: 'An Amped Up Party',
        body: "Anthony's been trusted to elevate both intimate and large events in Plano. He'll make sure that your event is one to remember.",
      },
      {
        heading: 'Peace of Mind',
        body: "Rest easy knowing you've hired a professional who wants you to look your best! You won't have to worry about inappropriate language or a late arrival.",
      },
    ]}
  />
```

---

### 1.6 — `src/pages/private-party-magician.astro` (Issues PP-1, PP-2, PP-3)

**PP-1 — Remove invented "Private Gatherings" service card**

Locate the `serviceOptions` array. The first entry with `heading: 'Private Gatherings'` does not appear on the original site. Delete the entire first object from the array (including its trailing comma). The array should be left with only two entries: "Intimate Private Parties" and "Stage Shows for Larger Private Parties" (or equivalent headings).

**PP-2 — Fix "Intimate Private Parties" body text**

Find the `body` field of the "Intimate Private Parties" service option. Replace whatever text is there with verbatim original:

```
'Make your private, in-home party unforgettable with amazing entertainment! From mind-blowing magic tricks and mentalism performed right in front of your guests to a captivating living room stage show, Anthony will create a night that your guests will never forget.'
```

(Note: "Don't settle for an ordinary dinner party — let him make it extraordinary!" — this second sentence IS present on the original site. Keep it. The problem was that the rebuild only had this second sentence and dropped the first full sentence.)

**PP-3 — Remove invented sentence from Stage Shows body**

Find the Stage Shows service option `body`. Remove the sentence: "Anthony, a seasoned performer with over 20 years of stage experience, will blow everyone's mind with his incredible feats of magic and mentalism."

The body should end at: "Watch as your guests witness the impossible and become the ultimate stars of the show."

---

### 1.7 — `src/pages/trade-show-magician.astro` (Issues TS-1, TS-2, TS-3, TS-4)

**TS-1 — Add missing sentence to intro paragraph**

Find the intro `<p class="section-sub">` (around line 83). Append this sentence to the end of the existing paragraph text:

Sentence to append: `"He can significantly increase traffic to your trade show exhibit, while promoting your products and services in a uniquely entertaining way, allowing you to generate quality leads."`

**TS-2 — Replace truncated VIP Close-up Magic body**

Find the `body` field of the VIP Close-up Magic service option. Replace whatever is there with the full verbatim original:

```
'Need to impress some VIPs? Anthony can provide his sought-after strolling magic and mentalism to a designated group, perhaps during a welcome reception or after a VIP dinner. Strolling magic and mentalism is a more casual, relaxed approach to entertainment. Anthony treats guests like old friends so they can loosen up and laugh. Anthony can provide a mixture of magic and mentalism for your guests. If you prefer one over the other, no problem! Just specify your preference during the booking process.'
```

**TS-3 — Append missing sentences to Trade Show Floor Magic body**

Find the `body` field of the Trade Show Floor Magic service option. Append to the end:

```
' In between sets, he will do some one-on-one magic for attendees who may be waiting to chat with you. There\'s so much riding on the success of a trade show. Hire an excellent trade show mentalist to keep your booth\'s momentum going all day!'
```

**TS-4 — Prepend missing opening sentence to Attendee Interaction benefit**

Find the `body` of the first benefits array entry (Attendee Interaction). Prepend:

```
"It's frustrating when people glance at the booth you worked so hard on, and just keep moving. "
```

The full body should read: `"It's frustrating when people glance at the booth you worked so hard on, and just keep moving. People will actually stop at your trade show booth when they see Anthony performing!"`

---

### 1.8 — `src/pages/holiday-party-magician.astro` (Issues HP-1, HP-2)

**HP-1 — Fix Magic Up Close body text**

Find the `body` of the Magic Up Close service option. Replace with verbatim original:

```
'Many holiday parties have more of a cocktail hour vibe, and that\'s where up-close, \'strolling\' magic really shines. This is the perfect time for Anthony to stroll around the room and interact with the guests, captivating them with unique and entertaining mentalism and sleight of hand magic.'
```

**HP-2 — Append to Peace of Mind benefit**

Find the `body` of the Peace of Mind benefit entry. Append: `" So relax and enjoy the event you worked hard to plan."`

---

### 1.9 — `src/pages/services.astro` (Issue SV-1)

**SV-1 — Fix "Close-up Magic and Mind Reading" card body**

Find the `<p>` inside the "Close-up Magic and Mind Reading" service card (around lines 72–73). Replace:

Old:
```html
"Strolling Magic at your cocktail hour is a great way to not only impress your guests, but also help them start the conversation!"
```

New (verbatim original):
```html
"Dallas Magician Anthony Dempsey works his way amongst the crowd, showing them unbelievable feats."
```

---

### 1.10 — `src/pages/magician-grapevine-texas.astro` (Issues GV-1, GV-2, GV-3, GV-7)

**GV-7 — Fix hero H1**

In the `<Hero>` component call, change `headline` to:

```astro
    headline="Grapevine Magician and Mentalist<br>Anthony Dempsey Wants to Help You<br>Elevate Your Next Event."
```

**GV-1 — Fix Strolling Magic description**

Find the `<p>` inside the "Strolling Magic" `.grapevine-card` (around line 60–61). Replace entirely with verbatim original:

```html
<p>Who says you can't mix wine with magic? 'Strolling' magic and mentalism is the most popular option. Anthony will mix and mingle with your guests while they enjoy the party. He'll spend time with each group of people and help break the ice for those who don't know anyone! Strolling magic is great for: Dinner Parties, Cocktail Hours, Weddings, Adult Birthdays, Corporate Events, Graduations, Anniversaries, Holiday Parties, Proms, and Hospitality.</p>
```

**GV-2 — Fix Stage Magic description**

Find the `<p>` inside the "Stage Magic Shows" `.grapevine-card` (around line 64–65). Replace entirely with verbatim original:

```html
<p>Hosting your Grapevine event somewhere with a stage? Another great option is a fast-paced magic and mentalism stage show that uses members of the audience from start to finish. This show is a perfect mixture of comedy, mystery, and 'what the heck?' Stage Magic is great for: Banquets, Corporate Events, Trade Shows, House Parties, Festivals, Team Building Events, Large Dinner Parties, Sales Presentations, and Surprise Entertainment.</p>
```

**GV-3 — Pass Grapevine-specific items to ThreeGuarantees**

Replace the generic `<ThreeGuarantees>` call with:

```astro
  <ThreeGuarantees
    label="The Key to a Truly Memorable Grapevine Event"
    title="Anthony Guarantees:"
    items={[
      {
        heading: 'Guest Interaction',
        body: "People won't be sitting around on their phones all night. Your guests will be up and about, having a great time with one another!",
      },
      {
        heading: 'An Amped Up Party',
        body: "Anthony's been trusted to elevate both intimate and massive events. He'll make yours one to remember.",
      },
      {
        heading: 'Peace of Mind',
        body: "Rest easy knowing you've hired a professional. You won't have to worry about inappropriate language or a late arrival. Anthony wants to make you look good!",
      },
    ]}
  />
```

---

### 1.11 — `src/data/faqs.ts` (Issues PL-4, GV-4, GV-5, GV-6)

**PL-4 — Fix planoFaqs "What is mentalism?" answer**

Find the `planoFaqs` array entry with question `"What is mentalism?"` (around lines 224–227). Replace the `answer` string entirely with:

```
"It's not every day that you meet a mentalist, or a corporate mentalist for that matter. So what do I do? Well, I like to say that I use all five of my senses to give the illusion of a sixth. I heard it somewhere a long time ago and can't quite remember where! Everyone's heard of a magician who does sleight of hand tricks or card tricks, but a mentalist entertains people with tricks that are more psychological based, like mind reading tricks! It's a lot of fun for all types of events."
```

**GV-4 — Append missing text to grapevineFaqs[0].answer**

Find `grapevineFaqs[0]` (the "Does your booked time need to be consecutive?" question, around lines 188–193). Append to the end of the `answer` string:

```
" A very common occurrence of this is when I'm hired for strolling magic and mentalism during a welcome cocktail hour, take a break while the group enjoys their dinner, and then I'll begin a stage show while they're finishing dessert. So it's definitely not unheard of and not a problem."
```

**GV-5 — Append missing text to grapevineFaqs[1].answer**

Find `grapevineFaqs[1]` (the "Can we see you at a public show?" question, around lines 194–198). Append to the end of the `answer` string:

```
" That being said, if I am ever planning a public performance, I'll be sure to post about it on my blog and Instagram so you can be in attendance! You can read a bit about my experience on Penn & Teller Fool Us on my blog."
```

**GV-6 — Append missing text to grapevineFaqs[2].answer**

Find `grapevineFaqs[2]` (the "Can you do magic during a wine tour?" question, around lines 199–203). Append to the end of the `answer` string:

```
" The more wine you try, the better the tricks will get! Once you have your date secured with your group, contact me and we'll come up with the best plan of action!"
```

---

### 1.12 — `src/pages/downloadable-content.astro` (Issue DC-1)

**DC-1 — Add 2 missing promotional photos**

Find the `downloadables` array (around lines 10–20). Add these two entries:

```js
{ title: 'Promotional Photo 4', file: 'promo-photo-4' },
{ title: 'Promotional Photo 5', file: 'promo-photo-5' },
```

Note: Also verify that actual files exist at `public/downloadables/` for all entries. If the files do not exist, create placeholder files or note this as a client deliverable. All download links will 404 until real files are placed there (Issue DC-2).

---

### 1.13 — `src/components/Footer.astro` (Issue G-2) and `src/data/nav.ts` (Issue G-6)

**G-2 — Remove TikTok link from footer**

In `src/components/Footer.astro`, remove the entire `<a>` element for TikTok (lines 28–30):

```html
          <a href="https://www.tiktok.com/@anthony_entertains" class="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.84 4.84 0 0 1-1.01-.07z"/></svg>
          </a>
```

**G-6 — Add "Get a Quote" to desktop nav**

Open `src/data/nav.ts`. Find the `mainNav` export array. Add a new entry for Get a Quote so it appears as a top-level nav link visible on desktop (not only as the CTA button):

```ts
{ label: 'Get a Quote', href: '/get-a-quote' },
```

Add this as the last item in the `mainNav` array, after any existing links and before the closing bracket. This ensures it renders in the desktop `<nav>` list via the `{mainNav.filter(...)}` loop in `Header.astro`.

---

## SECTION 2: Design System Upgrades

Changes to `src/styles/global.css` to better match the reference site (aventuradentalarts.com).

---

### 2.1 — Google Fonts: Replace Playfair Display + Inter with Instrument Serif + Inter Tight

**Current line 1–2:**
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
```

**Replace with:**
```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
```

**Rationale:** The reference site uses InstrumentSerif (display/heading) and InterTight (UI/body). These are available on Google Fonts. The reference uses self-hosted TTF files, but Google Fonts delivery is acceptable for this build.

---

### 2.2 — CSS Custom Properties: Replace color and font tokens

**Current `:root` block (lines 5–37):**

Replace the entire `:root` block with the following. Values are derived from the reference site's color system with adaptation for the magician context (navy dark sections, gold accent, off-white light sections):

```css
:root {
  /* ── Color Palette (reference: aventuradentalarts.com) ─────── */
  --c-black:            #000000;
  --c-white:            #ffffff;
  --c-brand-navy:       #14151d;       /* Primary dark — near-black navy */
  --c-brand-gold:       #b38c61;       /* Accent — warm bronze-gold */
  --c-light-base:       #eae8e8;       /* Primary light — warm off-white */
  --c-light-beige:      #d6d1d0;       /* Secondary light — slightly warmer */
  --c-dark-base:        #424346;       /* Body text — medium dark gray */
  --c-dark-brown:       #6f6968;       /* Muted/tertiary text */
  --c-error:            #ff3c3c;

  /* ── Opacity Variants ──────────────────────────────────────── */
  --c-light-40:         hsla(0, 5%, 91%, 0.4);
  --c-light-15:         hsla(0, 5%, 91%, 0.15);
  --c-dark-40:          rgba(66, 67, 70, 0.4);
  --c-dark-10:          rgba(66, 67, 70, 0.1);

  /* ── Gradient Tokens ───────────────────────────────────────── */
  --c-brand-navy-linear: linear-gradient(180deg, #2a2b35, #010203);
  --c-brand-gold-gradient: linear-gradient(270deg, #b38b61, #dac8b7);

  /* ── Legacy aliases (keep for backward compat with existing components) */
  --color-bg:           var(--c-brand-navy);
  --color-surface:      #1c1d26;
  --color-surface-2:    #21222d;
  --color-accent:       var(--c-brand-gold);
  --color-accent-light: #dac8b7;
  --color-gold:         var(--c-brand-gold);
  --color-gold-light:   #dac8b7;
  --color-text:         var(--c-light-base);
  --color-text-muted:   var(--c-light-40);
  --color-text-dim:     var(--c-dark-40);
  --color-border:       var(--c-light-15);
  --color-border-light: hsla(0, 5%, 91%, 0.25);

  /* ── Typography ────────────────────────────────────────────── */
  --font-heading: 'Instrument Serif', Georgia, serif;
  --font-body:    'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* ── Border Radius ─────────────────────────────────────────── */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   20px;
  --radius-pill: 4rem;           /* Reference: 4rem for buttons */
  --radius-full: 9999px;         /* Keep for backward compat */

  /* ── Shadows — eliminate box-shadows per reference aesthetic ─ */
  /* Reference site has ZERO box-shadows. Legacy vars kept for   */
  /* backward compat but should be phased out component by component */
  --shadow-card:  none;
  --shadow-hover: none;

  /* ── Easing Tokens (reference site) ──────────────────────────*/
  --ease-default:     ease-in-out;
  --ease-out-quint:   cubic-bezier(0.22, 1, 0.36, 1);
  --ease-menu:        cubic-bezier(0.6, 0.14, 0, 1);
  --ease-theatrical:  cubic-bezier(0.24, 0.43, 0.15, 0.97);   /* 0.9s menu lines */

  /* ── Transitions ───────────────────────────────────────────── */
  --transition-fast: 0.18s var(--ease-default);
  --transition-mid:  0.30s var(--ease-default);
  --transition-slow: 0.90s var(--ease-theatrical);

  /* ── Layout ─────────────────────────────────────────────────  */
  --section-pad-y: 120px;
  --section-pad-x: clamp(20px, 5vw, 80px);
  --max-width:     1200px;
}
```

---

### 2.3 — Body and Typography

**Current `body` rule (lines 52–59):**
```css
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  overflow-x: hidden;
}
```

**Replace with:**
```css
body {
  background: var(--c-brand-navy);
  color: var(--c-light-base);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

(Move `-webkit-font-smoothing` from `html` to `body` to match reference behavior.)

**Current heading rules (lines 84–93):**
```css
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

h1 { font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 700; }
h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 600; }
h3 { font-size: clamp(1.2rem, 2.5vw, 1.7rem); font-weight: 600; }
h4 { font-size: 1.1rem; font-weight: 600; }
```

**Replace with** (reference uses weight 400 for all headings — InstrumentSerif is display-weight at 400; drop bold weights on headings):
```css
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 400;              /* InstrumentSerif is editorial at 400 */
  line-height: 1.1;
  letter-spacing: -0.02em;       /* Reference: negative tracking on headings */
}

h1 { font-size: clamp(2.4rem, 5vw, 4rem); }
h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); }
h3 { font-size: clamp(1.2rem, 2.5vw, 1.7rem); }
h4 { font-size: 1.1rem; }
```

---

### 2.4 — Button Styling

**Current `.btn` rules (lines 140–185):**

Update button border-radius to match reference's pill-shaped buttons, and update color references to use new tokens. Replace the entire button block:

```css
/* ─── Buttons ──────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: var(--radius-pill);   /* 4rem — full pill shape */
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: transform var(--transition-fast), background var(--transition-fast);
  cursor: pointer;
  white-space: nowrap;
  border: none;
}

.btn--primary {
  background: var(--c-brand-gold);
  color: var(--c-brand-navy);
}
.btn--primary:hover {
  background: var(--c-light-base);
  transform: translateY(-2px);
}

.btn--outline {
  background: transparent;
  color: var(--c-light-base);
  border: 1.5px solid var(--c-light-15);
}
.btn--outline:hover {
  border-color: var(--c-brand-gold);
  color: var(--c-brand-gold);
  transform: translateY(-2px);
}

.btn--gold {
  background: var(--c-brand-gold);
  color: var(--c-brand-navy);
}
.btn--gold:hover {
  background: var(--color-gold-light);
  transform: translateY(-2px);
}

.btn--dark {
  background: var(--c-brand-navy);
  color: var(--c-light-base);
  border: 1.5px solid var(--c-light-15);
}
.btn--dark:hover {
  background: #21222d;
  transform: translateY(-2px);
}
```

---

### 2.5 — Section and Section Label Colors

**Current `.section-label` (lines 117–126):**
```css
.section-label {
  ...
  color: var(--color-accent);
  ...
}
```

Change `color: var(--color-accent)` to `color: var(--c-brand-gold)`.

**Current `.section-sub` (lines 132–137):**
```css
.section-sub {
  color: var(--color-text-muted);
  ...
}
```

Change to `color: var(--c-light-40)`.

---

### 2.6 — Remove Box Shadows from Cards

The reference site has zero `box-shadow`. Add this rule after the existing card/hover patterns to enforce no box-shadows (this can be phased out once individual components are updated, but serves as a blunt override immediately):

```css
/* ─── No box-shadows (reference aesthetic) ─────────────────── */
/* Remove this block once individual components are cleaned up  */
.guarantee-card:hover,
.home-service-card:hover,
.wedding-detail-card:hover,
.plano-card:hover {
  box-shadow: none;
  border-color: var(--c-brand-gold);   /* Use gold border on hover instead */
}
```

---

### 2.7 — Section alternation: add `.section--light` utility class

The reference site alternates dark navy and warm off-white sections. Add this utility:

```css
.section--light {
  background: var(--c-light-base);
  color: var(--c-dark-base);
}
.section--light .section-label { color: var(--c-dark-brown); }
.section--light .section-title { color: var(--c-brand-navy); }
.section--light .section-sub   { color: var(--c-dark-base); }
.section--light p               { color: var(--c-dark-base); }
```

---

### 2.8 — Divider color

**Current `.divider` (lines 188–194):**
```css
.divider {
  ...
  background: var(--color-accent);
  ...
}
```

Change `background: var(--color-accent)` to `background: var(--c-brand-gold)`.

---

### 2.9 — Stars color

**Current `.stars` (lines 210–215):**
```css
.stars {
  color: var(--color-gold);
  ...
}
```

Change `color: var(--color-gold)` to `color: var(--c-brand-gold)`.

---

## SECTION 3: Component Design Changes

Specific visual changes to bring components closer to the reference site's premium aesthetic.

---

### 3.1 — `src/components/Header.astro`

**Change 1: Accent color in logo tag**

In the `<style>` block, find:
```css
.logo-tag {
  ...
  color: var(--color-accent);
}
```
Change to `color: var(--c-brand-gold);`

**Change 2: Header CTA button — pill shape**

Find:
```css
.header-cta { padding: 10px 22px; font-size: 0.8rem; }
```
The `.btn` base class now handles `border-radius: var(--radius-pill)` from Section 2.4, so the CTA will automatically become pill-shaped. No additional change needed here.

**Change 3: Accent color in mobile group labels**

Find:
```css
.mobile-group-label {
  ...
  color: var(--color-accent);
}
```
Change to `color: var(--c-brand-gold);`

**Change 4: Scrolled state background**

Find:
```css
.site-header.scrolled {
  background: rgba(8, 8, 8, 0.96);
  ...
  border-bottom: 1px solid var(--color-border);
}
```
Change to:
```css
.site-header.scrolled {
  background: rgba(20, 21, 29, 0.96);    /* --c-brand-navy at 96% opacity */
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 12px 0;
  border-bottom: 1px solid var(--c-light-15);
}
```

**Change 5: Dropdown styling**

Find:
```css
.dropdown {
  ...
  background: #141414;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  ...
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
```
Change to:
```css
.dropdown {
  ...
  background: var(--c-brand-navy);
  border: 1px solid var(--c-light-15);
  border-radius: 0 0 var(--radius-md) var(--radius-md);   /* Reference: rounded bottom only */
  ...
  box-shadow: none;    /* Reference site has no box-shadows */
}
```

---

### 3.2 — `src/components/Hero.astro`

**Change 1: Remove text-shadow on headline**

Find:
```css
.hero__headline {
  ...
  text-shadow: 0 2px 20px rgba(0,0,0,0.4);
  ...
}
```
Remove the `text-shadow` property. Reference site uses no text-shadows.

**Change 2: Hero font weight to 400**

Find:
```css
.hero__headline {
  font-size: clamp(2.6rem, 6vw, 4.8rem);
  font-weight: 900;
  color: #fff;
  ...
}
```
Change `font-weight: 900` to `font-weight: 400`. With InstrumentSerif loaded, this produces an elegant display serif style instead of a compressed bold.

**Change 3: Hero subheadline color**

Find:
```css
.hero__sub {
  ...
  color: rgba(255,255,255,0.78);
  ...
}
```
Change to `color: var(--c-light-40);`

**Change 4: Eyebrow color**

Find:
```css
.hero__eyebrow {
  ...
  color: var(--color-gold);
  ...
}
```
Change to `color: var(--c-brand-gold);`

---

### 3.3 — `src/components/ThreeGuarantees.astro`

**Change 1: Card border color on hover**

Find:
```css
.guarantee-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
  border-color: var(--color-accent);
}
```
Change to:
```css
.guarantee-card:hover {
  transform: translateY(-4px);
  box-shadow: none;
  border-color: var(--c-brand-gold);
}
```

**Change 2: Card background**

Find:
```css
.guarantee-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  ...
}
```
Change to:
```css
.guarantee-card {
  background: var(--color-surface);
  border: 1px solid var(--c-light-15);
  ...
}
```

---

### 3.4 — `src/components/Footer.astro`

**Change 1: Footer background**

Find:
```css
.site-footer {
  background: #050505;
  border-top: 1px solid var(--color-border);
  ...
}
```
Change to:
```css
.site-footer {
  background: var(--c-brand-navy-linear, linear-gradient(180deg, #2a2b35, #010203));
  border-top: 1px solid var(--c-light-15);
  ...
}
```

**Change 2: Footer accent colors**

In `.footer-logo-tag`:
```css
color: var(--color-accent);
```
Change to `color: var(--c-brand-gold);`

In `.footer-col-title`:
```css
color: var(--color-accent);
```
Change to `color: var(--c-brand-gold);`

In `.footer-contact-link:hover`:
```css
color: var(--color-accent);
```
Change to `color: var(--c-brand-gold);`

**Change 3: Social links — remove box-shadow behavior, use gold on hover**

Find:
```css
.footer-social-link:hover {
  color: var(--color-text);
  border-color: var(--color-accent);
  background: rgba(123,47,247,0.1);
}
```
Change to:
```css
.footer-social-link:hover {
  color: var(--c-light-base);
  border-color: var(--c-brand-gold);
  background: rgba(179, 140, 97, 0.15);   /* c-brand-gold at 15% */
}
```

**Change 4: Footer social link border**

Find:
```css
.footer-social-link {
  ...
  border: 1px solid var(--color-border);
  ...
}
```
Change to `border: 1px solid var(--c-light-15);`

**Change 5: Social link border-radius — pill shape**

Find:
```css
.footer-social-link {
  ...
  border-radius: var(--radius-sm);
  ...
}
```
Change to `border-radius: 50%;` (circular, matching reference site's circular social buttons).

---

### 3.5 — `src/pages/get-a-quote.astro` (form styling)

**Change: Quote note border and background**

Find:
```css
.quote-note {
  ...
  border-left: 3px solid var(--color-accent);
  background: rgba(123,47,247,0.06);
  ...
}
```
Change to:
```css
.quote-note {
  ...
  border-left: 3px solid var(--c-brand-gold);
  background: rgba(179, 140, 97, 0.08);
  ...
}
```

**Change: Form wrapper**

Find:
```css
.quote-form-wrap {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  ...
}
```
Change to:
```css
.quote-form-wrap {
  background: var(--color-surface);
  border: 1px solid var(--c-light-15);
  border-radius: var(--radius-lg);
  ...
}
```

**Change: Input focus border**

Find:
```css
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}
```
Change `border-color: var(--color-accent)` to `border-color: var(--c-brand-gold)`.

---

## SECTION 4: SEO Fixes

---

### 4.1 — `src/layouts/BaseLayout.astro` — Canonical URL infrastructure

The layout already supports `canonicalUrl` (prop is declared and rendered on line 32). The infrastructure is in place. The fix is to pass the correct canonical URL from every page.

Verify the existing conditional in BaseLayout.astro:
```astro
{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
```
This is correct. No change needed to BaseLayout.astro itself.

Also add `og:url` to the Open Graph block. After the existing `og:image` meta tag, add:
```astro
    {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
```

---

### 4.2 — Add canonical URLs to every page

For each page file, add the `canonicalUrl` prop to the `<BaseLayout>` component call. Use the exact production URL (no trailing slash on slugs, trailing slash on homepage only if that is how the site operates — anthonyentertains.com uses no trailing slash).

**`src/pages/index.astro`:**
```astro
<BaseLayout
  title="Dallas Magician | Corporate Event Entertainment | Anthony Entertains"
  canonicalUrl="https://anthonyentertains.com/"
>
```

**`src/pages/corporate-magician.astro`:**
```astro
<BaseLayout
  title="Corporate Magician | Corporate Event Entertainment | Anthony Entertains"
  description="..."
  canonicalUrl="https://anthonyentertains.com/corporate-magician"
>
```

**`src/pages/wedding-magician.astro`:**
```astro
<BaseLayout
  title="Wedding Magician | Anthony Entertains | Wedding Entertainment"
  description="..."
  canonicalUrl="https://anthonyentertains.com/wedding-magician"
>
```

**`src/pages/private-party-magician.astro`:**
```astro
  canonicalUrl="https://anthonyentertains.com/private-party-magician"
```

**`src/pages/trade-show-magician.astro`:**
```astro
  canonicalUrl="https://anthonyentertains.com/trade-show-magician"
```

**`src/pages/holiday-party-magician.astro`:**
```astro
  canonicalUrl="https://anthonyentertains.com/holiday-party-magician"
```

**`src/pages/birthday-party-magician-and-mentalist.astro`** (if file exists):
```astro
  canonicalUrl="https://anthonyentertains.com/birthday-party-magician-and-mentalist"
```

**`src/pages/services.astro`:**
```astro
  canonicalUrl="https://anthonyentertains.com/services"
```

**`src/pages/get-a-quote.astro`:**
```astro
  canonicalUrl="https://anthonyentertains.com/get-a-quote"
```

**`src/pages/downloadable-content.astro`:**
```astro
  canonicalUrl="https://anthonyentertains.com/downloadable-content"
```

**`src/pages/plano-magician.astro`:**
```astro
  canonicalUrl="https://anthonyentertains.com/plano-magician"
```

**`src/pages/magician-grapevine-texas.astro`:**
```astro
  canonicalUrl="https://anthonyentertains.com/magician-grapevine-texas"
```

**`src/pages/fort-worth-magician.astro`** (if file exists):
```astro
  canonicalUrl="https://anthonyentertains.com/fort-worth-magician"
```

**Location pages** — add corresponding canonical for each:
- `/best-magician-for-hire-in-dallas-texas`
- `/houston-entertainment`
- `/austin-entertainment`
- `/atlanta-ga-entertainment`
- `/chicago-il-magician`
- `/los-angeles-ca-magician`
- `/new-york-ny-magician`
- `/orlando-fl-magician`
- `/seattle-wa-magician`
- `/grand-rapids-magician`

Pattern for all: `canonicalUrl="https://anthonyentertains.com/[exact-slug]"`

---

### 4.3 — `src/layouts/BaseLayout.astro` — theme-color meta tag

**Current:**
```astro
    <meta name="theme-color" content="#080808" />
```

**Change to** (match new brand navy):
```astro
    <meta name="theme-color" content="#14151d" />
```

---

## SECTION 5: Form Fix

---

### 5.1 — `src/pages/get-a-quote.astro` — Netlify form handling

**The problem:** The `<form>` element has no `data-netlify="true"` attribute and no hidden `form-name` input, so Netlify's build-time form detection will not register this form. Submissions will silently fail.

**The fix:** Apply the following changes to the `<form>` opening tag and add required hidden inputs as its first children.

**Step 1 — Change the `<form>` opening tag** (line 61):

Old:
```astro
          <form class="quote-form" name="get-a-quote" method="POST">
```

New:
```astro
          <form class="quote-form" name="get-a-quote" method="POST" data-netlify="true" netlify-honeypot="bot-field">
```

**Step 2 — Add hidden inputs as the first children inside `<form>`:**

Immediately after the `<form>` opening tag (before the first `<div class="form-row">`), insert:

```html
            <input type="hidden" name="form-name" value="get-a-quote" />
            <p style="display:none"><label>Don't fill this out if you're human: <input name="bot-field" /></label></p>
```

**Step 3 — Verify the success redirect (optional but recommended):**

Add a `data-netlify-success` attribute to redirect to a thank-you page after submission:
```astro
          <form class="quote-form" name="get-a-quote" method="POST" data-netlify="true" netlify-honeypot="bot-field">
```

If a `/thank-you` page does not exist, skip the redirect for now. Netlify will display a generic success page.

**Step 4 — How it works after the fix:**

- Netlify's build bot detects `data-netlify="true"` and registers the form.
- The `name="get-a-quote"` attribute names the form in the Netlify dashboard.
- The hidden `form-name` input is required for AJAX submissions (not used here, but best practice).
- The `bot-field` honeypot prevents spam.
- All form field `name` attributes are already correct and will appear as columns in the Netlify form dashboard.

**Note on `ContactForm.astro`:** The content-gap report (G-4) says to match the pattern used in `ContactForm.astro`. Before applying the fix above, verify that `ContactForm.astro` already has `data-netlify="true"`. If it does, copy its exact pattern. If it does not, apply the same fix to `ContactForm.astro` as well.

---

## SECTION 6: Implementation Order

Execute files in this exact sequence to minimize risk of breaking the running build.

---

### Phase 1: Data Layer (no visual impact, safest first)

1. **`src/data/faqs.ts`** — Fix PL-4, GV-4, GV-5, GV-6 (four FAQ answer fixes). Pure data, no template changes.
2. **`src/data/nav.ts`** — Fix G-6 (add Get a Quote to mainNav). Low-risk data change.

### Phase 2: Shared Components (affects every page — fix before individual pages)

3. **`src/components/ThreeGuarantees.astro`** — Fix G-3 (remove invented body text and emoji icons, update Props interface). This is a breaking change to the props shape — after this step, verify every page that passes a custom `items` prop still compiles correctly.
4. **`src/components/Footer.astro`** — Fix G-2 (remove TikTok link) + Section 3.4 design changes.
5. **`src/styles/global.css`** — Apply all Section 2 changes (font swap, color token replacement, button styles). This will visually affect every page simultaneously. Test the homepage after this step before continuing.

### Phase 3: Layout and SEO (affects every page)

6. **`src/layouts/BaseLayout.astro`** — Add `og:url` meta tag + change theme-color (Section 4.1, 4.3). This is additive only — no risk of breaking existing functionality.

### Phase 4: Page-Level Content Fixes (P1 priority first)

7. **`src/pages/corporate-magician.astro`** — Fix CM-1 (add subheadline), CM-2 (Magic Up Close body), add canonical URL.
8. **`src/pages/wedding-magician.astro`** — Fix WM-1/WM-2 (replace three-card block with original paragraph + timing sentence), add canonical URL.
9. **`src/pages/private-party-magician.astro`** — Fix PP-1 (remove invented card), PP-2 (Intimate Parties body), PP-3 (remove added sentence), add canonical URL.
10. **`src/pages/trade-show-magician.astro`** — Fix TS-1 (intro paragraph), TS-2 (VIP body), TS-3 (Trade Show Floor body), TS-4 (Attendee Interaction opener), add canonical URL.
11. **`src/pages/holiday-party-magician.astro`** — Fix HP-1 (Magic Up Close body), HP-2 (Peace of Mind), add canonical URL.
12. **`src/pages/services.astro`** — Fix SV-1 (Close-up Magic card body), add canonical URL.
13. **`src/pages/magician-grapevine-texas.astro`** — Fix GV-7 (H1), GV-1 (Strolling Magic), GV-2 (Stage Magic), GV-3 (ThreeGuarantees items), add canonical URL.
14. **`src/pages/plano-magician.astro`** — Fix PL-1 (Strolling Magic list), PL-2 (Stage Shows list), PL-3 (ThreeGuarantees items), add canonical URL.

### Phase 5: Form Fix

15. **`src/pages/get-a-quote.astro`** — Fix GA-1 (H1 text), G-4 (Netlify form attributes + honeypot), G-5 (budget ranges), add canonical URL, apply Section 3.5 styling changes.
16. **`src/components/ContactForm.astro`** — Verify/apply Netlify form handling if not already present.

### Phase 6: All Remaining Pages — Add Canonical URLs

17. **`src/pages/index.astro`** — Add `canonicalUrl`.
18. All remaining page files not covered above — add `canonicalUrl` prop to each `<BaseLayout>` call. Use the pattern from Section 4.2.

### Phase 7: Downloadable Content

19. **`src/pages/downloadable-content.astro`** — Fix DC-1 (add 2 missing photo entries).
20. **`public/downloadables/`** — Verify all linked files exist. This is a client content deliverable, not a code fix.

### Phase 8: Component Design Changes (visual polish, lowest risk of content regression)

21. **`src/components/Header.astro`** — Apply Section 3.1 design changes.
22. **`src/components/Hero.astro`** — Apply Section 3.2 design changes.
23. **`src/components/ThreeGuarantees.astro`** — Apply Section 3.3 design changes (already opened in Phase 2 step 3 — add these styles then).

---

## QUICK REFERENCE: Issue → File Map

| Issue ID | File to Edit | Description |
|---|---|---|
| G-2 | `src/components/Footer.astro` | Remove TikTok link |
| G-3 | `src/components/ThreeGuarantees.astro` | Remove invented body text & emoji |
| G-4 | `src/pages/get-a-quote.astro` | Add Netlify form attributes |
| G-5 | `src/pages/get-a-quote.astro` | Standardize budget ranges |
| G-6 | `src/data/nav.ts` | Add Get a Quote to mainNav |
| CM-1 | `src/pages/corporate-magician.astro` | Add missing hero subheadline |
| CM-2 | `src/pages/corporate-magician.astro` | Extend Magic Up Close body |
| WM-1 | `src/pages/wedding-magician.astro` | Replace three-card block |
| WM-2 | `src/pages/wedding-magician.astro` | Add timing sentence |
| PP-1 | `src/pages/private-party-magician.astro` | Remove invented service card |
| PP-2 | `src/pages/private-party-magician.astro` | Fix Intimate Parties body |
| PP-3 | `src/pages/private-party-magician.astro` | Remove extra sentence |
| TS-1 | `src/pages/trade-show-magician.astro` | Add missing intro sentence |
| TS-2 | `src/pages/trade-show-magician.astro` | Replace truncated VIP body |
| TS-3 | `src/pages/trade-show-magician.astro` | Append Floor Magic sentences |
| TS-4 | `src/pages/trade-show-magician.astro` | Add opener to Attendee benefit |
| HP-1 | `src/pages/holiday-party-magician.astro` | Fix Magic Up Close body |
| HP-2 | `src/pages/holiday-party-magician.astro` | Append to Peace of Mind |
| GA-1 | `src/pages/get-a-quote.astro` | Fix H1 from "Get a Free Quote" → "GET A QUOTE" |
| DC-1 | `src/pages/downloadable-content.astro` | Add 2 missing promo photo entries |
| SV-1 | `src/pages/services.astro` | Fix Close-up Magic card body text |
| PL-1 | `src/pages/plano-magician.astro` | Append strolling magic event list |
| PL-2 | `src/pages/plano-magician.astro` | Append stage shows event list |
| PL-3 | `src/pages/plano-magician.astro` | Pass Plano ThreeGuarantees items |
| PL-4 | `src/data/faqs.ts` | Fix mentalism FAQ answer |
| GV-1 | `src/pages/magician-grapevine-texas.astro` | Fix Strolling Magic description |
| GV-2 | `src/pages/magician-grapevine-texas.astro` | Fix Stage Magic description |
| GV-3 | `src/pages/magician-grapevine-texas.astro` | Pass Grapevine ThreeGuarantees items |
| GV-4 | `src/data/faqs.ts` | Append consecutive booking FAQ answer |
| GV-5 | `src/data/faqs.ts` | Append public show FAQ answer |
| GV-6 | `src/data/faqs.ts` | Append wine tour FAQ answer |
| GV-7 | `src/pages/magician-grapevine-texas.astro` | Fix hero H1 |
| G-1/SEO | All page files | Add canonicalUrl prop to BaseLayout |

---

## CONFIRMED CORRECT — DO NOT CHANGE

The following items were verified against the original site and require no edits:
- All 9 YouTube video IDs and titles in `VideoGrid.astro` or equivalent data file
- All testimonial quotes in `corporateTestimonials`, `homepageTestimonials`, `weddingTestimonials`
- All FAQ content for `generalFaqs`, `corporateFaqs`, `holidayFaqs`, `tradeShowFaqs`, `birthdayFaqs`, `weddingFaqs`, `austinHoustonFaqs`
- Penn & Teller badge heading and CTA text
- Footer phone (940-654-0699), email (Anthony@AnthonyEntertains.com), copyright (© 2026 by Anthony Entertains)
- Footer YouTube and Instagram links
- Homepage services cards body text (Private Parties, Stage Shows, Corporate Events)
- About section bio paragraphs
- All meta `<title>` tags (except get-a-quote H1 casing — that is a Hero headline, not the title tag)
- Navigation structure (Services dropdown items, Locations dropdown items)
