import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Spotify } from "react-bootstrap-icons";
import Link from 'next/link';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const styles = css`
  .brand-text {
    margin-left: 5rem;
    margin-top: -3.2rem;
    font-weight: 700;
  }
  .nav-link {
    margin: 20px;
    text-align: center;
    border: 2px solid transparent;
    border-radius: 1rem;
  }
  .nav-link:hover,
  .nav-link:focus {
    background-color: #fefefe;
    color: #212529 !important;
    border-radius: 1rem;
  }
`;
function Header() {
  return (
    <Navbar
      className="navbar"
      bg="success"
      expand="lg"
      variant="dark"
      css={styles}
    >
      <Container className="navbar-container">
        <Navbar.Brand onClick={()=>navigate('/')}>
          <Spotify
            height={60}
            width={60}
            className="d-inline-block align-top brand-logo"
          />
          {""}
          <h1 className="brand-text">Songuessr</h1>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse collapseOnSelect>
          <Nav
            className="me-auto nav-links justify-content-end"
            style={{ width: "100%" }}
          >
            <Nav.Link href='/' className="nav-link">
              Play
            </Nav.Link>
            <Nav.Link href='/' className="nav-link">
              Login
            </Nav.Link>
            <Nav.Link href='/' className="nav-link">
              Settings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
