import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import UTMForm from './components/UTMForm';
import KeywordChart from './components/KeywordChart';
import { db } from './firebase'; // Firebase 초기화 파일에서 Firestore 가져오기
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore 메서드들 가져오기
import './App.css';
import Header from './components/Header';
import MetaTagForm from './components/MetaTagForm';
import Contact from './components/Contact';

const App = () => {
  const [activeTab, setActiveTab] = useState('source'); // 기본 활성화된 탭
  const [keywords, setKeywords] = useState([]);

  const fetchKeywordsFromDB = async (type) => {
    // 필수 키워드만 조회 (source, medium, campaign)
    const requiredFields = ['source', 'medium', 'campaign'];

    if (!requiredFields.includes(type)) {
      return []; // 선택된 탭이 필수 키워드가 아닌 경우, 빈 배열 반환
    }
  
    const q = query(
      collection(db, 'utmData'),
      where(type, '!=', '') // 선택된 필드에 데이터가 있는지 확인
    );
  
    const querySnapshot = await getDocs(q);
    const fetchedKeywords = querySnapshot.docs.map(doc => doc.data()[type]); // 선택된 필드 데이터만 추출
    const keywordCounts = {};
  
    fetchedKeywords.forEach(keyword => {
      if (keywordCounts[keyword]) {
        keywordCounts[keyword]++;
      } else {
        keywordCounts[keyword] = 1;
      }
    });
  
    const totalKeywords = fetchedKeywords.length;
  
    // 상위 10개의 키워드를 빈도수 기준으로 정렬하여 반환
    const sortedKeywords = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({
        name,
        count: Math.round((count / totalKeywords) * 100) // 퍼센트로 계산 후 반올림
      }));
  
    return sortedKeywords;
  };

  useEffect(() => {
    const fetchKeywords = async () => {
      const keywordData = await fetchKeywordsFromDB(activeTab); // Firestore에서 키워드 가져오기
      setKeywords(keywordData);
    };

    fetchKeywords();
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleInputFocus = (inputName) => {
    const requiredFields = ['source', 'medium', 'campaign']; 
    if (requiredFields.includes(inputName)) {
      setActiveTab(inputName);
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/builder" element={
          <div className="flex flex-col md:flex-row w-full px-2 md:px-0 max-w-[1200px] mx-auto font-title">
            <div className='flex flex-col md:flex-row md:space-y-0 w-full'>
              {/* 모바일에서는 KeywordChart가 아래로, 데스크탑에서는 왼쪽으로 */}
              <div className="flex-1 bg-gray-100 md:py-6 px-2 py-2 md:px-8 rounded-lg order-1 md:order-1">
                <h2 className="text-xl md:text-2xl font-500 mb-3 md:mb-6">상위 10개의 키워드</h2>
                <div className="tabs flex space-x-2 mb-3 md:mb-6">
                  {['source', 'medium', 'campaign'].map(tab => (
                    <button
                      key={tab}
                      className={`px-3 md:px-4 py-1 md:py-2 rounded-full ${activeTab === tab ? 'bg-secondary-500 text-white font-600 text-sm md:text-base' : 'bg-gray-300 text-gray-600'}`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <KeywordChart activeTab={activeTab} keywords={keywords} />
              </div>
              {/* 모바일에서는 UTMForm이 위로, 데스크탑에서는 오른쪽으로 */}
              <div className="flex-1 bg-white rounded-lg order-2 md:order-2 md:py-6 px-2 md:px-8 mt-2 md:mt-0">
                <UTMForm onFocus={handleInputFocus} />
              </div>
            </div>
          </div>
        } />
        <Route path="/metabuild" element={<MetaTagForm />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;