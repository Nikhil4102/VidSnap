import React from 'react'
import "./About.css";

import reviews from "../data";
import Testimonial from "../components/Testmonials";

const About = () => {
  return (
    <div>

      <div className="bg-About">
      <div  className="member_name" >
        <h1 className="our-team">Our Team</h1>
       <div className="bg-violet-400 h-[4px] w-1/5 mt-1 mx-auto "> </div>
       <Testimonial reviews={reviews}/>
      </div>
  </div>
    </div>
  )
}

export default About