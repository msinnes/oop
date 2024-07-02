import '../toBeAClass';

describe('toBeAClass', () => {
  it('should test if an input is a class', () => {
    expect(class MyClass {}).toBeAClass();
    expect(function NotAClass() {}).not.toBeAClass();
  });
});
