import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface SceneProps {
  sideA: number;
  sideB: number;
}

function Scene({ sideA, sideB }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const hypotenuse = Math.sqrt(sideA ** 2 + sideB ** 2);
  const angle = Math.atan2(sideA, sideB);
  const sideLength = hypotenuse;

  const positionTopRightA = new THREE.Vector3(0, sideA, 0);

  const createCubeMaterial = (
    baseColor: string,
    highlightedFaceIndex: number
  ) => {
    const colors = Array(6).fill(new THREE.Color(baseColor));
    colors[highlightedFaceIndex] = new THREE.Color("#ffffff"); // Highlight one face
    return colors.map(
      (color, index) =>
        new THREE.MeshStandardMaterial({
          color,
          emissive: highlightedFaceIndex === index ? "#ffeb3b" : baseColor,
          emissiveIntensity: highlightedFaceIndex === index ? 0.4 : 0,
          metalness: 0.3,
          roughness: 0.5,
        })
    );
  };

  const cubeAMaterials = createCubeMaterial("#3b82f6", 0);
  const cubeBMaterials = createCubeMaterial("#10b981", 2);
  const cubeCMaterials = createCubeMaterial("#ff7114", 3);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#ffffff" />

      {/* Cube A */}
      <mesh
        position={[-sideA / 2, sideA / 2, 0]}
        geometry={new THREE.BoxGeometry(sideA, sideA, 1.5)}
        material={cubeAMaterials}
      >
        <Html position={[0, 0, 1]} center>
          <div
            style={{ color: "#ffffff", fontSize: "3rem", fontWeight: "bold" }}
          >
            A
          </div>
        </Html>
      </mesh>

      {/* Cube B */}
      <mesh
        position={[sideB / 2, -sideB / 2, 0]}
        geometry={new THREE.BoxGeometry(sideB, sideB, 1.5)}
        material={cubeBMaterials}
      >
        <Html position={[0, 0, 1]} center>
          <div
            style={{ color: "#ffffff", fontSize: "3rem", fontWeight: "bold" }}
          >
            B
          </div>
        </Html>
      </mesh>

      {/* Cube C */}
      <group
        position={[
          positionTopRightA.x,
          positionTopRightA.y,
          positionTopRightA.z,
        ]}
        rotation={[0, 0, -angle]}
      >
        <mesh
          position={[sideLength / 2, sideLength / 2, 0]}
          geometry={new THREE.BoxGeometry(sideLength, sideLength, 1.5)}
          material={cubeCMaterials}
        >
          <Html position={[0, 0, 1]} center>
            <div
              style={{ color: "#ffffff", fontSize: "3rem", fontWeight: "bold" }}
            >
              C
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
}

export default Scene;
