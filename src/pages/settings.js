import React from 'react'
import Layout from "../components/Layout";
import {Container, Button, Row, Col} from 'react-bootstrap'
import SpotifyLoginLink from 'src/components/SpotifyLoginLink';
export default function settings() {
  var count = 0;
  return (
    <Layout title="Settings">
      <h1 className="text-md-center text-light">Settings</h1>
      <Container>
        <Row className="align-items-center pt-5">
          <Col>
            <h3>Login with spotify: </h3>
          </Col>
          <Col>
            <SpotifyLoginLink />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
