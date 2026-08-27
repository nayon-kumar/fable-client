"use client";

import Link from "next/link";
import { FaEye } from "react-icons/fa";

export default function DashboardEbookCard({
  ebook,
  actionLabel,
  onAction,
  actionIcon: ActionIcon,
  actionVariant = "danger",
  actionLoading = false,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-violet-500/40">
      <Link href={`/ebooks/${ebook._id}`}>
        <img
          src={ebook.coverImage}
          alt={ebook.title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <Link
          href={`/ebooks/${ebook._id}`}
          className="line-clamp-1 font-semibold text-white transition hover:text-violet-400"
        >
          {ebook.title}
        </Link>
        <p className="mt-1 text-sm text-gray-400">by {ebook.writerName}</p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="font-bold text-violet-400">${ebook.price}</span>
          <div className="flex items-center gap-2">
            <Link
              href={`/ebooks/${ebook._id}`}
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-300 transition hover:border-violet-500 hover:text-white"
            >
              <FaEye /> View
            </Link>
            {onAction && (
              <button
                onClick={onAction}
                disabled={actionLoading}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  actionVariant === "danger"
                    ? "border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                    : "border border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
                }`}
              >
                {ActionIcon && <ActionIcon />} {actionLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
