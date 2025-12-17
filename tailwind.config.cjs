/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './**/*.html', './src/**/*.{js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          green: {
            DEFAULT: '#0C7A5A',
            dark: '#05513B',
            light: '#E1F3ED'
          },
          orange: {
            DEFAULT: '#F97316',
            dark: '#C2410C',
            light: '#FFEDD5'
          }
        }
      },
      boxShadow: {
        'elevated': '0 10px 30px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
};


