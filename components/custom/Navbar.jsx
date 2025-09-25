"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const routeTitles = {
    "/": "Frea Tools Hub",
    "/frea-image-cropper": "Frea Image Cropper",
    "/frea-image-resizer": "Frea Image Resizer",
    "/frea-image-compressor": "Frea Image Compressor",
  };

  const pageTitle = routeTitles[pathname] || "Frea Tools";

  const navLinks = [
    { href: "#tools", label: "Browse All Tools!", active: true },
    { href: "#features", label: "Features" },
    { href: "#how-it%20works", label: "How it Works" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm border-b border-gray-100 w-full fixed top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent transition-transform group-hover:scale-105">
            {pageTitle}
          </h1>
        </Link>

        <nav className="hidden md:flex space-x-8">
          {navLinks.map(({ href, label, active }) => (
            <motion.a
              key={href}
              href={href}
              whileHover={{ y: -2 }}
              className={`font-medium transition-colors duration-200 ${
                active
                  ? "text-blue-600 hover:text-blue-800"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {label}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
