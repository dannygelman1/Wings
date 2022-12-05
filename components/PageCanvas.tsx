import { ReactElement } from "react";
import { Canvas } from "@react-three/fiber";

export const PageCanvas = (): ReactElement => {
  return (
    <Canvas>
      <pointLight position={[-5, -4, 10]} />
      <mesh>
        <sphereGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
};
