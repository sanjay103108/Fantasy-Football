import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TeamManager from "../components/TeamManager";
import SearchBar from "../components/SearchBar";

const TeamPage = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // Get user ID from localStorage or your auth context
  const teamManagerRef = useRef();

  const handleAddPlayer = async (player) => {
    if (teamManagerRef.current) {
      const success = await teamManagerRef.current.handleAddPlayer(player);
      if (!success) {
        // The error will be shown by TeamManager
        return;
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mt-4 mb-4">Manage Your Team</h2>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <TeamManager ref={teamManagerRef} userId={userId} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h3>Search Players</h3>
          <SearchBar userId={userId} onAddPlayer={handleAddPlayer} />
        </Col>
      </Row>
    </Container>
  );
};

export default TeamPage;
