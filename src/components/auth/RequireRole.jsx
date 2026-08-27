"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function RequireRole({ role, children }) {
  const { user, redirectPathForRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== role) {
      router.replace(redirectPathForRole(user.role));
    }
  }, [user, role, router, redirectPathForRole]);

  if (!user || user.role !== role) {
    return <LoadingSpinner fullScreen size="lg" />;
  }

  return children;
}
