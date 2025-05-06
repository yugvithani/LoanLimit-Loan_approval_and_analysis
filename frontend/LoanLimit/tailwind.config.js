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
          50: '#EEEEFF',
          100: '#D6D6FF',
          200: '#B0AFFF',
          300: '#8A87FF',
          400: '#6762FF',
          500: '#3A36E0', // Primary
          600: '#2F2CBE',
          700: '#24219C',
          800: '#19177A',
          900: '#0F0F58',
        },
        secondary: {
          50: '#E6FBF5',
          100: '#CCF7EB',
          200: '#99EFD7',
          300: '#66E7C4',
          400: '#33DFB0',
          500: '#0DA678', // Secondary
          600: '#0A8861',
          700: '#086A4B',
          800: '#054C34',
          900: '#032E1D',
        },
        accent: {
          50: '#FFF3EE',
          100: '#FFE7DD',
          200: '#FFCFBB',
          300: '#FFB799',
          400: '#FF9F77',
          500: '#FF7A3D', // Accent
          600: '#D65E2B',
          700: '#AD431A',
          800: '#852808',
          900: '#5C0D00',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}