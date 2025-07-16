import React from 'react';
import SectionTitle from '../../../componenets/SectionTitle/sectionTitle';
import featuredIgm from '../../../assets/home/featured.jpg'
import './../Featured/featured.css'
const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle
                heading={'check it Out'}
                subHeding={'Featured Item'}
            ></SectionTitle>
            <div className='md:flex justify-center items-center pb-20 pt-12 px-36 bg-slate-500 opacity-30'>
                <div>
                    <img src={featuredIgm} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20,2029</p>
                    <p className='uppercase'>Where can I get Some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Odio nisi aliquid dolorum reprehenderit iste quae ab quas iure voluptatum maiores, vero autem ipsum qui nesciunt odit eveniet natus. Minus, deleniti! ipsum, dolor sit amet consectetur adipisicing elit. Aut, nostrum? At deleniti iusto, praesentium sequi ex nisi facere mollitia eum.</p>
                    <button className='btn btn-outline border-0 border-b-4'>order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;