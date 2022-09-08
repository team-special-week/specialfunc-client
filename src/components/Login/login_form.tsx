import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleButton from 'react-google-button';
import { GoogleLogin } from "react-google-login";
import { useNavigate } from 'react-router-dom';
import { GOOGLE_AUTHORIZATION, KAKAO_AUTHORIZATION } from '../common/constants';

import '../../assets/css/login_form.css'

const LoginForm = () => {
  const navigate = useNavigate()

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: GOOGLE_AUTHORIZATION.CLIENT_ID,
        scope: 'email',
      });
    })
  }, [])

  const getAuthorizationByGoogleID = async (accessToken: string) => {
    const res = await fetch(`https://prod.spfunc.ml/auth/google?code=${accessToken}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )

    const data = await res.json();
    localStorage.setItem('isNewUser', data.isNewUser)
    localStorage.setItem('nickname', data.nickname)
    localStorage.setItem('profileImage', data.profileImageURL)
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('type', 'goggle')
    navigate('/');
  }

  return (
    <div id="login-container">
      <div style={{ height: 48 }} />
      <GoogleLogin
        clientId={GOOGLE_AUTHORIZATION.CLIENT_ID}
        onSuccess={
          (res: any) =>
            getAuthorizationByGoogleID(res.accessToken)
        }
        render={renderProps => (
          <GoogleButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ width: 256, height: 50 }} />
        )}
        onFailure={(err) => console.error(err)}
        cookiePolicy={'single_host_origin'} />
      <div style={{ height: 16 }} />
      <a href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_AUTHORIZATION.CLIENT_ID}&redirect_uri=${KAKAO_AUTHORIZATION.CALLBACK_URL}`}>
        <div id="kakao-login-btn">
          <img src='img/kakao_login_medium_narrow.png' alt="카카오 로그인" />
        </div>
      </a>

      <div style={{ height: 128 }} />
    </div>
  )
}

export default LoginForm;