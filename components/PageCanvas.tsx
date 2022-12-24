import { ReactElement, useState } from "react";
import { Canvas } from "@react-three/fiber";
// import { Geometry } from "./Geometry";
import { Birds } from "./Birds";
import { AxesHelper } from "three";

export const PageCanvas = (): ReactElement => {
  // const map = useEnvironment({
  //   files:
  //     process.env.NEXT_PUBLIC_ENVIRONMENT === "Development"
  //       ? `${process.env.NEXT_PUBLIC_HOST}/limpopo_golf_course_1k.hdr`
  //       : "https://dannygelman1.github.io/Wings/limpopo_golf_course_1k.hdr",

  // });
  const [border, setBorder] = useState<number[]>([300, 180, 240]);

  return (
    <>
      <div className="w-full h-full h-grow bg-black absolute">
        <Canvas shadows={true} camera={{ fov: 50, position: [300, 300, 300] }}>
          {/* <Environment map={map} background /> */}
          {/* <Geometry /> */}
          <Birds border={border} />
          <primitive object={new AxesHelper(10)} />
        </Canvas>
      </div>
      <div className="absolute">
        <div className="flex flex-row space-x-2 justify-center items-center">
          <div
            className="bg-green-300 select-none cursor-default hover:bg-green-200 active:bg-green-100"
            onClick={() => setBorder([border[0] + 1, border[1], border[2]])}
          >
            X +
          </div>
          <div
            className="bg-red-300 select-none cursor-default hover:bg-red-200 active:bg-red-100"
            onClick={() => setBorder([border[0] - 1, border[1], border[2]])}
          >
            X -
          </div>
        </div>
        <div className="flex flex-row space-x-2 justify-center items-center">
          <div
            className="bg-green-300 select-none cursor-default hover:bg-green-200 active:bg-green-100"
            onClick={() => setBorder([border[0], border[1] + 1, border[2]])}
          >
            Y +
          </div>
          <div
            className="bg-red-300 select-none cursor-default hover:bg-red-200 active:bg-red-100"
            onClick={() => setBorder([border[0], border[1] - 1, border[2]])}
          >
            Y -
          </div>
        </div>
        <div className="flex flex-row space-x-2 justify-center items-center">
          <div
            className="bg-green-300 select-none cursor-default hover:bg-green-200 active:bg-green-100"
            onClick={() => setBorder([border[0], border[1], border[2] + 1])}
          >
            Z +
          </div>
          <div
            className="bg-red-300 select-none cursor-default hover:bg-red-200 active:bg-red-100"
            onClick={() => setBorder([border[0], border[1], border[2] - 1])}
          >
            Z -
          </div>
        </div>
      </div>
    </>
  );
};
