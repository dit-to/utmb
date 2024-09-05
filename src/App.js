import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import UTMForm from './components/UTMForm';
import KeywordChart from './components/KeywordChart';
import { db } from './firebase'; // Firebase 초기화 파일에서 Firestore 가져오기
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore 메서드들 가져오기

const App = () => {
  const [activeTab, setActiveTab] = useState('source'); // 기본 활성화된 탭
  const [keywords, setKeywords] = useState([]);

  const fetchKeywordsFromDB = async (type) => {
    const q = query(
      collection(db, 'utmData'), // 모든 데이터를 utmData 컬렉션에서 가져옴
      where(type, '!=', '') // 선택된 탭에 해당하는 필드가 빈 값이 아닌 것만 필터링
    );
  
    const querySnapshot = await getDocs(q);
    const fetchedKeywords = querySnapshot.docs.map(doc => doc.data()[type]); // 선택된 탭에 해당하는 필드만 추출
    const keywordCounts = {};
  
    // 각 키워드의 빈도수를 계산
    fetchedKeywords.forEach(keyword => {
      if (keywordCounts[keyword]) {
        keywordCounts[keyword]++;
      } else {
        keywordCounts[keyword] = 1;
      }
    });
  
    // 전체 키워드 개수 계산
    const totalKeywords = fetchedKeywords.length;
  
    // 상위 10개의 키워드를 빈도수 기준으로 정렬하여 퍼센트 계산 후 반환
    const sortedKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({
      name,
      count: Math.round((count / totalKeywords) * 100) // 퍼센트로 계산 후 반올림하여 정수로 표시
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
    setActiveTab(inputName);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/builder" element={
          <div className="flex p-5 space-x-5">
            <div className="flex-1 bg-gray-100 p-5 rounded-lg">
              <h1 className="text-2xl font-bold text-purple-600 mb-4">무료 UTM 빌더</h1>
              <div className="tabs flex space-x-2 mb-4">
                {['source', 'medium', 'campaign', 'content', 'term'].map(tab => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-md ${activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'}`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <KeywordChart activeTab={activeTab} keywords={keywords} />
            </div>
            <div className="flex-1 bg-gray-100 p-5 rounded-lg">
              <UTMForm onFocus={handleInputFocus} />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;