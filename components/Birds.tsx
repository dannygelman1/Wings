import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFrame } from "@react-three/fiber";
import { Color, MathUtils, Mesh, BoxGeometry, DoubleSide, Euler } from "three";
import { PolesAndWires } from "./PolesAndWires";
import { BirdAction, BoidConstants, Wire } from "./types";
import { useGLTF } from "@react-three/drei";
import { Bird } from "../models/Bird";
import { Vector } from "../models/Vector";
import { ellipsePoints } from "./util";

interface BirdsProps {
  border: number[];
  consts: BoidConstants;
  wireReset: number;
  boxOpacity: number;
  numberBirds: number;
  allPerching: boolean;
  setAllPerching: Dispatch<SetStateAction<boolean>>;
}
export const Birds = ({
  border,
  consts,
  boxOpacity,
  numberBirds,
  allPerching,
  wireReset,
  setAllPerching,
}: BirdsProps): ReactElement => {
  const boxGeo = useRef<BoxGeometry>(null);

  const maxPerchingTime = 10;
  const height = 80;
  const t = Date.now();
  const [time, setTime] = useState<number>(0);
  const [delta, setDelta] = useState<number>(Date.now() - t);
  const [birds, setBirds] = useState<Bird[]>([]);
  const [wires, setWires] = useState<Wire[]>(
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
  const [points, setPoints] = useState<Vector[]>(getPointsFromWires(wires));
  const [usedPositions, setUsedPositions] = useState<Set<number>>(
    new Set<number>()
  );

  const { nodes } = useGLTF("/Wings/bird.gltf");
  const { nodes: perchNode } = useGLTF("/Wings/birdperch.gltf");
  const [wing1] = useState<Mesh | null>(
    nodes.wing1 instanceof Mesh ? nodes.wing1 : null
  );
  const [wing2] = useState<Mesh | null>(
    nodes.wing2 instanceof Mesh ? nodes.wing2 : null
  );
  const [body] = useState<Mesh | null>(
    nodes.body instanceof Mesh ? nodes.body : null
  );
  const [perch] = useState<Mesh | null>(
    perchNode.perch instanceof Mesh ? perchNode.perch : null
  );

  useEffect(() => {
    if (wireReset > 0) {
      const wires1 = Array.from(Array(7)).map(() => ({
        ax: MathUtils.randFloat(-100, 100),
        ay: MathUtils.randFloat(-100, -50),
        xRadius: MathUtils.randFloat(50, 300),
        yRadius: MathUtils.randFloat(10, 80),
        numParallel: MathUtils.randInt(2, 3),
        rotation: MathUtils.randInt(0, 1) === 1 ? Math.PI / 2 : 0,
        spacing: MathUtils.randInt(12, 35),
        zTranslate: MathUtils.randFloat(-200, 200),
      }));
      setWires(wires1);
      setPoints(getPointsFromWires(wires1));
    }
  }, [wireReset]);

  useEffect(() => {
    const diff = numberBirds - birds.length;
    if (diff > 0) {
      Array.from(Array(diff)).forEach(() => {
        const rand = findNewRandomNum(usedPositions, points.length);
        birds.push(
          new Bird({
            pos: points[rand].xyz(),
            vel: new Vector({
              x: MathUtils.randFloat(-2, 2),
              y: MathUtils.randFloat(-2, 2),
              z: MathUtils.randFloat(-2, 2),
            }),
            bias: 0,
            id: birds.length,
            action: BirdAction.PERCHED,
            perchDur: MathUtils.randFloat(
              maxPerchingTime / 3.0,
              maxPerchingTime
            ), // random perch duration
            perchedAt: time, // time stamp that bird perched
            perchLoc: points[rand], // determines which perch
            flapOffset: MathUtils.randFloat(0, 10),
          })
        );
      });
    } else {
      Array.from(Array(-1 * diff)).forEach(() => birds.pop());
    }

    if (wireReset > 0) {
      setUsedPositions(new Set<number>());

      birds.forEach((bird) => {
        const rand = findNewRandomNum(usedPositions, points.length);
        bird.setPerchLoc(points[rand]);
      });
    }
    setBirds(birds);
  }, [numberBirds, points, wireReset]);

  useEffect(() => {
    if (allPerching) {
      const flyingBirds = birds.filter(
        (bird) => bird.action !== BirdAction.PERCHED
      );
      if (flyingBirds.length === 0) setAllPerching(false);
    }
  }, [allPerching, birds, setAllPerching]);

  useFrame((state) => {
    setTime(state.clock.getElapsedTime());
    setDelta(Date.now() - t);
    if (birds.length === 0) return;

    const grids = new Map<string, Bird[]>();
    const maxRange = Math.max(consts.protectedRange, consts.visualRange) * 2;
    const updateBirds = birds.map((b) => {
      const key = JSON.stringify(b.getGrid(maxRange));

      if (new Set(Array.from(grids.keys())).has(key)) grids.get(key)?.push(b);
      else grids.set(key, [b]);

      const dist = b.pos.distanceTo(b.perchLoc);
      b.setWillPerch(MathUtils.randInt(0, 100));

      if (
        (dist < 150 &&
          (time < b.perchedAt + b.perchDur ||
            (time > maxPerchingTime * 2 &&
              b.perchedAt === 0 &&
              b.willPerch()))) ||
        allPerching
      ) {
        const newPos = moveToPerch(dist, b, time, delta);
        return newPos;
      } else {
        const newPos = move(
          birds,
          grids,
          maxRange,
          b,
          border,
          height,
          consts,
          state.clock.getElapsedTime(),
          delta
        );
        return newPos;
      }
    });
    setBirds(updateBirds);
  });
  return (
    <>
      <hemisphereLight
        position={[0, 0, 0]}
        intensity={0.001}
        color={new Color(232, 199, 155)}
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
            position={[bird.pos.x, bird.pos.y, bird.pos.z]}
            geometry={body?.geometry}
            onUpdate={(self) => self.lookAt(bird.lookAt(delta).v3())}
          >
            <mesh
              position={[0, -0.2, 0]}
              rotation={new Euler(0, 0, bird.wingAnimation(time, 1))}
              geometry={wing1?.geometry}
            >
              <meshStandardMaterial color="brown" />
            </mesh>
            <mesh
              position={[0, -0.2, 0]}
              rotation={new Euler(0, 0, bird.wingAnimation(time, -1))}
              geometry={wing2?.geometry}
            >
              <meshStandardMaterial color="brown" />
            </mesh>
            <meshStandardMaterial color="brown" />
          </mesh>
        ) : (
          <mesh
            key={"perch" + bird.id.toString()}
            position={bird.perchPos().v3()}
            rotation={new Euler(0, bird.perchRotation(), 0)}
            geometry={perch?.geometry}
          >
            <meshStandardMaterial color="brown" />
          </mesh>
        );
      })}
      <PolesAndWires points={points} wires={wires} wireReset={wireReset} />
    </>
  );
};

