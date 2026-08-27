"use client";

import RequireRole from "@/components/auth/RequireRole";
import ProfilePanel from "@/components/dashboard/ProfilePanel";

export default function UserProfilePage() {
  return (
    <RequireRole role="user">
      <ProfilePanel />
    </RequireRole>
  );
}
