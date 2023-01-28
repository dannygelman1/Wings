import floor from "lodash-es/floor";
import { Bird as BirdType } from "../components/types";
import { BirdAction } from "../components/types";
import { Vector } from "./Vector";

export class Bird {
  pos: Vector;
  vel: Vector;
  bias: number;
  id: number;
  action: BirdAction;
  perchDur: number; // random perch duration
  perchedAt: number; // time stamp that bird perched
  perchLoc: Vector; // determines which perch
  flapOffset: number;
  perchProb: number | undefined;
  constructor({
    pos,
    vel,
    bias,
    id,
    action,
    perchDur,
    perchedAt,
    perchLoc,
    flapOffset,
  }: BirdType) {
    this.pos = pos;
    this.vel = vel;
    this.bias = bias;
    this.id = id;
    this.action = action;
    this.perchDur = perchDur;
    this.perchedAt = perchedAt;
    this.perchLoc = perchLoc;
    this.flapOffset = flapOffset;
  }

  incremXYZ(x: number, y: number, z: number): void {
    this.pos.add(new Vector({ x, y, z }));
  }

  incremVXYZ(vec: Vector): void {
    this.vel.add(vec);
  }

  incremVX(vx: number): void {
    this.vel.addX(vx);
  }

  incremVY(vy: number): void {
    this.vel.addY(vy);
  }

  incremVZ(vz: number): void {
    this.vel.addZ(vz);
  }

  setVX(vx: number): void {
    this.vel.setX(vx);
  }

  setVY(vy: number): void {
    this.vel.setY(vy);
  }

  setVZ(vz: number): void {
    this.vel.setZ(vz);
  }

  incremX(x: number): void {
    this.pos.addX(x);
  }

  incremY(y: number): void {
    this.pos.addY(y);
  }

  incremZ(z: number): void {
    this.pos.addZ(z);
  }

  setXYZ(pos: Vector): void {
    this.pos = new Vector({ x: pos.x, y: pos.y, z: pos.z });
  }

  setVXYZ(vel: Vector): void {
    this.vel = new Vector({ x: vel.x, y: vel.y, z: vel.z });
  }

  move(delta: number): void {
    this.pos.add(this.vel.prod(delta * 0.08));
  }

  setWillPerch(randomNum: number): void {
    if (!this.perchProb) {
      this.perchProb = randomNum;
    }
  }

  setPerchLoc(vec: Vector) {
    this.perchLoc = vec;
  }

  unsetWillPerch() {
    this.perchProb = undefined;
  }

  willPerch(): boolean {
    if (!this.perchProb) return false;
    return this.perchProb < 8;
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
    return (this.vel.x ** 2 + this.vel.y ** 2 + this.vel.z ** 2) ** 0.5;
  }

  getGrid(maxRange: number): number[] {
    return [
      floor(this.pos.x / maxRange) * maxRange,
      floor(this.pos.y / maxRange) * maxRange,
      floor(this.pos.z / maxRange) * maxRange,
    ];
  }

  getNeighbors(maxRange: number): string[] {
    const birdGrid = this.getGrid(maxRange);
    const x = this.pos.x;
    const y = this.pos.y;
    const z = this.pos.z;
    const midX = birdGrid[0] + maxRange / 2;
    const midY = birdGrid[1] + maxRange / 2;
    const midZ = birdGrid[2] + maxRange / 2;
    const listNeighbords = [];
    let newX;
    let newY;
    let newZ;
    if (x < midX) {
      newX = birdGrid[0] - maxRange;
    } else {
      newX = birdGrid[0] + maxRange;
    }
    if (y < midY) {
      newY = birdGrid[1] - maxRange;
    } else {
      newY = birdGrid[1] + maxRange;
    }
    if (z < midZ) {
      newZ = birdGrid[2] - maxRange;
    } else {
      newZ = birdGrid[2] + maxRange;
    }
    listNeighbords.push(JSON.stringify([birdGrid[0], newY, birdGrid[2]]));
    listNeighbords.push(JSON.stringify([birdGrid[0], newY, newZ]));
    listNeighbords.push(
      JSON.stringify([birdGrid[0], birdGrid[1], birdGrid[2]])
    );
    listNeighbords.push(JSON.stringify([birdGrid[0], birdGrid[1], newZ]));
    listNeighbords.push(JSON.stringify([newX, newY, birdGrid[2]]));
    listNeighbords.push(JSON.stringify([newX, newY, newZ]));
    listNeighbords.push(JSON.stringify([newX, birdGrid[1], birdGrid[2]]));
    listNeighbords.push(JSON.stringify([newX, birdGrid[1], newZ]));

    return listNeighbords;
  }

  inBiasGroup1(length: number): boolean {
    return this.id < length / 5;
  }
  inBiasGroup2(length: number): boolean {
    return this.id > length / 5 && this.id < (2 * length) / 5;
  }

  wingAnimation(time: number, wing: number): number {
    return wing * Math.sin((time * 7 + Math.PI / 2) * 2 + this.flapOffset);
  }

  lookAt(delta: number): Vector {
    return this.pos.sum(this.vel.prod(delta * 0.08));
  }

  perchPos(): Vector {
    return new Vector({
      x: this.perchLoc.x,
      y: this.perchLoc.y - 1,
      z: this.perchLoc.z,
    });
  }

  perchRotation(): number {
    if (this.perchLoc.w !== 0) {
      if (floor(this.perchDur) % 2 === 0) return Math.PI / 2;
      else return -Math.PI / 2;
    } else {
      if (floor(this.perchDur) % 2 === 0) return 0;
      else return Math.PI;
    }
  }
}
