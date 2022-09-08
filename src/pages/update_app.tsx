import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/header'
import Footer from '../components/footer'
import UpdateFunPre from '../components/update_fun_pre'
import Loading from '../components/loading'
import { Button, message, Modal} from 'antd';

import '../assets/css/update_app.css'
import { DeleteOutlined, SaveOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function App() {

    const [loading, setLoading] = useState(null);
    const [appname, setappname] = useState()
    const [funlist, setfunlist] = useState([])
    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        icon: "none",
        endpoint: "",
    });

    const {name, description, endpoint} = inputs;

    const [image, setImage] = useState({
        image_file: "",
        preview_URL: null,
    });

    const saveImage = (e: any) => {
        e.preventDefault();
        if (e.target.files[0]) {
            URL.revokeObjectURL(image.preview_URL);
            const preview_URL = URL.createObjectURL(e.target.files[0]);
            setImage(() => (
                {
                    image_file: e.target.files[0],
                    preview_URL: preview_URL
                }
            ))
        }
    }

    const deleteImage = () => {
        URL.revokeObjectURL(image.preview_URL);
        setImage({
            image_file: "",
            preview_URL: null,
        });
        inputs.icon = "none";
    }

    let inputRef;

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const navigate = useNavigate()

    const findendpoint = async () => {
        try {
            let response1 = await fetch(`https://prod.spfunc.ml/application?endpoint=${window.location.pathname.split('/')[2]}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })

            if (response1.status === 400 || response1.status === 403 || response1.status === 404) throw new Error('400 is unacceptable for me!');
            let resJSON = await response1.json();
            if (!response1.ok) {
                throw Error(resJSON.message);
            }
            setInputs({
                ...inputs,
                name: resJSON.name,
                description: resJSON.description,
                icon: resJSON.icon,
                endpoint: resJSON.endpoint,
            });
            setappname(resJSON.name);
            if (resJSON.icon !== "" && resJSON.icon !== "none") {
                setImage({
                    image_file: "",
                    preview_URL: `https://prod.spfunc.ml/file/download/${resJSON.icon}`,
                });
            }
            else {
                setImage({
                    ...image,
                    image_file: "",
                    preview_URL: null,
                });
            }

            let response2 = await fetch(`https://prod.spfunc.ml/function?appEndpoint=${window.location.pathname.split('/')[2]}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })

            let resJSON2 = await response2.json();
            if (!response2.ok) {
                throw Error(resJSON2.message);
            }

            setfunlist(resJSON2);
            console.log(resJSON2)
            setLoading(false);

        } catch(e) {
            setLoading(false);
            navigate('/error');
        }
    }

    const uploadimg = async () => {
        try {
            const formData = new FormData()
            formData.append('file', image.image_file);

            let response = await fetch(`https://prod.spfunc.ml/file/image`, {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            })

            if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('400 is unacceptable for me!');
            let resJSON = await response.json();
            if (!response.ok) {
                throw Error(resJSON.message);
            }
            inputs.icon = resJSON.uuid;
            return 1;
        }
        catch (e) {
            message.error('이미지 업로드에 실패했습니다.');
            return 0;
        }
    }

    const updateapp = async () => {
        try {
            let response = await fetch(`https://prod.spfunc.ml/application?endpoint=${window.location.pathname.split('/')[2]}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(inputs),
            })

            if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('400 is unacceptable for me!');
            message.success('애플리케이션 수정에 성공했습니다.');
            navigate('/applications');
        }
        catch (e) {
            message.error('애플리케이션 수정에 실패했습니다.');
        }
    }

    const deleteapp = async () => {
        try { 
            let response = await fetch(`https://prod.spfunc.ml/application?endpoint=${window.location.pathname.split('/')[2]}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })

            if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('400 is unacceptable for me!');
            message.success('애플리케이션 삭제에 성공했습니다.');
            navigate('/applications');
        } 
        catch (e) {
          message.error('애플리케이션 삭제에 실패했습니다.');
            return 0;
        } 
    }

    function Click1() {
      confirm({
        title: '정말로 삭제하시겠습니까?',
        icon: <ExclamationCircleOutlined />,
        content: `삭제하신다면 엔드포인트 ${window.location.pathname.split('/')[2]}는 앞으로 7일간 사용이 불가능합니다.`,
        okText: '네',
        okType: 'danger',
        cancelText: '아니오',
        onOk() {
          deleteapp();
        },
        onCancel() {},
      });
    }

    async function Click2() {
        if (inputs.endpoint[0] === '/') {
            inputs.endpoint = inputs.endpoint.slice(1, inputs.endpoint.length);
        }

        if (!/[a-zA-Z\d-]/g.test(`${inputs.endpoint}`)) {
            message.warning('엔드포인트는 영문, 숫자, 하이픈만 사용 할 수 있습니다.');
            return;
        }

        if (inputs.name === "" || inputs.endpoint === "") {
            message.warning('앱 이름과 엔드포인트는 필수 값 입니다.');
            return;
        }

        if (inputs.name.length < 3) {
          message.warning('앱 이름은 최소 3자 입니다.');
          return;
        }
    
        if (inputs.name.length > 50) {
          message.warning('앱 이름은 최대 50자 입니다.');
          return;
        }
    
        if (inputs.description.length > 200) {
          message.warning('앱 설명은 최대 200자 입니다.');
          return;
        }
    
        if (inputs.endpoint.length < 3) {
          message.warning('엔드포인트는 최소 3자 입니다.');
          return;
        }
    
        if (inputs.endpoint.length > 25) {
          message.warning('엔드포인트는 최대 25자 입니다.');
          return;
        }

        if (image.image_file !== "") {
            let res = await uploadimg();
            if(res === 1) {
                await updateapp();
            }
        }
        else {
            await updateapp(); 
        }
    }

    useEffect(() => {
        const nickname = localStorage.getItem('nickname');
        setLoading(true);
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
        {loading && <Loading />}
        <div className="container">
          <div className="app-icon-text-cont">
            {
            (inputs.icon === "none" || inputs.icon === "") ? (
            <img src={require('../assets/images/xbox.png')} alt="null" className="app-icon" />) : 
            (<img src={image.preview_URL} alt="icon" id="app-icon"/>)
            }
            <h1 className="title font-bold">{`${appname}`}</h1>
          </div>
          <div className="edit-container">
            <h3>개요</h3>
            <div className="edit-input-area">
              <div style={{ width: '48%' }}>
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  <b>애플리케이션 이름</b>
                </label>
                <div className="mt-1 flex rounded-md shadow-sm new_app_input_cont">
                  <input
                    type="text"
                    name="name"
                    className="new_app_input focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="애플리케이션 이름을 입력하세요."
                    value={name}
                    onChange={onChange}
                    maxLength={50}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                최소 길이: 3자, 최대 길이: 50자
                </p>
              </div>
              <div style={{ width: '2%' }} />

              <div style={{ width: '48%' }}>
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  <b>루트 엔드포인트</b>
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm able-copy">
                  https://prod.spfunc.ml/api/
                </span>
                  <input
                    type="text"
                    name="endpoint"
                    style={{ height: 48, paddingLeft: 16, border: '1px solid #DEE2E6' }}
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="엔드포인트를 입력하세요"
                    value={endpoint}
                    onChange={onChange}
                    maxLength={50}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                최소 길이: 3자, 최대 길이: 25자, 영문 숫자 하이픈(-)만 사용 가능, API 엔드포인트에 영향을 줍니다.
                </p>
              </div>

              <div style={{ width: '50%', marginTop: 32 }}>
                <label className="block text-sm font-medium text-gray-700">
                  <b>애플리케이션 아이콘</b>
                </label>
                <div className="mt-1 flex items-center">
                  {
                  image.preview_URL ? (
                    <img src={image.preview_URL} alt="preview" className="app-icon" />
                  ) : (
                    <img src={require('../assets/images/xbox.png')} alt="null" className="app-icon" />
                  )
                }


                  <input name="icon" type="file" accept="image/*" onChange={saveImage} onClick={(e : any) => {e.target.value = null}} ref={refParam => inputRef = refParam} style={{display: "none"}} />
                  <button
                    style={{ width: 96 }}
                    onClick={() => inputRef.click()}
                    type="button"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    업로드
                  </button>
                  <button
                    style={{ width: 96 }}
                    id="del-button"
                    onClick={() => deleteImage()}
                    type="button"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    삭제
                  </button>
                </div>
              </div>

              <div style={{ width: '48%', marginTop: 32 }}>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  <b>애플리케이션 설명</b>
                </label>
                <div className="textarea-input-cont shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md">
                <textarea
                  id="textarea-input"
                  name="description"
                  rows={3}
                  placeholder="애플리케이션에 대한 설명을 입력하세요."
                  value={description}
                  onChange={onChange}
                  maxLength={200}
                />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  최대 길이: 200자
                </p>
              </div>

              <div style={{ width: '100%', marginTop: 32, display: 'flex' }}>
                <Button type="primary" onClick={() => Click2()} id="save-button" size="large" shape="round"><SaveOutlined /> 설정 저장</Button>
                <Button danger type="link" onClick={() => Click1()} size="large" style={{ marginLeft: 'auto' }}><DeleteOutlined /> 애플리케이션 삭제</Button>
              </div>
            </div>
          </div>

          <div style={{ height: 64 }} />

          <div className="edit-container">
            <h3>함수</h3>

            <UpdateFunPre Data={funlist} />
            <Button
              style={{ margin: 32 }}
              type="primary" shape="round" size="large" id="app-create-btn" onClick={() => { window.location.href = `/application/${window.location.pathname.split('/')[2]}/newfun`; }}>
              새 함수 만들기
            </Button>

          </div>
        </div>

        <div style={{ height: 64 }} />
        <Footer />
      </>
    );

}

export default App;