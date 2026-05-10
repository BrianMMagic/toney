# Content Gap Report — Anthony Entertains Rebuild
**Fix list only. Each item is actionable. File paths are absolute.**  
**Priority:** P1 = wrong/missing content that changes meaning | P2 = truncated copy | P3 = structural/SEO issues

---

## GLOBAL FIXES (apply to every page)

### G-1 [P3] No canonical URL on any page
**File:** `C:\Users\brian\Documents\Toney\src\layouts\BaseLayout.astro`  
Every page passes no `canonicalUrl` prop, so no `<link rel="canonical">` is rendered.  
**Fix:** Each page file needs to pass `canonicalUrl="https://anthonyentertains.com/[slug]"` to `<BaseLayout>`.

### G-2 [P3] TikTok link invented — not present on original site
**File:** `C:\Users\brian\Documents\Toney\src\components\Footer.astro` (line 28–30)  
The `<a href="https://www.tiktok.com/@anthony_entertains">` TikTok icon was not found on the original site footer. Remove unless confirmed by client.

### G-3 [P1] ThreeGuarantees body copy is invented
**File:** `C:\Users\brian\Documents\Toney\src\components\ThreeGuarantees.astro` (lines 8–24)  
The default body paragraphs under each guarantee heading do not appear on the original site. The original site shows the guarantee titles only (or with different body copy on per-page variants).  
**Missing original text (from original):**  
- Guarantee 1: No body paragraph on original — just "Hilarious & Jaw-Dropping Magic"  
- Guarantee 2: Just "Interactive Fun"  
- Guarantee 3: Just "Memories That Will Last A Lifetime"  
**Fix:** Remove invented body text from defaults, or confirm with client what copy belongs here.  
Also: The emoji icons (🎭, 🤝, 💫) are invented and do not appear on the original site.

### G-4 [P3] get-a-quote form has no submission target
**File:** `C:\Users\brian\Documents\Toney\src\pages\get-a-quote.astro` (line 61)  
`<form class="quote-form" name="get-a-quote" method="POST">` — no `action` attribute, no `netlify` or `data-netlify="true"` attribute. The form will silently fail on submit.  
**Fix:** Add `data-netlify="true"` and `netlify-honeypot="bot-field"` to match the working `ContactForm.astro`.

### G-5 [P2] Inconsistent budget ranges between two forms
**File 1:** `C:\Users\brian\Documents\Toney\src\pages\get-a-quote.astro` (lines 111–119) — ranges: Under $500 / $500–$1,000 / $1,000–$2,500 / $2,500–$5,000 / $5,000+  
**File 2:** `C:\Users\brian\Documents\Toney\src\components\ContactForm.astro` (lines 84–90) — ranges: Under $1,000 / $1,000–$2,000 / $2,000–$3,500 / $3,500–$5,000 / $5,000+  
**Fix:** Standardize both forms to use the same budget range values.

### G-6 [P3] "Get a Quote" not in desktop nav list
**File:** `C:\Users\brian\Documents\Toney\src\data\nav.ts`  
Original site nav includes "GET A QUOTE" as a top-level nav item. Rebuild only has it as a CTA button (hidden on mobile) and in the mobile menu.  
**Fix:** Add `{ label: 'Get a Quote', href: '/get-a-quote' }` to `mainNav` in `nav.ts`, or confirm the CTA button approach is acceptable.

---

## /corporate-magician

**File:** `C:\Users\brian\Documents\Toney\src\pages\corporate-magician.astro`

### CM-1 [P1] Missing hero subheadline
**Missing text:** "Reach Out Today To Find Out How Corporate Magician and Mentalist Anthony Dempsey Can Help You Take Your Corporate Event To The Next Level"  
**Fix:** Add `subheadline="Reach Out Today To Find Out How Corporate Magician and Mentalist Anthony Dempsey Can Help You Take Your Corporate Event To The Next Level"` to the `<Hero>` component call.

### CM-2 [P2] Magic Up Close card missing paragraph
**File to edit:** The `serviceOptions` array in `corporate-magician.astro` (line 27 area), `body` field of the Magic Up Close option.  
**Missing text to append to body:** "Strolling magic and mentalism is a more casual, relaxed approach to entertainment. Anthony treats guests like old friends so they can loosen up and laugh. Anthony can provide a mixture of magic and mentalism for your guests. If you prefer one over the other, no problem! Just specify your preference during the booking process."  
**Fix:** Append this paragraph to the `body` string of the Magic Up Close service option.

---

## /wedding-magician

**File:** `C:\Users\brian\Documents\Toney\src\pages\wedding-magician.astro`

