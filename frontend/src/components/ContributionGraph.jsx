import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from "recharts";

const colors = ["#1a0033", "#3a0088", "#5a189a", "#7e3cb3", "#9d4edd", "#d8b4ff"];

export default function ContributionGraph({ contributions }) {
  const lastYear = Array.from({ length: 365 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (364 - i));
    const dateStr = d.toISOString().split("T")[0];
    const day = contributions.find(c => c.date === dateStr);
    return { date: dateStr, count: day ? day.count : 0 };
  });

  const getColor = (c) => colors[Math.min(Math.floor(c / 3), 5)];

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={lastYear} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <XAxis dataKey="date" tick={false} />
        <Tooltip
          contentStyle={{ background: "#1a0033", border: "1px solid #5a189a", borderRadius: "12px" }}
          labelStyle={{ color: "#d8b4ff" }}
        />
        <Bar dataKey="count" radius={[8, 8, 8, 8]}>
          {lastYear.map((e, i) => (
            <Cell key={i} fill={getColor(e.count)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}