const move = (
  birds: Bird[],
  birdMap: Map<string, Bird[]>,
  maxRange: number,
  bird: Bird,
  bounds: number[],
  height: number,
  consts: BoidConstants,
  time: number,
  delta: number
): Bird => {
  let pos = new Vector({ x: 0, y: 0, z: 0 });
  let vel = new Vector({ x: 0, y: 0, z: 0 });
  let close = new Vector({ x: 0, y: 0, z: 0 });
  let neighbors = 0;

  for (const neighbor of bird.getNeighbors(maxRange)) {
    if (!new Set(Array.from(birdMap.keys())).has(neighbor)) continue;
    for (const nbirds of birdMap.get(neighbor) || []) {
      if (nbirds.id !== bird.id) {
        if (bird.pos.distanceTo(nbirds.pos) < consts.visualRange) {
          pos.add(nbirds.pos);
          vel.add(nbirds.vel);
          neighbors += 1;
        }
        if (bird.pos.distanceTo(nbirds.pos) < consts.protectedRange) {
          close.add(bird.pos.diff(nbirds.pos));
        }
      }
    }
  }
  if (neighbors > 0) {
    const centering = pos.div(neighbors).diff(bird.pos).prod(consts.centering);
    const matching = vel.div(neighbors).diff(bird.vel).prod(consts.matching);
    bird.incremVXYZ(centering.sum(matching));
  }
  bird.incremVXYZ(close.prod(consts.avoid));

  const right = bounds[0] / 2;
  const left = (-1 * bounds[0]) / 2;
  const up = bounds[1] / 2 + height;
  const down = (-1 * bounds[1]) / 2 + height;
  const front = bounds[2] / 2;
  const back = (-1 * bounds[2]) / 2;
  if (bird.pos.x > right) bird.incremVX(-1 * consts.turnFactor);
  if (bird.pos.x < left) bird.incremVX(consts.turnFactor);
  if (bird.pos.y > up) bird.incremVY(-1 * consts.turnFactor);
  if (bird.pos.y < down) bird.incremVY(consts.turnFactor);
  if (bird.pos.z > front) bird.incremVZ(-1 * consts.turnFactor);
  if (bird.pos.z < back) bird.incremVZ(consts.turnFactor);

  if (bird.inBiasGroup1(birds.length)) {
    if (bird.vel.x > 0)
      bird.setBias(Math.min(consts.maxBias, bird.bias + consts.biasIncrm));
    else bird.setBias(Math.max(consts.biasIncrm, bird.bias - consts.biasIncrm));
  }
  if (bird.inBiasGroup2(birds.length)) {
    if (bird.vel.x < 0)
      bird.setBias(Math.min(consts.maxBias, bird.bias + consts.biasIncrm));
    else bird.setBias(Math.max(consts.biasIncrm, bird.bias - consts.biasIncrm));
  }

  if (bird.inBiasGroup1(birds.length)) {
    bird.setVX((1 - bird.bias) * bird.vel.x + bird.bias);
  }
  if (bird.inBiasGroup2(birds.length)) {
    bird.setVX((1 - bird.bias) * bird.vel.x - bird.bias);
  }

  const speed = bird.getSpeed();
  if (speed < consts.minSpeed)
    bird.setVXYZ(bird.vel.div(speed).prod(consts.minSpeed));
  if (speed > consts.maxSpeed)
    bird.setVXYZ(bird.vel.div(speed).prod(consts.maxSpeed));

  if (bird.perchedAt + bird.perchDur + 10 < time) {
    bird.setPerchedAt(0);
    bird.unsetWillPerch();
  }
  bird.setAction(BirdAction.FLYING);
  bird.move(delta);

  return bird;
};

