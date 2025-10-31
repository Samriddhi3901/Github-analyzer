import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) navigate(`/${username.trim()}`);
  };

  // Enhanced floating cosmic particles
  useEffect(() => {
    const symbols = ['{ }', '</>', '()', '[]', '★', '✦', '◆', '●', '➤', 'λ', '✨', '◇', '▲', '▼'];
    const container = document.body;

    const particles = [];
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.className = 'cosmic-particle';
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left = `${Math.random() * 100}vw`;
      p.style.top = `${Math.random() * 120}vh`;
      p.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
      p.style.animationDelay = `${Math.random() * 20}s`;
      p.style.animationDuration = `${Math.random() * 25 + 25}s`;
      container.appendChild(p);
      particles.push(p);
    }

    return () => particles.forEach(p => p.remove());
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* COSMIC GALAXY BACKGROUND */}
      <div className="fixed inset-0 cosmic-bg" style={{ zIndex: 0 }}></div>

      {/* PERFECTLY CENTERED CONTENT */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        width: '100%',
        maxWidth: '1200px',
        padding: '0 24px'
      }}>
        <div className="text-center space-y-8 w-full">

          {/* MAIN TITLE - Enhanced spacing and glow */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
              <span className="neon-title block">
                GitHub Analyzer
              </span>
            </h1>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 opacity-60">
              <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-purple-400 to-purple-400"></div>
              <span className="text-purple-300 text-2xl">✨</span>
              <div className="h-[2px] w-20 bg-gradient-to-l from-transparent via-purple-400 to-purple-400"></div>
            </div>
          </div>

          {/* SUBTITLE - Made brighter and more visible */}
          <p className="text-lg sm:text-xl md:text-2xl font-light animate-fade-in px-4" style={{ color: '#e0aaff' }}>
            Discover stats, contributions & top repos in{" "}
            <span className="shimmer-text font-semibold">cosmic style</span>
          </p>

          {/* SEARCH FORM - Perfectly centered */}
          <div className="pt-6">
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-3xl mx-auto"
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username..."
                className="w-full sm:flex-1 sm:max-w-md px-6 sm:px-8 py-4 sm:py-5 rounded-full bg-white/10 backdrop-blur-xl border-2 border-purple-500/40 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 text-base sm:text-lg transition-all shadow-lg hover:shadow-purple-500/20"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white font-bold text-base sm:text-lg shadow-2xl hover:shadow-purple-500/60 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Analyze Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>

          {/* ADDITIONAL SUBTLE GLOW ELEMENTS - Made brighter */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm animate-fade-in" style={{ color: '#d8b4ff' }}>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              Real-time Stats
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
              Top Repositories
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              Contribution Analysis
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}