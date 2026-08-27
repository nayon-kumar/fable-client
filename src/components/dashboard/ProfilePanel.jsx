"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaCamera, FaFeatherAlt, FaSave } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import { uploadToImgbb } from "@/lib/imgbb";
import Badge from "@/components/ui/Badge";

export default function ProfilePanel() {
  const { user, refreshUser } = useAuth();
  const api = useApi();
  const [name, setName] = useState(user.name);
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState(user.photo || "");
  const [saving, setSaving] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let photoUrl = user.photo || "";
      if (photoFile) {
        photoUrl = await uploadToImgbb(photoFile);
      }
      await api.patch(`/users/profile/${user.email}`, { name, photo: photoUrl });
      await refreshUser();
      toast.success("Profile updated");
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : err?.message || "Could not update profile",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleBecomeWriter = async () => {
    setCheckingOut(true);
    try {
      const { url } = await api.post("/payments/checkout/writer-verification", {});
      window.location.href = url;
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not start checkout");
      setCheckingOut(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white md:text-3xl">Profile</h1>
      <p className="mt-1 text-gray-400">Manage your public profile information.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={onSave}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:col-span-2"
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  alt={name}
                  className="h-20 w-20 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-2xl font-semibold text-white">
                  {name?.[0]?.toUpperCase()}
                </div>
              )}
              <label className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-violet-600 text-white transition hover:bg-violet-700">
                <FaCamera className="text-xs" />
                <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} />
              </label>
            </div>
            <div>
              <p className="font-semibold text-white">{user.email}</p>
              <Badge variant="violet" className="mt-2">
                {user.role}
              </Badge>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-violet-500"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSave /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {user.role === "user" && (
          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 to-transparent p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600/20 text-lg text-violet-400">
              <FaFeatherAlt />
            </div>
            <h3 className="mt-4 font-semibold text-white">Become a Writer</h3>
            <p className="mt-2 text-sm text-gray-400">
              Complete a one-time verification payment to unlock your writer dashboard and start
              publishing.
            </p>
            <button
              onClick={handleBecomeWriter}
              disabled={checkingOut}
              className="mt-5 w-full rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkingOut ? "Redirecting..." : "Start Verification"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
