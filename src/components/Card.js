import React from 'react';
import {FaQuoteLeft, FaQuoteRight} from 'react-icons/fa';


const Card = (props) => {
    let review = props.review;
  return (
    <div  className='flex flex-col md:releative'>

         <div className='absolute top-[16vh] z-[10] mx-auto'>
            <img 
            className='aspect-square rounded-full w-[140px] h-[140px] z-[25]'
            src={review.image}/>
            <div className='w-[140px] h-[140px] bg-violet-500 rounded-full absolute
             top-[-6px] z-[-10] left-[10px]'></div>
         </div>

         
        <div className='text-center mt-7'>
            <p className='tracking-wider font-bold text-2xl capitalize'> {review.name} </p>
            <p className='text-voilet-300 uppercase text-sm'>{review.job}</p>
        </div>

       

        <div className='mx-auto mt-5 text-violet-400'>
            <FaQuoteLeft/>
        </div>

        <div className='text-center mt-4 text-slate-500'>
            {review.text}
        </div>

        <div className='mx-auto mt-5 text-violet-400'>
            <FaQuoteRight/>
        </div>

    </div>
  )
}

export  default Card