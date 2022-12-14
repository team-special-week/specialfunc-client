import React, {useEffect, useState} from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/header'
import Footer from '../components/footer'
import Funinfo from '../components/fun_info'
import Loading from '../components/loading'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

function App() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(null);
    const [searchText, setSearchText] = useState('');

    const [allApp, setallApp] = useState([]);
    const [allFun, setallFun] = useState([]);
    const [myFun, setmyFun] = useState([]);

    const getData = (Search: string) => {
        setmyFun([]) 
        if(!Search) {
            setmyFun(allFun)
        }
        else {
            for (var i = 0; i < allFun.length; i++) {
                const tmp = allFun[i].filter((item: any, index: number) => (item.name === Search))
                setmyFun(arr => [...arr, tmp])
            }
        }
    }

    const getFunction = async (endpoint : any) => {
        try {
            let response =  await fetch(`https://prod.spfunc.ml/function?appEndpoint=${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })
            if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('404 is unacceptable for me!');
            let resJSON = await response.json();
            if (!response.ok) {
                throw Error(resJSON.message);
            }
            return resJSON;
        } catch(e) {
            setLoading(false);
            navigate('/error');
        }
    }

    const getApplication = async () => {
        try {
            let response =  await fetch(`https://prod.spfunc.ml/application?endpoint=`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
              },
            })
            if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('404 is unacceptable for me!');
            let resJSON = await response.json();
            if (!response.ok) {
                throw Error(resJSON.message);
            }
            return resJSON;
        } catch(e) {
            setLoading(false);
            navigate('/error');
        }
    }
    
    async function init() {
        const data = await getApplication();
        setallApp(data);

        for (var i = 0; i < data.length; i++) {
            const tmp = await getFunction(data[i].endpoint);
            setallFun(arr => [...arr, tmp])
            setmyFun(arr => [...arr, tmp])
        }

        setLoading(false)
    }

    useEffect(() => {
        const nickname = localStorage.getItem('nickname');
        setLoading(true);
        if (nickname === null || nickname === undefined) {
            navigate('/login');
        }
        else {
            init();
        }
    },[])

    return (
      <>
          <Header />
          <div className="container">
              <div style={{ height: 64 }} />

              <div className="col-span-3 sm:col-span-2">
                  <label htmlFor="company-website" className="block font_kor text-sm font-medium text-gray-700">
                      <b>{`${localStorage.getItem('nickname')}??? ???????????? ??????`}</b>
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm" id="search-container">
                      <SearchOutlined style={{ marginLeft: 16, marginRight: 16 }}/>
                      <input
                        id="search-input"
                        className="font-light"
                        type="text"
                        style={{ height: 40 }}
                        value={searchText}
                        placeholder="?????? ?????? ??????"
                        onChange={e => setSearchText(e.target.value)}
                      />
                  </div>
              </div>
              <div style={{ height: 64 }} />

              <h1 className="title font-bold">??????</h1>
              <br />
              {
                  loading && (
                    <Loading />
                )
              }
              {
                  (!loading && allApp.length === 0) && (
                  <div style={{ width: '100%' }}>
                      <Result
                        title="????????????????????? ????????????."
                        subTitle="????????? ????????????????????? ?????? ??? ?????? ??? ??? ????????????."
                        extra={
                            <Button type="primary" key="console" style={{ backgroundColor: 'rgb(26,120,254)' }} onClick={() => navigate('/applications/newapp')}>
                                ??? ?????????????????? ??????
                            </Button>
                        }
                      />
                  </div>
                )
              }
            {
                allApp.filter(value => value.name.indexOf(searchText) !== -1).length === 0 && allApp.length !== 0 && (
                    <p>????????? ????????????????????? ????????????. ???????????? ??????????????????.</p>
                )
            }
              <Funinfo Data1 = {allApp.filter((value) => value.name.indexOf(searchText) !== -1)} Data2 = {myFun}/>
          </div>
          <Footer />
      </>
    )
}

export default App;