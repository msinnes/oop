import { abstractGetter } from '@msinnes/oop';

import '../toHaveAbstractGetter';

describe('toHaveAbstractGetter', () => {
  it('should test if an input has an abstract getter', () => {
    expect(class AbstractGetterClass {
      constructor() {
        abstractGetter(this, 'getter');
      }
    }).toHaveAbstractGetter();
    expect(class MyClass {}).not.toHaveAbstractGetter();
  });

  it('should test if an input has a specific abstract getter', () => {
    expect(class AbstractGetterClass {
      constructor() {
        abstractGetter(this, 'getter');
      }
    }).toHaveAbstractGetter('getter');
    expect(class AbstractGetterClass {
      constructor() {
        abstractGetter(this, 'getter');
      }
    }).not.toHaveAbstractGetter('anotherGetter');
  });
});
