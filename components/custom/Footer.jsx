"use client";
import React from "react";
import {
  Maximize,
  Download,
  Palette,
  FileImage,
  Video,
  Crop,
} from "lucide-react";

export default function Footer() {
  const tools = [
    {
      name: "Image Compressor",
      path: "/frea-image-compressor",
      icon: FileImage,
    },
    {
      name: "Image Resizer",
      path: "/frea-image-resizer",
      icon: Maximize,
    },
    { name: "Image Cropper", path: "/frea-image-cropper", icon: Crop },
    { name: "Image Enhancer", path: "/frea-image-cropper", icon: Crop },
    { name: "Image Converter", path: "/frea-image-cropper", icon: Crop },
    { name: "YouTube Downloader", path: "#", icon: Video },
  ];

  const moreTools = [
    "Facebook Video Downloader",
    "Instagram Video Downloader",
    "Video Compressor",
    "Link Shortener",
    "QR Code Generator",
    "Bar Code Generator",
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Frea Tools Hub</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Your one-stop destination for all media processing needs. Fast,
              secure, and completely free tools for everyone.
            </p>

            {/* Icons Row */}
            <div className="flex space-x-4">
              {tools.slice(0, 4).map(({ icon: Icon }, i) => (
                <div
                  key={i}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Tools List */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tools</h4>
            <ul className="space-y-2">
              {tools.map((tool, i) => (
                <li key={i}>
                  <a
                    href={tool.path}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-4">More Tools</h4>
            <ul className="space-y-2">
              {moreTools.map((tool, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    {tool}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Media Tools Suite. All rights reserved. Made with ❤️ for
            creators worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
