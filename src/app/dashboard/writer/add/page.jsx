"use client";

import RequireRole from "@/components/auth/RequireRole";
import EbookForm from "@/components/dashboard/EbookForm";

export default function AddEbookPage() {
  return (
    <RequireRole role="writer">
      <div>
        <h1 className="text-2xl font-bold text-white md:text-3xl">Add Ebook</h1>
        <p className="mb-8 mt-1 text-gray-400">Publish a new ebook to your catalog.</p>
        <EbookForm mode="add" />
      </div>
    </RequireRole>
  );
}
