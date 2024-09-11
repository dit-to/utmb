import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const UTMForm = ({ onFocus }) => {
  const location = useLocation();
  const [utmData, setUtmData] = useState({
    source: '',
    medium: '',
    campaign: '',
    content: '',
    term: '',
    date: serverTimestamp()
  });

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [showToast, setShowToast] = useState(false); 
  const baseURL = location.state?.baseURL || ''; 

  useEffect(() => {
    setIsButtonEnabled(utmData.source && utmData.medium && utmData.campaign);

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
        await addDoc(collection(db, 'utmData'), utmData);
        await navigator.clipboard.writeText(generatedLink);

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (error) {
        console.error("Error saving to Firebase or copying to clipboard: ", error);
      }
    }
  };

  return (
    <div>
      <div className="space-y-6">
        <div className='space-y-2'>
          <label className="block text-gray-700" htmlFor="medium">
            <h3 className='font-600 text-sm md:text-base'>
              <span className='text-red-500'>* </span>
              방문자는 어디서 왔나요?</h3>
            <div className='px-4 py-2 bg-primary-50 mt-1 rounded-md'>
              <p className='text-gray-600 text-sm'>검색엔진, 사이트 이름 등 방문자가 웹사이트에 도착하기 전에 출발한 장소를 의미해요.</p>
            </div>
          </label>
          <input
            id="source"
            name="source"
            placeholder="facebook, google, naver, newsletter, youtube, kakao"
            value={utmData.source}
            onChange={handleInputChange}
            onFocus={() => onFocus('source')}
            required
            className="border border-gray-300 p-2 w-full rounded-md focus:shadow-[0_0_20px_0_rgba(97,95,225,0.3)] focus:outline-[1px] focus:outline-primary-500 text-xs md:text-base"
          />
        </div>
        
        <div className='space-y-2'>
          <label className="block text-gray-700" htmlFor="medium">
            <h3 className='font-600 text-sm md:text-base'>
              <span className='text-red-500'>* </span>
              방문자는 어떤 통로로 들어왔나요?</h3>
            <div className='px-4 py-2 bg-primary-50 mt-1 rounded-md'>
              <p className='text-gray-600 text-sm'>광고 형식, 유입 채널 등 사용자가 웹사이트에 들어오기 위해 통과한 길목을 의미해요.</p>
            </div>
          </label>
          <input
            id="medium"
            name="medium"
            placeholder="cpc, display, email, blog, organic, open_talk"
            value={utmData.medium}
            onChange={handleInputChange}
            onFocus={() => onFocus('medium')}
            required
            className="border border-gray-300 p-2 w-full rounded-md focus:shadow-[0_0_20px_0_rgba(97,95,225,0.3)] focus:outline-[1px] focus:outline-primary-500 text-xs md:text-base"
          />
        </div>
      
        <div className='space-y-2'>
          <label className="block text-gray-700" htmlFor="campaign">
            <h3 className='font-600 text-sm md:text-base'>
              <span className='text-red-500'>* </span>
              방문자는 무엇 때문에 들어왔나요?</h3>
            <div className='px-4 py-2 bg-primary-50 mt-1 rounded-md'>
              <p className='text-gray-600 text-sm'>할인 쿠폰 같이 방문자가 유입될 수 있도록 유혹시킨 요소를 의미해요.</p>
            </div>
          </label>
          <input
            id="campaign"
            name="campaign"
            placeholder="summer_sale, discount_coupon"
            value={utmData.campaign}
            onChange={handleInputChange}
            onFocus={() => onFocus('campaign')}
            className="border border-gray-300 p-2 w-full rounded-md focus:shadow-[0_0_20px_0_rgba(97,95,225,0.3)] focus:outline-[1px] focus:outline-primary-500 text-xs md:text-base"
          />
        </div>

        <div className='space-y-2'>
          <label className="block text-gray-700" htmlFor="content">
            <h3 className='font-600 text-sm md:text-base'>
              광고에 담긴 콘텐츠 내용은 무엇이었나요?</h3>
            <div className='px-4 py-2 bg-primary-50 mt-1 rounded-md'>
              <p className='text-gray-600 text-sm'>하나의 캠페인에서 여러종류의 광고나 콘텐츠가 있을 경우 활용할 수 있는 요소에요.</p>
            </div>
          </label>
          <input
            id="content"
            name="content"
            placeholder="여름_10%_세일, 여름_물놀이_세일"
            value={utmData.content}
            onChange={handleInputChange}
            onFocus={() => onFocus('content')}
            className="border border-gray-300 p-2 w-full rounded-md focus:shadow-[0_0_20px_0_rgba(97,95,225,0.3)] focus:outline-[1px] focus:outline-primary-500 text-xs md:text-base"
          />
        </div>
        
        <div className='space-y-2'>
          <label className="block text-gray-700" htmlFor="term">
            <h3 className='font-600 text-sm md:text-base'>
              방문자가 찾아본 키워드는 어떤 것인가요??</h3>
            <div className='px-4 py-2 bg-primary-50 mt-1 rounded-md'>
              <p className='text-gray-600 text-sm'>검색 광고를 진행할 때 어떤 검색어를 통해 들어왔는지 확인할 수 있는 요소에요.</p>
            </div>
          </label>
          <input
            id="term"
            name="term"
            placeholder="롱코트, 여자 슬립온, 남자구두"
            value={utmData.term}
            onChange={handleInputChange}
            onFocus={() => onFocus('term')}
            className="border border-gray-300 p-2 w-full rounded-md focus:shadow-[0_0_20px_0_rgba(97,95,225,0.3)] focus:outline-[1px] focus:outline-primary-500 text-xs md:text-base"
          />
        </div>
      </div>

      {/* 기타 요소 */}
      <div className={`my-4 p-4 rounded-lg ${isButtonEnabled ? 'bg-primary-100 outline outline-primary-500 outline-2' : 'bg-gray-200'}`}>
        <p className={`text-sm md:text-lg font-600 mb-2 ${isButtonEnabled ? '' : 'text-red-500'}`}>{isButtonEnabled ? '링크가 완성되었어요!' : '필수항목을 모두 입력해주세요'}</p>
        <input
          type="text"
          readOnly
          value={generatedLink}
          className="w-full p-2 border rounded-md focus:outline-none text-gray-700 bg-gray-100 text-sm md:text-base"
        />
        <button
          onClick={handleCopyLink}
          disabled={!isButtonEnabled}
          className={`mt-4 py-2 px-4 rounded-full h-[40px] md:h-[48px] w-full ${isButtonEnabled ? 'bg-primary-500 text-white font-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed text-sm md:text-base'}`}
        >
          링크 복사하기
        </button>
      </div>

      {/* 토스트 메시지 */}
      {showToast && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-[300px] bg-green-500 text-center text-white px-4 py-2 rounded shadow-lg">
          링크가 성공적으로 복사되었습니다!
        </div>
      )}
    </div>
  );
};

export default UTMForm;