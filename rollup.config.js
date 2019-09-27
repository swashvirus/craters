module.exports = {
  input: './app/craters/craters.js',
  output: [{
    file: './dist/craters.js',
    format: 'iife',
    name: 'Craters'
  },
  {
    file: './dist/craters.mjs',
    format: 'esm'
  }]
}