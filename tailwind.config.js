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
    },
    screens: {
      '800': '800px',
      '420': '420px',
      '1200': '1200px'

    }
  },
  plugins: [],
}
