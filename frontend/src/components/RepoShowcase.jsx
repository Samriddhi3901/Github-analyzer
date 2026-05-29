export default function RepoShowcase({ repos }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {repos.map((repo, i) => (
        <a
          key={i}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass block p-6 hover:scale-105 transition-all duration-300 border border-transparent hover:border-purple-500"
        >
        <h3 className="text-xl font-bold text-purple-300 mb-2">{repo.name}</h3>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{repo.description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-purple-200">
            <span className="bg-purple-900/50 px-3 py-1 rounded-full">{repo.language || "Code"}</span>
            <span>Stars {repo.stars}</span>
            <span>Forks {repo.forks}</span>
            <span className="ml-auto text-pink-300">
              {new Date(repo.updated).toLocaleDateString()}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
