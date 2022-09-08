import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '../components/loading'

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    const provider = localStorage.getItem('type');
    if (provider === 'kakaologout') {
      localStorage.clear();
      navigate('/');
    }
    else {
      navigate('/error'); // 비정상 접근 차단
    }
  }, [])

  return (
    <div>
      <Loading />
    </div>
  );
}

export default App;
