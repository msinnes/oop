import { abstractSetter } from '@msinnes/oop';

import '../toHaveAbstractSetter';

describe('toHaveAbstractSetter', () => {
  it('should test if an input has an abstract setter', () => {
    expect(class AbstractSetterClass {
      constructor() {
        abstractSetter(this, 'setter');
      }
    }).toHaveAbstractSetter();
    expect(class MyClass {}).not.toHaveAbstractSetter();
  });

  it('should test if an input has a specific abstract setter', () => {
    expect(class AbstractSetterClass {
      constructor() {
        abstractSetter(this, 'setter');
      }
    }).toHaveAbstractSetter('setter');
    expect(class AbstractSetterClass {
      constructor() {
        abstractSetter(this, 'setter');
      }
    }).not.toHaveAbstractSetter('anotherSetter');
  });
});
