import { Character } from '../Character';
import { Hero } from '../Hero';

import '@msinnes/oop-jest-helpers';

describe('Hero', () => {
  it('should be a class', () => {
    expect(Hero).toBeAClass();
  });

  it('should extend Character', () => {
    expect(Hero).toExtend(Character);
  });

  describe('instance', () => {
    let instance;

    beforeEach(() => {
      instance = new Hero('Hero Man', 'Secret Guy');
    });

    it('should have a boolean prop isHero set to true', () => {
      expect(instance.isHero).toBe(true);
    });

    it('should have a name getter', () => {
      expect(instance.name).toBe('Secret Guy');
    });

    it('should have a disguised setter', () => {
      instance.disguised = false;
      expect(instance.name).toBe('Hero Man');
    });

    describe('declare', () => {
      it('should be a function', () => {
        expect(instance.declare).toBeInstanceOf(Function);
      });

      it('should say that he stands with the heroes', () => {
        expect(instance.declare()).toEqual('I stand with the heroes!!');
      });
    });
  });
});