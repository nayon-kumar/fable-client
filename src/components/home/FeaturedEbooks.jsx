import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import EbookCard from "@/components/ebooks/EbookCard";
import EmptyState from "@/components/ui/EmptyState";

export default function FeaturedEbooks({ ebooks }) {
  return (
    <section className="bg-[#050816] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
              Fresh Off the Press
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Featured Ebooks
            </h2>
          </div>

          <Link
            href="/browse-ebooks"
            className="inline-flex items-center gap-2 font-medium text-violet-400 transition hover:text-violet-300"
          >
            Browse all ebooks <FaArrowRight />
          </Link>
        </div>

        <div className="mt-12">
          {ebooks.length ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {ebooks.map((ebook, i) => (
                <EbookCard key={ebook._id} ebook={ebook} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No ebooks published yet"
              description="Check back soon — new stories are added regularly."
            />
          )}
        </div>
      </div>
    </section>
  );
}
