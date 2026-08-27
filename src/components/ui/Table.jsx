export function TableWrapper({ children }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
      <table className="w-full min-w-[640px] text-left text-sm">{children}</table>
    </div>
  );
}

export function Thead({ children }) {
  return <thead className="border-b border-white/10 bg-white/[0.03]">{children}</thead>;
}

export function Th({ children, className = "" }) {
  return (
    <th className={`whitespace-nowrap px-4 py-4 font-semibold text-gray-300 ${className}`}>
      {children}
    </th>
  );
}

export function Tr({ children, className = "" }) {
  return (
    <tr className={`border-b border-white/5 transition last:border-0 hover:bg-white/[0.03] ${className}`}>
      {children}
    </tr>
  );
}

export function Td({ children, className = "" }) {
  return <td className={`px-4 py-4 text-gray-300 ${className}`}>{children}</td>;
}
