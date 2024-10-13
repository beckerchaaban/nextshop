import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { ProductImage } from "interfaces/ProductImage";

export interface CarouselProps {
  images: ProductImage[];
}
export default ({ images }: CarouselProps) => {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={60}
      totalSlides={images.length}
      className="relative flex gap-4 w-full justify-start"
    >
      <DotGroup>
        <div className="flex gap-2 flex-col">
          {images?.map((image, i) => (
            <Dot slide={i}>
              <div
                className="w-16 h-16 bg-cover bg-center border border-slate-400"
                style={{ backgroundImage: `url(${image.url ?? ""})` }}
              ></div>
            </Dot>
          ))}
        </div>
      </DotGroup>
      <Slider className="w-full">
        {images?.map((image, i) => (
          <Slide index={i}>
            <img className="w-full" src={image.url ?? ""} />
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
};