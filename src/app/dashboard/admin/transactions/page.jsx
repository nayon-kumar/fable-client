"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaExchangeAlt } from "react-icons/fa";
import RequireRole from "@/components/auth/RequireRole";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import { TableWrapper, Thead, Th, Tr, Td } from "@/components/ui/Table";
import { TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";

const LIMIT = 10;

const inputClass =
  "rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500";

function Transactions() {
  const api = useApi();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, type]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get("/transactions", { params: { search: debouncedSearch, type, page, limit: LIMIT } })
      .then((data) => {
        if (cancelled) return;
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      })
      .catch((err) => toast.error(err instanceof ApiError ? err.message : "Failed to load transactions"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, type, page]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white md:text-3xl">Transactions</h1>
      <p className="mt-1 text-gray-400">Every payment processed through Fable.</p>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email..."
            className={`${inputClass} w-full pl-11`}
          />
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)} className={`${inputClass} sm:w-48`}>
          <option value="">All Types</option>
          <option value="purchase">Ebook Purchase</option>
          <option value="publishing_fee">Writer Verification</option>
        </select>
      </div>

      <div className="mt-6">
        {loading ? (
          <TableWrapper>
            <Thead>
              <tr>
                <Th>Transaction ID</Th>
                <Th>Type</Th>
                <Th>Email</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
              </tr>
            </Thead>
            <tbody>
              <TableSkeleton rows={5} columns={5} />
            </tbody>
          </TableWrapper>
        ) : transactions.length ? (
          <>
            <TableWrapper>
              <Thead>
                <tr>
                  <Th>Transaction ID</Th>
                  <Th>Type</Th>
                  <Th>Email</Th>
                  <Th>Amount</Th>
                  <Th>Date</Th>
                </tr>
              </Thead>
              <tbody>
                {transactions.map((t) => (
                  <Tr key={t._id}>
                    <Td className="max-w-[160px] truncate font-mono text-xs text-gray-400">
                      {t.transactionId}
                    </Td>
                    <Td>
                      <Badge variant={t.type === "purchase" ? "violet" : "success"}>
                        {t.type === "purchase" ? "Ebook Purchase" : "Writer Verification"}
                      </Badge>
                    </Td>
                    <Td>{t.email}</Td>
                    <Td className="text-emerald-400">${t.amount}</Td>
                    <Td>{new Date(t.date).toLocaleDateString()}</Td>
                  </Tr>
                ))}
              </tbody>
            </TableWrapper>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        ) : (
          <EmptyState
            icon={FaExchangeAlt}
            title="No transactions found"
            description="Try a different search or type filter."
          />
        )}
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <RequireRole role="admin">
      <Transactions />
    </RequireRole>
  );
}
