import { ReactElement, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const Geometry = (): ReactElement => {
  const { camera, gl } = useThree();
  const controls = new OrbitControls(camera, gl.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 0.1;
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
    // setBoxPosition({
    //   ...boxPosition,
    //   x: Math.cos(state.clock.getElapsedTime()),
    //   y: Math.sin(state.clock.getElapsedTime()),
    // });
    controls.update();
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
