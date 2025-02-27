import '../toExtend';

describe('toExtend', () => {
  it('should test if an input extends a class', () => {
    class BaseClass {}
    class ChildClass extends BaseClass {}
    class DoesNotExtendBaseClass {}
    expect(ChildClass).toExtend(BaseClass);
    expect(DoesNotExtendBaseClass).not.toExtend(BaseClass);
  });

  it('should have the correct message on failure', () => {
    expect(() => {
      expect(function() {}).toExtend(undefined);
    }).toThrow('input should extend the expected class');
  });
});
