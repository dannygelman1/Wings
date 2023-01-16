import { Vector } from "../models/Vector";

export type BoidConstants = {
  turnfactor: number;
  visualRange: number;
  protectedRange: number;
  centering: number;
  avoid: number;
  matching: number;
  turnFactor: number;
  maxSpeed: number;
  minSpeed: number;
  maxBias: number;
  biasIncrm: number;
};

export enum BirdAction {
  "FLYING",
  "PERCHED",
}

export type Bird = {
  pos: Vector;
  vel: Vector;
  bias: number;
  id: number;
  action: BirdAction;
  perchDur: number; // random perch duration
  perchedAt: number; // time stamp that bird perched
  perchLoc: number[]; // determines which perch
  flapOffset: number;
};

export type Wire = {
  ax: number;
  ay: number;
  xRadius: number;
  yRadius: number;
  rotation: number;
  numParallel: number;
  spacing: number;
  zTranslate: number;
};
