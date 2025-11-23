import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://digital-history.example.com"),
  title: {
    default: "Global Digital History Case Library",
    template: "%s · Global Digital History Case Library",
  },
  description:
    "A modernised interface for the Global Digital History Case Library with research tools, datasets, and search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body
        className="bg-background text-foreground font-sans antialiased"
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
