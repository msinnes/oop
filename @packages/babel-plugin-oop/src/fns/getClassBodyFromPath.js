import { Builder } from '../classes/builder';

const { builder } = Builder;

const getClassBodyFromPath = (node, path) => {
  const classBody = {
    // pulled directly from the node
    id: node.id || builder.identifier('AnonymousClass'),
    superClass: node.superClass,

    // preset to null
    cons: null,
    superCall: null,

    // preset arrays
    abstractGetters: [],
    abstractMethods: [],
    abstractProperties: [],
    abstractSetters: [],
    constructorThis: [],
    props: [],
    methods: [],
    supers: [],
    superCalls: [],

    // presetObjects
    accessors: {},

    // class flags
    hasAbstractGets: false,
    hasAbstractMethods: false,
    hasAbstractProps: false,
    hasAbstractSets: false,
  };

  path.traverse({
    ClassMethod: path => {
      const { node } = path;
      if (node.kind === 'constructor') {
        classBody.cons = node;
      } else if (node.kind === 'get' || node.kind === 'set') {
        const key = node.key.name;
        if (!classBody.accessors[key]) classBody.accessors[key] = {};
        classBody.accessors[key][node.kind] = node;
      } else {
        classBody.methods.push(node);
      }
    },
    ClassProperty: path => {
      const { node } = path;
      if (node.abstract) {
        classBody.abstractProperties.push(node.key);
        classBody.hasAbstractProps = true;
      } else {
        classBody.props.push(node);
      }
    },
    Super: path => {
      if (path.parentPath.isCallExpression()) classBody.superCall = path;
      if (path.parentPath.isMemberExpression()) {
        classBody.supers.push(path);
        let curr = path.parentPath;
        do {
          curr = curr.parentPath;
        } while (curr.parentPath.isMemberExpression());

        if (curr.isCallExpression() && classBody.superCalls.indexOf(curr) < 0) classBody.superCalls.push(curr);
      }
    },
    ThisExpression: path => {
      const containingFunction = path.findParent(parent => parent.isClassMethod());
      if (containingFunction.node.kind === 'constructor') classBody.constructorThis.push(path);
    },
    TSDeclareMethod: path => {
      const { node } = path;
      if (node.abstract) {
        if (node.kind === 'get') {
          classBody.abstractGetters.push(node.key);
          classBody.hasAbstractGets = true;
        }
        if (node.kind === 'method') {
          classBody.abstractMethods.push(node.key);
          classBody.hasAbstractMethods = true;
        }
        if (node.kind === 'set') {
          classBody.abstractSetters.push(node.key);
          classBody.hasAbstractSets = true;
        }
      }
    },
  });

  return classBody;
};

export { getClassBodyFromPath };
