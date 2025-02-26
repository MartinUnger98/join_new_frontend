/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Passe den Pfad an deine Projektstruktur an
  ],
  safelist: [
    'text-blue-dark',
    'group-hover:text-blue-dark',
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '110': '30rem',
        '88' : '22rem',
        '104': '104px',
        '1px': '1px',
        '2px': '2px',
      },
      colors: {
        'blue-primary': '#29ABE2',
        'blue-secondary': '#091931',
        'blue-dark': '#2a3647',
        'blue-dark-hover': '#304b72',
        'gray-input': '#cbd5e1',
        'section': '#F6F7F8',
        'prio-1': '#FF3D00',
        'prio-2': '#FFA800',
        'prio-3': '#7AE229',
        'category-1': '#1FD7C1',
        'category-2': '#0038FF',
        'category-3': '#FF4646',
      },
      boxShadow: {
        'custom': '0px 0px 17px 5px rgba(0, 0, 0, 0.08)',
        'card-task': '0px 0px 10px 3px #00000014'
      },
      keyframes: {
        "fade-out-top-left": {
            "0%": {
                opacity: 1,
            },
            "100%": {
                opacity: 0,
                transform: "translate3d(-100%, -100%, 0)",
            },
        },
        "fade-out-up": {
            "0%": {
                opacity: 1,
            },
            "100%": {
                opacity: 0,
                transform: "translate3d(0, -100%, 0)",
            },
        },
        "fade-in-right": {
            "0%": {
                opacity: 0,
                transform: "translate3d(100%, 0, 0)",
            },
            "100%": {
                opacity: 1,
                transform: "translate3d(0, 0, 0)",
            },
        },
        "fade-out-right": {
            "0%": {
                opacity: 1,
            },
            "100%": {
                opacity: 0,
                transform: "translate3d(100%, 0, 0)",
            },
        },
        "fadeIn": {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        "summary-fadeIn": {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        "summary-fadeOut": {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        fadeouttopleft: 'fade-out-top-left 1s ease-in-out 2s 1',
        fadeoutup: 'fade-out-up 1s ease-in-out 0.25s 1',
        fadeinright: 'fade-in-right 1s ease-in-out 0.25s 1',
        fadeoutright: 'fade-out-right 1s ease-in-out 0.25s 1',
        fadeIn: 'fadeIn 0.5s ease forwards 2s',
        summaryFadeIn: 'fadeIn 2s ease-in forwards',
        summaryFadeOut: 'fadeOut 2s ease-out forwards'
      }
    },
    screens: {
      '1320': '1320px',
      '1200': '1200px',
      '1000': '1000px',
      '900': '900px',
      '800': '800px',
      '600': '600px',
      '500': '500px',
      '420': '420px',
      '320': '320px',
      'min-h-950': { 'raw': '(min-height: 950px)' },
      'min-h-780': { 'raw': '(min-height: 780px)' },
      'min-h-1100': { 'raw': '(min-height: 1100px)' },
      'min-h-1000': { 'raw': '(min-height: 1000px)' },

    }
  },
  plugins: [],
}


