import { Vector, Vec2D, Vec3D } from "..";

import '@msinnes/oop-jest-helpers';

describe('Vector', () => {
  it('should be an abstract class', () => {
    expect(Vector).toBeAbstract();
  });
});

describe('Vec2D', () => {
  it('should be a class', () => {
    expect(Vec2D).toBeAClass();
  });

  it('should extend Vector', () => {
    expect(Vec2D).toExtend(Vector);
  });

  describe('instance', () => {
    let instance;
    beforeEach(() => {
      instance = new Vec2D(7, 4);
    });

    describe('plus', () => {
      it('should be a function', () => {
        expect(instance.plus).toBeInstanceOf(Function);
      });

      it('should sum two vectors', () => {
        const vec = new Vec2D(2, 3);
        const sum = instance.plus(vec);
        expect(sum).toBeInstanceOf(Vec2D);
        expect(sum.v).toMatchObject([9, 7]);
      });
    });
  });
});

describe('Vec3D', () => {
  it('should be a class', () => {
    expect(Vec3D).toBeAClass();
  });

  it('should extend Vector', () => {
    expect(Vec3D).toExtend(Vector);
  });
});