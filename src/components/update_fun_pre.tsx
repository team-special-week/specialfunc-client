import React from 'react';
import { Tag } from 'antd';

const Info = (props: { Data: any }) => {

    const { Data } = props;

    const F_GET = () => {return (<Tag color="#00B894">GET</Tag>)}
    const F_POST = () => {return (<Tag color="#0984E3">POST</Tag>)}
    const F_PUT = () => {return (<Tag color="#F39C12">PUT</Tag>)}
    const F_PATCH = () => {return (<Tag color="#F1C40F">PATCH</Tag>)}
    const F_DELETE = () => {return (<Tag color="#D63031">DELETE</Tag>)}
    const F_ANY = () => {return (<Tag color="magenta">ANY</Tag>)}

    function Funs(start: number, end: number, len: number) {
        const tmp = Data.filter((item: any, index: number) => ((index <= end && index >= start && index < Data.length)))
        const col = tmp.map((item: any, index: number) => {
            return (
              <div className='w-1/2 h-full mb-[15px] flex flex-row justify-start items-center text-start' key={index} onClick={() => { window.location.href = `/functions/${item.uuid}`; }} style={{ cursor: 'pointer', margin: 0 }}>
                  <div className='w-full h-[24px] mx-[5px] ml-[15px] font-["Noto_Sans_KR"] font-light text-[12px] flex justify-start items-center text-center'>
                      {(item.httpMethod === "GET") ? <F_GET/> : (item.httpMethod === "POST") ? <F_POST/> : (item.httpMethod === "PUT") ? <F_PUT/> : (item.httpMethod === "PATCH") ? <F_PATCH/> : (item.httpMethod === "DELETE") ? <F_DELETE/> : <F_ANY/>}
                      <p className="func-name">{item.name}</p>
                  </div>
              </div>
            )
        })
        return col
    }

    function Col() {
        if (Data.length === 0) return null

        const col_count = Data.filter((item: any, index: number) => (index % 2 === 0))
        const R = col_count.map((item: any, index: number) => (<div className='w-full h-[40px] mb-[15px] flex flex-row justify-between text-center' key={index}>{Funs(index * 2, index * 2 + 1, 2)}</div>))

        return R
    }

    return (
      <div className="function-container" style={{ minHeight: 150, margin: 16 }}>
          {Col()}
      </div>
    );
}

export default Info;