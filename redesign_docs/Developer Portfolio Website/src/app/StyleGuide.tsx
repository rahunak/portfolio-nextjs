import { useState } from "react";
import { ArrowUpRight, AlertCircle, Check, ExternalLink } from "lucide-react";

// ─── Shared primitives ───────────────────────────────────────────────────────

function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline justify-between mb-10 border-b border-border pb-4">
      <h2 className="font-heading font-bold text-4xl md:text-5xl">{title}</h2>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hidden md:block">
        {n}
      </span>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5 mt-10 first:mt-0">
      {children}
    </h3>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[160px_1fr] border-b border-border py-2.5 last:border-0">
      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{label}</span>
      <span className="font-mono text-[11px] text-foreground">{value}</span>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-[#0a0a0b] border border-border p-5 overflow-x-auto font-mono text-[11px] text-muted-foreground leading-relaxed rounded-none whitespace-pre">
      {code}
    </pre>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-1 tracking-wide">
      {children}
    </span>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const colorTokens = [
  { token: "--background", value: "#0D0D0E", role: "Page canvas", contrast: "—" },
  { token: "--foreground", value: "#F0EDE8", role: "Primary text", contrast: "vs bg: ~16:1 ✓" },
  { token: "--card", value: "#141416", role: "Card / panel surface", contrast: "—" },
  { token: "--muted-foreground", value: "#6B6B75", role: "Labels, captions ⚠", contrast: "vs bg: ~4.1:1  AA large only" },
  { token: "--accent", value: "#C8FF4B", role: "Primary interactive accent", contrast: "vs bg: ~12:1 ✓" },
  { token: "--accent-foreground", value: "#0D0D0E", role: "Text on accent surface", contrast: "vs accent: ~12:1 ✓" },
  { token: "--border", value: "rgba(240,237,232,0.10)", role: "Dividers and hairlines", contrast: "Decorative only" },
  { token: "--destructive", value: "#FF4040", role: "Error / danger states", contrast: "vs bg: ~5.4:1 ✓" },
  { token: "--ring", value: "#C8FF4B", role: "Focus ring", contrast: "Same as accent ✓" },
];

const typeScale = [
  {
    name: "Hero heading",
    font: "Fraunces",
    weight: "700–900",
    sizeMobile: "clamp(4.5rem, 13vw, 11rem)",
    sizeDesktop: "clamp(4.5rem, 13vw, 11rem)",
    lineHeight: "0.88",
    letterSpacing: "-0.02em",
    color: "foreground",
    axes: "opsz 144, SOFT 0, WONK 0",
    class: "font-heading font-bold",
  },
  {
    name: "Section heading",
    font: "Fraunces",
    weight: "700",
    sizeMobile: "clamp(2.5rem, 7vw, 6rem)",
    sizeDesktop: "clamp(2.5rem, 7vw, 6rem)",
    lineHeight: "1.0",
    letterSpacing: "-0.01em",
    color: "foreground",
    axes: "opsz 72",
    class: "font-heading font-bold",
  },
  {
    name: "Project title (list)",
    font: "Fraunces",
    weight: "700",
    sizeMobile: "1.5rem (24px)",
    sizeDesktop: "2.25rem (36px)",
    lineHeight: "1.2",
    letterSpacing: "0",
    color: "foreground → accent on hover",
    axes: "opsz 36",
    class: "font-heading font-bold text-2xl md:text-4xl",
  },
  {
    name: "Project title (card)",
    font: "Fraunces",
    weight: "700",
    sizeMobile: "1.5rem (24px)",
    sizeDesktop: "1.875rem (30px)",
    lineHeight: "1.25",
    letterSpacing: "0",
    color: "white (on image overlay)",
    axes: "opsz 30",
    class: "font-heading font-bold text-2xl md:text-3xl",
  },
  {
    name: "Stat value (hero)",
    font: "Fraunces",
    weight: "300",
    sizeMobile: "1.5rem (24px)",
    sizeDesktop: "1.875rem (30px)",
    lineHeight: "1.3",
    letterSpacing: "0",
    color: "foreground",
    axes: "opsz 9 (italic, expressive)",
    class: "font-heading font-light italic text-2xl md:text-3xl",
  },
  {
    name: "Skill item",
    font: "Fraunces",
    weight: "300",
    sizeMobile: "1.125rem (18px)",
    sizeDesktop: "1.25rem (20px)",
    lineHeight: "1.4",
    letterSpacing: "0",
    color: "foreground",
    axes: "opsz 20",
    class: "font-heading font-light text-lg md:text-xl",
  },
  {
    name: "Body large",
    font: "Figtree",
    weight: "400",
    sizeMobile: "1.125rem (18px)",
    sizeDesktop: "1.25rem (20px)",
    lineHeight: "1.625",
    letterSpacing: "0",
    color: "muted-foreground",
    axes: "—",
    class: "font-sans text-lg md:text-xl leading-relaxed text-muted-foreground",
  },
  {
    name: "Body base",
    font: "Figtree",
    weight: "400",
    sizeMobile: "1rem (16px)",
    sizeDesktop: "1rem (16px)",
    lineHeight: "1.5",
    letterSpacing: "0",
    color: "foreground",
    axes: "—",
    class: "font-sans text-base",
  },
  {
    name: "Body small",
    font: "Figtree",
    weight: "400",
    sizeMobile: "0.875rem (14px)",
    sizeDesktop: "0.875rem (14px)",
    lineHeight: "1.5",
    letterSpacing: "0",
    color: "muted-foreground",
    axes: "—",
    class: "font-sans text-sm text-muted-foreground",
  },
  {
    name: "Mono label (section)",
    font: "JetBrains Mono",
    weight: "400",
    sizeMobile: "0.625rem (10px)",
    sizeDesktop: "0.625rem (10px)",
    lineHeight: "1.5",
    letterSpacing: "0.2em",
    color: "muted-foreground",
    axes: "—",
    class: "font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground",
  },
  {
    name: "Mono nav / button",
    font: "JetBrains Mono",
    weight: "400",
    sizeMobile: "0.6875rem (11px)",
    sizeDesktop: "0.6875rem (11px)",
    lineHeight: "1.5",
    letterSpacing: "0.18em",
    color: "muted-foreground / foreground",
    axes: "—",
    class: "font-mono text-[11px] tracking-[0.18em] uppercase",
  },
  {
    name: "Mono tag",
    font: "JetBrains Mono",
    weight: "400",
    sizeMobile: "0.625rem (10px)",
    sizeDesktop: "0.625rem (10px)",
    lineHeight: "1.5",
    letterSpacing: "0.12em",
    color: "muted-foreground",
    axes: "—",
    class: "font-mono text-[10px] tracking-wide text-muted-foreground",
  },
];

const motionTokens = [
  { element: "Nav border / backdrop", property: "opacity, border, backdrop-filter", duration: "300ms", easing: "ease-in-out", trigger: "scroll > 40px" },
  { element: "Project row — indent", property: "padding-left", duration: "200ms", easing: "ease-in-out", trigger: "mouseenter" },
  { element: "Project row — title color", property: "color", duration: "150ms", easing: "ease-in-out", trigger: "mouseenter" },
  { element: "Project card — image scale", property: "transform, opacity", duration: "500ms", easing: "ease-in-out", trigger: "mouseenter" },
  { element: "Project card — ↗ icon", property: "opacity", duration: "300ms", easing: "ease-in-out", trigger: "mouseenter" },
  { element: "Button primary — opacity", property: "opacity", duration: "150ms", easing: "ease-in-out", trigger: "hover" },
  { element: "Button secondary — invert", property: "background, color", duration: "200ms", easing: "ease-in-out", trigger: "hover" },
  { element: "Link / nav hover", property: "color", duration: "150ms", easing: "ease-in-out", trigger: "hover" },
  { element: "↗ icon reveal (group hover)", property: "opacity", duration: "150ms", easing: "ease-in-out", trigger: "parent hover" },
  { element: "Input border", property: "border-color", duration: "200ms", easing: "ease-in-out", trigger: "focus" },
  { element: "Image portrait", property: "opacity", duration: "300ms", easing: "ease-in-out", trigger: "hover" },
  { element: "Skill cell", property: "background-color", duration: "150ms", easing: "ease-in-out", trigger: "hover" },
  { element: "Mobile menu overlay", property: "opacity", duration: "300ms", easing: "ease-in-out", trigger: "state toggle" },
  { element: "Scroll-down arrow", property: "transform (bounce)", duration: "1s ∞", easing: "cubic-bezier(0,0,0.2,1) — Tailwind bounce", trigger: "constant" },
];

const responsiveMatrix = [
  {
    component: "Navigation",
    mobile: "Logo left · Hamburger right · All links hidden · \"Hire me\" hidden",
    desktop: "Logo left · Nav links center · \"Hire me\" CTA right",
  },
  {
    component: "Mobile menu",
    mobile: "Full-screen overlay · 6xl serif links · opacity transition · email + github at bottom",
    desktop: "Does not exist",
  },
  {
    component: "Hero heading",
    mobile: "clamp starts ~4.5rem · stacked single column",
    desktop: "clamp reaches up to 11rem · 2-col grid",
  },
  {
    component: "Hero stats",
    mobile: "Row wraps, gap-8",
    desktop: "Row, gap-16",
  },
  {
    component: "Project row",
    mobile: "3 cols: [40px · title · year+icon] · tech tags hidden",
    desktop: "4 cols: [56px · title · tech tags · year+icon]",
  },
  {
    component: "Project image cards",
    mobile: "1 column",
    desktop: "2 columns",
  },
  {
    component: "Skills grid",
    mobile: "2 columns",
    desktop: "3 columns",
  },
  {
    component: "About layout",
    mobile: "Single column · text → photo below",
    desktop: "2-col: text+experience left · photo right",
  },
  {
    component: "Experience rows",
    mobile: "Single column · period above role",
    desktop: "2-col: [180px period] [role + description]",
  },
  {
    component: "Contact layout",
    mobile: "Single column · links → form below",
    desktop: "2 equal columns",
  },
  {
    component: "Section label (01—)",
    mobile: "Hidden (aria-hidden)",
    desktop: "Visible, right-aligned",
  },
  {
    component: "Horizontal padding",
    mobile: "px-6 (24px)",
    desktop: "px-12 (48px)",
  },
  {
    component: "Section vertical padding",
    mobile: "py-20 (80px)",
    desktop: "py-28 (112px)",
  },
];

const accessibilityNotes = [
  { check: "Body text contrast", result: "PASS", detail: "#F0EDE8 on #0D0D0E — ~16:1 (AAA)" },
  { check: "Muted text on dark bg", result: "WARN", detail: "#6B6B75 on #0D0D0E — ~4.1:1. Passes AA large text (3:1) but misses AA normal (4.5:1). Use #808088 for strict compliance." },
  { check: "Accent on dark bg", result: "PASS", detail: "#C8FF4B on #0D0D0E — ~12:1 (AAA)" },
  { check: "Accent text on accent bg", result: "PASS", detail: "#0D0D0E on #C8FF4B — ~12:1 (AAA)" },
  { check: "Error text", result: "PASS", detail: "#FF4040 on #0D0D0E — ~5.4:1 (AA)" },
  { check: "Focus ring", result: "PASS", detail: "#C8FF4B ring — 3px offset — visible on all surfaces" },
  { check: "Form labels", result: "PASS", detail: "<label htmlFor> linked to all inputs" },
  { check: "Form errors", result: "PASS", detail: "role=alert, aria-invalid, aria-describedby on each field" },
  { check: "Icon buttons", result: "PASS", detail: "All have aria-label (e.g. 'Scroll to work section')" },
  { check: "Mobile menu", result: "PASS", detail: "aria-expanded, aria-controls, tabIndex=-1 when closed" },
  { check: "Landmark roles", result: "PASS", detail: "<header role=banner>, <main>, <footer role=contentinfo>, <nav aria-label>" },
  { check: "List semantics", result: "PASS", detail: "Project list uses role=list/listitem; experience uses <ol>" },
  { check: "Image alt text", result: "PASS", detail: "Descriptive alt on all images; aria-hidden on decorative icons" },
  { check: "Reduced motion", result: "PASS", detail: "@media prefers-reduced-motion: all transitions → 0.01ms" },
];

const doNotList = [
  { rule: "No border-radius", detail: "--radius is 0 everywhere. No rounded buttons, cards, inputs, or images. If radius is added, the Swiss precision aesthetic breaks immediately." },
  { rule: "No box-shadow", detail: "Structure comes from color surfaces and hairline borders, never shadows or drop-shadows." },
  { rule: "No gradient backgrounds", detail: "Flat color only for surfaces. Gradients are only permitted on image overlays (from-black/70 to-transparent)." },
  { rule: "No blue / purple accents", detail: "The single accent is #C8FF4B. No additional hue may be introduced as an interactive color." },
  { rule: "No SaaS-grey cards", detail: "Do not add floating white/light-grey cards with shadow. All surfaces are either background or card (#141416)." },
  { rule: "No body text in Fraunces", detail: "Fraunces is display-only. Never use it for paragraphs, descriptions, or anything over ~4 lines." },
  { rule: "No Fraunces in buttons or labels", detail: "All buttons, nav links, tags, and labels use JetBrains Mono uppercase. Fraunces is reserved for headings and stats." },
  { rule: "No lorem ipsum", detail: "All content must be specific and real-sounding: real company names, real numbers, real technologies." },
  { rule: "No equal-column grids by default", detail: "Layouts should be asymmetric where possible (e.g. [1fr 360px] for about, [56px 1fr auto auto] for project rows)." },
  { rule: "No new font families", detail: "The three-font system (Fraunces · Figtree · JetBrains Mono) is closed. Do not add a fourth." },
  { rule: "No bright / saturated images", detail: "All images must have opacity-60 to opacity-75 applied. Never show images at full vibrancy." },
  { rule: "No uppercase Fraunces", detail: "Fraunces should be set normally (sentence case). The all-caps register belongs exclusively to JetBrains Mono." },
];

const contentPatterns = [
  { pattern: "Section counter label", format: "01 — Title", example: "01 — Projects" },
  { pattern: "Nav links", format: "Lowercase, no punctuation", example: "work · skills · about · contact" },
  { pattern: "Mono labels", format: "All-caps, em-spaced, no periods", example: "FULL-STACK ENGINEER · BELARUS" },
  { pattern: "Tech tags", format: "Title case exactly as ecosystem name", example: "TypeScript · Next.js · PostgreSQL" },
  { pattern: "Year labels", format: "4-digit year only", example: "2026" },
  { pattern: "Date ranges", format: "YYYY — YYYY or YYYY — now", example: "2021 — 2023 · 2023 — now" },
  { pattern: "Footer left", format: "© YYYY First Last", example: "© 2026 Eugene Zaiko" },
  { pattern: "Footer right", format: "City, Country", example: "Belarus" },
  { pattern: "Hero sub-label", format: "Role · City (dot separator)", example: "Full-Stack Engineer · Belarus" },
  { pattern: "Success message", format: "Action past tense + ✓ mark", example: "Message sent ✓" },
  { pattern: "Error message", format: "Field + short verb phrase, no exclamation", example: "Email is required · Invalid email address" },
  { pattern: "CTA button", format: "Verb + noun, no trailing punctuation", example: "View work · Send message · Hire me" },
];

const cssVariablesBlock = `:root {
  /* ── Surfaces ──────────────────────────────── */
  --background:         #0D0D0E;
  --foreground:         #F0EDE8;
  --card:               #141416;
  --card-foreground:    #F0EDE8;
  --popover:            #141416;
  --popover-foreground: #F0EDE8;

  /* ── Interactive ───────────────────────────── */
  --primary:            #F0EDE8;
  --primary-foreground: #0D0D0E;
  --secondary:          #1A1A1C;
  --secondary-foreground: #F0EDE8;
  --muted:              #1E1E21;
  --muted-foreground:   #6B6B75;  /* ⚠ AA large text only */
  --accent:             #C8FF4B;
  --accent-foreground:  #0D0D0E;
  --destructive:        #FF4040;
  --destructive-foreground: #FFFFFF;

  /* ── Structure ─────────────────────────────── */
  --border:             rgba(240, 237, 232, 0.10);
  --input:              transparent;
  --input-background:   #1A1A1C;
  --ring:               #C8FF4B;
  --radius:             0rem;        /* no border-radius anywhere */

  /* ── Typography ────────────────────────────── */
  /* Mapped in @theme inline as --font-heading, --font-sans, --font-mono */
}`;

const tailwindConfigBlock = `/* Tailwind v4 is CSS-first — no tailwind.config.ts needed.
   All design tokens live in src/styles/theme.css.
   The @theme inline block maps CSS vars → Tailwind utilities:

   bg-background     → var(--background)
   text-foreground   → var(--foreground)
   bg-card           → var(--card)
   bg-accent         → var(--accent)
   text-accent       → var(--accent)
   border-border     → var(--border)
   text-destructive  → var(--destructive)
   font-heading      → "Fraunces", Georgia, serif
   font-sans         → "Figtree", system-ui, sans-serif
   font-mono         → "JetBrains Mono", monospace
   rounded-*         → 0 (radius is 0)
   ring              → var(--ring) = #C8FF4B

   Equivalent Tailwind v3 theme extend (for reference):
   colors: { background, foreground, card, accent, border, destructive, ring, ... }
   fontFamily: { heading: ['Fraunces','Georgia','serif'], ... }
   borderRadius: { DEFAULT: '0', sm: '0', md: '0', lg: '0' }
*/`;

const frauncesFontBlock = `/* Google Fonts — Fraunces variable font
   URL: https://fonts.google.com/specimen/Fraunces

   Variable axes:
   wght  100–900   font weight
   opsz  9–144     optical size (affects letterform detail)
   SOFT  0–100     softness of curves (registered axis)
   WONK  0–1       wonkiness / asymmetry of 'S' (registered axis)

   Import (include italic for stat values):
   @import url('https://fonts.googleapis.com/css2?
     family=Fraunces:ital,opsz,wght@
       0,9..144,300;
       0,9..144,400;
       0,9..144,700;
       0,9..144,900;
       1,9..144,300;
       1,9..144,400
     &display=swap');

   Fallback stack:
   "Fraunces", Georgia, "Times New Roman", serif

   Recommended axis settings by use:
   Hero heading (large):  font-variation-settings: 'opsz' 144
   Section heading (mid): font-variation-settings: 'opsz' 72
   Italic stat values:    font-variation-settings: 'opsz' 9
   (smaller opsz → more expressive, quirky letterforms)
*/`;

// ─── Styleguide component ────────────────────────────────────────────────────

export default function StyleGuide() {
  const [inputState, setInputState] = useState<"default" | "focus" | "error" | "disabled">("default");
  const [hoveredProjectRow, setHoveredProjectRow] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md px-6 md:px-12 py-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            Design System
          </p>
          <p className="font-heading text-lg font-bold leading-tight mt-0.5">
            Eugene Zaiko Portfolio — v1.0
          </p>
        </div>
        <a
          href="/"
          className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Portfolio
        </a>
      </header>

      <div className="px-6 md:px-12 py-16 md:py-20 space-y-24 max-w-[1200px]">

        {/* ── 1. Design Tokens ─────────────────────────────────── */}
        <section aria-labelledby="s-tokens">
          <SectionHeading n="01 — Tokens" title="Design Tokens" />

          <SubHeading>Color palette</SubHeading>
          <div className="space-y-0 border border-border">
            {colorTokens.map((c) => (
              <div
                key={c.token}
                className="grid grid-cols-[48px_180px_1fr_auto] md:grid-cols-[48px_220px_1fr_240px] items-center border-b border-border last:border-0"
              >
                <div
                  className="h-full min-h-[52px] w-12 border-r border-border"
                  style={{ backgroundColor: c.value }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground px-4 py-3 border-r border-border">
                  {c.token}
                </span>
                <div className="px-4 py-3">
                  <p className="font-mono text-[11px] text-foreground">{c.value}</p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{c.role}</p>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground px-4 py-3 hidden md:block">{c.contrast}</p>
              </div>
            ))}
          </div>

          <SubHeading>globals.css (CSS variables — shadcn format)</SubHeading>
          <CodeBlock code={cssVariablesBlock} />

          <SubHeading>Tailwind v4 mapping / v3 config equivalent</SubHeading>
          <CodeBlock code={tailwindConfigBlock} />

          <SubHeading>Fraunces — variable font spec</SubHeading>
          <CodeBlock code={frauncesFontBlock} />
        </section>

        {/* ── 2. Typography Scale ──────────────────────────────── */}
        <section aria-labelledby="s-type">
          <SectionHeading n="02 — Typography" title="Type Scale" />

          {typeScale.map((t) => (
            <div key={t.name} className="border-b border-border py-8 grid md:grid-cols-[1fr_340px] gap-6 items-start">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">{t.name}</p>
                <p
                  className={t.class}
                  style={
                    t.name.includes("Hero") || t.name.includes("Section")
                      ? { fontSize: t.sizeMobile }
                      : undefined
                  }
                >
                  {t.name.includes("heading") || t.name.includes("title") || t.name.includes("Stat") || t.name.includes("Skill")
                    ? "The quick brown fox"
                    : t.name.includes("Mono")
                      ? "01 — SECTION LABEL"
                      : "The quick brown fox jumps over the lazy dog"}
                </p>
              </div>
              <div className="border border-border p-4">
                <SpecRow label="Font" value={t.font} />
                <SpecRow label="Weight" value={t.weight} />
                <SpecRow label="Mobile size" value={t.sizeMobile} />
                <SpecRow label="Desktop size" value={t.sizeDesktop} />
                <SpecRow label="Line height" value={t.lineHeight} />
                <SpecRow label="Letter spacing" value={t.letterSpacing} />
                <SpecRow label="Color" value={t.color} />
                {t.axes !== "—" && <SpecRow label="Axes" value={t.axes} />}
              </div>
            </div>
          ))}
        </section>

        {/* ── 3. Interactive States ────────────────────────────── */}
        <section aria-labelledby="s-states">
          <SectionHeading n="03 — States" title="Interactive States" />

          {/* Buttons */}
          <SubHeading>Button — Primary (accent)</SubHeading>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-accent-foreground px-6 py-3">
              Default
            </button>
            <button className="font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-accent-foreground px-6 py-3 opacity-90">
              Hover (opacity 90%)
            </button>
            <button className="font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-accent-foreground px-6 py-3 opacity-75">
              Active (opacity 75%)
            </button>
            <button className="font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-accent-foreground px-6 py-3 outline outline-2 outline-offset-2 outline-ring">
              Focus-visible
            </button>
            <button disabled className="font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-accent-foreground px-6 py-3 opacity-40 cursor-not-allowed">
              Disabled
            </button>
          </div>
          <div className="mt-4 border border-border p-4">
            <SpecRow label="Default" value="bg-accent text-accent-foreground" />
            <SpecRow label="Hover" value="opacity: 0.9 · transition: opacity 150ms ease-in-out" />
            <SpecRow label="Active" value="opacity: 0.75 · immediate" />
            <SpecRow label="Focus-visible" value="outline: 2px solid #C8FF4B · outline-offset: 2px" />
            <SpecRow label="Disabled" value="opacity: 0.4 · cursor: not-allowed · no pointer events" />
          </div>

          <SubHeading>Button — Secondary (outlined)</SubHeading>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="font-mono text-[11px] tracking-[0.18em] uppercase border border-foreground/30 px-6 py-3">
              Default
            </button>
            <button className="font-mono text-[11px] tracking-[0.18em] uppercase border border-foreground/30 px-6 py-3 bg-foreground text-background">
              Hover (inverted)
            </button>
            <button className="font-mono text-[11px] tracking-[0.18em] uppercase border border-foreground/30 px-6 py-3 bg-foreground text-background opacity-75">
              Active
            </button>
            <button className="font-mono text-[11px] tracking-[0.18em] uppercase border border-foreground/30 px-6 py-3 outline outline-2 outline-offset-2 outline-ring">
              Focus-visible
            </button>
            <button disabled className="font-mono text-[11px] tracking-[0.18em] uppercase border border-foreground/30 px-6 py-3 opacity-40 cursor-not-allowed">
              Disabled
            </button>
          </div>
          <div className="mt-4 border border-border p-4">
            <SpecRow label="Default" value="border: 1px solid rgba(240,237,232,0.30)" />
            <SpecRow label="Hover" value="bg-foreground text-background · transition: all 200ms ease-in-out" />
            <SpecRow label="Active" value="inverted + opacity 75%" />
            <SpecRow label="Focus-visible" value="outline: 2px solid #C8FF4B · outline-offset: 2px" />
            <SpecRow label="Disabled" value="opacity: 0.4 · cursor: not-allowed" />
          </div>

          {/* Links */}
          <SubHeading>Link states</SubHeading>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-8">
              <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest w-20">Default</span>
              <a href="#" className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground pointer-events-none">Nav link</a>
              <a href="#" className="text-lg pointer-events-none">Body link</a>
              <a href="#" className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground pointer-events-none">External <ArrowUpRight size={11} /></a>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest w-20">Hover</span>
              <a href="#" className="font-mono text-[11px] tracking-[0.15em] uppercase text-foreground pointer-events-none">Nav link</a>
              <a href="#" className="text-lg text-muted-foreground pointer-events-none">Body link</a>
              <a href="#" className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase text-foreground pointer-events-none">External <ArrowUpRight size={11} /></a>
            </div>
          </div>
          <div className="mt-4 border border-border p-4">
            <SpecRow label="Nav / mono link" value="Default: muted-foreground → Hover: foreground · 150ms ease-in-out" />
            <SpecRow label="Body link" value="Default: foreground → Hover: muted-foreground · 150ms ease-in-out" />
            <SpecRow label="↗ icon" value="opacity-0 on parent, opacity-100 on group-hover · 150ms" />
            <SpecRow label="Focus-visible" value="outline: 2px solid #C8FF4B · outline-offset: 2px" />
          </div>

          {/* Inputs */}
          <SubHeading>Input states</SubHeading>
          <div className="flex flex-wrap gap-2 mb-6">
            {(["default", "focus", "error", "disabled"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setInputState(s)}
                className={`font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors ${inputState === s
                  ? "border-foreground text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="max-w-sm space-y-1">
            <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
              Email address
            </label>
            <input
              type="email"
              defaultValue={inputState === "error" ? "not-an-email" : ""}
              disabled={inputState === "disabled"}
              placeholder={inputState === "focus" ? "" : "your@email.com"}
              autoFocus={inputState === "focus"}
              readOnly={inputState !== "default" && inputState !== "focus"}
              className={`w-full bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors duration-200 text-sm border ${inputState === "error"
                ? "border-destructive"
                : inputState === "focus"
                  ? "border-foreground/60"
                  : inputState === "disabled"
                    ? "border-border opacity-40 cursor-not-allowed"
                    : "border-border"
                }`}
            />
            {inputState === "error" && (
              <p className="flex items-center gap-1.5 font-mono text-[10px] text-destructive mt-2">
                <AlertCircle size={10} /> Invalid email address
              </p>
            )}
          </div>
          <div className="mt-4 border border-border p-4">
            <SpecRow label="Default" value="border: 1px solid rgba(240,237,232,0.10) · bg: transparent" />
            <SpecRow label="Hover" value="No visible change (border stays same)" />
            <SpecRow label="Focus" value="border-color: rgba(240,237,232,0.60) · transition: 200ms ease-in-out" />
            <SpecRow label="Error" value="border-color: #FF4040 · error message below: AlertCircle icon + mono text-destructive" />
            <SpecRow label="Disabled" value="opacity: 0.4 · cursor: not-allowed" />
            <SpecRow label="Placeholder" value="color: muted-foreground/40 — very faint, text-[11px] not-italic" />
          </div>

          {/* Focus ring */}
          <SubHeading>Focus ring spec</SubHeading>
          <div className="border border-border p-4">
            <SpecRow label="Property" value="outline (not box-shadow)" />
            <SpecRow label="Width" value="2px" />
            <SpecRow label="Color" value="#C8FF4B (var(--ring))" />
            <SpecRow label="Offset" value="2px" />
            <SpecRow label="Trigger" value="focus-visible only (not on click)" />
            <SpecRow label="Tailwind class" value="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
          </div>

          {/* ::selection */}
          <SubHeading>Text selection (::selection)</SubHeading>
          <p className="text-xl text-muted-foreground mb-3">
            Try selecting this text to see the selection style.
          </p>
          <div className="border border-border p-4">
            <SpecRow label="background-color" value="#C8FF4B (var(--accent))" />
            <SpecRow label="color" value="#0D0D0E (var(--accent-foreground))" />
          </div>

          {/* Project row states */}
          <SubHeading>Project row — hover state</SubHeading>
          <div className="border-t border-border">
            <div
              onMouseEnter={() => setHoveredProjectRow(true)}
              onMouseLeave={() => setHoveredProjectRow(false)}
              className={`border-b border-border py-7 grid grid-cols-[56px_1fr_auto_auto] gap-8 items-center cursor-pointer transition-all duration-200 ${hoveredProjectRow ? "pl-3" : ""
                }`}
            >
              <span className="font-mono text-[10px] text-muted-foreground tracking-[0.15em]">01</span>
              <div>
                <h3
                  className="font-heading text-4xl font-bold transition-colors duration-150"
                  style={{ color: hoveredProjectRow ? "#c8ff4b" : undefined }}
                >
                  Meridian
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Climate analytics platform</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "React", "D3.js"].map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-muted-foreground">2026</span>
                <ArrowUpRight
                  size={16}
                  className={`transition-colors duration-150 ${hoveredProjectRow ? "text-foreground" : "text-muted-foreground"}`}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 border border-border p-4">
            <SpecRow label="Default" value="pl-0 · title color: foreground · arrow: muted-foreground" />
            <SpecRow label="Hover" value="pl-3 (12px) · title color: #C8FF4B · arrow: foreground" />
            <SpecRow label="Transition" value="padding-left 200ms ease-in-out · color 150ms ease-in-out" />
          </div>

          {/* Card states */}
          <SubHeading>Project card — hover state</SubHeading>
          <div className="grid grid-cols-2 gap-4 max-w-xl">
            {[false, true].map((hovered) => (
              <div key={String(hovered)} className="relative aspect-video bg-card overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=375&fit=crop&auto=format"
                  alt="Project card example"
                  className={`w-full h-full object-cover transition-all duration-500 ${hovered ? "opacity-80 scale-[1.02]" : "opacity-60"
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/50 mb-1.5">Platform · 2026</p>
                  <h3 className="font-heading text-xl font-bold text-white">Meridian</h3>
                </div>
                {hovered && (
                  <div className="absolute top-3 right-3">
                    <ArrowUpRight size={18} className="text-white" />
                  </div>
                )}
                <p className="absolute bottom-1 right-2 font-mono text-[9px] text-white/40 uppercase tracking-widest">
                  {hovered ? "Hover" : "Default"}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 border border-border p-4">
            <SpecRow label="Default" value="opacity-60 on image · no scale" />
            <SpecRow label="Hover" value="opacity-80 · scale(1.02) · ↗ icon appears top-right" />
            <SpecRow label="Transition" value="all 500ms ease-in-out (scale + opacity together)" />
          </div>
        </section>

        {/* ── 4. Responsive Matrix ─────────────────────────────── */}
        <section aria-labelledby="s-responsive">
          <SectionHeading n="04 — Responsive" title="Breakpoint Matrix" />
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-6">
            Single breakpoint: 768px (md:) · Mobile-first
          </p>
          <div className="border border-border overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground text-left px-4 py-3 w-40">Component</th>
                  <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground text-left px-4 py-3">Mobile &lt;768px</th>
                  <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground text-left px-4 py-3">Desktop ≥768px</th>
                </tr>
              </thead>
              <tbody>
                {responsiveMatrix.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-card transition-colors">
                    <td className="font-mono text-[10px] text-accent px-4 py-3.5 align-top tracking-wide">{row.component}</td>
                    <td className="font-sans text-sm text-muted-foreground px-4 py-3.5 align-top">{row.mobile}</td>
                    <td className="font-sans text-sm text-muted-foreground px-4 py-3.5 align-top">{row.desktop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 5. Motion ────────────────────────────────────────── */}
        <section aria-labelledby="s-motion">
          <SectionHeading n="05 — Motion" title="Motion Spec" />
          <div className="border border-border overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Element", "Property", "Duration", "Easing", "Trigger"].map((h) => (
                    <th key={h} className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground text-left px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {motionTokens.map((m, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-card transition-colors">
                    <td className="font-mono text-[10px] text-foreground px-4 py-3 align-top tracking-wide">{m.element}</td>
                    <td className="font-mono text-[10px] text-muted-foreground px-4 py-3 align-top">{m.property}</td>
                    <td className="font-mono text-[10px] text-accent px-4 py-3 align-top">{m.duration}</td>
                    <td className="font-mono text-[10px] text-muted-foreground px-4 py-3 align-top">{m.easing}</td>
                    <td className="font-mono text-[10px] text-muted-foreground px-4 py-3 align-top">{m.trigger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SubHeading>Scroll behavior</SubHeading>
          <div className="border border-border p-4">
            <SpecRow label="scroll-mt-top" value="scroll-mt-20 (80px) on all section anchors — compensates for fixed nav height" />
            <SpecRow label="scroll-behavior" value="smooth (JS: scrollIntoView · overridden to auto when prefers-reduced-motion)" />
          </div>
          <SubHeading>prefers-reduced-motion</SubHeading>
          <CodeBlock code={`@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration:        0.01ms !important;
    animation-iteration-count: 1      !important;
    transition-duration:       0.01ms !important;
    scroll-behavior:           auto   !important;
  }
}`} />
        </section>

        {/* ── 6. Content Patterns ──────────────────────────────── */}
        <section aria-labelledby="s-content">
          <SectionHeading n="06 — Content" title="Content Patterns" />
          <div className="border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground text-left px-4 py-3 w-48">Pattern</th>
                  <th className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground text-left px-4 py-3 w-64">Format</th>
                  <th className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground text-left px-4 py-3">Example</th>
                </tr>
              </thead>
              <tbody>
                {contentPatterns.map((p, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-card transition-colors">
                    <td className="font-mono text-[10px] text-accent px-4 py-3.5 tracking-wide">{p.pattern}</td>
                    <td className="font-sans text-sm text-muted-foreground px-4 py-3.5">{p.format}</td>
                    <td className="font-mono text-[11px] text-foreground px-4 py-3.5">{p.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 7. Assets ────────────────────────────────────────── */}
        <section aria-labelledby="s-assets">
          <SectionHeading n="07 — Assets" title="Assets" />

          <SubHeading>Icon library</SubHeading>
          <div className="border border-border p-4 space-y-2">
            <SpecRow label="Library" value="lucide-react — import specific icons only" />
            <SpecRow label="Default size" value="16px (size={16}) for inline / 20px for standalone" />
            <SpecRow label="strokeWidth" value="1.5 (Lucide default) · 2.0 for small sizes (12px)" />
            <SpecRow label="strokeWidth nav" value="2.5 for ArrowUpRight in CTA button" />
            <SpecRow label="Color" value="Inherits currentColor — set via text-* class on parent or icon" />
            <SpecRow label="aria-hidden" value="true on all decorative icons · false only if icon is the sole label" />
          </div>
          <div className="flex items-center gap-6 mt-5 flex-wrap">
            {[
              { name: "ArrowUpRight", Icon: ArrowUpRight },
              { name: "Check", Icon: Check },
              { name: "AlertCircle", Icon: AlertCircle },
              { name: "ExternalLink", Icon: ExternalLink },
            ].map(({ name, Icon }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Icon size={16} aria-hidden="true" />
                </div>
                <p className="font-mono text-[9px] text-muted-foreground tracking-wide">{name}</p>
              </div>
            ))}
          </div>

          <SubHeading>Images</SubHeading>
          <div className="border border-border p-4 space-y-2">
            <SpecRow label="Source" value="Unsplash — https://images.unsplash.com/photo-{id}?w={w}&h={h}&fit=crop&auto=format" />
            <SpecRow label="object-fit" value="object-cover on all images (never object-contain)" />
            <SpecRow label="Default opacity" value="opacity-60 for project cards · opacity-75 for portrait" />
            <SpecRow label="Hover opacity" value="opacity-80 for project cards · opacity-90 for portrait" />
            <SpecRow label="Fallback" value="bg-card on image container — layout stable while image loads" />
            <SpecRow label="Alt text" value="Required on all images — descriptive, not filename-based" />
          </div>

          <SubHeading>Favicon / OG image</SubHeading>
          <div className="border border-border p-4 space-y-2">
            <SpecRow label="Favicon" value="Dark background #0D0D0E · ZE monogram in Fraunces · accent mark #C8FF4B · 32×32px" />
            <SpecRow label="OG image" value="1200×630px · dark bg · Fraunces hero name · role label in mono · bottom-left bio · accent color bar" />
            <SpecRow label="Twitter card" value="summary_large_image · same as OG" />
          </div>
        </section>

        {/* ── 8. Accessibility ─────────────────────────────────── */}
        <section aria-labelledby="s-a11y">
          <SectionHeading n="08 — Accessibility" title="Accessibility" />

          <SubHeading>Contrast audit</SubHeading>
          <div className="border border-border overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Check", "Result", "Detail"].map((h) => (
                    <th key={h} className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground text-left px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {accessibilityNotes.map((n, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-card transition-colors">
                    <td className="font-mono text-[10px] text-foreground px-4 py-3.5 align-top tracking-wide">{n.check}</td>
                    <td className="px-4 py-3.5 align-top">
                      <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-1 ${n.result === "PASS" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                        }`}>
                        {n.result}
                      </span>
                    </td>
                    <td className="font-sans text-sm text-muted-foreground px-4 py-3.5 align-top">{n.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubHeading>Semantic structure & focus order</SubHeading>
          <div className="border border-border p-4 space-y-2">
            <SpecRow label="Document outline" value="<header> → <main> → <footer> — one of each per page" />
            <SpecRow label="Heading order" value="<h1> name in hero → <h2> section headings → no skipping levels" />
            <SpecRow label="Focus order" value="Logo · Nav links · Hire me · (main content) · Footer links — left-to-right, top-to-bottom" />
            <SpecRow label="Skip link" value="Recommended: #main-content skip link as first focusable element (not yet implemented)" />
            <SpecRow label="Mobile menu" value="tabIndex=-1 on all links when menu closed · tabIndex=0 when open · aria-expanded on trigger" />
          </div>
        </section>

        {/* ── 9. Do-Not List ───────────────────────────────────── */}
        <section aria-labelledby="s-donot">
          <SectionHeading n="09 — Rules" title="Do-Not List" />
          <div className="border border-border">
            {doNotList.map((item, i) => (
              <div key={i} className="grid md:grid-cols-[260px_1fr] border-b border-border last:border-0 hover:bg-card transition-colors">
                <div className="px-4 py-4 border-b md:border-b-0 md:border-r border-border">
                  <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-destructive">{item.rule}</p>
                </div>
                <p className="font-sans text-sm text-muted-foreground px-4 py-4 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. Spacing & Grid ───────────────────────────────── */}
        <section aria-labelledby="s-grid">
          <SectionHeading n="10 — Grid" title="Spacing & Grid" />

          <SubHeading>Key spacing values (4px base grid)</SubHeading>
          <div className="space-y-2">
            {[
              { label: "4px  (1)", tw: "p-1", use: "Icon padding, inner gap minimum" },
              { label: "8px  (2)", tw: "gap-2", use: "Tech tags gap, icon-text gap" },
              { label: "12px (3)", tw: "px-3", use: "Project row hover indent" },
              { label: "16px (4)", tw: "p-4", use: "Card padding, button vertical padding" },
              { label: "20px (5)", tw: "p-5", use: "Skill cell padding (mobile)" },
              { label: "24px (6)", tw: "px-6", use: "Page horizontal padding (mobile)" },
              { label: "32px (8)", tw: "gap-8", use: "Stat row gap, hero grid gap" },
              { label: "48px (12)", tw: "px-12", use: "Page horizontal padding (desktop)" },
              { label: "56px (14)", tw: "w-14", use: "Project row number column width (desktop)" },
              { label: "80px (20)", tw: "py-20", use: "Section vertical padding (mobile)" },
              { label: "112px (28)", tw: "py-28", use: "Section vertical padding (desktop)" },
            ].map(({ label, tw, use }) => (
              <div key={label} className="grid grid-cols-[96px_80px_1fr] items-center gap-4 py-2 border-b border-border last:border-0">
                <span className="font-mono text-[10px] text-foreground tracking-wide">{label}</span>
                <span className="font-mono text-[10px] text-accent tracking-wide">{tw}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{use}</span>
              </div>
            ))}
          </div>

          <SubHeading>Layout grids</SubHeading>
          <div className="border border-border p-4 space-y-2">
            <SpecRow label="Hero" value="grid-cols-1 (mobile) · grid-cols-2 (desktop) — asymmetric [1fr 1fr]" />
            <SpecRow label="Project row" value="grid-cols-[40px_1fr_auto] (mobile) · grid-cols-[56px_1fr_auto_auto] (desktop)" />
            <SpecRow label="Image cards" value="grid-cols-1 (mobile) · grid-cols-2 (desktop)" />
            <SpecRow label="Skills" value="grid-cols-2 (mobile) · grid-cols-3 (desktop)" />
            <SpecRow label="About" value="grid-cols-1 (mobile) · grid-cols-[1fr_360px] (desktop)" />
            <SpecRow label="Experience" value="single col (mobile) · grid-cols-[180px_1fr] (desktop)" />
            <SpecRow label="Contact" value="grid-cols-1 (mobile) · grid-cols-2 (desktop)" />
            <SpecRow label="Collapsed border trick" value="-mt-px -ml-px on grid cells to merge borders without doubling: used in Skills" />
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-12 py-7 flex items-center justify-between mt-12">
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
          Design System — Eugene Zaiko Portfolio
        </p>
        <a
          href="/"
          className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          ← Back to site
        </a>
      </footer>
    </div>
  );
}
