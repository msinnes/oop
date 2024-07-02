import { abstractProperty } from '@msinnes/oop';

import '../toHaveAbstractProperty';

describe('toHaveAbstractProperty', () => {
  it('should test if an input has an abstract property', () => {
    expect(class AbstractPropertyClass {
      constructor() {
        abstractProperty(this, 'property');
      }
    }).toHaveAbstractProperty();
    expect(class MyClass {}).not.toHaveAbstractProperty();
  });

  it('should test if an input has a specific abstract property', () => {
    expect(class AbstractPropertyClass {
      constructor() {
        abstractProperty(this, 'property');
      }
    }).toHaveAbstractProperty('property');
    expect(class AbstractPropertyClass {
      constructor() {
        abstractProperty(this, 'property');
      }
    }).not.toHaveAbstractProperty('anotherProperty');
  });
});
