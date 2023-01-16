import { Euler, Vector3 } from "three";
import { EllipseCurve } from "three/src/extras/curves/EllipseCurve";
import { Wire } from "./types";

export const ellipsePoints = (i: number, wire: Wire) => {
  return new EllipseCurve(
    wire.ax,
    wire.ay,
    wire.xRadius,
    wire.yRadius,
    Math.PI + Math.PI / 8,
    0 - Math.PI / 8,
    false,
    0
  )
    .getPoints(50)
    .map((point) =>
      new Vector3(point.x, point.y, getZ(i, wire)).applyEuler(
        new Euler(0, wire.rotation, 0)
      )
    );
};

const getZ = (i: number, wire: Wire): number => {
  //first wire
  if (i === 0) return wire.zTranslate;
  //second wire
  if (i === 1) {
    if (wire.spacing % 2 === 0) return wire.zTranslate + wire.spacing;
    else return wire.zTranslate + wire.spacing / 2;
    //third wire
  } else return wire.zTranslate + wire.spacing * 2;
};
