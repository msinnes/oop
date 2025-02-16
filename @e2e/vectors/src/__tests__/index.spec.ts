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
});

describe('Vec3D', () => {
  it('should be a class', () => {
    expect(Vec3D).toBeAClass();
  });

  it('should extend Vector', () => {
    expect(Vec3D).toExtend(Vector);
  });
});