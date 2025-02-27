import { Character } from '../Character';

import '@msinnes/oop-jest-helpers';

describe('Character', () => {
  it('should be an abstract class', () => {
    expect(Character).toBeAbstract();
  });

  describe('instance', () => {
    class TestableCharacter extends Character {
      declare() {}

      get name() { return ''; }
      set disguised(value) {}
    }

    let instance;
    beforeEach(() => {
      instance = new TestableCharacter();
    });

    it('should have a boolean prop isHero set to false', () => {
      expect(instance.isHero).toBe(false);
    });

    it('should have a boolean prop isVillain set to false', () => {
      expect(instance.isVillain).toBe(false);
    });
  });
});