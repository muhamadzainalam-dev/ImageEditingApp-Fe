"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`,
    }));
    setParticles(generated);

    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(({ id, left, top, delay, duration }) => (
          <div
            key={id}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left,
              top,
              animationDelay: delay,
              animationDuration: duration,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div
          className={`transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm font-medium">
              12 Powerful Tools • 100% Free
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-black mb-8">
            <span className="text-white">Ultimate</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient">
              Tools Hub
            </span>
          </h1>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-500" />
            <p className="text-blue-200 text-lg font-medium">
              Everything You Need in One Place
            </p>
            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-500" />
          </div>

          {/* Description */}
          <p className="max-w-4xl mx-auto text-xl md:text-2xl text-gray-300 leading-relaxed">
            Transform, optimize, and enhance your media files with our
            lightning-fast online tools.
            <span className="text-blue-400 font-semibold">
              {" "}
              No downloads, no limits, no hassle.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
