import React from 'react';
import { Helmet } from 'react-helmet';
import Cover from '../Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../componenets/SectionTitle/sectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';
const Menu = () => {
    const [menu]=useMenu()
    const dessert=menu.filter(item=>item.category==='dessert')
    const salad=menu.filter(item=>item.category==='salad')
    const soup=menu.filter(item=>item.category==='soup')
    const pizza=menu.filter(item=>item.category==='pizza')
    const offered=menu.filter(item=>item.category==='offered')
  
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
             <Cover img={menuImg} title={'Our Menu'}></Cover>
             {/* Main Cover  */}
  <SectionTitle subHeding="Don't Miss" heading="Today's Offer"></SectionTitle>
       {/* Offered Menu Items */}
       <MenuCategory items={offered}></MenuCategory>
       {/* Dessert Menu Items */}
              <MenuCategory items={dessert} img={dessertImg} title='Dessert'></MenuCategory>
       {/* Pizza Menu Items */}
              <MenuCategory items={pizza} img={pizzaImg} title='Pizza'></MenuCategory>
       {/* salad Menu Items */}
              <MenuCategory items={salad} img={saladImg} title='Salad'></MenuCategory>
       {/* Soup Menu Items */}
              <MenuCategory items={soup} img={soupImg} title='Soup'></MenuCategory>

        </div>
    );
};

export default Menu;