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
  perchLoc: number; // determines which perch
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
  }

  incremXYZ(x: number, y: number, z: number) {
    this.x += x;
    this.y += y;
    this.z += z;
  }

  incremVXYZ(vx: number, vy: number, vz: number) {
    this.vx += vx;
    this.vy += vy;
    this.vz += vz;
  }

  incremVX(vx: number) {
    this.vx += vx;
  }

  incremVY(vy: number) {
    this.vy += vy;
  }

  incremVZ(vz: number) {
    this.vz += vz;
  }

  setVX(vx: number) {
    this.vx = vx;
  }

  setVY(vy: number) {
    this.vy = vy;
  }

  setVZ(vz: number) {
    this.vz = vz;
  }

  setXYZ(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  setVXYZ(vx: number, vy: number, vz: number) {
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
  }

  setBias(bias: number) {
    this.bias = bias;
  }

  setAction(action: BirdAction) {
    this.action = action;
  }

  setPerchedAt(perchedAt: number) {
    this.perchedAt = perchedAt;
  }

  setPerchLoc(perchLoc: number) {
    this.perchLoc = perchLoc;
  }

  getSpeed() {
    return (this.vx ** 2 + this.vy ** 2 + this.vz ** 2) ** 0.5;
  }
}
