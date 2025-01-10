import { useGLTF, Text, Billboard } from "@react-three/drei";

type GLTFResult = {
  nodes: {
    Plane001: THREE.Mesh;
    Plane: THREE.Mesh;
    Ladders018: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

interface LadderSceneProps {
  baseDistance: number;
  wallHeight: number;
}

export default function LadderScene({
  baseDistance,
  wallHeight,
  ...props
}: LadderSceneProps) {
  const { nodes, materials } = useGLTF(
    "/models/LADDERnew.glb"
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.001"]}
        position={[0, 0, 4.514]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.243, 0.843, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials["Material.002"]}
        position={[0, 0, 4.849]}
        scale={[6.768, 24.752, 20.854]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ladders018.geometry}
        material={materials.lambert49SG}
        position={[-0.11, 6.621, -1.013]}
        rotation={[2.244, 0, -Math.PI / 2]}
        scale={0.051}
      />

      {/* Dynamic text on the ground */}
      <Billboard position-x={12}>
        <Text fontSize={1} color="white">
          Base Distance: {baseDistance}m
        </Text>
      </Billboard>

      {/* Dynamic text on the wall */}
      <Billboard position-y={12} position-z={17}>
        <Text fontSize={1} color="white">
          Wall Height: {wallHeight}m
        </Text>
      </Billboard>
    </group>
  );
}

useGLTF.preload("/models/LADDERnew.glb");
