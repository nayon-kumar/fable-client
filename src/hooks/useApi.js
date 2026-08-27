"use client";

import { useMemo } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export function useApi() {
  const { token } = useAuth();

  return useMemo(
    () => ({
      get: (path, opts) => api.get(path, { ...opts, token }),
      post: (path, body, opts) => api.post(path, body, { ...opts, token }),
      patch: (path, body, opts) => api.patch(path, body, { ...opts, token }),
      delete: (path, opts) => api.delete(path, { ...opts, token }),
    }),
    [token],
  );
}
