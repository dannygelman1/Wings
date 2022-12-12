import { ReactElement } from "react";
import { Canvas } from "@react-three/fiber";
import { Geometry } from "./Geometry";
import { AxesHelper } from "three";
import { useEnvironment, Environment } from "@react-three/drei";

export const PageCanvas = (): ReactElement => {
  // const map = useEnvironment({
  //   files:
  //     process.env.NEXT_PUBLIC_ENVIRONMENT === "Development"
  //       ? `${process.env.NEXT_PUBLIC_HOST}/clarens_night_02_4k.hdr`
  //       : "https://dannygelman1.github.io/Wings/clarens_night_02_4k.hdr",
  // });
  return (
    <div className="w-full h-full h-grow bg-black absolute">
      <Canvas
        shadows={true}
        camera={{ fov: 50, position: [-10, 0, 0] }}
        className="bg-green-500"
      >
        {/* <Environment map={map} background /> */}
        <Geometry />
        <primitive object={new AxesHelper(10)} />
      </Canvas>
    </div>
  );
};
