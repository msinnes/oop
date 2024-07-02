import { abstract, clazz } from '..';

describe('api', () => {
  it('should provide classes', () => {
    const TestClass = clazz(_super => {
      function TestClass() {
        _super.apply(this);
      }

      TestClass.prototype = Object.create(_super.prototype);
      TestClass.prototype.constructor = TestClass;
      return TestClass;
    })();
    expect(() => {
      TestClass();
    }).toThrow('Cannot call a class as a function');
  });

  it('should provide class abstraction', () => {
    const AbstractClass = abstract(clazz(_super => {
      function AbstractClass() {
        _super.apply(this);
      }

      AbstractClass.prototype = Object.create(_super.prototype);
      AbstractClass.prototype.constructor = AbstractClass;
      return AbstractClass;
    })());
    expect(() => {
      AbstractClass();
    }).toThrow('Cannot call a class as a function');
    expect(() => {
      new AbstractClass();
    }).toThrow('Abstract classes cannot be instantiated');
  });
});
