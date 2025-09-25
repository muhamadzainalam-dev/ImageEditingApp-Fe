"use client";
import { useState } from "react";
import {
  ArrowRight,
  FileImage,
  Maximize,
  Crop,
  Youtube,
  Facebook,
  Instagram,
  Sparkles,
  Video,
  QrCode,
  RefreshCcw,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

export default function Tools() {
  const [showAll, setShowAll] = useState(false);

  const tools = [
    {
      id: 1,
      name: "Image Compressor",
      description:
        "Reduce image file size by up to 90% without losing quality. Supports JPEG, PNG, WebP formats.",
      icon: FileImage,
      path: "/frea-image-compressor",
      gradient: "from-blue-500 to-blue-600",
      image: "/thumbnail/1.png",
      badge: "BETA",
    },
    {
      id: 2,
      name: "Image Resizer",
      description:
        "Resize images to any dimension while maintaining aspect ratio. Perfect for web optimization.",
      icon: Maximize,
      path: "/frea-image-resizer",
      gradient: "from-blue-500 to-blue-600",
      image: "/thumbnail/2.png",
      badge: "BETA",
    },
    {
      id: 3,
      name: "Image Cropper",
      description:
        "Crop and trim images with precision. Custom aspect ratios, circular crops, and more.",
      icon: Crop,
      path: "/frea-image-cropper",
      gradient: "from-blue-500 to-blue-600",
      image: "/thumbnail/3.png",
      badge: "BETA",
    },
    {
      id: 4,
      name: "YouTube Downloader",
      description: "Download YouTube videos in HD, 4K, or MP3 format.",
      icon: Youtube,
      path: "#",
      gradient: "from-red-500 to-red-600",
      image: "/thumbnail/4.png",
      badge: "Coming Soon",
    },
    {
      id: 5,
      name: "Facebook Downloader",
      description: "Download Facebook videos in HD or SD easily.",
      icon: Facebook,
      path: "#",
      gradient: "from-blue-600 to-blue-800",
      image: "/thumbnail/5.png",
      badge: "Coming Soon",
    },
    {
      id: 6,
      name: "Instagram Downloader",
      description: "Download Instagram videos, reels, and stories quickly.",
      icon: Instagram,
      path: "#",
      gradient: "from-pink-500 to-purple-600",
      image: "/thumbnail/6.png",
      badge: "Coming Soon",
    },
    {
      id: 7,
      name: "Image Enhancer",
      description:
        "Enhance photo quality using AI. Improve sharpness & detail.",
      icon: Sparkles,
      path: "#",
      gradient: "from-green-500 to-green-600",
      image: "/thumbnail/7.png",
      badge: "Coming Soon",
    },
    {
      id: 8,
      name: "Video Compressor",
      description: "Compress videos without losing much quality.",
      icon: Video,
      path: "#",
      gradient: "from-yellow-500 to-orange-600",
      image: "/thumbnail/8.png",
      badge: "Coming Soon",
    },
    {
      id: 9,
      name: "Link Shortener",
      description: "Shorten long URLs into simple, shareable links.",
      icon: LinkIcon,
      path: "#",
      gradient: "from-indigo-500 to-indigo-600",
      image: "/thumbnail/9.png",
      badge: "Coming Soon",
    },
    {
      id: 10,
      name: "QR Code Generator",
      description: "Generate QR codes for URLs, text, Wi-Fi, and more.",
      icon: QrCode,
      path: "#",
      gradient: "from-gray-500 to-gray-700",
      image: "/thumbnail/10.png",
      badge: "Coming Soon",
    },
    {
      id: 11,
      name: "Image Converter",
      description: "Convert images between formats like JPG, PNG, WebP, GIF.",
      icon: RefreshCcw,
      path: "#",
      gradient: "from-purple-500 to-purple-700",
      image: "/thumbnail/11.png",
      badge: "Coming Soon",
    },
  ];

  const visibleTools = showAll ? tools : tools.slice(0, 3);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" id="tools">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-3">
            Frea Tools
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our suite of tools designed for your creative needs
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {visibleTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.id} href={tool.path}>
                <div className="relative bg-white rounded-xl border border-gray-100 shadow hover:shadow-lg transition p-5 flex flex-col h-full">
                  {/* Badge */}
                  {tool.badge && (
                    <span
                      className={`absolute top-3 right-3 z-20 px-3 py-1 text-xs font-semibold rounded-full ${
                        tool.badge === "BETA"
                          ? "bg-black text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {tool.badge}
                    </span>
                  )}

                  {/* Image */}
                  <div className="mb-4 rounded-lg overflow-hidden relative">
                    <img
                      src={tool.image}
                      alt={tool.name}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Icon */}
                  <div className="mb-3">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.gradient} text-white`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {tool.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between text-blue-600 font-medium">
                    <span>Use Tool</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Button */}
        {!showAll && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Browse All Tools
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
