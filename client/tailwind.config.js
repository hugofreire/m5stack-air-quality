export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'air-good': '#10B981',
        'air-moderate': '#F59E0B',
        'air-unhealthy': '#EF4444',
      }
    },
  },
  plugins: [],
}
