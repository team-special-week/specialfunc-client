import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '../components/loading'
import { KAKAO_AUTHORIZATION } from '../components/common/constants';

function App() {

  const location = useLocation()
  const navigate = useNavigate()
  const KAKAO_CODE = location.search.split('=')[1]

  const getKakaoToken = async () => {
    try {
      let response = await fetch(`https://kauth.kakao.com/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=authorization_code&client_id=${KAKAO_AUTHORIZATION.CLIENT_ID}&redirect_uri=${KAKAO_AUTHORIZATION.CALLBACK_URL}&code=${KAKAO_CODE}`,
      })

      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('404 is unacceptable for me!');
      let resJSON = await response.json();
      if (!response.ok) {
        throw Error(resJSON.message);
      }

      let token = resJSON.access_token;

      let response2 = await fetch(`https://prod.spfunc.ml/auth/kakao?code=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
        },
      })

      if (response2.status === 400 || response2.status === 403 || response2.status === 404) throw new Error('404 is unacceptable for me!');
      let resJSON2 = await response2.json();
      if (!response2.ok) {
        throw Error(resJSON2.message);
      }

      localStorage.setItem('nickname', resJSON2.nickname)
      localStorage.setItem('profileImage', resJSON2.profileImageURL)
      localStorage.setItem('token', resJSON2.accessToken)
      localStorage.setItem('type', 'kakao')
      navigate('/');

    } catch (e) {
      navigate('/error'); // 비정상 접근 차단
    }
}

useEffect(() => {
  if (!location.search) {
    navigate('/error');
  }
  getKakaoToken();
}, [])

return (
  <div>
    <Loading />
  </div>
);
}

export default App;
