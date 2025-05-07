import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { ImagesCarProps } from "../../pages/car";

interface SliderProps {
  images: ImagesCarProps[];
  options?: {
    qtdPerview: number;
    delay: number;
  };
}

export function Slider({ images, options }: SliderProps) {
  const [sliderPerView, setSliderPerview] = useState<number>(
    options?.qtdPerview || 2
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPerview(1);
      } else {
        setSliderPerview(options?.qtdPerview || 2);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="rounded-md overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: options?.delay || 3000 }}
        loop={true}
        slidesPerView={sliderPerView}
      >
        {images?.map((image) => (
          <SwiperSlide key={image.name}>
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-96 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
