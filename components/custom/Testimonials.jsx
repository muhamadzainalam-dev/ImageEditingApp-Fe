import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Abdul Rafay Khan",
    role: "Content Creator",
    image: "/user.png",
    quote:
      "This Image Compressor is super helpful! My YouTube thumbnails are lighter in size but still look crystal clear.",
  },
  {
    name: "Rahul Mehta",
    role: "Freelance Photographer",
    image: "/user.png",
    quote:
      "I was amazed how quickly I could reduce image sizes without losing quality. It saves me hours when sharing client photos.",
  },
  {
    name: "Michelle Lee",
    role: "E-Commerce Seller",
    image: "/user.png",
    quote:
      "Perfect tool for compressing product photos before uploading. My website loads faster and my sales actually improved!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What <span className="text-blue-600">Beta Users</span> Say
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join thousands of freelancers reshaping their business with our
            platform.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map(({ name, role, image, quote }) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white to-gray-50/30 p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <span className="border-2 border-gray-600 rounded-full mr-4">
                  <Image
                    src={image}
                    alt={`${name}, ${role}`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </span>
                <div>
                  <div className="font-semibold text-gray-900">{name}</div>
                  <div className="text-gray-600 text-sm">{role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
