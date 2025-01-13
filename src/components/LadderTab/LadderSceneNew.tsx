import { useGLTF, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { Line } from "@react-three/drei";

type GLTFResult = {
  nodes: {
    Cube001_1: THREE.Mesh;
    Cube001_2: THREE.Mesh;
    Cube001_3: THREE.Mesh;
    Ladders018: THREE.Mesh;
    XMLID_227_002: THREE.Mesh;
    Cube002: THREE.Mesh;
    Cube002_1: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

interface LadderSceneNewProps {
  baseDistance: number;
  wallHeight: number;
}

export default function LadderSceneNew({
  baseDistance,
  wallHeight,
  ...props
}: LadderSceneNewProps) {
  const { nodes, materials } = useGLTF(
    "/models/LADDER_FINAL.glb"
  ) as unknown as GLTFResult;

  const baseStart = new THREE.Vector3(0, 0, 0);
  const baseEnd = new THREE.Vector3(baseDistance, 0, 0);

  const heightStart = new THREE.Vector3(0, 0, 0); // Starting point of the height
  const heightEnd = new THREE.Vector3(0, wallHeight, 0); // End point of the height

  // Arrow size to indicate direction
  const arrowSize = 0.3;

  const ladderLength = 5; // Assuming the ladder length is fixed
  const angle = Math.atan(baseDistance / wallHeight); // Calculate the angle in radians

  // The bottom position of the ladder
  const bottomPosition = new THREE.Vector3(
    baseDistance,
    0, // The ladder's bottom always starts at Y = 0
    0
  );

  // The top position of the ladder
  const topPosition = new THREE.Vector3(
    0,
    wallHeight,
    0 // The ladder's top stays on the wall at height
  );

  return (
    <group {...props} dispose={null} scale={5} position-y={5}>
      {/* Models */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ladders018.geometry}
        material={materials["Material.007"]}
        position={[0, bottomPosition.y - 0.1, -baseDistance * 0.09]}
        rotation={[1.5 - -angle, 0, Math.PI / 2]} // Reverse rotation logic
        scale={0.01}
      />
      
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials["Material.014"]}
        position={[0, 0.4, -1]}
        scale={1.3}
      />{" "}
      {/* Dynamic Text on the ground */}
      <Billboard position-x={1} position-y={-0.84} position-z={-0.4}>
        <Text fontSize={0.15} color="white">
          Base Distance: {baseDistance}m
        </Text>
      </Billboard>
      {/* Dynamic Text on the wall */}
      <Billboard position-x={1} position-y={0.7} position-z={-0.3}>
        <Text fontSize={0.15} color="white">
          Wall Height: {wallHeight}m
        </Text>
      </Billboard>
      {/* Draw the lines representing the Pythagorean triangle */}
      {/* Base Line */}
      <Line
        points={[baseStart, baseEnd]} // Base line
        color="black"
        lineWidth={5}
        rotation={[0, Math.PI / 2, 0]}
        position={[0.7, -0.8, 0.2]}
        scale={baseDistance * (baseDistance <= 2 ? 0.2 : 0.06)}
      />
      {/* Height Line */}
      <Line
        points={[heightStart, heightEnd]} // Height line
        color="black"
        lineWidth={5}
        position={[0.7, -0.8, 0.2]}
        scale={0.44}
      />
      {/* Draw Arrows for the Base and Height lines */}
      {/* Arrow for Base */}
      <group
        position={[0.7, -0.8, -baseDistance * (baseDistance < 2 ? 0.0 : 0.25)]}
        scale={2}
      >
       
      </group>
      {/* Arrow for Height */}
      <group position={[0.7, 0.9, 0.2]} scale={2}>
        <mesh
          rotation={[0, -Math.PI / 2, 0]} // Arrow pointing along the Y-axis
          scale={[arrowSize, arrowSize, arrowSize]}
        >
          <coneGeometry args={[0.2, 0.5, 3]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/LADDER_FINAL.glb");

/**
 *
 *
 *
 */
