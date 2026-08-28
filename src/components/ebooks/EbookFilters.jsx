"use client";

import { FaSearch, FaTimes } from "react-icons/fa";
import { genres } from "@/config/genres";

const inputClass =
  "rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500";

const optionClass = "bg-gray-900 text-white";

export default function EbookFilters({ filters, onChange, onReset, resultCount }) {
  const set = (patch) => onChange({ ...filters, ...patch });

  const hasActiveFilters =
    filters.search || filters.genre || filters.minPrice || filters.maxPrice;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:flex-wrap">
        <div className="relative flex-1 lg:min-w-[240px]">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => set({ search: e.target.value })}
            placeholder="Search by title or writer..."
            className={`${inputClass} w-full pl-11`}
          />
        </div>

        <select
          value={filters.genre}
          onChange={(e) => set({ genre: e.target.value })}
          className={`${inputClass} lg:w-44`}
        >
          <option value="" className={optionClass}>
            All Genres
          </option>
          {genres.map((g) => (
            <option key={g.name} value={g.name} className={optionClass}>
              {g.name}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => set({ minPrice: e.target.value })}
            placeholder="Min $"
            className={`${inputClass} w-24`}
          />
          <span className="text-gray-500">–</span>
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => set({ maxPrice: e.target.value })}
            placeholder="Max $"
            className={`${inputClass} w-24`}
          />
        </div>

        <select
          value={filters.sort}
          onChange={(e) => set({ sort: e.target.value })}
          className={`${inputClass} lg:w-44`}
        >
          <option value="newest" className={optionClass}>
            Newest First
          </option>
          <option value="price_asc" className={optionClass}>
            Price: Low to High
          </option>
          <option value="price_desc" className={optionClass}>
            Price: High to Low
          </option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:border-rose-500/40 hover:text-rose-400"
          >
            <FaTimes /> Clear
          </button>
        )}
      </div>

      {typeof resultCount === "number" && (
        <p className="mt-4 text-sm text-gray-500">
          {resultCount} ebook{resultCount === 1 ? "" : "s"} found
        </p>
      )}
    </div>
  );
}