### WM-1 [P1] "What does a wedding magician do?" section — wrong content
**Original text (verbatim):** "A wedding magician is essentially an entertaining ice breaker. A wedding magician will go from group to group, performing close-up magic and mentalism in a more intimate setting."  
**Rebuild version:** Replaced with three invented sub-cards ("Close-Up Magic & Mentalism," "When Does a Wedding Magician Perform?," "The Perfect Ice Breaker").  
**Fix:** Replace the three-card layout in the `section--dark` block (lines 51–72) with the original paragraph text. The original also has a single section for "What does a wedding magician do?" — not three cards.

### WM-2 [P1] "When Does a Wedding Magician Perform?" — missing verbatim sentence
**Missing text:** "The cocktail hour is typically the time when the bridal party is off taking photos, leaving the guests to play the waiting game while having drinks."  
**Fix:** Include this sentence in the wedding magician timing explanation.

---

## /private-party-magician

**File:** `C:\Users\brian\Documents\Toney\src\pages\private-party-magician.astro`

### PP-1 [P1] Invented "Private Gatherings" service card
The first `serviceOptions` entry ("Private Gatherings") does not appear on the original page. The original has only 2 service options.  
**Fix:** Remove the "Private Gatherings" entry from the `serviceOptions` array (lines 24–29).

### PP-2 [P1] "Intimate Private Parties" body text — wrong content
**Original text:** "Make your private, in-home party unforgettable with amazing entertainment! From mind-blowing magic tricks and mentalism performed right in front of your guests to a captivating living room stage show, Anthony will create a night that your guests will never forget."  
**Rebuild text:** "Make your private, in-home party unforgettable with amazing entertainment! Don't settle for an ordinary dinner party — let him make it extraordinary!"  
**Fix:** Replace the `body` of the "Intimate Private Parties" option with the original verbatim text.

### PP-3 [P2] "Stage Shows for Larger Events" body text — extra sentences added
**Original text ends at:** "Watch as your guests witness the impossible and become the ultimate stars of the show."  
**Rebuild adds:** "Anthony, a seasoned performer with over 20 years of stage experience, will blow everyone's mind with his incredible feats of magic and mentalism."  
**Fix:** Remove the added sentence from the stage shows body to restore the original.

---

## /trade-show-magician

**File:** `C:\Users\brian\Documents\Toney\src\pages\trade-show-magician.astro`

### TS-1 [P2] Missing sentence in intro paragraph
**Missing text:** "He can significantly increase traffic to your trade show exhibit, while promoting your products and services in a uniquely entertaining way, allowing you to generate quality leads."  
**Fix:** Add this sentence to the intro `<p class="section-sub">` (after the existing paragraph text, around line 83).

### TS-2 [P1] VIP Close-up Magic body text — heavily truncated/rewritten
**Original full text:** "Need to impress some VIPs? Anthony can provide his sought-after strolling magic and mentalism to a designated group, perhaps during a welcome reception or after a VIP dinner. Strolling magic and mentalism is a more casual, relaxed approach to entertainment. Anthony treats guests like old friends so they can loosen up and laugh. Anthony can provide a mixture of magic and mentalism for your guests. If you prefer one over the other, no problem! Just specify your preference during the booking process."  
**Rebuild body:** Only first two sentences present.  
**Fix:** Replace the `body` of the VIP Close-up Magic option with the full original text above.

### TS-3 [P2] Trade Show Floor Magic body — missing sentences
**Missing text to add at end of body:** "In between sets, he will do some one-on-one magic for attendees who may be waiting to chat with you. There's so much riding on the success of a trade show. Hire an excellent trade show mentalist to keep your booth's momentum going all day!"  
**Fix:** Append to `body` of the Trade Show Floor Magic service option.

### TS-4 [P2] Attendee Interaction benefit — missing opening sentence
**Missing text:** "It's frustrating when people glance at the booth you worked so hard on, and just keep moving."  
**Fix:** Prepend this sentence to the `body` of the first benefits entry in the `benefits` array (line 31).

---

## /holiday-party-magician

**File:** `C:\Users\brian\Documents\Toney\src\pages\holiday-party-magician.astro`

### HP-1 [P1] Magic Up Close body text — paraphrased
**Original text:** "Many holiday parties have more of a cocktail hour vibe, and that's where up-close, 'strolling' magic really shines. This is the perfect time for Anthony to stroll around the room and interact with the guests, captivating them with unique and entertaining mentalism and sleight of hand magic."  
**Rebuild text:** "Many holiday events have some sort of welcome reception or cocktail hour. This is the perfect time for Anthony to stroll around the room and mingle with the guests..."  
**Fix:** Replace the `body` of the Magic Up Close option with the verbatim original text.

### HP-2 [P2] Peace of Mind benefit — truncated
**Missing text:** "So relax and enjoy the event you worked hard to plan."  
**Fix:** Append to the `body` of the Peace of Mind benefit entry (line 47).

---

## /get-a-quote

