import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLight } from "three/src/lights/PointLight";
import {
  Color,
  DirectionalLight,
  Vector3,
  MathUtils,
  Mesh,
  ConeGeometry,
  BoxGeometry,
  DoubleSide,
  EllipseCurve,
  Euler,
} from "three";
import floor from "lodash-es/floor";
import { BirdAction, BoidConstants, Wire } from "./types";
import { Line } from "@react-three/drei";
import { Bird } from "../models/Bird";

interface BirdsProps {
  border: number[];
  height: number;
  boidConstants: BoidConstants;
  boxOpacity: number;
  numberBirds: number;
}
export const Birds = ({
  border,
  height,
  boidConstants,
  boxOpacity,
  numberBirds,
}: BirdsProps): ReactElement => {
  const { camera, gl, scene } = useThree();
  const controls = new OrbitControls(camera, gl.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.01;
  controls.zoomSpeed = 0.001;

  controls.target.set(0, 0, 0);
  camera.position.set(camera.position.x, 0, camera.position.z);
  camera.lookAt(controls.target);
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = 180;
  controls.target.set(0, 0, 0);
  const pointLight = useRef<PointLight>(null);
  const dirLight = useRef<DirectionalLight>(null);
  scene.add(camera);
  if (pointLight.current) camera.add(pointLight.current);
  if (dirLight.current) camera.add(dirLight.current);
  const boxGeo = useRef<BoxGeometry>(null);

  useEffect(() => {
    scene.children.forEach((child) => {
      if (child instanceof Mesh && child.geometry instanceof ConeGeometry)
        child.geometry?.rotateX(Math.PI / 2);
    });
  }, []);
  const maxPerchingTime = 10;
  const [wires] = useState<Wire[]>(
    Array.from(Array(8)).map(() => ({
      ax: MathUtils.randFloat(-100, 100),
      ay: MathUtils.randFloat(-100, -50),
      xRadius: MathUtils.randFloat(50, 150),
      yRadius: MathUtils.randFloat(10, 80),
      rotation: MathUtils.randFloat(Math.PI / 10, Math.PI),
    }))
  );
  const [points] = useState<Vector3[]>(getPointsFromWires(wires));

  const [birds, setBirds] = useState<Bird[]>(
    Array.from(Array(numberBirds)).map((_val, i) => {
      const rand = MathUtils.randInt(0, points.length - 1);
      return new Bird({
        x: points[rand].x,
        y: points[rand].y,
        z: points[rand].z,
        vx: MathUtils.randFloat(-2, 2),
        vy: MathUtils.randFloat(-2, 2),
        vz: MathUtils.randFloat(-2, 2),
        bias:
          inBiasGroup1(i, numberBirds) || inBiasGroup2(i, numberBirds)
            ? MathUtils.randFloat(0.00004, 0.01)
            : 0,
        id: i,
        action: BirdAction.FLYING,
        perchDur: MathUtils.randFloat(maxPerchingTime / 3.0, maxPerchingTime), // random perch duration
        perchedAt: 0, // time stamp that bird perched
        perchLoc: [points[rand].x, points[rand].y, points[rand].z], // determines which perch
      });
    })
  );

  const [birdNum, setBirdNum] = useState<number>(numberBirds);
  const [mousePos, setMousePos] = useState<number[]>([0, 0, 0]);

  const [randomNum, setRandomNum] = useState<number>(MathUtils.randInt(15, 40));
  const [timeInterval, setTimeInterval] = useState<number>(0);

  useEffect(() => {
    const mouseMove = (event: MouseEvent) => {
      const x =
        ((event.clientX - 230) / gl.domElement.clientWidth - 0.5) *
        gl.domElement.clientWidth;
      const y =
        -((event.clientY - 30) / gl.domElement.clientHeight - 0.5) *
        gl.domElement.clientHeight;
      setMousePos([x, y, 0]);
    };
    gl.domElement.addEventListener("mousemove", mouseMove);
  }, []);

  useEffect(() => {
    const diff = numberBirds - birds.length;
    if (diff > 0) {
      const rand = MathUtils.randInt(0, points.length - 1);
      Array.from(Array(diff)).forEach(() =>
        birds.push(
          new Bird({
            x: MathUtils.randFloat((-1 * border[0]) / 2, border[0] / 2),
            y: MathUtils.randFloat(
              (-1 * border[1]) / 2 + height,
              border[1] / 2 + height
            ),
            z: MathUtils.randFloat((-1 * border[2]) / 2, border[2] / 2),
            vx: MathUtils.randFloat(-2, 2),
            vy: MathUtils.randFloat(-2, 2),
            vz: MathUtils.randFloat(-2, 2),
            bias: 0,
            id: birds.length,
            action: BirdAction.FLYING,
            perchDur: MathUtils.randFloat(
              maxPerchingTime / 3.0,
              maxPerchingTime
            ), // random perch duration
            perchedAt: 0, // time stamp that bird perched
            perchLoc: [points[rand].x, points[rand].y, points[rand].z], // determines which perch
          })
        )
      );
    } else {
      Array.from(Array(-1 * diff)).forEach(() => birds.pop());
    }
    setBirds(birds);
    scene.children.forEach((child, i) => {
      if (child instanceof Mesh && child.geometry instanceof ConeGeometry)
        if (
          child instanceof Mesh &&
          child.geometry instanceof ConeGeometry &&
          parseInt(child.name) > birdNum
        ) {
          child.geometry?.rotateX(Math.PI / 2);
        }
    });
    setBirdNum(scene.children.length);
  }, [numberBirds, scene.children.length]);

  const setNewBird = (bird: Bird) => {
    setBirds(
      birds.map((b) => {
        if (b.id === bird.id) {
          return bird;
        } else return b;
      })
    );
  };

  useFrame((state) => {
    controls.update();
    const birdMap = new Map<string, Bird[]>();
    const maxRange =
      Math.max(boidConstants.protectedRange, boidConstants.visualRange) * 2;
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

      // if (floor(time) % maxPerchingTime === 0 && timeInterval !== floor(time)) {
      //   setRandomNum(MathUtils.randInt(2, 10));
      //   birds
      //     .filter((bird) => bird.perchedAt + maxPerchingTime < time)
      //     .forEach((bird) => (bird.perchedAt = 0));
      //   setTimeInterval(floor(time));
      // }
      const currentBirdPos = new Vector3(b.x, b.y, b.z);
      const pointOnPerch = new Vector3(
        b.perchLoc[0],
        b.perchLoc[1],
        b.perchLoc[2]
      );
      const dist = currentBirdPos.distanceTo(pointOnPerch);

      if (
        time > 10 &&
        dist < 150 &&
        (time < b.perchedAt + b.perchDur || b.perchedAt === 0) &&
        (b.willPerch() || b.action !== BirdAction.FLYING)
      ) {
        const newPos = moveToPerch2(dist, b, boidConstants, wires, time);
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
          mousePos,
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
      {/* <mesh position={[mousePos[0], mousePos[1], mousePos[2]]}>
        <boxGeometry args={[40, 40, 40]} />
        <meshStandardMaterial color="red" side={DoubleSide} />
      </mesh> */}
      {birds.map((bird, i) => (
        <mesh
          name={bird.id.toString()}
          key={i}
          position={[bird.x, bird.y, bird.z]}
          onUpdate={(self) => {
            self.lookAt(
              new Vector3(bird.x + bird.vx, bird.y + bird.vy, bird.z + bird.vz)
            );
          }}
        >
          <coneGeometry
            args={[1, 5]}
            onUpdate={(self) => {
              const currentBirdPos = new Vector3(bird.x, bird.y, bird.z);
              const pointOnPerch = new Vector3(
                bird.perchLoc[0],
                bird.perchLoc[1],
                bird.perchLoc[2]
              );
              const dist = currentBirdPos.distanceTo(pointOnPerch);
              if (bird.action === BirdAction.PERCHED && dist > 5) {
                self.rotateX(Math.PI / 2);
                bird.setVXYZ(
                  MathUtils.randFloat(-2, 2),
                  MathUtils.randFloat(-2, 2),
                  MathUtils.randFloat(-2, 2)
                );
                bird.setAction(BirdAction.FLYING);
                setNewBird(bird);
              }
              if (bird.action === BirdAction.PERCHING) {
                self.rotateX(-Math.PI / 2);
                bird.setAction(BirdAction.PERCHED);
                setNewBird(bird);
              }
            }}
          />
          <meshStandardMaterial color={bird.perchedAt === 0 ? "blue" : "red"} />
        </mesh>
      ))}
      {wires.map((wire, i) => (
        <Line
          key={i}
          points={new EllipseCurve(
            wire.ax,
            wire.ay,
            wire.xRadius,
            wire.yRadius,
            Math.PI + Math.PI / 8,
            0 - Math.PI / 8,
            false,
            0
          ).getPoints(50)}
          color="blue"
          lineWidth={1}
          rotation={new Euler(0, wire.rotation, 0)}
        />
      ))}
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
  mousePos: number[],
  time: number
): Bird => {
  if (
    bird.action === BirdAction.PERCHED &&
    time < bird.perchedAt + bird.perchDur &&
    time > 10
  ) {
    return bird;
  }
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
  let mouseX = 0;
  let mouseY = 0;
  let mouseZ = 0;
  let neighbors = 0;

  for (const neighbor of neighbords) {
    if (!new Set(Array.from(birdMap.keys())).has(neighbor)) continue;
    for (const nbirds of birdMap.get(neighbor) || []) {
      if (nbirds.id !== bird.id) {
        const nBirdPos = new Vector3(nbirds.x, nbirds.y, nbirds.z);
        // const mouseP = new Vector3(mousePos[0], mousePos[1], mousePos[2]);
        // if (currentBirdPos.distanceTo(mouseP) < boidConsts.visualRange) {
        //   mouseX = mouseP.x - currentBirdPos.x;
        //   mouseY = mouseP.y - currentBirdPos.y;
        //   mouseZ = -currentBirdPos.z;
        // }
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

  // const pointOnPerch = new Vector3(
  //   bird.perchLoc[0],
  //   bird.perchLoc[1],
  //   bird.perchLoc[2]
  // );
  // const dist = currentBirdPos.distanceTo(pointOnPerch);

  // if (
  //   dist < 150 &&
  //   time > 10 &&
  //   (bird.action === BirdAction.FLYING ||
  //     bird.action === BirdAction.FLYINGDOWN) &&
  //   bird.perchedAt === 0 &&
  //   MathUtils.randInt(0, 10) === 0
  // ) {
  //   // const dirToPoint = pointOnPerch.sub(currentBirdPos).normalize();
  //   // const currentDir = currentBirdVel.normalize();
  //   // const crossProd = dirToPoint.cross(currentDir);
  //   // if (Math.abs(crossProd.length()) < 1) {
  //   bird.setAction(BirdAction.FLYINGDOWN);
  //   bird.incremVX((pointOnPerch.x - currentBirdPos.x) * dist * 0.001);
  //   bird.incremVY((pointOnPerch.y - currentBirdPos.y) * dist * 0.001);
  //   bird.incremVZ((pointOnPerch.z - currentBirdPos.z) * dist * 0.001);
  //   // }
  // } else if (bird.action === BirdAction.FLYING) {
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
  // }

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

  // if (
  //   dist < 1 &&
  //   time > 10 &&
  //   bird.action === BirdAction.FLYINGDOWN &&
  //   bird.perchedAt === 0
  // ) {
  //   bird.setXYZ(pointOnPerch.x, pointOnPerch.y, pointOnPerch.z);
  //   bird.setVXYZ(0, 0, 0);
  //   bird.setAction(BirdAction.PERCHING);
  //   bird.setPerchedAt(time);
  // }
  if (bird.perchedAt + bird.perchDur + 10 < time) {
    bird.setPerchedAt(0);
  }

  bird.move();

  return bird;
};

const moveToPerch2 = (
  dist: number,
  bird: Bird,
  boidConsts: BoidConstants,
  wires: Wire[],
  time: number
): Bird => {
  if (
    bird.action === BirdAction.PERCHED &&
    time < bird.perchedAt + bird.perchDur
  ) {
    return bird;
  }
  const currentBirdPos = new Vector3(bird.x, bird.y, bird.z);
  const pointOnPerch = new Vector3(
    bird.perchLoc[0],
    bird.perchLoc[1],
    bird.perchLoc[2]
  );

  if (
    dist > 2 &&
    // (bird.action === BirdAction.FLYING ||
    //   bird.action === BirdAction.FLYINGDOWN) &&
    bird.perchedAt === 0
    // MathUtils.randInt(0, 10) === 0
  ) {
    bird.setAction(BirdAction.FLYINGDOWN);
    // bird.flag = 1;
    bird.incremVX((pointOnPerch.x - currentBirdPos.x) * 0.01);
    bird.incremVY((pointOnPerch.y - currentBirdPos.y) * 0.01);
    bird.incremVZ((pointOnPerch.z - currentBirdPos.z) * 0.01);

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
    bird.setAction(BirdAction.PERCHING);
    bird.setPerchedAt(time);
  }
  return bird;
};

const moveToPerch = (
  birds: Bird[],
  bird: Bird,
  boidConsts: BoidConstants,
  wires: Wire[],
  time: number
): Bird => {
  const currentBirdPos = new Vector3(bird.x, bird.y, bird.z);
  const pointOnPerch = new Vector3(
    bird.perchLoc[0],
    bird.perchLoc[1],
    bird.perchLoc[2]
  );
  const dist = currentBirdPos.distanceTo(pointOnPerch);

  if (dist > 2 && bird.vx !== 0 && bird.vy !== 0 && bird.vz !== 0) {
    bird.incremVX((pointOnPerch.x - currentBirdPos.x) * dist);
    bird.incremVY((pointOnPerch.y - currentBirdPos.y) * dist);
    bird.incremVZ((pointOnPerch.z - currentBirdPos.z) * dist);

    const speed = bird.getSpeed();
    if (speed > boidConsts.maxSpeed) {
      bird.setVX((bird.vx / speed) * boidConsts.maxSpeed);
      bird.setVY((bird.vy / speed) * boidConsts.maxSpeed);
      bird.setVZ((bird.vz / speed) * boidConsts.maxSpeed);
    }
    bird.move();
  } else {
    bird.setXYZ(pointOnPerch.x, pointOnPerch.y, pointOnPerch.z);
    bird.setVXYZ(0, 0, 0);
    if (bird.action === BirdAction.FLYING) {
      bird.setAction(BirdAction.PERCHING);
      bird.setPerchedAt(time);
    }
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

const getPointOnPerch = (bird: Bird, numBirds: number, wire: Wire): Vector3 => {
  return new Vector3(
    wire.ax +
      wire.xRadius *
        Math.cos(
          -(Math.PI - (2 * Math.PI) / 8) * (bird.id / numBirds) - Math.PI / 8
        ),
    wire.ay +
      2 +
      wire.yRadius *
        Math.sin(
          -(Math.PI - (2 * Math.PI) / 8) * (bird.id / numBirds) - Math.PI / 8
        ),
    0
  ).applyEuler(new Euler(0, wire.rotation, 0));
};

const getPointsFromWires = (wires: Wire[]): Vector3[] => {
  const allPoints = [];
  for (const wire of wires) {
    const points = new EllipseCurve(
      wire.ax,
      wire.ay + 2,
      wire.xRadius,
      wire.yRadius,
      Math.PI + Math.PI / 8,
      0 - Math.PI / 8,
      false,
      0
    ).getPoints(50);
    for (const point of points) {
      allPoints.push(
        new Vector3(point.x, point.y, 0).applyEuler(
          new Euler(0, wire.rotation, 0)
        )
      );
    }
  }
  return allPoints;
};
