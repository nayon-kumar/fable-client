"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FaBookOpen, FaChevronDown, FaSignOutAlt, FaTachometerAlt, FaUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, logout, redirectPathForRole } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Browse Ebooks", href: "/browse-ebooks" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl text-white shadow-lg shadow-violet-500/30">
            <FaBookOpen />
          </div>

          <span className="text-2xl font-bold text-white">Fable</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`transition ${
                    isActive(item.href)
                      ? "text-violet-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-8 w-px bg-white/10" />

          {loading ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-white/5" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 transition hover:border-violet-500/40"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <span className="max-w-[110px] truncate text-sm font-medium text-white">
                  {user.name}
                </span>
                <FaChevronDown className="text-xs text-gray-400" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b14] py-2 shadow-2xl">
                  <div className="border-b border-white/10 px-4 py-3">
                    <p className="truncate text-sm font-medium text-white">{user.name}</p>
                    <p className="truncate text-xs text-gray-400">{user.email}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-violet-600/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-300">
                      {user.role}
                    </span>
                  </div>
                  <Link
                    href={redirectPathForRole(user.role)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <FaTachometerAlt /> Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-rose-400 transition hover:bg-rose-500/10"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-white px-7 py-3 font-semibold text-black transition hover:bg-gray-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-white md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#050816] md:hidden">
          <ul className="flex flex-col gap-5 p-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block transition ${
                    isActive(item.href)
                      ? "text-violet-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 px-6 pb-6">
            {user ? (
              <>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="h-9 w-9 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{user.name}</p>
                    <p className="truncate text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="rounded-full border border-rose-500/30 bg-rose-500/10 py-3 text-rose-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-center font-medium text-violet-400"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-white py-3 text-center font-semibold text-black"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
