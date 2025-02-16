import { process } from './process';
import { Imports } from '../classes/imports';
import {
  emptyClass,
  emptyClassWithASuperClass,
  classWithAConstructorBody,
  classWithAConstructorBodyAndSuperClass,
  passArgsToConstructorAndSuper,
  addClassPropertiesAndClassMethodsToClassPrototype,
  mapSuperAccessorsOntoSuperPrototype,
  addGettersAndSettersToObjectPrototypes,
  emptyClassProperty,

  emptyClassAbstract,
  gettersAbstract,
  methodsAbstract,
  propertiesAbstract,
  settersAbstract,

  emptyClassExpression,
  emptyClassExpressionWithSuperClass,
  classExpressionWithConstructorBody,
  classExpressionWithConstructorBodyAndSuperClass,
  classExpressiongArgumentsToConstructorAndSuper,
  classExpressionPropertiesAndMethodsOnPrototype,
  classExpressionSuperAccessorOnPrototype,
  classExpressionGettersAndSetters,
} from './test-fixtures';

import plugins from '..';

function runTest({ js, expected }) {
  const out = process(js.trim(), plugins);
  expect(out).toEqual(expected.trim());
}

afterEach(() => {
  Imports.imports.clear();
});

describe('ClassDeclaration', () => {
  it('should process an empty class', () => {
    runTest(emptyClass);
  });

  it('should process an empty class with a superclass', () => {
    runTest(emptyClassWithASuperClass);
  });

  it('should process a class with a constructor body', () => {
    runTest(classWithAConstructorBody);
  });

  it('should process a class with a constructor body and a superclass', () => {
    runTest(classWithAConstructorBodyAndSuperClass);
  });

  it('should pass argument for the constructor and super', () => {
    runTest(passArgsToConstructorAndSuper);
  });

  it('should add class properties and class methods to the class prototype', () => {
    runTest(addClassPropertiesAndClassMethodsToClassPrototype);
  });

  it('should map super[accessors] onto _super.prototype', () => {
    runTest(mapSuperAccessorsOntoSuperPrototype);
  });

  it('should add getters and setters to the object prototype', () => {
    runTest(addGettersAndSettersToObjectPrototypes);
  });

  it('should default property type declarations to null', () => {
    runTest(emptyClassProperty);
  });

  describe('abstract', () => {
    it('should process an empty class', () => {
      runTest(emptyClassAbstract);
    });

    it('should process abstract getters', () => {
      runTest(gettersAbstract);
    });

    it('should process abstract methods', () => {
      runTest(methodsAbstract);
    });

    it('should process abstract properties', () => {
      runTest(propertiesAbstract);
    });

    it('should process abstract setters', () => {
      runTest(settersAbstract);
    });
  });
});

describe('ClassExpression', () => {
  it('should process an empty class', () => {
    runTest(emptyClassExpression);
  });

  it('should process an empty class with a superclass', () => {
    runTest(emptyClassExpressionWithSuperClass);
  });

  it('should process a class with a constructor body', () => {
    runTest(classExpressionWithConstructorBody);
  });

  it('should process a class with a constructor body and a superclass', () => {
    runTest(classExpressionWithConstructorBodyAndSuperClass);
  });

  it('should pass argument for the constructor and super', () => {
    runTest(classExpressiongArgumentsToConstructorAndSuper);
  });

  it('should add class properties and class methods to the class prototype', () => {
    runTest(classExpressionPropertiesAndMethodsOnPrototype);
  });

  it('should map super[accessors] onto _super.prototype', () => {
    runTest(classExpressionSuperAccessorOnPrototype);
  });

  it('should add getters and setters to the object prototype', () => {
    runTest(classExpressionGettersAndSetters);
  });
});
