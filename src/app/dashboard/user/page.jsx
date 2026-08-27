"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaShoppingBag, FaDollarSign, FaFeatherAlt, FaArrowRight } from "react-icons/fa";
import RequireRole from "@/components/auth/RequireRole";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import StatCard from "@/components/dashboard/StatCard";
import { TableWrapper, Thead, Th, Tr, Td } from "@/components/ui/Table";
import { TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

function UserOverview() {
  const { user } = useAuth();
  const api = useApi();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/payments/purchases/${user.email}`)
      .then((data) => !cancelled && setPurchases(data))
      .catch((err) => toast.error(err instanceof ApiError ? err.message : "Failed to load purchases"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

  const totalSpent = purchases.reduce((sum, p) => sum + p.price, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">Purchase History</h1>
          <p className="mt-1 text-gray-400">Every ebook you&apos;ve bought on Fable.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Ebooks Purchased" value={purchases.length} icon={FaShoppingBag} />
        <StatCard label="Total Spent" value={`$${totalSpent.toFixed(2)}`} icon={FaDollarSign} accent="emerald" />
        <div className="flex flex-col justify-between rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 to-transparent p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/20 text-lg text-violet-400">
              <FaFeatherAlt />
            </div>
            <p className="font-semibold text-white">Become a Writer</p>
          </div>
          <Link
            href="/dashboard/user/profile"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition hover:text-violet-200"
          >
            Complete verification <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <TableWrapper>
            <Thead>
              <tr>
                <Th>Ebook</Th>
                <Th>Writer</Th>
                <Th>Price</Th>
                <Th>Purchase Date</Th>
                <Th>Status</Th>
              </tr>
            </Thead>
            <tbody>
              <TableSkeleton rows={4} columns={5} />
            </tbody>
          </TableWrapper>
        ) : purchases.length ? (
          <TableWrapper>
            <Thead>
              <tr>
                <Th>Ebook</Th>
                <Th>Writer</Th>
                <Th>Price</Th>
                <Th>Purchase Date</Th>
                <Th>Status</Th>
              </tr>
            </Thead>
            <tbody>
              {purchases.map((p) => (
                <Tr key={p._id}>
                  <Td className="max-w-xs">
                    <Link
                      href={`/ebooks/${p.ebookId}`}
                      className="flex items-center gap-3 font-medium text-white transition hover:text-violet-400"
                    >
                      <img
                        src={p.coverImage}
                        alt={p.ebookTitle}
                        className="h-10 w-8 rounded object-cover"
                      />
                      <span className="line-clamp-1">{p.ebookTitle}</span>
                    </Link>
                  </Td>
                  <Td>{p.writerName}</Td>
                  <Td>${p.price}</Td>
                  <Td>{new Date(p.purchaseDate).toLocaleDateString()}</Td>
                  <Td>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      Completed
                    </span>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </TableWrapper>
        ) : (
          <EmptyState
            icon={FaShoppingBag}
            title="No purchases yet"
            description="Browse the library and buy your first ebook."
            action={
              <Link
                href="/browse-ebooks"
                className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Browse Ebooks
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}

export default function UserDashboardPage() {
  return (
    <RequireRole role="user">
      <UserOverview />
    </RequireRole>
  );
}
