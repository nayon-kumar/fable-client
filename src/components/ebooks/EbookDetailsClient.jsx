"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaBookmark,
  FaRegBookmark,
  FaCalendarAlt,
  FaCheckCircle,
  FaLock,
  FaUserEdit,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import Badge from "@/components/ui/Badge";

const PREVIEW_LENGTH = 320;

export default function EbookDetailsClient({ ebook }) {
  const { user, isAuthenticated } = useAuth();
  const api = useApi();
  const router = useRouter();

  const [purchased, setPurchased] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [statusLoading, setStatusLoading] = useState(isAuthenticated);
  const [purchasing, setPurchasing] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);

  const isOwner = user?.email === ebook.writerEmail;
  const canSeeFullContent = isOwner || user?.role === "admin" || purchased;

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setStatusLoading(false);
      return;
    }

    let cancelled = false;
    setStatusLoading(true);

    Promise.all([
      api.get(`/payments/check/${ebook._id}/${user.email}`),
      api.get(`/bookmarks/check/${ebook._id}/${user.email}`),
    ])
      .then(([purchaseRes, bookmarkRes]) => {
        if (cancelled) return;
        setPurchased(purchaseRes.purchased);
        setBookmarked(bookmarkRes.bookmarked);
        setBookmarkId(bookmarkRes.bookmarkId);
      })
      .catch(() => {})
      .finally(() => !cancelled && setStatusLoading(false));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.email, ebook._id]);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push(`/login?next=/ebooks/${ebook._id}`);
      return;
    }
    setPurchasing(true);
    try {
      const { url } = await api.post("/payments/checkout/ebook", { ebookId: ebook._id });
      window.location.href = url;
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not start checkout.");
      setPurchasing(false);
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to bookmark ebooks.");
      router.push(`/login?next=/ebooks/${ebook._id}`);
      return;
    }
    setBookmarking(true);
    try {
      if (bookmarked && bookmarkId) {
        await api.delete(`/bookmarks/${bookmarkId}`);
        setBookmarked(false);
        setBookmarkId(null);
        toast.success("Removed from bookmarks");
      } else {
        const data = await api.post("/bookmarks", { ebookId: ebook._id });
        setBookmarked(true);
        setBookmarkId(data._id);
        toast.success("Bookmarked!");
      }
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setBookmarking(false);
    }
  };

  const renderPurchaseButton = () => {
    if (isOwner) {
      return (
        <button
          disabled
          className="w-full cursor-not-allowed rounded-full bg-white/10 px-6 py-3.5 text-center font-semibold text-gray-400"
        >
          This Is Your Ebook
        </button>
      );
    }
    if (statusLoading) {
      return (
        <div className="h-[54px] w-full animate-pulse rounded-full bg-white/10" />
      );
    }
    if (purchased) {
      return (
        <button
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-emerald-600/20 px-6 py-3.5 text-center font-semibold text-emerald-400"
        >
          <FaCheckCircle /> Already Purchased
        </button>
      );
    }
    if (ebook.sold) {
      return (
        <button
          disabled
          className="w-full cursor-not-allowed rounded-full bg-white/10 px-6 py-3.5 text-center font-semibold text-gray-400"
        >
          Sold Out
        </button>
      );
    }
    return (
      <button
        onClick={handlePurchase}
        disabled={purchasing}
        className="w-full rounded-full bg-violet-600 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {purchasing ? "Redirecting to checkout…" : `Buy Now — $${ebook.price}`}
      </button>
    );
  };

  const showFullText = canSeeFullContent;
  const description = ebook.description || "";
  const preview =
    description.length > PREVIEW_LENGTH
      ? `${description.slice(0, PREVIEW_LENGTH).trim()}…`
      : description;

  return (
    <div className="bg-[#050816] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
          {/* Cover */}
          <div>
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img
                src={ebook.coverImage}
                alt={ebook.title}
                className="h-[480px] w-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="violet">{ebook.genre}</Badge>
              <Badge variant={ebook.sold ? "danger" : "success"}>
                {ebook.sold ? "Sold" : "Available"}
              </Badge>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              {ebook.title}
            </h1>

            <Link
              href={`/browse-ebooks?search=${encodeURIComponent(ebook.writerName)}`}
              className="mt-3 inline-flex items-center gap-2 text-gray-400 transition hover:text-violet-400"
            >
              <FaUserEdit /> by {ebook.writerName}
            </Link>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <FaCalendarAlt />
              Uploaded{" "}
              {new Date(ebook.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <p className="mt-6 text-3xl font-bold text-violet-400">${ebook.price}</p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1">{renderPurchaseButton()}</div>
              <button
                onClick={handleBookmark}
                disabled={bookmarking}
                aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                className={`flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border text-lg transition disabled:cursor-not-allowed ${
                  bookmarked
                    ? "border-violet-500 bg-violet-500/10 text-violet-400"
                    : "border-white/10 text-gray-400 hover:border-violet-500/40 hover:text-white"
                }`}
              >
                {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white">Description</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-gray-300">
                {showFullText ? description : preview}
              </p>

              {!showFullText && description.length > PREVIEW_LENGTH && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-violet-500/30 bg-violet-500/5 px-4 py-3 text-sm text-violet-300">
                  <FaLock /> Purchase this ebook to unlock the full content.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
