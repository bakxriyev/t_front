import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { VisitTracker } from "@/components/VisitTracker";
import { COURSES, FAQS } from "@/lib/constants";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tashkentlawschool.uz";

export const metadata: Metadata = {
  title: {
    default: "Tashkent Law School — Yurisprudensiya, Huquq Kurslari va Yuridik Taʼlim Markazi",
    template: "%s | Tashkent Law School",
  },
  description:
    "Tashkent Law School – Oʻzbekistonda huquqiy taʼlim boʻyicha yetakchi oʻquv markazi. Yuridik universitetga tayyorlov, huquq kurslari, yurisprudensiya va boʻlajak yuristlar tayyorlash. Toshkent, Oʻzbekiston.",
  keywords: [
    "Yurisprudensiya",
    "Huquq kurslari",
    "Uquv markaz",
    "Huquqiy o'quv markaz",
    "Yuridik o'quv markaz",
    "Yuridik tayyorlov",
    "Yuridik Litsey",
    "Yuridik Universitetiga tayyorlov",
    "Tashkent Law School",
    "Tashkent Law School Huquq kurslari",
    "Huquqshunoslik",
    "Bo'lajak Yuristlar tanlovi",
    "Toshkent",
    "O'zbekiston",
    "law school Uzbekistan",
    "legal education Tashkent",
    "юридическое образование Ташкент",
    "юридические курсы Узбекистан",
  ],
  authors: [{ name: "Tashkent Law School" }],
  creator: "Tashkent Law School",
  publisher: "Tashkent Law School",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    siteName: "Tashkent Law School",
    title: "Tashkent Law School — Huquqiy Taʼlim Markazi | Huquq Kurslari va Yuridik Tayyorlov",
    description:
      "Tashkent Law School – Oʻzbekistonda huquqiy taʼlim boʻyicha yetakchi markaz. Yuridik universitetga tayyorlov, huquq kurslari va yurisprudensiya boʻyicha professional taʼlim.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/images/logo.png`,
        width: 512,
        height: 512,
        alt: "Tashkent Law School — Huquqiy Taʼlim Markazi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tashkent Law School — Huquq Kurslari va Yuridik Taʼlim",
    description:
      "Professional huquqiy taʼlim markazi. Yuridik universitetga tayyorlov, huquqshunoslik kurslari.",
    images: [`${siteUrl}/images/logo.png`],
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
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  appleWebApp: {
    title: "Tashkent Law School",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  category: "education",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "Tashkent Law School",
      alternateName: "TLS — Huquqiy Taʼlim Markazi",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      image: `${siteUrl}/images/logo.png`,
      description:
        "Oʻzbekistonda huquqiy taʼlim boʻyicha yetakchi oʻquv markazi. Yuridik universitetga tayyorlov, huquq kurslari va yurisprudensiya boʻyicha professional taʼlim.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        ratingCount: "127",
        reviewCount: "127",
      },
      founder: {
        "@type": "Person",
        name: "Tashkent Law School",
      },
      foundingDate: "2013",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tashkent",
        addressCountry: "UZ",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+998712345678",
        contactType: "admissions",
        email: "info@tashkentlawschool.uz",
        availableLanguage: ["Uzbek", "Russian", "English"],
      },
      sameAs: [
        "https://t.me/tashkentlawschool",
        "https://instagram.com/tashkentlawschool",
        "https://facebook.com/tashkentlawschool",
        "https://youtube.com/@tashkentlawschool",
        "https://linkedin.com/company/tashkentlawschool",
      ],
      areaServed: "Uzbekistan",
      teaches: [
        "Yurisprudensiya",
        "Huquqshunoslik",
        "Fuqarolik huquqi",
        "Jinoyat huquqi",
        "Xalqaro huquq",
        "Korporativ huquq",
      ],
      offers: [
        {
          "@type": "Offer",
          name: "Yuridik Universitetiga Tayyorlov",
          description: "Oliy taʼlim muassasalariga kirish uchun huquqiy fanlardan tayyorlov kurslari",
          category: "Tayyorlov kurslari",
        },
        {
          "@type": "Offer",
          name: "Huquq Kurslari",
          description: "Turli yoʻnalishlardagi huquqiy kurslar: fuqarolik, jinoyat, xalqaro va korporativ huquq",
          category: "Professional kurslar",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Tashkent Law School",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Kurslar", item: `${siteUrl}/#courses` },
        { "@type": "ListItem", position: 3, name: "O'qituvchilar", item: `${siteUrl}/#teachers` },
        { "@type": "ListItem", position: 4, name: "Aloqa", item: `${siteUrl}/#contact` },
      ],
    },
    ...COURSES.map((course) => ({
      "@type": "Course",
      "@id": `${siteUrl}/#course-${course.id}`,
      name: course.title,
      description: course.desc,
      provider: {
        "@type": "EducationalOrganization",
        "@id": `${siteUrl}/#organization`,
        name: "Tashkent Law School",
        sameAs: siteUrl,
      },
      educationalLevel: course.level,
      timeRequired: course.duration,
      offers: {
        "@type": "Offer",
        price: course.price.replace(/[^0-9]/g, ""),
        priceCurrency: "UZS",
        category: "Paid",
        availability: "https://schema.org/InStock",
      },
      inLanguage: ["uz", "ru", "en"],
    })),
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q_uz,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a_uz,
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="fIR_FiTUufvwhiP5dv16P4J0sHzKZCa4LG0nNq21eQk" />
        <meta name="yandex-verification" content="REPLACE_WITH_YOUR_YANDEX_CODE" />
        <meta name="geo.region" content="UZ" />
        <meta name="geo.placename" content="Tashkent" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="alternate" hrefLang="uz" href={siteUrl} />
        <link rel="alternate" hrefLang="ru" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <VisitTracker />
          <VideoBackground />
          <main className="relative z-10 min-h-screen">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
