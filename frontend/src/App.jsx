import { Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import Analyzer from './components/Analyzer';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/:username" element={<Analyzer />} />
      </Routes>
    </div>
  );
}

export default App;