"use client";

import { useState, useRef } from "react";
import Barcode from "react-barcode";
import { Copy, Download, Zap, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function BarCode_Generator() {
  const [input, setInput] = useState("");
  const barcodeRef = useRef(null);

  // 📌 Download barcode as SVG
  const handleDownload = () => {
    const svg = barcodeRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "barcode.svg";
    a.click();
  };

  // 📌 Copy value
  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    alert("Copied to clipboard ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-7xl mx-auto py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-black">Generate Barcodes</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Instantly & Free
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 px-2"
          >
            Create barcodes for products, numbers, or text. Fast, secure, and
            completely free.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Zap, text: "Instant Generation" },
              { icon: Shield, text: "Private & Secure" },
              { icon: Clock, text: "No Expiry" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 shadow-sm"
              >
                <feature.icon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl mx-auto rounded-3xl border border-white/20 p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-blue-50/60 backdrop-blur-lg shadow-xl"
        >
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <input
              type="text"
              placeholder="Enter text or numbers..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-blue-50/30 transition-all duration-200 text-gray-800 placeholder-gray-500 bg-gradient-to-br from-gray-50 to-blue-50/50"
            />
          </motion.div>

          {/* Barcode Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <div
              ref={barcodeRef}
              className="flex justify-center items-center p-6 sm:p-8 border-2 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/70 min-h-[160px]"
            >
              {input ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 rounded-xl shadow-lg"
                >
                  <Barcode
                    value={input}
                    width={2}
                    height={80}
                    displayValue={true}
                  />
                </motion.div>
              ) : (
                <div className="text-center text-gray-500">
                  <p className="text-base sm:text-lg font-medium text-gray-800">
                    Your barcode will appear here
                  </p>
                  <p className="text-sm text-gray-500">
                    Enter text above to generate
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={handleCopy}
              disabled={!input}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              <Copy className="w-5 h-5" /> Copy Value
            </button>

            <button
              onClick={handleDownload}
              disabled={!input}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
            >
              <Download className="w-5 h-5" /> Download
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
