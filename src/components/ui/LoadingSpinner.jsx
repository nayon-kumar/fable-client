export default function LoadingSpinner({ size = "md", fullScreen = false, label }) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-9 w-9 border-[3px]",
    lg: "h-14 w-14 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <span
        className={`${sizes[size]} animate-spin rounded-full border-violet-500/20 border-t-violet-500`}
        role="status"
        aria-label={label || "Loading"}
      />
      {label && <p className="text-sm text-gray-400">{label}</p>}
    </div>
  );

  if (!fullScreen) return spinner;

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#050816]">
      {spinner}
    </div>
  );
}
