module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'source-sans': ['"Source Sans 3"', 'sans-serif'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#0079c2',
        'light-gray': '#f5f5f5',
        'border-gray': '#d9d9d9',
        'text-dark': '#333333',
        'text-light': '#666666',
        'badge-active': '#53b1a3',
        'badge-draft': '#f3c246',
        'button-blue': '#0079c2',
      }
    },
  },
  plugins: [],
}
