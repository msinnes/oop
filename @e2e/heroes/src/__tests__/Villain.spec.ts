import { Character } from '../Character';
import { Villain } from '../Villain';

import '@msinnes/oop-jest-helpers';

describe('Villain', () => {
  it('should be a class', () => {
    expect(Villain).toBeAClass();
  });

  it('should extend Character', () => {
    expect(Villain).toExtend(Character);
  });

  describe('instance', () => {
    let instance;

    beforeEach(() => {
      instance = new Villain();
    });

    it('should have a boolean prop isVillain set to true', () => {
      expect(instance.isVillain).toBe(true);
    });

    it('should have a name getter', () => {
      expect(instance.name).toBe('I am a supervillain');
    });

    it('should have a disguised setter that throws an error if set to true', () => {
      expect(() => instance.disguised = true).toThrow('I am a villain and will never disguise myself');
      expect(() => instance.disguised = false).not.toThrow();
    });

    describe('declare', () => {
      it('should be a function', () => {
        expect(instance.declare).toBeInstanceOf(Function);
      });

      it('should say that he stands with the villains', () => {
        expect(instance.declare()).toEqual('I stand with the villains!!');
      });
    });
  });
});