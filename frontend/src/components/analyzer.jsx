import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StatsCard from "./StatsCard";
import ContributionGraph from "./ContributionGraph";
import RepoShowcase from "./RepoShowcase";

export default function Analyzer() {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/github/${username}`)
      .then(res => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-3xl text-purple-400">
          <span className="shimmer inline-block w-32 h-8 rounded-full"></span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-5xl font-bold text-gradient">User Not Found</h2>
        <Link to="/" className="btn-glow">Back Home</Link>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="page-max">
        {/* Profile Header */}
        <div className="glass section mb-10">
          <div className="header-row is-stack" style={{ gap: '1rem' }}>
          <img
            src={data.stats.avatar}
            alt="avatar"
            className="avatar-sm"
          />
          <div style={{ flex: 1, maxWidth: '900px' }}>
            <h1 className="title-xxl" style={{ color: '#E9D5FF' }}>{data.stats.name}</h1>
            <p className="muted" style={{ color: '#E9D5FF' }}>@{username}</p>
            {data.stats.bio && <p className="lead" style={{ marginTop: '0.5rem', color: '#E9D5FF' }}>{data.stats.bio}</p>}
          </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid mb-12">
          <StatsCard title="Contributions" value={data.stats.totalContributions} />
          <StatsCard title="Followers" value={data.stats.followers} />
          <StatsCard title="Following" value={data.stats.following} />
          <StatsCard title="Repositories" value={data.stats.totalRepos} />
        </div>

        {/* Heatmap + Repos in responsive grid */}
        <div className="two-col">
          <div className="glass section">
            <h2 className="section-title" style={{ textAlign: 'center', color: '#E9D5FF' }}>Contribution Heatmap</h2>
            <ContributionGraph contributions={data.contributions} />
          </div>
          <div className="glass section">
            <h2 className="section-title" style={{ textAlign: 'center', color: '#E9D5FF' }}>Top Repositories</h2>
            <RepoShowcase repos={data.repos} />
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/" className="btn-glow">
            ← Search another user
          </Link>
        </div>
      </div>
    </div>
  );
}