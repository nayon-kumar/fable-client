"use client";

import RequireRole from "@/components/auth/RequireRole";
import BookmarksGallery from "@/components/dashboard/BookmarksGallery";

export default function UserBookmarksPage() {
  return (
    <RequireRole role="user">
      <BookmarksGallery />
    </RequireRole>
  );
}
