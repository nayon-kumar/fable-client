import Link from "next/link";
import { FaHome, FaBookOpen } from "react-icons/fa";

export const metadata = {
  title: "Page Not Found | Fable",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#050816] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        {/* Illustration */}
        <svg
          viewBox="0 0 280 220"
          className="mx-auto h-48 w-auto sm:h-56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="140" cy="196" rx="90" ry="12" fill="url(#shadowGrad)" />

          <path
            d="M140 40 C 90 30, 40 45, 30 70 L 30 170 C 60 150, 100 150, 140 170 Z"
            fill="url(#pageGradL)"
            stroke="#a78bfa"
            strokeWidth="2"
          />
          <path
            d="M140 40 C 190 30, 240 45, 250 70 L 250 170 C 220 150, 180 150, 140 170 Z"
            fill="url(#pageGradR)"
            stroke="#a78bfa"
            strokeWidth="2"
          />
          <line x1="140" y1="40" x2="140" y2="170" stroke="#a78bfa" strokeWidth="2" />

          <line x1="45" y1="80" x2="120" y2="72" stroke="#c4b5fd" strokeWidth="2" opacity="0.6" />
          <line x1="45" y1="95" x2="120" y2="88" stroke="#c4b5fd" strokeWidth="2" opacity="0.5" />
          <line x1="45" y1="110" x2="120" y2="104" stroke="#c4b5fd" strokeWidth="2" opacity="0.4" />
          <line x1="235" y1="80" x2="160" y2="72" stroke="#c4b5fd" strokeWidth="2" opacity="0.6" />
          <line x1="235" y1="95" x2="160" y2="88" stroke="#c4b5fd" strokeWidth="2" opacity="0.5" />
          <line x1="235" y1="110" x2="160" y2="104" stroke="#c4b5fd" strokeWidth="2" opacity="0.4" />

          {/* Magnifying glass */}
          <circle cx="205" cy="60" r="26" fill="#050816" stroke="url(#ringGrad)" strokeWidth="4" />
          <line x1="224" y1="79" x2="244" y2="99" stroke="url(#ringGrad)" strokeWidth="6" strokeLinecap="round" />
          <text x="205" y="68" textAnchor="middle" fontSize="24" fontWeight="700" fill="#f5f3ff">
            ?
          </text>

          <circle cx="20" cy="30" r="2" fill="#a78bfa" opacity="0.7" />
          <circle cx="260" cy="140" r="2" fill="#818cf8" opacity="0.6" />
          <circle cx="250" cy="20" r="1.5" fill="#c4b5fd" opacity="0.8" />
          <circle cx="15" cy="160" r="1.5" fill="#a78bfa" opacity="0.5" />

          <defs>
            <linearGradient id="pageGradL" x1="30" y1="40" x2="140" y2="170" gradientUnits="userSpaceOnUse">
              <stop stopColor="#312e81" />
              <stop offset="1" stopColor="#1e1b4b" />
            </linearGradient>
            <linearGradient id="pageGradR" x1="250" y1="40" x2="140" y2="170" gradientUnits="userSpaceOnUse">
              <stop stopColor="#312e81" />
              <stop offset="1" stopColor="#1e1b4b" />
            </linearGradient>
            <linearGradient id="ringGrad" x1="180" y1="35" x2="245" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
            <radialGradient id="shadowGrad" cx="0.5" cy="0.5" r="0.5">
              <stop stopColor="#000000" stopOpacity="0.6" />
              <stop offset="1" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        <p className="mt-2 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-7xl font-bold text-transparent sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Page Not Found</h1>

        <p className="mx-auto mt-4 max-w-md text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist, may have been
          moved, or the link is broken. Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            <FaHome /> Back to Home
          </Link>

          <Link
            href="/browse-ebooks"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <FaBookOpen /> Browse Ebooks
          </Link>
        </div>
      </div>
    </main>
  );
}
