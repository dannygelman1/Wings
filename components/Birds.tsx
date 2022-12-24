import { ReactElement, useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLight } from "three/src/lights/PointLight";
import {
  Color,
  DirectionalLight,
  Vector3,
  MathUtils,
  Quaternion,
  Mesh,
  ConeGeometry,
} from "three";

interface BirdsProps {
  border: number[];
}
export const Birds = ({ border }: BirdsProps): ReactElement => {
  const { camera, gl, scene } = useThree();
  const controls = new OrbitControls(camera, gl.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.1;
  controls.zoomSpeed = 0.001;

  const pointLight = useRef<PointLight>(null);
  const dirLight = useRef<DirectionalLight>(null);
  scene.add(camera);
  if (pointLight.current) camera.add(pointLight.current);
  if (dirLight.current) camera.add(dirLight.current);
  useEffect(() => {
    scene.children.forEach((child) => {
      if (child instanceof Mesh && child.geometry instanceof ConeGeometry)
        child.geometry?.rotateX(Math.PI / 2);
    });
  }, []);

  useFrame(() => {
    controls.update();
  });
  const initialBirds = Array.from(Array(500)).map(() => [
    MathUtils.randFloat((-1 * border[0]) / 2, border[0] / 2),
    MathUtils.randFloat((-1 * border[1]) / 2, border[1] / 2),
    MathUtils.randFloat((-1 * border[2]) / 2, border[2] / 2),
    MathUtils.randFloat(-2, 2),
    MathUtils.randFloat(-2, 2),
    MathUtils.randFloat(-2, 2),
  ]);
  const [birds, setBirds] = useState<number[][]>(initialBirds);

  // [
  //   [-10, 5, 0, 2, 0, 0],
  //   [-10, 3, 0, 2, 0, 0],
  //   [-10, 1, 0, 2, 0, 0],
  //   [-10, -1, 0, 2, 0, 0],
  //   [-10, -3, 0, 2, 0, 0],
  //   [10, 5, 0, -2, 0, 0],
  //   [10, 3, 0, -2, 0, 0],
  //   [10, 1, 0, -2, 0, 0],
  //   [10, -1, 0, -2, 0, 0],
  //   [10, -3, 0, -2, 0, 0],
  // ]
  useFrame(() => {
    // const t = state.clock.getElapsedTime();
    // console.log(t);
    const updateBirds = birds.map((b, i) => {
      const newPos = move(birds, b, i, border, 8, 40, 0.0005, 0.05, 0.05, 0.2);
      return newPos;
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
      <directionalLight
        ref={dirLight}
        position={[0, 4, 0]}
        intensity={0.5}
        castShadow={true}
      />
      {/* <mesh position={[0, 0, 0]}>
        <boxGeometry args={[border[0], border[1], border[2]]} />
        <meshStandardMaterial color="gray" opacity={0.3} transparent />
      </mesh> */}
      {birds.map((bird, i) => (
        <mesh
          key={i}
          position={[bird[0], bird[1], bird[2]]}
          onUpdate={(self) => {
            self.lookAt(
              new Vector3(
                bird[0] + bird[3],
                bird[1] + bird[4],
                bird[2] + bird[5]
              )
            );
            // self.rotateX(Math.PI / 2);
            // rotationMatrix.lookAt(
            //   new Vector3(boxPosition.x, boxPosition.y, boxPosition.z),
            //   self.position,
            //   self.up
            // );
            // targetQuaternion.setFromRotationMatrix(rotationMatrix);
            // const delta = clock.getDelta();
            // if (!self.quaternion.equals(targetQuaternion)) {
            //   self.quaternion.rotateTowards(targetQuaternion, 0.4);
            // }
          }}
        >
          <coneGeometry args={[1, 5]} />
          <meshStandardMaterial color="green" />
        </mesh>
      ))}
    </>
  );
};

const moveForward = (b: number[], t: number): number[] => {
  const velocity = new Vector3(b[3], b[4], b[5]);
  const normVelocity = velocity.normalize();
  return [
    b[0] + normVelocity.x * t,
    b[1] + normVelocity.y * t,
    b[2] + normVelocity.z * t,
    b[3],
    b[4],
    b[5],
  ];
};

const moveFromBounds = (
  bounds: number[],
  b: number[],
  turnFactor: number
): number[] => {
  const right = bounds[0] / 2;
  const left = (-1 * bounds[0]) / 2;
  const up = bounds[1] / 2;
  const down = (-1 * bounds[1]) / 2;
  const front = bounds[2] / 2;
  const back = (-1 * bounds[2]) / 2;
  if (b[0] > right) b[3] = b[3] - turnFactor;
  if (b[0] < left) b[3] = b[3] + turnFactor;
  if (b[1] > up) b[4] = b[4] - turnFactor;
  if (b[1] < down) b[4] = b[4] + turnFactor;
  if (b[2] > front) b[5] = b[5] - turnFactor;
  if (b[2] < back) b[5] = b[5] + turnFactor;
  return b;
};

const moveFromEachother = (
  birds: number[][],
  bird: number[],
  bIndex: number,
  protectedRange: number,
  avoidFactor: number
): number[] => {
  const currentBirdPos = new Vector3(bird[0], bird[1], bird[2]);
  let closeX = 0;
  let closeY = 0;
  let closeZ = 0;
  for (let i = 0; i < birds.length; i++) {
    if (i !== bIndex) {
      const birdPos = new Vector3(birds[i][0], birds[i][1], birds[i][2]);
      if (currentBirdPos.distanceTo(birdPos) < protectedRange) {
        closeX += currentBirdPos.x - birdPos.x;
        closeY += currentBirdPos.y - birdPos.y;
        closeZ += currentBirdPos.z - birdPos.z;
      }
    }
  }
  bird[3] += closeX * avoidFactor;
  bird[4] += closeY * avoidFactor;
  bird[5] += closeZ * avoidFactor;

  return bird;
};

const moveWithEachother = (
  birds: number[][],
  bird: number[],
  bIndex: number,
  visualRange: number,
  matchingFactor: number
): number[] => {
  const currentBirdPos = new Vector3(bird[0], bird[1], bird[2]);
  let xVel = 0;
  let yVel = 0;
  let zVel = 0;
  let neighbors = 0;
  for (let i = 0; i < birds.length; i++) {
    if (i !== bIndex) {
      const birdPos = new Vector3(birds[i][0], birds[i][1], birds[i][2]);
      if (currentBirdPos.distanceTo(birdPos) < visualRange) {
        xVel += birds[i][3];
        yVel += birds[i][4];
        zVel += birds[i][5];
        neighbors += 1;
      }
    }
  }
  if (neighbors > 0) {
    bird[3] += (xVel / neighbors - bird[3]) * matchingFactor;
    bird[4] += (yVel / neighbors - bird[4]) * matchingFactor;
    bird[5] += (zVel / neighbors - bird[5]) * matchingFactor;
  }
  return bird;
};

const moveToEachother = (
  birds: number[][],
  bird: number[],
  bIndex: number,
  visualRange: number,
  centeringFactor: number
): number[] => {
  const currentBirdPos = new Vector3(bird[0], bird[1], bird[2]);
  let xPos = 0;
  let yPos = 0;
  let zPos = 0;
  let neighbors = 0;
  for (let i = 0; i < birds.length; i++) {
    if (i !== bIndex) {
      const birdPos = new Vector3(birds[i][0], birds[i][1], birds[i][2]);
      if (currentBirdPos.distanceTo(birdPos) < visualRange) {
        xPos += currentBirdPos.x - birdPos.x;
        yPos += currentBirdPos.y - birdPos.y;
        zPos += currentBirdPos.z - birdPos.z;
        neighbors += 1;
      }
    }
  }
  if (neighbors > 0) {
    bird[3] += (xPos / neighbors - bird[0]) * centeringFactor;
    bird[4] += (yPos / neighbors - bird[1]) * centeringFactor;
    bird[5] += (zPos / neighbors - bird[2]) * centeringFactor;
  }
  return bird;
};

const moveToBias = (
  birds: number[][],
  bird: number[],
  biVal: number
): number[] => {
  for (let i = 0; i < birds.length; i++) {
    if (i < birds.length / 10) {
      bird[3] = (1 - biVal) * bird[3] + biVal;
    }
    if (i > birds.length / 10 && i < (2 * birds.length) / 10) {
      bird[3] = (1 - biVal) * bird[3] - biVal;
    }
  }

  return bird;
};

const move = (
  birds: number[][],
  bird: number[],
  bIndex: number,
  bounds: number[],
  protectedRange: number,
  visualRange: number,
  centeringFactor: number,
  matchingFactor: number,
  avoidanceFactor: number,
  turnFactor: number
): number[] => {
  const currentBirdPos = new Vector3(bird[0], bird[1], bird[2]);
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
  for (let i = 0; i < birds.length; i++) {
    if (i !== bIndex) {
      const birdPos = new Vector3(birds[i][0], birds[i][1], birds[i][2]);
      if (currentBirdPos.distanceTo(birdPos) < visualRange) {
        xPos += birds[i][0];
        yPos += birds[i][1];
        zPos += birds[i][2];
        xVel += birds[i][3];
        yVel += birds[i][4];
        zVel += birds[i][5];
        neighbors += 1;
      }
      if (currentBirdPos.distanceTo(birdPos) < protectedRange) {
        closeX += currentBirdPos.x - birdPos.x;
        closeY += currentBirdPos.y - birdPos.y;
        closeZ += currentBirdPos.z - birdPos.z;
      }
    }
  }
  if (neighbors > 0) {
    bird[3] +=
      (xPos / neighbors - bird[0]) * centeringFactor +
      (xVel / neighbors - bird[3]) * matchingFactor;
    bird[4] +=
      (yPos / neighbors - bird[1]) * centeringFactor +
      (yVel / neighbors - bird[4]) * matchingFactor;
    bird[5] +=
      (zPos / neighbors - bird[2]) * centeringFactor +
      (zVel / neighbors - bird[5]) * matchingFactor;
  }
  bird[3] += closeX * avoidanceFactor;
  bird[4] += closeY * avoidanceFactor;
  bird[5] += closeZ * avoidanceFactor;

  const right = bounds[0] / 2;
  const left = (-1 * bounds[0]) / 2;
  const up = bounds[1] / 2;
  const down = (-1 * bounds[1]) / 2;
  const front = bounds[2] / 2;
  const back = (-1 * bounds[2]) / 2;
  if (bird[0] > right) bird[3] -= turnFactor;
  if (bird[0] < left) bird[3] += turnFactor;
  if (bird[1] > up) bird[4] -= turnFactor;
  if (bird[1] < down) bird[4] += turnFactor;
  if (bird[2] > front) bird[5] -= turnFactor;
  if (bird[2] < back) bird[5] += turnFactor;

  bird[0] += bird[3];
  bird[1] += bird[4];
  bird[2] += bird[5];

  return bird;
};

// const checkBounds = (bounds: number[], b: number[]): boolean[] => {
//   const right = bounds[0] / 2;
//   constxPos left = -bounds[0] / 2;
//   const up = bounds[1] / 2;
//   const down = -bounds[1] / 2;
//   const front = bounds[2] / 2;
//   const back = -bounds[2] / 2;
//   return [
//     b[0] > right,
//     b[0] < left,
//     b[1] > up,
//     b[1] < down,
//     b[2] > front,
//     b[2] < back,
//   ];
// };

// const moveFromBounds = (
//   inBounds: boolean[],
//   b: number[],
//   turnFactor: number
// ): number[] => {
//   if (inBounds[0]) b[3] = b[3] - turnFactor;
//   if (inBounds[1]) b[3] = b[3] + turnFactor;
//   if (inBounds[2]) b[4] = b[4] - turnFactor;
//   if (inBounds[3]) b[4] = b[4] + turnFactor;
//   if (inBounds[4]) b[5] = b[5] - turnFactor;
//   if (inBounds[5]) b[5] = b[5] + turnFactor;
//   return b;
// };
