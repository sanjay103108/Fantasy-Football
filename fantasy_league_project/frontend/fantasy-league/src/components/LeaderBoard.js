import React from "react";
import "./LeaderBoard.css";

export default function LeaderBoard({
  users,
  data,
  userGWScore,
  userOverallScore,
}) {
  // Sort users by game week score in descending order
  const sortedUsers = [...users].sort((a, b) => {
    const scoreA = userGWScore(a) || 0; // Ensure we have a number
    const scoreB = userGWScore(b) || 0; // Ensure we have a number
    return scoreB - scoreA; // Sort in descending order
  });

  // Get top user and highest scores
  const topUser = sortedUsers[0];
  const highestGWScore = userGWScore(topUser) || 0;
  const highestOverallScore = Math.max(
    ...sortedUsers.map((user) => userOverallScore(user) || 0)
  );

  const leader = sortedUsers.map((user, key) => {
    const gwScore = userGWScore(user) || 0; // Ensure we have a number
    const overallScore = userOverallScore(user) || 0; // Ensure we have a number

    return (
      <tr key={key} className={key === 0 ? "top-scorer" : ""}>
        <td>{key + 1}</td>
        <td>{user.userName}</td>
        <td>{user.teamName}</td>
        <td className="score-cell">{gwScore}</td>
        <td className="score-cell">{overallScore}</td>
      </tr>
    );
  });

  return (
    <div className="leaderboard-container">
      <div className="stats-container">
        <div className="stat-card">
          <h4>Top Manager</h4>
          <div className="stat-content">
            <span className="stat-value">{topUser?.userName || "N/A"}</span>
            <span className="stat-label">
              Team: {topUser?.teamName || "N/A"}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <h4>Highest Game Week Score</h4>
          <div className="stat-content">
            <span className="stat-value">{highestGWScore}</span>
            <span className="stat-label">Points</span>
          </div>
        </div>

        <div className="stat-card">
          <h4>Highest Overall Score</h4>
          <div className="stat-content">
            <span className="stat-value">{highestOverallScore}</span>
            <span className="stat-label">Points</span>
          </div>
        </div>
      </div>

      <div className="leaderboard">
        <h3>Current League Standings</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Manager</th>
                <th>Team</th>
                <th>GW</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{leader}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
