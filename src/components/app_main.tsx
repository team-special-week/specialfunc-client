import React, { useState } from "react";

const App = (props: { getData: any, str: string, str2: string }) => {

    const { getData, str, str2 } = props;
    const [Search, setSearch] = useState("");

    return (
        <div className='w-[60vw] h-[40px] mb-[35px] flex flex-row justify-between items-center text-center'>
            <div className='w-[auto] h-[100%] font-["Noto_Sans_KR"] text-zinc-900 font-medium text-[32px] flex justify-center items-center text-center'> {str} </div>
            <div className='w-[300px] h-[100%] border-[2px] border-zinc-400 font-["Noto_Sans_KR"] font-light text-[14px] p-[5px] rounded-lg flex justify-center items-center'>
                <input className='w-full h-[90%] border-none text-zinc-400 flex text-left items-start justify-start' type="text" placeholder={str2} onChange={(e: any) => { setSearch(e.target.value); }}/>
                <div className='w-[16px] h-[16px] ml-[5px] bg-zinc-400' onClick={() => { { getData(Search); } }} />
            </div>
        </div>
    );
}

export default App;