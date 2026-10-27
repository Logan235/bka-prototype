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
          "secondary": "#f0f4f8",
          "accent": "#FF6600",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "light",
    ],
  },
}
