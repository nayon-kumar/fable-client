"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaBookOpen } from "react-icons/fa";
import { api } from "@/lib/api";
import EbookCard from "@/components/ebooks/EbookCard";
import EbookFilters from "@/components/ebooks/EbookFilters";
import { EbookGridSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";

const LIMIT = 12;

const emptyFilters = {
  search: "",
  genre: "",
  minPrice: "",
  maxPrice: "",
  availability: "",
  sort: "newest",
};

export default function BrowseEbooksClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    search: searchParams.get("search") || "",
    genre: searchParams.get("genre") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    availability: searchParams.get("availability") || "",
    sort: searchParams.get("sort") || "newest",
  }));
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [ebooks, setEbooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce search input, apply other filters immediately.
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(t);
  }, [filters.search]);

  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch],
  );

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(1);
  }, [
    debouncedSearch,
    filters.genre,
    filters.minPrice,
    filters.maxPrice,
    filters.availability,
    filters.sort,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(queryFilters).forEach(([key, value]) => {
      if (value && !(key === "sort" && value === "newest")) params.set(key, value);
    });
    if (page > 1) params.set("page", page);
    const qs = params.toString();
    router.replace(qs ? `/browse-ebooks?${qs}` : "/browse-ebooks", { scroll: false });
  }, [queryFilters, page, router]);

  const fetchEbooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get("/ebooks", {
        params: { ...queryFilters, page, limit: LIMIT },
      });
      setEbooks(data.ebooks);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      setError("Failed to load ebooks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [queryFilters, page]);

  useEffect(() => {
    fetchEbooks();
  }, [fetchEbooks]);

  const handleReset = () => {
    setFilters(emptyFilters);
    setDebouncedSearch("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <EbookFilters
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        resultCount={loading ? undefined : total}
      />

      <div className="mt-10">
        {loading ? (
          <EbookGridSkeleton count={LIMIT} />
        ) : error ? (
          <EmptyState
            icon={FaBookOpen}
            title="Something went wrong"
            description={error}
            action={
              <button
                onClick={fetchEbooks}
                className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Try Again
              </button>
            }
          />
        ) : ebooks.length ? (
          <>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {ebooks.map((ebook, i) => (
                <EbookCard key={ebook._id} ebook={ebook} index={i} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        ) : (
          <EmptyState
            icon={FaBookOpen}
            title="No ebooks match your filters"
            description="Try adjusting your search or filters to find what you're looking for."
            action={
              <button
                onClick={handleReset}
                className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Clear Filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
