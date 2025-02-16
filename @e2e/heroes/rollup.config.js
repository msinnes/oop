const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'dist/heroes.js',
  },
  plugins: [nodeResolve(), commonjs()],
};
