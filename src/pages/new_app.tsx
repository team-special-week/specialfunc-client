import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/header'
import Footer from '../components/footer'
import '../assets/css/new_app.css'
import { Button, message } from 'antd';

function App() {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    icon: "",
    endpoint: "",
  });

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: null,
  });

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    if (nickname === null || nickname === undefined) {
      navigate('/login');
    }
    URL.revokeObjectURL(image.preview_URL)
  }, [])

  const saveImage = (e : any) => {
    e.preventDefault();
    if(e.target.files[0]){
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL
      }))
    }
  }

  const deleteImage = () => {
    URL.revokeObjectURL(image.preview_URL);
    setImage({
      image_file: "",
      preview_URL: null,
    })
  }
  let inputRef;

  const { name, description, endpoint } = inputs;

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
  };

  const navigate = useNavigate()

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

      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error(""+response.status);
      let resJSON = await response.json();
      if (!response.ok) {
        throw Error(resJSON.message);
      }
      inputs.icon = resJSON.uuid;
      return 1;
    }
    catch (e) {
      message.error('????????? ???????????? ??????????????????.');
      return 0;
    }
  }

  const makeApplication = async () => {
    try {
      let response = await fetch(`https://prod.spfunc.ml/application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(inputs)
      })
      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error(""+response.status);
      message.success('?????????????????? ????????? ??????????????????.');
      navigate('/applications');
    } catch (e) {
      message.error('?????????????????? ????????? ??????????????????.');
    }
  }

  async function Click1() {
    if (inputs.endpoint[0] === '/') {
      inputs.endpoint = inputs.endpoint.slice(1, inputs.endpoint.length);
    }

    if (!/[a-zA-Z\d-]/g.test(`${inputs.endpoint}`)) {
      message.warning('?????????????????? ??????, ??????, ???????????? ?????? ??? ??? ????????????.');
      return;
    }

    if (inputs.name === "" || inputs.endpoint === "") {
      message.warning('??? ????????? ?????????????????? ?????? ??? ?????????.');
      return;
    }

    if (inputs.name.length < 3) {
      message.warning('??? ????????? ?????? 3??? ?????????.');
      return;
    }

    if (inputs.name.length > 50) {
      message.warning('??? ????????? ?????? 50??? ?????????.');
      return;
    }

    if (inputs.description.length > 200) {
      message.warning('??? ????????? ?????? 200??? ?????????.');
      return;
    }

    if (inputs.endpoint.length < 3) {
      message.warning('?????????????????? ?????? 3??? ?????????.');
      return;
    }

    if (inputs.endpoint.length > 25) {
      message.warning('?????????????????? ?????? 25??? ?????????.');
      return;
    }

    if (image.image_file !== "") {
      let res = await uploadimg();
      if(res === 1) {
        await makeApplication();
      }
    }
    else {
      await makeApplication();
    }
  }

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    if (nickname === null || nickname === undefined) {
      navigate('/login');
    }
    URL.revokeObjectURL(image.preview_URL)
  }, [])

  return (
    <>
      <Header />
      <div className="container">
        <div style={{ height: 64 }} />
        <h1 className="title font-bold">??? ?????????????????? ??????</h1>

        <div className="input-container">
          <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
            <b>?????????????????? ??????</b>
          </label>
          <div className="mt-1 flex rounded-md shadow-sm new_app_input_cont">
            <input
              type="text"
              name="name"
              className="new_app_input focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
              placeholder="?????????????????? ????????? ???????????????."
              value={name}
              onChange={onChange}
              maxLength={50}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            ?????? ??????: 3???, ?????? ??????: 50???
          </p>

          <div style={{ marginTop: 32 }}>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              <b>?????????????????? ??????</b>
            </label>
            <div className="textarea-input-cont shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md">
              <textarea
                id="textarea-input"
                name="description"
                rows={6}
                placeholder="????????????????????? ?????? ????????? ???????????????."
                value={description}
                onChange={onChange}
                maxLength={200}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              ?????? ??????: 200???
            </p>
          </div>

          <div style={{ marginTop: 32 }}>
            <label className="block text-sm font-medium text-gray-700">
              <b>?????????????????? ?????????</b>
            </label>
            <div className="mt-1 flex items-center">
              {
                image.preview_URL ? (
                  <img src={image.preview_URL} alt="null" className="app-icon" />
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
                ?????????
              </button>
              <button
                style={{ width: 96 }}
                id="del-button"
                onClick={() => deleteImage()}
                type="button"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                ??????
              </button>
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
              <b>?????? ???????????????</b>
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://prod.spfunc.ml/api/
              </span>
              <input
                type="text"
                name="endpoint"
                style={{ height: 48, paddingLeft: 16, border: '1px solid #DEE2E6' }}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="?????????????????? ???????????????"
                value={endpoint}
                onChange={onChange}
                maxLength={50}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              ?????? ??????: 3???, ?????? ??????: 25???, ?????? ?????? ?????????(-)??? ?????? ??????, API ?????????????????? ????????? ?????????.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 32 }} />
        <Button type="primary" shape="round" size="large" id="app-create-btn" onClick={() => { Click1(); }}>
          ??????
        </Button>
        <div style={{ marginTop: 64 }} />
      </div>
      <Footer />
    </>
  );
}

export default App;