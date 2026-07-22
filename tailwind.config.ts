import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDF2F1',
          100: '#F8E0DD',
          200: '#F0BFB9',
          300: '#E59A8F',
          400: '#D97768',
          500: '#C75340',
          600: '#A83E2C',
          700: '#702620',
          800: '#4F1814',
          900: '#3A100D',
        },
        gold: {
          50: '#FEF9E7',
          100: '#FDF0BF',
          200: '#FCE59A',
          300: '#FAD86F',
          400: '#ECC667',
          500: '#E3BA4A',
          600: '#C79C3A',
          700: '#A67D2A',
          800: '#85621E',
          900: '#634814',
        },
        bronze: {
          50: '#F5F0EC',
          100: '#E8DDD5',
          200: '#D4C0B0',
          300: '#BFA08A',
          400: '#A8866E',
          500: '#997157',
          600: '#7E5C46',
          700: '#634836',
          800: '#4A3527',
          900: '#35261C',
        },
        surface: {
          DEFAULT: '#0B0B0B',
          light: '#161616',
          card: '#1E1E1E',
          hover: '#2B2B2B',
        },
        text: {
          DEFAULT: '#D8D8D8',
          light: '#A5A5A5',
          heading: '#FFFFFF',
          muted: '#6B7280',
        },
        border: {
          DEFAULT: '#2B2B2B',
        },
        success: '#2E7D32',
        warning: '#F9A825',
        error: '#C62828',
        dark: '#000000',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        outfit: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(238, 198, 103, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(238, 198, 103, 0.4)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #702620 0%, #9B3A2F 45%, #ECC667 100%)',
        'gradient-gold': 'linear-gradient(180deg, #ECC667, #C79C3A)',
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
