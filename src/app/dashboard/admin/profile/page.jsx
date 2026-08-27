"use client";

import RequireRole from "@/components/auth/RequireRole";
import ProfilePanel from "@/components/dashboard/ProfilePanel";

export default function AdminProfilePage() {
  return (
    <RequireRole role="admin">
      <ProfilePanel />
    </RequireRole>
  );
}
