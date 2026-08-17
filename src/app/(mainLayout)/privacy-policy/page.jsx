import Link from "next/link";
import {
  FaUserShield,
  FaDatabase,
  FaCreditCard,
  FaCookieBite,
  FaShareAlt,
  FaLock,
  FaUserEdit,
  FaEnvelope,
} from "react-icons/fa";

export const metadata = {
  title: "Privacy Policy | Fable",
  description:
    "Learn how Fable collects, uses, and protects your personal information across our ebook sharing platform.",
};

const sections = [
  {
    icon: FaDatabase,
    title: "1. Information We Collect",
    body: (
      <>
        <p>When you use Fable, we may collect the following information:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="text-white">Account information</span> — full
            name, email address, and password (or Google profile details if
            you sign in with Google).
          </li>
          <li>
            <span className="text-white">Profile & role data</span> —
            whether you register as a Reader or Writer, and any profile
            picture you upload.
          </li>
          <li>
            <span className="text-white">Content data</span> — ebook
            details, cover images, descriptions, and pricing submitted by
            writers.
          </li>
          <li>
            <span className="text-white">Transaction data</span> — purchase
            history, sales records, and payment confirmations processed via
            Stripe.
          </li>
          <li>
            <span className="text-white">Usage data</span> — pages visited,
            bookmarks, and reading history within your account.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: FaUserShield,
    title: "2. How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Create and manage your Reader, Writer, or Admin account.</li>
          <li>
            Authenticate you securely using JWT tokens and, where selected,
            Google OAuth.
          </li>
          <li>Process ebook purchases and writer verification payments.</li>
          <li>
            Display your published ebooks, sales history, and purchase
            history within your dashboard.
          </li>
          <li>
            Send essential account and transaction notifications, and, if you
            opt in, newsletter updates.
          </li>
          <li>Improve platform performance, security, and features.</li>
        </ul>
      </>
    ),
  },
  {
    icon: FaCreditCard,
    title: "3. Payments",
    body: (
      <p>
        All payments on Fable — including ebook purchases and one-time writer
        verification fees — are processed securely through{" "}
        <span className="text-white">Stripe</span>. Fable does not store
        your full card details on its own servers; Stripe handles all
        sensitive payment information in accordance with PCI-DSS standards.
        We only retain transaction metadata such as amount, date, and status
        to maintain your purchase and sales history.
      </p>
    ),
  },
  {
    icon: FaShareAlt,
    title: "4. Third-Party Services",
    body: (
      <>
        <p>Fable relies on trusted third-party services to operate:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="text-white">Stripe</span> — payment processing
            for purchases and verification fees.
          </li>
          <li>
            <span className="text-white">imgBB</span> — hosting for ebook
            cover images and profile pictures.
          </li>
          <li>
            <span className="text-white">Google OAuth (via BetterAuth)</span>{" "}
            — optional social login.
          </li>
        </ul>
        <p className="mt-3">
          These providers only receive the information necessary to perform
          their function and maintain their own privacy and security
          practices.
        </p>
      </>
    ),
  },
  {
    icon: FaCookieBite,
    title: "5. Cookies & Session Data",
    body: (
      <p>
        Fable uses cookies and local storage to keep you signed in, remember
        your preferences, and maintain a secure session. Disabling cookies in
        your browser may limit certain features, such as staying logged in
        across visits.
      </p>
    ),
  },
  {
    icon: FaLock,
    title: "6. Data Security",
    body: (
      <p>
        We take reasonable technical and organizational measures to protect
        your data, including password hashing, JWT-based authentication, and
        environment-secured credentials for our database and API keys.
        However, no method of transmission or storage is 100% secure, and we
        cannot guarantee absolute security.
      </p>
    ),
  },
  {
    icon: FaUserEdit,
    title: "7. Your Rights & Choices",
    body: (
      <>
        <p>You have the right to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Access and review the personal information on your profile.</li>
          <li>Request correction of inaccurate account details.</li>
          <li>
            Request deletion of your account and associated data, subject to
            transaction records we are required to retain.
          </li>
          <li>Unsubscribe from newsletter emails at any time.</li>
        </ul>
      </>
    ),
  },
  {
    icon: FaEnvelope,
    title: "8. Contact Us",
    body: (
      <p>
        If you have questions about this Privacy Policy or how your data is
        handled, please reach out through our{" "}
        <Link
          href="/contact"
          className="text-violet-400 underline underline-offset-4 hover:text-violet-300"
        >
          Contact page
        </Link>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#050816] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            Legal
          </span>

          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
            Your trust matters to us. Here's how Fable collects, uses, and
            protects your information.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Last updated: August 17, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-violet-500/40 sm:p-8 ${
                title === "8. Contact Us" ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-lg text-violet-400">
                  <Icon />
                </div>

                <h2 className="text-xl font-semibold">{title}</h2>
              </div>

              <div className="mt-4 leading-relaxed text-gray-300">
                {body}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-gray-400">
          By using Fable, you agree to the terms outlined in this Privacy
          Policy. We may update this policy from time to time, and continued
          use of the platform constitutes acceptance of any changes.
        </div>
      </section>
    </div>
  );
}
