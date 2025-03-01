abstract class Vector {
  v: Array<number>;
  abstract dimensions: number;

  constructor(...values: Array<number>) {
    this.v = [...values];
  }

  difference(vec): Array<number> {
    return this.v.map((v, i) => v - vec.v[i]);
  }

  sum(vec): Array<number> {
    return this.v.map((v, i) => v + vec.v[i]);
  }
}

class Vec2D extends Vector {
  dimensions = 2;

  minus(vec): Vec2D {
    const v = this.difference(vec);
    return new Vec2D(...v);
  }

  plus(vec): Vec2D {
    const v = this.sum(vec);
    return new Vec2D(...v);
  }
}

class Vec3D extends Vector {
  dimensions = 3;

  minus(vec): Vec3D {
    const v = this.difference(vec);
    return new Vec3D(...v);
  }

  plus(vec): Vec3D {
    const v = this.sum(vec);
    return new Vec3D(...v);
  }
}

export { Vector, Vec2D, Vec3D };