# Current Build Audit — Anthony Entertains Rebuild
**Audit Date:** 2026-05-10  
**Original Site:** https://anthonyentertains.com/  
**Rebuild:** Astro.js project at `C:\Users\brian\Documents\Toney`  
**CSS Approach:** Custom design system — no Tailwind or Bootstrap. Hand-written CSS with CSS custom properties (design tokens) in `src/styles/global.css`. Dark theme (`#080808` background, `#7b2ff7` purple accent, `#c9a84c` gold). Fonts: Playfair Display (headings) + Inter (body) via Google Fonts. Component-scoped `<style>` blocks in every `.astro` file.  
**Overall Design Quality:** High. Dark, premium aesthetic. Responsive grid layouts. Scroll animations via `src/utils/reveal.ts`. Hover effects, modal video player, smooth scroll. Structurally solid.

---

## GLOBAL ISSUES (affect every page)

### MISSING SEO: No schema.org JSON-LD on any page
The original site does not have JSON-LD either (confirmed via WebFetch). Neither build has structured data. This is a shared deficiency. No rebuild action needed to match original — but it is an SEO opportunity.

### MISSING SEO: No canonical URL tag on most pages
`BaseLayout.astro` supports a `canonicalUrl` prop but no page passes it. The original site uses canonical tags. Every page needs `canonicalUrl` set.

### MISSING BUTTON: "PRICING & AVAILABILITY" CTA missing
The original site has a secondary CTA button labeled "PRICING & AVAILABILITY" (links to the quote form) used on some interior pages in addition to "GET A FREE QUOTE". The rebuild only uses "Get a Free Quote" and "Watch Anthony Perform". The "PRICING & AVAILABILITY" label does not appear anywhere in the rebuild.

### WRONG CONTENT: Hero H1 rendering
The original site renders H1 and H2 as two separate stacked elements (e.g., "DALLAS MAGICIAN & MENTALIST" on one line, "ANTHONY DEMPSEY" on the next as a separate H2). The rebuild collapses these into a single `<h1>` with a `<br>` tag. This affects SEO heading structure.

### MISSING: Navigation item "Get a Quote" is not a top-level nav link
Original nav: HOME | SERVICES | LOCATIONS | GET A QUOTE | MEDIA | TESTIMONIALS | CONTACT | BLOG  
Rebuild nav: Home (mobile only) | Services (dropdown) | Locations (dropdown) | Media (anchor) | Testimonials (anchor) | Contact (anchor) | Blog | [header CTA button]  
"GET A QUOTE" is present as a header CTA button and in mobile menu, but not as a standalone item in the desktop navigation list the way the original site has it.

### MISSING: Facebook social link
Original footer has YouTube and Instagram. Rebuild matches this. However, the original site nav also links to the blog at `/blog`, which the rebuild has. No gap here.

### MISSING: Blog listing page (`/blog`) was not audited against original
Not in scope for this pass but the `src/pages/blog/index.astro` exists.

---

## PAGE-BY-PAGE AUDIT

---

### PAGE: / (Homepage)

