"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="flex min-h-screen items-center justify-center bg-[#050816] px-4 text-white antialiased"
      >
        <div className="mx-auto max-w-md text-center">
          <p className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-6xl font-bold text-transparent">
            Fable
          </p>

          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
            Something went wrong.
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-gray-400">
            A critical error occurred and the application couldn&apos;t
            recover. Please reload the page.
          </p>

          <button
            onClick={() => reset()}
            className="mt-8 rounded-full bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
