/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // 앱 디렉터리 기준
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // 필요 시 원하는 디자인 확장 가능
    }
  },
  plugins: [
    // Forms, Typography 등 공식 플러그인 예: require('@tailwindcss/forms')
  ]
};
