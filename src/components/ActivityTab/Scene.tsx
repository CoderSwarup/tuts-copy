import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
interface SceneProps {
  sideA: number;
  sideB: number;
}
function Scene({ sideA, sideB }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [textSizeA, setTextSizeA] = useState(9);
  const [textSizeB, setTextSizeB] = useState(9);
  const [textSizeC, setTextSizeC] = useState(9);

  const hypotenuse = Math.sqrt(sideA ** 2 + sideB ** 2);
  const angle = Math.atan2(sideA, sideB);
  const sideLength = hypotenuse;

  useEffect(() => {
    const adjustTextSize = () => {
      setTextSizeA(sideA < 2 ? 5 : sideA * 3);
      setTextSizeB(sideB < 2 ? 5 : sideB * 3);
      setTextSizeC(sideLength < 2 ? 5 : sideLength * 3);
    };

    adjustTextSize();
  }, [sideA, sideB, sideLength]);

  const createCubeMaterial = (baseColor: string) => {
    return new THREE.MeshStandardMaterial({
      color: baseColor,
      metalness: 0.2,
      roughness: 0.5,
    });
  };
  const cubeAMaterial = createCubeMaterial("#3b82f6");
  const cubeBMaterial = createCubeMaterial("#10b981");
  const cubeCMaterial = createCubeMaterial("#eb77ff");
  const lineMaterial = new THREE.LineBasicMaterial({
    color: "#ffffff",
    linewidth: 10,
  });
  const glowMaterial = new THREE.MeshBasicMaterial({ color: "#ffffff" });
  const triangleFillMaterial = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    opacity: 0.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const createHighlightedEdge = (
    geometry: THREE.BoxGeometry,
    edgeVertices: [number, number]
  ) => {
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const positions = edgesGeometry.attributes.position.array as Float32Array;
    const highlightedGeometry = new THREE.BufferGeometry();
    highlightedGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([
          positions[edgeVertices[0] * 3],
          positions[edgeVertices[0] * 3 + 1],
          positions[edgeVertices[0] * 3 + 2],
          positions[edgeVertices[1] * 3],
          positions[edgeVertices[1] * 3 + 1],
          positions[edgeVertices[1] * 3 + 2],
        ]),
        3
      )
    );
    return highlightedGeometry;
  };
  const createGlowCylinders = (
    start: THREE.Vector3,
    end: THREE.Vector3,
    thickness: number
  ) => {
    const length = start.distanceTo(end);
    const geometry = new THREE.CylinderGeometry(
      thickness,
      thickness,
      length,
      16
    );
    const position = start.clone().lerp(end, 0.5);
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    );
    return (
      <mesh
        position={[position.x, position.y, position.z]}
        rotation={new THREE.Euler().setFromQuaternion(quaternion)}
        geometry={geometry}
        material={glowMaterial}
      />
    );
  };
  const cubeAGeometry = new THREE.BoxGeometry(sideA, sideA, 0);
  const cubeBGeometry = new THREE.BoxGeometry(sideB, sideB, 0);
  const cubeCGeometry = new THREE.BoxGeometry(sideLength, sideLength, 0);
  const cubeAEdge = createHighlightedEdge(cubeAGeometry, [7, 10]);
  const cubeBEdge = createHighlightedEdge(cubeBGeometry, [8, 10]);
  const cubeCEdge = createHighlightedEdge(cubeCGeometry, [7, 12]);
  const createTriangleFill = () => {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0,
      0,
      0.75,
      0,
      sideA,
      0.75,
      sideB,
      0,
      0.75,
    ]);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex([0, 1, 2]);
    return <mesh geometry={geometry} material={triangleFillMaterial} />;
  };
  return (
    <group ref={groupRef} position={[-2, 0, 0]}>
      {" "}
      <ambientLight intensity={0.6} />{" "}
      <directionalLight position={[10, 10, 10]} intensity={1.2} />{" "}
      <directionalLight position={[-10, -10, -10]} intensity={0.5} />{" "}
      {/* <gridHelper args={[20, 20, "#444", "#666"]} /> */}{" "}
      {createTriangleFill()}{" "}
      <mesh
        position={[-sideA / 2, sideA / 2, 0.7]}
        geometry={cubeAGeometry}
        material={cubeAMaterial}
      >
        <Html position={[sideA * 0.4, 0, 0]} transform>
          <div
            style={{
              color: "#ffffff",
              fontSize: `${textSizeA}px`,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            A
          </div>
        </Html>
        {/* Area text */}
        <Html position={[0, 0, 0]} transform>
          <div
            style={{
              color: "#ffffff",
              fontSize: `${textSizeA}px`,
              textAlign: "center",
              width: "400px",
            }}
          >
            Area = {(sideA ** 2).toFixed(2)}
          </div>
        </Html>
      </mesh>
      <lineSegments
        position={[-sideA / 2, sideA / 2, 0]}
        geometry={cubeAEdge}
        material={lineMaterial}
      />{" "}
      {createGlowCylinders(
        new THREE.Vector3(0, sideA, 0.75),
        new THREE.Vector3(0, 0, 0.75),
        0.05
      )}{" "}
      <mesh
        position={[sideB / 2, -sideB / 2, 0.7]}
        geometry={cubeBGeometry}
        material={cubeBMaterial}
      >
        {/* Text for B at the edge */}
        <Html position={[0, sideB * 0.37, 0]} transform>
          <div
            style={{
              color: "#ffffff",
              fontSize: `${textSizeB}px`, // Responsive font size
              fontWeight: "bold",
              zIndex: "-1",
            }}
          >
            B
          </div>
        </Html>
        {/* Area text */}
        <Html position={[0, 0, 0]} transform>
          <div
            style={{
              color: "#ffffff",
              fontSize: `${textSizeB}px`,
              textAlign: "center",
              width: "400px",
              zIndex: "-1",
            }}
          >
            Area = {(sideB ** 2).toFixed(2)}
          </div>
        </Html>
      </mesh>
      <lineSegments
        position={[sideB / 2, -sideB / 2, 0]}
        geometry={cubeBEdge}
        material={lineMaterial}
      />{" "}
      {createGlowCylinders(
        new THREE.Vector3(0, 0, 0.75),
        new THREE.Vector3(sideB, 0, 0.75),
        0.05
      )}{" "}
      <group position={[0, sideA, 0]} rotation={[0, 0, -angle]}>
        {" "}
        <mesh
          position={[sideLength / 2, sideLength / 2, 0.7]}
          geometry={cubeCGeometry}
          material={cubeCMaterial}
        >
          <Html
            position={[0, -(sideLength * 0.4), 0]}
            transform
            rotation={new THREE.Euler(0, 0, angle)}
          >
            <div
              style={{
                color: "#ffffff",
                fontSize: `${textSizeC}px`,
                fontWeight: "bold",
                transform: `rotate(${angle}deg)`,
              }}
            >
              C
            </div>
          </Html>
          {/* Area text */}
          <Html
            position={[0, 0, 0]}
            transform
            rotation={new THREE.Euler(0, 0, angle)}
          >
            <div
              style={{
                color: "#ffffff",
                fontSize: `${textSizeC}px`,
                textAlign: "center",
                width: "400px",
              }}
            >
              Area = {(hypotenuse ** 2).toFixed(2)}
            </div>
          </Html>
        </mesh>
        <lineSegments
          position={[sideLength / 2, sideLength / 2, 0]}
          geometry={cubeCEdge}
          material={lineMaterial}
        />{" "}
        {createGlowCylinders(
          new THREE.Vector3(0, 0, 0.75),
          new THREE.Vector3(sideLength, 0, 0.75),
          0.05
        )}{" "}
      </group>{" "}
    </group>
  );
}
export default Scene;
