import React from "react";
import { motion } from "framer-motion";
import { Upload, Sliders, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Upload Image",
    description: "Drag & drop, paste, or select your image from the device.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Compress Instantly",
    description:
      "Our tool reduces the file size while keeping the quality high.",
    icon: Sliders,
  },
  {
    number: "03",
    title: "Download & Save",
    description: "Download the compressed image with just one click.",
    icon: Download,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50" id="how-it%20works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">How</span> it works
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map(({ number, title, description, icon: Icon }) => (
            <motion.article
              key={number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white p-8 rounded-2xl border border-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300 text-center relative group"
            >
              {/* Number + Icon */}
              <div className="relative inline-block mb-6">
                <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {number}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              <p className="text-gray-700">{description}</p>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
