export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            {eyebrow}
          </span>
        )}

        <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">{description}</p>
        )}
      </div>
    </section>
  );
}
