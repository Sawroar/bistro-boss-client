import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../componenets/SectionTitle/sectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../Hooks/useMenu';

const PopularMenu = () => {
    const [menu,loading]=useMenu()
    const popular =menu.filter(item=>item.category==='popular')
    return (
        <section className='mb-12'>
            <SectionTitle
            heading={'From Our Menu'}
            subHeding={'check it Out'}
             ></SectionTitle>
             <div className='grid md:grid-cols-2 gap-4'>
                {popular.map(item=><MenuItem key={item._id } item={item}></MenuItem>)}
             </div>
        </section>
    );
};

export default PopularMenu;