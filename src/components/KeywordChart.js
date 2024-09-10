import React from 'react';

const KeywordChart = ({ keywords }) => {

  return (
    <div>
      {keywords.length > 0 ? (
        <ul>
          {keywords.map((keyword, index) => (
            <li key={index} className="flex items-start mb-4 text-sm md:text-base justify-start">
              <div className={`flex justify-start items-start gap-2 ${index < 3 ? 'font-700' : 'font-400 text-gray-700'}`}>
                <span className='w-[32px] md:w-[36px] flex justify-end'>{index + 1}위</span>
                <span className='w-[90px] md:w-[120px] break-all flex'>{keyword.name}</span>
              </div>
              <div className="flex w-full mt-1.5 md:mt-2 bg-primary-50 md:ml-2 md:mr-2 rounded-full">
                <div
                  className={`${index < 3 ? 'bg-primary-500': 'bg-primary-400'}  text-xs  text-white text-center p-0.5 leading-none rounded-full h-[8px] md:h-[10px]`}
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