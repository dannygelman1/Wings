export class Vector {
  x: number;
  y: number;
  z: number;
  w?: number;

  constructor(vec: { x: number; y: number; z: number; w?: number }) {
    this.x = vec.x;
    this.y = vec.y;
    this.z = vec.z;
    this.w = vec.w;
  }

  add(vec: Vector) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
  }

  addX(x: number) {
    this.x += x;
  }

  addY(y: number) {
    this.y += y;
  }

  addZ(z: number) {
    this.z += z;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  setZ(z: number) {
    this.z = z;
  }

  diff(vec: Vector): Vector {
    return new Vector({
      x: this.x - vec.x,
      y: this.y - vec.y,
      z: this.z - vec.z,
    });
  }

  sum(vec: Vector): Vector {
    return new Vector({
      x: this.x + vec.x,
      y: this.y + vec.y,
      z: this.z + vec.z,
    });
  }

  div(num: number): Vector {
    return new Vector({
      x: this.x / num,
      y: this.y / num,
      z: this.z / num,
    });
  }

  prod(num: number): Vector {
    return new Vector({
      x: this.x * num,
      y: this.y * num,
      z: this.z * num,
    });
  }

  distanceTo(vec: Vector): number {
    return (
      ((vec.x - this.x) ** 2 + (vec.y - this.y) ** 2 + (vec.z - this.z) ** 2) **
      0.5
    );
  }
}
