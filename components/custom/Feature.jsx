"use client";
import { Zap, Camera, Sparkles, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process your files in seconds with our optimized algorithms",
  },
  {
    icon: Camera,
    title: "High Quality",
    description: "Maintain the best quality while optimizing your media files",
  },
  {
    icon: Sparkles,
    title: "100% Free",
    description: "All tools are completely free to use with no hidden charges",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your files are processed securely and never stored on our servers",
  },
];

export default function Feature() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Your Complete Toolkit For{" "}
            <span className="text-blue-600">Growth</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Built for freelancers and teams who want to focus on their work, not
            their admin.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="bg-gradient-to-br from-white to-gray-50/50 p-8 rounded-2xl border border-blue-200 shadow-md hover:shadow-xl hover:border-blue-600/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
