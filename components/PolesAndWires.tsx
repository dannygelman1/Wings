import { ReactElement, useEffect, useRef, useState } from "react";
import { CameraHelper, Color, DirectionalLight, Euler } from "three";
import { Wire } from "./types";
import { Line } from "@react-three/drei";
import { Vector } from "../models/Vector";
import { ellipsePoints } from "./util";
import { useThree } from "@react-three/fiber";

interface PolesAndWiresProps {
  wires: Wire[];
  points: Vector[];
  wireReset: number;
}
export const PolesAndWires = ({
  wires,
  points,
  wireReset,
}: PolesAndWiresProps): ReactElement => {
  const { camera, scene } = useThree();
  const dirLight = useRef<DirectionalLight>(null);
  scene.add(camera);
  if (dirLight.current) {
    dirLight.current.shadow.camera.near = 200;
    dirLight.current.shadow.camera.far = 980;
    dirLight.current.shadow.camera.bottom = -330;
    dirLight.current.shadow.camera.top = -250;
    dirLight.current.shadow.camera.left = -400;
    dirLight.current.shadow.camera.right = 400;
    new CameraHelper(dirLight.current.shadow.camera);
  }

  const [plankPos, setPlankPos] = useState<Map<number, Vector[]>>(
    getHorizontalPlankPos(wires, points)
  );
  const [wireEndPos, setWireEndPos] = useState<Map<string, Vector[]>>(
    getWireEndPoints(wires, points)
  );

  useEffect(() => {
    setPlankPos(getHorizontalPlankPos(wires, points));
    setWireEndPos(getWireEndPoints(wires, points));
  }, [wires, points]);

  return (
    <>
      <directionalLight
        ref={dirLight}
        castShadow
        position={[-400, 30, -400]}
        intensity={0.015}
        color={new Color(230, 134, 119)}
      />
      <pointLight
        position={[-400, -280, -400]}
        intensity={0.07}
        color={new Color(237, 108, 38)}
      />
      <group key={wireReset}>
        <mesh position={[0, -299, 0]} receiveShadow>
          <cylinderGeometry args={[400, 400, 2, 50]} />
          <meshStandardMaterial color={new Color(0xbdb4f0)} roughness={1} />
        </mesh>
        {wires.map((wire) =>
          Array.from(Array(wire.numParallel)).map((_val, i) => (
            <Line
              key={wire.ax + wire.ay + i}
              points={ellipsePoints(i, wire)}
              color="black"
              lineWidth={1}
            />
          ))
        )}
        {wires.map((wire, i) => {
          const pos = plankPos.get(i);
          if (!pos) return;
          return (
            <group key={i}>
              <mesh
                castShadow
                position={[pos[0].x, pos[0].y - 8, pos[0].z]}
                rotation={new Euler(0, wire.rotation + Math.PI / 2, 0)}
              >
                <boxGeometry args={[getPlankLength(wire), 3, 3]} />
                <meshStandardMaterial color={new Color(0xa18367)} />
              </mesh>
              <mesh
                castShadow
                position={[pos[1].x, pos[1].y - 8, pos[1].z]}
                rotation={new Euler(0, wire.rotation + Math.PI / 2, 0)}
              >
                <boxGeometry args={[getPlankLength(wire), 3, 3]} />
                <meshStandardMaterial color={new Color(0xa18367)} />
              </mesh>
              <mesh
                castShadow
                position={[pos[0].x, pos[0].y - (pos[0].y + 300) / 2, pos[0].z]}
              >
                <boxGeometry args={[3, pos[0].y + 300, 3]} />
                <meshStandardMaterial color={new Color(0xa18367)} />
              </mesh>
              <mesh
                castShadow
                position={[pos[1].x, pos[1].y - (pos[1].y + 300) / 2, pos[1].z]}
              >
                <boxGeometry args={[3, pos[1].y + 300, 3]} />
                <meshStandardMaterial color={new Color(0xa18367)} />
              </mesh>
              {Array.from(Array(wire.numParallel)).map((_val, j) => {
                const pos = wireEndPos.get(JSON.stringify([i, j]));
                if (!pos) return;
                return (
                  <group key={JSON.stringify([i, j])}>
                    <mesh
                      position={[pos[0].x, pos[0].y - 4, pos[0].z]}
                      castShadow
                    >
                      <cylinderGeometry args={[0.5, 1, 5]} />
                      <meshStandardMaterial color={new Color(0x333333)} />
                    </mesh>
                    <mesh
                      position={[pos[1].x, pos[1].y - 4, pos[1].z]}
                      castShadow
                    >
                      <cylinderGeometry args={[0.5, 1, 5]} />
                      <meshStandardMaterial color={new Color(0x333333)} />
                    </mesh>
                  </group>
                );
              })}
            </group>
          );
        })}
      </group>
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

const getPlankLength = (wire: Wire): number => {
  if (wire.numParallel === 1) return 10;
  else if (wire.numParallel === 2) return wire.spacing * 1.5;
  else return wire.spacing * 3;
};
