"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaBook } from "react-icons/fa";
import RequireRole from "@/components/auth/RequireRole";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import { TableWrapper, Thead, Th, Tr, Td } from "@/components/ui/Table";
import { TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

function ManageEbooks() {
  const { user } = useAuth();
  const api = useApi();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/ebooks/writer/${user.email}`)
      .then((data) => !cancelled && setEbooks(data))
      .catch((err) => toast.error(err instanceof ApiError ? err.message : "Failed to load ebooks"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

  const toggleStatus = async (id) => {
    setTogglingId(id);
    try {
      const { status } = await api.patch(`/ebooks/status/${id}`, {});
      setEbooks((prev) => prev.map((e) => (e._id === id ? { ...e, status } : e)));
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">Manage Ebooks</h1>
          <p className="mt-1 text-gray-400">Publish, edit, and track your catalog.</p>
        </div>
        <Link
          href="/dashboard/writer/add"
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          <FaPlus /> Add Ebook
        </Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <TableWrapper>
            <Thead>
              <tr>
                <Th>Ebook</Th>
                <Th>Price</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </Thead>
            <tbody>
              <TableSkeleton rows={4} columns={4} />
            </tbody>
          </TableWrapper>
        ) : ebooks.length ? (
          <TableWrapper>
            <Thead>
              <tr>
                <Th>Ebook</Th>
                <Th>Price</Th>
                <Th>Status</Th>
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
                  <Td>${e.price}</Td>
                  <Td>
                    <Badge variant={e.status === "published" ? "success" : "neutral"}>
                      {e.status}
                    </Badge>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleStatus(e._id)}
                        disabled={togglingId === e._id}
                        title={e.status === "published" ? "Unpublish" : "Publish"}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:border-violet-500 hover:text-white disabled:opacity-50"
                      >
                        {e.status === "published" ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <Link
                        href={`/dashboard/writer/edit/${e._id}`}
                        title="Edit"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:border-violet-500 hover:text-white"
                      >
                        <FaEdit />
                      </Link>
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
        ) : (
          <EmptyState
            icon={FaBook}
            title="No ebooks yet"
            description="Publish your first ebook to start selling."
            action={
              <Link
                href="/dashboard/writer/add"
                className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Add Ebook
              </Link>
            }
          />
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this ebook?"
        description={
          deleteTarget ? `"${deleteTarget.title}" will be permanently removed. This can't be undone.` : ""
        }
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default function WriterDashboardPage() {
  return (
    <RequireRole role="writer">
      <ManageEbooks />
    </RequireRole>
  );
}
