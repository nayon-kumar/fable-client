import Link from "next/link";
import {
  FaBookOpen,
  FaFeatherAlt,
  FaShieldAlt,
  FaBolt,
  FaUsers,
  FaGlobeAmericas,
  FaArrowRight,
} from "react-icons/fa";

export const metadata = {
  title: "About Us | Fable",
  description:
    "Learn about Fable, the digital platform connecting ebook lovers, readers, and collectors with talented writers.",
};

const stats = [
  { label: "Original Ebooks", value: "1,200+" },
  { label: "Active Writers", value: "300+" },
  { label: "Happy Readers", value: "10K+" },
  { label: "Genres", value: "12+" },
];

const values = [
  {
    icon: FaFeatherAlt,
    title: "Empower Writers",
    desc: "We give independent writers the tools to publish, price, and sell their original work directly to readers around the world.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure & Trustworthy",
    desc: "JWT-based authentication, verified writer onboarding, and Stripe-powered payments keep every transaction safe.",
  },
  {
    icon: FaBolt,
    title: "Fast & Modern",
    desc: "Built on the MERN stack with a streamlined reading experience, from discovery to checkout in just a few clicks.",
  },
  {
    icon: FaGlobeAmericas,
    title: "Open to Everyone",
    desc: "No bookstore or library required. Anyone, anywhere can discover and read original stories on Fable.",
  },
];

const roles = [
  {
    icon: FaBookOpen,
    title: "Readers",
    desc: "Browse a growing library of original ebooks, purchase securely via Stripe, and keep track of everything you've read.",
  },
  {
    icon: FaFeatherAlt,
    title: "Writers",
    desc: "Upload and manage your ebooks after a one-time verification, publish or unpublish anytime, and track your sales history.",
  },
  {
    icon: FaUsers,
    title: "Admins",
    desc: "Oversee the entire platform — manage users, moderate ebooks, and monitor every transaction from a single dashboard.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#050816] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            About Fable
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Where stories find their readers
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            Fable is a digital ebook sharing platform that connects readers
            and collectors with talented independent writers — democratizing
            access to literature, one story at a time.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/browse-ebooks"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Browse Ebooks <FaArrowRight />
            </Link>

            <Link
              href="/register"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Join as a Writer
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-violet-400 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-gray-400 md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold md:text-4xl">Our Story</h2>

        <p className="mt-6 leading-relaxed text-gray-300">
          Traditional ebook reading is often limited to bookstores or
          libraries, leaving countless emerging writers without a stage and
          readers with a narrow shelf to choose from. Fable was built to
          change that — a secure, streamlined platform where writers publish
          their original work and readers discover it, without the
          gatekeepers in between.
        </p>

        <p className="mt-4 leading-relaxed text-gray-300">
          From role-based dashboards to secure Stripe payments, every part of
          Fable is designed to make publishing and reading feel effortless,
          fair, and rewarding for everyone involved.
        </p>
      </section>

      {/* Values */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Why Fable</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              The principles that shape every feature we build.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-violet-500/40 hover:bg-white/[0.07]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20 text-xl text-violet-400">
                  <Icon />
                </div>

                <h3 className="mt-5 text-lg font-semibold">{title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Built for Everyone</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Whether you're here to read, write, or manage the platform, Fable
            has a place for you.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {roles.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-500 text-2xl text-white shadow-lg">
                <Icon />
              </div>

              <h3 className="mt-6 text-xl font-semibold">{title}</h3>

              <p className="mt-3 leading-relaxed text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to start your story?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Join Fable today as a reader or a writer and become part of a
            growing community of storytellers.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-white px-7 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              Get Started
            </Link>

            <Link
              href="/browse-ebooks"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Ebooks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
