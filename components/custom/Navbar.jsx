"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-gray-100 w-full fixed top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="#">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl overflow-hidden flex items-center justify-center">
                  <Image src="/logo.png" alt="Logo" width={600} height={600} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Frea Image Compressor
                </h1>
              </motion.div>
            </Link>

            <nav className="hidden md:flex space-x-8">
              {["Features", "How it Works", "Testimonials"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  whileHover={{ y: -2 }}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>
    </div>
  );
}
