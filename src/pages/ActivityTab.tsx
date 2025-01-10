import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Info, RotateCcw } from "lucide-react";
import Scene from "../components/ActivityTab/Scene";

function ActivityTab() {
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const hypotenuse = Math.sqrt(sideA * sideA + sideB * sideB);

  return (
    <div className="w-screen h-screen bg-gray-900 flex">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 50 }}
        className="h-full w-full"
      >
        <Scene sideA={sideA} sideB={sideB} />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>

      <div
        className={`bg-gray-800 p-6 z-10 transition-all duration-300 overflow-y-scroll  w-[500px]`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              3D Pythagorean Theorem
            </h1>
          </div>

          {/* Controls Section */}
          <div className="bg-gray-700/50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Triangle Dimensions
            </h2>

            <div className="space-y-6">
              {/* Side A Control */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-200">
                    Side A
                  </label>
                  <span className="text-blue-400 font-mono">
                    {sideA.toFixed(1)} units
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={sideA}
                  onChange={(e) => setSideA(Number(e.target.value))}
                  className="w-full h-2 bg-blue-500/30 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:bg-blue-500
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-all
                    [&::-webkit-slider-thumb]:hover:scale-110"
                />
              </div>

              {/* Side B Control */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-200">
                    Side B
                  </label>
                  <span className="text-green-400 font-mono">
                    {sideB.toFixed(1)} units
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={sideB}
                  onChange={(e) => setSideB(Number(e.target.value))}
                  className="w-full h-2 bg-green-500/30 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:bg-green-500
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-all
                    [&::-webkit-slider-thumb]:hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gray-700/50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Calculations
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Hypotenuse (c)</span>
                <span className="text-purple-400 font-mono font-bold">
                  {hypotenuse.toFixed(2)} units
                </span>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg font-mono text-sm">
                <div className="text-gray-400 mb-2">Pythagorean Theorem:</div>
                <div className="text-white">
                  {sideA.toFixed(1)}² + {sideB.toFixed(1)}² ={" "}
                  {hypotenuse.toFixed(2)}²
                </div>
                <div className="text-gray-400 mt-2">Simplified:</div>
                <div className="text-white">
                  {(sideA * sideA).toFixed(2)} + {(sideB * sideB).toFixed(2)} ={" "}
                  {(hypotenuse * hypotenuse).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-700/50 rounded-xl p-6 mt-auto">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-indigo-400 font-semibold mb-2">
                  How to Use
                </h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Drag the sliders to adjust triangle sides</li>
                  <li>• Click and drag to rotate the 3D view</li>
                  <li>• Scroll to zoom in/out</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setSideA(3);
              setSideB(4);
            }}
            className="my-5 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Values
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivityTab;
