import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { Form, Button, Row } from "react-bootstrap";
import styles from "../styles/Login.module.css";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    console.log("== Logging in with these credentials:", username, password);
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resBody = await res.json();
    if (res.status !== 200) {
      alert("Credentials invalid: " + resBody.err);
    } else {
      console.log("== resBody:", resBody);
      console.log("== document.cookie:", document.cookie);
      // window.localStorage.setItem('token', resBody.token)
      router.push(router.query.redirect || "/");
    }
  }

  return (
    <Layout title="Log In">
      <h1 className="text-md-center text-light">Log In</h1>
      <div className={styles.form}>
        <div className={styles.container}>
          <div className={styles.formGroup}>
            <form onSubmit={handleLogin}>
              <Form.Group role="form">
                <Form.Group controlId="formBasicName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <p/>
                <p/>
                <Row className="align-items-center">
                  <Button variant="success" type="submit" className="center">
                    Login
                  </Button>
                </Row>
              </Form.Group>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
