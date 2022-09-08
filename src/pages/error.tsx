import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

import Header from '../components/Header/header'
import Footer from '../components/footer'

function App() {
    const navigate = useNavigate();
    return (
        <div className="min-h-[100vh] bg-white">
            <Header />
            <div className='w-full h-[80vh] pt-[30px] px-[20%] bg-white items-center justify-center text-center'>
                <div style={{ width: '100%' }}>
                    <Result
                        status="error"
                        title = "에러가 발생하였습니다."
                        subTitle = "허용되지 않은 페이지로 접근하셨거나 기타 에러 발생입니다."
                        extra={
                            <Button type="primary" key="console" style={{ backgroundColor: 'rgb(26,120,254)' }} onClick={() => navigate('/')}>
                                메인페이지로 돌아가기
                            </Button>
                          }
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;