import React from "react";
import FreaImageCompressor from "@/components/tools/Compressor";

export const metadata = {
  title: "Free Image Compressor Online - Frea Tools Hub",
  description:
    "Compress images online without losing quality. Frea Tools Hub provides a free image compressor to reduce file size instantly.",
  keywords: [
    "Frea image compressor",
    "Free image compressor",
    "Frea image compressor jpg",
    "Free image compressor jpg",
    "Image compressor to 20KB",
    "Compress image to 200KB",
    "Compress image to 100KB",
    "Compress image to 50KB",
    "Frea image resizer",
    "Free image compressor online",
    "Image size reducer",
    "Free image compressor to 20KB",
    "Free compress image to 200KB",
    "Free compress image to 100KB",
    "Free compress image to 50KB",
    "Free Image size reducer",
  ],
  alternates: {
    canonical: "https://freatoolshub.vercel.app/frea-image-compressor",
  },
  openGraph: {
    title: "Free Image Compressor Online - Frea Tools Hub",
    description:
      "Compress images online without losing quality. Fast, secure, and completely free image compressor tool.",
    url: "https://freatoolshub.vercel.app/frea-image-compressor",
    siteName: "Frea Tools Hub",
    images: [
      {
        url: "https://freatoolshub.vercel.app/og-image-compressor.jpg",
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

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the image compressor free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Frea Image Compressor is completely free to use without any sign-up.",
        },
      },
      {
        "@type": "Question",
        name: "Will compressing images reduce quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our tool reduces file size while maintaining maximum possible quality, so your images remain clear.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data safe when I upload images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, compression is done in the browser, and no images are stored on our servers.",
        },
      },
    ],
  };

  return (
    <div>
      {/* ✅ H1 for SEO (hidden but accessible) */}
      <h1 className="sr-only">
        Free Online Image Compressor - Reduce File Size Instantly
      </h1>

      {/* Tool UI */}
      <FreaImageCompressor />

      {/* Small visible description for SEO & users */}
      <p className="mt-4 text-gray-600 text-sm text-center">
        Compress images online instantly without losing quality. 100% free &
        secure.
      </p>

      {/* Extra SEO text, hidden */}
      <section className="sr-only">
        <h2>How this tool works</h2>
        <p>
          Our free image compressor allows you to reduce file size without
          losing quality. Simply upload your image, adjust compression, and
          download the optimized version instantly.
        </p>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </div>
  );
}
