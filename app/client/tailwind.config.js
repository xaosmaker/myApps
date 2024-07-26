/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: "linear-gradient(to right bottom, rgba(0,0,0,0.7),rgba(0,0,0,0.6) ), url('./src/img/landingImage.jpg')",
      },
      // }),
    },
  },
  plugins: [],
}