**File:** `src/pages/index.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "Dallas Magician \| Corporate Event Entertainment \| Anthony Entertains" | "Dallas Magician \| Corporate Event Entertainment \| Anthony Entertains" ✓ |
| Meta description | Not confirmed (default used) | "Dallas Magician & Mentalist Anthony Dempsey — Award-winning corporate entertainment, private parties, weddings, and trade shows. Serving Dallas-Fort Worth and nationwide." |
| H1 | "DALLAS MAGICIAN & MENTALIST" (separate H2: "ANTHONY DEMPSEY") | `<h1>Dallas Magician & Mentalist<br><em>Anthony Dempsey</em>` — single H1 |
| Canonical | Present on original | Missing in rebuild |

#### Hero Section
- Original H1: "DALLAS MAGICIAN & MENTALIST" — rebuild renders as part of combined headline ✓ (content present, structure differs)
- Original tagline: "An Award-Winning Magician & Mentalist For Any Party Or Event" — rebuild: "An Award-Winning Magician & Mentalist For Any Party Or Event" ✓
- Original eyebrow/label: "Award-Winning Dallas Magician & Mentalist" — rebuild: ✓

#### Services Section (3 cards)
**Private Parties card:**  
Original: "Make your party stand out from the rest! After all, what's a party without unforgettable entertainment?"  
Rebuild: Matches exactly ✓ (full paragraph matches)

**Stage Shows card:**  
Original: "Put your guests and company in the spotlight! With a completely customizable Magic & Mind Reading Stage Show..."  
Rebuild: Matches exactly ✓

**Corporate Events card:**  
Original: "Connect your employees in a whole new way! Whether it's an intimate cocktail hour or your yearly sales meeting..."  
Rebuild: Matches exactly ✓

#### Testimonials
Original testimonials listed: William C, Heather T, Natalie R, Katherine J, Shia LaBeouf, Victoria P, Michael M, Kelcie F, Dr. John Kuhn  
Rebuild `homepageTestimonials` array: All 9 present ✓

Notable: Original has Victoria P quoted as "Anthony is THE BEST!! He is so skillful, professional and FUN! Our wedding guests LOVED Anthony's performances!"  
Rebuild quote: "Anthony is THE BEST!! He is so skillful, professional and FUN! Our wedding guests LOVED Anthony's performances!" ✓

#### Videos
Original: 9 YouTube videos embedded  
Rebuild: 9 videos in `src/data/videos.ts` with matching IDs and titles ✓

#### About Section
Original bio paragraph 1: "Hi, I'm Anthony! I'm a Dallas based magician and mentalist (mind reader) and I'm obsessed with traveling. I've always loved to entertain people; it seems to be engraved in my nature."  
Rebuild: Matches exactly ✓

Original bio paragraph 2 (extended content about acting, touring): Present in original  
Rebuild: "I've appeared in commercials, print advertisements, television shows, and movies; but nothing compares to performing magic and mentalism for a live audience." — Matches ✓

#### Three Guarantees
Original: "Hilarious & Jaw-Dropping Magic," "Interactive Fun," "Memories That Will Last A Lifetime"  
Rebuild: "Hilarious & Jaw-Dropping Magic," "Interactive Fun," "Memories That Will Last A Lifetime" ✓  
Note: The guarantee body text is NEW/INVENTED in the rebuild — the original site shows the guarantee titles only (or minimal body copy). Rebuild adds descriptive paragraphs under each guarantee. This is added content, not a verbatim copy issue, but it is invented.

#### Penn & Teller Badge
Original: "Check out Anthony on Penn & Teller: FOOL US!" with a "Watch the Episode" button  
Rebuild: Matches exactly ✓

#### Contact Form (homepage - minimal)
Original homepage uses a simple contact form (email + message)  
Rebuild: Uses `ContactForm` without `showFullForm`, resulting in email + message fields only ✓

#### FAQs
Original homepage has 2 FAQs:
1. "I'm thinking about booking. How can I check your availability?"
2. "What can I expect when I hire you?"  
Rebuild `generalFaqs` has both ✓ — content matches verbatim ✓

#### MISSING: Event Types section label
Original homepage has "The Magician Dallas Trusts For Events Like These" as a section header for the event type grid  
Rebuild: `title="The Magician Dallas Trusts For Events Like These"` ✓

#### MISSING: note text on homepage EventTypes
Original: "Dallas Magician Anthony Dempsey will make your event unforgettable. Click on the options above for further information on event types."  
Rebuild: `note="Dallas Magician Anthony Dempsey will make your event unforgettable. Click on the options above for further information on event types."` ✓

#### WRONG CONTENT: Services section heading
Original: "More Information" (as section H2)  
Rebuild: `<h2 class="section-title">More Information</h2>` ✓

**Homepage assessment: HIGH FIDELITY. No material gaps found.**

---

### PAGE: /corporate-magician

**File:** `src/pages/corporate-magician.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "Corporate Magician \| Corporate Event Entertainment \| Anthony Entertains" | "Corporate Magician \| Corporate Event Entertainment \| Anthony Entertains" ✓ |
| H1 | "Award-Winning Corporate Entertainment for Companies Who Like to Have Fun" | "Award-Winning Corporate Entertainment<br>for Companies Who Like to Have Fun" ✓ |
| Canonical | Present | Missing |

#### MISSING TEXT: Original has intro paragraph under H1
Original has subheadline: "Reach Out Today To Find Out How Corporate Magician and Mentalist Anthony Dempsey Can Help You Take Your Corporate Event To The Next Level"  
Rebuild hero: No `subheadline` prop passed — this text is **missing**.

#### Service Options - Magic Up Close body text
Original: "Strolling magic is great for: Corporate Events, Dinner Parties, Cocktail Hours, Client Appreciation Events, Company Anniversaries, Holiday Parties, Product Launches, and Hospitality."  
Rebuild body: "Many corporate events have some sort of welcome reception or something along the lines of a cocktail hour. This is the perfect time for Anthony to stroll around the room and mingle with the guests, captivating them with unique and entertaining mentalism and sleight of hand magic."  
Use cases list in rebuild: ['Corporate Events', 'Dinner Parties', 'Cocktail Hours', 'Client Appreciation Events', 'Company Anniversaries', 'Holiday Parties', 'Product Launches', 'Hospitality'] ✓  

Original full Magic Up Close text: "Strolling magic and mentalism is a more casual, relaxed approach to entertainment. Anthony treats guests like old friends so they can loosen up and laugh. Anthony can provide a mixture of magic and mentalism for your guests. If you prefer one over the other, no problem! Just specify your preference during the booking process."  
**MISSING TEXT:** This descriptive paragraph about the casual approach, treating guests like old friends, and preference specification is not in the rebuild's Magic Up Close card.

#### Service Options - Stage Shows
Original full Stage Shows text: Looking for a formal after-dinner show. Anthony is also described as a "sought-after corporate event MC" who will "guide guests through the evening, present awards, and keep the energy high."  
Rebuild: "Looking for a formal after-dinner show? Anthony's magic and mentalism stage show uses audience participation from start to finish. It's absolutely hilarious and mind-blowing! Anthony is also a sought-after corporate event MC! He's the friendly face who will guide guests through the evening, present awards, and keep the energy high." ✓

#### Testimonials  
Rebuild uses `corporateTestimonials`: Alexa N., Virginia B., Randall S., William R. — all correct ✓  
Original also shows: Alexa N. (The Vested Group), Virginia B. (Expedia), Randall S. (Nissan) ✓

