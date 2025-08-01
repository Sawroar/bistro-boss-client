import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../componenets/SectionTitle/sectionTitle';

const Category = () => {
    
    return (
       <section>
        <SectionTitle
        subHeding={'From 11.00am to 10.00pm'}
        heading={'Order Online'}
        ></SectionTitle>
         <Swiper
         
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper mb-24"
        >
            <SwiperSlide><img src={slide1}/> <h3 className='text-4xl uppercase text-white text-center -mt-12' >Salad</h3> </SwiperSlide>
            <SwiperSlide><img src={slide2}/> <h3 className='text-4xl uppercase text-white text-center -mt-12' >Pizza</h3> </SwiperSlide>
            <SwiperSlide><img src={slide3}/> <h3 className='text-4xl uppercase text-white text-center -mt-12' >Soup</h3> </SwiperSlide>
            <SwiperSlide><img src={slide4}/> <h3 className='text-4xl uppercase text-white text-center -mt-12' >Dessert</h3> </SwiperSlide>
            <SwiperSlide><img src={slide5}/> <h3 className='text-4xl uppercase text-white text-center -mt-12' >Salad</h3> </SwiperSlide>
         
        </Swiper>
       </section>
    );
};

export default Category;