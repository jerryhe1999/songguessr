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
        <Row className='pt-5'>
        <Col md={9}>
        <h4>Select a playlist:</h4>
        </Col>
        <Col>
        <Button variant='success'>Select</Button>
        </Col>
        </Row>
        <Row>
          <Col>
          <SpotifyLoginLink />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
