// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseStamp: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
        },
      },
      animation: {
        pulseStamp: 'pulseStamp 1.5s infinite',
      },
    },
  },
  plugins: [],
}
