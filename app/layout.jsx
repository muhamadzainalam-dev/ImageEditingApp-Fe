import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import Tools from "@/components/custom/Tools";
import Feature from "@/components/custom/Feature";
import How_It_Works from "@/components/custom/How_It_Works";
import Testimonials from "@/components/custom/Testimonials";
import CTA_Section from "@/components/custom/CTA_Section";
import ProfessionalFooter from "@/components/custom/Footer";
import Analytics from "@/components/custom/Analytics";

export const metadata = {
  title: "FREA Tools Hub - Free Online Tools",
  description:
    "FREA Tools Hub offers free online tools including Image Compressor, Image Resizer, Image Cropper, and more.",
  keywords: [
    "frea tools hub",
    "free online tools",
    "frea image compressor",
    "frea image resizer",
    "frea image cropper",
    "frea compress images online",
    "frea resize images online",
    "crop images online",
    "drag and drop editing website",
  ],
  metadataBase: new URL("https://freatoolshub.vercel.app"),
  alternates: {
    canonical: "https://freatoolshub.vercel.app",
  },
  openGraph: {
    title: "FREA Tools Hub",
    description:
      "Free online tools like Image Compressor, Image Resizer, Image Cropper and more utilities.",
    url: "https://freatoolshub.vercel.app",
    siteName: "FREA Tools Hub",
    images: [
      {
        url: "https://freatoolshub.vercel.app/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "FREA Tools Hub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FREA Tools Hub",
    description:
      "Free online tools including Image Compressor, Resizer, Cropper and more.",
    images: ["https://freatoolshub.vercel.app/og-home.jpg"],
  },
  icons: {
    icon: "/favicon-192x192.png",
    apple: "/favicon-192x192.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FREA Tools Hub",
    url: "https://freatoolshub.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://freatoolshub.vercel.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" dir="ltr" prefix="og: http://ogp.me/ns#">
      <body>
        <Navbar />
        <main id="main-content">
          {/* ✅ Ensure homepage has an H1 for SEO */}
          <h1 className="sr-only">FREA Tools Hub - Free Online Tools</h1>

          <div className="pt-18">{children}</div>
          <Tools />
          <Feature />
          <How_It_Works />
          <Testimonials />
          <CTA_Section />
        </main>
        <ProfessionalFooter />

        {/* ✅ Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ✅ Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
