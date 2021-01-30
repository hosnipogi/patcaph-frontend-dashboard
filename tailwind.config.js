const windmill = require('@windmill/react-ui/config');

module.exports = windmill({
  purge: [],
  theme: {
    extend: {
      height: (theme) => ({
        'screen-80': '80vh',
        'screen-90': '90vh',
      }),
    },
  },
  variants: {},
  plugins: [],
});
