import { ReactElement, useState } from "react";
import { useFrame } from "@react-three/fiber";

export const Geometry = (): ReactElement => {
  const [boxPosition, setBoxPosition] = useState<{
    x: number;
    y: number;
    z: number;
  }>({
    x: 0,
    y: 0,
    z: 0,
  });

  useFrame((state, delta, xrFrame) => {
    setBoxPosition({
      ...boxPosition,
      x: Math.cos(state.clock.getElapsedTime()),
      y: Math.sin(state.clock.getElapsedTime()),
    });
  });

  return (
    <>
      <pointLight position={[-5, -4, 10]} />
      <mesh
        position={[boxPosition.x, boxPosition.y, boxPosition.z]}
        // rotation={[boxPosition.x, boxPosition.y, boxPosition.z]}
      >
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  );
};
