import { ReactElement, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLight } from "three/src/lights/PointLight";
import {
  Color,
  DirectionalLight,
  DoubleSide,
  LoadingManager,
  TextureLoader,
} from "three";

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

  const textureLoader = new TextureLoader(new LoadingManager());
  const baseColor = textureLoader.load("/Wings/rocky_trail_diff_2k.jpg");
  const disp = textureLoader.load("/Wings/rocky_trail_disp_2k.png");

  useFrame(() => {
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
        position={[0, 4, 0]}
        intensity={0.5}
        castShadow={true}
      />
      <mesh position={[0, 0.9, 0]} receiveShadow={true} castShadow={true}>
        <sphereGeometry args={[0.7, 150, 150]} />
        <meshStandardMaterial
          color="hotpink"
          map={baseColor}
          displacementMap={disp}
          displacementScale={0.15}
        />
      </mesh>
      <mesh
        position={[0, 2, 2]}
        receiveShadow={true}
        castShadow={true}
        scale={[2, 0.5, 4]}
      >
        <boxGeometry />
        <meshStandardMaterial color="hotpink" roughness={0.1} />
      </mesh>
      <mesh position={[0, 3, 3]} receiveShadow={true} castShadow={true}>
        <boxGeometry />
        <meshStandardMaterial color="gray" map={baseColor} />
      </mesh>
      <mesh
        position={[0, 2, -3]}
        receiveShadow={true}
        castShadow={true}
        scale={2}
      >
        <sphereGeometry />
        <meshPhysicalMaterial roughness={0.1} color="purple" />
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
