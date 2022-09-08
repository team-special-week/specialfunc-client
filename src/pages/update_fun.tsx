import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/header'
import Footer from '../components/footer'
import Loading from '../components/loading'
import { Button, message, Select, Table, Tag, Divider, Modal } from 'antd';
import { DeleteOutlined, SaveOutlined, UploadOutlined, CopyOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Option } = Select;

const { confirm } = Modal;

function App() {

  const fileInput = React.useRef(null);

  const [inputs, setInputs] = useState({
    name: "",
    endpoint: "",
    httpMethod: ""
  });

  const [loading, setLoading] = useState(null);
  const [initmethod, setinitmethod] = useState("");
  const [appname, setappname] = useState()
  const [appEndpoint, setappEndpoint] = useState()
  const [funname, setfunname] = useState()
  const [funEndpoint, setfunEndpoint] = useState()
  const [History, setHistory] = useState([])
  const [build, setbuild] = useState({
    name: '',
    file: "",
  });

  const { name, endpoint } = inputs;

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const navigate = useNavigate()

  const F_GET = () => {return (<Tag color="#00B894">GET</Tag>)}
  const F_POST = () => {return (<Tag color="#0984E3">POST</Tag>)}
  const F_PUT = () => {return (<Tag color="#F39C12">PUT</Tag>)}
  const F_PATCH = () => {return (<Tag color="#F1C40F">PATCH</Tag>)}
  const F_DELETE = () => {return (<Tag color="#D63031">DELETE</Tag>)}

  const findendpoint = async () => {
    try {
      let response = await fetch(`https://prod.spfunc.ml/function/${window.location.pathname.split('/')[2]}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('400 is unacceptable for me!');
      let resJSON = await response.json();
      if (!response.ok) {
        throw Error(resJSON.message);
      }
      if (resJSON.length === 0) throw new Error('400 is unacceptable for me!');
      setInputs({
        ...inputs,
        name: resJSON.name,
        httpMethod: resJSON.httpMethod,
        endpoint: resJSON.endpoint,
      });
      setfunname(resJSON.name);
      setappEndpoint(resJSON.application.endpoint)
      setfunEndpoint(resJSON.endpoint)
      setappname(resJSON.application.name);
      setinitmethod(resJSON.httpMethod);
    } catch {
      setLoading(false);
      navigate('/error');
    }
  }

  const findhistory = async () => {
    try {
      let response = await fetch(`https://prod.spfunc.ml/function/${window.location.pathname.split('/')[2]}/release-history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('400 is unacceptable for me!');
      let resJSON = await response.json();
      if (!response.ok) {
        throw Error(resJSON.message);
      }
      setHistory(resJSON)
      setLoading(false)
    } catch {
      setLoading(false);
      navigate('/error');
    }
  }

  const updateapp = async () => {
    try {
      const uuid = window.location.pathname.split('/')[2];
      let response = await fetch(`https://prod.spfunc.ml/function/${uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(inputs),
      })

      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('404 is unacceptable for me!');
      message.success('함수 수정에 성공했습니다.');
      navigate('/functions');
    } catch {
      message.error('함수 수정에 실패했습니다.')
      return;
    }
  }

  const deleteapp = async () => {
    try {
      const uuid = window.location.pathname.split('/')[2];
      let response = await fetch(`https://prod.spfunc.ml/function/${uuid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('404 is unacceptable for me!');
      message.success('함수 삭제에 성공했습니다.');
      navigate('/functions');
    } catch {
      message.error('함수 삭제에 실패했습니다.');
      return;
    }
  }

  const Build_file = async () => {
    try {
      const uuid = window.location.pathname.split('/')[2];
      const formData = new FormData()
      formData.append('file', build.file);

      let response = await fetch(`https://prod.spfunc.ml/function/${uuid}/build`, {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })

      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('404 is unacceptable for me!');
      message.success('성공적으로 빌드 요청을 보냈습니다.');
      await findhistory();
    } catch {
      message.error('빌드 요청에 실패했습니다.');
    }
  }

  function Filenames(props: { Data: any }) {
    const { Data } = props;
    return (<div>{Data.name}</div>);
  }

  function Click1() {
    confirm({
      title: '정말로 삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '네',
      okType: 'danger',
      cancelText: '아니오',
      onOk() {
        deleteapp();
      },
      onCancel() {},
    });
  }

  function Click2() {
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

    updateapp();
  }

  async function Click3() {
    try{
      await navigator.clipboard.writeText(`https://prod.spfunc.ml/api/${appEndpoint}${funEndpoint}`);
      message.success('엔드포인트 주소 복사 성공');
      return;
    }
    catch {
      message.error('엔드포인트 주소 복사 실패');
      return;
    }
  }

  const handleChange = async (e: any) => {
    if (e.target.files) {
      setbuild({
        file: e.target.files[0],
        name: e.target.files[0]['name'],
      })
      build.file = e.target.files[0];
      build.name = e.target.files[0]['name'];

      await Build_file();
    }
  };

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    setLoading(true);
    if (nickname === null || nickname === undefined) {
      navigate('/login');
    }
    else {
      findendpoint();
      findhistory();
    }
  }, [])

  const onChangeSelect = (val: string) => {
    setInputs({
      ...inputs,
      'httpMethod': val,
    })
  }

  const statusToTag = (status: string) => {
    switch(status) {
      case 'COLD_START':
        return <Tag color="cyan">시작됨, 대기</Tag>
      case 'WARM_START':
        return <Tag color="green">시작됨, 가동</Tag>
      case 'DEPRECATED':
        return <Tag color="red">폐기됨</Tag>
      case 'BUILD_PROCESS':
        return <Tag color="gold">빌드 중</Tag>
      case 'BUILD_FAILURE':
        return <Tag color="magenta">빌드 실패</Tag>
      default:
        return <Tag color="magenta">UNKNOWN</Tag>
    }
  }

  const columns = [
    {
      title: 'Index',
      dataIndex: 'idx',
      key: 'idx',
    },
    {
      title: '함수 상태',
      dataIndex: 'status',
      key: 'status',
      render: (value) => statusToTag(value)
    },
    {
      title: '함수 크기',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '배포 날짜',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '변경 날짜',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
  ]

  return (
    <>
      <Header />
      <div className="container">
        {
          loading && (
            <Loading />
          )
        }

        {
          !loading && (
            <>
              <div style={{ height: 64 }} />
              <div className="flex items-center">
                {
                (initmethod === "GET") ? <F_GET/> : (initmethod === "POST") ? <F_POST/> : (initmethod=== "PUT") ? <F_PUT/> : (initmethod === "PATCH") ? <F_PATCH/> : <F_DELETE/>
                }
                <h1 className="title font-bold ml-[4px]">{`${appname} / ${funname}`}</h1>
              </div>
              <div style={{ height: 32 }} />
              <div className="edit-container">
                <h3>개요</h3>
                <div className="input-container" style={{ padding: 16, marginTop: 0, display: 'flex', width: '100%', flexWrap: 'wrap' }}>
                  <div style={{ width: '48%' }}>
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
                  </div>

                  <div style={{ width: '48%', marginLeft: '2%' }}>
                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                      <b>루트 엔드포인트</b>
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm able-copy">
                        https://prod.spfunc.ml/api/{appEndpoint}
                      </span>
                      <input
                        type="text"
                        name="endpoint"
                        style={{ height: 48, paddingLeft: 16, border: '1px solid #DEE2E6' }}
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300"
                        placeholder="엔드포인트를 입력하세요"
                        value={endpoint}
                        onChange={onChange}
                        maxLength={100}
                      />
                      <div className="inline-flex items-center justify-center px-1 rounded-r-md border border-r-0 border-gray-300 bg-gray-50 text-sm text-gray-500">
                        <Button type="link" icon={<CopyOutlined />} size="large" onClick={() => { Click3() }}></Button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                    최대 길이: 100자, (*)를 사용하여 모든 엔드포인트를 표현합니다.
                    </p>
                  </div>

                  <div style={{ width: '100%', marginTop: 32, marginBottom: 32 }}>
                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                      <b>요청 Method</b>
                    </label>
                    <Select defaultValue={inputs.httpMethod} style={{ width: 300, marginTop: 4 }} onChange={onChangeSelect}>
                      <Option key={"1"} value={"GET"}>GET</Option>
                      <Option key={"2"} value={"POST"}>POST</Option>
                      <Option key={"3"} value={"PUT"}>PUT</Option>
                      <Option key={"4"} value={"PATCH"}>PATCH</Option>
                      <Option key={"5"} value={"DELETE"}>DELETE</Option>
                    </Select>
                  </div>

                  <Button style={{ backgroundColor: '#1890FF', marginRight: 'auto' }} type="primary" shape="round" icon={<SaveOutlined />} size="large" onClick={() => { Click2() }}>설정 저장</Button>
                  <Button danger type="link" shape="round" icon={<DeleteOutlined />} size="large" onClick={() => { Click1() }}>함수 삭제</Button>
                </div>
              </div>

              <div className="edit-container" style={{ marginTop: 64 }}>
                <h3>함수 출시</h3>
                <div style={{ margin: 16 }}>
                  <Table dataSource={History.map((value: any, idx) => ({
                    idx: idx+1,
                    status: value.buildStatus,
                    size: `${value.zipFileSize} KB`,
                    created_at: moment(value.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                    updated_at: moment(value.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
                  })).reverse()} columns={columns} />

                  <input name="upload_build" ref={fileInput} type="file" accept=".zip" onChange={handleChange} onClick={(e: any) => { e.target.value = null }} style={{ display: "none" }} />
                  <div style={{ margin: 32 }}/>
                  <Button style={{ marginRight: 'auto' }} shape="round" icon={<UploadOutlined />} size="large" onClick={() => {
                    fileInput.current.click()
                  }}>새 배포 버전 만들기</Button>

                  <Divider/>
                  <b className = 'text-rose-600 text-2xl'> 주의 </b>
                  <ul className='mt-1'>
                    <li>빌드용으로 압축시 모든 파일을 선택하고 우클릭 {'->'} 압축을 이용하세요. 압축파일을 풀었을 때 디렉터리로 묶여서는 안됩니다.</li>
                    <li>압축 파일 안에 js 파일의 retuen 값이 req 객체 그대로 작성 할 시 오류가 발생합니다.</li>
                  </ul>

                </div>
              </div>
            </>
          )
        }

      </div>
      <div style={{ height: 64 }} />
        <Footer />
    </>
  );
}

export default App;