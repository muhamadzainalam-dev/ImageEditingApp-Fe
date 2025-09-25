"use client";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Abdul Rafay Khan",
    role: "Content Creator",
    image: "/user.png",
    quote:
      "These Frea Tools are super helpful! My YouTube thumbnails are lighter in size but still look crystal clear.",
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
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What <span className="text-blue-600">Beta Users</span> Say
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join thousands of freelancers reshaping their business with our
            platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, image, quote }) => (
            <article
              key={name}
              className="bg-gradient-to-br from-white to-gray-50/30 p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                {quote}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
