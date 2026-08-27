"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark, FaTrash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import DashboardEbookCard from "@/components/ebooks/DashboardEbookCard";
import { EbookGridSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

export default function BookmarksGallery() {
  const { user } = useAuth();
  const api = useApi();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/bookmarks/${user.email}`)
      .then((data) => !cancelled && setBookmarks(data))
      .catch((err) => toast.error(err instanceof ApiError ? err.message : "Failed to load bookmarks"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

  const handleRemove = async (bookmarkId) => {
    setRemovingId(bookmarkId);
    try {
      await api.delete(`/bookmarks/${bookmarkId}`);
      setBookmarks((prev) => prev.filter((b) => b.bookmarkId !== bookmarkId));
      toast.success("Removed from bookmarks");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not remove bookmark");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white md:text-3xl">Bookmarks</h1>
      <p className="mt-1 text-gray-400">Ebooks you&apos;ve saved to read or buy later.</p>

      <div className="mt-8">
        {loading ? (
          <EbookGridSkeleton count={6} />
        ) : bookmarks.length ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {bookmarks.map((b) => (
              <DashboardEbookCard
                key={b.bookmarkId}
                ebook={b}
                actionLabel="Remove"
                actionIcon={FaTrash}
                actionLoading={removingId === b.bookmarkId}
                onAction={() => handleRemove(b.bookmarkId)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FaBookmark}
            title="No bookmarks yet"
            description="Save ebooks from the browse page to find them here later."
          />
        )}
      </div>
    </div>
  );
}
