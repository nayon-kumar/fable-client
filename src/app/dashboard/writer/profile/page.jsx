"use client";

import RequireRole from "@/components/auth/RequireRole";
import ProfilePanel from "@/components/dashboard/ProfilePanel";

export default function WriterProfilePage() {
  return (
    <RequireRole role="writer">
      <ProfilePanel />
    </RequireRole>
  );
}
