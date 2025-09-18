import "./globals.css";
import Navbar from "@/components/custom/Navbar";

export const metadata = {
  title: "Frea Image Compressor | Free Online Image Compression Tool",
  description:
    "Compress images online with Frea Image Compressor. Reduce image size without losing quality. Free, fast, and SEO-friendly image compression tool.",
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
  openGraph: {
    title: "Frea Image Compressor - Free Online Tool",
    description:
      "Reduce image size without losing quality. Fast, free, and secure online image compression tool.",
    url: "https://freaimagecompressor",
    siteName: "Frea Image Compressor",
    images: [
      {
        url: "https://freaimagecompressor/og-image.png",
        width: 1200,
        height: 630,
        alt: "Frea Image Compressor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frea Image Compressor",
    description:
      "Compress images online with Frea Image Compressor. Free, fast, and high quality.",
    images: ["https://freaimagecompressor/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Frea Image Compressor",
              url: "https://freaimagecompressor",
              description:
                "Free online tool to compress and reduce image size without losing quality.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
