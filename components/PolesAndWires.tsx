import { ReactElement, useState } from "react";
import { Color, Vector3, EllipseCurve, Euler } from "three";
import { Wire } from "./types";
import { Line } from "@react-three/drei";
import { Vector } from "../models/Vector";
import { ellipsePoints } from "./util";

interface PolesAndWiresProps {
  wires: Wire[];
  points: Vector[];
}
export const PolesAndWires = ({
  wires,
  points,
}: PolesAndWiresProps): ReactElement => {
  const [plankPos] = useState<Map<number, Vector[]>>(
    getHorizontalPlankPos(wires, points)
  );
  const [wireEndPos] = useState<Map<string, Vector[]>>(
    getWireEndPoints(wires, points)
  );
  return (
    <>
      {wires.map((wire, i) => {
        return Array.from(Array(wire.numParallel)).map((_val, i) => (
          <Line
            key={wire.ax + wire.ay + i}
            points={ellipsePoints(i, wire)}
            color="blue"
            lineWidth={1}
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
  points: Vector[]
): Map<number, Vector[]> => {
  const enpointMap = new Map<number, Vector[]>();
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
      const newStart = new Vector({ x: start.x, y: start.y, z: averageZ });
      const newEnd = new Vector({ x: end.x, y: end.y, z: averageZ });
      enpointMap.set(i, [newStart, newEnd]);
    } else {
      const averageX = (start.x + end.x) / 2;
      const newStart = new Vector({ x: averageX, y: start.y, z: start.z });
      const newEnd = new Vector({ x: averageX, y: end.y, z: end.z });
      enpointMap.set(i, [newStart, newEnd]);
    }
  }

  return enpointMap;
};

const getWireEndPoints = (
  wires: Wire[],
  points: Vector[]
): Map<string, Vector[]> => {
  const enpointMap = new Map<string, Vector[]>();
  let runningStart = 0;
  let runningEnd = 0;
  for (let i = 0; i < wires.length; i++) {
    for (let j = 0; j < wires[i].numParallel; j++) {
      runningStart = i === 0 && j === 0 ? 0 : runningEnd + 1;
      runningEnd = runningStart + 50;
      enpointMap.set(JSON.stringify([i, j]), [
        points[runningStart],
        points[runningEnd],
      ]);
    }
  }

  return enpointMap;
};
