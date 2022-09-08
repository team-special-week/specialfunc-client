import React from 'react';
import Footer from '../components/footer'
import Slide from '../components/Main/main_slide'
import HeaderComp from '../components/Header/header';
import MainServices from '../components/Main/main_service';

function App() {
  return (
    <div className="main-page">
      <HeaderComp />
      <Slide />
      <MainServices />
      <Footer/>
    </div>
  );
}

export default App;