import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Card, Badge, Button, Alert } from "react-bootstrap";
import axios from "axios";

const TeamManager = forwardRef(({ userId }, ref) => {
  const [team, setTeam] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isTeamLocked, setIsTeamLocked] = useState(false);
  const [nextMatchTime, setNextMatchTime] = useState("");

  const MAX_GOALKEEPERS = 1;
  const MAX_DEFENDERS = 4;
  const MAX_MIDFIELDERS = 3;
  const MAX_STRIKERS = 3;

  useEffect(() => {
    fetchTeam();
    checkTeamLockStatus();
    // Check lock status every minute
    const interval = setInterval(checkTeamLockStatus, 60000);
    return () => clearInterval(interval);
  }, [userId]);

  const checkTeamLockStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/match/next`);
      setNextMatchTime(response.data);
      const now = new Date();
      const matchTime = new Date(response.data);
      const hoursUntilMatch = (matchTime - now) / (1000 * 60 * 60);
      setIsTeamLocked(hoursUntilMatch <= 2);
    } catch (error) {
      console.error("Error checking match status:", error);
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/${userId}`);
      setTeam(response.data.players || []);
    } catch (error) {
      setError("Error fetching team");
      console.error("Error:", error);
    }
  };

  const countPlayersByPosition = (position) => {
    return team.filter((player) => player.position === position).length;
  };

  const canAddPlayer = (player) => {
    if (isTeamLocked) {
      setError("Team changes are locked 2 hours before match time");
      return false;
    }

    const position = player.position;
    const currentCount = countPlayersByPosition(position);

    switch (position) {
      case "Goalkeeper":
        return currentCount < MAX_GOALKEEPERS;
      case "Defender":
        return currentCount < MAX_DEFENDERS;
      case "Midfielder":
        return currentCount < MAX_MIDFIELDERS;
      case "Striker":
        return currentCount < MAX_STRIKERS;
      default:
        return false;
    }
  };

  const getPositionLimit = (position) => {
    switch (position) {
      case "Goalkeeper":
        return MAX_GOALKEEPERS;
      case "Defender":
        return MAX_DEFENDERS;
      case "Midfielder":
        return MAX_MIDFIELDERS;
      case "Striker":
        return MAX_STRIKERS;
      default:
        return 0;
    }
  };

  const handleAddPlayer = async (player) => {
    if (!canAddPlayer(player)) {
      return false;
    }

    try {
      await axios.post(
        `http://localhost:8080/user/${userId}/player/${player.id}`
      );
      setSuccess("Player added successfully");
      await fetchTeam();
      return true;
    } catch (error) {
      setError(error.response?.data || "Error adding player to team");
      console.error("Error:", error);
      return false;
    }
  };

  const handleRemovePlayer = async (playerId) => {
    if (isTeamLocked) {
      setError("Team changes are locked 2 hours before match time");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/user/${userId}/player/${playerId}`
      );
      setSuccess("Player removed successfully");
      await fetchTeam();
    } catch (error) {
      setError(error.response?.data || "Error removing player from team");
      console.error("Error:", error);
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    handleAddPlayer,
    handleRemovePlayer,
    fetchTeam,
  }));

  return (
    <div className="container mt-4">
      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
          {success}
        </Alert>
      )}

      {isTeamLocked && (
        <Alert variant="warning">
          Team changes are locked! Next match starts at{" "}
          {new Date(nextMatchTime).toLocaleString()}
        </Alert>
      )}

      <h3>Your Team</h3>
      <div className="row">
        {["Goalkeeper", "Defender", "Midfielder", "Striker"].map((position) => (
          <div key={position} className="col-md-3">
            <h5>
              {position}s ({countPlayersByPosition(position)}/
              {getPositionLimit(position)})
            </h5>
            {team
              .filter((player) => player.position === position)
              .map((player) => (
                <Card key={player.id} className="mb-2">
                  <Card.Body>
                    <Card.Title>{player.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {player.team}
                    </Card.Subtitle>
                    <Badge bg="info">£{player.transferValue}</Badge>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleRemovePlayer(player.id)}
                      disabled={isTeamLocked}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
});

TeamManager.displayName = "TeamManager";

export default TeamManager;
