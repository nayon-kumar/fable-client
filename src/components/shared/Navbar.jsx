"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-500 text-xl font-bold text-white shadow-lg">
            F
          </div>

          <span className="text-2xl font-bold text-white">Fable</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
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

          <button className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-white transition hover:bg-white/10">
            Browse Books
          </button>

          <div className="h-8 w-px bg-white/10" />

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
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-white md:hidden"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#050816] md:hidden">
          <ul className="flex flex-col gap-5 p-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block transition ${
                    isActive(item.href)
                      ? "text-violet-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 px-6 pb-6">
            <button className="rounded-full border border-white/10 bg-white/5 py-3 text-white">
              Browse Books
            </button>

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
          </div>
        </div>
      )}
    </header>
  );
}
