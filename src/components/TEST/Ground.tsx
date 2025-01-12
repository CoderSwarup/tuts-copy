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
      <group
        position={[-0.524, -1.039, -1.394]}
        rotation={[0, -0.376, 0]}
        scale={0.154}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[-0.156, -1.039, -1.367]}
        rotation={[Math.PI, -0.572, Math.PI]}
        scale={0.155}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[-0.397, -1.039, -1.073]}
        rotation={[0, 1.368, 0]}
        scale={0.12}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[0.284, -1.039, -1.3]}
        rotation={[0, 0.95, 0]}
        scale={0.109}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[0.645, -1.039, -1.254]}
        rotation={[-Math.PI, 1.354, -Math.PI]}
        scale={0.102}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[1.153, -1.039, -1.24]}
        rotation={[0, 0.719, 0]}
        scale={0.18}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[0.603, -1.039, -1.006]}
        rotation={[0, -1.076, 0]}
        scale={0.165}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[0.922, -1.039, -0.821]}
        rotation={[0, 1.363, 0]}
        scale={0.123}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[0.578, -1.039, -0.662]}
        rotation={[0, -1.1, 0]}
        scale={0.139}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[1.29, -1.039, -0.569]}
        rotation={[0, -0.597, 0]}
        scale={0.136}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[1.594, -1.039, -0.37]}
        rotation={[Math.PI, -1.319, Math.PI]}
        scale={0.111}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[2.045, -1.039, -0.137]}
        rotation={[0, -0.453, 0]}
        scale={0.112}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[-0.426, -1.064, 0.906]}
        rotation={[0, -1.402, 0]}
        scale={0.149}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[-0.058, -1.064, 0.915]}
        rotation={[Math.PI, -0.796, Math.PI]}
        scale={0.165}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[-0.284, -1.064, 1.22]}
        rotation={[Math.PI, -1.157, Math.PI]}
        scale={0.129}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[0.385, -1.064, 0.96]}
        rotation={[0, -0.691, 0]}
        scale={0.13}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[0.748, -1.064, 0.989]}
        rotation={[0, 0.266, 0]}
        scale={0.153}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[1.255, -1.064, 0.978]}
        rotation={[-Math.PI, 0.115, -Math.PI]}
        scale={0.149}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[1.815, -1.064, 1.376]}
        rotation={[0, -1.547, 0]}
        scale={0.121}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[1.728, -1.064, 1.018]}
        rotation={[-Math.PI, 0.893, -Math.PI]}
        scale={0.139}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[2.081, -1.064, 1.157]}
        rotation={[0, 1.011, 0]}
        scale={0.147}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[1.656, -1.064, 0.578]}
        rotation={[0, 1.053, 0]}
        scale={0.165}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[1.59, -1.064, 0.221]}
        rotation={[0, -0.744, 0]}
        scale={0.11}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
      <group
        position={[1.446, -1.064, -0.266]}
        rotation={[-Math.PI, 0.108, -Math.PI]}
        scale={0.158}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_1.geometry}
          material={materials["Material.017"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_2.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone002_3.geometry}
          material={materials["Material.016"]}
        />
      </group>
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
