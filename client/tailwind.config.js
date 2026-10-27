/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003366', // Navy Blue chủ đạo
          focus: '#002244',
          content: '#ffffff',
        },
        accent: {
          DEFAULT: '#FF6600', // Orange điểm nhấn kỷ niệm 70 năm
          focus: '#e05a00',
          content: '#ffffff',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        bkaTheme: {
          "primary": "#003366",
          "secondary": "#f8f9fa",
          "accent": "#FF6600",
          "neutral": "#111111",
          "base-100": "#ffffff",
          "base-200": "#f8f9fa",
          "base-300": "#dee2e6",
          "base-content": "#111111",
        },
      },
      "light",
    ],
  },
}

