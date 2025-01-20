import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
interface SceneProps {
  sideA: number;
  sideB: number;
}
function Scene({ sideA, sideB }: SceneProps) {
  const [isFrontVisible, setIsFrontVisible] = useState(true);
  const [isBackVisible, setIsBackVisible] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const arrowRef = useRef<THREE.Group | null>(null);

  const [textSizeA, setTextSizeA] = useState(9);
  const [textSizeB, setTextSizeB] = useState(9);
  const [textSizeC, setTextSizeC] = useState(9);

  const hypotenuse = Math.sqrt(sideA ** 2 + sideB ** 2);
  const angle = Math.atan2(sideA, sideB);
  const sideLength = hypotenuse;

  useEffect(() => {
    const adjustTextSize = () => {
      setTextSizeA(sideA < 2 ? 3 : sideA * 3);
      setTextSizeB(sideB < 2 ? 4 : sideB * 3);
      setTextSizeC(sideLength < 2 ? 4 : sideLength * 3);
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

  useFrame(() => {
    if (arrowRef.current) {
      const time = Date.now() * 0.001;

      arrowRef.current.position.x = sideB + 1 + Math.sin(time) * 0.5; // Move back and forth with amplitude of 1.5
      arrowRef.current.position.z = Math.sin(time) * 1.5; // Move back and forth with amplitude of 1.5
    }
    if (groupRef.current) {
      const objectPosition = groupRef.current.position;
      const objectFront = new THREE.Vector3(0, 0, 1); // Front vector in local space (Z-axis)
      const cameraDirection = new THREE.Vector3();
      const objectToCamera = new THREE.Vector3().subVectors(
        camera.position,
        objectPosition
      ); // Vector from object to camera

      // Get the camera's direction in world space
      camera.getWorldDirection(cameraDirection);

      // Rotate the object’s front vector to world space
      const rotatedFront = objectFront
        .clone()
        .applyMatrix4(groupRef.current.matrixWorld);

      // Compute dot product between the camera's direction and the rotated front vector of the object
      const dotProduct = rotatedFront.dot(cameraDirection);

      console.log(dotProduct); // This value tells us how aligned the object is with the camera

      // Adjusted threshold to handle front/back visibility more effectively
      const threshold = 0;

      // Is Move
      if (isFirstVisit && dotProduct !== -1) {
        setIsFirstVisit(false);
      }

      if (dotProduct > threshold) {
        setIsFrontVisible(false);
        setIsBackVisible(true);
      } else {
        setIsFrontVisible(true);
        setIsBackVisible(false);
      }
    }
  });
  const handleUserInteraction = () => {
    setIsFirstVisit(false);
  };
  return (
    <group
      ref={groupRef}
      position={[-2, 0, 0]}
      onPointerDown={handleUserInteraction}
    >
      {" "}
      <ambientLight intensity={0.6} />{" "}
      <directionalLight position={[10, 10, 10]} intensity={1.2} />{" "}
      <directionalLight position={[-10, -10, -10]} intensity={0.5} />{" "}
      {/* <gridHelper args={[20, 20, "#444", "#666"]} /> */}{" "}
      {createTriangleFill()}{" "}
      {isFirstVisit && (
        <group
          ref={arrowRef}
          position={[5, -0, 1.1]} // Positioning the arrow
          rotation={[0, 0, 0]}
          scale={0.5}
        >
          <Html transform>
            <div
              className="w-[200px] h-[200px] bg-contain bg-no-repeat "
              style={{
                backgroundImage: "url('./arrow.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                transformOrigin: "center center",
                pointerEvents: "none",
              }}
            />
          </Html>
        </group>
      )}
      <mesh
        position={[-sideA / 2, sideA / 2, 0.7]}
        geometry={cubeAGeometry}
        material={cubeAMaterial}
      >
        {isFrontVisible && (
          <>
            <Html position={[sideA * 0.4, 0, 0]} transform>
              <div
                className="high-quality-text"
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
            <Html position={[-0.1, 0, 0]} transform>
              <div
                className="high-quality-text"
                style={{
                  color: "#ffffff",
                  fontSize: `${textSizeA}px`,
                  textAlign: "center",
                  width: "400px",
                }}
              >
                Area = {(sideA ** 2).toFixed(2)} Sq units
              </div>
            </Html>
          </>
        )}

        {/* Back-facing Text for A */}
        {isBackVisible && (
          <>
            <Html
              position={[sideA * 0.4, 0, 0]}
              transform
              rotation={new THREE.Euler(0, Math.PI, 0)}
            >
              <div
                className="high-quality-text"
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
            <Html
              position={[sideA < 2 ? -0.1 : -0.2, 0, 0]}
              transform
              rotation={new THREE.Euler(0, Math.PI, 0)}
            >
              <div
                className="high-quality-text"
                style={{
                  color: "#ffffff",
                  fontSize: `${textSizeA}px`,
                  textAlign: "center",
                  width: "400px",
                }}
              >
                Area = {(sideA ** 2).toFixed(2)} Sq units
              </div>
            </Html>
          </>
        )}
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
        {isFrontVisible && (
          <>
            <Html position={[0, sideB * 0.37, 0]} transform>
              <div
                className="high-quality-text"
                style={{
                  color: "#ffffff",
                  fontSize: `${textSizeB}px`,
                  fontWeight: "bold",
                  zIndex: "-1",
                }}
              >
                B
              </div>
            </Html>
            <Html position={[0, 0, 0]} transform>
              <div
                className="high-quality-text"
                style={{
                  color: "#ffffff",
                  fontSize: `${textSizeB}px`,
                  textAlign: "center",
                  width: "400px",
                  zIndex: "-1",
                }}
              >
                Area = {(sideB ** 2).toFixed(2)} Sq units
              </div>
            </Html>
          </>
        )}

        {/* Back-facing Text for B */}
        {isBackVisible && (
          <>
            <Html
              position={[0, sideB * 0.37, 0]}
              transform
              rotation={new THREE.Euler(0, Math.PI, 0)}
            >
              <div
                className="high-quality-text"
                style={{
                  color: "#ffffff",
                  fontSize: `${textSizeB}px`,
                  fontWeight: "bold",
                  zIndex: "-1",
                }}
              >
                B
              </div>
            </Html>
            <Html
              position={[0, 0, 0]}
              transform
              rotation={new THREE.Euler(0, Math.PI, 0)}
            >
              <div
                className="high-quality-text"
                style={{
                  color: "#ffffff",
                  fontSize: `${textSizeB}px`,
                  textAlign: "center",
                  width: "400px",
                  zIndex: "-1",
                }}
              >
                Area = {(sideB ** 2).toFixed(2)} Sq units
              </div>
            </Html>
          </>
        )}
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
        <mesh
          position={[sideLength / 2, sideLength / 2, 0.7]}
          geometry={cubeCGeometry}
          material={cubeCMaterial}
        >
          {/* Front-facing Text for C */}
          {isFrontVisible && (
            <>
              <Html
                position={[0, -(sideLength * 0.4), 0]} // Adjust the position for the front-facing text
                transform
                rotation={new THREE.Euler(0, 0, angle)} // Correct rotation for front-facing text
              >
                <div
                  className="high-quality-text"
                  style={{
                    color: "#ffffff",
                    fontSize: `${textSizeC}px`,
                    fontWeight: "bold",
                    transform: `rotate(${angle}deg)`, // Ensure proper angle for front-facing text
                  }}
                >
                  C
                </div>
              </Html>
              {/* Area text for C */}
              <Html
                position={[0, hypotenuse < 2 ? 0 : 0.2, 0]} // Adjust position for area text
                transform
                rotation={new THREE.Euler(0, 0, angle)} // Rotation for front-facing text
              >
                <div
                  className="high-quality-text"
                  style={{
                    color: "#ffffff",
                    fontSize: `${textSizeC}px`,
                    textAlign: "center",
                    width: "400px",
                  }}
                >
                  Area = {(hypotenuse ** 2).toFixed(2)} Sq units
                </div>
              </Html>
            </>
          )}

          {/* Back-facing Text for C */}
          {isBackVisible && (
            <>
              <Html
                position={[0, -(sideLength * 0.4), 0]} // Same position as front-facing
                transform
                rotation={new THREE.Euler(0, Math.PI, -angle)} // 180-degree flip for back-facing
              >
                <div
                  className="high-quality-text"
                  style={{
                    color: "#ffffff",
                    fontSize: `${textSizeC}px`,
                    fontWeight: "bold",
                    transform: `rotate(${angle}deg)`, // Ensure proper angle for back-facing text
                  }}
                >
                  C
                </div>
              </Html>
              {/* Area text for C */}
              <Html
                position={[0, hypotenuse < 2 ? 0 : 0.2, 0]} // Adjust position for area text
                transform
                rotation={new THREE.Euler(0, Math.PI, -angle)} // 180-degree rotation for back-facing text
              >
                <div
                  className="high-quality-text"
                  style={{
                    color: "#ffffff",
                    fontSize: `${textSizeC}px`,
                    textAlign: "center",
                    width: "400px",
                  }}
                >
                  Area = {(hypotenuse ** 2).toFixed(2)} Sq units
                </div>
              </Html>
            </>
          )}
        </mesh>

        {/* Cube edge for C */}
        <lineSegments
          position={[sideLength / 2, sideLength / 2, 0]}
          geometry={cubeCEdge}
          material={lineMaterial}
        />

        {/* Glow effect for C */}
        {createGlowCylinders(
          new THREE.Vector3(0, 0, 0.75),
          new THREE.Vector3(sideLength, 0, 0.75),
          0.05
        )}
      </group>
    </group>
  );
}
export default Scene;
