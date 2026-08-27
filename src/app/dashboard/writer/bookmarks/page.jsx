"use client";

import RequireRole from "@/components/auth/RequireRole";
import BookmarksGallery from "@/components/dashboard/BookmarksGallery";

export default function WriterBookmarksPage() {
  return (
    <RequireRole role="writer">
      <BookmarksGallery />
    </RequireRole>
  );
}
