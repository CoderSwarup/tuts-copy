import { useEffect, useRef } from "react";
import * as THREE from "three";

interface LadderProps {
  baseDistance: number;
}

export const Ladder = ({ baseDistance }: LadderProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    // Constants
    const ladderLength = 5; // Length of the ladder
    const wallHeight = 4; // Fixed height of the wall

    const clampedBaseDistance = Math.max(
      Math.min(baseDistance, ladderLength - 0.5), // Slightly less than ladderLength
      0.1 // Prevents division by zero or negative base distances
    );

    // Calculate the ladder's angle using Pythagorean theorem
    const heightFromBase = Math.sqrt(
      ladderLength ** 2 - clampedBaseDistance ** 2
    ); // Hypotenuse logic
    const angle = Math.atan(heightFromBase / clampedBaseDistance);

    groupRef.current.position.set(clampedBaseDistance, 0, 0);
    groupRef.current.rotation.z = 1.5 - angle;
  }, [baseDistance]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Ladder rails */}
      <mesh position={[-0.25, 2.5, 0]} castShadow>
        <boxGeometry args={[0.1, 5.5, 0.1]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.25, 2.5, 0.5]} castShadow>
        <boxGeometry args={[0.1, 5.5, 0.1]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Ladder rungs */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={i}
          position={[-0.25, i * 0.5, 0.25]}
          castShadow
          rotation-y={Math.PI / 2}
        >
          <boxGeometry args={[0.6, 0.05, 0.1]} />
          <meshStandardMaterial
            color="#4a4a4a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};
