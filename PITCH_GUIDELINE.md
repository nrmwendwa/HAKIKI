# HAKIKI SCANNER — Pitch Deck Guideline

A working brief for the team preparing the HAKIKI SCANNER pitch deck. Use this as a slide-by-slide skeleton, talking-points sheet, and visual style guide.

---

## How to use this document

- Each numbered section below = one slide.
- "Key message" is the single sentence the audience should walk away remembering from that slide.
- "Content" lists what to put on the slide (keep slides sparse — speak the rest).
- "Speaker notes" are what the presenter says aloud.
- The **What to avoid** and **Color palette** sections at the bottom apply to the whole deck.

---

## Slide 1 — Title / Hook

**Key message:** A bold, branded opening that signals trust and Tanzanian identity.

**Content**
- Title (large): *HAKIKI SCANNER*
- Tagline (Swahili): *Kinga ya Kidijitali Dhidi ya Habari za Uongo.*
- Subtitle (English): *Real-time misinformation defense for Tanzania.*
- Team name, presenter name(s), date, contact email.

**Speaker notes**
- Open in Swahili, then translate. Sets the localization tone immediately.
- 15 seconds maximum on this slide.

---

## Slide 2 — The Problem

**Key message:** Misinformation in Tanzania is fast, viral, and unchecked.

**Content**
- 3 short bullets:
  - Fabricated images and doctored screenshots dominate WhatsApp forwards.
  - Swahili-language false claims spread faster than any fact-checker can respond.
  - Existing tools (Pesacheck, AFP, etc.) are slow, English-first, and not built for the average citizen.
- One headline statistic if available (Reuters Institute Digital News Report, GeoPoll, or TCRA media-consumption data).

**Speaker notes**
- Anchor with a real, recent example: a panic-inducing fake health alert, a fabricated "official" notice, an electoral rumor.
- The audience should feel the urgency before you mention the product.

---

## Slide 3 — Why Now

**Key message:** Generative AI has made fakes cheap; smartphones have made distribution instant. The window to act is closing.

**Content**
- Generative AI has collapsed the cost of producing convincing fake images and Swahili text.
- Smartphone penetration in Tanzania continues to climb; WhatsApp is the dominant rumor vector.
- Regulators and law enforcement are actively seeking citizen-facing verification tools — none exist that are localized.

---

## Slide 4 — The Solution: HAKIKI SCANNER

**Key message:** One panel. Two modalities. A verdict in seconds. In Swahili.

**Content**
- Bilingual (Swahili-first) verification tool: paste a claim or upload an image, get a verdict in seconds.
- Verdict labels:
  - Images → **HALISI / INATIA SHAKA / FEKI**
  - Text → **IMETHIBITISHWA / HAIJATHIBITISHWA / YA UONGO**
- One-click reporting to the **Tanzania Police Force Cyber Crime Unit (Ministry of Home Affairs)** for confirmed fakes.
- One-click share-to-debunk for confirmed truths.
- Web-first, mobile-responsive, dark/light mode.

---

## Slide 5 — Live Demo / Product Shots

**Key message:** Show, don't tell.

**Content (screenshots)**
1. Text panel with a real Swahili claim → IMETHIBITISHWA + source link.
2. Image panel with a manipulated photo → FEKI verdict.
3. The reporting flow (mailto opens with pre-filled body).

**Speaker notes**
- If live demo is feasible, do it. Have a backup video.
- Run the demo on the audience's preferred language setting.

---

## Slide 6 — How It Works

**Key message:** A multi-signal verification pipeline built in-house, tuned for Tanzania.

**Content (4-step diagram)**
1. **Claim extraction** — parses user submissions into checkable assertions.
2. **Cross-source corroboration** — queries a curated registry of trusted Tanzanian and international sources (TCRA notices, government portals, established media) in real time.
3. **Image authenticity analysis** — perceptual hashing and visual integrity checks for tampering and AI-generation artifacts.
4. **Decision engine** — weighted fusion of claim score, image authenticity, and source trust produces the final verdict with a transparent audit trail.

**Speaker notes**
- Frame this as *"the HAKIKI verification engine"* — it is our orchestration, our prompts, our weights, our source registry, our OCR pipeline, our hashing logic, and our verdict surface.
- If asked about underlying model components, pivot to: *"We've built a domain-specific verification stack tuned for Swahili and the Tanzanian information landscape. The proprietary value is the orchestration, the source registry, and the decision logic — model components are modular and we're actively benchmarking alternatives."*

---

## Slide 7 — What Makes Us Different

**Key message:** Localization plus a closed-loop reporting path that no competitor offers.

**Content**
- **Swahili-native UX** — verdicts, error messages, share text, and report templates all in Swahili. Competitors are English-by-default.
- **Citizen-grade speed** — seconds per check vs. days for traditional fact-checkers.
- **Closed-loop reporting** — confirmed fakes route directly to the Tanzania Police Force Cyber Crime Unit, turning users into a distributed sensor network and enabling enforcement under the Cybercrimes Act 2015.
- **Dual-modality** — text and image verification in one panel.

