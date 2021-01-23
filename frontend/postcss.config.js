module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-preset-env')({ stage: 2 }),
    require('postcss-font-magician')({
      foundries: ['google'],
    }),
    require('autoprefixer')
  ]
}
