"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { genres } from "@/config/genres";

export default function GenreGrid({ counts = [] }) {
  const countMap = new Map(counts.map((c) => [c.genre, c.count]));

  return (
    <section className="bg-[#050816] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            Explore
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Ebook Genres</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Jump straight into the genres you love most.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {genres.map((genre, i) => {
            const Icon = genre.icon;
            const count = countMap.get(genre.name) || 0;
            return (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (i % 8) * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <Link
                  href={`/browse-ebooks?genre=${encodeURIComponent(genre.name)}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-8 text-center transition hover:border-violet-500/40"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${genre.color} text-2xl text-white shadow-lg transition group-hover:scale-110`}
                  >
                    <Icon />
                  </div>
                  <span className="font-semibold text-white">{genre.name}</span>
                  <span className="text-xs text-gray-500">
                    {count} ebook{count === 1 ? "" : "s"}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
