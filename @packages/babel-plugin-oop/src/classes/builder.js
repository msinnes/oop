const t = require('@babel/types');

const callStatement = (id, params) => {
  let identifier = id;
  if (typeof identifier === 'string') identifier = t.identifier(identifier);
  return t.expressionStatement(t.callExpression(identifier, params));
};

const abstractCallStatement = (id, string) => callStatement(id, [t.thisExpression(), t.stringLiteral(string)]);

const applyCallExpression = node => t.callExpression(memberExpression(node.callee, 'apply'), [t.thisExpression(), ...node.arguments]);

const declareConst = (key, value) => t.variableDeclaration('const', [
  t.variableDeclarator(key, value),
]);

const namedImports = (imports, source) => t.importDeclaration(
  imports.map(imp => t.importSpecifier(
    t.identifier(imp),
    t.identifier(imp),
  )),
  t.stringLiteral(source),
);


const memberExpression = (left, right) => {
  const l = t.isMemberExpression(left) || t.isIdentifier(left) ? left : t.identifier(left);
  const r = t.identifier(right);
  return t.memberExpression(l, r);
};

const oopImportDeclaration = imports => namedImports(imports, '@msinnes/oop');

const superApplyExpression = (args = []) => t.callExpression(
  memberExpression('_super', 'apply'),
  [t.thisExpression(), ...args],
);

const wrappedThis = () => t.callExpression(memberExpression('svc', 'checkThis'), [t.thisExpression()]);

function Builder() {
  this.arrowFunctionExpression = t.arrowFunctionExpression;
  this.blockStatement = t.blockStatement;
  this.callExpression = t.callExpression;
  this.classExpression = t.classExpression;
  this.expressionStatement = t.expressionStatement;
  this.functionDeclaration = t.functionDeclaration;
  this.functionExpression = t.functionExpression;
  this.identifier = t.identifier;
  this.objectExpression = t.objectExpression;
  this.objectProperty = t.objectProperty;
  this.returnStatement = t.returnStatement;

  this.abstractCallStatement = abstractCallStatement;
  this.applyCallExpression = applyCallExpression;
  this.callStatement = callStatement;
  this.declareConst = declareConst;
  this.memberExpression = memberExpression;
  this.oopImportDeclaration = oopImportDeclaration;
  this.superApplyExpression = superApplyExpression;
  this.wrappedThis = wrappedThis;
}

Builder.builder = new Builder();
export { Builder };
