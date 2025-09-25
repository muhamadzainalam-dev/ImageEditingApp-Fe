"use client";
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
    title: "Process in Seconds",
    description:
      "Our fast algorithms optimize your file while keeping the best quality.",
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
    <section className="py-20 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">How</span> it works
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ number, title, description, icon: Icon }) => (
            <article
              key={number}
              className="bg-white p-8 rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 text-center relative group hover:-translate-y-2"
            >
              {/* Number + Icon */}
              <div className="relative inline-block mb-6">
                <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {number}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              <p className="text-gray-700">{description}</p>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
