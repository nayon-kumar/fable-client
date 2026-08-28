"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaUserEdit } from "react-icons/fa";
import Badge from "@/components/ui/Badge";

export default function EbookCard({ ebook, index = 0 }) {
  const href = `/ebooks/${ebook._id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-violet-500/40"
    >
      <Link href={href}>
        <div className="relative h-56 w-full overflow-hidden bg-white/5">
          <img
            src={ebook.coverImage}
            alt={ebook.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {ebook.genre && (
            <span className="absolute left-3 top-3">
              <Badge variant="violet">{ebook.genre}</Badge>
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="line-clamp-1 font-semibold text-white">{ebook.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
            <FaUserEdit className="text-xs" /> {ebook.writerName}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-violet-400">${ebook.price}</span>
            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-300 transition group-hover:border-violet-500 group-hover:text-white">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