#### MISSING TEXT: "Are You Looking For Exciting & Professional Entertainment For Your Corporate Event?" section
The original corporate page has a dedicated intro section with this heading and descriptive body paragraph before the service options. This section is not present in the rebuild.

#### MISSING TEXT: "Past Trade Show Highlights" / "Some Of My Past Corporate Successes!" section
Original has a section highlighting past corporate successes. Not present in rebuild.

#### MISSING TEXT: Benefits section - original wording
Original "3 Key Metrics" section label: "Corporate Entertainment That Delivers 3 Key Metrics..."  
Rebuild section label: Not present (the `ServiceBenefits` component has no section label/intro)  
The three metrics (Attendee Interaction, Increased Traffic, Peace of Mind) are present with matching text ✓

#### FAQs
Rebuild `corporateFaqs` (3 FAQs): What do you wear, new tricks, travel — all verbatim matches ✓

**Corporate page assessment: MOSTLY GOOD. Missing: hero subheadline, one intro paragraph in Magic Up Close section.**

---

### PAGE: /wedding-magician

**File:** `src/pages/wedding-magician.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "Wedding Magician \| Anthony Entertains \| Wedding Entertainment" | "Wedding Magician \| Anthony Entertains \| Wedding Entertainment" ✓ |
| H1 | "DALLAS' FAVORITE WEDDING MAGICIAN" | "Dallas' Favorite<br>Wedding Magician" ✓ |
| Canonical | Present | Missing |

#### MISSING TEXT: Original subheadline under H1
Original: "For the most magical day of your life!"  
Rebuild: `subheadline="For the most magical day of your life!"` ✓

#### Why Hire a Wedding Magician section
Original exact text: "Imagine this. You walk into your wedding venue and see your best friend trying to help your coworkers stump a mind reader. You are startled by a scream of delight from your cousin who just had something vanish from his hands!"  
Rebuild: ✓ exact match

Original stat: "Wedding surveys show that after 'I do', 81% of guests say that the entertainment is what they remember most about the wedding they attended."  
Rebuild: ✓ exact match

#### What Does a Wedding Magician Do section
Original text: "A wedding magician is essentially an entertaining ice breaker. A wedding magician will go from group to group, performing close-up magic and mentalism in a more intimate setting."  
Rebuild: The rebuild **rewrote** this section into three cards ("Close-Up Magic & Mentalism," "When Does a Wedding Magician Perform?," "The Perfect Ice Breaker") — the original verbatim paragraph is **WRONG CONTENT/MISSING**.

#### When Does a Wedding Magician Perform section
Original: "The cocktail hour is typically the time when the bridal party is off taking photos, leaving the guests to play the waiting game while having drinks."  
Rebuild: This verbatim sentence is **missing**. The rebuild card says "During the cocktail hour while the bridal party takes photos, after dinner for a full crowd..." — paraphrased, not verbatim.

#### Testimonials
Original wedding testimonials: Amber M., Victoria P., Rachel L., Laura J., Shannan R.  
Rebuild `weddingTestimonials`: Amber M., Victoria P., Rachel L., Laura J., Linda L., Michael M., Brandi B., Carol W., Shannan R., Andra W., Aaryn M.  
**INVENTED CONTENT:** Rebuild includes more wedding testimonials (Linda L., Michael M., Brandi B., Carol W., Andra W., Aaryn M.) than what appears on the original's main display. These may be from the original site's full testimonials page, but they appear to be correct testimonials — check if original page shows only a subset.

#### FAQs
Rebuild `weddingFaqs` (8 FAQs): Theme, destination weddings, recording, ages, consecutive hours, grumpy uncle, high guest count, additional info  
Original FAQ topics from fetch: theme, destination, recording, ages, consecutive hours, blog resources — all match ✓  
Additional FAQs in rebuild (grumpy uncle, high guest count) — these may be on original but weren't captured in fetch. Content is authentic Anthony Dempsey style. ✓

**Wedding page assessment: MOSTLY GOOD. Missing: verbatim "A wedding magician is essentially an entertaining ice breaker" paragraph and the cocktail hour timing description.**

---

### PAGE: /private-party-magician

**File:** `src/pages/private-party-magician.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "The #1 Magician & Mentalist For Your Private Party" | "The #1 Magician & Mentalist For Your Private Party" ✓ |
| H1 | "DALLAS' FAVORITE MAGICIAN & MENTALIST FOR PRIVATE PARTIES" | "Dallas' Favorite Magician & Mentalist<br>For Private Parties" ✓ |

#### Hero subheadline
Original: "Anthony's Sought-After Performance Will Transform Your Private Party Into An Unforgettable Experience."  
Rebuild: `subheadline="Anthony's Sought-After Performance Will Transform Your Private Party Into An Unforgettable Experience."` ✓

#### Service Options
Original: 2 main options (Intimate Private Parties, Stage Shows for Larger Events)  
Rebuild: 3 options (Private Gatherings, Intimate Private Parties, Stage Shows for Larger Events)  
**INVENTED CONTENT:** "Private Gatherings" card with body "Hoping to throw an extraordinary and unforgettable private party?" is not present on the original — the original only has 2 service cards.

