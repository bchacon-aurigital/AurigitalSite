/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        animation: {
          'progress': 'progress 2s ease-in-out',
        },
        fontFamily: {
          questrial: ['"Questrial"', 'sans-serif'],
          qurova: ['"Qurova"', 'sans-serif'],
          mansfield: ['"Mansfield"', 'sans-serif'],
          'red-hat': ['"Red Hat Display"', 'sans-serif'],
          'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        },
        keyframes: {
          progress: {
            '0%': {
              width: '0%',
            },
            '100%': {
              width: '100%',
            },
          },
        },
      },
    },
    plugins: [],
  }