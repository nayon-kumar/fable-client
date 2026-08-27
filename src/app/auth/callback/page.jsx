"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function GoogleCallbackPage() {
  const { data, isPending, error } = useSession();
  const { loginWithGoogle } = useAuth();
  const router = useRouter();
  const handled = useRef(false);

  useEffect(() => {
    if (isPending || handled.current) return;
    handled.current = true;

    if (error || !data?.user) {
      toast.error("Google sign-in failed. Please try again.");
      router.replace("/login");
      return;
    }

    const { name, email, image } = data.user;

    loginWithGoogle({ name, email, photo: image }).catch(() => {
      toast.error("Could not complete Google sign-in. Please try again.");
      router.replace("/login");
    });
  }, [isPending, data, error, loginWithGoogle, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816]">
      <LoadingSpinner size="lg" label="Signing you in with Google..." />
    </div>
  );
}
