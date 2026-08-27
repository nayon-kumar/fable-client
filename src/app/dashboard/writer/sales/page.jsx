"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaMoneyBillWave } from "react-icons/fa";
import RequireRole from "@/components/auth/RequireRole";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import StatCard from "@/components/dashboard/StatCard";
import { TableWrapper, Thead, Th, Tr, Td } from "@/components/ui/Table";
import { TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

function SalesHistory() {
  const { user } = useAuth();
  const api = useApi();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/payments/sales/${user.email}`)
      .then((data) => !cancelled && setSales(data))
      .catch((err) => toast.error(err instanceof ApiError ? err.message : "Failed to load sales"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

  const totalRevenue = sales.reduce((sum, s) => sum + s.price, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white md:text-3xl">Sales History</h1>
      <p className="mt-1 text-gray-400">Every ebook you&apos;ve sold on Fable.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <StatCard label="Total Sales" value={sales.length} icon={FaMoneyBillWave} />
        <StatCard label="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={FaMoneyBillWave} accent="emerald" />
      </div>

      <div className="mt-8">
        {loading ? (
          <TableWrapper>
            <Thead>
              <tr>
                <Th>Ebook</Th>
                <Th>Buyer</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
              </tr>
            </Thead>
            <tbody>
              <TableSkeleton rows={4} columns={4} />
            </tbody>
          </TableWrapper>
        ) : sales.length ? (
          <TableWrapper>
            <Thead>
              <tr>
                <Th>Ebook</Th>
                <Th>Buyer</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
              </tr>
            </Thead>
            <tbody>
              {sales.map((s) => (
                <Tr key={s._id}>
                  <Td className="max-w-xs">
                    <Link
                      href={`/ebooks/${s.ebookId}`}
                      className="flex items-center gap-3 font-medium text-white transition hover:text-violet-400"
                    >
                      <img src={s.coverImage} alt={s.ebookTitle} className="h-10 w-8 rounded object-cover" />
                      <span className="line-clamp-1">{s.ebookTitle}</span>
                    </Link>
                  </Td>
                  <Td>{s.buyerEmail}</Td>
                  <Td className="text-emerald-400">${s.price}</Td>
                  <Td>{new Date(s.purchaseDate).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </tbody>
          </TableWrapper>
        ) : (
          <EmptyState
            icon={FaMoneyBillWave}
            title="No sales yet"
            description="Once readers start purchasing your ebooks, they'll show up here."
          />
        )}
      </div>
    </div>
  );
}

export default function WriterSalesPage() {
  return (
    <RequireRole role="writer">
      <SalesHistory />
    </RequireRole>
  );
}
