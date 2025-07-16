import axios from 'axios';
import React from 'react';
const axioxPublic=axios.create({
    baseURL:'http://localhost:5000'
})

const useAxiosPublic = () => {
    return axioxPublic
        
};

export default useAxiosPublic;