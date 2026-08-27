"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaTrash, FaUsersCog } from "react-icons/fa";
import RequireRole from "@/components/auth/RequireRole";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import { TableWrapper, Thead, Th, Tr, Td } from "@/components/ui/Table";
import { TableSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const LIMIT = 10;

const inputClass =
  "rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500";

function ManageUsers() {
  const { user: currentUser } = useAuth();
  const api = useApi();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, role]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get("/users", { params: { search: debouncedSearch, role, page, limit: LIMIT } })
      .then((data) => {
        if (cancelled) return;
        setUsers(data.users);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      })
      .catch((err) => toast.error(err instanceof ApiError ? err.message : "Failed to load users"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, role, page]);

  const handleRoleChange = async (id, newRole) => {
    setUpdatingId(id);
    try {
      await api.patch(`/users/role/${id}`, { role: newRole });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role: newRole } : u)));
      toast.success("Role updated");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/users/${deleteTarget._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
      setTotal((t) => Math.max(0, t - 1));
      toast.success("User deleted");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not delete user");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white md:text-3xl">Manage Users</h1>
      <p className="mt-1 text-gray-400">View, promote, or remove platform members.</p>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className={`${inputClass} w-full pl-11`}
          />
        </div>
        <select value={role} onChange={(e) => setRole(e.target.value)} className={`${inputClass} sm:w-44`}>
          <option value="" className="bg-gray-900 text-white">
            All Roles
          </option>
          <option value="user" className="bg-gray-900 text-white">
            Reader
          </option>
          <option value="writer" className="bg-gray-900 text-white">
            Writer
          </option>
          <option value="admin" className="bg-gray-900 text-white">
            Admin
          </option>
        </select>
      </div>

      <div className="mt-6">
        {loading ? (
          <TableWrapper>
            <Thead>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Joined</Th>
                <Th>Actions</Th>
              </tr>
            </Thead>
            <tbody>
              <TableSkeleton rows={5} columns={5} />
            </tbody>
          </TableWrapper>
        ) : users.length ? (
          <>
            <TableWrapper>
              <Thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Joined</Th>
                  <Th>Actions</Th>
                </tr>
              </Thead>
              <tbody>
                {users.map((u) => {
                  const isSelf = u.email === currentUser.email;
                  return (
                    <Tr key={u._id}>
                      <Td className="font-medium text-white">
                        <div className="flex items-center gap-3">
                          {u.photo ? (
                            <img src={u.photo} alt={u.name} className="h-8 w-8 rounded-full object-cover" />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                              {u.name?.[0]?.toUpperCase()}
                            </div>
                          )}
                          {u.name} {isSelf && <span className="text-xs text-gray-500">(You)</span>}
                        </div>
                      </Td>
                      <Td>{u.email}</Td>
                      <Td>
                        <select
                          value={u.role}
                          disabled={isSelf || updatingId === u._id}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="rounded-lg border border-white/10 bg-[#0b0b14] px-2.5 py-1.5 text-xs font-medium text-white outline-none focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="user" className="bg-gray-900 text-white">
                            Reader
                          </option>
                          <option value="writer" className="bg-gray-900 text-white">
                            Writer
                          </option>
                          <option value="admin" className="bg-gray-900 text-white">
                            Admin
                          </option>
                        </select>
                      </Td>
                      <Td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</Td>
                      <Td>
                        <button
                          onClick={() => setDeleteTarget(u)}
                          disabled={isSelf}
                          title="Delete user"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:border-rose-500 hover:text-rose-400 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <FaTrash />
                        </button>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </TableWrapper>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        ) : (
          <EmptyState icon={FaUsersCog} title="No users found" description="Try a different search or role filter." />
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this user?"
        description={
          deleteTarget ? `${deleteTarget.name} (${deleteTarget.email}) will be permanently removed.` : ""
        }
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default function ManageUsersPage() {
  return (
    <RequireRole role="admin">
      <ManageUsers />
    </RequireRole>
  );
}
