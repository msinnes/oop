import { Class, extendz, doExtend, clazz } from '../clazz';

describe('extendz', () => {
  it('should be a function', () => {
    expect(extendz).toBeInstanceOf(Function);
  });

  it('should return true if a class extends another class or if the same class is passed', () => {
    class BaseClass {}
    class ExtendingClass extends BaseClass {}
    class SecondExtendingClass extends ExtendingClass {}
    expect(extendz(ExtendingClass, BaseClass)).toBe(true);
    expect(extendz(SecondExtendingClass, BaseClass)).toBe(true);
    expect(extendz(SecondExtendingClass, ExtendingClass)).toBe(true);
    expect(extendz(BaseClass, BaseClass)).toBe(true);
  });

  it('should return false if a class does not extend another class', () => {
    class BaseClass {}
    class ExtendingClass extends BaseClass {}
    class FailingClass {}
    expect(extendz(FailingClass, BaseClass)).toBe(false);
    expect(extendz(FailingClass, ExtendingClass)).toBe(false);
    expect(extendz(BaseClass, ExtendingClass)).toBe(false);
  });

  it('should return false if the input class does not have a prototype', () => {
    const noProtoClass = null;
    const protoClass = class {};
    expect(extendz(noProtoClass, protoClass)).toBe(false);
    expect(extendz(protoClass, noProtoClass)).toBe(false);
  });

  it('should work on a loaded class', () => {
    const TestClass = clazz(_super => {
      function TestClass(){
        _super.apply(this);
      }

      doExtend(TestClass, _super);
      return TestClass;
    })();
    expect(extendz(TestClass, Class)).toBe(true);

    const AnotherTestClass = clazz(_super => {
      function AnotherTestClass (){
        _super.apply(this);
      }

      doExtend(AnotherTestClass, _super);
      return AnotherTestClass;
    })(TestClass);

    expect(extendz(AnotherTestClass, Class)).toBe(true);
    expect(extendz(AnotherTestClass, TestClass)).toBe(true);
  });
});

describe('doExtend', () => {
  it('should be a function', () => {
    expect(doExtend).toBeInstanceOf(Function);
  });

  it('should call Object.create with _super.prototype, set the value on class.prototype and update the constructor', () => {
    function TestClass() {}
    doExtend(TestClass, Class);
    expect(TestClass.prototype.constructor).not.toBe(Class);
    expect(TestClass.prototype.constructor).toBe(TestClass);
    expect(new TestClass()).toBeInstanceOf(Class);
  });

  it('should call Object.assign with class.prototype and an input proto', () => {
    const ObjectAssignOriginal = Object.assign;
    Object.assign = jest.fn();
    const proto = {};
    function TestClass() {}

    doExtend(TestClass, Class, proto);
    expect(Object.assign).toHaveBeenCalledTimes(1);
    expect(Object.assign).toHaveBeenCalledWith(TestClass.prototype, proto);
    Object.assign = ObjectAssignOriginal;
  });

  it('should not call Object.assign if no proto is passed', () => {
    const ObjectAssignOriginal = Object.assign;
    Object.assign = jest.fn();
    function TestClass() {}

    doExtend(TestClass, Class);
    expect(Object.assign).not.toHaveBeenCalled();
    Object.assign = ObjectAssignOriginal;
  });
});

