import { useGLTF } from "@react-three/drei";
type GLTFResult = {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

export default function Wall(props: any) {
  const { nodes, materials } = useGLTF(
    "./models/LADDA[wall swarup].glb"
  ) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null} scale={3.8} position={[3.2, 3.3, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Material.007"]}
      />
    </group>
  );
}

useGLTF.preload("./models/LADDA[wall swarup].glb");
