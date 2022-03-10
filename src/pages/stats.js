import React from 'react'
import Layout from "../components/Layout";
import {Container, Button, Row, Col} from 'react-bootstrap'

export default function stats() {
  return (
    <Layout title="Statistics">
      <h1 className="text-md-center text-light">Statistics</h1>
      <Container>
        <h4>Best Guessed Songs:</h4>
        <h4>Worst Guessed Songs:</h4>
        <h4>Best Guessed Genres:</h4>
        <h4>Worst Guessed Genres:</h4>
      </Container>
    </Layout>
  )
}
