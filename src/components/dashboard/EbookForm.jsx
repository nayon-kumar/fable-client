"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaSave } from "react-icons/fa";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/api";
import { uploadToImgbb } from "@/lib/imgbb";
import { genres } from "@/config/genres";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500";

export default function EbookForm({ mode = "add", ebookId, initialValues }) {
  const api = useApi();
  const router = useRouter();
  const [values, setValues] = useState(
    initialValues || { title: "", description: "", price: "", genre: "", coverImage: "" },
  );
  const [coverFile, setCoverFile] = useState(null);
  const [preview, setPreview] = useState(initialValues?.coverImage || "");
  const [submitting, setSubmitting] = useState(false);

  const set = (patch) => setValues((v) => ({ ...v, ...patch }));

  const onCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let coverImage = values.coverImage;
      if (coverFile) {
        coverImage = await uploadToImgbb(coverFile);
      }
      if (!coverImage) {
        toast.error("Please upload a cover image");
        setSubmitting(false);
        return;
      }

      const payload = { ...values, coverImage, price: Number(values.price) };

      if (mode === "add") {
        await api.post("/ebooks", payload);
        toast.success("Ebook published!");
      } else {
        await api.patch(`/ebooks/${ebookId}`, payload);
        toast.success("Ebook updated!");
      }
      router.push("/dashboard/writer");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
    >
      <div>
        <label className="text-sm font-medium text-gray-300">Cover Image</label>
        <div className="mt-2 flex items-center gap-5">
          <div className="flex h-32 w-24 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
            {preview ? (
              <img src={preview} alt="Cover preview" className="h-full w-full object-cover" />
            ) : (
              <FaCloudUploadAlt className="text-2xl text-gray-500" />
            )}
          </div>
          <label className="cursor-pointer rounded-full border border-white/10 px-5 py-2.5 text-sm text-gray-300 transition hover:border-violet-500 hover:text-white">
            Choose Image
            <input type="file" accept="image/*" className="hidden" onChange={onCoverChange} />
          </label>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">Title</label>
        <input
          required
          value={values.title}
          onChange={(e) => set({ title: e.target.value })}
          placeholder="Ebook title"
          className={`${inputClass} mt-2`}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-300">Genre</label>
          <select
            required
            value={values.genre}
            onChange={(e) => set({ genre: e.target.value })}
            className={`${inputClass} mt-2`}
          >
            <option value="" className="bg-gray-900 text-white">
              Select a genre
            </option>
            {genres.map((g) => (
              <option key={g.name} value={g.name} className="bg-gray-900 text-white">
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">Price (USD)</label>
          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={values.price}
            onChange={(e) => set({ price: e.target.value })}
            placeholder="9.99"
            className={`${inputClass} mt-2`}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">Description (Full Content)</label>
        <textarea
          required
          rows={10}
          value={values.description}
          onChange={(e) => set({ description: e.target.value })}
          placeholder="Write your ebook's full content here..."
          className={`${inputClass} mt-2 resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FaSave /> {submitting ? "Saving..." : mode === "add" ? "Publish Ebook" : "Save Changes"}
      </button>
    </form>
  );
}
