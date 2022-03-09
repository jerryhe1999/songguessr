import React from "react";
import Layout from "../components/Layout";
import data from "./api/dummy_data_play.json";
import {
  Carousel,
  Card,
  Image,
  Container,
  Col,
  Row
} from "react-bootstrap";
import styles from '../styles/Play.module.css'


export default function play() {
  return (
    <Layout title="Play" css={false}>
      <h1 className="text-md-center">Time Left: 15 Seconds</h1>
      <Carousel style={{"width": "100vw"}} interval={null} wrap={false}>
        {data.map((item, key) => (
          <Carousel.Item eventKey={key}>
            <Container>
            <div  key={key} className={styles.carItem}>
            <div className={styles.carPhoto}>
            <Image src={data.image} width={360} height={180} />
            </div>
            <Card className={"bg-dark text-white"} border="success">
                <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label">
                  {item.option_1}
                </label>
              </div>
              
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label">
                  {item.option_2}
                </label>
              </div>


              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label">
                  {item.option_3}
                </label>
              </div>
            </Card>
            </div>

            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </Layout>
  );
}
