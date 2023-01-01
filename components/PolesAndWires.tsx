import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointLight } from "three/src/lights/PointLight";
import {
  Color,
  DirectionalLight,
  Vector3,
  MathUtils,
  Mesh,
  BoxGeometry,
  DoubleSide,
  EllipseCurve,
  Euler,
  Vector4,
} from "three";
import floor from "lodash-es/floor";
import { BirdAction, BoidConstants, Wire } from "./types";
import { Line, useGLTF } from "@react-three/drei";
import { Bird } from "../models/Bird";

interface PolesAndWiresProps {
  wires: Wire[];
  points: Vector4[];
}
export const PolesAndWires = ({
  wires,
  points,
}: PolesAndWiresProps): ReactElement => {
  const [plankPos] = useState<Map<number, Vector3[]>>(
    getHorizontalPlankPos(wires, points)
  );
  const [wireEndPos] = useState<Map<string, Vector3[]>>(
    getWireEndPoints(wires, points)
  );
  return (
    <>
      {wires.map((wire, i) => {
        return Array.from(Array(wire.numParallel)).map((_val, i) => (
          <Line
            key={wire.ax + wire.ay + i}
            points={new EllipseCurve(
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
              .map(
                (point) =>
                  new Vector3(
                    point.x,
                    point.y,
                    i === 0
                      ? wire.zTranslate
                      : i === 1
                      ? wire.spacing % 2 === 0
                        ? wire.zTranslate + wire.spacing
                        : wire.zTranslate + wire.spacing / 2
                      : wire.zTranslate + wire.spacing * 2
                  )
              )}
            color="blue"
            lineWidth={1}
            rotation={new Euler(0, wire.rotation, 0)}
          />
        ));
      })}
      {wires.map((wire, i) => {
        const pos = plankPos.get(i);
        if (!pos) return <></>;
        return (
          <group key={i}>
            <mesh
              position={[pos[0].x, pos[0].y - 8, pos[0].z]}
              rotation={new Euler(0, wire.rotation + Math.PI / 2, 0)}
            >
              <boxGeometry
                args={[
                  wire.numParallel === 1
                    ? 10
                    : wire.numParallel === 2
                    ? wire.spacing * 1.5
                    : wire.spacing * 3,
                  3,
                  3,
                ]}
              />
              <meshStandardMaterial color="gray" />
            </mesh>
            <mesh
              position={[pos[1].x, pos[1].y - 8, pos[1].z]}
              rotation={new Euler(0, wire.rotation + Math.PI / 2, 0)}
            >
              <boxGeometry
                args={[
                  wire.numParallel === 1
                    ? 10
                    : wire.numParallel === 2
                    ? wire.spacing * 1.5
                    : wire.spacing * 3,
                  3,
                  3,
                ]}
              />
              <meshStandardMaterial color="gray" />
            </mesh>
            <mesh position={[pos[0].x, pos[0].y - 150, pos[0].z]}>
              <boxGeometry args={[3, 300, 3]} />
              <meshStandardMaterial color="gray" />
            </mesh>
            <mesh position={[pos[1].x, pos[1].y - 150, pos[1].z]}>
              <boxGeometry args={[3, 300, 3]} />
              <meshStandardMaterial color="gray" />
            </mesh>
            {Array.from(Array(wire.numParallel)).map((_val, j) => {
              const pos = wireEndPos.get(JSON.stringify([i, j]));
              if (!pos) return <></>;
              return (
                <group key={JSON.stringify([i, j])}>
                  <mesh position={[pos[0].x, pos[0].y - 4, pos[0].z]}>
                    <cylinderGeometry args={[0.5, 1, 5]} />
                    <meshStandardMaterial color={new Color(0x333333)} />
                  </mesh>
                  <mesh position={[pos[1].x, pos[1].y - 4, pos[1].z]}>
                    <cylinderGeometry args={[0.5, 1, 5]} />
                    <meshStandardMaterial color={new Color(0x333333)} />
                  </mesh>
                </group>
              );
            })}
          </group>
        );
      })}
    </>
  );
};

const getHorizontalPlankPos = (
  wires: Wire[],
  points: Vector4[]
): Map<number, Vector3[]> => {
  const enpointMap = new Map<number, Vector3[]>();
  let runningStart = 0;
  let runningEnd = 0;
  for (let i = 0; i < wires.length; i++) {
    runningStart = i === 0 ? 0 : runningEnd + 1;
    runningEnd =
      runningStart + 50 * wires[i].numParallel + (wires[i].numParallel - 1);

    const start = points[runningStart];
    const end = points[runningEnd];
    if (wires[i].rotation === 0) {
      const averageZ = (start.z + end.z) / 2;
      const newStart = new Vector3(start.x, start.y, averageZ);
      const newEnd = new Vector3(end.x, end.y, averageZ);
      enpointMap.set(i, [newStart, newEnd]);
    } else {
      const averageX = (start.x + end.x) / 2;
      const newStart = new Vector3(averageX, start.y, start.z);
      const newEnd = new Vector3(averageX, end.y, end.z);
      enpointMap.set(i, [newStart, newEnd]);
    }
  }

  return enpointMap;
};

const getWireEndPoints = (
  wires: Wire[],
  points: Vector4[]
): Map<string, Vector3[]> => {
  const enpointMap = new Map<string, Vector3[]>();
  let runningStart = 0;
  let runningEnd = 0;
  for (let i = 0; i < wires.length; i++) {
    for (let j = 0; j < wires[i].numParallel; j++) {
      runningStart = i === 0 && j === 0 ? 0 : runningEnd + 1;
      runningEnd = runningStart + 50;
      enpointMap.set(JSON.stringify([i, j]), [
        new Vector3(
          points[runningStart].x,
          points[runningStart].y,
          points[runningStart].z
        ),
        new Vector3(
          points[runningEnd].x,
          points[runningEnd].y,
          points[runningEnd].z
        ),
      ]);
    }
  }

  return enpointMap;
};
