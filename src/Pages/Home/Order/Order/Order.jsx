import React, { useState } from 'react';
import orderCoverImg from '../../../../assets/shop/orderImg.jpg'
import Cover from '../../../Shared/Cover/Cover';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../../Hooks/useMenu';
import { Helmet } from 'react-helmet';
import Foodcard from '../../../../componenets/FoodCard/Foodcard';
import OrderTab from './OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
const Order = () => {
    const categories= ['salad','pizza','soup','dessert','drinks']
    const {category}=useParams()
    const initialIndex= categories.indexOf(category)
    const [tabIndex,setTabIndex]=useState(initialIndex)
    const [menu]=useMenu()
    const salad=menu.filter(item=>item.category==='salad')
    const pizza=menu.filter(item=>item.category==='pizza')
    const soup=menu.filter(item=>item.category==='soup')
    const dessert=menu.filter(item=>item.category==='dessert')
    const drinks=menu.filter(item=>item.category==='drinks')
    return (
        <div>
             <Helmet>
                <title>Bistro Boss | Order</title>
            </Helmet>
            <Cover img={orderCoverImg} title={'Order Food'}></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className='text-center mx-auto'>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>     <OrderTab items={pizza}></OrderTab></TabPanel>
                <TabPanel> <OrderTab items={soup} ></OrderTab> </TabPanel>
                <TabPanel> <OrderTab items={dessert} ></OrderTab> </TabPanel>
                <TabPanel> <OrderTab items={drinks} ></OrderTab> </TabPanel>
            </Tabs>

        </div>
    );
};

export default Order;