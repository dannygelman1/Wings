import { ReactElement, useRef, useState } from "react";
import { Canvas, PrimitiveProps } from "@react-three/fiber";
import { Birds } from "./Birds";
import { BoidConstants } from "./types";

export const PageCanvas = (): ReactElement => {
  const [border, setBorder] = useState<number[]>([300, 180, 240]);
  const [constants, setConstants] = useState<BoidConstants>({
    turnfactor: 0.2,
    visualRange: 40,
    protectedRange: 8,
    centeringFactor: 0.0005,
    avoidFactor: 0.05,
    matchingFactor: 0.05,
    maxSpeed: 4,
    minSpeed: 2,
    turnFactor: 0.2,
    maxBias: 0.01,
    biasIncrm: 0.00004,
  });

  return (
    <>
      <div className="w-full h-full h-grow bg-black absolute">
        <Canvas shadows={true} camera={{ fov: 50, position: [300, 300, 300] }}>
          {/* <Environment map={map} background /> */}
          {/* <Geometry /> */}
          {/* <CircleCone /> */}
          <Birds border={border} boidConstants={constants} />
          {/* <primitive
            object={new AxesHelper(10).setColors(
              new Color(1, 1, 1),
              new Color(1, 0, 0),
              new Color(0, 1, 0)
            )}
          /> */}
        </Canvas>
      </div>
      <div className="absolute">
        <div className="flex flex-row space-x-2 ">
          <div
            className="bg-green-300 select-none cursor-default hover:bg-green-200 active:bg-green-100"
            onClick={() => setBorder([border[0] + 5, border[1], border[2]])}
          >
            X +
          </div>
          <div
            className="bg-red-300 select-none cursor-default hover:bg-red-200 active:bg-red-100"
            onClick={() => setBorder([border[0] - 5, border[1], border[2]])}
          >
            X -
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <div
            className="bg-green-300 select-none cursor-default hover:bg-green-200 active:bg-green-100"
            onClick={() => setBorder([border[0], border[1] + 5, border[2]])}
          >
            Y +
          </div>
          <div
            className="bg-red-300 select-none cursor-default hover:bg-red-200 active:bg-red-100"
            onClick={() => setBorder([border[0], border[1] - 5, border[2]])}
          >
            Y -
          </div>
        </div>
        <div className="flex flex-row space-x-2 ">
          <div
            className="bg-green-300 select-none cursor-default hover:bg-green-200 active:bg-green-100"
            onClick={() => setBorder([border[0], border[1], border[2] + 5])}
          >
            Z +
          </div>
          <div
            className="bg-red-300 select-none cursor-default hover:bg-red-200 active:bg-red-100"
            onClick={() => setBorder([border[0], border[1], border[2] - 5])}
          >
            Z -
          </div>
        </div>
        <div className="flex flex-row space-x-2 ">
          <div
            className="bg-green-300 select-none cursor-default hover:bg-green-200 active:bg-green-100"
            onClick={() =>
              setConstants({
                ...constants,
                visualRange: constants.visualRange + 1,
              })
            }
          >
            visual range +
          </div>
          <div
            className="bg-red-300 select-none cursor-default hover:bg-red-200 active:bg-red-100"
            onClick={() =>
              setConstants({
                ...constants,
                visualRange: constants.visualRange - 1,
              })
            }
          >
            visual range -
          </div>
          <div className="text-white select-none cursor-default">
            {constants.visualRange}
          </div>
        </div>
        <div className="flex flex-row space-x-2 ">
          <div
            className="bg-green-300 select-none cursor-default hover:bg-green-200 active:bg-green-100"
            onClick={() =>
              setConstants({
                ...constants,
                protectedRange: constants.protectedRange + 1,
              })
            }
          >
            protected range +
          </div>
          <div
            className="bg-red-300 select-none cursor-default hover:bg-red-200 active:bg-red-100"
            onClick={() =>
              setConstants({
                ...constants,
                protectedRange: constants.protectedRange - 1,
              })
            }
          >
            protected range -
          </div>
          <div className="text-white select-none cursor-default">
            {constants.protectedRange}
          </div>
        </div>
      </div>
    </>
  );
};
