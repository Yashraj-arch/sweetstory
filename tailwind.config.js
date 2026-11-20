/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandWine: {
          950: '#2E0206',
          900: '#3D0308',
          800: '#4A040B',
          700: '#5F060C', // Exact Sweet Story logo background color
          600: '#750B16',
          500: '#911422',
        },
        cocoa: {
          950: '#150E0B',
          900: '#231815',
          800: '#34221D',
          700: '#4A322B',
          600: '#64473E',
          500: '#846055',
        },
        cream: {
          50: '#FFFCF9',
          100: '#FFF8F2',
          200: '#FDF0E3',
          300: '#F6E4D0',
          400: '#EAD1BA',
          500: '#D6B89E',
        },
        gold: {
          300: '#F3DB9A',
          400: '#E5BE65',
          500: '#C89B3C',
          600: '#A97E25',
          700: '#8A6417',
        },
        rose: {
          50: '#FFF5F6',
          100: '#FDECEF',
          200: '#FAD8DC',
          300: '#F3B4BC',
          400: '#E28692',
          500: '#CC5E6C',
          600: '#B04452',
        },
        botanical: {
          100: '#E8EFE9',
          300: '#A1BCA5',
          500: '#4B6B52',
          700: '#2E4734',
          900: '#18271C',
        }
      },
      fontFamily: {
        serif: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(35, 24, 21, 0.08)',
        'warm-md': '0 8px 24px -4px rgba(35, 24, 21, 0.12)',
        'warm-lg': '0 16px 40px -8px rgba(35, 24, 21, 0.18)',
        'gold-glow': '0 0 25px rgba(200, 155, 60, 0.25)',
        'rose-glow': '0 0 25px rgba(226, 134, 146, 0.25)',
      }
    },
  },
  plugins: [],
}