**File:** `C:\Users\brian\Documents\Toney\src\pages\get-a-quote.astro`

### GA-1 [P1] H1 text wrong
**Original H1:** "GET A QUOTE"  
**Rebuild H1:** "Get a Free Quote"  
**Fix:** Change `headline="Get a Free Quote"` to `headline="GET A QUOTE"` in the Hero component call (line 15).

### GA-2 [P1] Form has no submission handler (see G-4 above)

---

## /downloadable-content

**File:** `C:\Users\brian\Documents\Toney\src\pages\downloadable-content.astro`

### DC-1 [P2] Missing 2 promotional photos
**Original:** 5 promotional photos. **Rebuild:** 3 promotional photos.  
**Fix:** Add 2 more entries to the `downloadables` array (lines 10–20):
```
{ title: 'Promotional Photo 4', file: 'promo-photo-4' },
{ title: 'Promotional Photo 5', file: 'promo-photo-5' },
```
Also confirm actual downloadable files exist at `public/downloadables/` for all 12+ items.

### DC-2 [P3] Downloadable files likely missing from public folder
The download links point to `${base}downloadables/${item.file}` but no files were confirmed to exist in `public/downloadables/`. All downloads will 404 until actual files are placed there.

---

## /services

**File:** `C:\Users\brian\Documents\Toney\src\pages\services.astro`

### SV-1 [P1] "Close-up Magic and Mind Reading" card body — wrong content
**Original text:** "Dallas Magician Anthony Dempsey works his way amongst the crowd, showing them unbelievable feats."  
**Rebuild text:** "Strolling Magic at your cocktail hour is a great way to not only impress your guests, but also help them start the conversation!"  
**Fix:** Replace the `<p>` in the "Close-up Magic and Mind Reading" service card (lines 72–73) with the original text.

---

## /plano-magician

**File:** `C:\Users\brian\Documents\Toney\src\pages\plano-magician.astro`

### PL-1 [P2] Strolling Magic description — missing "ideal for" list
**Missing text to add:** "Strolling magic is ideal for: Dinner Parties, Cocktail Hours, Weddings, Adult Birthdays, Corporate Events, Graduations, Anniversaries, Holiday Parties, Proms, and Hospitality."  
**Fix:** Append to the `<p>` inside `.plano-card` for Strolling Magic (line 53–54).

### PL-2 [P2] Stage Shows description — truncated
**Missing text to add:** "This show is a perfect mixture of comedy, mystery, and 'what just happened?' Stage Magic is great for: Banquets, Corporate Events, Trade Shows, House Parties, Festivals, Team Building Events, Large Dinner Parties, Sales Presentations, and Surprise Entertainment."  
**Fix:** Append to the `<p>` inside `.plano-card` for Stage Shows.

### PL-3 [P1] ThreeGuarantees using wrong (generic) text
**Original Plano-specific text:**
- Guest Interaction: "Your guests won't be sitting around on their phones all night. They will be up and about, having a great time with one another!"
- An Amped Up Party: "Anthony's been trusted to elevate both intimate and large events in Plano. He'll make sure that your event is one to remember."
- Peace of Mind: "Rest easy knowing you've hired a professional who wants you to look your best! You won't have to worry about inappropriate language or a late arrival."  
**Fix:** Pass a custom `items` prop to `<ThreeGuarantees>` on this page with the Plano-specific body text.

### PL-4 [P1] "What is mentalism?" FAQ answer — rewritten
**Original full answer:** "It's not every day that you meet a mentalist, or a corporate mentalist for that matter. So what do I do? Well, I like to say that I use all five of my senses to give the illusion of a sixth. I heard it somewhere a long time ago and can't quite remember where! Everyone's heard of a magician who does sleight of hand tricks or card tricks, but a mentalist entertains people with tricks that are more psychological based, like mind reading tricks! It's a lot of fun for all types of events."  
**File:** `C:\Users\brian\Documents\Toney\src\data\faqs.ts` (line 224–227)  
**Fix:** Replace the `planoFaqs` "What is mentalism?" answer with the full verbatim original text above.

---

## /magician-grapevine-texas

**File:** `C:\Users\brian\Documents\Toney\src\pages\magician-grapevine-texas.astro`

### GV-1 [P1] Strolling Magic description — missing opener and event list
**Original full text:** "Who says you can't mix wine with magic? 'Strolling' magic and mentalism is the most popular option. Anthony will mix and mingle with your guests while they enjoy the party. He'll spend time with each group of people and help break the ice for those who don't know anyone! Strolling magic is great for: Dinner Parties, Cocktail Hours, Weddings, Adult Birthdays, Corporate Events, Graduations, Anniversaries, Holiday Parties, Proms, and Hospitality."  
**Fix:** Replace the `<p>` in the "Strolling Magic" grapevine-card (around line 60–61) with verbatim original.

