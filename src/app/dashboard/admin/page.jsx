"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUsers, FaFeatherAlt, FaBookOpen, FaDollarSign } from "react-icons/fa";
import RequireRole from "@/components/auth/RequireRole";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import StatCard from "@/components/dashboard/StatCard";
import { StatCardSkeleton } from "@/components/ui/Skeleton";
import SalesChart from "@/components/dashboard/SalesChart";
import GenrePieChart from "@/components/dashboard/GenrePieChart";

function AdminOverview() {
  const api = useApi();
  const [stats, setStats] = useState(null);
  const [salesChart, setSalesChart] = useState([]);
  const [genreChart, setGenreChart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.get("/admin/stats"),
      api.get("/admin/sales-chart"),
      api.get("/admin/genre-chart"),
    ])
      .then(([s, sc, gc]) => {
        if (cancelled) return;
        setStats(s);
        setSalesChart(sc);
        setGenreChart(gc);
      })
      .catch((err) => toast.error(err instanceof ApiError ? err.message : "Failed to load analytics"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white md:text-3xl">Admin Overview</h1>
      <p className="mt-1 text-gray-400">Platform-wide analytics at a glance.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading || !stats ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Total Readers" value={stats.totalUsers} icon={FaUsers} />
            <StatCard label="Total Writers" value={stats.totalWriters} icon={FaFeatherAlt} accent="sky" />
            <StatCard label="Ebooks Sold" value={stats.totalEbooksSold} icon={FaBookOpen} accent="amber" />
            <StatCard
              label="Total Revenue"
              value={`$${stats.totalRevenue.toFixed(2)}`}
              icon={FaDollarSign}
              accent="emerald"
            />
          </>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {!loading && (
          <>
            <SalesChart data={salesChart} />
            <GenrePieChart data={genreChart} />
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <RequireRole role="admin">
      <AdminOverview />
    </RequireRole>
  );
}
