import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";
import EmptyState from "@/components/ui/EmptyState";
import EbookDetailsClient from "@/components/ebooks/EbookDetailsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getEbook(id) {
  try {
    const res = await fetch(`${API_URL}/ebooks/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const ebook = await getEbook(id);
  return {
    title: ebook ? `${ebook.title} - Fable` : "Ebook Not Found - Fable",
    description: ebook?.description?.slice(0, 160) || "Discover original ebooks on Fable.",
  };
}

export default async function EbookDetailsPage({ params }) {
  const { id } = await params;
  const ebook = await getEbook(id);

  if (!ebook) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#050816] px-4 py-20 text-white">
        <EmptyState
          icon={FaBookOpen}
          title="Ebook not found"
          description="This ebook may have been removed, unpublished, or the link is broken."
          action={
            <Link
              href="/browse-ebooks"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Browse Ebooks
            </Link>
          }
        />
      </div>
    );
  }

  return <EbookDetailsClient ebook={ebook} />;
}
