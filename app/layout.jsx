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
    "image compressor",
    "image resizer",
    "image cropper",
    "compress images online",
    "resize images online",
    "crop images online",
  ],
  metadataBase: new URL("https://freatoolshub.vercel.app"),
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <Navbar />
        <main id="main-content">
          <div className="pt-18">{children}</div>
          <Tools />
          <Feature />
          <How_It_Works />
          <Testimonials />
          <CTA_Section />
        </main>
        <ProfessionalFooter />

        {/* ✅ Analytics component */}
        <Analytics />
      </body>
    </html>
  );
}
