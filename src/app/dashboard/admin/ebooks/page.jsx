"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaSearch, FaEye, FaEyeSlash, FaTrash, FaBook } from "react-icons/fa";
import RequireRole from "@/components/auth/RequireRole";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import { TableWrapper, Thead, Th, Tr, Td } from "@/components/ui/Table";
import { TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { genres } from "@/config/genres";

const LIMIT = 10;

const inputClass =
  "rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500";

function ManageEbooksAdmin() {
  const api = useApi();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);

  const [ebooks, setEbooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, genre]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get("/ebooks", { params: { search: debouncedSearch, genre, page, limit: LIMIT } })
      .then((data) => {
        if (cancelled) return;
        setEbooks(data.ebooks);
        setTotalPages(data.totalPages);
      })
      .catch((err) => toast.error(err instanceof ApiError ? err.message : "Failed to load ebooks"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, genre, page]);

  const toggleStatus = async (id) => {
    setTogglingId(id);
    try {
      const { status } = await api.patch(`/ebooks/status/${id}`, {});
      setEbooks((prev) => prev.filter((e) => (e._id === id ? status === "published" : true)));
      toast.success(`Ebook ${status}`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not update status");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/ebooks/${deleteTarget._id}`);
      setEbooks((prev) => prev.filter((e) => e._id !== deleteTarget._id));
      toast.success("Ebook deleted");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not delete ebook");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white md:text-3xl">Manage All Ebooks</h1>
      <p className="mt-1 text-gray-400">Moderate every published ebook on the platform.</p>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or writer..."
            className={`${inputClass} w-full pl-11`}
          />
        </div>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className={`${inputClass} sm:w-44`}>
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.name} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        {loading ? (
          <TableWrapper>
            <Thead>
              <tr>
                <Th>Ebook</Th>
                <Th>Writer</Th>
                <Th>Price</Th>
                <Th>Availability</Th>
                <Th>Actions</Th>
              </tr>
            </Thead>
            <tbody>
              <TableSkeleton rows={5} columns={5} />
            </tbody>
          </TableWrapper>
        ) : ebooks.length ? (
          <>
            <TableWrapper>
              <Thead>
                <tr>
                  <Th>Ebook</Th>
                  <Th>Writer</Th>
                  <Th>Price</Th>
                  <Th>Availability</Th>
                  <Th>Actions</Th>
                </tr>
              </Thead>
              <tbody>
                {ebooks.map((e) => (
                  <Tr key={e._id}>
                    <Td className="max-w-xs">
                      <Link
                        href={`/ebooks/${e._id}`}
                        className="flex items-center gap-3 font-medium text-white transition hover:text-violet-400"
                      >
                        <img src={e.coverImage} alt={e.title} className="h-10 w-8 rounded object-cover" />
                        <span className="line-clamp-1">{e.title}</span>
                      </Link>
                    </Td>
                    <Td>{e.writerName}</Td>
                    <Td>${e.price}</Td>
                    <Td>
                      <Badge variant={e.sold ? "danger" : "info"}>{e.sold ? "Sold" : "Available"}</Badge>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleStatus(e._id)}
                          disabled={togglingId === e._id}
                          title="Unpublish"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:border-violet-500 hover:text-white disabled:opacity-50"
                        >
                          <FaEyeSlash />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(e)}
                          title="Delete"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:border-rose-500 hover:text-rose-400"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </TableWrapper>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        ) : (
          <EmptyState icon={FaBook} title="No ebooks found" description="Try a different search or genre filter." />
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this ebook?"
        description={deleteTarget ? `"${deleteTarget.title}" will be permanently removed.` : ""}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default function ManageEbooksAdminPage() {
  return (
    <RequireRole role="admin">
      <ManageEbooksAdmin />
    </RequireRole>
  );
}
