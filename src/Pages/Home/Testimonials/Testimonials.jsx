import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../componenets/SectionTitle/sectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';


import '@smastrom/react-rating/style.css'

// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])

    return (
        <section>
            <SectionTitle
                heading={'What Our Client Say'}
                subHeding={'Testimonials'}
            >  </SectionTitle>
            <Swiper

                navigation={true} modules={[Navigation]}

                className="mySwiper mb-24"
            >

                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className=' flex flex-col items-center m-24 mx-24 my-16'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className='py-8'>{review.details}
                            </p>
                               <h3 className='text-2xl text-orange-500' >{review.name}</h3> 
                        </div>
                     </SwiperSlide>)
                }


            </Swiper>


        </section>
    );
};

export default Testimonials;