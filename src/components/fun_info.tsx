import React from 'react';

import "../assets/css/fun_info.css"
import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

const Info = (props: { Data1 : any, Data2 : any }) => {

    const {Data1, Data2} = props;

    const F_GET = () => {return (<Tag color="#00B894">GET</Tag>)}
    const F_POST = () => {return (<Tag color="#0984E3">POST</Tag>)}
    const F_PUT = () => {return (<Tag color="#F39C12">PUT</Tag>)}
    const F_PATCH = () => {return (<Tag color="#F1C40F">PATCH</Tag>)}
    const F_DELETE = () => {return (<Tag color="#D63031">DELETE</Tag>)}
    const F_ANY = () => {return (<Tag color="magenta">ANY</Tag>)}
    
    function Funs(start: number, end: number, Data: any) {
        const tmp = Data.filter((item: any, index: number) => ((index <= end && index >= start && index < Data.length)))
        const col = tmp.map((item: any, index: number) => {
            return (
                <div className='w-1/2 h-full mb-[15px] flex flex-row justify-start items-center text-start' key={index} onClick={() => { window.location.href = `/functions/${item.uuid}`; }} style={{ cursor: 'pointer', height: 40, margin: 0 }}>
                    <div className='w-full h-[24px] mx-[5px] ml-[15px] font-["Noto_Sans_KR"] font-light text-[12px] flex justify-start items-center text-center'>
                        {(item.httpMethod === "GET") ? <F_GET/> : (item.httpMethod === "POST") ? <F_POST/> : (item.httpMethod === "PUT") ? <F_PUT/> : (item.httpMethod === "PATCH") ? <F_PATCH/> : (item.httpMethod === "DELETE") ? <F_DELETE/> : <F_ANY/>}
                        <p className="func-name">{item.name}</p>
                    </div>
                </div>
            )
        })
        return col
    }

    function F_Col(indexs : any) {

        if (Data2[indexs].length === 0) {
            return <p style={{ margin: 16, color: '#333333' }}>생성된 함수가 없습니다.</p>
        }

        const col_count = Data2[indexs].filter((item: any, index: number) => (index % 2 === 0))
        const R = col_count.map((item: any, index: number) => (
        <div key={index}>
            {Funs(index * 2, index * 2 + 1, Data2[indexs])}
        </div>
        ))

        return R
    }

    function Apps(start: number, end: number, len: number) {
        const tmp = Data1.filter((item: any, index: number) => ((index <= end && index >= start && index < Data1.length)))
        const col = tmp.map((item: any, index: number) => {
            return (
              <div className="app-container">
                  <div className="app-name">
                      <AppstoreOutlined style={{ fontSize: '1.125rem' }}/> <Link to={`/application/${item.endpoint}`}><p>{item.name}</p></Link>
                  </div>
                  <hr />

                  <div className="func-container py-1">
                      {(index + start) < Data2.length ?  F_Col(index + start) : null}
                  </div>
              </div>
            )
        })

        return col
    }

    function A_Col() {

        if (Data1.length === 0) return null

        const col_count = Data1.filter((item: any, index: number) => (index % 2 === 0))
        const R = col_count.map((item: any, index: number) => (
          <>
              {Apps(index * 2, index * 2 + 1, 2)}
          </>
        ))

        return R
    }

    return (
      <div className="function-container">
          {A_Col()}
      </div>
    );
}

export default Info;