import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from './pages/main_index'
import Guide from './pages/guide'

import Myapp from './pages/myapp'
import Newapp from './pages/new_app'
import Updateapp from './pages/update_app'

import Myfun from './pages/my_fun'
import Newfun from './pages/new_fun'
import Updatefun from './pages/update_fun'

import Login from './pages/login'
import KakaoLogin from './pages/kakaologin'
import KakaoLogout from './pages/kakaologout'

import Error from "./pages/error";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/guide" element={<Guide />} />

        <Route path="/login" element={<Login />} />
        <Route path="/kakaologin" element={<KakaoLogin />} />
        <Route path="/kakaologout" element={<KakaoLogout />} />
        
        <Route path="/applications" element={<Myapp />} />
        <Route path="/applications/newapp" element={<Newapp />} />

        <Route path="/application/:endpoint" element={<Updateapp />} />
        <Route path="/application/:endpoint/newfun" element={<Newfun />} />

        <Route path="/functions" element={<Myfun />} />
        <Route path="/functions/:funcuuid" element={<Updatefun />} />
        
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
