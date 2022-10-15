import Carousel from "react-bootstrap/Carousel";
import styles from "./MainCarousel.module.css";
import RootDiv from "../UI/RootDiv";
const slide1 = require("../../images/slide1.jpg");
const slide2 = require("../../images/slide2.jpg");
const slide3 = require("../../images/slide3.jpg");

const MainCarousel = () => {
  return (
    <RootDiv>
      <Carousel controls={false} indicators={false}>
        <Carousel.Item>
          <img
            className={`d-block ${styles.slidesImg}`}
            src={slide1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={`d-block ${styles.slidesImg}`}
            src={slide2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={`d-block ${styles.slidesImg}`}
            src={slide3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </RootDiv>
  );
};
export default MainCarousel;
