import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { posts, getPost, type Block } from "@/lib/posts";
import { AUTHOR } from "@/lib/casestudies";
import { caseStudies } from "@/lib/casestudies";

const SITE_URL = "https://safesync.dev";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};

  return {
    metadataBase: new URL(SITE_URL),
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    alternates: {
      canonical: `${SITE_URL}/blog/${p.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${p.slug}`,
      title: p.title,
      description: p.description,
      siteName: "Eugene Zaiko",
      locale: "en_US",
      publishedTime: p.datePublished,
      modifiedTime: p.dateModified,
      authors: AUTHOR.name,
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
    },
  };
}

function PostJsonLd({ slug }: { slug: string }) {
  const p = getPost(slug);
  if (!p) return null;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: p.title,
        description: p.description,
        datePublished: p.datePublished,
        dateModified: p.dateModified,
        inLanguage: "en",
        keywords: p.keywords.join(", "),
        author: {
          "@type": "Person",
          name: AUTHOR.name,
          jobTitle: AUTHOR.jobTitle,
          url: AUTHOR.url,
          sameAs: AUTHOR.sameAs,
        },
        publisher: {
          "@type": "Person",
          name: AUTHOR.name,
          url: AUTHOR.url,
        },
        mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Writing",
            item: `${SITE_URL}/#writing`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: p.title,
            item: `${SITE_URL}/blog/${p.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: p.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
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

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-5">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-heading text-xl font-medium mt-8 mb-3">{block.text}</h3>
      );
    case "list":
      return (
        <ul className="list-disc pl-6 space-y-3 my-5 text-base leading-relaxed text-muted-foreground marker:text-accent">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="bg-card border border-border overflow-x-auto p-5 my-6 text-[13px] leading-relaxed font-mono">
          <code>{block.code}</code>
        </pre>
      );
    case "p":
      return (
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground my-5">
          {block.text}
        </p>
      );
  }
}

function AuthorBox() {
  return (
    <div className="border border-border bg-card p-6 md:p-8 mt-14">
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
        Written by
      </p>
      <p className="font-heading text-2xl font-bold mb-3">{AUTHOR.name}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {AUTHOR.description} I help teams design queue layers and event-driven
        backends that hold up in production.
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

export default async function BlogPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  return (
    <>
      <PostJsonLd slug={p.slug} />

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
          <nav aria-label="Blog navigation" className="flex items-center gap-6">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Portfolio
            </Link>
            <a
              href="mailto:zaiko.eugene@gmail.com"
              className="hidden md:flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase bg-accent text-accent-foreground px-4 py-2 hover:opacity-90 transition-opacity"
            >
              Contact <ArrowUpRight size={12} strokeWidth={2.5} />
            </a>
          </nav>
        </header>

        <main id="main-content" className="max-w-2xl mx-auto px-6 py-14 md:py-20">
          <article>
            <nav
              aria-label="Breadcrumb"
              className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-6"
            >
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span aria-hidden="true"> / </span>
              <Link href="/#writing" className="hover:text-foreground transition-colors">Writing</Link>
              <span aria-hidden="true"> / </span>
              <span className="text-foreground" aria-current="page">{p.label}</span>
            </nav>

            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Engineering notes — {p.dateModified}
            </p>

            <h1
              className="font-heading font-bold leading-[1.02] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.5rem)" }}
            >
              {p.title}
            </h1>

            <p className="text-lg leading-relaxed text-foreground/90 border-l-2 border-accent pl-5 my-8">
              {p.lead}
            </p>

            {p.blocks.map((b, i) => (
              <BlockRenderer key={i} block={b} />
            ))}

            <section aria-labelledby="faq">
              <h2
                id="faq"
                className="font-heading text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-5"
              >
                FAQ
              </h2>
              <div className="border-t border-border">
                {p.faq.map((f) => (
                  <div key={f.question} className="border-b border-border py-5">
                    <h3 className="font-heading text-lg md:text-xl font-medium mb-2">
                      {f.question}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {f.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <section aria-labelledby="related-work" className="mt-14">
            <h2
              id="related-work"
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6"
            >
              Related case studies
            </h2>
            <ul className="border-t border-border mb-8">
              {caseStudies.slice(0, 2).map((c) => (
                <li key={c.slug} className="border-b border-border">
                  <Link
                    href={`/work/${c.slug}`}
                    className="group flex items-baseline justify-between py-5 hover:pl-2 transition-all duration-200"
                  >
                    <span>
                      <span className="font-heading text-xl font-bold group-hover:text-accent transition-colors">
                        {c.name}
                      </span>
                      <span className="block text-sm text-muted-foreground mt-1">
                        {c.tagline}
                      </span>
                    </span>
                    <ArrowUpRight size={14} className="text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

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
