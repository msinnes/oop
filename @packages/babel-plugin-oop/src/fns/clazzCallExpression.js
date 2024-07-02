import { Builder } from '../classes/builder';

const { builder } = Builder;

const initExpression = () => builder.callStatement(builder.memberExpression('svc', 'init'), []);
const abstractExpressions = state => ([
  ...state.abstractGetters.map(getter => builder.abstractCallStatement('abstractGetter', getter.name)),
  ...state.abstractMethods.map(method => builder.abstractCallStatement('abstractMethod', method.name)),
  ...state.abstractProperties.map(property => builder.abstractCallStatement('abstractProperty', property.name)),
  ...state.abstractSetters.map(setter => builder.abstractCallStatement('abstractSetter', setter.name)),
]);
const closeExpression = () => builder.callStatement(builder.memberExpression('svc', 'close'), []);

const classFunctionDeclaration = state => {
  let params = [];
  let body = [];
  if (state.cons) {
    params = state.cons.params;
    body = state.cons.body.body;
  }

  let block;
  if (state.superClass && state.cons) {
    block = [
      initExpression(),
      ...body,
      closeExpression(),
    ];
  } else {
    block = [
      initExpression(),
      builder.expressionStatement(builder.superApplyExpression()),
      ...body,
      ...abstractExpressions(state),
      closeExpression(),
    ];
  }
  return builder.functionDeclaration(
    state.id,
    params,
    builder.blockStatement(block),
  );
};

const classProto = (nodeId, props, methods) => builder.objectExpression([
  ...props.map(prop => {
    return builder.objectProperty(prop.key, prop.value);
  }),
  ...methods.map(method => {
    return builder.objectProperty(method.key, builder.functionExpression(null, method.params, method.body));
  }),
]);

const classDoExtend = (nodeId, methods, props) => {
  const args = [nodeId, builder.identifier('_super')];
  if ((props && props.length) || (methods && methods.length)) args.push(classProto(nodeId, methods, props));
  return builder.callStatement(builder.identifier('doExtend'), args);
};

const classGettersAndSetters = state => builder.callStatement(builder.memberExpression('Object', 'defineProperties'), [
  builder.memberExpression(state.id, 'prototype'),
  builder.objectExpression([
    ...Object.keys(state.accessors).map(key => builder.objectProperty(builder.identifier(key), builder.objectExpression([
      ...Object.keys(state.accessors[key]).map(k => {
        const method = state.accessors[key][k];
        return builder.objectProperty(builder.identifier(k), builder.functionExpression(null, method.params, method.body));
      }),
    ]))),
  ]),
]);

const classBlockStatement = state => {
  const blocks = [
    classFunctionDeclaration(state),
    classDoExtend(state.id, state.props, state.methods),
  ];

  if (Object.keys(state.accessors).length) {
    blocks.push(classGettersAndSetters(state));
  }

  blocks.push(builder.returnStatement(state.id));
  return builder.blockStatement(blocks);
};

const clazzCallExpression = state => builder.callExpression(
  builder.callExpression(
    builder.identifier('clazz'),
    [
      builder.arrowFunctionExpression(
        [
          builder.identifier('_super'),
          builder.identifier('svc'),
        ],
        classBlockStatement(state),
      ),
    ],
  ),
  state.superClass ? [state.superClass] : [],
);

export { clazzCallExpression };
