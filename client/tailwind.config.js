module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ccf1dd',
          200: '#99e2bb',
          300: '#66d498',
          400: '#33c576',
          500: '#00b754',
          600: '#009243',
          700: '#006e32',
          800: '#004922',
          900: '#002511',
        },
      },
      fontSize: {
        xxs: '.625rem',
      },
      screens: {
        xs: '480px',
      },
      fontFamily: {
        logo: ['Cookie', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