### GV-2 [P1] Stage Magic description — rewritten
**Original full text:** "Hosting your Grapevine event somewhere with a stage? Another great option is a fast-paced magic and mentalism stage show that uses members of the audience from start to finish. This show is a perfect mixture of comedy, mystery, and 'what the heck?' Stage Magic is great for: Banquets, Corporate Events, Trade Shows, House Parties, Festivals, Team Building Events, Large Dinner Parties, Sales Presentations, and Surprise Entertainment."  
**Fix:** Replace the `<p>` in the "Stage Magic Shows" grapevine-card (around line 64–65) with verbatim original.

### GV-3 [P1] ThreeGuarantees using wrong (generic) text
**Original Grapevine-specific text:**
- Guest Interaction: "People won't be sitting around on their phones all night. Your guests will be up and about, having a great time with one another!"
- An Amped Up Party: "Anthony's been trusted to elevate both intimate and massive events. He'll make yours one to remember."
- Peace of Mind: "Rest easy knowing you've hired a professional. You won't have to worry about inappropriate language or a late arrival. Anthony wants to make you look good!"  
**Fix:** Pass a custom `items` prop to `<ThreeGuarantees>` with Grapevine-specific text.

### GV-4 [P2] FAQ "Does your booked time need to be consecutive?" — truncated answer
**Missing text:** "A very common occurrence of this is when I'm hired for strolling magic and mentalism during a welcome cocktail hour, take a break while the group enjoys their dinner, and then I'll begin a stage show while they're finishing dessert. So it's definitely not unheard of and not a problem."  
**File:** `C:\Users\brian\Documents\Toney\src\data\faqs.ts` (lines 188–193)  
**Fix:** Append the missing text to the `grapevineFaqs[0].answer`.

### GV-5 [P2] FAQ "Can we see you at a public show?" — missing blog/Instagram callout
**Missing text:** "That being said, if I am ever planning a public performance, I'll be sure to post about it on my blog and Instagram so you can be in attendance! You can read a bit about my experience on Penn & Teller Fool Us on my blog."  
**File:** `C:\Users\brian\Documents\Toney\src\data\faqs.ts` (lines 194–198)  
**Fix:** Append missing text to `grapevineFaqs[1].answer`.

### GV-6 [P2] FAQ "Can you do magic during a wine tour?" — missing closing lines
**Missing text:** "The more wine you try, the better the tricks will get! Once you have your date secured with your group, contact me and we'll come up with the best plan of action!"  
**File:** `C:\Users\brian\Documents\Toney\src\data\faqs.ts` (lines 199–203)  
**Fix:** Append missing text to `grapevineFaqs[2].answer`.

### GV-7 [P1] Hero H1 — original puts full sentence in H1
**Original H1:** "Grapevine Magician and Mentalist Anthony Dempsey wants to help you elevate your next event." (full sentence as H1)  
**Rebuild H1:** "Grapevine Magician and Mentalist Anthony Dempsey" (phrase split into headline + subheadline)  
**Fix:** Change hero `headline` to `"Grapevine Magician and Mentalist<br>Anthony Dempsey Wants to Help You<br>Elevate Your Next Event."` (or confirm the current split is acceptable).

---

## PRIORITY SUMMARY

| Priority | Count | Issues |
|---|---|---|
| P1 — Wrong/Invented content | 13 | CM-1, WM-1, WM-2, PP-1, PP-2, TS-2, HP-1, GA-1, SV-1, PL-3, PL-4, GV-1, GV-2, GV-3, GV-7 |
| P2 — Truncated copy | 11 | CM-2, PP-3, TS-1, TS-3, TS-4, HP-2, DC-1, PL-1, PL-2, GV-4, GV-5, GV-6 |
| P3 — SEO/structural | 6 | G-1, G-2, G-3, G-4, G-5, G-6, DC-2 |

---

## ITEMS CONFIRMED CORRECT (no fix needed)

- All 9 YouTube video IDs and titles ✓
- All testimonial quotes in `corporateTestimonials`, `homepageTestimonials`, `weddingTestimonials` ✓
- All FAQ content for `generalFaqs`, `corporateFaqs`, `holidayFaqs`, `tradeShowFaqs`, `birthdayFaqs`, `weddingFaqs`, `austinHoustonFaqs` ✓
- Penn & Teller badge heading and CTA ✓
- Footer phone, email, copyright, social (except TikTok — see G-2) ✓
- Homepage services cards (Private Parties, Stage Shows, Corporate Events) ✓
- About section bio paragraphs ✓
- All meta titles (except get-a-quote H1 case) ✓
- Navigation structure (Services dropdown, Locations dropdown) ✓
- Short bio on /downloadable-content ✓
- Austin, Atlanta, Chicago, Grand Rapids, Los Angeles, Houston location page content ✓
