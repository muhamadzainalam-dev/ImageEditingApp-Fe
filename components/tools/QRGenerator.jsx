"use client";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Copy, Zap, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function QR_Generator() {
  const [input, setInput] = useState("Example Text");
  const qrRef = useRef(null); // ✅ works in JSX

  // Download QR as PNG
  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
  };

  // Copy text to clipboard
  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    alert("Copied to clipboard ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-7xl mx-auto py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-black">Generate QR Codes</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Instantly & Free
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 px-2"
          >
            Create custom QR codes for URLs, text, or any content. Fast, secure,
            and completely free.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Zap, text: "Lightning Fast" },
              { icon: Shield, text: "100% Private" },
              { icon: Clock, text: "No Time Limits" },
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
          className="w-full max-w-3xl mx-auto rounded-3xl border border-white/20 p-6 sm:p-8  bg-gradient-to-br from-gray-50 to-blue-50/60 backdrop-blur-lg shadow-xl"
        >
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <input
              type="text"
              placeholder="Enter text or URL..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-blue-50/30 transition-all duration-200 text-gray-800 placeholder-gray-500  bg-gradient-to-br from-gray-50 to-blue-50/50"
            />
          </motion.div>

          {/* QR Preview Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex justify-center items-center p-6 sm:p-8 border-2 border-dashed border-blue-300 rounded-2xl  bg-gradient-to-br from-gray-50 to-blue-50/70 min-h-[240px] sm:min-h-[280px]">
              {input ? (
                <motion.div
                  initial={{ opacity: 0, rotate: -5 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                  className=" bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 rounded-xl shadow-lg"
                >
                  {/* ✅ Direct ref to QRCodeCanvas */}
                  <QRCodeCanvas ref={qrRef} value={input} size={200} />
                </motion.div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h1m-6 0a5 5 0 01-5-5v-2a5 5 0 015-5 5 5 0 015 5v2a5 5 0 01-5 5z"
                      />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-gray-800">
                    Drop your content here
                  </p>
                  <p className="text-sm text-gray-500">
                    or enter text above to generate QR code
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Buttons Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={handleCopy}
              disabled={!input}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4   border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              <Copy className="w-5 h-5" />
              Copy Content
            </button>

            <button
              onClick={handleDownload}
              disabled={!input}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download QR
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
