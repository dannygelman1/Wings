import { ReactElement, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Geometry } from "./Geometry";

export const PageCanvas = (): ReactElement => {
  return (
    <div className="w-full h-full h-grow bg-black absolute">
      <Canvas
        camera={{ fov: 50, position: [1, 5, 5] }}
        className="bg-green-500"
      >
        <Geometry />
      </Canvas>
    </div>
  );
};
