import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { getInitialData } from "@/lib/server-data";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, KEYWORDS, SITE_NAME, SITE_URL, fetchCourses, jsonLdHtml, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

// Body / UI text
const sans = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

// Headlines, numbers and labels — heavy grotesque, as in the official brochure
const display = Inter_Tight({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0809",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Tashkent Law School",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["ru_RU", "en_US"],
    siteName: SITE_NAME,
    title: "Tashkent Law School — huquq va ingliz tili kurslari, TDYU ga tayyorlov",
    description: "Huquq, ingliz tili, tarix, ona tili, turk tili va matematika kurslari. TDYU, HMQA va JIDU ga tayyorlov. Chilonzor, Yunusobod, Urganch.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/images/hero-poster.jpg`, width: 1600, height: 900, alt: "Tashkent Law School — huquqiy o‘quv markazi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tashkent Law School — huquq va ingliz tili kurslari",
    description: "TDYU, HMQA, JIDU ga tayyorlov. Huquq, ingliz tili, tarix, matematika kurslari Toshkentda.",
    images: [`${SITE_URL}/images/hero-poster.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  appleWebApp: { title: SITE_NAME, capable: true, statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
  category: "education",
  other: { "geo.region": "UZ-TK", "geo.placename": "Tashkent", "geo.position": "41.311081;69.240562", ICBM: "41.311081, 69.240562" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [initialData, courses] = await Promise.all([getInitialData(), fetchCourses()]);
  return (
    <html lang="uz" suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <head>
        <meta name="google-site-verification" content="fIR_FiTUufvwhiP5dv16P4J0sHzKZCa4LG0nNq21eQk" />
        <link rel="preload" as="image" href="/images/hero-poster.jpg" fetchPriority="high" />
        <link rel="preconnect" href={(process.env.NEXT_PUBLIC_API_URL || "https://b.tashkentlawschool.uz").replace(/\/$/, "")} crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(organizationJsonLd(courses))} />
      </head>
      <body>
        <SiteShell initialData={initialData}>{children}</SiteShell>
      </body>
    </html>
  );
}
