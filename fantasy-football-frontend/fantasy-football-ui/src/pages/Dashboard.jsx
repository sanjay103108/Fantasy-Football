import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import stadiumImage from '../assets/stadium.jpg';

const Dashboard = () => {
  return (
    <div className="dashboard-background" style={{ backgroundImage: `url(${stadiumImage})` }}>
      <div className="dashboard-overlay"></div>
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="logo">⚽ Fantasy League</div>
          <div className="user-profile">
            <span className="notification-badge">3</span>
            <div className="avatar">JD</div>
          </div>
        </header>

        <div className="dashboard-welcome">
          <h1>Welcome to Fantasy Football</h1>
          <p className="welcome-subtitle">Manage your team, join contests, and compete with friends</p>

          <div className="stats-summary">
            <div className="stat-item">
              <span className="stat-value">214</span>
              <span className="stat-label">Total Points</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">34</span>
              <span className="stat-label">Rank</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">8</span>
              <span className="stat-label">Weeks Played</span>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>🏆 Your Contests</h2>
            <Link to="/contests" className="view-all">View All →</Link>
          </div>
          <div className="card-container">
            <div className="card contest-card">
              <div className="card-status live">LIVE</div>
              <h3 className="card-title">Premier League Challenge</h3>
              <div className="card-details">
                <span className="participants">1,240 Participants</span>
                <span className="prize">$1,000 Prize</span>
              </div>
              <div className="card-footer">
                <span className="position">Your Position: 34th</span>
                <span className="time-remaining">Ends in 2d 14h</span>
              </div>
            </div>
            <div className="card contest-card">
              <div className="card-status upcoming">UPCOMING</div>
              <h3 className="card-title">Champions Cup</h3>
              <div className="card-details">
                <span className="participants">3,450 Participants</span>
                <span className="prize">$5,000 Prize</span>
              </div>
              <div className="card-footer">
                <span className="position">Registered</span>
                <span className="time-remaining">Starts in 3d 8h</span>
              </div>
            </div>
            <div className="card contest-card">
              <div className="card-status live">LIVE</div>
              <h3 className="card-title">Weekend Tournament</h3>
              <div className="card-details">
                <span className="participants">876 Participants</span>
                <span className="prize">$500 Prize</span>
              </div>
              <div className="card-footer">
                <span className="position">Your Position: 12th</span>
                <span className="time-remaining">Ends in 1d 6h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>📅 Upcoming Matches</h2>
            <Link to="/schedule" className="view-all">Full Schedule →</Link>
          </div>
          <div className="card-container">
            <div className="card match-card">
              <div className="match-league">Premier League • Today</div>
              <div className="match-teams">
                <div className="team">
                  <div className="team-logo">ARS</div>
                  <div className="team-name">Arsenal</div>
                </div>
                <div className="match-info">
                  <div className="match-time">20:45</div>
                  <div className="match-status">Kickoff</div>
                </div>
                <div className="team">
                  <div className="team-logo">CHE</div>
                  <div className="team-name">Chelsea</div>
                </div>
              </div>
              <div className="match-stadium">Emirates Stadium</div>
            </div>
            <div className="card match-card">
              <div className="match-league">La Liga • Tomorrow</div>
              <div className="match-teams">
                <div className="team">
                  <div className="team-logo">BAR</div>
                  <div className="team-name">Barcelona</div>
                </div>
                <div className="match-info">
                  <div className="match-time">18:30</div>
                  <div className="match-status">Kickoff</div>
                </div>
                <div className="team">
                  <div className="team-logo">RMA</div>
                  <div className="team-name">Real Madrid</div>
                </div>
              </div>
              <div className="match-stadium">Camp Nou</div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>👥 Your Fantasy Team</h2>
            <Link to="/my-teams" className="view-all">Manage Team →</Link>
          </div>
          <div className="card-container">
            <div className="card team-card">
              <h3 className="team-name">The Champions</h3>
              <div className="team-status">Active</div>
              <div className="team-stats">
                <div className="team-stat">
                  <div className="stat-label">Total Points</div>
                  <div className="stat-value">214</div>
                </div>
                <div className="team-stat">
                  <div className="stat-label">Last Week</div>
                  <div className="stat-value">32</div>
                </div>
              </div>
              <div className="team-captain">
                <div className="captain-label">Captain</div>
                <div className="captain-name">Harry Kane</div>
              </div>
              <div className="team-strength">
                <div className="strength-label">Team Strength</div>
                <div className="strength-bar">
                  <div className="strength-progress" style={{ width: '78%' }}></div>
                </div>
                <div className="strength-value">78%</div>
              </div>
              <button className="view-team-btn">View Full Team</button>
            </div>
            <div className="card team-card">
              <h3 className="team-name">Top Performers</h3>
              <div className="player-list">
                <div className="player">
                  <div className="player-position">FWD</div>
                  <div className="player-info">
                    <div className="player-name">Erling Haaland</div>
                    <div className="player-points">42 pts</div>
                  </div>
                </div>
                <div className="player">
                  <div className="player-position">MID</div>
                  <div className="player-info">
                    <div className="player-name">Kevin De Bruyne</div>
                    <div className="player-points">38 pts</div>
                  </div>
                </div>
                <div className="player">
                  <div className="player-position">DEF</div>
                  <div className="player-info">
                    <div className="player-name">Virgil van Dijk</div>
                    <div className="player-points">29 pts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
