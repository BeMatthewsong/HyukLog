import { useState } from "react";
import img1 from "src/assets/벚꽃1.jpg";
import img2 from "src/assets/벚꽃2.jpg";
import img3 from "src/assets/벚꽃3.jpg";
import SlideImage from "./SlideImage";

const Carousel = () => {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <div className="carousel">
      <ul className="carousel__slides">
        <SlideImage
          imageSrc={img1}
          alt={"남산 벚꽃"}
          activeImage={activeImage}
          imageNumber={0}
          setActiveImage={setActiveImage}
        />
        <SlideImage
          imageSrc={img2}
          alt={"남산 케이블"}
          activeImage={activeImage}
          imageNumber={1}
          setActiveImage={setActiveImage}
        />
        <SlideImage
          imageSrc={img3}
          alt={"남산 도서관 옆"}
          activeImage={activeImage}
          imageNumber={2}
          setActiveImage={setActiveImage}
        />
        <div className="carousel__dots">
          {[...Array(3)].map((_, index) => (
            <label
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
