"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  Trash2,
  RotateCcw,
  Settings,
  Zap,
  Shield,
  Clock,
  Camera,
  Sliders,
  Palette,
  Focus,
} from "lucide-react";

export default function EnhancedImageEnhancer() {
  const [files, setFiles] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscale: 0,
    blur: 0,
    hueRotate: 0,
    sepia: 0,
    invert: 0,
    opacity: 100,
  });
  const [isDragActive, setIsDragActive] = useState(false);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  // Drag & Drop functionality
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // Paste functionality
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
    if (currentImageIndex >= index && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  // Clear all files
  const clearAll = () => {
    setFiles([]);
    setCurrentImageIndex(0);
    resetFilters();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      grayscale: 0,
      blur: 0,
      hueRotate: 0,
      sepia: 0,
      invert: 0,
      opacity: 100,
    });
  };

  // Apply filters to canvas for download
  const applyFiltersToCanvas = () => {
    if (!canvasRef.current || !imgRef.current || files.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    const img = imgRef.current;

    canvasRef.current.width = img.naturalWidth;
    canvasRef.current.height = img.naturalHeight;

    ctx.filter = `
      brightness(${filters.brightness}%)
      contrast(${filters.contrast}%)
      saturate(${filters.saturation}%)
      grayscale(${filters.grayscale}%)
      blur(${filters.blur}px)
      hue-rotate(${filters.hueRotate}deg)
      sepia(${filters.sepia}%)
      invert(${filters.invert}%)
      opacity(${filters.opacity}%)
    `;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
  };

  // Download current image
  const handleDownload = () => {
    if (files.length === 0) return;
    applyFiltersToCanvas();
    const link = document.createElement("a");
    const currentFile = files[currentImageIndex];
    const fileName = currentFile.name.replace(/\.[^/.]+$/, "");
    link.download = `enhanced-${fileName}-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  // Download all enhanced images
  const handleDownloadAll = async () => {
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      setCurrentImageIndex(i);
      // Wait a bit for the image to load
      await new Promise((resolve) => setTimeout(resolve, 100));
      applyFiltersToCanvas();
      const link = document.createElement("a");
      const fileName = files[i].name.replace(/\.[^/.]+$/, "");
      link.download = `enhanced-${fileName}-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
      // Small delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  };

  const filterGroups = [
    {
      title: "Basic Adjustments",
      icon: Sliders,
      filters: ["brightness", "contrast", "opacity"],
    },
    {
      title: "Color Effects",
      icon: Palette,
      filters: ["saturation", "hueRotate", "sepia"],
    },
    {
      title: "Special Effects",
      icon: Focus,
      filters: ["grayscale", "blur", "invert"],
    },
  ];

  const filterConfigs = {
    brightness: { min: 0, max: 200, suffix: "%" },
    contrast: { min: 0, max: 200, suffix: "%" },
    saturation: { min: 0, max: 200, suffix: "%" },
    grayscale: { min: 0, max: 100, suffix: "%" },
    blur: { min: 0, max: 20, suffix: "px" },
    hueRotate: { min: 0, max: 360, suffix: "°" },
    sepia: { min: 0, max: 100, suffix: "%" },
    invert: { min: 0, max: 100, suffix: "%" },
    opacity: { min: 0, max: 100, suffix: "%" },
  };

  const currentImage = files[currentImageIndex];

  // Auto Enhance (apply recommended enhancements)
  const autoEnhance = () => {
    setFilters({
      brightness: 110, // slightly brighter
      contrast: 115, // more depth
      saturation: 120, // richer colors
      grayscale: 0,
      blur: 0,
      hueRotate: 0,
      sepia: 0,
      invert: 0,
      opacity: 100,
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
            <span className="text-black">Enhance Your Images</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Like a Pro
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Transform your images with professional-grade filters and
            adjustments. Real-time preview, batch processing, and instant
            downloads.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Zap, text: "Real-time Preview" },
              { icon: Shield, text: "Client-side Processing" },
              { icon: Clock, text: "Instant Results" },
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
                  or click to browse • Supports JPEG, PNG, WEBP • Paste from
                  clipboard
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
              className="max-w-6xl mx-auto mt-12"
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

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {files.map((file, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -2 }}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === i
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="aspect-square bg-gray-100 relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(i);
                        }}
                        className="absolute top-1 right-1 w-6 h-6 bg-black/70 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-white" />
                      </motion.button>
                      {currentImageIndex === i && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Camera className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Current Image Preview */}
              {currentImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
                    <div className="text-center mb-6">
                      <h4 className="text-lg font-semibold text-black mb-2">
                        {currentImage.name}
                      </h4>
                      <p className="text-gray-600">
                        {(currentImage.size / 1024 / 1024).toFixed(2)} MB •{" "}
                        {currentImageIndex + 1} of {files.length}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <div className="relative max-w-2xl w-full">
                        <img
                          ref={imgRef}
                          src={URL.createObjectURL(currentImage)}
                          alt="preview"
                          style={{
                            filter: `
                              brightness(${filters.brightness}%)
                              contrast(${filters.contrast}%)
                              saturate(${filters.saturation}%)
                              grayscale(${filters.grayscale}%)
                              blur(${filters.blur}px)
                              hue-rotate(${filters.hueRotate}deg)
                              sepia(${filters.sepia}%)
                              invert(${filters.invert}%)
                              opacity(${filters.opacity}%)
                            `,
                          }}
                          className="w-full h-auto rounded-2xl shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Filter Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-black">
                        Enhancement Controls
                      </h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetFilters}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="text-sm font-medium">Reset</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={autoEnhance}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">Auto Enhance</span>
                    </motion.button>
                  </div>

                  {filterGroups.map((group, groupIndex) => (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + groupIndex * 0.1 }}
                      className="mb-8 last:mb-0"
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <group.icon className="w-4 h-4 text-blue-600" />
                        <h4 className="text-sm font-semibold text-black uppercase tracking-wide">
                          {group.title}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {group.filters.map((filterName) => {
                          const config = filterConfigs[filterName];
                          const value = filters[filterName];

                          return (
                            <div key={filterName}>
                              <label className="block text-sm font-medium text-black mb-3 capitalize">
                                {filterName.replace(/([A-Z])/g, " $1").trim()}:{" "}
                                {value}
                                {config.suffix}
                              </label>
                              <div className="relative">
                                <input
                                  type="range"
                                  min={config.min}
                                  max={config.max}
                                  value={value}
                                  onChange={(e) =>
                                    setFilters({
                                      ...filters,
                                      [filterName]: parseInt(e.target.value),
                                    })
                                  }
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                  style={{
                                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                                      ((value - config.min) /
                                        (config.max - config.min)) *
                                      100
                                    }%, #e5e7eb ${
                                      ((value - config.min) /
                                        (config.max - config.min)) *
                                      100
                                    }%, #e5e7eb 100%)`,
                                  }}
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                  <span>
                                    {config.min}
                                    {config.suffix}
                                  </span>
                                  <span>
                                    {config.max}
                                    {config.suffix}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Current</span>
                    </motion.button>

                    {files.length > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownloadAll}
                        className="flex items-center justify-center space-x-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download All ({files.length})</span>
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </motion.div>

              {/* Hidden Canvas for Download */}
              <canvas ref={canvasRef} className="hidden"></canvas>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}
