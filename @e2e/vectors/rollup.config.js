const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'dist/vectors.js',
  },
  plugins: [nodeResolve(), commonjs()],
};
