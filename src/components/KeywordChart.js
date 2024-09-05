import React from 'react';

const KeywordChart = ({ activeTab, keywords }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">상위 10개의 키워드 - {activeTab}</h2>
      {keywords.length > 0 ? (
        <ul>
          {keywords.map((keyword, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{keyword.name}</span>
              <div className="w-full bg-gray-200 ml-2 mr-2 rounded-full">
                <div
                  className="bg-purple-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${keyword.count}%` }} // 키워드 빈도를 비율로 설정
                ></div>
              </div>
              <span>{keyword.count}%</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default KeywordChart;