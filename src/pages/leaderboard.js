import React from "react";
import Layout from "../components/Layout";
import {
  Card,
  Container,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import data from "./api/dummy_data_leaderboard.json";
export default function leaderboard() {
  return (
    <Layout title="Leaderboard">
      <Container>
        <Card className={"bg-dark text-white"} border="success">
          <Card.Body>
            <Card.Title className="text-md-center">
              <h2>Leaderboard</h2>
            </Card.Title>
            <Row>
              <Col md="10">
                <h4 className="ml-5">Name</h4>
              </Col>
              <Col md="auto">
                <h4>Score</h4>
              </Col>
            </Row>
          </Card.Body>
          <ListGroup className="list-group-flush">
            {data.map((item, key) => (
              <ListGroupItem className={"bg-dark text-white"}>
                <Row>
                  <Col md="10">&ensp; {item.name}</Col>
                  <Col md="auto"> &ensp; {item.score}</Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card>
      </Container>
    </Layout>
  );
}