---

## Slide 8 — Traction / Validation

**Key message:** People want this. Here's the proof.

**Content (fill with what you have)**
- Pilot users, claims processed.
- Partner conversations (newsrooms, civic-tech orgs, the Cyber Crime Unit, NGOs).
- Waitlist signups, social proof, press mentions.

---

## Slide 9 — Market

**Key message:** A large, addressable, underserved market.

**Content**
- **TAM** — ~65M Swahili speakers across the East African Community.
- **SAM** — ~30M smartphone users in Tanzania.
- **SOM** — newsrooms, civic NGOs, and telco anti-fraud teams as paying B2B; citizens as the free-tier acquisition channel.

---

## Slide 10 — Business Model

**Key message:** Free for citizens. Paid for institutions. Funded by mission-aligned grants.

**Content**
- Free citizen tier (trust-building and reach).
- Paid tiers:
  - API access for newsrooms.
  - Bulk-verification dashboards for NGOs and government.
  - White-label for telcos.
- Grant funding from civic-tech and press-freedom funders (e.g. Luminate, Mozilla, Internews).

---

## Slide 11 — Roadmap

**Key message:** Clear 18-month plan with concrete milestones.

**Content**
- **Q3** — WhatsApp bot integration (where ~80% of forwards live).
- **Q4** — Video and audio verification.
- **2027** — Expansion to Kenya, Uganda, Rwanda; cross-language model improvements; on-device inference for offline checks.

---

## Slide 12 — Team

**Key message:** This is the team to build it.

**Content**
- Names, roles, photos.
- One sentence each on relevant background: Tanzanian media, civic tech, ML/engineering, policy.

---

## Slide 13 — The Ask

**Key message:** Specific number, specific use, specific milestone.

**Content**
- Funding amount.
- What it buys (engineers, data partnerships, regulatory work).
- 18-month milestone the funding unlocks.

---

## Slide 14 — Closing

**Key message:** Memorable, Swahili, mission-forward.

**Content**
- *Ukweli kwa kila Mtanzania.* (Truth for every Tanzanian.)
- Contact details.

---

## What to avoid saying (everywhere)

- Names of any third-party AI provider.
- Phrases like *"we use an LLM"* or *"we wrap an API."* These trigger investor skepticism.
- Specifics like model size, parameter counts, or training datasets. Talk about the **pipeline**, the **Swahili layer**, the **trusted-source registry**, and the **decision engine** — these are real components we own.
- If asked *"did you train your own model?"* — pivot to the response in Slide 6 speaker notes.

---

## Color palette (matches the live product)

Use these exact values so the deck is visually consistent with the app.

### Primary brand
| Token | Hex | HSL | Use |
|---|---|---|---|
| HAKIKI Green (light) | `#22A06B` | `152 65% 38%` | Buttons, headers, brand mark |
| HAKIKI Green (dark) | `#26C281` | `152 70% 45%` | Dark-mode slides, glows |

### Accent
| Token | Hex | HSL | Use |
|---|---|---|---|
| Signal Gold | `#F5B324` | `42 90% 50%` | Highlights, callouts, "The Ask" emphasis |

### Verdict semantics (use consistently in any verdict graphics)
| Verdict | Hex | HSL |
|---|---|---|
| Safe / HALISI / IMETHIBITISHWA | `#22A06B` | `152 65% 38%` |
| Suspicious / INATIA SHAKA / HAIJATHIBITISHWA | `#F2A60C` | `38 92% 48%` |
| Fake / FEKI / YA UONGO | `#DC2828` | `0 72% 50%` |

### Neutrals — light deck
| Token | Hex | HSL |
|---|---|---|
| Background | `#FFFFFF` | `0 0% 100%` |
| Foreground / text | `#181C24` | `220 20% 12%` |
| Muted text | `#5C616B` | `220 10% 40%` |
| Surface / card | `#F4F5F7` | `220 15% 96%` |
| Borders | `#DCDFE5` | `220 15% 88%` |

### Neutrals — dark deck
| Token | Hex | HSL |
|---|---|---|
| Background | `#0F1218` | `220 20% 7%` |
| Card | `#161A22` | `220 18% 10%` |
| Foreground | `#EBEAE3` | `60 10% 92%` |
| Muted text | `#7E8593` | `220 10% 55%` |

### Hero gradient
`linear-gradient(135deg, #26C281 → #F5B324 → transparent)`

### Typography
- **Display / headlines:** Space Grotesk (600 / 700)
- **Body:** Inter (400 / 500)
- Both are free on Google Fonts and already shipping in the product.

### Usage rules
- **Green** = trust, verification, the brand. Use sparingly on CTAs and the verdict bar.
- **Gold** = attention, never for verdicts. Use for "The Ask" and stat callouts.
- **Red** = only for FEKI / YA UONGO and the misinformation-problem slides — never for headlines.
- **60-30-10** ratio: 60% neutral surface, 30% green, 10% gold or red accents.
