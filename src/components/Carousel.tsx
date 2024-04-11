import { useState } from "react";
import SakuraImg from "src/assets/벚꽃1.jpg";
import CableCarImg from "src/assets/벚꽃2.jpg";
import NamsanLibraryImg from "src/assets/벚꽃3.jpg";
import SlideImage from "./SlideImage";

const Carousel = () => {
  const [activeImage, setActiveImage] = useState(1);

  const imageDatas = [
    {
      alt: "남산 벚꽃",
      src: SakuraImg,
    },
    {
      alt: "남산 케이블",
      src: CableCarImg,
    },
    {
      alt: "남산 도서관 옆",
      src: NamsanLibraryImg,
    },
  ];

  return (
    <div className="carousel">
      <ul className="carousel__slides">
        {imageDatas.map((e, index) => (
          <SlideImage
            key={e.alt}
            imageSrc={e.src}
            alt={e.alt}
            activeImage={activeImage}
            imageNumber={index}
            setActiveImage={setActiveImage}
          />
        ))}
        <div className="carousel__dots">
          {imageDatas.map((_, index) => (
            <label
              key={index}
              onClick={() => setActiveImage(index)}
              className="carousel__dot"
              id={`img-dot-${index}`}
            ></label>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Carousel;
