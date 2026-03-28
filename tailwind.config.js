/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        baby: {
          pink:    '#FFD6E0',
          'pink-dark': '#F9A8C9',
          purple:  '#E8D5F5',
          'purple-dark': '#C084FC',
          blue:    '#D6EAFF',
          'blue-dark': '#7DD3FC',
          yellow:  '#FFF3CD',
          'yellow-dark': '#FCD34D',
          green:   '#D4F5E9',
          'green-dark': '#6EE7B7',
          peach:   '#FFE5D0',
        },
      },
      fontFamily: {
        display: ['"Nunito"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 20px rgba(255,182,193,0.25)',
        'card-hover': '0 8px 32px rgba(255,182,193,0.45)',
      },
      backgroundImage: {
        'gradient-baby': 'linear-gradient(135deg,#fff5f7 0%,#f0f4ff 50%,#fff9f0 100%)',
      },
    },
  },
  plugins: [],
}
