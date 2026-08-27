import Banner from "@/components/home/Banner";
import FeaturedEbooks from "@/components/home/FeaturedEbooks";
import TopWriters from "@/components/home/TopWriters";
import GenreGrid from "@/components/home/GenreGrid";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function safeGet(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const [featured, topWriters, genreCounts] = await Promise.all([
    safeGet("/ebooks/featured"),
    safeGet("/ebooks/top-writers"),
    safeGet("/ebooks/genres"),
  ]);

  return (
    <div>
      <Banner />
      <FeaturedEbooks ebooks={featured} />
      <TopWriters writers={topWriters} />
      <GenreGrid counts={genreCounts} />
    </div>
  );
}
