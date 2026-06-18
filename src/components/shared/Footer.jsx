"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-500 text-xl font-bold text-white">
                F
              </div>

              <h2 className="text-2xl font-bold text-white">Fable</h2>
            </div>

            <p className="leading-relaxed text-gray-400">
              Discover, read, and share original ebooks from talented writers
              around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-violet-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/browse-ebooks"
                  className="hover:text-violet-400 transition"
                >
                  Browse Ebooks
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-violet-400 transition"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Information
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="hover:text-violet-400 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-violet-400 transition"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-violet-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Newsletter
            </h3>

            <p className="mb-4 text-gray-400">
              Subscribe to get updates about new ebooks and writers.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
              />

              <button className="rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Fable. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="rounded-full border border-white/10 p-3 transition hover:border-violet-500 hover:text-violet-400"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="rounded-full border border-white/10 p-3 transition hover:border-violet-500 hover:text-violet-400"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="rounded-full border border-white/10 p-3 transition hover:border-violet-500 hover:text-violet-400"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="rounded-full border border-white/10 p-3 transition hover:border-violet-500 hover:text-violet-400"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
