"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Discover & Read Original Ebooks",
    desc: "Explore thousands of ebooks from talented writers around the world.",
    image:
      "https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_1280.jpg",
  },
  {
    id: 2,
    title: "Support Independent Writers",
    desc: "Read, purchase, and support creators building amazing stories.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title: "Build Your Digital Library",
    desc: "Save, bookmark, and access your favorite ebooks anytime.",
    image: "https://media.istockphoto.com/id/949118068/photo/books.jpg",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl mx-auto px-6 text-white text-center">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {slide.title}
              </h1>

              <p className="mt-4 text-lg md:text-xl text-gray-200">
                {slide.desc}
              </p>

              <Link
                href="/browse-ebooks"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg text-white font-medium"
              >
                Browse Ebooks <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
