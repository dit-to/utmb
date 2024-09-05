import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleNextClick = () => {
    if (url.includes('.')) {
      // 입력된 URL을 'state'로 전달하여 'UTMForm'에서 사용
      navigate('/builder', { state: { baseURL: url } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">무료 UTM 빌더</h1>
      <p className="text-gray-600 mb-6">잠재고객이 어떤 경로로 유입되었는지 확인해보세요!</p>
      <input 
        type="url"
        value={url}
        onChange={handleInputChange}
        onFocus={() => !url && setUrl('https://')}
        placeholder="https://example.com"
        className="border border-gray-300 p-2 rounded-md w-64 mb-2 text-center"
      />
      <p className="text-sm text-gray-500 mb-4">유입경로를 분석할 웹사이트 주소를 입력해주세요.</p>
      <button 
        onClick={handleNextClick}
        className={`py-2 px-6 rounded-md font-semibold ${url.includes('.') ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        disabled={!url.includes('.')}
      >
        다음
      </button>
    </div>
  );
};

export default Main;