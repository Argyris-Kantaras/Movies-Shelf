import avengersImg from "../../icons/avengers-image.jpg";
import jokerImg from "../../icons/joker-image.jpg";
import gameOfThronesImg from "../../icons/game-of-thrones-image.jpg";

import styles from "./slider.module.css";
import { useEffect, useRef, useState } from "react";
import SlidesBanners from "./SlidesBanners";

const images = [avengersImg, jokerImg, gameOfThronesImg];
const bannerTexts = [
  { top: "Just type in the title", bottom: "and get all info" },
  { top: "Any genre that interest you", bottom: "we have it available" },
  { top: "Not just movies", bottom: "but series too" },
];

function Slider() {
  const slideImgRef = useRef(0);
  const [slide, setSlide] = useState(0);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    setInterval(() => {
      setSlide((nextInd) => {
        return nextInd === images.length - 1 ? 0 : nextInd + 1;
      });
    }, 10000);
  }, []);
  useEffect(() => {
    setBanner(bannerTexts[slide]);
  }, [slide]);
  return (
    <div className={styles.slider}>
      {images.map((img, ind) => {
        return (
          <div
            key={img}
            className={styles.slideShow}
            style={{
              transform: `translateX(${-slide * 100}%)`,
            }}
          >
            <SlidesBanners topText={banner.top} bottomText={banner.bottom} />
            <img
              ref={slideImgRef}
              key={ind}
              className={styles.slideImg}
              src={img}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Slider;
