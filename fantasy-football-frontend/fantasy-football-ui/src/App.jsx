import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Topbar from './components/Topbar';

import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Contests from './pages/Contests';
import Leaderboard from './pages/Leaderboard';
import PlayerStats from './pages/PlayerStats';
import AdminPanel from './pages/Adminpanel';
import MyTeams from './pages/Teams';
import Schedule from './pages/Schedule';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/my-teams" element={<MyTeams />} />
              <Route path="/contests" element={<Contests />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/player-stats" element={<PlayerStats />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/schedule" element={<Schedule />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
