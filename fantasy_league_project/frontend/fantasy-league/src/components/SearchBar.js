import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Badge,
  Dropdown,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ userId, onAddPlayer }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const positions = ["All", "Goalkeeper", "Defender", "Midfielder", "Striker"];

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/player");
        setPlayers(response.data);
        setFilteredPlayers(response.data);
      } catch (error) {
        setError("Error fetching players");
        console.error("Error:", error);
      }
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    let filtered = players;

    // Apply position filter
    if (selectedPosition !== "All") {
      filtered = filtered.filter(
        (player) => player.position === selectedPosition
      );
    }

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (player) =>
          player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.team.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPlayers(filtered);
  }, [searchTerm, selectedPosition, players]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleAddToTeam = async (player) => {
    if (onAddPlayer) {
      const success = await onAddPlayer(player);
      if (success) {
        setSuccess("Player added to team successfully");
      }
    }
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSearch}>
        <Row className="mb-3">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Search players by name or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="position-dropdown">
                {selectedPosition}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {positions.map((position) => (
                  <Dropdown.Item
                    key={position}
                    onClick={() => setSelectedPosition(position)}
                  >
                    {position}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Form>

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

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredPlayers.map((player) => (
          <Col key={player.id}>
            <Card
              className="h-100"
              onClick={() => handleAddToTeam(player)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{player.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {player.team}
                </Card.Subtitle>
                <Badge bg="info">{player.position}</Badge>
                <Card.Text>Transfer Value: £{player.transferValue}</Card.Text>
                {onAddPlayer && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToTeam(player);
                    }}
                  >
                    Add to Team
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SearchBar;
