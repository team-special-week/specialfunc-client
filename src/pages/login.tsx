import React, {useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/header'
import LoginForm from '../components/Login/login_form'
import Footer from '../components/footer'

import "../assets/css/login_page.css";

const LoginPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    if (nickname) {
        navigate('/');
    }
  })

  return (
    <>
      <Header/>
      <div className="container">
        <div id="login_container">
          <h1 className="title font_kor">SPEICAL.FUNCTIONS에 로그인</h1>
          <p className='font_kor font-light'>소셜 로그인으로 서비스를 이용 할 수 있습니다.</p>

          <LoginForm />
        </div>
      </div>
      <Footer />
    </>

  )
}

export default LoginPage;