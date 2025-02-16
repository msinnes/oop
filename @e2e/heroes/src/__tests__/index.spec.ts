import { Character, Hero, Villain } from "..";

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
      instance = new Hero('HeroMan', 'Secret Guy');
    });

    it('should have a boolean prop isHero set to true', () => {
      expect(instance.isHero).toBe(true);
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