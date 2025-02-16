import {
  abstract,
  abstractGetter,
  abstractMethod,
  abstractProperty,
  abstractSetter,
} from'../abstract';

describe('abstract', () => {
  let AbstractClass;

  beforeEach(() => {
    AbstractClass = abstract(class {});
  });

  it('should be a function', () => {
    expect(abstract).toBeInstanceOf(Function);
  });

  it('should be a class', () => {
    expect(() => {
      AbstractClass();
    }).toThrow('Cannot call a class as a function');
  });

  it('should not be instantiable', () => {
    expect(() => {
      new AbstractClass();
    }).toThrow('Abstract classes cannot be instantiated');
  });

  it('should be instantiable if the class has been extended', () => {
    class NewClass extends AbstractClass {}
    let instance;
    expect(() => {
      instance = new NewClass();
    }).not.toThrow();
    expect(instance).toBeInstanceOf(AbstractClass);
  });

  it('should bass arguments via the constructor', () => {
    const BaseClass = abstract(class {
      constructor(param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
      }
    });
    class TestClass extends BaseClass {}
    const instance = new TestClass('arg1', 'arg2');
    expect(instance.param1).toEqual('arg1');
    expect(instance.param2).toEqual('arg2');
  });
});

describe('abstractGetter', () => {
  it('should be a function', () => {
    expect(abstractGetter).toBeInstanceOf(Function);
  });

  it('should throw an error if an instance is missing the getter', () => {
    class SomeClass {
      constructor() {
        abstractGetter(this, 'prop');
      }
    }

    function HasProp() {
      SomeClass.apply(this);
    }
    HasProp.prototype = Object.create(SomeClass.prototype);
    HasProp.prototype.constructor = HasProp;
    Object.defineProperties(HasProp.prototype, {
      prop: { get: () => {} },
    });

    function NoProp() {
      SomeClass.apply(this);
    }
    NoProp.prototype = Object.create(SomeClass.prototype);
    NoProp.prototype.constructor = NoProp;
    Object.defineProperties(NoProp.prototype, {
      prop: { set: () => {} },
    });

    expect(() => {
      new HasProp();
    }).not.toThrow();
    expect(() => {
      new NoProp();
    }).toThrow('prop is an abstract getter and must be on the class prototype');
  });

  it('should throw the error if used in a babel class because babel does not put class getters on prototype', () => {
    class SomeClass {
      constructor() {
        abstractGetter(this, 'prop');
      }
    }

    class HasProp extends SomeClass {
      get prop () {
        return 'value';
      }
    }
    expect(() => {
      new HasProp();
    }).not.toThrow();
    expect(() => {
      new SomeClass();
    }).toThrow('prop is an abstract getter and must be on the class prototype');
  });
});

describe('abstractMethod', () => {
  it('should be a function', () => {
    expect(abstractMethod).toBeInstanceOf(Function);
  });

  it('should throw an error if an instance is missing the input method', () => {
    class SomeClass {
      constructor() {
        abstractMethod(this, 'method');
      }
    }

    class HasMethod extends SomeClass {
      method() {}
    }
    expect(() => {
      new HasMethod();
    }).not.toThrow();
    expect(() => {
      new SomeClass();
    }).toThrow('method is an abstract method and must be on the class prototype');
  });

  it('should throw the same error if the named prop is not a function', () => {
    class SomeClass {
      method = {};

      constructor() {
        abstractMethod(this, 'method');
      }
    }
    expect(() => {
      new SomeClass();
    }).toThrow('method is an abstract method and must be on the class prototype');
  });
});

describe('abstractProperty', () => {
  it('should be a function', () => {
    expect(abstractProperty).toBeInstanceOf(Function);
  });

  it('should throw an error if an instance is missing the input method', () => {
    class SomeClass {
      constructor() {
        abstractProperty(this, 'prop');
      }
    }

    function HasProp() {
      SomeClass.apply(this);
    }
    HasProp.prototype = Object.create(SomeClass.prototype);
    HasProp.prototype.constructor = HasProp;
    HasProp.prototype.prop = 'value';
    expect(() => {
      new HasProp();
    }).not.toThrow();
    expect(() => {
      new SomeClass();
    }).toThrow('prop is an abstract property and cannot be undefined or null');
  });

  it('should throw an error if an instance sets the abstract value to null', () => {
    class SomeClass {
      constructor() {
        abstractProperty(this, 'prop');
      }
    }

    function HasProp() {
      SomeClass.apply(this);
    }
    HasProp.prototype = Object.create(SomeClass.prototype);
    HasProp.prototype.constructor = HasProp;
    HasProp.prototype.prop = null;

    expect(() => {
      new HasProp();
    }).toThrow('prop is an abstract property and cannot be undefined or null');
    expect(() => {
      new SomeClass();
    }).toThrow('prop is an abstract property and cannot be undefined or null');
  });

  it('should throw the error if used in a babel class because babel does not put class properties on prototype', () => {
    class SomeClass {
      constructor() {
        abstractProperty(this, 'prop');
      }
    }

    class HasProp extends SomeClass {
      prop = 'value';
    }
    expect(() => {
      new HasProp();
    }).toThrow('prop is an abstract property and cannot be undefined or null');
    expect(() => {
      new SomeClass();
    }).toThrow('prop is an abstract property and cannot be undefined or null');
  });
});

describe('abstractSetter', () => {
  it('should be a function', () => {
    expect(abstractSetter).toBeInstanceOf(Function);
  });

  it('should throw an error if an instance is missing the setter', () => {
    class SomeClass {
      constructor() {
        abstractSetter(this, 'prop');
      }
    }

    function HasProp() {
      SomeClass.apply(this);
    }
    HasProp.prototype = Object.create(SomeClass.prototype);
    HasProp.prototype.constructor = HasProp;
    Object.defineProperties(HasProp.prototype, {
      prop: { set: () => {} },
    });

    function NoProp() {
      SomeClass.apply(this);
    }
    NoProp.prototype = Object.create(SomeClass.prototype);
    NoProp.prototype.constructor = NoProp;
    Object.defineProperties(NoProp.prototype, {
      prop: { get: () => {} },
    });

    expect(() => {
      new HasProp();
    }).not.toThrow();
    expect(() => {
      new NoProp();
    }).toThrow('prop is an abstract setter and must be on the class prototype');
  });

  it('should throw the error if used in a babel class because babel does not put class getters on prototype', () => {
    class SomeClass {
      constructor() {
        abstractSetter(this, 'prop');
      }
    }

    class HasProp extends SomeClass {
      val = 'value';
      set prop (value) {
        this.val = value;
      }
    }
    expect(() => {
      new HasProp();
    }).not.toThrow();
    expect(() => {
      new SomeClass();
    }).toThrow('prop is an abstract setter and must be on the class prototype');
  });
});
