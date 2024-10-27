/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
      colors: {
        primary: '#BFFF00', 
        secondary: '#333333', 
      },
    },
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      kbo: ['KBO-bold', 'sans-serif'], // KBO 폰트 추가
      pre900: ['Pretendard900','sans-serif' ]
    },
	},
	plugins: [],
};
