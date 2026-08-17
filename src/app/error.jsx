"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaRedo, FaHome } from "react-icons/fa";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center bg-[#050816] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        {/* Illustration */}
        <svg
          viewBox="0 0 280 220"
          className="mx-auto h-48 w-auto sm:h-56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="140" cy="196" rx="90" ry="12" fill="url(#eShadowGrad)" />

          <path
            d="M140 40 C 90 30, 40 45, 30 70 L 30 170 C 60 150, 100 150, 140 170 Z"
            fill="url(#ePageGradL)"
            stroke="#a78bfa"
            strokeWidth="2"
          />
          <path
            d="M140 40 C 190 30, 240 45, 250 70 L 250 170 C 220 150, 180 150, 140 170 Z"
            fill="url(#ePageGradR)"
            stroke="#a78bfa"
            strokeWidth="2"
          />

          {/* Cracked spine */}
          <path
            d="M140 40 L 132 70 L 148 90 L 130 118 L 150 145 L 140 170"
            fill="none"
            stroke="#fb7185"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          <line x1="45" y1="80" x2="118" y2="72" stroke="#c4b5fd" strokeWidth="2" opacity="0.5" />
          <line x1="45" y1="95" x2="118" y2="88" stroke="#c4b5fd" strokeWidth="2" opacity="0.4" />
          <line x1="235" y1="80" x2="162" y2="72" stroke="#c4b5fd" strokeWidth="2" opacity="0.5" />
          <line x1="235" y1="95" x2="162" y2="88" stroke="#c4b5fd" strokeWidth="2" opacity="0.4" />

          {/* Warning badge */}
          <circle cx="205" cy="58" r="28" fill="#050816" stroke="url(#eRingGrad)" strokeWidth="4" />
          <path d="M205 46 L205 62" stroke="#fda4af" strokeWidth="4" strokeLinecap="round" />
          <circle cx="205" cy="70" r="2.4" fill="#fda4af" />

          <circle cx="20" cy="30" r="2" fill="#a78bfa" opacity="0.7" />
          <circle cx="260" cy="140" r="2" fill="#fb7185" opacity="0.5" />
          <circle cx="250" cy="20" r="1.5" fill="#c4b5fd" opacity="0.8" />
          <circle cx="15" cy="160" r="1.5" fill="#a78bfa" opacity="0.5" />

          <defs>
            <linearGradient id="ePageGradL" x1="30" y1="40" x2="140" y2="170" gradientUnits="userSpaceOnUse">
              <stop stopColor="#312e81" />
              <stop offset="1" stopColor="#1e1b4b" />
            </linearGradient>
            <linearGradient id="ePageGradR" x1="250" y1="40" x2="140" y2="170" gradientUnits="userSpaceOnUse">
              <stop stopColor="#312e81" />
              <stop offset="1" stopColor="#1e1b4b" />
            </linearGradient>
            <linearGradient id="eRingGrad" x1="180" y1="33" x2="245" y2="98" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fb7185" />
              <stop offset="1" stopColor="#f43f5e" />
            </linearGradient>
            <radialGradient id="eShadowGrad" cx="0.5" cy="0.5" r="0.5">
              <stop stopColor="#000000" stopOpacity="0.6" />
              <stop offset="1" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          Something went wrong.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-gray-400">
          We hit an unexpected error while loading this page. It&apos;s not
          you, it&apos;s us — please try again.
        </p>

        {process.env.NODE_ENV === "development" && error?.message && (
          <pre className="mx-auto mt-6 max-w-lg overflow-x-auto rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-left text-xs text-rose-300">
            {error.message}
          </pre>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            <FaRedo /> Reload
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <FaHome /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
