import React, { useState } from 'react';

import type { MenuProps} from 'antd';
import { Button, Layout, Menu, Typography, Divider, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import Header from '../components/Header/header'
import Footer from '../components/footer'

const { Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
): MenuItem {
    return {
        key,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<a href="#C1">Special Function에 대하여</a>, '1'),
    getItem(<a href="#C2">구성요소 - 애플리케이션</a>, '2'),
    getItem(<a href="#C3">구성요소 - 함수</a>, '3'),
    getItem(<a href="#C4">런타임 및 실행환경</a>, '4'),
    getItem(<a href="#C5">모범사례 - JSON Placeholder</a>, '5'),
    getItem(<a href="#C6">모범사례 - TODO App</a>, '6'),
];

function App() {

    const [fix, setfix] = useState(false)
    const [scroll, setscroll] = useState('1')

    function setfixed() {
        if (window.scrollY >= 132) {
            setfix(true)
        }
        else {
            setfix(false)
        }
    }

    function setscrolled() {
        if (document.getElementById('C2').getBoundingClientRect().top > 5) {
            setscroll('1')
        }
        else if (document.getElementById('C3').getBoundingClientRect().top > 5) {
            setscroll('2')
        }
        else if (document.getElementById('C4').getBoundingClientRect().top > 5) {
            setscroll('3')
        }
        else if (document.getElementById('C5').getBoundingClientRect().top > 5) {
            setscroll('4')
        }
        else if (document.getElementById('C6').getBoundingClientRect().top > 5) {
            setscroll('5')
        }
        else {
            setscroll('6')
        }
    }

    window.addEventListener("scroll", setfixed)
    window.addEventListener("scroll", setscrolled)

    async function Copy(id : string) {
        try{
          await navigator.clipboard.writeText(document.getElementById(id).innerText);
          message.success('복사 성공');
          return;
        }
        catch {
          message.error('복사 실패');
          return;
        }
    }

    return (
        <>
            <Header />
            <div style={{ marginTop: 32 }} />
            <Layout style={{ minHeight: '100vh' }}>
                <Sider className={fix ? "bg-white fixed top-0 font_kor" : "bg-white font_kor"} width="18vw">
                    <Menu mode="inline" selectedKeys={[scroll]} items={items} style={{ minHeight: '100vh', height: 'auto', width: "100%" }} />
                </Sider>
                <Layout className={fix ? "bg-white ml-[18vw] font_kor" : "bg-white font_kor"} style={{ padding: '0px 64px 0px 64px' }}>
                    <Typography>
                        <Title level={1} id="C1">Special Function에 대하여</Title>
                        <p className = 'mb-0 mt-7'>Special function은 서버를 프로비저닝 하거나 구축하지 않고도 코드를 실행 할 수 있는 컴퓨팅 서비스 입니다.</p>
                        <p className = 'mb-0'>준비된 컴퓨팅 인프라에서 코드를 실행하고, 용량과 성능을 자동으로 관리를 합니다.</p>
                        <p>Special function 을 사용하면 NodeJS 기반의 거의 모든 유형의 애플리케이션을 별도의 복잡한 설치 과정 없이 손쉽게 실행 할 수 있습니다.</p>
                        <br />
                        <blockquote className = 'py-2'>
                            <b>메모</b>
                            <p className = 'mt-2'>이 안내에는 독자가 NodeJS에 관한 전반적인 지식이 있다고 가정합니다. <br /> NodeJS 에 관한 자세한 내용은 <b><a href='https://nodejs.org'>https://nodejs.org</a></b> 를 참고하십시오</p>
                        </blockquote>
                        <br />
                        <p className = 'mb-0'>Javascript 로 작성한 코드를 함수로 구성합니다.</p>
                        <p className = 'mb-0'>작성된 함수는 필요할 때 실행되고, 요청량에 따라 COLD(준비 상태) 또는 WARM(응답 가능 상태) 상태를 가집니다.</p>
                        <p>Special function 을 사용하면 NodeJS 기반의 거의 모든 유형의 애플리케이션을 별도의 복잡한 설치 과정 없이 손쉽게 실행 할 수 있습니다.</p>

                        <Title level={3} style={{marginBottom : '10px' }}>시나리오</Title>
                        <p className = 'mb-0'>서비스가 표준 런타임 환경을 사용하고, 컴퓨팅 환경의 리소스를 애플리케이션 코드가 효율적으로 이용해야하는 시나리오에서 이상적입니다.</p>
                        <p className = 'mb-0'>함수는 실행할 코드에 대해서만 책임을 집니다. 코드를 실행하기 위한 메모리, CPU 등 기타 컴퓨팅 리소스는 플랫폼 내에서 자체적으로 관리합니다.</p>
                        <p className = 'mb-0'>따라서 함수가 실행되는 운영체제 또는 제공된 런타임에 대해 사용자가 지정을 할 수 없습니다.</p>
                        <br />
                        <blockquote className = 'py-2'>
                        <p className = 'mb-2'><b>이러한 분에게 추천드립니다.</b></p>
                        <ul>
                            <li><b>별도의 컴퓨팅 리소스를 관리하지 않고 코드를 실행하는 경우</b></li>
                            <li><b>작은 규모 또는 취미를 위한 프로젝트</b></li>
                            <li><b>모킹 등, REST 규격의 API 작성을 빠르게 해야하는 경우</b></li>
                        </ul>
                        </blockquote>
                        <br />
                        <Divider />

                        <Title level={1} id="C2">구성요소 - 애플리케이션</Title>
                        <p className = 'mb-0 mt-7'>애플리케이션은 함수를 묶는 논리적인 집합입니다. 애플리케이션을 직접 호출 할 수는 없으나, 각 함수들의 논리적 경계를 만듭니다.</p>
                        <p>함수는 반드시 한 개의 애플리케이션에 종속되어 있어야 합니다.</p>
                        <Title level={3} style={{marginBottom : '10px' }}>이름</Title>
                        <p className = 'mb-0'>이름은 사람이 구분 가능한 애플리케이션의 특징적 요소입니다.</p>
                        <p className = 'mb-0'>서비스 명 또는 종속될 함수들의 공통적인 특징을 활용하여 짓도록 합니다.</p>
                        <p>언제든 변경 할 수 있으며, 다른 애플리케이션과 중복 될 수 있습니다.</p>
                        <Title level={3} style={{marginBottom : '10px' }}>설명</Title>
                        <p>애플리케이션에 대한 주석이며, 함수 실행에 어떤 영향도 미치지 않습니다.</p>
                        <Title level={3} style={{marginBottom : '10px' }}>아이콘</Title>
                        <p>애플리케이션을 표현하는 아이콘 입니다. png, jpg 파일을 업로드하여 등록합니다.</p>
                        <Title level={3} style={{marginBottom : '10px' }}>루트 엔드포인트</Title>
                        <p className = 'mb-0'>함수를 트리깅 할 때 사용하는 엔드포인트의 상위 그룹입니다.</p>
                        <p className = 'mb-0'>영문 숫자 하이픈(-)을 이용하여 조합합니다.</p>
                        <p>종속된 함수의 엔드포인트에 상위 레벨을 가지고 있어 변경시 모든 함수 호출에 영향을 줍니다. 따라서 신중하게 선택해주십시오.</p>
                        <br />
                        <Divider />

                        <Title level={1} id="C3">구성요소 - 함수</Title>
                        <p className = 'mt-7'>함수는 실질적인 Javascript 코드가 사용되는 영역입니다. 함수는 항상 애플리케이션에 종속되어 있습니다. </p>
                        <Title level={3} style={{marginBottom : '10px' }}>이름</Title>
                        <p className = 'mb-0'>이름은 사람이 구분 가능한 함수의 특징적 요소 입니다.</p>
                        <p className = 'mb-0'>함수가 하는 역할을 활용하여 짓도록 합니다.</p>
                        <p>언제든 변경 할 수 있으며, 다른 함수와 중복될 수 있습니다.</p>
                        <Title level={3} style={{marginBottom : '10px' }}>엔드포인트</Title>
                        <p className = 'mb-0'>함수가 트리깅 될 때 사용되는 리소스 주소입니다.</p>
                        <p className = 'mb-0'>함수의 리소스 주소는 /api/:app-endpoint/:function-endpoint 형태를 가집니다.</p>
                        <p>영문, 숫자, 하이픈, 에스터리스크(*)를 사용하여 만들며, 에스터리스크는 모든 값을 수용하는 특수한 값 입니다.</p>
                        <blockquote className = 'py-2'>
                        <p className = 'mb-2'><b>예시</b></p>
                        <ul>
                            <li>/test-function 로 입력하는 경우 <b> 예) /api/:app-endpoint/test-function</b></li>
                            <li>/test/* 로 입력하는 경우 <b> 예) /api/:app-endpoint/test/*</b></li>
                            <li>/test/*/build 로 입력하는 경우 <b> 예) /api/:app-endpoint/test/*/build</b></li>
                        </ul>
                        </blockquote>
                        <Title level={3} style={{marginBottom : '10px' }}>HTTP Method</Title>
                        <p className = 'mb-0'>함수를 트리깅 할 때 사용되는 http method 입니다.</p>
                        <p>현재 ANY 는 지원하고 있지 않습니다. 특정한 Method 를 선택해주세요.</p>
                        <Title level={3} style={{marginBottom : '10px' }}>코드 작성하기</Title>
                        <p className = 'mb-3'>함수에 사용할 코드를 작성 할 때, Special function 에서 호출할 수 있는 형태로 만들어야 합니다.</p>
                        <blockquote className = 'py-2'>
                        <ol>
                            <li>node 및 npm 을 설치한 환경에서 진행합니다.</li>
                            <li>새 디렉터리를 만들고, npm init 명령어로 프로젝트를 초기화 합니다.</li>
                            <li>main.js 파일을 만들고 아래 예제를 작성합니다.</li>
                            <li>필요하면 의존성을 설치합니다.</li>
                            <li>node_modules 폴더를 제외하고 파일을 압축합니다. <b className="font-bold text-rose-600">(압축을 풀었을 때 디렉터리로 묶여있어서는 안됩니다. 모든 파일을 선택하고 우클릭 {'->'} 압축을 이용하세요.)</b> </li>
                            <li>생성한 함수에서 새 빌드를 만들고 ZIP 파일을 업로드 합니다.</li>
                        </ol>
                        </blockquote>

                        <Title level={3} style={{marginBottom : '10px' }}>req 객체에 대하여</Title>
                        <p className = 'mb-0'>URL Param 을 읽거나, 요청 Header 를 읽는 등 요청에 대한 전반적인 내용을 확인 할 수 있습니다.</p>
                        <p className = 'mb-0'>이 값은 koa framework 의 <code>ctx.request</code>객체와 같은 구조를 가집니다.</p>
                        <p className = 'mb-0'>request 객체에 관한 자세한 내용은 <b><a href="https://github.com/koajs/koa/blob/master/docs/api/request.md">Koa request.md</a></b> 를 참고하십시오</p>
                        <p className="text-rose-600"><b>그리고 req 객체 그대로 리턴시 오류가 발생하니 주의해주세요.</b></p>

                        <Title level={3} style={{marginBottom : '10px' }}>Template 다운로드</Title>
                        <p>즉시 실행 가능한 Hello world! 탬플릿을 참고하십시오</p>
                        <pre className='able-copy p-3' id = 'ex1'>
                            exports.main = async function(req) {'{'}<br />
                            &nbsp;&nbsp;return 'Hello world';<br />
                            {'}'}<br />
                        </pre>
                        <Button style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', alignItems: 'center', justifyItems: 'center'}} shape="round" size="large" onClick={() => {Copy('ex1')}} icon={<CopyOutlined />}></Button>
                        <Button style={{ marginTop: '10px', marginBottom: '10px'}} shape="round" size="large" onClick={() => {window.open('/downloads/hello-world.zip') }}>hello-world.zip 다운로드</Button>
                        <br />
                        <Divider />

                        <Title level={1} id="C4">런타임 및 실행환경</Title>
                        <p className = 'mt-7'>함수가 실행되는 환경은 아래와 같습니다.</p>
                        <ul>
                            <li><b>x86 기반의 CPU</b></li>
                            <li><b>Alpine Linux</b></li>
                            <li><b>Node 16.x</b></li>
                            <li><b>Koa framework</b></li>
                        </ul>                        
                        <br />
                        <Divider />

                        <Title level={1} id="C5">모범사례 - JSON Placeholder</Title>
                        <p className = 'mt-7'>위의 사례는 가상 DB JSON Placeholder를 제작하는 사례입니다. <br /> 우선 JSON Placeholder에 사용 될 App을 생성합시다. </p>

                        <Title level={3} style={{marginBottom : '10px' }}>Function 구성</Title>
                        <p>위의 사례에서는 가상 DB를 전체 다 불러오거나, 하나의 DB를 불러오는 함수로 구성됩니다.</p>

                        <Title level={3} style={{marginBottom : '10px' }}>모든 함수 불러오기</Title>
                        <p className = 'mb-0'> 위의 함수는 DB의 모든 데이터를 JSON 형태로 불러오는 함수입니다. 함수 내의 코드는 다음과 같습니다. </p>
                        <p className = 'mb-0'> 또한 HTTP Method은 GET으로 설정해줍시다. </p>
                        <pre className='able-copy p-3' id = 'ex2'>
                            const posts = [<br />
                            &nbsp;&nbsp;{'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"userId": 1,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"title": "Special",<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"body": "Function",<br />
                            &nbsp;&nbsp;{'}'},<br />
                            /* DB 내용 생략 ​*/<br />
                            ]<br />
                            <br />
                            exports.main = async function(req) {'{'}<br />
                            &nbsp;&nbsp;return posts;<br />
                            {'}'}<br />
                        </pre>
                        <Button style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', alignItems: 'center', justifyItems: 'center'}} shape="round" size="large" onClick={() => {Copy('ex2')}} icon={<CopyOutlined />}></Button>
                        <Button style={{ marginTop: '10px', marginBottom: '10px'}} shape="round" size="large" onClick={() => { window.open('/downloads/read-all-posts.zip') }}>read-all-posts.zip 다운로드</Button>
                        <p />

                        <Title level={3} style={{marginBottom : '10px' }}>하나의 함수만 불러오기</Title>
                        <p className = 'mb-0'> 위의 함수는 DB의 특정한 한 데이터를 JSON 형태로 불러오는 함수입니다. 함수 내의 코드는 다음과 같습니다. </p>
                        <p className = 'mb-0'> 또한 HTTP Method은 GET으로 설정해줍시다. </p>
                        <pre className='able-copy p-3' id = 'ex3'>
                            const posts = [<br />
                            &nbsp;&nbsp;{'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"userId": 1,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"title": "Special",<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"body": "Function",<br />
                            &nbsp;&nbsp;{'}'},<br />
                            /* DB 내용 생략 ​*/<br />
                            ]<br />
                            <br />
                            exports.main = async function(req) {'{'}<br />
                            &nbsp;&nbsp;let id = 0;<br />
                            &nbsp;&nbsp;{'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;const block = req.url.split('/');<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;id = block[block.length - 1];<br />
                            &nbsp;&nbsp;{'}'}<br />
                            <br />
                            &nbsp;&nbsp;let post = posts.filter((post) ={'>'} post.id == id);<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;if (post.length === 1) {'{'} <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;return post[0]; <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'} else {'{'} <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;return {'{ }'}; <br />
                            &nbsp;&nbsp;{'}'} <br />
                            {'}'} <br />
                        </pre>
                        <Button style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', alignItems: 'center', justifyItems: 'center'}} shape="round" size="large" onClick={() => {Copy('ex3')}} icon={<CopyOutlined />}></Button>
                        <Button style={{ marginTop: '10px', marginBottom: '10px'}} shape="round" size="large" onClick={() => { window.open('/downloads/read-one-post.zip') }}>read-one-post.zip 다운로드</Button>
                        <br/>
                        <Divider />

                        <Title level={1} id="C6">모범사례 - TODO App</Title>
                        <p className = 'mt-7 mb-0'>위의 사례는 TODO App을 제작하는 사례입니다.</p> 
                        <p>우선 TODO App에 사용 될 App을 생성합시다. </p>

                        <Title level={3} style={{marginBottom : '10px' }}>Function 구성</Title>
                        <p>위의 사례에서는 할 일(TODO list)을 추가하거나 수정 및 삭제하는 함수로 구성됩니다.</p>

                        <Title level={3} style={{marginBottom : '10px' }}>할 일 추가하기</Title>
                        <p className = 'mb-0'> 위의 함수는 할 일의 항목을 추가하는 함수입니다. 함수 내의 코드는 다음과 같습니다. </p>
                        <p className = 'mb-0'> 또한 HTTP Method은 POST로 설정해줍시다. </p>
                        <pre className='able-copy p-3' id = 'ex4'>
                            const todolist = [<br />
                            &nbsp;&nbsp;{'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"body": "Nothing"<br />
                            &nbsp;&nbsp;{'}'}<br />
                        /* DB 내용 생략 ​*/<br />
                            ]<br />
                            <br />
                            exports.main = async function(req) {'{'}<br />
                            &nbsp;&nbsp;try {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;const newList = req.body.content;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'todolist.push({"id" : todolist[todolist.length() - 1] + 1, "body" : newList});'}<br />
                            &nbsp;&nbsp;{'}'} catch (error) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'return { };'}<br />
                            &nbsp;&nbsp;{'}'}<br />
                            {'}'}<br />
                        </pre>
                        <Button style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', alignItems: 'center', justifyItems: 'center'}} shape="round" size="large" onClick={() => {Copy('ex4')}} icon={<CopyOutlined />}></Button>
                        <Button style={{ marginTop: '10px', marginBottom: '10px'}} shape="round" size="large" onClick={() => { window.open('/downloads/todo-inserts.zip') }}>todo-inserts.zip 다운로드</Button>
                        <p />

                        <Title level={3} style={{marginBottom : '10px' }}>할 일 수정하기</Title>
                        <p className = 'mb-0'> 위의 함수는 할 일의 항목을 수정하는 함수입니다. 함수 내의 코드는 다음과 같습니다. </p>
                        <p className = 'mb-0'> 또한 HTTP Method은 PUT으로 설정해줍시다. </p>
                        <pre className='able-copy p-3' id = 'ex5'>
                            const todolist = [<br />
                            &nbsp;&nbsp;{'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"body": "Nothing"<br />
                            &nbsp;&nbsp;{'}'}<br />
                        /* DB 내용 생략 ​*/<br />
                            ]<br />
                            <br />
                            exports.main = async function(req) {'{'}<br />
                            &nbsp;&nbsp;try {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;let id = 0;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const block = req.url.split('/');<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id = block[block.length - 1];<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;const updateList = req.body.content;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'todolist.find({"id":  id}).update({"id" : id, "body" : updateList});'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;return todolist;<br />
                            &nbsp;&nbsp;{'}'} catch (error) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'return { };'}<br />
                            &nbsp;&nbsp;{'}'}<br />
                            {'}'}<br />
                        </pre>
                        <Button style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', alignItems: 'center', justifyItems: 'center'}} shape="round" size="large" onClick={() => {Copy('ex5')}} icon={<CopyOutlined />}></Button>
                        <Button style={{ marginTop: '10px', marginBottom: '10px'}} shape="round" size="large" onClick={() => { window.open('/downloads/todo-update.zip') }}>todo-update.zip 다운로드</Button>
                        <p />

                        <Title level={3} style={{marginBottom : '10px' }}>할 일 삭제하기</Title>
                        <p className = 'mb-0'> 위의 함수는 할 일의 항목을 삭제하는 함수입니다. 함수 내의 코드는 다음과 같습니다. </p>
                        <p className = 'mb-0'> 또한 HTTP Method은 DEL로 설정해줍시다. </p>
                        <pre className='able-copy p-3' id = 'ex6'>
                            const todolist = [<br />
                            &nbsp;&nbsp;{'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;"body": "Nothing"<br />
                            &nbsp;&nbsp;{'}'}<br />
                        /* DB 내용 생략 ​*/<br />
                            ]<br />
                            <br />
                            exports.main = async function(req) {'{'}<br />
                            &nbsp;&nbsp;try {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;let id = 0;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const block = req.url.split('/');<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id = block[block.length - 1];<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'todolist.find({"id":  id}).remove();'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;return todolist;<br />
                            &nbsp;&nbsp;{'}'} catch (error) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'return { };'}<br />
                            &nbsp;&nbsp;{'}'}<br />
                            {'}'}<br />
                        </pre>
                        <Button style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', alignItems: 'center', justifyItems: 'center'}} shape="round" size="large" onClick={() => {Copy('ex6')}} icon={<CopyOutlined />}></Button>
                        <Button style={{ marginTop: '10px', marginBottom: '10px'}} shape="round" size="large" onClick={() => { window.open('/downloads/todo-delete.zip') }}>todo-delete.zip 다운로드</Button>
                        <br />

                    </Typography>
                    <div style={{ marginTop: 64 }} />
                    <Footer />
                </Layout>
            </Layout>
        </>
    );
}

export default App;