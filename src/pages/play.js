import React from "react";
import Layout from "../components/Layout";
import data from "./api/dummy_data_play.json";
import { Carousel, Card, Image, Container, Form } from "react-bootstrap";
import styles from "../styles/Play.module.css";

export default function play() {
  return (
    <Layout title="Play" css={false}>
      <h1 className="text-md-center pt-5">Time Left: 15 Seconds</h1>
      <Carousel style={{ width: "100vw" }} interval={null} wrap={false}>
        {data.map((item, key) => (
          <Carousel.Item eventKey={key}>
            <Container>
              <div key={key} className={styles.carItem}>
                <div className={styles.carPhoto}>
                  <Image src={data.image} width={360} height={180} />
                </div>
                <div className={styles.carPhoto}>
                <Card className={"bg-dark text-white"}  style={{ width: '30rem' }} border="success">
                  <Container>
                  <Form className="text-md-center p-2">
                    <Form.Check
                      type={"radio"}
                      id={key}
                      label={item.option_1}
                      name={`group${key}`}
                      isValid
                    />
                    <Form.Check
                      type={"radio"}
                      id={key}
                      label={item.option_2}
                      name={`group${key}`}
                      isValid
                    />
                    <Form.Check
                      type={"radio"}
                      id={key}
                      label={item.option_3}
                      name={`group${key}`}
                      isValid
                    />
                  </Form>
                  </Container>  
                </Card>
                </div>
              </div>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </Layout>
  );
}
