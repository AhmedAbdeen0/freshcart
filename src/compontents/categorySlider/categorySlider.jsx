import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../loading/loading";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-fade";

export default function CategorySlider() {
    const [categories, setCategories] = useState(null);

    async function getCategories() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
            setCategories(data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        getCategories(); // Fetch categories once when component mounts
    }, []);

    return (
        <section className="my-6">
            <h2 className="mb-8 text-lg text-gray-600 font-semibold">Shop Popular Categories</h2>
            {!categories ? (
                <Loading /> // Show loading spinner while categories are being fetched
            ) : (
                <Swiper
                    loop={true}
                    spaceBetween={0} // No space between slides
                    speed={100} // Ultra-fast transition speed (in milliseconds)
                    autoplay={{ delay: 0 }} // No autoplay delay for immediate transition
                    breakpoints={{
                        640: {
                            slidesPerView: 1, // On small screens, show 2 slides
                        },
                        768: {
                            slidesPerView: 3, // On medium screens, show 3 slides
                        },
                        1024: {
                            slidesPerView: 4, // On large screens, show 4 slides
                        },
                        1280: {
                            slidesPerView: 5, // On extra large screens, show 5 slides
                        },
                        1536: {
                            slidesPerView: 6, // On 1536px width, show 6 slides
                        },
                    }}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category._id}>
                            <div className="h-64">
                                <img className="w-full h-full object-cover" src={category.image} alt={category.name} />
                            </div>
                            <h3 className="mt-2 text-center">{category.name}</h3>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
}
