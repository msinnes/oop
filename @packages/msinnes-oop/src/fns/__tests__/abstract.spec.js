import { abstract } from'../abstract';

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
    class TestClass extends BaseClass {};
    const instance = new TestClass('arg1', 'arg2');
    expect(instance.param1).toEqual('arg1');
    expect(instance.param2).toEqual('arg2');
  });
});
