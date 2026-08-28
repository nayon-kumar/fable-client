"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext(null);
const TOKEN_KEY = "fable_token";

function redirectPathForRole(role) {
  if (role === "writer") return "/dashboard/writer";
  if (role === "admin") return "/dashboard/admin";
  return "/dashboard/user";
}

function loginRedirectPath(role) {
  if (role === "writer") return "/dashboard/writer";
  if (role === "admin") return "/dashboard/admin";
  return "/";
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadUser = useCallback(async (currentToken) => {
    try {
      const me = await api.get("/auth/me", { token: currentToken });
      setUser(me);
      return me;
    } catch {
      window.localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(TOKEN_KEY);
    if (stored) {
      setToken(stored);
      loadUser(stored).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [loadUser]);

  const persistAuth = (nextToken, nextUser) => {
    window.localStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setUser(nextUser);
  };

  const register = async ({ name, email, password, role }) => {
    const data = await api.post("/auth/register", { name, email, password, role });
    persistAuth(data.token, data.user);
    return data;
  };

  const login = async ({ email, password }) => {
    const data = await api.post("/auth/login", { email, password });
    persistAuth(data.token, data.user);
    router.push(loginRedirectPath(data.user.role));
    return data;
  };

  const loginWithGoogle = async ({ name, email, photo }) => {
    const data = await api.post("/auth/google", { name, email, photo });
    persistAuth(data.token, data.user);
    router.push(loginRedirectPath(data.user.role));
    return data;
  };

  const logout = async () => {
    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    try {
      await authClient.signOut();
    } catch {
      // no BetterAuth session to clear — ignore
    }
    router.push("/login");
  };

  const refreshUser = useCallback(() => {
    if (!token) return Promise.resolve(null);
    return loadUser(token);
  }, [token, loadUser]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    loginWithGoogle,
    logout,
    refreshUser,
    redirectPathForRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
