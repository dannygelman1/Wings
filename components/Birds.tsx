import { ReactElement, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLight } from "three/src/lights/PointLight";
import { Color, DirectionalLight, Vector3, MathUtils } from "three";

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

  useFrame(() => {
    controls.update();
  });
  const initialBirds = Array.from(Array(100)).map(() => [
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
      // const t = state.clock.getElapsedTime();
      // console.log(t);
      const newPos = moveForward(b, 0.5);
      const pMoveAway = moveFromEachother(birds, newPos, i, 2, 0.01);
      const pMoveTogether = moveWithEachother(birds, pMoveAway, i, 4, 0.05);
      const pMoveCenter = moveToEachother(birds, pMoveTogether, i, 4, 0.05);
      const posMoveFromBounds = moveFromBounds(border, pMoveCenter, 5);
      return posMoveFromBounds;
    });
    setBirds(updateBirds);
  });

  console.log("birds", birds);
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
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[border[0], border[1], border[2]]} />
        <meshStandardMaterial color="gray" opacity={0.3} transparent />
      </mesh>
      {birds.map((bird, i) => (
        <mesh key={i} position={[bird[0], bird[1], bird[2]]}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color="green" />
        </mesh>
      ))}
      {/* <mesh position={[-70, 0, 0]}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="gray" opacity={0.1} />
      </mesh> */}
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
  const left = -bounds[0] / 2;
  const up = bounds[1] / 2;
  const down = -bounds[1] / 2;
  const front = bounds[2] / 2;
  const back = -bounds[2] / 2;
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
