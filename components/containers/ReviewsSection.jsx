import { useCallback, useRef } from "react";
import { useQuery } from "react-query";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getClientReviews } from "../../fetchers";
import { Review } from "../elements";
import { Spinner } from "../utils";

const ReviewsSection = () => {
  const { data, isLoading } = useQuery("clientreviews", getClientReviews);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (isLoading)
    return (
      <div className="block py-20 text-center">
        <Spinner />
      </div>
    );

  if (!data) return null;

  return (
    <div className="swiper-holder">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={28}
        slidesPerView={3}
        autoplay={{
          delay: 4000,
        }}
        centerInsufficientSlides={true}
        ref={sliderRef}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {data?.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="slider-item">
              <Review review={review} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-prev" onClick={handlePrev}></button>
      <button className="swiper-button-next" onClick={handleNext}></button>
    </div>
  );
};

export default ReviewsSection;
