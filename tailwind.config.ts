import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        red: {
          50: '#FFF0F0',
          100: '#FFDDDD',
          200: '#FFC0C1',
          300: '#FF9596',
          400: '#FF5859',
          500: '#FF2426',
          600: '#FE080A',
          700: '#D60002',
          800: '#B10304',
          900: '#910b0C',
          950: '#500001'
        }
      },
      maxWidth: {
        '7xl': '90rem', // overwriting the default for a wider <main>
        // '8xl': defaullt // default width for 8xl; without specifying, makes app full-width
      },
      screens: {
        // Override the default breakpoints or add custom ones
        // 'xs': '475px',   // Extra small devices
        // 'sm': '640px',   // Small devices (mobile)
        // 'md': '768px',   // Medium devices (tablet)
        'lg': '1080px',  // Large devices (laptop)
        // 'xl': '1280px',  // Extra large devices (desktop)
        // '2xl': '1536px', // Ultra large screens

      }
    }
  },
  content: [
    './app/**/*.vue',
    './app/**/*.js',
    './app/**/*.ts',
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue'
    // './plugins/**/*.{js,ts}',
  ]
}
