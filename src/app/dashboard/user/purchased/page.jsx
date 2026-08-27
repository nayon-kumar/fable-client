"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaShoppingBag } from "react-icons/fa";
import RequireRole from "@/components/auth/RequireRole";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import DashboardEbookCard from "@/components/ebooks/DashboardEbookCard";
import { EbookGridSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

function PurchasedGallery() {
  const { user } = useAuth();
  const api = useApi();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/payments/purchases/${user.email}`)
      .then((data) => !cancelled && setPurchases(data))
      .catch((err) => toast.error(err instanceof ApiError ? err.message : "Failed to load ebooks"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white md:text-3xl">Purchased Ebooks</h1>
      <p className="mt-1 text-gray-400">Your personal library, ready to read anytime.</p>

      <div className="mt-8">
        {loading ? (
          <EbookGridSkeleton count={6} />
        ) : purchases.length ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {purchases.map((p) => (
              <DashboardEbookCard
                key={p._id}
                ebook={{
                  _id: p.ebookId,
                  title: p.ebookTitle,
                  coverImage: p.coverImage,
                  writerName: p.writerName,
                  price: p.price,
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FaShoppingBag}
            title="No purchased ebooks yet"
            description="Ebooks you buy will show up here for easy access."
          />
        )}
      </div>
    </div>
  );
}

export default function PurchasedPage() {
  return (
    <RequireRole role="user">
      <PurchasedGallery />
    </RequireRole>
  );
}
