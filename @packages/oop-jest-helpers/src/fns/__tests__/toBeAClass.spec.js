import { abstract } from '@msinnes/oop';
import '../toBeAClass';

describe('toBeAClass', () => {
  it('should test if an input is a class', () => {
    expect(class MyClass {}).toBeAClass();
    expect(abstract(class {})).toBeAClass();
    expect(function NotAClass() {}).not.toBeAClass();
    expect(undefined).not.toBeAClass();
  });

  it('should have the correct message on failure', () => {
    expect(() => {
      expect(function() {}).toBeAClass();
    }).toThrow('expected input to be a class');
  });
});
