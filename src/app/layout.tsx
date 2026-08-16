import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eugene Zaiko — Full-Stack Engineer",
  description: "Full-stack engineer specializing in Node.js, TypeScript, React, and Next.js. Building fast, scalable systems with focus on performance and AI integration.",
  keywords: ["Full-Stack Engineer", "Software Engineer", "Node.js", "TypeScript", "React", "Next.js", "PHP", "Symfony", "PostgreSQL", "Redis", "AWS"],
  authors: [{ name: "Eugene Zaiko" }],
  creator: "Eugene Zaiko",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eugeneazaiko.dev",
    title: "Eugene Zaiko — Full-Stack Engineer",
    description: "Full-stack engineer specializing in Node.js, TypeScript, React, and Next.js. Building fast, scalable systems.",
    siteName: "Eugene Zaiko Portfolio",
    images: [
      {
        url: "/avatar.webp",
        width: 1200,
        height: 630,
        alt: "Eugene Zaiko",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eugene Zaiko — Full-Stack Engineer",
    description: "Full-stack engineer specializing in Node.js, TypeScript, React, and Next.js.",
    images: ["/avatar.webp"],
  },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
