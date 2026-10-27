import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import {
  caseStudies,
  getCaseStudy,
  AUTHOR,
} from "@/lib/casestudies";

const SITE_URL = "https://safesync.dev";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};

  return {
    metadataBase: new URL(SITE_URL),
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    alternates: {
      canonical: `${SITE_URL}/work/${c.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/work/${c.slug}`,
      title: c.title,
      description: c.description,
      siteName: "Eugene Zaiko",
      locale: "en_US",
      publishedTime: "2026-10-27",
      authors: AUTHOR.name,
      images: [{ url: c.image, alt: c.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
    },
  };
}

function CaseJsonLd({ slug }: { slug: string }) {
  const c = getCaseStudy(slug);
  if (!c) return null;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: `${c.name} — ${c.tagline}`,
        headline: c.title,
        abstract: c.summary,
        image: `${SITE_URL}${c.image}`,
        url: `${SITE_URL}/work/${c.slug}`,
        datePublished: "2026-10-27",
        inLanguage: "en",
        keywords: c.stack.join(", "),
        author: {
          "@type": "Person",
          name: AUTHOR.name,
          jobTitle: AUTHOR.jobTitle,
          url: AUTHOR.url,
        },
        creator: { "@type": "Person", name: AUTHOR.name },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: `${SITE_URL}/#work`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: c.name,
            item: `${SITE_URL}/work/${c.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

function AuthorBox() {
  return (
    <div className="border border-border bg-card p-6 md:p-8">
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
        Written by
      </p>
      <p className="font-heading text-2xl font-bold mb-3">{AUTHOR.name}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {AUTHOR.description} Need this kind of architecture for a production
        system? Reach out directly.
      </p>
      <div className="flex gap-4 flex-wrap">
        <a
          href={AUTHOR.email}
          className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase bg-accent text-accent-foreground px-4 py-2 hover:opacity-90 transition-opacity"
        >
          <Mail size={12} strokeWidth={2.5} /> Email
        </a>
        <a
          href="https://t.me/rahunak"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase border border-foreground/30 px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          <Send size={12} /> Telegram
        </a>
      </div>
    </div>
  );
}

export default async function CasePage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const others = caseStudies.filter((x) => x.slug !== c.slug);

  return (
    <>
      <CaseJsonLd slug={c.slug} />

      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <header
          role="banner"
          className="border-b border-border px-6 md:px-12 py-5 flex items-center justify-between"
        >
          <Link
            href="/"
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Eugene Zaiko
          </Link>
          <nav aria-label="Case study navigation" className="flex items-center gap-6">
            <Link
              href="/#work"
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              All work
            </Link>
            <a
              href="mailto:zaiko.eugene@gmail.com"
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase bg-accent text-accent-foreground px-4 py-2 hover:opacity-90 transition-opacity"
            >
              Contact <ArrowUpRight size={12} strokeWidth={2.5} />
            </a>
          </nav>
        </header>

        <main id="main-content" className="max-w-3xl mx-auto px-6 py-14 md:py-20">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Case study — {c.year} — {c.company}
          </p>

          <h1 className="font-heading font-bold leading-[0.95] tracking-tight mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            {c.name}: {c.tagline}
          </h1>

          <p className="text-lg leading-relaxed text-muted-foreground mb-10">
            {c.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-10" aria-label="Technologies">
            {c.stack.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-1 tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>

          <img
            src={c.image}
            alt={c.imageAlt}
            className="w-full aspect-video object-cover border border-border mb-14"
          />

          <section aria-labelledby="problem">
            <h2
              id="problem"
              className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              The problem
            </h2>
            <div className="space-y-5 mb-14">
              {c.problem.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </section>

          <section aria-labelledby="approach">
            <h2
              id="approach"
              className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              The approach
            </h2>
            <div className="border-t border-border mb-14">
              {c.approach.map((step) => (
                <div key={step.heading} className="grid md:grid-cols-[240px_1fr] gap-4 py-7 border-b border-border">
                  <h3 className="font-heading text-lg md:text-xl font-medium leading-snug">
                    {step.heading}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="results">
            <h2
              id="results"
              className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Results
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 border border-border mb-14">
              {c.outcomes.map((s) => (
                <div key={s.label} className="p-6 border-b md:border-b-0 md:border-r border-border last:border-r-0">
                  <p className="font-heading text-3xl md:text-4xl font-bold mb-2">{s.value}</p>
                  <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground leading-relaxed">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="other-work">
            <h2
              id="other-work"
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6"
            >
              Other case studies
            </h2>
            <ul className="border-t border-border mb-14">
              {others.map((x) => (
                <li key={x.slug} className="border-b border-border">
                  <Link
                    href={`/work/${x.slug}`}
                    className="group flex items-baseline justify-between py-5 hover:pl-2 transition-all duration-200"
                  >
                    <span>
                      <span className="font-heading text-xl md:text-2xl font-bold group-hover:text-accent transition-colors">
                        {x.name}
                      </span>
                      <span className="block text-sm text-muted-foreground mt-1">{x.tagline}</span>
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-2">
                      {x.year} <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-sm text-muted-foreground mb-3">
            {"My role on "}
            <span className="text-foreground">{c.company}</span>
            {": "}
            {c.role}.
          </p>

          <AuthorBox />
        </main>

        <footer role="contentinfo" className="border-t border-border px-6 md:px-12 py-7 flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
            © 2026 Eugene Zaiko
          </p>
          <Link
            href="/#contact"
            className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </footer>
      </div>
    </>
  );
}