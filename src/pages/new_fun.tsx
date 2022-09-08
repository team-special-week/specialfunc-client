import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/header'
import Footer from '../components/footer'
import { Button, message, Select } from 'antd';
const { Option } = Select;

function App() {

  const [inputs, setInputs] = useState({
    name: "",
    endpoint: "",
    httpMethod: "GET"
  });

  const { name, endpoint } = inputs;

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onChangeSelect = (val: string) => {
    setInputs({
      ...inputs,
      'httpMethod': val,
    })
  }

  const navigate = useNavigate()

  const findendpoint = async () => {
    try {
      let response = await fetch(`https://prod.spfunc.ml/application?endpoint=${window.location.pathname.split('/')[2]}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('404 is unacceptable for me!');
    } catch {
      navigate('/error');
    }
  }

  const makeFunction = async () => {
    try {
      const cpInputs = { ...inputs };
      cpInputs.endpoint = '/' + cpInputs.endpoint;

      let response = await fetch(`https://prod.spfunc.ml/function?appEndpoint=${window.location.pathname.split('/')[2]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(cpInputs),
      })

      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('404 is unacceptable for me!');
      message.success('함수 생성에 성공했습니다.');
      navigate('/functions');
    } catch {
      message.error('함수 생성에 실패했습니다.')
      return;
    }
  }

  function Click1() {
    const isEndpointValid = (endpoint: string) => {
      // 공백 제거
      endpoint = endpoint.trim();

      // 첫 슬레시 제거
      if (endpoint[0] === '/') {
        endpoint = endpoint.slice(1, endpoint.length);
      }

      const element = endpoint.split('/');
      for (const el of element) {
        if (el.length === 0) {
          return false;
        }

        if (!/^\/[a-zA-Z\d-*]*/g.test(`/${el}`)) {
          return false;
        }
      }

      return true;
    }

    if (!isEndpointValid(inputs.endpoint)) {
      message.warning('엔드포인트가 잘못된 규격 입니다.');
      return;
    }

    if (inputs.endpoint[0] === '/') {
      // 첫 글자에 슬래시가 포함된 경우
      inputs.endpoint = inputs.endpoint.slice(1, inputs.endpoint.length);
    }

    if (inputs.name === "" || inputs.endpoint === "") {
      message.warning('함수 이름과 엔드포인트는 필수 입니다.');
      return;
    }

    if (inputs.httpMethod === "선택하세요" || inputs.httpMethod === "") {
      message.warning('HTTP Method 를 선택하세요.');
      return;
    }

    if (inputs.name.length < 3) {
      message.warning('함수 이름은 최소 3자 입니다.');
      return;
    }

    if (inputs.name.length > 75) {
      message.warning('함수 이름은 최대 75자 입니다.');
      return;
    }

    if (inputs.endpoint.length > 100) {
      message.warning('엔드포인트는 최대 100자 입니다.');
      return;
    }

    makeFunction();
  }

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    if (nickname === null || nickname === undefined) {
      navigate('/login');
    }
    else {
      findendpoint();
    }
  }, [])

  return (
    <>
      <Header />
      <div className="container">
        <div style={{ height: 64 }} />
        <h1 className="title font-bold">{window.location.pathname.split('/')[2]}에서 새 함수 생성</h1>

        <div className="input-container">
          <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
            <b>함수 이름</b>
          </label>
          <div className="mt-1 flex rounded-md shadow-sm new_app_input_cont">
            <input
              type="text"
              name="name"
              className="new_app_input focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
              placeholder="함수 이름을 입력하세요."
              value={name} onChange={onChange}
              maxLength={75}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            최소 길이: 3자, 최대 길이: 75자
          </p>

          <div style={{ marginTop: 32 }}>
            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
              <b>루트 엔드포인트</b>
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://prod.spfunc.ml/api/{window.location.pathname.split('/')[2]}
              </span>
              <input
                type="text"
                name="endpoint"
                style={{ height: 48, paddingLeft: 16, border: '1px solid #DEE2E6' }}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="엔드포인트를 입력하세요"
                value={endpoint}
                onChange={onChange}
                maxLength={100}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              최대 길이: 100자, (*)를 사용하여 모든 엔드포인트를 표현합니다.
            </p>
          </div>

          <div style={{ marginTop: 32 }}>
            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
              <b>요청 Method</b>
            </label>
            <Select defaultValue="GET" style={{ width: 300, marginTop: 4 }} onChange={onChangeSelect}>
              <Option key={"1"} value={"GET"}>GET</Option>
              <Option key={"2"} value={"POST"}>POST</Option>
              <Option key={"3"} value={"PUT"}>PUT</Option>
              <Option key={"4"} value={"PATCH"}>PATCH</Option>
              <Option key={"5"} value={"DELETE"}>DELETE</Option>
            </Select>
          </div>
        </div>

        <div style={{ marginTop: 32 }} />
        <Button type="primary" shape="round" size="large" id="app-create-btn" onClick={() => { Click1(); }}>
          생성
        </Button>
        <div style={{ marginTop: 64 }} />
      </div>
      <Footer />
    </>
  );
}

export default App;