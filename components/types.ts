export type BoidConstants = {
  turnfactor: number;
  visualRange: number;
  protectedRange: number;
  centeringFactor: number;
  avoidFactor: number;
  matchingFactor: number;
  turnFactor: number;
  maxSpeed: number;
  minSpeed: number;
  maxBias: number;
  biasIncrm: number;
};

export enum BirdAction {
  "FLYING",
  "PERCHING",
  "PERCHED",
}

export type Bird = {
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
};
