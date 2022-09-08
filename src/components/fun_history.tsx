import React from 'react';

const App = (props: { Data : any}) => {

    const {Data} = props;

    function his() {
        if (Data.length === 0) return (
            <tr>
                <td className='w-auto h-[30px] bg-white font-["Noto_Sans_KR"] font-light text-[14px]'>  </td>
                <td className='w-auto h-[30px] bg-white font-["Noto_Sans_KR"] font-light text-[14px]'>  </td>
                <td className='w-auto h-[30px] bg-white font-["Noto_Sans_KR"] font-light text-[14px]'>  </td>
                <td className='w-auto h-[30px] bg-white font-["Noto_Sans_KR"] font-light text-[14px]'>  </td>
            </tr>
        );

        const R = Data.reverse().map((item: any, index: number) => (
                <tr key={index}>
                        <td className='w-auto h-[30px] bg-white text-zinc-700 font-["Noto_Sans_KR"] font-light text-[14px]'> {item.buildStatus} </td>
                        <td className='w-auto h-[30px] bg-white text-zinc-700 font-["Noto_Sans_KR"] font-light text-[14px]'> {item.createdAt} </td>
                        <td className='w-auto h-[30px] bg-white text-zinc-700 font-["Noto_Sans_KR"] font-light text-[14px]'> {item.updatedAt} </td>
                        <td className='w-auto h-[30px] bg-white text-zinc-700 font-["Noto_Sans_KR"] font-light text-[14px]'> {item.zipFileSize} </td>
                </tr>
        ))

        return R
    }

    return (
        <div className='common_setup'>
            <table className='w-full h-auto bg-zinc-300 text-zinc-900 border-none border-spacing-0 rounded-md'>
                <tbody>
                    <tr className='a'>
                        <th className='w-auto h-[60px] border-b-[2px] border-b-zinc-400 font-["Noto_Sans_KR"] font-bold text-[14px]'> 상태 </th>
                        <th className='w-auto h-[60px] border-b-[2px] border-b-zinc-400 font-["Noto_Sans_KR"] font-bold text-[14px]'> 생성 시간 </th>
                        <th className='w-auto h-[60px] border-b-[2px] border-b-zinc-400 font-["Noto_Sans_KR"] font-bold text-[14px]'> 반영 시간 </th>
                        <th className='w-auto h-[60px] border-b-[2px] border-b-zinc-400 font-["Noto_Sans_KR"] font-bold text-[14px]'> 파일 크기 </th>
                    </tr>
                    {his()}
                </tbody>
            </table>
        </div>
    );
}

export default App;