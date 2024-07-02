import { abstractMethod } from '@msinnes/oop';

import '../toHaveAbstractMethod';

describe('toHaveAbstractMethod', () => {
  it('should test if an input has an abstract method', () => {
    expect(class AbstractMethodClass {
      constructor() {
        abstractMethod(this, 'method');
      }
    }).toHaveAbstractMethod();
    expect(class MyClass {}).not.toHaveAbstractMethod();
  });

  it('should test if an input has a specific abstract method', () => {
    expect(class AbstractMethodClass {
      constructor() {
        abstractMethod(this, 'method');
      }
    }).toHaveAbstractMethod('method');
    expect(class AbstractMethodClass {
      constructor() {
        abstractMethod(this, 'method');
      }
    }).not.toHaveAbstractMethod('anotherMethod');
  });
});
