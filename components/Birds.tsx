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

interface BirdsProps {
  border: number[];
  height: number;
  boidConstants: BoidConstants;
  boxOpacity: number;
  numberBirds: number;
  allPerching: boolean;
  setAllPerching: Dispatch<SetStateAction<boolean>>;
}
export const Birds = ({
  border,
  height,
  boidConstants,
  boxOpacity,
  numberBirds,
  allPerching,
  setAllPerching,
}: BirdsProps): ReactElement => {
  const { camera, gl, scene } = useThree();
  const pointLight = useRef<PointLight>(null);
  const dirLight = useRef<DirectionalLight>(null);
  scene.add(camera);
  if (pointLight.current) camera.add(pointLight.current);
  if (dirLight.current) camera.add(dirLight.current);
  const boxGeo = useRef<BoxGeometry>(null);

  const maxPerchingTime = 10;
  const [wires] = useState<Wire[]>(
    Array.from(Array(7)).map(() => ({
      ax: MathUtils.randFloat(-100, 100),
      ay: MathUtils.randFloat(-100, -50),
      xRadius: MathUtils.randFloat(50, 300),
      yRadius: MathUtils.randFloat(10, 80),
      numParallel: MathUtils.randInt(2, 3),
      rotation: MathUtils.randInt(0, 1) === 1 ? Math.PI / 2 : 0,
      spacing: MathUtils.randInt(12, 35),
      zTranslate: MathUtils.randFloat(-200, 200),
    }))
  );
  const [points] = useState<Vector4[]>(getPointsFromWires(wires));
  const [plankPos] = useState<Map<number, Vector3[]>>(
    getHorizontalPlankPos(wires, points)
  );
  const [wireEndPos] = useState<Map<string, Vector3[]>>(
    getWireEndPoints(wires, points)
  );

  // const [wires, setWires] = useState<Wire[]>([]);
  // const [points, setPoints] = useState<Vector4[]>([]);
  // const [plankPos, setPlankPos] = useState<Map<number, Vector3[]>>(
  //   new Map<number, Vector3[]>()
  // );
  // const [wireEndPos, setWireEndPos] = useState<Map<string, Vector3[]>>(
  //   new Map<string, Vector3[]>()
  // );

  // useEffect(() => {
  //   const wires = Array.from(Array(7)).map(() => ({
  //     ax: MathUtils.randFloat(-100, 100),
  //     ay: MathUtils.randFloat(-100, -50),
  //     xRadius: MathUtils.randFloat(50, 300),
  //     yRadius: MathUtils.randFloat(10, 80),
  //     numParallel: MathUtils.randInt(2, 3),
  //     rotation: MathUtils.randInt(0, 1) === 1 ? Math.PI / 2 : 0,
  //     spacing: MathUtils.randInt(8, 35),
  //     zTranslate: MathUtils.randFloat(-200, 200),
  //   }));
  //   setWires(wires);
  //   const points = getPointsFromWires(wires);
  //   setPoints(points);
  //   setPlankPos(getHorizontalPlankPos(wires, points));
  //   setWireEndPos(getWireEndPoints(wires, points));
  // }, []);

  const { nodes } = useGLTF("/Wings/bird.gltf");
  const { nodes: perchNode } = useGLTF("/Wings/perch.gltf");
  const [mesh] = useState<Mesh | null>(
    nodes.bird instanceof Mesh ? nodes.bird : null
  );
  const [mesh2] = useState<Mesh | null>(
    nodes.bird001 instanceof Mesh ? nodes.bird001 : null
  );
  const [mesh3] = useState<Mesh | null>(
    nodes.bird002 instanceof Mesh ? nodes.bird002 : null
  );
  const [perch] = useState<Mesh | null>(
    perchNode.birdperch instanceof Mesh ? perchNode.birdperch : null
  );

  const findNewRandomNum = (
    usedPositions: Set<number>,
    numberPoints: number
  ): number => {
    const rand = MathUtils.randInt(0, points.length - 1);
    if (!usedPositions.has(rand) || numberPoints === usedPositions.size) {
      usedPositions.add(rand);
      return rand;
    } else {
      return findNewRandomNum(usedPositions, numberPoints);
    }
  };

  const [usedPositions, setUsedPositions] = useState<Set<number>>(
    new Set<number>()
  );
  const [birds, setBirds] = useState<Bird[]>([]);
  const [perchedBirds, setPerchedBirds] = useState<Bird[]>([]);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const diff = numberBirds - birds.length;
    if (diff > 0) {
      Array.from(Array(diff)).forEach(() => {
        const rand = findNewRandomNum(usedPositions, points.length);
        birds.push(
          new Bird({
            x: points[rand].x,
            y: points[rand].y,
            z: points[rand].z,
            vx: MathUtils.randFloat(-2, 2),
            vy: MathUtils.randFloat(-2, 2),
            vz: MathUtils.randFloat(-2, 2),
            bias: 0,
            id: birds.length,
            action: BirdAction.PERCHED,
            perchDur: MathUtils.randFloat(
              maxPerchingTime / 3.0,
              maxPerchingTime
            ), // random perch duration
            perchedAt: time, // time stamp that bird perched
            perchLoc: [
              points[rand].x,
              points[rand].y,
              points[rand].z,
              points[rand].w,
            ], // determines which perch
            flapOffset: MathUtils.randFloat(0, 10),
          })
        );
      });
      setUsedPositions(usedPositions);
    } else {
      Array.from(Array(-1 * diff)).forEach(() => birds.pop());
    }
    setBirds(birds);
  }, [numberBirds]);

  useEffect(() => {
    const flyingBirds = birds.filter(
      (bird) => bird.action !== BirdAction.PERCHED
    );
    if (flyingBirds.length < 5) setAllPerching(false);
  }, [birds]);

  useFrame((state) => {
    const birdMap = new Map<string, Bird[]>();
    const maxRange =
      Math.max(boidConstants.protectedRange, boidConstants.visualRange) * 2;
    if (birds.length === 0) return;
    const updateBirds = birds.map((b, i) => {
      const key = JSON.stringify([
        floor(b.x / maxRange) * maxRange,
        floor(b.y / maxRange) * maxRange,
        floor(b.z / maxRange) * maxRange,
      ]);

      if (new Set(Array.from(birdMap.keys())).has(key))
        birdMap.get(key)?.push(b);
      else birdMap.set(key, [b]);
      const bNeighbors = neighbors(
        [
          floor(b.x / maxRange) * maxRange,
          floor(b.y / maxRange) * maxRange,
          floor(b.z / maxRange) * maxRange,
        ],
        maxRange,
        b
      );
      const time = state.clock.getElapsedTime();
      setTime(time);

      const currentBirdPos = new Vector3(b.x, b.y, b.z);
      const pointOnPerch = new Vector3(
        b.perchLoc[0],
        b.perchLoc[1],
        b.perchLoc[2]
      );
      const dist = currentBirdPos.distanceTo(pointOnPerch);

      if (
        (dist < 150 &&
          (time < b.perchedAt + b.perchDur ||
            (time > maxPerchingTime * 2 && b.perchedAt === 0))) ||
        allPerching
      ) {
        const newPos = moveToPerch(dist, b, time);
        return newPos;
      } else {
        const newPos = move(
          birds,
          birdMap,
          bNeighbors,
          b,
          border,
          height,
          boidConstants,
          state.clock.getElapsedTime()
        );
        return newPos;
      }
    });
    setBirds(updateBirds);
  });
  return (
    <>
      <pointLight
        ref={pointLight}
        position={[0, 0.2, 4]}
        intensity={0.1}
        color={new Color(90, 60, 0)}
      />
      <mesh position={[0, height, 0]}>
        <boxGeometry args={[border[0], border[1], border[2]]} ref={boxGeo} />
        <meshStandardMaterial
          color="gray"
          opacity={boxOpacity}
          transparent
          side={DoubleSide}
        />
      </mesh>
      {birds.map((bird, i) => {
        return bird.action !== BirdAction.PERCHED ? (
          <mesh
            name={bird.id.toString()}
            key={"fly" + bird.id.toString()}
            position={[bird.x, bird.y, bird.z]}
            geometry={mesh?.geometry}
            onUpdate={(self) => {
              self.lookAt(
                new Vector3(
                  bird.x + bird.vx,
                  bird.y + bird.vy,
                  bird.z + bird.vz
                )
              );
            }}
          >
            <mesh
              position={[0, 0, -0.5]}
              rotation={
                new Euler(
                  0,
                  0,
                  Math.sin((time * 7 + Math.PI / 2) * 2 + bird.flapOffset)
                )
              }
              geometry={mesh2?.geometry}
            >
              <meshStandardMaterial color="blue" />
            </mesh>
            <mesh
              position={[0, 0, -0.5]}
              rotation={
                new Euler(
                  0,
                  0,
                  -Math.sin((time * 7 + Math.PI / 2) * 2 + bird.flapOffset)
                )
              }
              geometry={mesh3?.geometry}
            >
              <meshStandardMaterial color="blue" />
            </mesh>
            <meshStandardMaterial color={"blue"} />
          </mesh>
        ) : (
          <mesh
            key={"perch" + bird.id.toString()}
            position={
              new Vector3(
                bird.perchLoc[0],
                bird.perchLoc[1] - 0.7,
                bird.perchLoc[2]
              )
            }
            rotation={
              new Euler(
                0,
                bird.perchLoc[3] !== 0
                  ? floor(bird.perchDur) % 2 === 0
                    ? Math.PI / 2
                    : -Math.PI / 2
                  : floor(bird.perchDur) % 2 === 0
                  ? 0
                  : Math.PI,
                0
              )
            }
            geometry={perch?.geometry}
          >
            <meshStandardMaterial color="blue" />
          </mesh>
        );
      })}
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

const inBiasGroup1 = (index: number, length: number) => index < length / 5;
const inBiasGroup2 = (index: number, length: number) =>
  index > length / 5 && index < (2 * length) / 5;

const move = (
  birds: Bird[],
  birdMap: Map<string, Bird[]>,
  neighbords: string[],
  bird: Bird,
  bounds: number[],
  height: number,
  boidConsts: BoidConstants,
  time: number
): Bird => {
  const currentBirdPos = new Vector3(bird.x, bird.y, bird.z);
  const currentBirdVel = new Vector3(bird.vx, bird.vy, bird.vz);
  let xPos = 0;
  let yPos = 0;
  let zPos = 0;
  let xVel = 0;
  let yVel = 0;
  let zVel = 0;
  let closeX = 0;
  let closeY = 0;
  let closeZ = 0;
  let neighbors = 0;

  for (const neighbor of neighbords) {
    if (!new Set(Array.from(birdMap.keys())).has(neighbor)) continue;
    for (const nbirds of birdMap.get(neighbor) || []) {
      if (nbirds.id !== bird.id) {
        const nBirdPos = new Vector3(nbirds.x, nbirds.y, nbirds.z);
        if (currentBirdPos.distanceTo(nBirdPos) < boidConsts.visualRange) {
          xPos += nbirds.x;
          yPos += nbirds.y;
          zPos += nbirds.z;
          xVel += nbirds.vx;
          yVel += nbirds.vy;
          zVel += nbirds.vz;
          neighbors += 1;
        }
        if (currentBirdPos.distanceTo(nBirdPos) < boidConsts.protectedRange) {
          closeX += currentBirdPos.x - nBirdPos.x;
          closeY += currentBirdPos.y - nBirdPos.y;
          closeZ += currentBirdPos.z - nBirdPos.z;
        }
      }
    }
  }
  if (neighbors > 0) {
    bird.incremVXYZ(
      (xPos / neighbors - bird.x) * boidConsts.centeringFactor +
        (xVel / neighbors - bird.vx) * boidConsts.matchingFactor,
      (yPos / neighbors - bird.y) * boidConsts.centeringFactor +
        (yVel / neighbors - bird.vy) * boidConsts.matchingFactor,
      (zPos / neighbors - bird.z) * boidConsts.centeringFactor +
        (zVel / neighbors - bird.vz) * boidConsts.matchingFactor
    );
  }
  bird.incremVXYZ(
    closeX * boidConsts.avoidFactor,
    closeY * boidConsts.avoidFactor,
    closeZ * boidConsts.avoidFactor
  );

  const right = bounds[0] / 2;
  const left = (-1 * bounds[0]) / 2;
  const up = bounds[1] / 2 + height;
  const down = (-1 * bounds[1]) / 2 + height;
  const front = bounds[2] / 2;
  const back = (-1 * bounds[2]) / 2;
  if (bird.x > right) bird.incremVX(-1 * boidConsts.turnFactor);
  if (bird.x < left) bird.incremVX(boidConsts.turnFactor);
  if (bird.y > up) bird.incremVY(-1 * boidConsts.turnFactor);
  if (bird.y < down) bird.incremVY(boidConsts.turnFactor);
  if (bird.z > front) bird.incremVZ(-1 * boidConsts.turnFactor);
  if (bird.z < back) bird.incremVZ(boidConsts.turnFactor);

  if (inBiasGroup1(bird.id, birds.length)) {
    if (bird.vx > 0)
      bird.setBias(
        Math.min(boidConsts.maxBias, bird.bias + boidConsts.biasIncrm)
      );
    else
      bird.setBias(
        Math.max(boidConsts.biasIncrm, bird.bias - boidConsts.biasIncrm)
      );
  }
  if (inBiasGroup2(bird.id, birds.length)) {
    if (bird.vx < 0)
      bird.setBias(
        Math.min(boidConsts.maxBias, bird.bias + boidConsts.biasIncrm)
      );
    else
      bird.setBias(
        Math.max(boidConsts.biasIncrm, bird.bias - boidConsts.biasIncrm)
      );
  }

  if (inBiasGroup1(bird.id, birds.length)) {
    bird.setVX((1 - bird.bias) * bird.vx + bird.bias);
  }
  if (inBiasGroup2(bird.id, birds.length)) {
    bird.setVX((1 - bird.bias) * bird.vx - bird.bias);
  }

  const speed = bird.getSpeed();
  if (speed < boidConsts.minSpeed) {
    bird.setVX((bird.vx / speed) * boidConsts.minSpeed);
    bird.setVY((bird.vy / speed) * boidConsts.minSpeed);
    bird.setVZ((bird.vz / speed) * boidConsts.minSpeed);
  }
  if (speed > boidConsts.maxSpeed) {
    bird.setVX((bird.vx / speed) * boidConsts.maxSpeed);
    bird.setVY((bird.vy / speed) * boidConsts.maxSpeed);
    bird.setVZ((bird.vz / speed) * boidConsts.maxSpeed);
  }

  if (bird.perchedAt + bird.perchDur + 10 < time) {
    bird.setPerchedAt(0);
  }
  bird.setAction(BirdAction.FLYING);
  bird.move();

  return bird;
};

const moveToPerch = (dist: number, bird: Bird, time: number): Bird => {
  if (bird.action === BirdAction.PERCHED) return bird;

  const currentBirdPos = new Vector3(bird.x, bird.y, bird.z);
  const pointOnPerch = new Vector3(
    bird.perchLoc[0],
    bird.perchLoc[1],
    bird.perchLoc[2]
  );
  // bird.incremVX(MathUtils.randFloat(0, 0.1));
  // bird.incremVY(MathUtils.randFloat(0, 0.1));
  // bird.incremVZ(MathUtils.randFloat(0, 0.1));
  const speed = bird.getSpeed();
  if (dist > 2.8) {
    bird.incremVX((pointOnPerch.x - currentBirdPos.x) * 0.01);
    bird.incremVY((pointOnPerch.y - currentBirdPos.y) * 0.01);
    bird.incremVZ((pointOnPerch.z - currentBirdPos.z) * 0.01);

    if (bird.x > bird.perchLoc[0]) {
      bird.incremVX(-0.2);
      bird.incremX(-0.005);
    }
    if (bird.x < bird.perchLoc[0]) {
      bird.incremVX(0.2);
      bird.incremX(0.005);
    }
    if (bird.y > bird.perchLoc[1]) {
      bird.incremVY(-0.2);
      bird.incremY(-0.005);
    }
    if (bird.y < bird.perchLoc[1]) {
      bird.incremVY(0.2);
      bird.incremY(0.005);
    }
    if (bird.z > bird.perchLoc[2]) {
      bird.incremVZ(-0.2);
      bird.incremZ(-0.005);
    }
    if (bird.z < bird.perchLoc[2]) {
      bird.incremVZ(0.2);
      bird.incremZ(0.005);
    }

    const speed = bird.getSpeed();
    if (speed > 2) {
      bird.setVX((bird.vx / speed) * 2);
      bird.setVY((bird.vy / speed) * 2);
      bird.setVZ((bird.vz / speed) * 2);
    }
    bird.move();
  } else {
    bird.setXYZ(pointOnPerch.x, pointOnPerch.y, pointOnPerch.z);
    bird.setVXYZ(0, 0, 0);
    bird.setAction(BirdAction.PERCHED);
    bird.setPerchedAt(time);
  }
  return bird;
};

const neighbors = (
  birdGrid: number[],
  gridSize: number,
  bird: Bird
): string[] => {
  const x = bird.x;
  const y = bird.y;
  const z = bird.z;
  const midX = birdGrid[0] + gridSize / 2;
  const midY = birdGrid[1] + gridSize / 2;
  const midZ = birdGrid[2] + gridSize / 2;
  const listNeighbords = [];
  let newX;
  let newY;
  let newZ;
  if (x < midX) {
    newX = birdGrid[0] - gridSize;
  } else {
    newX = birdGrid[0] + gridSize;
  }
  if (y < midY) {
    newY = birdGrid[1] - gridSize;
  } else {
    newY = birdGrid[1] + gridSize;
  }
  if (z < midZ) {
    newZ = birdGrid[2] - gridSize;
  } else {
    newZ = birdGrid[2] + gridSize;
  }
  listNeighbords.push(JSON.stringify([birdGrid[0], newY, birdGrid[2]]));
  listNeighbords.push(JSON.stringify([birdGrid[0], newY, newZ]));
  listNeighbords.push(JSON.stringify([birdGrid[0], birdGrid[1], birdGrid[2]]));
  listNeighbords.push(JSON.stringify([birdGrid[0], birdGrid[1], newZ]));
  listNeighbords.push(JSON.stringify([newX, newY, birdGrid[2]]));
  listNeighbords.push(JSON.stringify([newX, newY, newZ]));
  listNeighbords.push(JSON.stringify([newX, birdGrid[1], birdGrid[2]]));
  listNeighbords.push(JSON.stringify([newX, birdGrid[1], newZ]));

  return listNeighbords;
};

const getPointsFromWires = (wires: Wire[]): Vector4[] => {
  const allPoints: Vector4[] = [];
  for (const wire of wires) {
    for (let i = 0; i < wire.numParallel; i++) {
      const points = new EllipseCurve(
        wire.ax,
        wire.ay + 2,
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
        );
      for (const point of points) {
        const pointOnWire = new Vector3(point.x, point.y, point.z).applyEuler(
          new Euler(0, wire.rotation, 0)
        );
        allPoints.push(
          new Vector4(
            pointOnWire.x,
            pointOnWire.y,
            pointOnWire.z,
            wire.rotation === 0 ? 0 : 1
          )
        );
      }
    }
  }
  return allPoints;
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
