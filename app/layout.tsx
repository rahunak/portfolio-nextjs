import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import ContactWidget from "@/components/ContactWidget";
import CVDownload from "@/components/CVDownload";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zaiko Eugenii Portfolio",
  description: "Full-Stack Developer Portfolio - JavaScript, React, Node.js",
  openGraph: {
    title: "Zaiko Eugenii Full-stack Developer",
    type: "website",
    url: "https://zaiko-eugene-portfolio.vercel.app",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/31304532?v=4",
        width: 300,
        height: 300,
      },
    ],
    description: "This is my portfolio website, which showcases my skills as a web developer.",
    siteName: "Zaiko Evgeny's Portfolio Website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider>
          <Navbar />
          {children}
          <ContactWidget />
          <CVDownload />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

