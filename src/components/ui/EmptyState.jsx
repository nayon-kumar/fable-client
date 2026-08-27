import { FaBoxOpen } from "react-icons/fa";

export default function EmptyState({
  icon: Icon = FaBoxOpen,
  title = "Nothing here yet",
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/10 text-2xl text-violet-400">
        <Icon />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-400">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
