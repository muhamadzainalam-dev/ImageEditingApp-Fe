import React from "react";
import { motion } from "framer-motion";
import { Upload, Sliders, Maximize, Download } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Easy Upload",
    description:
      "Upload images instantly using drag & drop or paste from clipboard. No sign-up required.",
  },
  {
    icon: Sliders,
    title: "Smart Compression",
    description:
      "Reduce image size without losing visible quality. Perfect for web and sharing.",
  },
  {
    icon: Maximize,
    title: "Multiple Formats",
    description:
      "Supports JPG, PNG, and WebP. Convert and compress your images with ease.",
  },
  {
    icon: Download,
    title: "Instant Download",
    description:
      "Download compressed images instantly, either one by one or all at once.",
  },
];

export default function Feature() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Your Complete Toolkit For{" "}
            <span className="text-blue-600">Growth</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Built for freelancers and teams who want to focus on their work, not
            their admin.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-white to-gray-50/50 p-8 rounded-2xl border border-blue-200 shadow-lg hover:shadow-2xl hover:border-blue-600/20 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
