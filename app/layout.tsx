import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { site } from "@/site.config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Analytics from "@/components/Analytics";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.brand} | ${site.tagline}`,
    template: `%s | ${site.brand}`,
  },
  description: site.shortDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.brand,
    title: `${site.brand} | ${site.tagline}`,
    description: site.shortDescription,
    url: site.domain,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: site.brand }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2f4858",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.lang} dir={site.dir} className={heebo.variable}>
      <body>
        <Analytics />
        <a className="skip-link" href="#main">
          דלג לתוכן הראשי
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
