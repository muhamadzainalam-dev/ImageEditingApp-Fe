import FreaImageResizer from "@/components/tools/Resizer";
import React from "react";

export const metadata = {
  title: "Free Image Resizer Online - Frea Tools Hub",
  description:
    "Resize your images instantly with Frea Tools Hub. Free, easy-to-use online image resizer tool.",
  keywords: [
    "image resizer",
    "resize images online",
    "photo resizer",
    "frea tools hub",
  ],
  openGraph: {
    title: "Free Image Resizer Online - Frea Tools Hub",
    description:
      "Resize your images instantly with Frea Tools Hub. Free, easy-to-use online image resizer tool.",
    url: "https://freatoolshub.vercel.app/frea-image-resizer",
    siteName: "Frea Tools Hub",
    images: [
      {
        url: "/og-image-resizer.jpg",
        width: 1200,
        height: 630,
        alt: "Frea Image Resizer",
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
    name: "Frea Image Resizer",
    url: "https://freatoolshub.vercel.app/frea-image-resizer",
    description:
      "Resize your images instantly online for free with Frea Tools Hub image resizer.",
    applicationCategory: "Utility",
    operatingSystem: "All",
  };

  return (
    <div>
      <FreaImageResizer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
