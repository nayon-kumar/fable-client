import Link from "next/link";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeadset,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us | Fable",
  description:
    "Get in touch with the Fable team for support, feedback, or partnership inquiries.",
};

const contactInfo = [
  {
    icon: FaEnvelope,
    title: "Email",
    detail: "support@fable.com",
  },
  {
    icon: FaPhoneAlt,
    title: "Phone",
    detail: "+1 (555) 123-4567",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Office",
    detail: "221B Bookhaven Lane, NY",
  },
  {
    icon: FaHeadset,
    title: "Support Hours",
    detail: "Mon – Fri, 9am – 6pm",
  },
];

const socials = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

const faqs = [
  {
    q: "How do I become a writer on Fable?",
    a: "Register an account, choose the Writer role, and complete the one-time verification payment to unlock your writer dashboard.",
  },
  {
    q: "How are payments handled?",
    a: "All purchases and verification fees are processed securely through Stripe.",
  },
  {
    q: "I found a bug. Where do I report it?",
    a: "Send us a message using the form and we'll get back to you as soon as possible.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#050816] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            Contact Us
          </span>

          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            We&apos;d love to hear from you
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
            Questions, feedback, or partnership ideas — reach out and the
            Fable team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map(({ icon: Icon, title, detail }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:border-violet-500/40 hover:bg-white/[0.07]"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20 text-xl text-violet-400">
                <Icon />
              </div>

              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-gray-400">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold md:text-3xl">Send us a message</h2>
            <p className="mt-2 text-gray-400">
              Fill out the form below and we&apos;ll respond within 1–2 business
              days.
            </p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <h3 className="text-lg font-semibold">Quick Answers</h3>

              <div className="mt-5 space-y-5">
                {faqs.map((faq) => (
                  <div key={faq.q}>
                    <p className="font-medium text-white">{faq.q}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 text-center sm:p-8">
              <h3 className="text-lg font-semibold">Follow Fable</h3>
              <p className="mt-2 text-sm text-gray-400">
                Stay updated with new releases and writer spotlights.
              </p>

              <div className="mt-5 flex items-center justify-center gap-4">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="rounded-full border border-white/10 p-3 transition hover:border-violet-500 hover:text-violet-400"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-gray-400">
              Prefer email? Still browsing?{" "}
              <Link
                href="/browse-ebooks"
                className="text-violet-400 underline underline-offset-4 hover:text-violet-300"
              >
                Explore ebooks
              </Link>{" "}
              while you wait for a reply.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
