import { doExtend } from './clazz';

function abstract(InputClass) {
  function AbstractClass(...args) {
    InputClass.apply(this, args);
    if (this.constructor === AbstractClass) throw new Error('Abstract classes cannot be instantiated');
  }
  doExtend(AbstractClass, InputClass);
  return AbstractClass;
}

const abstractGetter = (instance, getterName) => {
  const test = Object.getOwnPropertyDescriptor(instance, getterName);
  if (!test || !(test.get instanceof Function)) throw new Error(`${getterName} is an abstract getter and must be on the class prototype`);
};

const abstractMethod = (instance, methodName) => {
  const test = instance[methodName];
  if (!test || !(test instanceof Function)) throw new Error(`${methodName} is an abstract method and must be on the class prototype`);
};

const abstractProperty = (instance, propertyName) => {
  const test = instance[propertyName];
  if (test === null || typeof test === 'undefined') throw new Error(`${propertyName} is an abstract property and cannot be undefined or null`);
};

const abstractSetter = (instance, getterName) => {
  const test = Object.getOwnPropertyDescriptor(instance, getterName);
  if (!test || !(test.set instanceof Function)) throw new Error(`${getterName} is an abstract setter and must be on the class prototype`);
};

export {
  abstract,
  abstractGetter,
  abstractMethod,
  abstractProperty,
  abstractSetter,
};
