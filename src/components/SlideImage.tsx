interface SlideImageProps {
  key: string;
  imageSrc: string;
  alt?: string;
  activeImage: number;
  imageNumber: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
}

const SlideImage = ({
  imageSrc,
  alt,
  activeImage,
  imageNumber,
  setActiveImage,
}: SlideImageProps) => {
  return (
    <>
      <input
        type="radio"
        name="radio-buttons"
        id={`img-${imageNumber}`}
        checked={activeImage === imageNumber}
        readOnly
      />
      <li className="carousel__slide-container">
        <div className="carousel__slide-img">
          <img alt={alt} src={imageSrc} />
        </div>
        <div className="carousel__controls">
          <label
            className="carousel__slide-prev"
            onClick={() => setActiveImage((imageNumber - 1 + 3) % 3)}
          >
            <span>&lsaquo;</span>
          </label>
          <label
            className="carousel__slide-next"
            onClick={() => setActiveImage((imageNumber + 1 + 3) % 3)}
          >
            <span>&rsaquo;</span>
          </label>
        </div>
      </li>
    </>
  );
};

export default SlideImage;
