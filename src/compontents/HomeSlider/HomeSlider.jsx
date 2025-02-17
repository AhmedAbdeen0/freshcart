import sliderImage1 from "../../assets/imgs/slider-image-1.jpeg";
import sliderImage2 from "../../assets/imgs/slider-image-2.jpeg";
import sliderImage3 from "../../assets/imgs/slider-image-3.jpeg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HomeSlider() {
    return (
        <>
            <section className="grid grid-cols-12 mb-8">
                <div className="col-span-8">
                    <Swiper 
                        modules={[EffectFade, Autoplay]} 
                        effect="fade"
                        autoplay={{ delay: 1000 }}
                        slidesPerView={1} 
                        loop={true}
                    >
                        <SwiperSlide>
                            <img className="w-full h-full object-cover" src={sliderImage1} alt="sliderimage1" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className="w-full h-full object-cover" src={sliderImage2} alt="sliderimage2" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className="w-full h-full object-cover" src={sliderImage3} alt="sliderimage3" />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="col-span-4">
                    <img className="w-full" src={sliderImage3} alt="sliderimage3" />
                    <img className="w-full" src={sliderImage2} alt="sliderimage2" />
                </div>
            </section>
        </>
    );
}
