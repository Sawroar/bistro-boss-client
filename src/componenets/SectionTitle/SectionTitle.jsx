import React from 'react';

const SectionTitle = ({heading,subHeding}) => {
    return (
        <div className=' mx-auto md:w-4/12 my-8 text-center'>
            <h3 className='text-yellow-500'>---{subHeding}---</h3>
            <p className='text-3xl uppercase border-y py-4'>{heading}</p>
        </div>
    );
};

export default SectionTitle;