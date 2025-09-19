import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/custom/Navbar";

// ===== JSON-LD Structured Data =====
const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Frea Image Compressor",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  description:
    "Free online tool to compress and reduce image size without losing quality.",
  url: "https://freaimagecompressor.vercel.app",
  author: {
    "@type": "Organization",
    name: "Frea Tools",
    url: "https://freaimagecompressor.vercel.app",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free online tool",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "1842",
    bestRating: "5",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Frea Tools",
  url: "https://freaimagecompressor.vercel.app",
  logo: "https://freaimagecompressor.vercel.app/logo.png",
  sameAs: [
    "https://twitter.com/freatools",
    "https://www.linkedin.com/company/freatools",
  ],
};

// ===== Metadata =====
export const metadata = {
  title: {
    default: "Frea Image Compressor | Free Online Image Compression Tool",
    template: "%s | Frea Image Compressor",
  },
  description:
    "Compress images online with Frea Image Compressor. Reduce image size without losing quality. Free and fast image compression tool.",
  keywords: [
    "Free image compressor",
    "Image compressor to 20KB",
    "Compress image to 50KB",
    "Compress image to 200KB",
    "Image resizer",
    "Compress image to 100KB",
    "Free image compressor online",
    "frea image compressor",
    "Free image compressor online jpg",
    "Free image compressor online jpg i love pdf",
    "Compress JPEG to 50KB",
    "JPG compress",
    "JPG compress 11zon",
  ],
  authors: [
    { name: "Frea Tools", url: "https://freaimagecompressor.vercel.app" },
  ],
  creator: "Frea Tools",
  publisher: "Frea Tools",
  category: "Utilities",
  metadataBase: new URL("https://freaimagecompressor.vercel.app"),
  alternates: {
    canonical: "https://freaimagecompressor.vercel.app",
    languages: {
      "en-US": "https://freaimagecompressor.vercel.app",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Frea Image Compressor - Free Online Tool",
    description:
      "Reduce image size without losing quality. Fast, free, and secure online image compression tool.",
    url: "https://freaimagecompressor.vercel.app",
    siteName: "Frea Image Compressor",
    images: [
      {
        url: "https://freaimagecompressor.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Frea Image Compressor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@freatools",
    creator: "@freatools",
    title: "Frea Image Compressor",
    description:
      "Compress images online with Frea Image Compressor. Free, fast, and high quality.",
    images: ["https://freaimagecompressor.vercel.app/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Example: add font */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=chillax@1&display=swap"
          rel="stylesheet"
        ></link>

        {/* Preload critical font */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webAppJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgJsonLd),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0F7V95564K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0F7V95564K');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {/* Accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
