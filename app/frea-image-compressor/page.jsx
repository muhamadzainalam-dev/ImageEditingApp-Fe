import React from "react";
import FreaImageCompressor from "@/components/tools/Compressor";

export const metadata = {
  title: "Free Image Compressor Online - Frea Tools Hub",
  description:
    "Compress images online without losing quality. Frea Tools Hub provides a free image compressor to reduce file size instantly.",
  keywords: [
    "image compressor",
    "compress images online",
    "reduce image size",
    "frea tools hub",
  ],
  openGraph: {
    title: "Free Image Compressor Online - Frea Tools Hub",
    description:
      "Compress images online without losing quality. Fast, secure, and completely free image compressor tool.",
    url: "https://freatoolshub.vercel.app/frea-image-compressor",
    siteName: "Frea Tools Hub",
    images: [
      {
        url: "/og-image-compressor.jpg",
        width: 1200,
        height: 630,
        alt: "Frea Image Compressor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Frea Image Compressor",
    url: "https://freatoolshub.vercel.app/frea-image-compressor",
    description:
      "Compress images online without losing quality with Frea Tools Hub free image compressor.",
    applicationCategory: "Utility",
    operatingSystem: "All",
  };

  return (
    <div>
      <FreaImageCompressor />

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
