"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBookOpen,
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { dashboardNav, roleLabels } from "@/config/dashboardNav";

function SidebarContent({ navItems, pathname, role, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30">
          <FaBookOpen />
        </div>
        <span className="text-xl font-bold text-white">Fable</span>
      </Link>

      <div className="px-6 pb-4">
        <span className="inline-block rounded-full bg-violet-600/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-300">
          {roleLabels[role]} Dashboard
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="text-base" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          <FaHome /> Back to Site
        </Link>
      </div>
    </div>
  );
}

export default function DashboardShell({ children }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;
  const navItems = dashboardNav[user.role] || [];

  return (
    <div className="flex min-h-screen bg-[#050816] text-white">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#080813] lg:block">
        <SidebarContent navItems={navItems} pathname={pathname} role={user.role} />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative h-full w-72 bg-[#080813]">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-6 text-xl text-gray-400"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
            <SidebarContent
              navItems={navItems}
              pathname={pathname}
              role={user.role}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between gap-4 border-b border-white/10 bg-[#050816]/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-2xl text-white lg:hidden"
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          <div className="hidden lg:block">
            <p className="text-sm text-gray-400">Welcome back,</p>
            <p className="font-semibold text-white">{user.name}</p>
          </div>

          <div className="flex items-center gap-3">
            {user.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-rose-500/40 hover:text-rose-400"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
