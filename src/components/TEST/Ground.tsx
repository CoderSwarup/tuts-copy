import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
type GLTFResult = {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};
export function Ground(props: any) {
  const { nodes, materials } = useGLTF(
    "./models/LADDA_Ground.glb"
  ) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null} scale={3} position={[1.5, 2.6, 0]}>
   
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.Material}
        position={[0.622, -1, 0]}
        scale={1.627}
      />
      <group
        position={[1.851, -0.116, -0.789]}
        rotation={[0, -0.56, 0]}
        scale={[0.272, 0.304, 0.272]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001_1.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001_2.geometry}
          material={materials["Material.003"]}
        />
      </group>
      <group
        position={[0.07, -0.051, -0.859]}
        rotation={[-Math.PI, 0.8, -Math.PI]}
        scale={[0.272, 0.351, 0.272]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere002.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere002_1.geometry}
          material={materials["Material.003"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./models/LADDA_Ground.glb");
