import floor from "lodash-es/floor";
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
  perchProb: number | undefined;
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

  move(delta: number): void {
    this.x += this.vx * delta * 0.08;
    this.y += this.vy * delta * 0.08;
    this.z += this.vz * delta * 0.08;
  }

  setWillPerch(randomNum: number): void {
    if (!this.perchProb) {
      this.perchProb = randomNum;
    }
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
    return (this.vx ** 2 + this.vy ** 2 + this.vz ** 2) ** 0.5;
  }

  getGrid(maxRange: number): number[] {
    return [
      floor(this.x / maxRange) * maxRange,
      floor(this.y / maxRange) * maxRange,
      floor(this.z / maxRange) * maxRange,
    ];
  }

  getNeighbors(maxRange: number): string[] {
    const birdGrid = this.getGrid(maxRange);
    const x = this.x;
    const y = this.y;
    const z = this.z;
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

  // move = (
  //   birds: Bird[],
  //   birdMap: Map<string, Bird[]>,
  //   neighbords: string[],
  //   bird: Bird,
  //   bounds: number[],
  //   height: number,
  //   boidConsts: BoidConstants,
  //   time: number
  // ): Bird => {
  //   const currentBirdPos = new Vector3(bird.x, bird.y, bird.z);
  //   let xPos = 0;
  //   let yPos = 0;
  //   let zPos = 0;
  //   let xVel = 0;
  //   let yVel = 0;
  //   let zVel = 0;
  //   let closeX = 0;
  //   let closeY = 0;
  //   let closeZ = 0;
  //   let neighbors = 0;

  //   for (const neighbor of neighbords) {
  //     if (!new Set(Array.from(birdMap.keys())).has(neighbor)) continue;
  //     for (const nbirds of birdMap.get(neighbor) || []) {
  //       if (nbirds.id !== bird.id) {
  //         const nBirdPos = new Vector3(nbirds.x, nbirds.y, nbirds.z);
  //         if (currentBirdPos.distanceTo(nBirdPos) < boidConsts.visualRange) {
  //           xPos += nbirds.x;
  //           yPos += nbirds.y;
  //           zPos += nbirds.z;
  //           xVel += nbirds.vx;
  //           yVel += nbirds.vy;
  //           zVel += nbirds.vz;
  //           neighbors += 1;
  //         }
  //         if (currentBirdPos.distanceTo(nBirdPos) < boidConsts.protectedRange) {
  //           closeX += currentBirdPos.x - nBirdPos.x;
  //           closeY += currentBirdPos.y - nBirdPos.y;
  //           closeZ += currentBirdPos.z - nBirdPos.z;
  //         }
  //       }
  //     }
  //   }
  //   if (neighbors > 0) {
  //     bird.incremVXYZ(
  //       (xPos / neighbors - bird.x) * boidConsts.centeringFactor +
  //         (xVel / neighbors - bird.vx) * boidConsts.matchingFactor,
  //       (yPos / neighbors - bird.y) * boidConsts.centeringFactor +
  //         (yVel / neighbors - bird.vy) * boidConsts.matchingFactor,
  //       (zPos / neighbors - bird.z) * boidConsts.centeringFactor +
  //         (zVel / neighbors - bird.vz) * boidConsts.matchingFactor
  //     );
  //   }
  //   bird.incremVXYZ(
  //     closeX * boidConsts.avoidFactor,
  //     closeY * boidConsts.avoidFactor,
  //     closeZ * boidConsts.avoidFactor
  //   );

  //   const right = bounds[0] / 2;
  //   const left = (-1 * bounds[0]) / 2;
  //   const up = bounds[1] / 2 + height;
  //   const down = (-1 * bounds[1]) / 2 + height;
  //   const front = bounds[2] / 2;
  //   const back = (-1 * bounds[2]) / 2;
  //   if (bird.x > right) bird.incremVX(-1 * boidConsts.turnFactor);
  //   if (bird.x < left) bird.incremVX(boidConsts.turnFactor);
  //   if (bird.y > up) bird.incremVY(-1 * boidConsts.turnFactor);
  //   if (bird.y < down) bird.incremVY(boidConsts.turnFactor);
  //   if (bird.z > front) bird.incremVZ(-1 * boidConsts.turnFactor);
  //   if (bird.z < back) bird.incremVZ(boidConsts.turnFactor);

  //   if (inBiasGroup1(bird.id, birds.length)) {
  //     if (bird.vx > 0)
  //       bird.setBias(
  //         Math.min(boidConsts.maxBias, bird.bias + boidConsts.biasIncrm)
  //       );
  //     else
  //       bird.setBias(
  //         Math.max(boidConsts.biasIncrm, bird.bias - boidConsts.biasIncrm)
  //       );
  //   }
  //   if (inBiasGroup2(bird.id, birds.length)) {
  //     if (bird.vx < 0)
  //       bird.setBias(
  //         Math.min(boidConsts.maxBias, bird.bias + boidConsts.biasIncrm)
  //       );
  //     else
  //       bird.setBias(
  //         Math.max(boidConsts.biasIncrm, bird.bias - boidConsts.biasIncrm)
  //       );
  //   }

  //   if (inBiasGroup1(bird.id, birds.length)) {
  //     bird.setVX((1 - bird.bias) * bird.vx + bird.bias);
  //   }
  //   if (inBiasGroup2(bird.id, birds.length)) {
  //     bird.setVX((1 - bird.bias) * bird.vx - bird.bias);
  //   }

  //   const speed = bird.getSpeed();
  //   if (speed < boidConsts.minSpeed) {
  //     bird.setVX((bird.vx / speed) * boidConsts.minSpeed);
  //     bird.setVY((bird.vy / speed) * boidConsts.minSpeed);
  //     bird.setVZ((bird.vz / speed) * boidConsts.minSpeed);
  //   }
  //   if (speed > boidConsts.maxSpeed) {
  //     bird.setVX((bird.vx / speed) * boidConsts.maxSpeed);
  //     bird.setVY((bird.vy / speed) * boidConsts.maxSpeed);
  //     bird.setVZ((bird.vz / speed) * boidConsts.maxSpeed);
  //   }

  //   if (bird.perchedAt + bird.perchDur + 10 < time) {
  //     bird.setPerchedAt(0);
  //   }
  //   bird.setAction(BirdAction.FLYING);
  //   bird.move();

  //   return bird;
  // };
}
