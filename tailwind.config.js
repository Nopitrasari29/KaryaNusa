/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
  primary: "#1F7A63",
  secondary: "#1E3A5F",
  accent: "#D4AF37",
  background: "#F6F5F2",
  textdark: "#2B2B2B",
  // tambahan opsional:
  "primary-light": "#E6F4F1",  // bg hijau muda buat card
  "accent-light": "#FFF5DB",   // bg emas muda buat highlight
  "text-muted": "#64748B",     // abu-abu buat subtitle
}
    }
  },
  plugins: []
}