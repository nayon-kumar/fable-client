"use client";

import { motion } from "framer-motion";
import { FaFeatherAlt, FaTrophy } from "react-icons/fa";

export default function TopWriters({ writers }) {
  if (!writers.length) return null;

  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            Community Favorites
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Top Writers</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            The most-read storytellers on Fable, ranked by ebooks sold.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {writers.map((writer, i) => (
            <motion.div
              key={writer._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 text-center"
            >
              {i === 0 && (
                <span className="absolute right-4 top-4 text-lg text-amber-400">
                  <FaTrophy />
                </span>
              )}

              {writer.writerPhoto ? (
                <img
                  src={writer.writerPhoto}
                  alt={writer.writerName}
                  className="h-20 w-20 rounded-full border-2 border-violet-500/40 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl text-white">
                  <FaFeatherAlt />
                </div>
              )}

              <h3 className="mt-5 text-lg font-semibold text-white">
                {writer.writerName}
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                {writer.totalSales} ebook{writer.totalSales === 1 ? "" : "s"} sold
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
