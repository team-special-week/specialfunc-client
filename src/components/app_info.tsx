import React from 'react';

const Info = (props: { Data: any }) => {

    const { Data } = props;

    function Apps(start: number, end: number, len: number) {
        const tmp = Data.filter((item: any, index: number) => ((index <= end && index >= start && index < Data.length)))
        const col = tmp.map((item: any, index: number) => {
            return (
                <div className = {`${index === 2? 'w-[calc(33.333333%-10px)] h-full bg-white border-b-[2px] border-b-zinc-600 p-[15px] flex flex-row justify-start items-center text-center' : 'w-[calc(33.333333%-10px)] h-full bg-white border-b-[2px] border-b-zinc-600 p-[15px] flex flex-row justify-start items-center text-center mr-[15px]'}`} key={index} onClick={() => { window.location.href = `/applications/${item.endpoint}`; }}>
                    <div className='w-[70px] h-[70px] bg-zinc-400 rounded-lg mr-[15px] flex justify-center items-center text-center'> 
                        {(item.icon !== "" && item.icon !== "none") ? <img src = {`https://prod.spfunc.ml/file/download/${item.icon}`} height = {'100%'} width = {'100%'}/> : null}
                    </div>
                    <div className='w-[65%] h-full flex flex-col items-center text-start'>
                        <div className='w-full h-[calc(14px+0.25vmax)] font-["Noto_Sans_KR"] font-light text-[calc(10px+0.25vmax)] text-zinc-900 mb-[12px]'> {item.name} </div>
                        <div className='w-full h-[calc(12px+0.25vmax)] font-["Noto_Sans_KR"] font-light text-[calc(8px+0.25vmax)] text-zinc-500 mb-[12px]'> {item.description} </div>
                        <div className='w-full h-[calc(12px+0.25vmax)] font-["Noto_Sans_KR"] font-light text-[calc(8px+0.25vmax)] text-zinc-700'> {item.endpoint} </div>
                    </div>
                </div>
            )
        })

        return col
    }

    function Col() {

        if (Data.length === 0) return null

        const col_count = Data.filter((item: any, index: number) => (index % 3 === 0))
        const R = col_count.map((item: any, index: number) => (<div className= {`${(index !== col_count.length - 1) ? 'w-full h-[120px] mb-[15px] flex flex-row justify-start items-center text-center' : 'w-full h-[120px] flex flex-row justify-start items-center text-center'}`}  key={index}>{Apps(index * 3, index * 3 + 2, 3)}</div>))

        return R
    }

    return (
        <div className='w-[60vw] h-[auto] min-h-[250px] bg-zinc-200 p-[15px] mb-[35px] flex flex-col justify-start items-start text-center'>
            {Col()}
        </div>
    );
}

export default Info;