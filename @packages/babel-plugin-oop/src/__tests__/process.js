const generate = require('@babel/generator').default;
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const config = {
  plugins: ['typescript'],
};

const gen = ast => generate(ast).code;

const process = (input, plugins) => {
  const plugin = plugins();
  const ast = parser.parse(input, config);
  traverse(ast, plugin.visitor);
  return gen(ast);
};

const otherProcess = (input, plugin) => babel.transformSync(input, { filename: 'test.js', cwd: '/', parserOpts: { plugins: ['typescript'] }, plugins: [plugin()]});

export { otherProcess, process };
