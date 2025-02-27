abstract class Vector {
  v: Array<number>;
  abstract dimensions: number;

  constructor(...values: Array<number>) {
    this.v = [...values];
  }
}

class Vec2D extends Vector {
  dimensions = 2;

  plus(vec): Vec2D {
    const v = this.v.map((v, i) => {
      return v + vec.v[i]
    });
    return new Vec2D(...v);
  }
}

class Vec3D extends Vector {
  dimensions = 3;
}

export { Vector, Vec2D, Vec3D };