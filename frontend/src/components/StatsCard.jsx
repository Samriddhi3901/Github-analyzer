export default function StatsCard({ title, value }) {
  return (
    <div className="glass text-center p-6 transform transition-all hover:scale-105">
      <p className="text-purple-300 text-sm uppercase tracking-widest">{title}</p>
      <p className="text-4xl font-bold text-gradient mt-2">{value?.toLocaleString() || 0}</p>
    </div>
  );
}