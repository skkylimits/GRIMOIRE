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
      screens: {
        // Define custom breakpoints here, e.g., sm: '640px'
        // https://tailwindcss.com/docs/screens
      }
    }
  },
  content: [
    './app/**/*.vue',            // Match all .vue files in the app directory
    './app/**/*.js',             // Match all .js files in the app directory
    './app/**/*.ts',             // Match all .ts files in the app directory
    './app/components/**/*.{js,vue,ts}', // Ensure components are included
    './app/layouts/**/*.vue',    // Ensure layouts are included
    './app/pages/**/*.vue'       // Ensure pages are included
    // './plugins/**/*.{js,ts}',
  ]
}
