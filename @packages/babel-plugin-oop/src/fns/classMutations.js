import { Builder } from '../classes/builder';
import { Imports } from '../classes/imports';

import { clazzCallExpression } from './clazzCallExpression';
import { getClassBodyFromPath } from './getClassBodyFromPath';

const { builder } = Builder;
const { imports } = Imports;

function abstractClazzMutation(node) {
  imports.add('abstract');
  return builder.declareConst(node.id, builder.callExpression(builder.identifier('abstract'), [builder.classExpression(node.id, node.superClazz, node.body)]));
}

function getClazzBodyAndImports(node, path) {
  const clazzBody = getClassBodyFromPath(node, path);

  if (clazzBody.superCall) {
    clazzBody.superCall.parentPath.replaceWith(builder.superApplyExpression(clazzBody.superCall.parentPath.node.arguments));
  }
  clazzBody.constructorThis.forEach(constructorThis => constructorThis.replaceWith(builder.wrappedThis()));
  clazzBody.supers.forEach(sup => sup.replaceWith(builder.memberExpression('_super', 'prototype')));
  clazzBody.superCalls.forEach(superCall => superCall.replaceWith(builder.applyCallExpression(superCall.node)));

  clazzBody.hasAbstractGets && imports.add('abstractGetter');
  clazzBody.hasAbstractMethods && imports.add('abstractMethod');
  clazzBody.hasAbstractProps && imports.add('abstractProperty');
  clazzBody.hasAbstractSets && imports.add('abstractSetter');

  imports.add('clazz', 'doExtend');
  return clazzBody;
}

function clazzDeclarationMutation(node, path) {
  const clazzBody = getClazzBodyAndImports(node, path);
  return builder.declareConst(clazzBody.id, clazzCallExpression(clazzBody));
}

function clazzExpressionMutation(node, path) {
  const clazzBody = getClazzBodyAndImports(node, path);
  return clazzCallExpression(clazzBody);
}

export { abstractClazzMutation, clazzDeclarationMutation, clazzExpressionMutation };
