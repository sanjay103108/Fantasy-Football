import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/' },
    { name: 'My Teams', path: '/teams' },
    { name: 'Contests', path: '/contests' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Player Stats', path: '/player-stats' },
    { name: 'Admin Panel', path: '/admin' },
    { name:'Schedule', path: '/Schedule'}
    
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">Fantasy League</h2>
      <nav className="nav-links">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={location.pathname === link.path ? 'active' : ''}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
