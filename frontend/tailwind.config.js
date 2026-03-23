/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Identitas KARYANUSA
        primary: "#1F7A63",      // Forest Green
        secondary: "#1E3A5F",    // Deep Navy
        accent: "#F0D060",       // Gold Vibrant (Di-tweak biar lebih nyala di Dark Mode)
        dark: "#0F172A",         // Background Utama
        "dark-soft": "#1E293B",  // Background Section Sekunder
        
        // Warna bantu dari config lama kamu
        "primary-light": "#E6F4F1",
        "accent-light": "#FFF5DB",
        "text-muted": "#64748B",
        textdark: "#2B2B2B",
      },
      animation: {
        // Animasi Teks Bergerak
        shimmer: 'shimmer 4s linear infinite',
        // Animasi Kartu Melayang
        float: 'float 6s ease-in-out infinite',
        // Animasi Marquee Testimoni
        marquee: 'marquee 40s linear infinite',
        // Spin lambat untuk ikon AI
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { 'background-position': '-200% center' },
          '100%': { 'background-position': '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        // Efek gradasi untuk kartu-kartu premium
        'glass-gradient': 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      },
      boxShadow: {
        // Shadow bercahaya khusus Emerald & Gold
        'glow-primary': '0 0 20px rgba(31, 122, 99, 0.3)',
        'glow-accent': '0 0 20px rgba(240, 208, 96, 0.2)',
      }
    }
  },
  plugins: []
}