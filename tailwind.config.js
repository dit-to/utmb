/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // src 폴더의 모든 JS, JSX, TS, TSX 파일을 대상으로 Tailwind를 적용합니다.
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Paperlogy', 'sans-serif'], // 타이틀 폰트 패밀리 설정
        body: ['Pretendard', 'sans-serif'], // 본문 폰트 패밀리 설정
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      colors: {
        primary: {
          100: '#E7E6FF',
          400: '#B5B3FF',
          500: '#615FFF',
        },
        secondary: {
          500: '#FFC700',
        },
        gray: {
          100: '#FAFAFA', 
          200: '#F1F1F3',
          300: '#E2E2E5',
          400: '#898994',
          500: '#59595D',
        },
        red: {
          500: '#FF6363',
        }
      },
    },
  },
  plugins: [],
};
