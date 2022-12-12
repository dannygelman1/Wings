import { ReactElement, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLight } from "three/src/lights/PointLight";
import { BackSide, Color, DirectionalLight, DoubleSide } from "three";

export const Geometry = (): ReactElement => {
  const { camera, gl, scene } = useThree();
  const controls = new OrbitControls(camera, gl.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 0.1;

  const pointLight = useRef<PointLight>(null);
  const dirLight = useRef<DirectionalLight>(null);
  scene.add(camera);
  if (pointLight.current) camera.add(pointLight.current);
  if (dirLight.current) camera.add(dirLight.current);

  const [boxPosition, setBoxPosition] = useState<{
    x: number;
    y: number;
    z: number;
  }>({
    x: 0,
    y: 1,
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
      <pointLight
        ref={pointLight}
        position={[0, 0.2, 4]}
        intensity={0.1}
        color={new Color(90, 60, 0)}
      />
      <directionalLight
        ref={dirLight}
        position={[0, 3, 0]}
        intensity={0.5}
        castShadow={true}
      />
      <mesh
        position={[boxPosition.x, boxPosition.y, boxPosition.z]}
        receiveShadow={true}
        castShadow={true}
      >
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <mesh
        position={[boxPosition.x, boxPosition.y + 1, boxPosition.z + 2]}
        receiveShadow={true}
        castShadow={true}
        scale={[2, 0.5, 4]}
      >
        <boxGeometry />
        <meshStandardMaterial color="hotpink" roughness={0.1} />
      </mesh>
      <mesh
        position={[boxPosition.x, boxPosition.y + 2, boxPosition.z + 3]}
        receiveShadow={true}
        castShadow={true}
      >
        <boxGeometry />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh
        position={[-4, 1, 0]}
        receiveShadow={true}
        castShadow={true}
        scale={2}
      >
        <sphereGeometry />
        <meshPhysicalMaterial color="gray" roughness={0.1} metalness={0.5} />
      </mesh>
      <mesh
        position={[0, 0, 0]}
        scale={10}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow={true}
      >
        <planeGeometry />
        <meshStandardMaterial color="blue" side={DoubleSide} />
      </mesh>
    </>
  );
};
