/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tokens Semânticos
        primary: {
          500: '#D7FF00', // Colors/Primary/primary-500
        },
        secondary: {
          50: '#E7E8EA',  // Colors/Secondary/secondary-50
          900: '#060A11', // Colors/Secondary/secondary-900
        },
        surface: {
          500: '#FFFFFF', // Colors/Surface/surface-500
        },
        background: {
          400: '#F5F6F8', // Colors/Background/background-400
        },
        // Tokens Primitivos
        neutral: {
          0: '#ffffff',   // color/neutral/0
          300: '#e5e7eb', // color/neutral/300
          400: '#d1d5db', // color/neutral/400
          500: '#9ca3af', // color/neutral/500
          1100: '#080b12', // color/neutral/1100
        },
        brand: {
          700: '#c4e703', // color/brand/700
        },
        blue: {
          600: '#2a89ef', // color/blue/600
        },
        green: {
          600: '#15be78', // color/green/600
        },
        red: {
          600: '#e61e32', // color/red/600
        },
      },
      spacing: {
        // Tokens de Espaçamento do Design System
        '0': '0px',   // space/0
        '8': '8px',   // space/8
        '12': '12px', // space/12
        '16': '16px', // space/16
        '20': '20px', // space/20
        '24': '24px', // space/24
        '32': '32px', // space/32
        '56': '56px', // space/56
      },
      borderRadius: {
        // Tokens de Shape
        '2': '2px',   // shape/2
        '20': '20px', // shape/20
        '100': '100px', // shape/100 (círculo)
      },
      fontSize: {
        // Tipografia - Heading
        'heading-medium': ['28px', { lineHeight: '36px', fontWeight: '700' }], // Heading/Medium
        'heading-small': ['24px', { lineHeight: '32px', fontWeight: '700' }], // Heading/Small
        'heading-xsmall': ['20px', { lineHeight: '28px', fontWeight: '700' }], // Heading/X-Small
        // Tipografia - Label
        'label-large': ['18px', { lineHeight: '24px', fontWeight: '600', letterSpacing: '0.3px' }], // Label/Large
        'label-medium': ['16px', { lineHeight: '20px', fontWeight: '600', letterSpacing: '0.3px' }], // Label/Medium
        'label-small': ['14px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.3px' }], // Label/Small
        'label-xsmall': ['12px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.3px' }], // Label/X-Small
        // Tipografia - Paragraph
        'paragraph-large': ['18px', { lineHeight: '28px', fontWeight: '400', letterSpacing: '0.3px' }], // Paragraph/Large
        'paragraph-small': ['14px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '0.3px' }], // Paragraph/Small
        'paragraph-xsmall': ['12px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '0.3px' }], // Paragraph/X-Small
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
    screens: {
      'md': '768px',   // Tablet
      'lg': '1280px',  // Desktop
      'xl': '1920px',  // Wide / 4K
    },
  },
  plugins: [],
}
