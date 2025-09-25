"use client";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Media?
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Join thousands of users who trust our tools for their media processing
          needs.
        </p>
        <Link href="#tools">
          <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100">
            <Sparkles className="w-5 h-5" />
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </section>
  );
}
