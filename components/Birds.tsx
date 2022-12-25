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
} from "three";
import { BoidConstants } from "./types";

interface BirdsProps {
  border: number[];
  boidConstants: BoidConstants;
  boxOpacity: number;
  numberBirds: number;
}
export const Birds = ({
  border,
  boidConstants,
  boxOpacity,
  numberBirds,
}: BirdsProps): ReactElement => {
  const { camera, gl, scene } = useThree();
  const controls = new OrbitControls(camera, gl.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.01;
  controls.zoomSpeed = 0.001;

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

  useFrame(() => {
    controls.update();
  });
  const initialBirds = Array.from(Array(numberBirds)).map((i) => [
    MathUtils.randFloat((-1 * border[0]) / 2, border[0] / 2),
    MathUtils.randFloat((-1 * border[1]) / 2, border[1] / 2),
    MathUtils.randFloat((-1 * border[2]) / 2, border[2] / 2),
    MathUtils.randFloat(-2, 2),
    MathUtils.randFloat(-2, 2),
    MathUtils.randFloat(-2, 2),
    inBiasGroup1(i, numberBirds) || inBiasGroup2(i, numberBirds)
      ? MathUtils.randFloat(0.00004, 0.01)
      : 0,
  ]);

  const [birds, setBirds] = useState<number[][]>(initialBirds);

  useFrame(() => {
    const updateBirds = birds.map((b, i) => {
      const newPos = move(birds, b, i, border, boidConstants);
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
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[border[0], border[1], border[2]]} ref={boxGeo} />
        <meshStandardMaterial
          color="gray"
          opacity={boxOpacity}
          transparent
          wireframeLinejoin={"round"}
          side={DoubleSide}
        />
      </mesh>
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
          }}
        >
          <coneGeometry args={[1, 5]} />
          <meshStandardMaterial color="green" />
        </mesh>
      ))}
    </>
  );
};

const inBiasGroup1 = (index: number, length: number) => index < length / 5;
const inBiasGroup2 = (index: number, length: number) =>
  index > length / 5 && index < (2 * length) / 5;

const move = (
  birds: number[][],
  bird: number[],
  bIndex: number,
  bounds: number[],
  boidConsts: BoidConstants
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
      if (currentBirdPos.distanceTo(birdPos) < boidConsts.visualRange) {
        xPos += birds[i][0];
        yPos += birds[i][1];
        zPos += birds[i][2];
        xVel += birds[i][3];
        yVel += birds[i][4];
        zVel += birds[i][5];
        neighbors += 1;
      }
      if (currentBirdPos.distanceTo(birdPos) < boidConsts.protectedRange) {
        closeX += currentBirdPos.x - birdPos.x;
        closeY += currentBirdPos.y - birdPos.y;
        closeZ += currentBirdPos.z - birdPos.z;
      }
    }
  }
  if (neighbors > 0) {
    bird[3] +=
      (xPos / neighbors - bird[0]) * boidConsts.centeringFactor +
      (xVel / neighbors - bird[3]) * boidConsts.matchingFactor;
    bird[4] +=
      (yPos / neighbors - bird[1]) * boidConsts.centeringFactor +
      (yVel / neighbors - bird[4]) * boidConsts.matchingFactor;
    bird[5] +=
      (zPos / neighbors - bird[2]) * boidConsts.centeringFactor +
      (zVel / neighbors - bird[5]) * boidConsts.matchingFactor;
  }
  bird[3] += closeX * boidConsts.avoidFactor;
  bird[4] += closeY * boidConsts.avoidFactor;
  bird[5] += closeZ * boidConsts.avoidFactor;

  const right = bounds[0] / 2;
  const left = (-1 * bounds[0]) / 2;
  const up = bounds[1] / 2;
  const down = (-1 * bounds[1]) / 2;
  const front = bounds[2] / 2;
  const back = (-1 * bounds[2]) / 2;
  if (bird[0] > right) bird[3] -= boidConsts.turnFactor;
  if (bird[0] < left) bird[3] += boidConsts.turnFactor;
  if (bird[1] > up) bird[4] -= boidConsts.turnFactor;
  if (bird[1] < down) bird[4] += boidConsts.turnFactor;
  if (bird[2] > front) bird[5] -= boidConsts.turnFactor;
  if (bird[2] < back) bird[5] += boidConsts.turnFactor;

  if (inBiasGroup1(bIndex, birds.length)) {
    if (bird[3] > 0)
      bird[6] = Math.min(boidConsts.maxBias, bird[6] + boidConsts.biasIncrm);
    else
      bird[6] = Math.min(boidConsts.biasIncrm, bird[6] - boidConsts.biasIncrm);
  }
  if (inBiasGroup2(bIndex, birds.length)) {
    if (bird[3] < 0)
      bird[6] = Math.min(boidConsts.maxBias, bird[6] + boidConsts.biasIncrm);
    else
      bird[6] = Math.min(boidConsts.biasIncrm, bird[6] - boidConsts.biasIncrm);
  }

  if (inBiasGroup1(bIndex, birds.length)) {
    bird[3] = (1 - bird[6]) * bird[3] + bird[6];
  }
  if (inBiasGroup2(bIndex, birds.length)) {
    bird[3] = (1 - bird[6]) * bird[3] - bird[6];
  }
  const speed = (bird[3] ** 2 + bird[4] ** 2 + bird[5] ** 2) ** 0.5;
  if (speed < boidConsts.minSpeed) {
    bird[3] = (bird[3] / speed) * boidConsts.minSpeed;
    bird[4] = (bird[4] / speed) * boidConsts.minSpeed;
    bird[5] = (bird[5] / speed) * boidConsts.minSpeed;
  }
  if (speed > boidConsts.maxSpeed) {
    bird[3] = (bird[3] / speed) * boidConsts.maxSpeed;
    bird[4] = (bird[4] / speed) * boidConsts.maxSpeed;
    bird[5] = (bird[5] / speed) * boidConsts.maxSpeed;
  }

  bird[0] += bird[3];
  bird[1] += bird[4];
  bird[2] += bird[5];

  return bird;
};
