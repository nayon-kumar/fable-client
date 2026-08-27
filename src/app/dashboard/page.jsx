"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function DashboardIndexPage() {
  const { user, redirectPathForRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace(redirectPathForRole(user.role));
  }, [user, router, redirectPathForRole]);

  return <LoadingSpinner fullScreen size="lg" />;
}
