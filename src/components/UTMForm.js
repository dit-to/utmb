import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const UTMForm = ({ onFocus }) => {
  const location = useLocation();
  const [utmData, setUtmData] = useState({
    source: '',
    medium: '',
    campaign: '',
    content: '',
    term: '',
  });

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [showToast, setShowToast] = useState(false); // 토스트 표시 상태 추가
  const baseURL = location.state?.baseURL || ''; 

  useEffect(() => {
    // 필수 항목 입력 시 버튼 활성화
    setIsButtonEnabled(utmData.source && utmData.medium && utmData.campaign);

    // 실시간 링크 업데이트
    let link = baseURL; 
    const queryParams = [];

    if (utmData.source) queryParams.push(`utm_source=${utmData.source}`);
    if (utmData.medium) queryParams.push(`utm_medium=${utmData.medium}`);
    if (utmData.campaign) queryParams.push(`utm_campaign=${utmData.campaign}`);
    if (utmData.content) queryParams.push(`utm_content=${utmData.content}`);
    if (utmData.term) queryParams.push(`utm_term=${utmData.term}`);

    if (queryParams.length > 0) {
      link += `?${queryParams.join('&')}`;
    }

    setGeneratedLink(link);
  }, [utmData, baseURL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUtmData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCopyLink = async () => {
    if (isButtonEnabled) {
      try {
        // 파이어베이스에 데이터 저장
        await addDoc(collection(db, 'utmData'), utmData);

        // 클립보드에 링크 텍스트 복사
        await navigator.clipboard.writeText(generatedLink);

        // 토스트 메시지 표시
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // 3초 후 토스트 숨기기
      } catch (error) {
        console.error("Error saving to Firebase or copying to clipboard: ", error);
      }
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <input
          name="source"
          placeholder="utm_source"
          value={utmData.source}
          onChange={handleInputChange}
          onFocus={() => onFocus('source')}
          required
          className="border border-gray-300 p-2 w-full rounded-md"
        />
        <input
          name="medium"
          placeholder="utm_medium"
          value={utmData.medium}
          onChange={handleInputChange}
          onFocus={() => onFocus('medium')}
          required
          className="border border-gray-300 p-2 w-full rounded-md"
        />
        <input
          name="campaign"
          placeholder="utm_campaign"
          value={utmData.campaign}
          onChange={handleInputChange}
          onFocus={() => onFocus('campaign')}
          required
          className="border border-gray-300 p-2 w-full rounded-md"
        />
        <input
          name="content"
          placeholder="utm_content"
          value={utmData.content}
          onChange={handleInputChange}
          onFocus={() => onFocus('content')}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
        <input
          name="term"
          placeholder="utm_term"
          value={utmData.term}
          onChange={handleInputChange}
          onFocus={() => onFocus('term')}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>

      <div className="mt-4 p-4 bg-blue-100 border rounded-lg">
        <p className="text-sm text-gray-600 mb-2">생성된 UTM 링크:</p>
        <input
          type="text"
          readOnly
          value={generatedLink}
          className="w-full p-2 border rounded-md text-gray-700 bg-gray-100"
        />
        <button
          onClick={handleCopyLink}
          disabled={!isButtonEnabled}
          className={`mt-2 py-2 px-4 rounded-md w-full ${isButtonEnabled ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          링크 복사하기
        </button>
      </div>

      {/* 토스트 메시지 */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          링크가 성공적으로 복사되었습니다!
        </div>
      )}
    </div>
  );
};

export default UTMForm;