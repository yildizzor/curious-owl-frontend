import React from "react";
import amsterdam from "../assets/homepage-photos/amsterdam.jpeg";
import keukenhof from "../assets/homepage-photos/keukenhof.jpeg";
import vatikan from "../assets/homepage-photos/vatikan.webp";
import venice from "../assets/homepage-photos/venice.jpeg";
import owl from "../assets/owl1.jpeg";
import "./HomePage.css";
import { Carousel } from "react-bootstrap";

function HomePage() {
  return (
    <div className="home-page">
      <div>
        <Carousel interval={2000}>
          <Carousel.Item>
            <img className="d-block mx-auto" src={amsterdam}></img>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block mx-auto" src={keukenhof}></img>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block mx-auto" src={vatikan}></img>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block mx-auto" src={venice}></img>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default HomePage;
