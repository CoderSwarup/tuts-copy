import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { Line } from "@react-three/drei";

type GLTFResult = {
  nodes: {
    Cube001_1: THREE.Mesh;
    Cube001_2: THREE.Mesh;
    Cube001_3: THREE.Mesh;
    Cylinder_1: THREE.Mesh;
    Cylinder_2: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube003_1: THREE.Mesh;
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
    "/models/LADDER.glb"
  ) as unknown as GLTFResult;

  // Define the points for the lines: base, height, and hypotenuse
  const baseStart = new THREE.Vector3(0, 0, 0); // Starting point of the base
  const baseEnd = new THREE.Vector3(baseDistance, 0, 0); // End point of the base

  const heightStart = new THREE.Vector3(0, 0, 0); // Starting point of the height
  const heightEnd = new THREE.Vector3(0, wallHeight, 0); // End point of the height

  const hypotenuseStart = new THREE.Vector3(0, 0, 0); // Starting point of the hypotenuse
  const hypotenuseEnd = new THREE.Vector3(baseDistance, wallHeight, 0); // End point of the hypotenuse

  const arrowSize = 0.3;

  
  return (
    <group {...props} dispose={null} scale={2} position-y={5}>
      {/* Models */}
      <group position={[0, 2.2, 1 * -0.00001]} scale-x={4} scale-y={4}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials["Material.006"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials["Material.009"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_3.geometry}
          material={materials["Material.011"]}
        />
      </group>
      <group
        position={[0.4, -baseDistance * 0.003 + 0.2, -baseDistance * 0.3]}
        rotation={[(baseDistance * 10 * Math.PI) / 180, 0, 0]}
        scale={2.9}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_1.geometry}
          material={materials["Material.007"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_2.geometry}
          material={materials["Material.010"]}
        />
      </group>
      <group
        position={[0, -1.8, -5.3]}
        rotation={[Math.PI / 2, 0, 0]}
        scale-x={4}
        scale-y={4}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials["Material.005"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials["Material.009"]}
        />
      </group>

      {/* Text for Base Distance */}
      <group position={[2, -1, -2.2]}>
        <mesh>
          <planeGeometry args={[3, 0.7]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <Text
          fontSize={0.4}
          color="white"
          position={[0, 0, 0.1]} // Slight offset to ensure layering
        >
          Base Distance: {baseDistance}m
        </Text>
      </group>

      {/* Text for Wall Height */}
      <group position={[2, 2, -2.2]}>
        <mesh>
          <planeGeometry args={[3, 0.7]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <Text
          fontSize={0.4}
          color="ReactThreeFiber.white"
          position={[0, 0, 0.1]} // Slight offset to ensure layering
        >
          Wall Height: {wallHeight}m
        </Text>
      </group>

      {/* Draw the lines representing the Pythagorean triangle */}

      {/* Base Line */}
      <Line
        points={[baseStart, baseEnd]} // Base line
        color="red"
        lineWidth={5}
        rotation={[0, Math.PI / 2, 0]}
        position={[2, -1.4, -0.5]}
        scale={baseDistance * 0.14}
      />
      {/* Height Line */}
      <Line
        points={[heightStart, heightEnd]} // Height line
        color="red"
        lineWidth={5}
        position={[2, -1.4, -0.5]}
        scale={0.8}
      />

      {/* Arrow for Base */}
      <group
        position={[2, -1.4, -baseDistance + (baseDistance < 2 ? 0.2 : 1)]}
        scale={2}
      >
        <mesh
          rotation={[-Math.PI / 2, 0, 0]} // Arrow pointing along the X-axis
          scale={[arrowSize, arrowSize, arrowSize]}
        >
          <coneGeometry args={[0.2, 0.5, 3]} />
          <meshBasicMaterial color="red" />
        </mesh>
      </group>

      {/* Arrow for Height */}
      <group position={[2, 1.8, -0.5]} scale={2}>
        <mesh
          rotation={[0, -Math.PI / 2, 0]} // Arrow pointing along the Y-axis
          scale={[arrowSize, arrowSize, arrowSize]}
        >
          <coneGeometry args={[0.2, 0.5, 3]} />
          <meshBasicMaterial color="red" />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/LADDER.glb");
