import { amsterdam, vatikan, venice, keukenhof } from "../utils/constants";
import "./HomePage.css";
amsterdam;
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
