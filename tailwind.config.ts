import type { Config } from 'tailwindcss';

const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' } },
    extend: {
      colors: {
        night: rgb('--night'),
        ivory: rgb('--ivory'),
        paper: rgb('--paper'),
        ink: {
          DEFAULT: rgb('--ink'),
          soft: rgb('--ink-soft'),
          muted: rgb('--ink-muted'),
        },
        wine: {
          950: rgb('--wine-950'),
          900: rgb('--wine-900'),
          800: rgb('--wine-800'),
          700: rgb('--wine-700'),
          600: rgb('--wine-600'),
          500: rgb('--wine-500'),
          400: rgb('--wine-400'),
          100: rgb('--wine-100'),
          50: rgb('--wine-50'),
        },
        gold: {
          200: rgb('--gold-200'),
          300: rgb('--gold-300'),
          400: rgb('--gold-400'),
          500: rgb('--gold-500'),
          600: rgb('--gold-600'),
          700: rgb('--gold-700'),
        },
        line: rgb('--line'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 20px 40px -28px rgba(0,0,0,.9)',
        lift: '0 30px 60px -30px rgba(0,0,0,.95)',
        wine: '0 18px 40px -14px rgba(150,30,34,.55)',
        gold: '0 18px 40px -14px rgba(227,169,43,.55)',
      },
      backgroundImage: {
        'grad-wine': 'var(--grad-wine)',
        'grad-gold': 'var(--grad-gold)',
        'grad-brand': 'var(--grad-brand)',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '80%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '0' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        pulsering: {
          '0%': { transform: 'scale(1)', opacity: '.55' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
      },
      animation: {
        shine: 'shine 1.1s ease',
        floaty: 'floaty 6s ease-in-out infinite',
        'scroll-dot': 'scroll-dot 1.8s ease-in-out infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        pulsering: 'pulsering 2.2s cubic-bezier(.2,.6,.3,1) infinite',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(.22,1,.36,1)',
      },
    },
  },
  plugins: [],
};

export default config;
