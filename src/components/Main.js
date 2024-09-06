import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Main = () => {
  const [url, setUrl] = useState('');
  const [buttonLabel, setButtonLabel] = useState('분석할 웹사이트 주소를 입력해주세요');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    // 조건에 따라 버튼 라벨 변경
    if (newUrl.includes('.')) {
      setButtonLabel('이 주소로 시작하기');
    } else {
      setButtonLabel('분석할 웹사이트 주소를 입력해주세요');
    }
  };

  const handleNextClick = () => {
    if (url.includes('.')) {
      // 입력된 URL을 'state'로 전달하여 'UTMForm'에서 사용
      navigate('/builder', { state: { baseURL: url } });
    }
  };

  return (
    <div className="flex w-screen items-center justify-center h-screen bg-white main-frame">
      <div className="h-full w-full max-w-lg flex flex-col items-center px-5">
        <div className='flex flex-col font-title mt-[300px] items-center'>
          <h1 className="text-5xl font-700 text-primary-500 mb-6">무료 UTM 빌더</h1>
          <h2 className="text-xl font-500 text-gray-500 mb-8">잠재고객이 어떤 경로로 유입되었는지 확인해보세요!</h2>
          <div className='w-full font-title flex flex-col gap-7'>
            <input 
              type="url"
              value={url}
              onChange={handleInputChange}
              onFocus={() => !url && setUrl('https://')}
              placeholder="https://example.com"
              className="bg-primary-50 py-3 px-4 rounded-xl w-full text-gray-600 placeholder-gray-400 main-input focus:shadow-[0_0_20px_0_rgba(97,95,225,0.3)] focus:outline-[1px] focus:outline-primary-500"
            />
            <button 
              onClick={handleNextClick}
              className={`h-[60px] px-6 rounded-full text-xl w-full font-400 ${url.includes('.') ? 'bg-primary-500 text-white font-600' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
              disabled={!url.includes('.')}
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;