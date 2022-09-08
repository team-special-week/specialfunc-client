import React from 'react';

import {
    ChipIcon, CubeIcon, PauseIcon,
    DesktopComputerIcon,
} from '@heroicons/react/outline';

const features = [
    {
        name: '애플리케이션',
        description:
          '애플리케이션은 프로젝트의 단위로 API Endpoint 의 최상위 경로를 의미합니다. 이곳에 함수를 생성하여 호출 가능한 API 를 만듭니다.',
        icon: DesktopComputerIcon,
    },
    {
        name: '함수',
        description:
          '함수는 하나의 Endpoint 를 의미하며 호출 가능한 가장 작은 단위 입니다. 여기에 비지니스 로직을 삽입하여 원하는 형태로 응답을 가공하세요.',
        icon: ChipIcon,
    },
    {
        name: '완전히 독립된 실행공간',
        description:
          '모든 함수는 컨테이너화된 Sandbox 에서 실행됩니다. 안정적이고 독립된 실행 환경에서 비지니스 로직을 수행합니다.',
        icon: CubeIcon,
    },
    {
        name: '호출 주기에 따른 함수 상태 관리',
        description:
          '자주 호출되는 함수는 언제든 호출 가능한 상태로 유지하고, 자주 호출되지 않는 함수는 최소한의 용량만을 차지하도록 최적화 합니다.',
        icon: PauseIcon,
    },
]

const MainServices = () => {
    return (
      <div className="py-12 bg-white" style={{ height: 700 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                  <p className="mt-2 text-3xl leading-8 font_kor font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
                      Build API with upload zip
                  </p>
                  <p className="mt-4 max-w-2xl font_kor text-xl text-gray-500 lg:mx-auto">
                      준비된 코드를 작성하고 업로드하여 API 서버를 빠르게 구축
                  </p>
              </div>

              <div className="mt-10 font_kor">
                  <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                      {features.map((feature) => (
                        <div key={feature.name} className="relative" style={{ height: 160 }}>
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white" style={{ backgroundColor: '#333333' }}>
                                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900"><strong>{feature.name}</strong></p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base font-light text-gray-500">{feature.description}</dd>
                        </div>
                      ))}
                  </dl>
              </div>
          </div>
      </div>
    )
}

export default MainServices;