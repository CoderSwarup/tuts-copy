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
    </group>
  );
}

useGLTF.preload("./models/LADDA_Ground.glb");
