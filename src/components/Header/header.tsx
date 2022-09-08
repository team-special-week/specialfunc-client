import React, { useEffect, useState, Fragment } from 'react';
import { gapi } from 'gapi-script';
import { Menu, Transition } from '@headlessui/react'

import { KAKAO_AUTHORIZATION } from '../common/constants';

import '../../assets/css/header.css';
import { Link, useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const HeaderComp = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    const provider = localStorage.getItem('type');

    if (provider === 'kakao') {
      setProfile(null);
      localStorage.setItem('type', 'kakaologout');
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_AUTHORIZATION.CLIENT_ID}&logout_redirect_uri=${KAKAO_AUTHORIZATION.CALLBACK_URL2}`;
    }
    else if (provider === 'goggle') {
      var auth2 = gapi.auth2.getAuthInstance();

      if (auth2 !== undefined || auth2 != null) {
        auth2.signOut().then(auth2.disconnect())
        localStorage.clear();
        setProfile(null);
        navigate('/');
      }
    }
    else {
      localStorage.clear();
      setProfile(null);
      navigate('/error');
    } // 에러
  }

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    const provider = localStorage.getItem('type');
    const profileImage = localStorage.getItem('profileImage');

    if (nickname && provider && profileImage) {
      setProfile({
        nickname, provider, profileImage
      })
    } else {
      setProfile(null);
    }
  }, [])

  return (
    <header>
      <div className="container font_kor">
        <h3 id="main-logo">
          <Link to="/">SPECIAL.FUNCTIONS</Link>
        </h3>

        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            <Link to="/applications" className="font-medium text-gray-500 hover:text-gray-900">Applications</Link>
            <Link to="/functions" className="font-medium text-gray-500 hover:text-gray-900">Functions</Link>
            <Link to="/guide" className="font-medium text-gray-500 hover:text-gray-900">Wiki</Link>
          </div>
        </nav>

        <div id="login-container">
          {
            profile === null ? (
              <Link to="/login" className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">로그인</Link>
            ) : (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button>
                    <img src={profile.profileImage} alt="profile" id="profile-img" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 z-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ zIndex: 10 }}>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900 font-light text-right' : 'text-gray-700',
                              'block px-4 py-2 text-sm font-light text-right'
                            )}
                            onClick={logout}
                          >
                            로그아웃
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default HeaderComp;