const moveToPerch = (
  dist: number,
  bird: Bird,
  time: number,
  delta: number
): Bird => {
  if (bird.action === BirdAction.PERCHED) return bird;

  if (dist > 1.8) {
    bird.incremVXYZ(bird.perchLoc.diff(bird.pos).prod(0.01));

    if (bird.pos.x > bird.perchLoc.x) bird.incremVX(-0.2);
    if (bird.pos.x < bird.perchLoc.x) bird.incremVX(0.2);
    if (bird.pos.y > bird.perchLoc.y) bird.incremVY(-0.2);
    if (bird.pos.y < bird.perchLoc.y) bird.incremVY(0.2);
    if (bird.pos.z > bird.perchLoc.z) bird.incremVZ(-0.2);
    if (bird.pos.z < bird.perchLoc.z) bird.incremVZ(0.2);

    const speed = bird.getSpeed();
    if (speed > 2) bird.setVXYZ(bird.vel.div(speed).prod(2));

    if (dist < 30) bird.setVXYZ(bird.vel.prod(0.6));

    bird.move(delta);
  } else {
    bird.setXYZ(bird.perchLoc);
    bird.setVXYZ(new Vector({ x: 0, y: 0, z: 0 }));
    bird.setAction(BirdAction.PERCHED);
    bird.setPerchedAt(time);
  }
  return bird;
};

const getPointsFromWires = (wires: Wire[]): Vector[] => {
  let allPoints: Vector[] = [];
  for (const wire of wires) {
    for (let i = 0; i < wire.numParallel; i++) {
      const points = ellipsePoints(i, wire).map(
        (point) =>
          new Vector({
            x: point.x,
            y: point.y + 2,
            z: point.z,
            w: wire.rotation,
          })
      );
      allPoints = allPoints.concat(points);
    }
  }
  return allPoints;
};

const findNewRandomNum = (
  usedPositions: Set<number>,
  numberPoints: number
): number => {
  const rand = MathUtils.randInt(0, numberPoints - 1);
  if (!usedPositions.has(rand) || numberPoints === usedPositions.size) {
    usedPositions.add(rand);
    return rand;
  } else {
    return findNewRandomNum(usedPositions, numberPoints);
  }
};
