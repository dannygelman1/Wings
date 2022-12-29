import { ReactElement, useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLight } from "three/src/lights/PointLight";
import {
  BufferGeometry,
  Clock,
  Color,
  ConeGeometry,
  DirectionalLight,
  DoubleSide,
  LoadingManager,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  TextureLoader,
  Vector3,
} from "three";
import { useGLTF } from "@react-three/drei";
import { Euler } from "three";

export const CircleCone = (): ReactElement => {
  const { camera, gl, scene } = useThree();

  const controls = new OrbitControls(camera, gl.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.005;
  controls.zoomSpeed = 0.001;

  const pointLight = useRef<PointLight>(null);
  const dirLight = useRef<DirectionalLight>(null);
  const mesh = useRef<Mesh>(null);
  const cone = useRef<ConeGeometry>(null);
  scene.add(camera);
  if (pointLight.current) camera.add(pointLight.current);
  if (dirLight.current) camera.add(dirLight.current);
  const clock = new Clock();
  const rotationMatrix = new Matrix4();
  const targetQuaternion = new Quaternion();
  const [boxPosition, setBoxPosition] = useState<{
    x: number;
    y: number;
    z: number;
  }>({
    x: 0,
    y: 0,
    z: 0,
  });
  useEffect(() => {
    cone.current?.rotateX(Math.PI / 2);
  }, []);
  // const geometry = new ConeGeometry(1, 5);
  // geometry.rotateX(Math.PI * 0.5);

  // const material = new MeshStandardMaterial({ color: "green" });

  // const mesh = new Mesh(geometry, material);
  // mesh.position.set(0, 4, 0);
  // scene.add(mesh);

  const { nodes, materials, scene: birdScene } = useGLTF("/Wings/bird7.gltf");

  const [bMesh] = useState<Mesh | null>(
    nodes.bird instanceof Mesh ? nodes.bird : null
  );

  const [time, setTime] = useState<number>(0);

  const [bMesh2] = useState<Mesh | null>(
    nodes.bird001 instanceof Mesh ? nodes.bird001 : null
  );

  const [bMesh3] = useState<Mesh | null>(
    nodes.bird002 instanceof Mesh ? nodes.bird002 : null
  );

  useFrame((state, delta, xFrame) => {
    // if (state.clock.getElapsedTime() < 0.01) {
    //   mesh.current?.rotateX(Math.PI / 2);
    // }
    setTime(state.clock.getElapsedTime());
    controls.update();
    setBoxPosition({
      ...boxPosition,
      z: Math.cos(state.clock.getElapsedTime()),
    });
    // mesh.lookAt(new Vector3(boxPosition.x, boxPosition.y, boxPosition.z));
    // rotationMatrix.lookAt(
    //   new Vector3(boxPosition.x, boxPosition.y, boxPosition.z),
    //   mesh.position,
    //   mesh.up
    // );
    // targetQuaternion.setFromRotationMatrix(rotationMatrix);
    // // const delta = clock.getDelta();
    // if (!mesh.quaternion.equals(targetQuaternion)) {
    //   mesh.quaternion.rotateTowards(targetQuaternion, 2);
    // }
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
      <mesh
        position={[boxPosition.x, boxPosition.y, boxPosition.z]}
        receiveShadow={true}
        castShadow={true}
      >
        <sphereGeometry args={[0.7]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <primitive object={birdScene} />
      {/* <mesh
        position={[4, 4, 0.5]}
        ref={mesh}
        // rotation={new Euler(-Math.PI / 2, 0, 0)}
        receiveShadow={true}
        castShadow={true}
        onUpdate={(self) => {
          self.lookAt(new Vector3(boxPosition.x, boxPosition.y, boxPosition.z));
          // self.rotateX(Math.PI / 2);
          // rotationMatrix.lookAt(
          //   new Vector3(boxPosition.x, boxPosition.y, boxPosition.z),
          //   self.position,
          //   self.up
          // );
          // targetQuaternion.setFromRotationMatrix(rotationMatrix);
          // const delta = clock.getDelta();
          // if (!self.quaternion.equals(targetQuaternion)) {
          //   self.quaternion.rotateTowards(targetQuaternion, 0.4);
          // }
        }}
      >
        <coneGeometry
          ref={cone}
          args={[0.7, 2]}
          // rotation={new Euler(-Math.PI / 2, 0, 0)}
        />
        <meshStandardMaterial color="hotpink" />
      </mesh> */}
      {/* <group
        onUpdate={(self) => {
          self.lookAt(new Vector3(boxPosition.x, boxPosition.y, boxPosition.z));
        }}
      > */}
      <mesh
        position={[4, 4, 0]}
        geometry={bMesh?.geometry}
        onUpdate={(self) => {
          self.lookAt(new Vector3(boxPosition.x, boxPosition.y, boxPosition.z));
        }}
      >
        <meshStandardMaterial color="hotpink" />
        <mesh
          position={[0, 0, -0.5]}
          rotation={new Euler(0, 0, Math.sin((time * 7 + Math.PI / 2) * 2))}
          geometry={bMesh2?.geometry}
        >
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <mesh
          position={[0, 0, -0.5]}
          rotation={new Euler(0, 0, -Math.sin((time * 7 + Math.PI / 2) * 2))}
          geometry={bMesh3?.geometry}
        >
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </mesh>
      {/* <mesh
        position={[4, 4, 0]}
        rotation={new Euler(0, 0, Math.sin((time + Math.PI / 4) * 2))}
        geometry={bMesh2?.geometry}
        onUpdate={(self) => {
          console.log("update");
          // self.lookAt(new Vector3(boxPosition.x, boxPosition.y, boxPosition.z));
          // self.rotateZ(Math.sin((time + Math.PI / 4) * 2));
        }}
      >
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <mesh
        position={[4, 4, 0]}
        rotation={new Euler(0, 0, -Math.sin((time + Math.PI / 4) * 2))}
        geometry={bMesh3?.geometry}
        onUpdate={(self) => {
          // self.rotateZ(Math.sin((time + Math.PI / 4) * 2));
          // self.lookAt(new Vector3(boxPosition.x, boxPosition.y, boxPosition.z));
        }}
      >
        <meshStandardMaterial color="hotpink" />
      </mesh> */}
      {/* </group> */}
    </>
  );
};
