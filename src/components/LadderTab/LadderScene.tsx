import { useGLTF, Text, Billboard } from "@react-three/drei";

type GLTFResult = {
  nodes: {
    Plane001: THREE.Mesh;
    Plane: THREE.Mesh;
    Ladders018: THREE.Mesh;
    gs_forest_seedlings_01: THREE.Mesh;
    gs_forest_seedlings_01_1: THREE.Mesh;
    gs_dryland_meadow_flower_01: THREE.Mesh;
    gs_dryland_meadow_flower_01_1: THREE.Mesh;
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
    "/models/LADDER1.glb"
  ) as unknown as GLTFResult;

  return (
    <group {...props} scale={0.5} position-z={10} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials["Material.002"]}
        scale={27.052}
        position-z={-26.5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ladders018.geometry}
        material={materials.lambert49SG}
        position={[-0.11, 10.621, -baseDistance]}
        // rotation={[2.244, 0, -Math.PI / 2]}
        rotation={[1.4 + (baseDistance * 10 * Math.PI) / 180, 0, -Math.PI / 2]}
        scale={0.071}
      />
      <group position={[16.616, 0.775, -4]} rotation={[-0.062, 0, -0.004]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.gs_forest_seedlings_01.geometry}
          material={materials[".gs_seedling_01_stem"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.gs_forest_seedlings_01_1.geometry}
          material={materials[".gs_seedling_01"]}
        />
      </group>
      <group position={[11.848, 0.485, -7.18]} rotation={[-0.009, 0, 0.02]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.gs_dryland_meadow_flower_01.geometry}
          material={materials[".gs_grass__dryland"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.gs_dryland_meadow_flower_01_1.geometry}
          material={materials[".gs_grass_flower"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.003"]}
        rotation={[Math.PI / 2, 0, 0]}
        position-y={15}
      />

      {/* Dynamic text on the ground */}
      <Billboard position-x={20} position-y={2} position-z={-10}>
        <Text fontSize={2} color="white">
          Base Distance: {baseDistance}m
        </Text>
      </Billboard>

      {/* Dynamic text on the wall */}
      <Billboard position-y={12} position-x={20} position-z={-10}>
        <Text fontSize={2} color="white">
          Wall Height: {wallHeight}m
        </Text>
      </Billboard>
    </group>
  );
}

useGLTF.preload("/models/LADDER1.glb");
