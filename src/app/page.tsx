import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";

const SITE_URL = "https://safesync.dev";
const NAME = "Eugene Zaiko";
const ROLE = "Senior Full-Stack Engineer";
const DESCRIPTION =
  "Senior Full-Stack Engineer specializing in Node.js, NestJS, React, and Next.js. 5+ years building high-performance systems: event-driven architectures, PostgreSQL optimization (109M+ rows), and production AI applications. Expert in TypeScript, microservices, and scalable backend systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} — ${ROLE} | Node.js, React, PostgreSQL Expert`,
    template: `%s | ${NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Senior Full-Stack Engineer",
    "Node.js Developer",
    "NestJS Expert",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "PostgreSQL Optimization",
    "High-Performance Systems",
    "Microservices Architecture",
    "Event-Driven Architecture",
    "BullMQ",
    "RabbitMQ",
    "Backend Engineer",
    "Full-Stack JavaScript",
    "API Development",
    "Scalable Systems",
    "PHP Symfony",
  ],
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/llms+txt": `${SITE_URL}/llms.txt`,
    },
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: NAME,
    title: `${NAME} — ${ROLE}`,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${NAME} — Senior Full-Stack Engineer specializing in Node.js, React, and PostgreSQL`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${ROLE}`,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: NAME,
            url: SITE_URL,
            jobTitle: ROLE,
            description: DESCRIPTION,
            worksFor: [
              {
                "@type": "Organization",
                name: "PixelPlex",
                description: "AI Media Platform Development",
              },
              {
                "@type": "Organization",
                name: "Syberry",
                description: "PostgreSQL Optimization & Legacy System Modernization",
              },
              {
                "@type": "Organization",
                name: "Linnovate",
                description: "Multi-tenant Infrastructure Management",
              },
            ],
            knowsAbout: [
              "Node.js",
              "NestJS",
              "React",
              "Next.js",
              "TypeScript",
              "PostgreSQL",
              "Event-Driven Architecture",
              "Microservices",
              "BullMQ",
              "RabbitMQ",
              "PHP",
              "Symfony",
              "Docker",
              "AWS",
              "Redis",
              "WebSockets",
              "REST APIs",
              "GraphQL",
            ],
            sameAs: [
              "https://github.com/rahunak",
              "https://www.linkedin.com/in/eugene-zaiko",
              "https://t.me/rahunak",
            ],
            email: "mailto:zaiko.eugene@gmail.com",
            telephone: "+375257810998",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Minsk",
              addressCountry: "BY",
            },
          }),
        }}
      />
      <Portfolio />
    </>
  );
}
