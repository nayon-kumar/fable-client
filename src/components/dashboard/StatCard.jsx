export default function StatCard({ label, value, icon: Icon, accent = "violet" }) {
  const accents = {
    violet: "bg-violet-600/15 text-violet-400",
    emerald: "bg-emerald-600/15 text-emerald-400",
    amber: "bg-amber-600/15 text-amber-400",
    sky: "bg-sky-600/15 text-sky-400",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-violet-500/30">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{label}</p>
        {Icon && (
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${accents[accent]}`}>
            <Icon />
          </div>
        )}
      </div>
      <p className="mt-4 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
