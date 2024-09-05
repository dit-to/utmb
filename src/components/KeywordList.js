import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // Update to use named import
import { collection, getDocs } from 'firebase/firestore';  // Firestore functions

const KeywordList = () => {
  const [topKeywords, setTopKeywords] = useState([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const keywordSnapshot = await getDocs(collection(db, 'keywords'));
        const keywords = keywordSnapshot.docs.map(doc => doc.data());
        const sortedKeywords = keywords.sort((a, b) => b.count - a.count).slice(0, 10);
        setTopKeywords(sortedKeywords);
      } catch (error) {
        console.error("Error fetching keywords: ", error);
      }
    };
    fetchKeywords();
  }, []);

  return (
    <div>
      <h2>상위 10개의 키워드</h2>
      <ul>
        {topKeywords.map((keyword, index) => (
          <li key={index}>{keyword.name} - {keyword.count}</li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordList;