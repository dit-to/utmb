import React from 'react';

const KeywordChart = ({ activeTab, keywords }) => {
  return (
    <div>
      {keywords.length > 0 ? (
        <ul>
          {keywords.map((keyword, index) => (
            <li key={index} className="flex justify-between items-center mb-4 text-md">
              <div className={`flex items-center w-[180px] gap-2 ${index < 3 ? 'font-700' : 'font-400 text-gray-700'}`}>
                <span>{index + 1}위</span>
                <span >{keyword.name}</span>
              </div>
              <div className="w-full bg-primary-50 ml-2 mr-2 rounded-full">
                <div
                  className={`${index < 3 ? 'bg-primary-500': 'bg-primary-400'}  text-xs  text-white text-center p-0.5 leading-none rounded-full h-[10px]`}
                  style={{ width: `${keyword.count}%` }} // 키워드 빈도를 비율로 설정
                ></div>
              </div>
              <span className={`ml-4 ${index < 3 ? 'font-700' : 'font-400 text-gray-700'}`}>{keyword.count}%</span>
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