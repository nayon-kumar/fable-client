import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import BrowseEbooksClient from "./BrowseEbooksClient";

export const metadata = {
  title: "Browse Ebooks - Fable",
  description:
    "Search, filter, and discover original ebooks from independent writers on Fable.",
};

export default function BrowseEbooksPage() {
  return (
    <div className="bg-[#050816] text-white">
      <PageHero
        eyebrow="Library"
        title="Browse Ebooks"
        description="Search, filter, and find your next great read from writers around the world."
      />
      <Suspense fallback={<LoadingSpinner fullScreen size="lg" />}>
        <BrowseEbooksClient />
      </Suspense>
    </div>
  );
}
