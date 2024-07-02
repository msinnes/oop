const emptyClass = {
  js: `
class MyClass {}
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const MyClass = clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})();
`,
};

const emptyClassWithASuperClass = {
  js: `
class MyClass extends AnotherClass {}
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const MyClass = clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})(AnotherClass);
`,
};

const classWithAConstructorBody = {
  js: `
class MyClass {
  constructor() {
    const someConst = 'data';
  }
}
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const MyClass = clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    const someConst = 'data';
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})();
`,
};

const classWithAConstructorBodyAndSuperClass = {
  js: `
class MyClass extends AnotherClass {
  constructor() {
    super();
    this.id = 'id';
  }
}
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const MyClass = clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.checkThis(this).id = 'id';
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})(AnotherClass);
`,
};

const passArgsToConstructorAndSuper = {
  js: `
class MyClass extends AnotherClass {
  constructor(one, two) {
    super(one, two, three)
  }
}
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const MyClass = clazz((_super, svc) => {
  function MyClass(one, two) {
    svc.init();
    _super.apply(this, one, two, three);
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})(AnotherClass);
`,
};

const addClassPropertiesAndClassMethodsToClassPrototype = {
  js: `
class MyClass extends AnotherClass {
  prop1 = 1;
  prop2 = 'two';
  method() {
    return this.prop1;
  }
}
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const MyClass = clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super, {
    prop1: 1,
    prop2: 'two',
    method: function () {
      return this.prop1;
    }
  });
  return MyClass;
})(AnotherClass);
`,
};

const mapSuperAccessorsOntoSuperPrototype = {
  js: `
class MyClass extends AnotherClass {
  constructor() {
    super();
    super.method();
  }

  method() {
    super.method(one, two, three);
    const prop = super.prop;
  }
}
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const MyClass = clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    _super.prototype.method.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super, {
    method: function () {
      _super.prototype.method.apply(this, one, two, three);
      const prop = _super.prototype.prop;
    }
  });
  return MyClass;
})(AnotherClass);
`,
};

const addGettersAndSettersToObjectPrototypes = {
  js: `
class MyClass extends AnotherClass {
  value = 'value';

  get prop() {
    return this.value;
  }

  set prop (value) {
    this.value = value;
  }
}
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const MyClass = clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super, {
    value: 'value'
  });
  Object.defineProperties(MyClass.prototype, {
    prop: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.value = value;
      }
    }
  });
  return MyClass;
})(AnotherClass);
`,
};

// Class Declaration - Abstract
const emptyClassAbstract = {
  js: `
abstract class MyClass {}
`,
  expected: `
import { abstract, clazz, doExtend } from "@msinnes/oop";
const MyClass = abstract(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})());
`,
};

const gettersAbstract = {
  js: `
abstract class MyClass {
  abstract get prop();
}
`,
  expected: `
import { abstract, abstractGetter, clazz, doExtend } from "@msinnes/oop";
const MyClass = abstract(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    abstractGetter(this, "prop");
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})());
`,
};

const methodsAbstract = {
  js: `
abstract class MyClass {
  abstract method();
}
`,
  expected: `
import { abstract, abstractMethod, clazz, doExtend } from "@msinnes/oop";
const MyClass = abstract(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    abstractMethod(this, "method");
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})());
`,
};

const propertiesAbstract = {
  js: `
abstract class MyClass {
  abstract prop;
}
`,
  expected: `
import { abstract, abstractProperty, clazz, doExtend } from "@msinnes/oop";
const MyClass = abstract(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    abstractProperty(this, "prop");
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})());
`,
};

const settersAbstract = {
  js: `
abstract class MyClass {
  abstract set prop(value);
}
`,
  expected: `
import { abstract, abstractSetter, clazz, doExtend } from "@msinnes/oop";
const MyClass = abstract(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    abstractSetter(this, "prop");
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})());
`,
};

// Class Expression
const emptyClassExpression = {
  js: `
const wrappedClass = wrapper(class MyClass {})
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const wrappedClass = wrapper(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})());
`,
};

const emptyClassExpressionWithSuperClass = {
  js: `
const wrappedClass = wrapper(class MyClass extends AnotherClass {})
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const wrappedClass = wrapper(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})(AnotherClass));
`,
};

const classExpressionWithConstructorBody = {
  js: `
const wrappedClass = wrapper(class MyClass {
  constructor() {
    const someConst = 'data';
  }
});
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const wrappedClass = wrapper(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    const someConst = 'data';
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})());
`,
};

const classExpressionWithConstructorBodyAndSuperClass = {
  js: `
const wrappedClass = wrapper(class MyClass extends AnotherClass {
  constructor() {
    super();
    this.id = 'id';
  }
});
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const wrappedClass = wrapper(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.checkThis(this).id = 'id';
    svc.close();
  }
  doExtend(MyClass, _super);
  return MyClass;
})(AnotherClass));
`,
};

const classExpressiongArgumentsToConstructorAndSuper = {
  js: `
const wrappedClass = wrapper(class extends AnotherClass {
  constructor(one, two) {
    super(one, two, three)
  }
});
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const wrappedClass = wrapper(clazz((_super, svc) => {
  function AnonymousClass(one, two) {
    svc.init();
    _super.apply(this, one, two, three);
    svc.close();
  }
  doExtend(AnonymousClass, _super);
  return AnonymousClass;
})(AnotherClass));
`,
};

const classExpressionPropertiesAndMethodsOnPrototype = {
  js: `
const wrappedClass = wrapper(class MyClass extends AnotherClass {
  prop1 = 1;
  prop2 = 'two';
  method() {
    return this.prop1;
  }
});
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const wrappedClass = wrapper(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super, {
    prop1: 1,
    prop2: 'two',
    method: function () {
      return this.prop1;
    }
  });
  return MyClass;
})(AnotherClass));
`,
};

const classExpressionSuperAccessorOnPrototype = {
  js: `
const wrappedClass = wrapper(class MyClass extends AnotherClass {
  constructor() {
    super();
    super.method();
  }

  method() {
    super.method(one, two, three);
    const prop = super.prop;
  }
});
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const wrappedClass = wrapper(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    _super.prototype.method.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super, {
    method: function () {
      _super.prototype.method.apply(this, one, two, three);
      const prop = _super.prototype.prop;
    }
  });
  return MyClass;
})(AnotherClass));
`,
};

const classExpressionGettersAndSetters = {
  js: `
const wrappedClass = wrapper(class MyClass extends AnotherClass {
  value = 'value';

  get prop() {
    return this.value;
  }

  set prop (value) {
    this.value = value;
  }
});
`,
  expected: `
import { clazz, doExtend } from "@msinnes/oop";
const wrappedClass = wrapper(clazz((_super, svc) => {
  function MyClass() {
    svc.init();
    _super.apply(this);
    svc.close();
  }
  doExtend(MyClass, _super, {
    value: 'value'
  });
  Object.defineProperties(MyClass.prototype, {
    prop: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.value = value;
      }
    }
  });
  return MyClass;
})(AnotherClass));
`,
};

export {
  emptyClass,
  emptyClassWithASuperClass,
  classWithAConstructorBody,
  classWithAConstructorBodyAndSuperClass,
  passArgsToConstructorAndSuper,
  addClassPropertiesAndClassMethodsToClassPrototype,
  mapSuperAccessorsOntoSuperPrototype,
  addGettersAndSettersToObjectPrototypes,

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
};