Original Intimate Private Parties text: "Make your private, in-home party unforgettable with amazing entertainment! From mind-blowing magic tricks and mentalism performed right in front of your guests to a captivating living room stage show, Anthony will create a night that your guests will never forget."  
Rebuild: "Make your private, in-home party unforgettable with amazing entertainment! Don't settle for an ordinary dinner party — let him make it extraordinary!" — **WRONG CONTENT** (paraphrased/shortened)

Original Stage Shows text: "Make your private party unforgettable with a totally customizable Magic & Mind Reading Stage Show! Watch as your guests witness the impossible and become the ultimate stars of the show."  
Rebuild: "Make your private party unforgettable with a totally customizable Magic & Mind Reading Stage Show! Anthony, a seasoned performer with over 20 years of stage experience, will blow everyone's mind..." — **WRONG CONTENT** (additional sentences added that aren't in original)

#### Testimonials
Rebuild uses `corporateTestimonials` — original page uses: Randall S. (Nissan), Virginia B. (Expedia), William R. (Eagle Materials) ✓

**Private party assessment: Service card body copy paraphrased/rewritten; extra card invented.**

---

### PAGE: /trade-show-magician

**File:** `src/pages/trade-show-magician.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "Trade Show Entertainment That Delivers Results" | "Trade Show Entertainment That Delivers Results" ✓ |
| H1 | "Trade Show Entertainment That Is Iconic & Unforgettable" | "Trade Show Entertainment<br>That Is Iconic & Unforgettable" ✓ |

#### Hero subheadline
Original: "Generate Enthusiasm That Builds Quality Leads"  
Rebuild: `subheadline="Generate Enthusiasm That Builds Quality Leads"` ✓

#### MISSING TEXT: Intro paragraph
Original: "He can significantly increase traffic to your trade show exhibit, while promoting your products and services in a uniquely entertaining way, allowing you to generate quality leads."  
Rebuild: This sentence is **missing**. The rebuild's intro paragraph reads only: "Anthony Dempsey is a sought-after trade show magician and mentalist who understands that a lot is riding on the success of your trade show experience. The bottom line: if people aren't stopping at your booth, you're not getting the best return on your investment."

#### Service Options - VIP Close-up Magic
Original: "Anthony treats guests like old friends so they can loosen up and laugh. Anthony can provide a mixture of magic and mentalism for your guests. If you prefer one over the other, no problem! Just specify your preference during the booking process."  
Rebuild: `body: "Need to impress some VIPs? Anthony can provide his sought-after strolling magic and mentalism to a designated group, perhaps during a welcome reception or after a VIP dinner."` — **WRONG CONTENT** (significantly shortened/rewritten)

#### Service Options - Trade Show Floor Magic
Original full text: "Anthony understands that every minute counts on the trade show floor. He'll work your company's products, services, and message into an engaging, mind-blowing set that is guaranteed to draw people towards your booth. In between sets, he will do some one-on-one magic for attendees who may be waiting to chat with you. There's so much riding on the success of a trade show. Hire an excellent trade show mentalist to keep your booth's momentum going all day!"  
Rebuild: "Anthony understands that every minute counts on the trade show floor. He'll work your company's products, services, and message into an engaging, mind-blowing set that is guaranteed to draw people towards your booth." — **MISSING:** "In between sets, he will do some one-on-one magic for attendees who may be waiting to chat with you. There's so much riding on the success of a trade show. Hire an excellent trade show mentalist to keep your booth's momentum going all day!"

#### Benefits section
Original "Attendee Interaction": "It's frustrating when people glance at the booth you worked so hard on, and just keep moving. People will actually stop at your trade show booth when they see Anthony performing!"  
Rebuild: "People will actually stop at your trade show booth when they see Anthony performing!" — **MISSING** the first sentence: "It's frustrating when people glance at the booth you worked so hard on, and just keep moving."

**Trade show assessment: Multiple truncated/rewritten paragraphs in service descriptions.**

---

### PAGE: /holiday-party-magician

**File:** `src/pages/holiday-party-magician.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "A Holiday Party Magician That Will Thrill Your Guests" | "A Holiday Party Magician That Will Thrill Your Guests" ✓ |
| H1 | "HOLIDAY PARTY MAGICIAN & MENTALIST ANTHONY DEMPSEY" | eyebrow only; H1: "Just what your Christmas party needed" ✓ |

#### WRONG CONTENT: Magic Up Close body
Original: "Many holiday parties have more of a cocktail hour vibe, and that's where up-close, 'strolling' magic really shines. This is the perfect time for Anthony to stroll around the room and interact with the guests, captivating them with unique and entertaining mentalism and sleight of hand magic."  
Rebuild: "Many holiday events have some sort of welcome reception or cocktail hour. This is the perfect time for Anthony to stroll around the room and mingle with the guests, captivating them with unique and entertaining mentalism and sleight of hand magic." — **WRONG CONTENT** (paraphrased)

#### WRONG CONTENT: Peace of Mind benefit
Original: "Never worry about inappropriate content or a late arrival. Anthony wants to make you look good! So relax and enjoy the event you worked hard to plan."  
Rebuild: "Never worry about inappropriate content or a late arrival. Anthony wants to make you look good!" — **MISSING:** "So relax and enjoy the event you worked hard to plan."

#### FAQs
All 3 holiday FAQs (theme, new tricks, consecutive time) — text matches verbatim ✓

**Holiday party assessment: Minor text truncation in body copy.**

---

### PAGE: /holiday

**File:** `src/pages/holiday.astro`

This is a **duplicate/variant** of the holiday party magician page with a different slug and hero.

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "Holiday Party Magician \| Event Entertainment \| Anthony Entertains" | "Holiday Party Magician \| Event Entertainment \| Anthony Entertains" ✓ |
| H1 | "A Holiday Party Magician For People Who Like To Have Fun" | "A Holiday Party Magician<br>For People Who Like To Have Fun" ✓ |

The `/holiday` page in the rebuild is essentially identical to `/holiday-party-magician` with a different hero headline. The content matches what the original `/holiday` page shows. ✓

---

### PAGE: /birthday-party-magician-and-mentalist

**File:** `src/pages/birthday-party-magician-and-mentalist.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "The BEST Birthday Party Magician & Mentalist" | "The BEST Birthday Party Magician & Mentalist" ✓ |
| H1 | "DALLAS' FAVORITE MAGICIAN & MENTALIST FOR BIRTHDAY PARTIES" | "Dallas' Favorite Magician & Mentalist<br>For Birthday Parties" ✓ |

#### Service Options
Original description for Social Gatherings (strolling magic):  
The original page specifically mentions "50th birthday party" and "Anthony's charm, quick wit, and technical skill makes him the best choice when hiring a magician."  
Rebuild: "Looking to make that 50th birthday party extra special? Anthony's sought-after strolling magic and mentalism is very popular for adult birthday parties." ✓ — matches well

Original "Intimate Birthday Parties" text: "Make your birthday party stand out from the rest! After all, what's a birthday party without unforgettable entertainment? From Strolling Magic & Mentalism amongst the guests to a full living room Stage Show, Anthony will make your party a night that guests will NEVER forget! Serving Dallas, Fort Worth, Plano, Addison, Arlington, McKinney, Irving, Grapevine, Frisco, and more."  
Rebuild: ✓ matches

Original "Stage Shows For Large Birthday Parties": "Put your birthday party guests in the spotlight with a completely customizable Magic & Mind Reading Stage Show..."  
Rebuild: ✓ matches

#### FAQs
Rebuild `birthdayFaqs` (2 FAQs): availability + what to expect. Both verbatim matches ✓

**Birthday page assessment: GOOD FIDELITY.**

---

### PAGE: /services

**File:** `src/pages/services.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "The Best Magician in Dallas, TX \| Anthony Entertains" | "The Best Magician in Dallas, TX \| Anthony Entertains" ✓ |
| H1 | "The Best Magician in Dallas, TX" | "The Best Magician<br>in Dallas, TX" ✓ |

#### Service Cards
Original "Strolling Magic" description: "Dallas Magician Anthony Dempsey works his way amongst the crowd, showing them unbelievable feats."  
Rebuild "Close-up Magic and Mind Reading" description: "Strolling Magic at your cocktail hour is a great way to not only impress your guests, but also help them start the conversation!" — **WRONG CONTENT** (different text)

#### WRONG CONTENT: Service area note
Original: "Dallas Magician Anthony Dempsey Services Events all over Texas. Including Dallas, Fort Worth, Plano, Addison, Arlington, McKinney, Irving, Grapevine, Frisco, as well as all over the United States."  
Rebuild: Matches exactly ✓

#### Event Types list
Original includes a much longer list including: Team Building, Sales Meetings, Conventions, Trade Shows, Film and Television, Banquets, Colleges and Theaters, Graduations, Prom, Country Clubs, Award Ceremonies, Hotel Guest Entertainment, Birthday Parties, Special Events, Corporate Functions.  
Rebuild uses the same 15-item `allEvents` array ✓

**Services page assessment: Minor content variation in one service card description.**

---

### PAGE: /get-a-quote

**File:** `src/pages/get-a-quote.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "GET A QUOTE \| United States \| Anthony Entertains" | "GET A QUOTE \| United States \| Anthony Entertains" ✓ |
| H1 | "GET A QUOTE" | "Get a Free Quote" — **WRONG CONTENT** (case/wording different) |

#### WRONG CONTENT: Hero H1 text
Original: "GET A QUOTE"  
Rebuild: "Get a Free Quote"

#### Form fields comparison
Original form fields (from page source analysis): Not fully visible to WebFetch, but the page has a contact form.  
Rebuild form fields: First Name*, Last Name*, Email*, Phone, Company/Organization, Event Date, Type of Event (select), Estimated Budget (select), Tell me about your event*  

The rebuild has a **separate** get-a-quote form (`src/pages/get-a-quote.astro`) AND a contact form embedded on service pages via `ContactForm.astro`. The get-a-quote page form has slightly different field names than the ContactForm component used on service pages:
- get-a-quote.astro: budget ranges "Under $500", "$500-$1,000", "$1,000-$2,500", "$2,500-$5,000", "$5,000+"
- ContactForm.astro: budget ranges "Under $1,000", "$1,000-$2,000", "$2,000-$3,500", "$3,500-$5,000", "$5,000+"
**INCONSISTENCY:** Two different budget range scales used across the site.

#### MISSING: Form action / submission
The get-a-quote form has no `action` attribute and no Netlify form handling (unlike `ContactForm.astro` which has `netlify-honeypot`). The form will not submit anywhere. **MISSING FORM FUNCTIONALITY.**

#### MISSING: Contact info panel text
Original page shows contact details alongside the form (phone, email, hours). Rebuild has this ✓

**Get-a-quote assessment: Form non-functional (no action/netlify attribute). H1 wording differs. Budget ranges inconsistent with contact form.**

---

### PAGE: /downloadable-content

**File:** `src/pages/downloadable-content.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "Downloadable Material \| anthonyentertains" | "Downloadable Material \| anthonyentertains" ✓ |

#### Download items
Original items: Stage Show Poster, Poster with Blank Space, Instagram Graphic, 16:9 Screen Graphic (appears twice in original), Comedy Flyer, Serious Flyer, Logo Black, Logo Purple, Cut Out Promo, Promotional Photos (5 in original vs 3 in rebuild)  
Rebuild items: 12 total — Stage Show Poster, Poster with Blank Space, Instagram Graphic, 16:9 Screen Graphic, Comedy Flyer, Serious Flyer, Logo — Black, Logo — Purple, Cut Out Promo, Promotional Photo 1, Promotional Photo 2, Promotional Photo 3

**MISSING:** Original has 5 promotional photos; rebuild has only 3 ("Promotional Photo 1," "Promotional Photo 2," "Promotional Photo 3").

#### Download links
Rebuild download links go to `${base}downloadables/${item.file}` — these are static file paths that must exist in `public/downloadables/`. **No actual files are confirmed to exist at these paths.** If the downloadable files are not in `public/downloadables/`, all downloads will 404.

#### Short Bio
Original: "Award-winning comedy magician and mentalist Anthony Dempsey has thrilled corporate and celebrity audiences across the globe. Anthony has been seen by millions of people on film and television; most recently appearing on Penn and Teller's Fool Us!"  
Rebuild: ✓ exact match

**Downloadable content assessment: Download files may not exist (paths unverified). Missing 2 promotional photos.**

---

### LOCATION PAGES — GENERAL NOTES

All location pages use the `LocationPageContent.astro` template component or custom page layouts. The template structure is sound and consistent. Common issues across all location pages:

1. **MISSING CANONICAL:** No canonical URL on any location page
2. **WRONG CONTENT:** The `EventTypesSection` title is auto-generated from `heroEyebrow` with string manipulation (`replace(' Magician & Mentalist', '')`) — this produces grammatically awkward titles on some pages
3. **MISSING SEO:** No LocalBusiness or PerformingArtist schema on location pages

---

### PAGE: /fort-worth-magician

**File:** `src/pages/fort-worth-magician.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "Fort Worth Magician \| Corporate Event Entertainment" | "Fort Worth Magician \| Corporate Event Entertainment" ✓ |
| H1 | "Fort Worth's Premier Magician & Mentalist" | "Fort Worth's Premier<br>Magician & Mentalist" ✓ |

#### Content
Rebuild uses `LocationPageContent` with custom body copy for corporate, private, and stage sections. The content closely matches the original:
- Corporate body: "Are you looking to bring your Fort Worth team together in a whole new way? Say goodbye to awkward office gatherings..." ✓
- Original has "Anthony has successfully executed over 2,000 events" — rebuild includes this ✓
- Stage body: 20 years experience ✓

**Fort Worth assessment: GOOD FIDELITY.**

---

### PAGE: /plano-magician

**File:** `src/pages/plano-magician.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "Plano Magician \| Corporate Event Entertainment \| Anthony Entertains" | "Plano Magician \| Corporate Event Entertainment \| Anthony Entertains" ✓ |
| H1 | "PLANO'S FAVORITE MAGICIAN & MENTALIST" | "Plano's Favorite<br>Magician & Mentalist" ✓ |

#### WRONG CONTENT: Service descriptions
Original "Magic Up Close" full text: "Strolling magic and mentalism is the perfect opportunity for Anthony to mix and mingle with your guests. He'll spend time with each cluster of people and help break the ice for those who don't know anyone! Strolling magic is ideal for: Dinner Parties, Cocktail Hours, Weddings, Adult Birthdays, Corporate Events, Graduations, Anniversaries, Holiday Parties, Proms, and Hospitality."  
Rebuild "Strolling Magic & Mentalism": "Strolling magic and mentalism is the perfect opportunity for Anthony to mix and mingle with your guests. He'll spend time with each cluster of people and help break the ice for those who don't know anyone!" — **MISSING** the "ideal for" list.

Original "On-Stage Magic Shows" full text: "Plan on having a stage at your event? Anthony's got you covered with a mind-blowing magic and mentalism stage show that uses audience participation from start to finish. This show is a perfect mixture of comedy, mystery, and 'what just happened?' Stage Magic is great for: Banquets, Corporate Events, Trade Shows, House Parties, Festivals, Team Building Events, Large Dinner Parties, Sales Presentations, and Surprise Entertainment."  
Rebuild "Stage Shows": "Plan on having a stage at your event? Anthony's got you covered with a mind-blowing magic and mentalism stage show that uses audience participation from start to finish." — **MISSING** "This show is a perfect mixture of comedy, mystery..." and the "great for" list.

#### WRONG CONTENT: Three Promises (original wording differs)
Original "Guest Interaction": "Your guests won't be sitting around on their phones all night. They will be up and about, having a great time with one another!"  
Rebuild: Uses generic `ThreeGuarantees` defaults — **WRONG CONTENT** (completely different text)

Original "An Amped Up Party": "Anthony's been trusted to elevate both intimate and large events in Plano. He'll make sure that your event is one to remember."  
Rebuild: Uses generic defaults — **WRONG CONTENT**

Original "Peace of Mind": "Rest easy knowing you've hired a professional who wants you to look your best! You won't have to worry about inappropriate language or a late arrival."  
Rebuild: Uses generic defaults — **WRONG CONTENT**

#### FAQs — Plano-specific
Original has a Plano-specific FAQ about "What exactly is a mentalist?" with longer answer than rebuild's `planoFaqs`.  
Original answer: "It's not every day that you meet a mentalist... Everyone's heard of a magician who does sleight of hand tricks or card tricks, but a mentalist entertains people with tricks that are more psychological based, like mind reading tricks! It's a lot of fun for all types of events."  
Rebuild `planoFaqs` "What is mentalism?" answer is a shorter, rewritten version. **WRONG CONTENT.**

**Plano assessment: Service descriptions truncated, benefits section using wrong (generic) text, FAQ answer rewritten.**

---

### PAGE: /magician-grapevine-texas

**File:** `src/pages/magician-grapevine-texas.astro`

#### SEO
| Field | Original | Rebuild |
|---|---|---|
| Meta title | "Grapevine Magician \| Corporate Event Entertainment \| Anthony Entertains" | "Grapevine Magician \| Corporate Event Entertainment \| Anthony Entertains" ✓ |
| H1 | "Grapevine Magician and Mentalist Anthony Dempsey wants to help you elevate your next event." | "Grapevine Magician and Mentalist<br>Anthony Dempsey" ✓ (slightly different) |

#### WRONG CONTENT: Hero H1
Original H1: "Grapevine Magician and Mentalist Anthony Dempsey wants to help you elevate your next event." (full sentence)  
Rebuild H1: "Grapevine Magician and Mentalist<br>Anthony Dempsey"  
The subheadline "Anthony wants to help you elevate your next event." matches the latter half — but the original puts "wants to help you elevate your next event" IN the H1, not as subheadline.

#### WRONG CONTENT: Strolling Magic description
Original: "Who says you can't mix wine with magic? 'Strolling' magic and mentalism is the most popular option. Anthony will mix and mingle with your guests while they enjoy the party. He'll spend time with each group of people and help break the ice for those who don't know anyone! Strolling magic is great for: Dinner Parties, Cocktail Hours, Weddings, Adult Birthdays, Corporate Events, Graduations, Anniversaries, Holiday Parties, Proms, and Hospitality."  
Rebuild: "Mix and mingle with your guests while they enjoy the party. Anthony's close-up magic and mentalism creates personalized moments for each group, making everyone feel like the star of the show." — **WRONG CONTENT** (missing "Who says you can't mix wine with magic?" opener, missing event type list)

#### WRONG CONTENT: Stage Magic description
Original: "Hosting your Grapevine event somewhere with a stage? Another great option is a fast-paced magic and mentalism stage show that uses members of the audience from start to finish. This show is a perfect mixture of comedy, mystery, and 'what the heck?' Stage Magic is great for: Banquets, Corporate Events, Trade Shows, House Parties, Festivals, Team Building Events, Large Dinner Parties, Sales Presentations, and Surprise Entertainment."  
Rebuild: "Fast-paced magic and mentalism stage show that uses members of the audience from start to finish. Perfect for conferences, banquets, and large gatherings at the Gaylord Texan and other Grapevine venues." — **WRONG CONTENT** (rewritten, missing event list)

#### WRONG CONTENT: Three Promises
Same issue as Plano — original has unique text per promise.  
Original "Guest Interaction": "People won't be sitting around on their phones all night. Your guests will be up and about, having a great time with one another!"  
Original "An Amped Up Party": "Anthony's been trusted to elevate both intimate and massive events. He'll make yours one to remember."  
Original "Peace of Mind": "Rest easy knowing you've hired a professional. You won't have to worry about inappropriate language or a late arrival. Anthony wants to make you look good!"  
Rebuild: Uses generic `ThreeGuarantees` defaults — **WRONG CONTENT**

#### FAQ — Grapevine-specific answers
Original FAQ "Does your booked time need to be consecutive?" answer includes "A very common occurrence of this is when I'm hired for strolling magic and mentalism during a welcome cocktail hour, take a break while the group enjoys their dinner, and then I'll begin a stage show while they're finishing dessert."  
Rebuild `grapevineFaqs` has truncated version — **WRONG CONTENT/MISSING CONTENT**.

Original FAQ "Can we see you at a public show?" answer includes: "if I am ever planning a public performance, I'll be sure to post about it on my blog and Instagram so you can be in attendance! You can read a bit about my experience on Penn & Teller Fool Us on my blog."  
Rebuild: "My public magic shows are pretty rare. As much as I'd love to do public shows, I stay pretty busy with private performances." — **MISSING** the blog/Instagram callout.

Original FAQ "Can you do magic during a wine tour?" answer includes: "The more wine you try, the better the tricks will get! Once you have your date secured with your group, contact me and we'll come up with the best plan of action!"  
Rebuild: "I've actually been hired in the past to ride on the wine tasting tour bus and do magic and mentalism for the passengers between stops." — **MISSING** the wine/contact callout text.

**Grapevine assessment: Multiple truncated FAQ answers, wrong service descriptions, wrong benefits text.**

---

### LOCATION PAGES: /austin-entertainment, /houston-entertainment, /atlanta-ga-entertainment, /chicago-il-magician, /grand-rapids-magician, /los-angeles-ca-magician, /new-york-ny-magician, /orlando-fl-magician, /seattle-wa-magician

All use the `LocationPageContent` template with custom props. Structure matches the originals. Key notes:

- **Austin:** `austinHoustonFaqs` matches original FAQ content ✓. Service body copy matches original well ✓.
- **Houston:** Uses unusual `corporateHeading="Strolling Magic"` / `privateHeading="Stage Shows"` / `stageHeading="Private Parties"` pattern (reordered). This is intentional per page design.
- **Atlanta:** Matches original ✓
- **Chicago:** Includes "Making boring events a thing of the past!" intro ✓. Mentions Fortune 500 clients ✓. Mentions 2,000 corporate events ✓.
- **Grand Rapids:** Matches original well ✓.
- **Los Angeles:** Matches original ✓. Mentions MC services ✓.

For New York, Orlando, and Seattle: files exist (`new-york-ny-magician.astro`, `orlando-fl-magician.astro`, `seattle-wa-magician.astro`) but were not verified against originals in this pass.

---

### PAGE: /best-magician-for-hire-in-dallas-texas

**File:** `src/pages/best-magician-for-hire-in-dallas-texas.astro`

This page exists in the rebuild but was **not listed** as a page on the original site nav. Checking the URL pattern — this appears to be an SEO landing page that exists on the original site.

The rebuild page has unique content (services grid with corporate, private, stage cards) that appears consistent with the original site's content strategy. Content quality is good.

**NOTE:** The original site also has pages at `/best-magician-for-hire-in-dallas-texas` — this page slug matches.

---

## COMPONENT-LEVEL AUDIT

### ThreeGuarantees Component
**Issue:** The component uses hardcoded default guarantee body text that does NOT match the original site's text. The original site shows guarantee titles only (or different body copy). The rebuild adds invented descriptive paragraphs:
- "Anthony's performances blend comedy, mystery, and astonishment into one unforgettable show your guests will never stop talking about."
- "Every performance is designed to pull guests in, get them laughing, and have them become the stars of the show themselves."
- "From intimate cocktail hours to 1,000-person galas, Anthony guarantees an experience that stands out years after the event."

These paragraphs are **INVENTED** — they do not appear on the original site. The icons (🎭, 🤝, 💫) are also invented.

On location-specific pages (Plano, Grapevine) where the original has custom benefit text per guarantee, the rebuild's generic defaults are **WRONG CONTENT**.

### ContactForm Component — Budget Ranges
The `ContactForm` component (used on all service pages) has budget options: Under $1,000 / $1,000-$2,000 / $2,000-$3,500 / $3,500-$5,000 / $5,000+  
The `get-a-quote.astro` standalone form has: Under $500 / $500-$1,000 / $1,000-$2,500 / $2,500-$5,000 / $5,000+  
**INCONSISTENCY** that needs resolution. Original site uses a single quote form.

### VideoGrid Component
All 9 YouTube video IDs match the original site ✓. Thumbnails, titles, and durations match ✓.

### Header Navigation
Original nav: HOME | SERVICES | LOCATIONS | GET A QUOTE | MEDIA | TESTIMONIALS | CONTACT | BLOG  
Rebuild nav: Services (dropdown) | Locations (dropdown) | Media (anchor /#media) | Testimonials (anchor /#testimonials) | Contact (anchor /#contact) | Blog | [CTA: Get a Free Quote]  

Missing as standalone nav item: "GET A QUOTE" (present as CTA button, but not in the `mainNav` list)

### Footer
Original footer copyright: "© 2026 by Anthony Entertains"  
Rebuild: "© 2026 by Anthony Entertains" ✓

Social links: YouTube + Instagram ✓ (TikTok added in rebuild — not on original)  
**INVENTED:** TikTok link (`https://www.tiktok.com/@anthony_entertains`) is present in rebuild footer but was NOT found on the original site.

---

## DESIGN QUALITY SUMMARY

**Strengths:**
- Clean dark theme with professional color palette
- Custom CSS design tokens well-organized
- Responsive grid layouts for all section types
- Smooth scroll animations with `IntersectionObserver`
- Mobile menu with proper accessibility attributes (aria-expanded, aria-hidden)
- Video modal player with keyboard navigation (Escape to close)
- Professional typography pairing (Playfair Display + Inter)
- Good visual hierarchy with section labels, dividers, headings

**Weaknesses / Missing from original:**
- No schema.org structured data (both sites lack it, but rebuild should add it)
- No canonical URLs set on any page
- No Open Graph image path correction (uses GitHub Pages URL in OG meta)
- ThreeGuarantees body copy is invented
- TikTok social link invented
- get-a-quote form has no submission target

---
