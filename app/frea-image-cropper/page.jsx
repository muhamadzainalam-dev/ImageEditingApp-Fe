import FreaImageCropper from "@/components/tools/Cropper";
import React from "react";

export const metadata = {
  title: "Free Image Cropper Online - Frea Tools Hub",
  description:
    "Crop your images online instantly with Frea Tools Hub. Simple, fast, and free image cropper tool with no quality loss.",
  keywords: [
    "image cropper",
    "crop images online",
    "photo cropper",
    "frea tools hub",
  ],
  openGraph: {
    title: "Free Image Cropper Online - Frea Tools Hub",
    description:
      "Crop your images instantly online with Frea Tools Hub. Simple, fast, and free image cropper tool with no quality loss.",
    url: "https://freatoolshub.vercel.app/frea-image-cropper",
    siteName: "Frea Tools Hub",
    images: [
      {
        url: "/og-image-cropper.jpg",
        width: 1200,
        height: 630,
        alt: "Frea Image Cropper",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Frea Image Cropper",
    url: "https://freatoolshub.vercel.app/frea-image-cropper",
    description:
      "Easily crop your images to the perfect size online with Frea Tools Hub free image cropper.",
    applicationCategory: "Utility",
    operatingSystem: "All",
  };

  return (
    <div>
      <FreaImageCropper />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
