import React from 'react'
import Layout from "../components/Layout";
import {Container, Button, Row, Col} from 'react-bootstrap'

export default function settings() {
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
      </Container>
    </Layout>
  )
}
