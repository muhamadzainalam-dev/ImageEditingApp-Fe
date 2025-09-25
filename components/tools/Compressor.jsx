"use client";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  Trash2,
  Loader2,
  Settings,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

export default function FreaImageCompressor() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("jpeg");

  // Drag & Drop
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
  });

  // Paste feature
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData.items;
      for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          setFiles((prev) => [...prev, file]);
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // Remove single file
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // Clear all files
  const clearAll = () => {
    setFiles([]);
    setResults(null);
  };

  // Compress
  const handleCompress = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    formData.append("quality", quality);
    formData.append("format", format);

    setLoading(true);
    const res = await fetch(
      "https://freaimagecompressor-backend.onrender.com/api/compress",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setResults(data.results);
    setLoading(false);
  };

  // Download all compressed individually
  const handleDownloadAll = () => {
    if (!results) return;
    results.forEach((res) => {
      const a = document.createElement("a");
      a.href = res.compressedImage;
      const ext = format === "jpeg" ? "jpg" : format;
      a.download = `compressedimage-${res.filename
        .replace(/\.[^/.]+$/, "")
        .trim()}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-black">Compress Images</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Without Quality Loss
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Reduce file sizes by up to 80% while maintaining stunning visual
            quality. Fast, secure, and completely free.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Zap, text: "Lightning Fast" },
              { icon: Shield, text: "100% Private" },
              { icon: Clock, text: "No Time Limits" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
              >
                <feature.icon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragActive(true)}
            onDragLeave={() => setIsDragActive(false)}
            className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? "border-blue-500 bg-blue-50 scale-105"
                : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <motion.div
              animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Drop your images here
                </h3>
                <p className="text-gray-600">
                  or click to browse • Supports JPEG, PNG, WEBP
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* File Previews */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-4xl mx-auto mt-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-black">
                  Selected Images ({files.length})
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAll}
                  className="text-gray-500 hover:text-red-500 font-medium transition-colors"
                >
                  Clear All
                </motion.button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {files.map((file, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFile(i)}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-black truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Panel */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-4xl mx-auto mt-12"
            >
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-black">
                    Compression Settings
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Quality Slider */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Quality: {quality}%
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${quality}%, #e5e7eb ${quality}%, #e5e7eb 100%)`,
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>10%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Format Selector */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Output Format
                    </label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="jpeg">JPEG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WEBP</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCompress}
                      disabled={loading}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Compress Images</span>
                        </>
                      )}
                    </motion.button>

                    {results && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownloadAll}
                        className="flex items-center justify-center space-x-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download All</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto mt-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h3 className="text-3xl font-bold text-black mb-4">
                  Compression Complete! 🎉
                </h3>
                <p className="text-gray-600 text-lg">
                  Your images have been optimized. Download them individually or
                  all at once.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {results.map((result, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                    className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden"
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={result.compressedImage}
                        alt="compressed"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          -{result.reductionPercent}%
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h4 className="font-semibold text-black mb-4 truncate">
                        {result.filename}
                      </h4>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Original</p>
                          <p className="font-semibold text-black">
                            {(result.originalSize / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">
                            Compressed
                          </p>
                          <p className="font-semibold text-green-600">
                            {(result.compressedSize / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>

                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={result.compressedImage}
                        download={`compressed-${result.filename}`}
                        className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}
