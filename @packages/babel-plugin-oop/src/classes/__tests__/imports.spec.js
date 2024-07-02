import { Imports } from '../imports';

describe('Imports', () => {
  it('should be a class', () => {
    expect(Imports).toBeInstanceOf(Function);
  });

  it('should expose a static instance', () => {
    expect(Imports.imports).toBeInstanceOf(Imports);
  });

  describe('instance', () => {
    let instance;
    beforeEach(() => {
      instance = new Imports();
    });

    it('should have a length prop', () => {
      expect(instance.length).toEqual(0);
    });

    describe('getImports', () => {
      it('should be a function', () => {
        expect(instance.getImports).toBeInstanceOf(Function);
      });

      it('should return the list of imports', () => {
        const imports = instance.getImports();
        expect(imports).toBeInstanceOf(Array);
        expect(imports.length).toEqual(0);
      });
    });

    describe('add', () => {
      it('should be a function', () => {
        expect(instance.add).toBeInstanceOf(Function);
      });

      it('should add imports to the instance', () => {
        instance.add('one');
        instance.add('two', 'three');
        expect(instance.getImports()).toMatchObject(['one', 'two', 'three']);
        expect(instance.length).toEqual(3);
      });

      it('should not add duplicate imports to the instance', () => {
        instance.add('one');
        instance.add('one', 'two', 'three');
        instance.add('one', 'two', 'three', 'four');
        expect(instance.getImports()).toMatchObject(['one', 'two', 'three', 'four']);
        expect(instance.length).toEqual(4);
      });
    });
  });
});