describe('clazz', () => {
  it('should be a function', () => {
    expect(clazz).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(clazz(() => {})).toBeInstanceOf(Function);
  });

  it('the curried function should return the value from the input function', () => {
    const ref = {};
    const mock = jest.fn().mockReturnValue(ref);
    expect(clazz(mock)()).toBe(ref);
  });

  it('should call the input function with Class if no arg is curried', () => {
    const mock = jest.fn().mockReturnValue({});
    clazz(mock)();
    expect(mock).toHaveBeenCalledTimes(1);
    const ExpectedClass = mock.mock.calls[0][0];
    expect(extendz(ExpectedClass, Class)).toBe(true);
  });

  it('should pass one curried arg to the input fn', () => {
    const SuperClass = clazz(_super => {
      function SuperClass() {
        _super.apply(this);
      }

      doExtend(SuperClass, _super);
      return SuperClass;
    })();
    const mock = jest.fn().mockReturnValue({});
    clazz(mock)(SuperClass);
    expect(mock).toHaveBeenCalledTimes(1);
    const ExpectedClass = mock.mock.calls[0][0];
    expect(extendz(ExpectedClass, SuperClass)).toBe(true);
  });

  it('should create a class', () => {
    const TestClass = clazz(_super => {
      function TestClass() {
        _super.apply(this);
      }

      doExtend(TestClass, _super);
      return TestClass;
    })();
    expect(() => {
      TestClass();
    }).toThrow('Cannot call a class as a function');
  });

  it('should expose an extends function on the class', () => {
    const SuperClass = clazz(_super => {
      function SuperClass() {
        _super.apply(this);
      }

      doExtend(SuperClass, _super);
      return SuperClass;
    })();

    const NewClass = clazz(_super => {
      function NewClass() {
        _super.apply(this);
      }

      doExtend(NewClass, _super);
      return NewClass;
    })(SuperClass);
    expect(NewClass.extends).toBeInstanceOf(Function);
    expect(NewClass.extends(SuperClass)).toBe(true);
    expect(NewClass.extends(Class)).toBe(true);
    new NewClass();
  });

  it('should expose getters and setters on the class prototype', () => {
    const SuperClass = clazz(_super => {
      function SuperClass() {
        _super.apply(this);
        this.value = 'value';
      }

      doExtend(SuperClass, _super);

      Object.defineProperties(SuperClass.prototype, {
        prop: {
          get: function() {
            return this.value;
          },
          set: function (value) {
            this.value = value;
          },
        },
      });
      return SuperClass;
    })();

    const TestClass = clazz(_super => {
      function TestClass() {
        _super.apply(this);
      }

      doExtend(TestClass, _super);
      return TestClass;
    })(SuperClass);
    const text = new TestClass();
    expect(text.prop).toEqual('value');
    text.prop = 'newValue';
    expect(text.prop).toEqual('newValue');
    expect(text.value).toEqual('newValue');
  });

  it('should throw an error if the SuperClass is not a class', () => {
    function SuperClass() {}
    expect(() => {
      clazz(() => {
        function MyClass () {}
        return MyClass;
      })(SuperClass);
    }).toThrow('TypeError: Super expression must be a class');
  });

  describe('svc', () => {
    it('shoud be a service exposed by clazz', () => {
      let svc;
      clazz((_super, svcRef) => {
        svc = svcRef;
        function TestClass() {
          _super.apply(this);
        }

        doExtend(TestClass, _super);
        return TestClass;
      })();
      expect(svc).toBeInstanceOf(Object);
      expect(svc.init).toBeInstanceOf(Function);
      expect(svc.close).toBeInstanceOf(Function);
      expect(svc.checkThis).toBeInstanceOf(Function);
    });

    it('should throw an error if called before super is called', () => {
      const TestClass = clazz((_super, svc) => {
        function TestClass() {
          svc.init();
          svc.checkThis(this);
          _super.apply(this);
          svc.close();
        }

        doExtend(TestClass, _super);
        return TestClass;
      })();
      expect(() => {
        new TestClass();
      }).toThrow('ReferenceError: Must call super constructor in derived class before accessing \'this\' or returning from derived constructor');
    });

    it('should not throw an error if called after super is called', () => {
      const TestClass = clazz((_super, svc) => {
        function TestClass() {
          svc.init();
          _super.apply(this);
          svc.checkThis(this);
          svc.close();
        }

        doExtend(TestClass, _super);
        return TestClass;
      })();
      expect(() => {
        new TestClass();
      }).not.toThrow();
    });

    it('should throw an error if called as arg of super', () => {
      const TestClass = clazz((_super, svc) => {
        function TestClass() {
          svc.init();
          _super.apply(this, svc.checkThis(this));
          svc.close();
        }

        doExtend(TestClass, _super);
        return TestClass;
      })();
      expect(() => {
        new TestClass();
      }).toThrow('ReferenceError: Must call super constructor in derived class before accessing \'this\' or returning from derived constructor');
    });

    it('should not throw an error if this is in a function passed to super as argument', () => {
      const TestClass = clazz((_super, svc) => {
        function TestClass() {
          svc.init();
          _super.apply(this, () => svc.checkThis(this));
          svc.close();
        }

        doExtend(TestClass, _super);
        return TestClass;
      })();
      expect(() => {
        new TestClass();
      }).not.toThrow();
    });

    it('should throw an error if the super function is not called', () => {
      const TestClass = clazz((_super, svc) => {
        function TestClass() {
          svc.init();
          svc.close();
        }

        doExtend(TestClass, _super);
        return TestClass;
      })();
      expect(() => {
        new TestClass();
      }).toThrow('ReferenceError: Must call super constructor in derived class before accessing \'this\' or returning from derived constructor');
    });

    it('should not throw an error if the super function is called', () => {
      const TestClass = clazz((_super, svc) => {
        function TestClass() {
          svc.init();
          _super.apply(this);
          svc.close();
        }

        doExtend(TestClass, _super);
        return TestClass;
      })();
      expect(() => {
        new TestClass();
      }).not.toThrow();
    });
  });
});
