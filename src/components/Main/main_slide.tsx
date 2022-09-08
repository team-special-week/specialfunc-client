import React from 'react';
import '../../assets/css/main_slide.css'

const MainSlide = () => {
  const SLIDER_IMAGE = require('../../assets/images/main_background.jpg')

  return (
    <div className="main-slider">
      <img src={SLIDER_IMAGE} alt="main_background" />
      <div className="main-slider-content">
        <div className="container">
          <div className="h-auto text-white font-['JetBrains_Mono'] text-[56px]">
            Build your applications with<br />SPECIAL.FUNCTIONS
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSlide;