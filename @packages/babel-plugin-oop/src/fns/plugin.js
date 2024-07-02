import { Builder } from '../classes/builder';
import { Imports } from '../classes/imports';
import { abstractClazzMutation, clazzDeclarationMutation, clazzExpressionMutation } from './classMutations';

const { builder } = Builder;
const { imports } = Imports;

const plugin = () => ({
  manipulateOptions: (opts, parserOptions) => {
    parserOptions.plugins.push('typescript');
  },
  visitor: {
    ClassDeclaration: path => {
      const { node } = path;
      let declaration;
      if (node.abstract) declaration = abstractClazzMutation(node);
      else declaration = clazzDeclarationMutation(node, path);
      path.replaceWith(declaration);
    },
    ClassExpression: path => {
      const declaration = clazzExpressionMutation(path.node, path);
      path.replaceWith(declaration);
    },
    Program: {
      exit: path => {
        if (imports.length) {
          const oopImports = builder.oopImportDeclaration(imports.getImports());
            path.node.body.unshift(oopImports);
        }
      },
    },
  },
});

export { plugin };
