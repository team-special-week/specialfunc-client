import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/header';
import Loading from '../components/loading';

import '../assets/css/my_apps.css';
import { CheckOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PROD_SPFUNC } from '../components/common/constants';
import { Button, Result } from 'antd';
import Footer from '../components/footer';

const MyApplications = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [myApps, setMyApps] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchMyApplications = async () => {
    setLoading(true);

    const res = await fetch(`https://prod.spfunc.ml/application?endpoint=`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })

    const data = await res.json();
    setMyApps(data);
    setLoading(false);
  }

  useEffect(() => {
    // 로그인 여부 확인
    const nickname = localStorage.getItem('nickname');
    if (!nickname) {
      navigate('/login');
      return;
    }

    // 최초 실행에서 데이터 읽기
    fetchMyApplications().catch((ex) => alert(`An error occurred: ${ex?.message}`))
  }, [])

  return (
    <>
      <Header />

      <div id="apps-container">
        <div className="container">
          <div className="col-span-3 sm:col-span-2 font_kor">
            <label htmlFor="company-website" className="block font_kor text-sm font-medium text-gray-700">
              <b>{`${localStorage.getItem('nickname')}의 계정에서 검색`}</b>
            </label>
            <div className="mt-1 flex rounded-md shadow-sm" id="search-container">
              <SearchOutlined style={{ marginLeft: 16, marginRight: 16 }} />
              <input
                id="search-input"
                className="font-light"
                type="text"
                style={{ height: 40, width: 250 }}
                value={searchText}
                placeholder="애플리케이션 이름 입력"
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div style={{ height: 64 }} />
          <h1 className="title font-bold">애플리케이션</h1>
          
          {
            loading ? (
              <Loading />
            ) : (
              <>

                <br />
                <div className="apps-item-container">
                  {
                    myApps.length === 0 && (
                      <div style={{ width: '100%' }}>
                        <Result
                          title="애플리케이션이 없습니다."
                          subTitle="새 애플리케이션을 생성하십시오."
                          extra={
                            <Button type="primary" key="console" style={{ backgroundColor: 'rgb(26,120,254)' }} onClick={() => navigate('/applications/newapp')}>
                              새 애플리케이션 생성
                            </Button>
                          }
                        />
                      </div>

                    )
                  }
                  {
                    myApps.filter(value => value.name.indexOf(searchText) !== -1).length === 0 && myApps.length !== 0 && (
                      <p>표시할 애플리케이션이 없습니다. 검색어를 조정하십시오.</p>
                    )
                  }
                  {
                    myApps.filter(value => value.name.indexOf(searchText) !== -1).map((value) => (
                      <div className="apps-item" onClick={() => { navigate(`/application/${value.endpoint}`) }}>
                        {
                          (value.icon === "none" || value.icon === "") ? (
                            <img src={require('../assets/images/xbox.png')} alt="null" className="app-icon" />
                          ) : (
                            <img src={`${PROD_SPFUNC}/file/download/${value.icon}`} alt="icon" />
                          )
                        }
                        <div className="apps-item-text">
                          <h3>{value.name}</h3>
                          <div>
                            <p><CheckOutlined style={{ color: "#27ae60" }} /> 활성</p>
                            <p style={{ color: '#969696' }}>/api/{value.endpoint}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </>
            )
          }
          <div style={{ height: 32 }} />
          <Button type="primary" shape="round" icon={<PlusOutlined />} size="large" id="add-new-app" onClick={() => navigate('/applications/newapp')}>새 애플리케이션 생성</Button>
        </div>
      </div>
      <div style={{ height: 64 }} />
      <Footer />
    </>
  )
}

export default MyApplications;
