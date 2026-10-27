import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PhoneClickTracker from "@/components/PhoneClickTracker";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}

        {/* GA4 — отложенная загрузка. TODO: вписать ID в components/GoogleAnalytics.tsx */}
        {isProduction && <GoogleAnalytics enabled={isProduction} />}

        {/* Глобальный трекер кликов по телефонным ссылкам → GA4 tel_click */}
        {isProduction && <PhoneClickTracker />}
      </body>
    </html>
  );
}
