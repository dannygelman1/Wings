import { MathUtils, Vector3 } from "three";
import { Bird as BirdType } from "../components/types";
import { BirdAction } from "../components/types";

export class Bird {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  bias: number;
  id: number;
  action: BirdAction;
  perchDur: number; // random perch duration
  perchedAt: number; // time stamp that bird perched
  perchLoc: number[]; // determines which perch
  flapOffset: number;
  constructor({
    x,
    y,
    z,
    vx,
    vy,
    vz,
    bias,
    id,
    action,
    perchDur,
    perchedAt,
    perchLoc,
    flapOffset,
  }: BirdType) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.bias = bias;
    this.id = id;
    this.action = action;
    this.perchDur = perchDur;
    this.perchedAt = perchedAt;
    this.perchLoc = perchLoc;
    this.flapOffset = flapOffset;
  }

  incremXYZ(x: number, y: number, z: number): void {
    this.x += x;
    this.y += y;
    this.z += z;
  }

  incremVXYZ(vx: number, vy: number, vz: number): void {
    this.vx += vx;
    this.vy += vy;
    this.vz += vz;
  }

  incremVX(vx: number): void {
    this.vx += vx;
  }

  incremVY(vy: number): void {
    this.vy += vy;
  }

  incremVZ(vz: number): void {
    this.vz += vz;
  }

  setVX(vx: number): void {
    this.vx = vx;
  }

  setVY(vy: number): void {
    this.vy = vy;
  }

  setVZ(vz: number): void {
    this.vz = vz;
  }

  incremX(x: number): void {
    this.x += x;
  }

  incremY(y: number): void {
    this.y += y;
  }

  incremZ(z: number): void {
    this.z += z;
  }

  setXYZ(x: number, y: number, z: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  setVXYZ(vx: number, vy: number, vz: number): void {
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
  }

  willPerch(): boolean {
    return MathUtils.randInt(0, 50) === 8;
  }

  move(): void {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
  }

  setBias(bias: number): void {
    this.bias = bias;
  }

  setAction(action: BirdAction): void {
    this.action = action;
  }

  setPerchedAt(perchedAt: number): void {
    this.perchedAt = perchedAt;
  }

  getSpeed(): number {
    return (this.vx ** 2 + this.vy ** 2 + this.vz ** 2) ** 0.5;
  }

  getDistToPerch(): number {
    const currentBirdPos = new Vector3(this.x, this.y, this.z);
    const pointOnPerch = new Vector3(
      this.perchLoc[0],
      this.perchLoc[1],
      this.perchLoc[2]
    );
    const dist = currentBirdPos.distanceTo(pointOnPerch);
    return dist;
  }
}
