import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import './Home.css';

const Home = ({ isLoggedIn }) => {
  const typedRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Typed.js
    const typed = new Typed(typedRef.current, {
      strings: [
        "Generate stunning thumbnails in seconds",
        "Create eye-catching images in no time ",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
      showCursor: false,
      cursorChar: '',
      autoInsertCss: true
    });

    // Clean up on unmount
    return () => {
      typed.destroy();
    };
  }, []);

  // Handle button click to navigate based on login status
  const handleGenerateClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex-col items-center text-white text-3xl h-full mx-[100px]">
      <div className="container-home">
        {/* Centered the text container */}
        <h1 className="welcome text-center" ref={typedRef}></h1>
        <br />
        <div className="flex justify-center">
          <button 
            className="bg-richblack-800 text-richblack-100 py-[8px] 
            rounded-[8px] border border-richblack-700 w-[230px] "
            onClick={handleGenerateClick}
          >
            Generate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
