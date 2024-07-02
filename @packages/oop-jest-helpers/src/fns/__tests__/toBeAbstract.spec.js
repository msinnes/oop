import { abstract, abstractGetter, abstractMethod, abstractProperty, abstractSetter } from '@msinnes/oop';

import '../toBeAbstract';

describe('toBeAbstract', () => {
  it('should test if an input is an abstract class', () => {
    expect(abstract(class AbstractClass {})).toBeAbstract();
    expect(class AbstractGetterClass {
      constructor() {
        abstractGetter(this, 'property');
      }
    }).toBeAbstract();
    expect(class AbstractMethodClass {
      constructor() {
        abstractMethod(this, 'method');
      }
    }).toBeAbstract();
    expect(class AbstractPropertyClass {
      constructor() {
        abstractProperty(this, 'property');
      }
    }).toBeAbstract();
    expect(class AbstractSetterClass {
      constructor() {
        abstractSetter(this, 'property');
      }
    }).toBeAbstract();

    expect(class MyClass {}).not.toBeAbstract();
  });
});
