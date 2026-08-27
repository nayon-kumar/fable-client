"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#8b5cf6",
  "#6366f1",
  "#ec4899",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#3b82f6",
  "#84cc16",
  "#f97316",
  "#14b8a6",
];

export default function GenrePieChart({ data }) {
  const chartData = data.filter((d) => d.count > 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="font-semibold text-white">Ebooks by Genre</h3>
      <div className="mt-6 h-72">
        {chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="genre"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
              >
                {chartData.map((entry, i) => (
                  <Cell key={entry.genre} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0b0b14",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: "#9ca3af" }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No genre data yet
          </div>
        )}
      </div>
    </div>
  );
}
