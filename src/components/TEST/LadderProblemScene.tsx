import { Canvas } from "@react-three/fiber";
import {
  Billboard,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";

import { Ladder } from "./Ladder";
import Wall from "./Wall";
import * as THREE from "three";

import { Ground } from "./Ground";
interface LadderProblemSceneProps {
  baseDistance: number;
  wallHeight: number;
}
export const LadderProblemScene = ({
  baseDistance,
  wallHeight,
}: LadderProblemSceneProps) => {
  // Define the points for the lines: base, height, and hypotenuse
  const baseStart = new THREE.Vector3(0, 0, 0); // Starting point of the base
  const baseEnd = new THREE.Vector3(baseDistance, 0, 0); // End point of the base

  const heightStart = new THREE.Vector3(0, 0, 0); // Starting point of the height
  const heightEnd = new THREE.Vector3(0, wallHeight, 0); // End point of the height

  const hypotenuseStart = new THREE.Vector3(0, 0, 0); // Starting point of the hypotenuse
  const hypotenuseEnd = new THREE.Vector3(baseDistance, wallHeight, 0); // End point of the hypotenuse

  // Arrow size to indicate direction
  const arrowSize = 0.3;
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 4, 8]} />
        <OrbitControls
          maxAzimuthAngle={Math.PI / 1.1}
          minAzimuthAngle={Math.PI / 7}
          maxPolarAngle={Math.PI / 2.4}
          minPolarAngle={Math.PI / 6}
        />

        {/* Lighting */}
        <ambientLight intensity={3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <group scale={0.75} position={[-1, 1, 0]}>
          {/* Wall */}
          <Wall />

          {/* Ladder */}
          <Ladder baseDistance={baseDistance} />

          {/* <mesh
  rotation-x={-Math.PI / 2}
  position-x={2}
  position-y={-0.2}
  receiveShadow
>
  <planeGeometry args={[10, 10]} />
  <meshStandardMaterial color="#c0d476" />
</mesh> */}

          <Ground />

          {/* Dynamic Text on the ground */}
          <Billboard position-x={2.5} position-y={0.2} position-z={3.9}>
            <Text fontSize={0.4} color="black" fontWeight={600}>
              Base Distance: {baseDistance}m
            </Text>
          </Billboard>

          {/* Dynamic Text on the wall */}
          <Billboard position-x={2.5} position-y={2.5} position-z={3.8}>
            <Text fontSize={0.4} color="black" fontWeight={600}>
              Wall Height: {wallHeight}m
            </Text>
          </Billboard>

          {/* Draw the lines representing the Pythagorean triangle */}

          {/* Base Line */}
          {/* Base Line */}
          <Line
            points={[baseStart, baseEnd]} // Base line
            color="black"
            lineWidth={5}
            rotation={[0, 0, 0]}
            position={[0.2, 0.32, 2]}
            scale={0.98} // Keep scale 1 for consistency
          />

          {/* Arrow for Base */}
          <group position={[baseDistance + 0.2, 0.32, 2]} scale={2}>
            <mesh
              rotation={[0, 0, -Math.PI / 2]} // Arrow pointing along the X-axis
              scale={[arrowSize, arrowSize, arrowSize]}
            >
              <coneGeometry args={[0.2, 0.5, 3]} />
              <meshBasicMaterial color="black" />
            </mesh>
          </group>

          {/* Height Line */}
          <Line
            points={[heightStart, heightEnd]} // Height line
            color="black"
            lineWidth={5}
            position={[0.2, 0.32, 2]}
            scale={0.8}
          />

          {/* Arrow for Height */}
          <group position={[0.2, 3.6, 2]} scale={2}>
            <mesh
              rotation={[0, -Math.PI / 2, 0]} // Arrow pointing along the Y-axis
              scale={[arrowSize, arrowSize, arrowSize]}
            >
              <coneGeometry args={[0.2, 0.5, 3]} />
              <meshBasicMaterial color="black" />
            </mesh>
          </group>
        </group>
      </Canvas>
    </div>
  );
};
